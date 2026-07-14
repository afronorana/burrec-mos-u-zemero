// Authoritative 'ludo' match handler. All timing lives in matchLoop ticks —
// the goja runtime has no setTimeout.

import { OpCode, decodePayload, encodePayload } from '../../shared/protocol.js';
import {
  allHome,
  applyMove,
  initialPawns,
  legalPawns,
  rollDie,
} from './ludo_logic';

const TICK_RATE = 2; // ticks per second
// Keep in sync with the client's turn-timer bar (store.turnTimer.duration).
const TURN_TIMEOUT_TICKS = 60 * TICK_RATE;
const DISCONNECTED_TURN_TIMEOUT_TICKS = 6 * TICK_RATE;
const EMPTY_TERMINATE_TICKS = 60 * TICK_RATE;
const MAX_ROLLS_WHEN_ALL_HOME = 3;
const MAX_SEATS = 4;

export interface Seat {
  userId: string;
  username: string;
  displayName: string;
  seat: number;
  ready: boolean;
  connected: boolean;
}

export interface LudoState {
  phase: 'lobby' | 'playing' | 'finished';
  mode: 'private' | 'quick';
  joinCode: string | null;
  seats: (Seat | null)[];
  hostUserId: string | null;
  turnSeat: number;
  round: number;
  dice: number | null;
  awaitingMove: boolean;
  legalPawns: number[];
  rollsThisTurn: number;
  pawns: number[][];
  turnDeadlineTick: number;
  emptyTicks: number;
  winnerSeat: number | null;
  presences: { [userId: string]: nkruntime.Presence };
  pendingDisplayNames: { [userId: string]: string };
  labelOpen: number;
}

interface StateWrapper {
  state: LudoState;
}

function makeLabel(state: LudoState): string {
  return JSON.stringify({
    mode: state.mode,
    code: state.joinCode || '',
    open: state.labelOpen,
  });
}

function seatOfUser(state: LudoState, userId: string): Seat | null {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && seat.userId === userId) {
      return seat;
    }
  }
  return null;
}

function seatedCount(state: LudoState): number {
  let count = 0;
  for (let i = 0; i < MAX_SEATS; i += 1) {
    if (state.seats[i]) {
      count += 1;
    }
  }
  return count;
}

function allPresences(state: LudoState): nkruntime.Presence[] {
  const list: nkruntime.Presence[] = [];
  for (const userId in state.presences) {
    list.push(state.presences[userId]);
  }
  return list;
}

function lobbyStatePayload(state: LudoState): object {
  return {
    phase: state.phase,
    seats: state.seats,
    hostUserId: state.hostUserId,
    joinCode: state.joinCode,
  };
}

function snapshotPayload(state: LudoState): object {
  return {
    phase: state.phase,
    seats: state.seats,
    hostUserId: state.hostUserId,
    joinCode: state.joinCode,
    turnSeat: state.turnSeat,
    round: state.round,
    dice: state.dice,
    awaitingMove: state.awaitingMove,
    legalPawns: state.legalPawns,
    pawns: state.pawns,
    winnerSeat: state.winnerSeat,
  };
}

function broadcast(dispatcher: nkruntime.MatchDispatcher, opCode: number, payload: object, to?: nkruntime.Presence[]) {
  dispatcher.broadcastMessage(opCode, encodePayload(payload), to || null, null, true);
}

function reject(dispatcher: nkruntime.MatchDispatcher, sender: nkruntime.Presence, reason: string, forOpCode: number) {
  broadcast(dispatcher, OpCode.REJECTED, { reason, forOpCode }, [sender]);
}

function resetTurnState(state: LudoState) {
  state.dice = null;
  state.awaitingMove = false;
  state.legalPawns = [];
  state.rollsThisTurn = 0;
}

function turnDeadline(state: LudoState, tick: number): number {
  const seat = state.seats[state.turnSeat];
  const ticks = seat && seat.connected ? TURN_TIMEOUT_TICKS : DISCONNECTED_TURN_TIMEOUT_TICKS;
  return tick + ticks;
}

function advanceTurn(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, reason: string) {
  resetTurnState(state);

  let next = state.turnSeat;
  for (let step = 1; step <= MAX_SEATS; step += 1) {
    const candidate = (state.turnSeat + step) % MAX_SEATS;
    if (state.seats[candidate]) {
      next = candidate;
      break;
    }
  }

  if (next <= state.turnSeat) {
    state.round += 1;
  }
  state.turnSeat = next;
  state.turnDeadlineTick = turnDeadline(state, tick);

  broadcast(dispatcher, OpCode.TURN_CHANGE, {
    turnSeat: state.turnSeat,
    round: state.round,
    reason,
  });
}

function repeatTurn(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number) {
  resetTurnState(state);
  state.turnDeadlineTick = turnDeadline(state, tick);

  broadcast(dispatcher, OpCode.TURN_CHANGE, {
    turnSeat: state.turnSeat,
    round: state.round,
    reason: 'repeat',
  });
}

function doMove(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, pawnIndex: number) {
  const seat = state.turnSeat;
  const steps = state.dice as number;
  const result = applyMove(state.pawns, seat, pawnIndex, steps);

  broadcast(dispatcher, OpCode.MOVE_APPLIED, {
    seat,
    pawnIndex,
    fromPos: result.fromPos,
    toPos: result.toPos,
    steps,
    captures: result.captures,
    extraTurn: result.extraTurn && !result.won,
  });

  if (result.won) {
    state.phase = 'finished';
    state.winnerSeat = seat;
    state.turnDeadlineTick = 0;
    resetTurnState(state);
    broadcast(dispatcher, OpCode.GAME_OVER, { winnerSeat: seat });
    return;
  }

  if (result.extraTurn) {
    repeatTurn(state, dispatcher, tick);
  } else {
    advanceTurn(state, dispatcher, tick, 'end');
  }
}

function handleRollRequest(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence) {
  const senderSeat = seatOfUser(state, sender.userId);

  if (
    state.phase !== 'playing' ||
    !senderSeat ||
    senderSeat.seat !== state.turnSeat ||
    state.dice !== null ||
    state.awaitingMove
  ) {
    reject(dispatcher, sender, 'not_your_roll', OpCode.ROLL_REQUEST);
    return;
  }

  const value = rollDie();
  state.dice = value;
  state.rollsThisTurn += 1;

  const legal = legalPawns(state.pawns, state.turnSeat, value);

  if (legal.length > 0) {
    state.awaitingMove = true;
    state.legalPawns = legal;
    state.turnDeadlineTick = turnDeadline(state, tick);
    broadcast(dispatcher, OpCode.DICE_RESULT, {
      seat: state.turnSeat,
      value,
      legalPawns: legal,
      rollsLeft: 0,
      autoEndTurn: false,
    });
    return;
  }

  const canRetry =
    allHome(state.pawns, state.turnSeat) &&
    value !== 6 &&
    state.rollsThisTurn < MAX_ROLLS_WHEN_ALL_HOME;

  if (canRetry) {
    state.dice = null;
    state.turnDeadlineTick = turnDeadline(state, tick);
    broadcast(dispatcher, OpCode.DICE_RESULT, {
      seat: state.turnSeat,
      value,
      legalPawns: [],
      rollsLeft: MAX_ROLLS_WHEN_ALL_HOME - state.rollsThisTurn,
      autoEndTurn: false,
    });
    return;
  }

  broadcast(dispatcher, OpCode.DICE_RESULT, {
    seat: state.turnSeat,
    value,
    legalPawns: [],
    rollsLeft: 0,
    autoEndTurn: true,
  });
  advanceTurn(state, dispatcher, tick, 'noMoves');
}

function handleMoveRequest(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence, payload: { pawnIndex?: number }) {
  const senderSeat = seatOfUser(state, sender.userId);
  const pawnIndex = typeof payload.pawnIndex === 'number' ? payload.pawnIndex : -1;

  if (
    state.phase !== 'playing' ||
    !senderSeat ||
    senderSeat.seat !== state.turnSeat ||
    !state.awaitingMove ||
    state.legalPawns.indexOf(pawnIndex) === -1
  ) {
    reject(dispatcher, sender, 'illegal_move', OpCode.MOVE_REQUEST);
    return;
  }

  doMove(state, dispatcher, tick, pawnIndex);
}

function handleStart(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence) {
  if (state.phase !== 'lobby' || sender.userId !== state.hostUserId) {
    reject(dispatcher, sender, 'not_host', OpCode.START);
    return;
  }

  if (seatedCount(state) < 2) {
    reject(dispatcher, sender, 'not_enough_players', OpCode.START);
    return;
  }

  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.ready) {
      reject(dispatcher, sender, 'not_all_ready', OpCode.START);
      return;
    }
  }

  state.phase = 'playing';
  state.pawns = initialPawns();
  state.round = 1;
  state.winnerSeat = null;
  resetTurnState(state);

  for (let i = 0; i < MAX_SEATS; i += 1) {
    if (state.seats[i]) {
      state.turnSeat = i;
      break;
    }
  }
  state.turnDeadlineTick = turnDeadline(state, tick);
  state.labelOpen = 0;

  broadcast(dispatcher, OpCode.GAME_START, {
    seats: state.seats,
    turnSeat: state.turnSeat,
    round: state.round,
  });
  dispatcher.matchLabelUpdate(makeLabel(state));
}

const matchInit = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  params: { [key: string]: string },
): { state: LudoState; tickRate: number; label: string } {
  const mode = params && params.mode === 'quick' ? 'quick' : 'private';
  const joinCode = params && params.code ? String(params.code) : null;

  const state: LudoState = {
    phase: 'lobby',
    mode,
    joinCode,
    seats: [null, null, null, null],
    hostUserId: null,
    turnSeat: -1,
    round: 0,
    dice: null,
    awaitingMove: false,
    legalPawns: [],
    rollsThisTurn: 0,
    pawns: initialPawns(),
    turnDeadlineTick: 0,
    emptyTicks: 0,
    winnerSeat: null,
    presences: {},
    pendingDisplayNames: {},
    labelOpen: 1,
  };

  return { state, tickRate: TICK_RATE, label: makeLabel(state) };
};

const matchJoinAttempt = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  presence: nkruntime.Presence,
  metadata: { [key: string]: any },
): { state: LudoState; accept: boolean; rejectMessage?: string } {
  const existing = seatOfUser(state, presence.userId);

  if (existing) {
    if (existing.connected) {
      return { state, accept: false, rejectMessage: 'already_joined' };
    }
    return { state, accept: true }; // reconnect
  }

  if (state.phase !== 'lobby') {
    return { state, accept: false, rejectMessage: 'match_started' };
  }

  if (seatedCount(state) >= MAX_SEATS) {
    return { state, accept: false, rejectMessage: 'match_full' };
  }

  if (metadata && typeof metadata.displayName === 'string' && metadata.displayName) {
    state.pendingDisplayNames[presence.userId] = String(metadata.displayName).slice(0, 24);
  }

  return { state, accept: true };
};

const matchJoin = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  presences: nkruntime.Presence[],
): StateWrapper {
  for (let p = 0; p < presences.length; p += 1) {
    const presence = presences[p];
    state.presences[presence.userId] = presence;

    const existing = seatOfUser(state, presence.userId);
    if (existing) {
      existing.connected = true;
      if (state.phase !== 'lobby') {
        broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state), [presence]);
      }
      continue;
    }

    let displayName = state.pendingDisplayNames[presence.userId] || '';
    delete state.pendingDisplayNames[presence.userId];
    if (!displayName) {
      try {
        const account = nk.accountGetId(presence.userId);
        displayName = (account.user.displayName || account.user.username || 'Player').slice(0, 24);
      } catch (error) {
        displayName = presence.username || 'Player';
      }
    }

    // Let players join as unassigned; they pick their seat/color by clicking a base in 3D.

    if (!state.hostUserId) {
      state.hostUserId = presence.userId;
    }
  }

  const open = state.phase === 'lobby' && seatedCount(state) < MAX_SEATS ? 1 : 0;
  if (open !== state.labelOpen) {
    state.labelOpen = open;
    dispatcher.matchLabelUpdate(makeLabel(state));
  }

  broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
  return { state };
};

const matchLeave = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  presences: nkruntime.Presence[],
): StateWrapper {
  for (let p = 0; p < presences.length; p += 1) {
    const presence = presences[p];
    delete state.presences[presence.userId];

    const seat = seatOfUser(state, presence.userId);
    if (!seat) {
      continue;
    }

    if (state.phase === 'lobby') {
      state.seats[seat.seat] = null;

      if (state.hostUserId === presence.userId) {
        state.hostUserId = null;
        for (let i = 0; i < MAX_SEATS; i += 1) {
          const candidate = state.seats[i];
          if (candidate) {
            state.hostUserId = candidate.userId;
            break;
          }
        }
      }
    } else {
      seat.connected = false;
      if (state.phase === 'playing' && state.turnSeat === seat.seat) {
        const shortened = tick + DISCONNECTED_TURN_TIMEOUT_TICKS;
        if (state.turnDeadlineTick === 0 || shortened < state.turnDeadlineTick) {
          state.turnDeadlineTick = shortened;
        }
      }
    }
  }

  const open = state.phase === 'lobby' && seatedCount(state) < MAX_SEATS ? 1 : 0;
  if (open !== state.labelOpen) {
    state.labelOpen = open;
    dispatcher.matchLabelUpdate(makeLabel(state));
  }

  broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
  return { state };
};

const matchLoop = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  messages: nkruntime.MatchMessage[],
): StateWrapper | null {
  let hasPresence = false;
  for (const userId in state.presences) {
    hasPresence = true;
    break;
  }

  if (!hasPresence) {
    state.emptyTicks += 1;
    if (state.emptyTicks >= EMPTY_TERMINATE_TICKS) {
      return null;
    }
  } else {
    state.emptyTicks = 0;
  }

  for (let m = 0; m < messages.length; m += 1) {
    const message = messages[m];
    const payload = decodePayload(message.data);
    const sender = message.sender;

    switch (message.opCode) {
      case OpCode.READY: {
        const seat = seatOfUser(state, sender.userId);
        if (state.phase === 'lobby' && seat) {
          seat.ready = payload.ready === true;
          broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
        }
        break;
      }
      case OpCode.START:
        handleStart(state, dispatcher, tick, sender);
        break;
      case OpCode.ROLL_REQUEST:
        handleRollRequest(state, dispatcher, tick, sender);
        break;
      case OpCode.MOVE_REQUEST:
        handleMoveRequest(state, dispatcher, tick, sender, payload);
        break;
      case OpCode.SYNC_REQUEST:
        broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state), [sender]);
        break;
      case OpCode.CLAIM_SEAT: {
        const senderSeat = seatOfUser(state, sender.userId);
        const targetSeatIndex = typeof payload.seat === 'number' ? payload.seat : -1;
        if (state.phase === 'lobby' && targetSeatIndex >= 0 && targetSeatIndex < MAX_SEATS) {
          if (senderSeat) {
            if (senderSeat.seat === targetSeatIndex) {
              // Clicked own seat: toggle back to UNASSIGNED (unclaim)
              state.seats[targetSeatIndex] = null;
              broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
            } else if (state.seats[targetSeatIndex] === null) {
              // Move to new empty seat
              const oldIndex = senderSeat.seat;
              state.seats[oldIndex] = null;

              senderSeat.seat = targetSeatIndex;
              senderSeat.ready = true; // Claiming color makes player ready
              state.seats[targetSeatIndex] = senderSeat;
              broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
            }
          } else {
            // Unassigned player claiming an empty seat
            if (state.seats[targetSeatIndex] === null) {
              let displayName = '';
              try {
                const account = nk.accountGetId(sender.userId);
                displayName = (account.user.displayName || account.user.username || 'Player').slice(0, 24);
              } catch (error) {
                displayName = sender.username || 'Player';
              }

              state.seats[targetSeatIndex] = {
                userId: sender.userId,
                username: sender.username,
                displayName,
                seat: targetSeatIndex,
                ready: true, // Claiming color makes player ready
                connected: true,
              };
              broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
            }
          }
        }
        break;
      }
      default:
        break;
    }
  }

  if (
    state.phase === 'playing' &&
    state.turnDeadlineTick > 0 &&
    tick >= state.turnDeadlineTick
  ) {
    if (state.awaitingMove && state.legalPawns.length > 0) {
      doMove(state, dispatcher, tick, state.legalPawns[0]);
    } else {
      advanceTurn(state, dispatcher, tick, 'timeout');
    }
  }

  return { state };
};

const matchTerminate = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  graceSeconds: number,
): StateWrapper {
  return { state };
};

const matchSignal = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: LudoState,
  data: string,
): { state: LudoState; data?: string } {
  return { state };
};

export const ludoMatchHandler = {
  matchInit,
  matchJoinAttempt,
  matchJoin,
  matchLeave,
  matchLoop,
  matchTerminate,
  matchSignal,
};
