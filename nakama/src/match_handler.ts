// Authoritative 'ludo' match handler — the Nakama adapter around the pure
// reducer in match_reducer.ts: decode Nakama input into MatchEvents (with
// any facts that need storage already resolved), reduce, then emit the
// outbound list through the dispatcher. All timing lives in matchLoop ticks
// — the goja runtime has no setTimeout.

import { BOT_DISPLAY_NAME, OpCode, decodePayload, encodePayload, memberCosmetics, sanitizeCosmetics, sanitizeGameMode, sanitizeTable, tablePolicy } from '../../shared/protocol.js';
import { isMember } from './auth';
import { recordGamesPlayed, touchLastSeen } from './moderation';
import { ownedItems } from './store';
import { payGame, readTitles } from './progress';
import { noteGameStarted } from './referral';
import { GameLogEntry, GameLogSeat, recordGameFinished, recordGameLog, recordGameStarted } from './stats';
import {
  Clock,
  Cosmetics,
  LudoState,
  MAX_SEATS,
  MatchEvent,
  Outbound,
  SeatSetup,
  TICK_RATE,
  admitJoin,
  gameOverPayload,
  humanUserIds,
  initialState,
  makeLabel,
  reduce,
} from './match_reducer';

interface StateWrapper {
  state: LudoState;
}

function clockAt(tick: number): Clock {
  return { tick, nowMs: Date.now(), random: Math.random };
}

// ── Emit ──────────────────────────────────────────────────────────────

function emit(nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, state: LudoState, outbound: Outbound[]) {
  for (let i = 0; i < outbound.length; i += 1) {
    const item = outbound[i];
    if (item.kind === 'send') {
      let to: nkruntime.Presence[] | null = null;
      if (item.to) {
        to = [];
        for (let k = 0; k < item.to.length; k += 1) {
          const presence = state.presences[item.to[k]] as nkruntime.Presence | undefined;
          if (presence) {
            to.push(presence);
          }
        }
        if (!to.length) {
          continue;
        }
      }
      dispatcher.broadcastMessage(item.opCode, encodePayload(item.payload), to, null, true);
    } else if (item.kind === 'label') {
      dispatcher.matchLabelUpdate(makeLabel(state));
    } else if (item.kind === 'gameStarted') {
      gameStarted(nk, state);
    } else if (item.kind === 'gameOver') {
      gameOver(nk, dispatcher, state);
    }
  }
}

function run(nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, state: LudoState, event: MatchEvent, tick: number): boolean {
  const result = reduce(state, event, clockAt(tick));
  emit(nk, dispatcher, state, result.outbound);
  return result.end;
}

// ── Storage-backed bookkeeping ────────────────────────────────────────

function gameStarted(nk: nkruntime.Nakama, state: LudoState) {
  // CONTEXT.md: Referral — starting a game is half of the payout condition.
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot && !seat.companion && seat.userId) {
      try {
        noteGameStarted(nk, seat.userId);
      } catch (error) {
        // Never block a game start on bookkeeping.
      }
    }
  }
  recordGameStarted(nk);
  // A Shared table's other players have no identity of their own, and its
  // owner didn't play a game of their own either.
  if (tablePolicy(state.table).playerStats) {
    recordGamesPlayed(nk, humanUserIds(state));
  }
}

function finishedPawns(state: LudoState, seat: number): number {
  let finished = 0;
  for (let j = 0; j < 4; j += 1) {
    if (state.pawns[seat][j] > 40) finished += 1;
  }
  return finished;
}

// Pays every seat a human still holds at game over (an Abandoned seat too;
// a Leave already turned its seat into a Bot, so leaving forfeits).
// Companions are the Shared table's owner playing for someone else.
function payFinishedGame(nk: nkruntime.Nakama, state: LudoState) {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (!seat || seat.bot || seat.companion || !seat.userId) {
      state.earned[i] = null;
      continue;
    }
    const stats = state.stats[i];
    state.earned[i] = payGame(nk, seat.userId, state.table, {
      pawnsHome: finishedPawns(state, i),
      captures: stats.captures,
      sixes: stats.sixes,
      captured: stats.captured,
      won: i === state.winnerSeat,
      gameMode: state.gameMode,
    });
    const earned = state.earned[i];
    if (earned && earned.newTitles && earned.newTitles.length && !state.titles[seat.userId]) {
      state.titles[seat.userId] = readTitles(nk, seat.userId).shownTitle;
    }
  }
}

// One finished game for the game log (stats.ts): per-seat counters plus who
// sat there at the end. No names or ids — just enough for aggregate numbers
// (does going first help, how long a Quick game takes, are the dice fair).
function gameLogEntry(state: LudoState): GameLogEntry {
  const seats: (GameLogSeat | null)[] = [];
  let firstSeat = -1;
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (!seat) {
      seats.push(null);
      continue;
    }
    if (firstSeat < 0) firstSeat = i;
    const s = state.stats[i];
    seats.push({
      kind: seat.bot ? 'bot' : (seat.companion ? 'companion' : 'human'),
      connected: seat.connected,
      rolls: s.rolls,
      sixes: s.sixes,
      faces: s.faces,
      moves: s.moves,
      captures: s.captures,
      captured: s.captured,
      finished: finishedPawns(state, i),
    });
  }
  return {
    at: Date.now(),
    durationMs: state.startedAtMs ? Date.now() - state.startedAtMs : 0,
    rounds: state.round,
    gameMode: state.gameMode,
    room: state.mode,
    table: state.table,
    firstSeat,
    winnerSeat: state.winnerSeat,
    seats,
  };
}

// Points are paid before GAME_OVER goes out: it carries what each seat earned.
function gameOver(nk: nkruntime.Nakama, dispatcher: nkruntime.MatchDispatcher, state: LudoState) {
  payFinishedGame(nk, state);
  dispatcher.broadcastMessage(OpCode.GAME_OVER, encodePayload(gameOverPayload(state, Date.now())), null, null, true);

  // Bots are left out of the player list; a Bot win is recorded as one.
  const playerNames: string[] = [];
  let winnerName = BOT_DISPLAY_NAME;
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const s = state.seats[i];
    if (s && !s.bot) {
      playerNames.push(s.displayName || s.username || 'Player');
      if (i === state.winnerSeat) {
        winnerName = s.displayName || s.username || 'Player';
      }
    }
  }
  recordGameFinished(nk, state.mode, state.table, playerNames, winnerName);
  recordGameLog(nk, gameLogEntry(state));
}

// ── Decode ────────────────────────────────────────────────────────────

function resolveDisplayName(nk: nkruntime.Nakama, state: LudoState, presence: nkruntime.Presence): string {
  const pending = state.pendingDisplayNames[presence.userId];
  if (pending) {
    return pending;
  }
  const known = state.displayNames[presence.userId];
  if (known) {
    return known;
  }
  try {
    const account = nk.accountGetId(presence.userId);
    return (account.user.displayName || account.user.username || 'Player').slice(0, 24);
  } catch (error) {
    return presence.username || 'Player';
  }
}

// Join metadata may carry { prop, finisher, flag, pawns }; a join without
// them keeps whatever the user had (e.g. a reconnect from an older client).
// Once the game is running, a rejoining player keeps the Cosmetics they
// started with. CONTEXT.md: Guest, Price tier — memberCosmetics.
function rememberCosmetics(nk: nkruntime.Nakama, state: LudoState, userId: string, metadata: { [key: string]: any }) {
  try {
    state.titles[userId] = readTitles(nk, userId).shownTitle;
  } catch (error) {
    state.titles[userId] = '';
  }
  if (state.cosmetics[userId] && state.phase !== 'lobby') {
    return;
  }
  const member = isMember(nk, userId);
  if (!member) {
    state.cosmetics[userId] = memberCosmetics(null, false, []);
  } else if (metadata && (typeof metadata.prop === 'string' || typeof metadata.finisher === 'string' || typeof metadata.flag === 'string' || typeof metadata.pawns === 'string')) {
    state.cosmetics[userId] = memberCosmetics(metadata, true, ownedItems(nk, userId));
  } else if (!state.cosmetics[userId]) {
    state.cosmetics[userId] = sanitizeCosmetics(null);
  }
}

// A match message as a MatchEvent (null: not one the match handles).
function decodeMessage(nk: nkruntime.Nakama, message: nkruntime.MatchMessage): MatchEvent | null {
  const payload = decodePayload(message.data);
  const userId = message.sender.userId;
  switch (message.opCode) {
    case OpCode.READY:
      return { type: 'ready', userId, ready: payload.ready === true };
    case OpCode.START:
      return { type: 'start', userId };
    case OpCode.SET_COSMETICS: {
      const member = isMember(nk, userId);
      return { type: 'setCosmetics', userId, member, cosmetics: memberCosmetics(payload, member, member ? ownedItems(nk, userId) : []) as Cosmetics };
    }
    case OpCode.PLAY_AGAIN:
      return { type: 'playAgain', userId };
    case OpCode.LEAVE:
      return { type: 'leaveIntent', userId };
    case OpCode.ROLL_REQUEST:
      return { type: 'roll', userId, demand: typeof payload.demand === 'number' ? payload.demand : undefined };
    case OpCode.MOVE_REQUEST:
      return { type: 'move', userId, pawnIndex: typeof payload.pawnIndex === 'number' ? payload.pawnIndex : -1 };
    case OpCode.SYNC_REQUEST:
      return { type: 'syncRequest', userId };
    case OpCode.CLAIM_SEAT:
      return { type: 'claimSeat', userId, username: message.sender.username, seat: typeof payload.seat === 'number' ? payload.seat : -1 };
    default:
      return null;
  }
}

function parseSharedSeats(raw: string | undefined): SeatSetup[] | null {
  if (!raw) {
    return null;
  }
  try {
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) {
      return null;
    }
    const seats: SeatSetup[] = [];
    let players = 0;
    for (let i = 0; i < MAX_SEATS; i += 1) {
      const entry = list[i] || {};
      const kind = entry.kind === 'player' ? 'player' : 'computer';
      if (kind === 'player') {
        players += 1;
      }
      seats.push({ kind, name: typeof entry.name === 'string' ? entry.name.trim().slice(0, 24) : '' });
    }
    return players >= 2 ? seats : null;
  } catch (error) {
    return null;
  }
}

// ── Nakama match handler ──────────────────────────────────────────────

const matchInit = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  params: { [key: string]: string },
): { state: LudoState; tickRate: number; label: string } {
  const requestedEnv = params && params.environment ? String(params.environment) : 'day';
  const state = initialState({
    mode: params && params.mode === 'public' ? 'public' : 'private',
    joinCode: params && params.code ? String(params.code) : null,
    environment: ['day', 'night', 'dusk', 'dawn'].indexOf(requestedEnv) !== -1 ? requestedEnv : 'day',
    gameMode: sanitizeGameMode(params && params.gameMode ? String(params.gameMode) : ''),
    table: sanitizeTable(params && params.table ? String(params.table) : ''),
    ownerUserId: params && params.owner ? String(params.owner) : null,
    sharedSeats: parseSharedSeats(params && params.seats),
    demoDice: !!ctx.env && ctx.env['DEMO_DICE'] === '1',
    dev: !!params && params.dev === '1',
  }, Math.random);
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
  const decision = admitJoin(state, presence.userId);
  if (!decision.accept) {
    return { state, accept: false, rejectMessage: decision.rejectMessage };
  }
  if (!decision.reconnect && metadata && typeof metadata.displayName === 'string' && metadata.displayName) {
    state.pendingDisplayNames[presence.userId] = String(metadata.displayName).slice(0, 24);
  }
  rememberCosmetics(nk, state, presence.userId, metadata);
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
    touchLastSeen(nk, presence.userId);
    run(nk, dispatcher, state, { type: 'join', presence, displayName: resolveDisplayName(nk, state, presence) }, tick);
  }
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
    run(nk, dispatcher, state, { type: 'leave', userId: presences[p].userId }, tick);
  }
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
  if (state.ended) {
    return null;
  }
  for (let m = 0; m < messages.length; m += 1) {
    const event = decodeMessage(nk, messages[m]);
    if (event && run(nk, dispatcher, state, event, tick)) {
      return null;
    }
  }
  return run(nk, dispatcher, state, { type: 'tick' }, tick) ? null : { state };
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
