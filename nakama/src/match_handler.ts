// Authoritative 'ludo' match handler. All timing lives in matchLoop ticks —
// the goja runtime has no setTimeout.

import { BOT_DISPLAY_NAME, DEFAULT_FINISHER, FINISHER_IDS, NO_FINISHER, OpCode, decodePayload, encodePayload, guestCosmetics, isClosedTable, itemTier, sanitizeCosmetics, sanitizeGameMode, sanitizeTable, wearableCosmetics } from '../../shared/protocol.js';
import { isMember } from './auth';
import { recordGamesPlayed, touchLastSeen } from './moderation';
import { ownedItems } from './store';
import {
  allHome,
  applyMove,
  chooseBotMove,
  devPawns,
  initialPawns,
  legalPawns,
  rollDie,
} from './ludo_logic';
import { GameLogEntry, GameLogSeat, recordGameFinished, recordGameLog, recordGameStarted } from './stats';

const TICK_RATE = 2; // ticks per second
// Keep in sync with the client's turn-timer bar (store.turnTimer.duration).
const TURN_TIMEOUT_TICKS = 60 * TICK_RATE;
const DISCONNECTED_TURN_TIMEOUT_TICKS = 6 * TICK_RATE;
const EMPTY_TERMINATE_TICKS = 60 * TICK_RATE;
// A Solo/Shared table waits this long for its owner to come back (adr/0002).
const CLOSED_TERMINATE_TICKS = 10 * 60 * TICK_RATE;
const MAX_ROLLS_WHEN_ALL_HOME = 3;
const MAX_SEATS = 4;
// Bot pacing (CONTEXT.md: Bot) — roughly how long clients take to show what
// just happened, so a Bot never acts while the board is still animating.
const BOT_THINK_TICKS = 2; // before a Bot rolls
const BOT_DICE_TICKS = 5; // dice physics settling before the Bot moves
const BOT_STEP_MS = 220; // client PAWN_STEP_DURATION_MS
const BOT_MOVE_EXTRA_MS = 600;
const BOT_CAPTURE_MS = 3200; // a Finisher (or the lite burst + flight home)

export interface Seat {
  userId: string;
  username: string;
  displayName: string;
  seat: number;
  ready: boolean;
  connected: boolean;
  // CONTEXT.md: Bot — no human owner (userId ''), played by the server.
  bot: boolean;
  // Shared table: a human seat the owner's device plays for someone else
  // (userId is the owner's). Wears no Cosmetics, captures without a Finisher.
  companion?: boolean;
}

// Shared-table setup, one entry per seat (create_table RPC).
interface SeatSetup {
  kind: 'player' | 'computer';
  name: string;
}

export interface SeatStats {
  rolls: number;
  sixes: number;
  moves: number;
  captures: number;
  captured: number;
  // How often each face 1..6 came up (game log only, not sent to clients).
  faces: number[];
}

function emptyStats(): SeatStats[] {
  const stats: SeatStats[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    stats.push({ rolls: 0, sixes: 0, moves: 0, captures: 0, captured: 0, faces: [0, 0, 0, 0, 0, 0] });
  }
  return stats;
}

// The end-of-game board: the counters plus pawns in the finish per seat.
function gameOverPayload(state: LudoState): object {
  const stats = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const s = state.stats[i];
    let finished = 0;
    for (let j = 0; j < 4; j += 1) {
      if (state.pawns[i][j] > 40) finished += 1;
    }
    stats.push({ rolls: s.rolls, sixes: s.sixes, moves: s.moves, captures: s.captures, captured: s.captured, finished });
  }
  return {
    winnerSeat: state.winnerSeat,
    stats,
    durationMs: state.startedAtMs ? Date.now() - state.startedAtMs : 0,
    rounds: state.round,
  };
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
    let finished = 0;
    for (let j = 0; j < 4; j += 1) {
      if (state.pawns[i][j] > 40) finished += 1;
    }
    seats.push({
      kind: seat.bot ? 'bot' : (seat.companion ? 'companion' : 'human'),
      connected: seat.connected,
      rolls: s.rolls,
      sixes: s.sixes,
      faces: s.faces,
      moves: s.moves,
      captures: s.captures,
      captured: s.captured,
      finished,
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

export interface LudoState {
  phase: 'lobby' | 'playing' | 'finished';
  mode: 'private' | 'public';
  joinCode: string | null;
  // Chosen by the room creator; every client renders the match in it.
  environment: string;
  // CONTEXT.md: Game mode — 'classic' | 'quick' | 'firstCapture', fixed at
  // room creation (rules: ludo_logic initialPawns/applyMove).
  gameMode: string;
  // CONTEXT.md: Table — 'open' | 'solo' | 'shared'. Solo/shared tables
  // belong to ownerUserId alone: never joinable, no turn timer, paused while
  // the owner is away, ended by their LEAVE.
  table: string;
  ownerUserId: string | null;
  sharedSeats: SeatSetup[] | null;
  // Set by a LEAVE at a closed table; matchLoop then ends the match.
  ended: boolean;
  seats: (Seat | null)[];
  // userId -> displayName for everyone who ever joined (seated or not) —
  // broadcast so chat can name players who haven't picked a color yet.
  displayNames: { [userId: string]: string };
  // userId -> Cosmetics ({ prop, finisher }), whitelisted. Keyed by user, not
  // seat, so an unseated joiner's pick is known before they claim a color and
  // a disconnected seat keeps its owner's look.
  cosmetics: { [userId: string]: Cosmetics };
  // userId -> true once that player used their one mid-game Cosmetics change.
  restyled: { [userId: string]: boolean };
  hostUserId: string | null;
  turnSeat: number;
  round: number;
  dice: number | null;
  awaitingMove: boolean;
  legalPawns: number[];
  rollsThisTurn: number;
  pawns: number[][];
  turnDeadlineTick: number;
  // Earliest tick a Bot may roll or move (see the BOT_* pacing constants).
  botActTick: number;
  // The turn-holder's own deadline while they're disconnected (the live one
  // is cut to DISCONNECTED_TURN_TIMEOUT_TICKS); restored if they come back
  // in time, e.g. a page refresh mid-turn.
  savedTurnDeadline: { seat: number; tick: number } | null;
  emptyTicks: number;
  winnerSeat: number | null;
  // Per seat, for the end-of-game board (GAME_OVER / finished STATE_SYNC).
  stats: SeatStats[];
  startedAtMs: number;
  presences: { [userId: string]: nkruntime.Presence };
  pendingDisplayNames: { [userId: string]: string };
  labelOpen: number;
  // DEMO_DICE=1 runtime env: ROLL_REQUEST may carry { demand: 1..6 } and the
  // server rolls exactly that value (testing shortcut — never enable in prod).
  demoDice: boolean;
  // A dev table (create_table { dev: true }, honored only with DEMO_DICE=1):
  // games start from ludo_logic devPawns instead of all-home.
  devLayout: boolean;
}

// shared/protocol.js sanitizeCosmetics: Finisher per player, Prop per pawn
// (top-level prop/flag mirror pawn 0 for older clients).
export interface Cosmetics {
  finisher: string;
  pawns: { prop: string; flag: string }[];
  prop: string;
  flag: string;
}

interface StateWrapper {
  state: LudoState;
}

function makeLabel(state: LudoState): string {
  return JSON.stringify({
    mode: state.mode,
    gameMode: state.gameMode,
    table: state.table,
    code: state.joinCode || '',
    open: state.labelOpen,
  });
}

// The user's own seat (at a Shared table, never one of their companions).
function seatOfUser(state: LudoState, userId: string): Seat | null {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot && !seat.companion && seat.userId === userId) {
      return seat;
    }
  }
  return null;
}

// The seat whose turn it is is played from this user's device — their own
// seat, or a companion seat at their Shared table.
function holdsTurn(state: LudoState, userId: string): boolean {
  const seat = state.seats[state.turnSeat];
  return !!seat && !seat.bot && seat.userId === userId;
}

function isClosed(state: LudoState): boolean {
  return isClosedTable(state.table);
}

// Every seat no human holds is a Bot (CONTEXT.md: Bot), from matchInit on.
function botSeat(index: number): Seat {
  return {
    userId: '',
    username: '',
    displayName: BOT_DISPLAY_NAME,
    seat: index,
    ready: true,
    connected: true,
    bot: true,
  };
}

function humanSeat(index: number, userId: string, username: string, displayName: string): Seat {
  return { userId, username, displayName, seat: index, ready: true, connected: true, bot: false };
}

// A seat a human may take: a Bot's (or, defensively, an empty slot).
function isTakeable(seat: Seat | null): boolean {
  return !seat || seat.bot;
}

function humanUserIds(state: LudoState): string[] {
  const ids: string[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot) {
      ids.push(seat.userId);
    }
  }
  return ids;
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
    displayNames: state.displayNames,
    cosmetics: state.cosmetics,
    environment: state.environment,
    gameMode: state.gameMode,
    table: state.table,
  };
}

// Time left on the current turn, so clients can show the real remaining
// time (refresh / drop-in / tab return) instead of restarting the bar.
function turnMsLeft(state: LudoState, tick: number): number {
  if (state.phase !== 'playing' || state.turnDeadlineTick <= 0) {
    return 0;
  }
  return Math.max(0, state.turnDeadlineTick - tick) * (1000 / TICK_RATE);
}

function snapshotPayload(state: LudoState, tick: number): object {
  return {
    phase: state.phase,
    seats: state.seats,
    hostUserId: state.hostUserId,
    joinCode: state.joinCode,
    displayNames: state.displayNames,
    cosmetics: state.cosmetics,
    restyled: state.restyled,
    gameOver: state.phase === 'finished' ? gameOverPayload(state) : null,
    environment: state.environment,
    gameMode: state.gameMode,
    table: state.table,
    turnSeat: state.turnSeat,
    round: state.round,
    dice: state.dice,
    awaitingMove: state.awaitingMove,
    legalPawns: state.legalPawns,
    pawns: state.pawns,
    winnerSeat: state.winnerSeat,
    turnMsLeft: turnMsLeft(state, tick),
  };
}

function hasFreeSeat(state: LudoState): boolean {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    if (isTakeable(state.seats[i])) {
      return true;
    }
  }
  return false;
}

// A seat whose player left mid-game: a newcomer may take it over, pawns and all.
function hasAbandonedSeat(state: LudoState): boolean {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot && !seat.connected) {
      return true;
    }
  }
  return false;
}

// Drives label.open: lobbies with a Bot seat, and running games with a Bot
// or an Abandoned seat, are joinable.
function isJoinable(state: LudoState): boolean {
  if (isClosed(state)) {
    return false;
  }
  if (state.phase === 'lobby') {
    return hasFreeSeat(state);
  }
  if (state.phase === 'playing') {
    return hasFreeSeat(state) || hasAbandonedSeat(state);
  }
  return false;
}

function refreshOpenLabel(state: LudoState, dispatcher: nkruntime.MatchDispatcher) {
  const open = isJoinable(state) ? 1 : 0;
  if (open !== state.labelOpen) {
    state.labelOpen = open;
    dispatcher.matchLabelUpdate(makeLabel(state));
  }
}

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

function broadcast(dispatcher: nkruntime.MatchDispatcher, opCode: number, payload: object, to?: nkruntime.Presence[]) {
  dispatcher.broadcastMessage(opCode, encodePayload(payload), to || null, null, true);
}

function reject(dispatcher: nkruntime.MatchDispatcher, sender: nkruntime.Presence, reason: string, forOpCode: number) {
  broadcast(dispatcher, OpCode.REJECTED, { reason, forOpCode }, [sender]);
}

// Cosmetics ride join metadata and change freely in the lobby. Once the
// game runs, each seated Member may restyle exactly once per match (the
// in-game Wardrobe); a Guest asking is told to register instead.
function handleSetCosmetics(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, sender: nkruntime.Presence, payload: any) {
  const userId = sender.userId;
  if (state.phase === 'lobby') {
    state.cosmetics[userId] = isMember(nk, userId) ? wearableCosmetics(payload, ownedItems(nk, userId)) : guestCosmetics();
    broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
    return;
  }
  if (state.phase !== 'playing' || !seatOfUser(state, userId)) {
    reject(dispatcher, sender, 'not_seated', OpCode.SET_COSMETICS);
    return;
  }
  if (!isMember(nk, userId)) {
    reject(dispatcher, sender, 'members_only', OpCode.SET_COSMETICS);
    return;
  }
  if (state.restyled[userId]) {
    reject(dispatcher, sender, 'restyle_used', OpCode.SET_COSMETICS);
    return;
  }
  state.restyled[userId] = true;
  state.cosmetics[userId] = wearableCosmetics(payload, ownedItems(nk, userId));
  broadcast(dispatcher, OpCode.COSMETICS_CHANGED, { userId, cosmetics: state.cosmetics[userId] });
}

function resetTurnState(state: LudoState) {
  state.dice = null;
  state.awaitingMove = false;
  state.legalPawns = [];
  state.rollsThisTurn = 0;
}

function turnDeadline(state: LudoState, tick: number): number {
  state.savedTurnDeadline = null;
  // Nobody else is waiting at a Solo/Shared table: no turn timer (0 = none).
  if (isClosed(state)) {
    return 0;
  }
  const seat = state.seats[state.turnSeat];
  const ticks = seat && seat.connected ? TURN_TIMEOUT_TICKS : DISCONNECTED_TURN_TIMEOUT_TICKS;
  return tick + ticks;
}

// A random Finisher any Member gets for free (never a premium/special one).
function botFinisher(): string {
  const free = FINISHER_IDS.filter((id: string) => itemTier('finisher', id).tier === 'free');
  return free.length ? free[Math.floor(Math.random() * free.length)] : DEFAULT_FINISHER;
}

// Keeps a Bot from acting before `ticks` from now (never shortens a hold).
function holdBots(state: LudoState, tick: number, ticks: number) {
  state.botActTick = Math.max(state.botActTick, tick + ticks);
}

function advanceTurn(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, reason: string) {
  resetTurnState(state);
  holdBots(state, tick, BOT_THINK_TICKS);

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
    turnMsLeft: turnMsLeft(state, tick),
  });
}

function repeatTurn(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number) {
  resetTurnState(state);
  holdBots(state, tick, BOT_THINK_TICKS);
  state.turnDeadlineTick = turnDeadline(state, tick);

  broadcast(dispatcher, OpCode.TURN_CHANGE, {
    turnSeat: state.turnSeat,
    round: state.round,
    reason: 'repeat',
    turnMsLeft: turnMsLeft(state, tick),
  });
}

function doMove(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, pawnIndex: number) {
  const seat = state.turnSeat;
  const steps = state.dice as number;
  const result = applyMove(state.pawns, seat, pawnIndex, steps, state.gameMode);
  state.stats[seat].moves += 1;
  state.stats[seat].captures += result.captures.length;
  for (let c = 0; c < result.captures.length; c += 1) {
    state.stats[result.captures[c].seat].captured += 1;
  }
  const mover = state.seats[seat];
  const moverCosmetics = mover && !mover.bot ? state.cosmetics[mover.userId] : null;
  const moveMs = (result.fromPos === 0 ? 1 : steps) * BOT_STEP_MS + BOT_MOVE_EXTRA_MS +
    (result.captures.length > 0 ? BOT_CAPTURE_MS : 0);
  holdBots(state, tick, Math.ceil(moveMs / (1000 / TICK_RATE)));

  broadcast(dispatcher, OpCode.MOVE_APPLIED, {
    seat,
    pawnIndex,
    fromPos: result.fromPos,
    toPos: result.toPos,
    steps,
    captures: result.captures,
    extraTurn: result.extraTurn && !result.won,
    // Stamped here so every client plays the same Finisher even if the
    // mover changes cosmetics while this event is still queued client-side.
    // A Bot wears no Props but captures with a random free Finisher, so
    // games against Computers show the cinematics too.
    finisher: mover && mover.bot ? botFinisher() : (moverCosmetics && mover && !mover.companion ? moverCosmetics.finisher : NO_FINISHER),
  });

  if (result.won) {
    state.phase = 'finished';
    state.winnerSeat = seat;
    state.turnDeadlineTick = 0;
    resetTurnState(state);
    broadcast(dispatcher, OpCode.GAME_OVER, gameOverPayload(state));
    // A finished match takes no more joiners — close the label.
    refreshOpenLabel(state, dispatcher);

    // Bots are left out of the player list; a Bot win is recorded as one.
    const playerNames: string[] = [];
    let winnerName = BOT_DISPLAY_NAME;
    for (let i = 0; i < MAX_SEATS; i += 1) {
      const s = state.seats[i];
      if (s && !s.bot) {
        playerNames.push(s.displayName || s.username || 'Player');
        if (i === seat) {
          winnerName = s.displayName || s.username || 'Player';
        }
      }
    }
    recordGameFinished(nk, state.mode, state.table, playerNames, winnerName);
    recordGameLog(nk, gameLogEntry(state));
    return;
  }

  if (result.extraTurn) {
    repeatTurn(state, dispatcher, tick);
  } else {
    advanceTurn(state, dispatcher, tick, 'end');
  }
}

function handleRollRequest(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence, payload: { demand?: number }) {
  if (
    state.phase !== 'playing' ||
    !holdsTurn(state, sender.userId) ||
    state.dice !== null ||
    state.awaitingMove
  ) {
    reject(dispatcher, sender, 'not_your_roll', OpCode.ROLL_REQUEST);
    return;
  }

  const demand = state.demoDice && typeof payload.demand === 'number' ? Math.floor(payload.demand) : 0;
  rollForTurn(state, dispatcher, tick, demand >= 1 && demand <= 6 ? demand : rollDie());
}

// The turn-holder rolls `value` (validated by the caller; Bots call it
// directly).
function rollForTurn(state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, value: number) {
  holdBots(state, tick, BOT_DICE_TICKS);
  state.dice = value;
  state.rollsThisTurn += 1;
  state.stats[state.turnSeat].rolls += 1;
  state.stats[state.turnSeat].faces[value - 1] += 1;
  if (value === 6) {
    state.stats[state.turnSeat].sixes += 1;
  }

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
      turnMsLeft: turnMsLeft(state, tick),
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
      turnMsLeft: turnMsLeft(state, tick),
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

// One Bot action per call: roll, or move the chosen pawn.
function playBot(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number) {
  if (state.awaitingMove && state.legalPawns.length > 0) {
    doMove(nk, state, dispatcher, tick, chooseBotMove(state.pawns, state.turnSeat, state.dice as number, state.legalPawns));
  } else if (state.dice === null) {
    rollForTurn(state, dispatcher, tick, rollDie());
  }
}

function handleMoveRequest(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence, payload: { pawnIndex?: number }) {
  const pawnIndex = typeof payload.pawnIndex === 'number' ? payload.pawnIndex : -1;

  if (
    state.phase !== 'playing' ||
    !holdsTurn(state, sender.userId) ||
    !state.awaitingMove ||
    state.legalPawns.indexOf(pawnIndex) === -1
  ) {
    reject(dispatcher, sender, 'illegal_move', OpCode.MOVE_REQUEST);
    return;
  }

  doMove(nk, state, dispatcher, tick, pawnIndex);
}

function handleStart(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence) {
  if (state.phase !== 'lobby' || sender.userId !== state.hostUserId) {
    reject(dispatcher, sender, 'not_host', OpCode.START);
    return;
  }

  // Bots hold every other seat, so the host may start whenever they hold one.
  if (!seatOfUser(state, sender.userId)) {
    reject(dispatcher, sender, 'not_seated', OpCode.START);
    return;
  }

  startGame(nk, state, dispatcher, tick);
}

function startGame(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number) {
  state.phase = 'playing';
  state.pawns = state.devLayout ? devPawns() : initialPawns(state.gameMode);
  state.round = 1;
  state.stats = emptyStats();
  state.startedAtMs = Date.now();
  state.winnerSeat = null;
  resetTurnState(state);

  for (let i = 0; i < MAX_SEATS; i += 1) {
    if (state.seats[i]) {
      state.turnSeat = i;
      break;
    }
  }
  state.turnDeadlineTick = turnDeadline(state, tick);
  state.botActTick = tick + BOT_THINK_TICKS;
  // A started game stays open (label-wise) while it still has a Bot seat —
  // drop-in joiners take Bots over.
  state.labelOpen = isJoinable(state) ? 1 : 0;

  broadcast(dispatcher, OpCode.GAME_START, {
    seats: state.seats,
    gameMode: state.gameMode,
    table: state.table,
    // Starting positions (Quick mode begins with a pawn out per seat).
    pawns: state.pawns,
    turnSeat: state.turnSeat,
    round: state.round,
    turnMsLeft: turnMsLeft(state, tick),
  });
  dispatcher.matchLabelUpdate(makeLabel(state));
  recordGameStarted(nk);
  // A Shared table's other players have no identity of their own, and its
  // owner didn't play a game of their own either.
  if (state.table !== 'shared') {
    recordGamesPlayed(nk, humanUserIds(state));
  }
}

// Seats a Solo/Shared table's owner on their first join. Solo: the owner at
// seat 0, Bots elsewhere. Shared: per the setup — the first player entry is
// the owner's own seat, every other player entry a companion seat.
function seatClosedTable(state: LudoState, presence: nkruntime.Presence) {
  const ownName = state.displayNames[presence.userId] || presence.username || 'Player';
  if (state.table === 'solo' || !state.sharedSeats) {
    state.seats[0] = humanSeat(0, presence.userId, presence.username, ownName);
    return;
  }
  let ownerSeated = false;
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const setup = state.sharedSeats[i];
    if (!setup || setup.kind !== 'player') {
      state.seats[i] = botSeat(i);
      continue;
    }
    const seat = humanSeat(i, presence.userId, presence.username, setup.name || (ownerSeated ? 'Player ' + (i + 1) : ownName));
    if (ownerSeated) {
      seat.companion = true;
    }
    ownerSeated = true;
    state.seats[i] = seat;
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

const matchInit = function (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  params: { [key: string]: string },
): { state: LudoState; tickRate: number; label: string } {
  const mode: 'private' | 'public' = params && params.mode === 'public' ? 'public' : 'private';
  const joinCode = params && params.code ? String(params.code) : null;
  const requestedEnv = params && params.environment ? String(params.environment) : 'day';
  const environment = ['day', 'night', 'dusk', 'dawn'].indexOf(requestedEnv) !== -1 ? requestedEnv : 'day';
  const table = sanitizeTable(params && params.table ? String(params.table) : '');
  const closed = isClosedTable(table);
  // Solo/Shared tables are Classic for now (CONTEXT.md: Table).
  const gameMode = closed ? 'classic' : sanitizeGameMode(params && params.gameMode ? String(params.gameMode) : '');

  const state: LudoState = {
    phase: 'lobby',
    mode: closed ? 'private' : mode,
    joinCode,
    environment,
    gameMode,
    table,
    ownerUserId: closed && params.owner ? String(params.owner) : null,
    sharedSeats: table === 'shared' ? parseSharedSeats(params.seats) : null,
    ended: false,
    seats: [botSeat(0), botSeat(1), botSeat(2), botSeat(3)],
    displayNames: {},
    cosmetics: {},
    restyled: {},
    hostUserId: null,
    turnSeat: -1,
    round: 0,
    dice: null,
    awaitingMove: false,
    legalPawns: [],
    rollsThisTurn: 0,
    pawns: initialPawns(gameMode),
    turnDeadlineTick: 0,
    botActTick: 0,
    savedTurnDeadline: null,
    emptyTicks: 0,
    winnerSeat: null,
    stats: emptyStats(),
    startedAtMs: 0,
    presences: {},
    pendingDisplayNames: {},
    labelOpen: closed ? 0 : 1,
    demoDice: !!ctx.env && ctx.env['DEMO_DICE'] === '1',
    devLayout: false,
  };
  state.devLayout = state.demoDice && closed && params.dev === '1';

  return { state, tickRate: TICK_RATE, label: makeLabel(state) };
};

// Join metadata may carry { prop, finisher, flag }; a join without them keeps
// whatever the user had (e.g. a reconnect from an older client). Once the
// game is running, a rejoining player keeps the Cosmetics they started with.
// Guests wear nothing whatever their client sends (CONTEXT.md: Guest), and
// a Member only what is free or Entitled (CONTEXT.md: Price tier).
function rememberCosmetics(nk: nkruntime.Nakama, state: LudoState, userId: string, metadata: { [key: string]: any }) {
  if (state.cosmetics[userId] && state.phase !== 'lobby') {
    return;
  }
  if (!isMember(nk, userId)) {
    state.cosmetics[userId] = guestCosmetics();
  } else if (metadata && (typeof metadata.prop === 'string' || typeof metadata.finisher === 'string' || typeof metadata.flag === 'string' || typeof metadata.pawns === 'string')) {
    state.cosmetics[userId] = wearableCosmetics(metadata, ownedItems(nk, userId));
  } else if (!state.cosmetics[userId]) {
    state.cosmetics[userId] = sanitizeCosmetics(null);
  }
}

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
  // A Solo/Shared table is its owner's alone.
  if (isClosed(state) && presence.userId !== state.ownerUserId) {
    return { state, accept: false, rejectMessage: 'table_closed' };
  }

  const existing = seatOfUser(state, presence.userId);

  if (existing) {
    if (existing.connected) {
      return { state, accept: false, rejectMessage: 'already_joined' };
    }
    rememberCosmetics(nk, state, presence.userId, metadata);
    return { state, accept: true }; // reconnect
  }

  if (state.phase === 'finished') {
    return { state, accept: false, rejectMessage: 'match_over' };
  }

  if (isClosed(state)) {
    // The owner's first join (the game starts in matchJoin).
    rememberCosmetics(nk, state, presence.userId, metadata);
    return { state, accept: state.phase === 'lobby', rejectMessage: 'match_over' };
  }

  // Lobby: any free seat. Playing: drop-in is allowed onto a free seat or an
  // abandoned (disconnected) one — the newcomer picks it in the 3D scene.
  const joinable = state.phase === 'lobby'
    ? hasFreeSeat(state)
    : hasFreeSeat(state) || hasAbandonedSeat(state);
  if (!joinable) {
    return { state, accept: false, rejectMessage: 'match_full' };
  }

  if (metadata && typeof metadata.displayName === 'string' && metadata.displayName) {
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
    state.presences[presence.userId] = presence;
    touchLastSeen(nk, presence.userId);

    // Track the name of everyone in the match (seated or not) so chat and
    // seat claims can use it without another account lookup.
    state.displayNames[presence.userId] = resolveDisplayName(nk, state, presence);
    delete state.pendingDisplayNames[presence.userId];

    const existing = seatOfUser(state, presence.userId);
    if (existing) {
      existing.connected = true;
      // Back before the shortened deadline ran out: same turn, so give them
      // back the time they had (never more).
      const saved = state.savedTurnDeadline;
      if (saved && saved.seat === existing.seat) {
        if (state.phase === 'playing' && saved.seat === state.turnSeat && saved.tick > state.turnDeadlineTick) {
          state.turnDeadlineTick = saved.tick;
        }
        state.savedTurnDeadline = null;
      }
      // A paused Solo/Shared table resumes: give the client a moment to
      // rebuild the board before a Bot acts.
      if (isClosed(state)) {
        holdBots(state, tick, BOT_DICE_TICKS);
      }
      if (state.phase !== 'lobby') {
        broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state, tick), [presence]);
      }
      continue;
    }

    // New players join as unassigned; they pick their seat/color by clicking
    // a base in 3D. Mid-game drop-ins need the snapshot to see the board.
    if (state.phase !== 'lobby') {
      broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state, tick), [presence]);
    }

    if (!state.hostUserId) {
      state.hostUserId = presence.userId;
    }
  }

  refreshOpenLabel(state, dispatcher);
  broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));

  // A Solo/Shared table starts as soon as its owner is in — no lobby step.
  if (isClosed(state) && state.phase === 'lobby' && state.ownerUserId && state.presences[state.ownerUserId]) {
    const owner = state.presences[state.ownerUserId];
    seatClosedTable(state, owner);
    state.hostUserId = owner.userId;
    startGame(nk, state, dispatcher, tick);
  }
  return { state };
};

// The seat goes back to a Bot (CONTEXT.md: Bot) — pawns as they stand. In
// the lobby that's every leave; mid-game only an explicit LEAVE (a dropped
// connection keeps the seat as an Abandoned seat for a reconnect). If it was
// that seat's turn, the Bot plays it out after a short think.
function vacateSeat(state: LudoState, seatIndex: number, userId: string, tick: number) {
  state.seats[seatIndex] = botSeat(seatIndex);
  if (state.hostUserId === userId) {
    state.hostUserId = null;
    for (let i = 0; i < MAX_SEATS; i += 1) {
      const candidate = state.seats[i];
      if (candidate && !candidate.bot) {
        state.hostUserId = candidate.userId;
        break;
      }
    }
  }
  if (state.phase === 'playing' && state.turnSeat === seatIndex) {
    state.turnDeadlineTick = turnDeadline(state, tick);
    holdBots(state, tick, BOT_THINK_TICKS);
  }
}

// "Play again" from the end-of-game board: the finished room becomes its own
// lobby again — same Game mode, environment, host and players still here;
// seats whose players left become Bots. Everyone still in the room lands in
// the lobby together (LOBBY_STATE with phase 'lobby').
function handlePlayAgain(nk: nkruntime.Nakama, state: LudoState, dispatcher: nkruntime.MatchDispatcher, tick: number, sender: nkruntime.Presence) {
  if (state.phase !== 'finished' || !state.presences[sender.userId]) {
    return;
  }
  state.phase = 'lobby';
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (!seat || seat.bot || (!seat.companion && !seat.connected) || !state.presences[seat.userId]) {
      state.seats[i] = botSeat(i);
    }
  }
  if (!state.hostUserId || !seatOfUser(state, state.hostUserId)) {
    state.hostUserId = sender.userId;
  }
  state.pawns = initialPawns(state.gameMode);
  state.round = 0;
  state.turnSeat = -1;
  state.winnerSeat = null;
  state.turnDeadlineTick = 0;
  state.savedTurnDeadline = null;
  state.restyled = {};
  state.stats = emptyStats();
  state.startedAtMs = 0;
  resetTurnState(state);
  refreshOpenLabel(state, dispatcher);
  broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
  // A Solo/Shared table has no lobby to wait in: same seats, straight on.
  if (isClosed(state)) {
    startGame(nk, state, dispatcher, tick);
  }
}

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

    if (isClosed(state)) {
      // Paused, not abandoned: nothing plays on until the owner is back.
      seat.connected = false;
    } else if (state.phase === 'lobby') {
      vacateSeat(state, seat.seat, presence.userId, tick);
    } else {
      seat.connected = false;
      if (state.phase === 'playing' && state.turnSeat === seat.seat) {
        const shortened = tick + DISCONNECTED_TURN_TIMEOUT_TICKS;
        if (state.turnDeadlineTick === 0 || shortened < state.turnDeadlineTick) {
          state.savedTurnDeadline = { seat: seat.seat, tick: state.turnDeadlineTick };
          state.turnDeadlineTick = shortened;
        }
      }
    }
  }

  refreshOpenLabel(state, dispatcher);
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

  if (state.ended) {
    return null;
  }

  if (!hasPresence) {
    state.emptyTicks += 1;
    if (state.emptyTicks >= (isClosed(state) ? CLOSED_TERMINATE_TICKS : EMPTY_TERMINATE_TICKS)) {
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
        handleStart(nk, state, dispatcher, tick, sender);
        break;
      case OpCode.SET_COSMETICS:
        handleSetCosmetics(nk, state, dispatcher, sender, payload);
        break;
      case OpCode.PLAY_AGAIN:
        handlePlayAgain(nk, state, dispatcher, tick, sender);
        break;
      case OpCode.LEAVE: {
        // Sent just before the client leaves the match on purpose.
        if (isClosed(state)) {
          state.ended = sender.userId === state.ownerUserId;
          break;
        }
        const leaving = seatOfUser(state, sender.userId);
        if (leaving && state.phase !== 'finished') {
          vacateSeat(state, leaving.seat, sender.userId, tick);
          if (state.phase === 'playing') {
            broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state, tick));
          }
          broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
          refreshOpenLabel(state, dispatcher);
        }
        break;
      }
      case OpCode.ROLL_REQUEST:
        handleRollRequest(state, dispatcher, tick, sender, payload);
        break;
      case OpCode.MOVE_REQUEST:
        handleMoveRequest(nk, state, dispatcher, tick, sender, payload);
        break;
      case OpCode.SYNC_REQUEST:
        broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state, tick), [sender]);
        break;
      case OpCode.CLAIM_SEAT: {
        if (isClosed(state)) {
          break;
        }
        const senderSeat = seatOfUser(state, sender.userId);
        const targetSeatIndex = typeof payload.seat === 'number' ? payload.seat : -1;
        if (targetSeatIndex < 0 || targetSeatIndex >= MAX_SEATS) {
          break;
        }

        const claimName = state.displayNames[sender.userId] || sender.username || 'Player';

        if (state.phase === 'lobby') {
          if (senderSeat) {
            if (senderSeat.seat === targetSeatIndex) {
              // Clicked own seat: unclaim — the Bot takes it back
              state.seats[targetSeatIndex] = botSeat(targetSeatIndex);
              broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
            } else if (isTakeable(state.seats[targetSeatIndex])) {
              // Move to another Bot's seat; the old one goes back to a Bot
              const oldIndex = senderSeat.seat;
              state.seats[oldIndex] = botSeat(oldIndex);

              senderSeat.seat = targetSeatIndex;
              senderSeat.ready = true; // Claiming color makes player ready
              state.seats[targetSeatIndex] = senderSeat;
              broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
            }
          } else if (isTakeable(state.seats[targetSeatIndex])) {
            // Unassigned player replacing a Bot (claiming makes them ready)
            state.seats[targetSeatIndex] = humanSeat(targetSeatIndex, sender.userId, sender.username, claimName);
            broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
          }
          break;
        }

        // Mid-game claims: only for players without a seat. A Bot's seat or
        // a disconnected (Abandoned) seat is taken over, pawns as they stand.
        if (state.phase === 'playing' && !senderSeat) {
          const target = state.seats[targetSeatIndex];
          if (isTakeable(target)) {
            state.seats[targetSeatIndex] = humanSeat(targetSeatIndex, sender.userId, sender.username, claimName);
          } else if (target && !target.connected) {
            target.userId = sender.userId;
            target.username = sender.username;
            target.displayName = claimName;
            target.ready = true;
            target.connected = true;
          } else {
            break;
          }

          // If the claimed seat is mid-turn on the short disconnected
          // deadline, give its new owner the full turn window.
          if (state.turnSeat === targetSeatIndex) {
            state.turnDeadlineTick = turnDeadline(state, tick);
          }

          // Everyone rebuilds their roster from a fresh snapshot (the same
          // path used for reconnect recovery).
          broadcast(dispatcher, OpCode.STATE_SYNC, snapshotPayload(state, tick));
          broadcast(dispatcher, OpCode.LOBBY_STATE, lobbyStatePayload(state));
          refreshOpenLabel(state, dispatcher);
        }
        break;
      }
      default:
        break;
    }
  }

  // A Solo/Shared table is paused while its owner is away.
  const paused = isClosed(state) && !(state.ownerUserId && state.presences[state.ownerUserId]);
  const turnHolder = state.phase === 'playing' && !paused ? state.seats[state.turnSeat] : null;
  if (turnHolder && turnHolder.bot) {
    if (tick >= state.botActTick) {
      playBot(nk, state, dispatcher, tick);
    }
  } else if (
    state.phase === 'playing' &&
    !paused &&
    state.turnDeadlineTick > 0 &&
    tick >= state.turnDeadlineTick
  ) {
    // Abandoned seat autopilot (or an idle human): same pick as a Bot.
    if (state.awaitingMove && state.legalPawns.length > 0) {
      doMove(nk, state, dispatcher, tick, chooseBotMove(state.pawns, state.turnSeat, state.dice as number, state.legalPawns));
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
