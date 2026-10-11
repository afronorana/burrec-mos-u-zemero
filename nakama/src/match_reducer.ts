// The match's turn and seat flow as one pure reducer: reduce(state, event,
// clock) mutates the state and returns what to send. No nkruntime calls —
// match_handler.ts is the adapter that decodes Nakama input into events and
// emits the outbound list through the dispatcher; tests use a plain array
// (tests/match_reducer.test.ts). The rules of a single move live one level
// down, in ludo_logic.ts.

import { ANIMATION_MS, BOT_DISPLAY_NAME, FINISHER_IDS, OpCode, seatLook, tablePolicy } from '../../shared/protocol.js';
import {
  allHome,
  applyMove,
  chooseBotMove,
  devPawns,
  initialPawns,
  legalPawns,
} from './ludo_logic';
import type { Earned } from './progress_logic';

export const TICK_RATE = 2; // ticks per second
// Keep in sync with the client's turn-timer bar (store.turnTimer.duration).
export const TURN_TIMEOUT_TICKS = 60 * TICK_RATE;
export const DISCONNECTED_TURN_TIMEOUT_TICKS = 6 * TICK_RATE;
export const EMPTY_TERMINATE_TICKS = 60 * TICK_RATE;
// A Solo/Shared table waits this long for its owner to come back (adr/0002).
export const CLOSED_TERMINATE_TICKS = 10 * 60 * TICK_RATE;
export const MAX_ROLLS_WHEN_ALL_HOME = 3;
export const MAX_SEATS = 4;
// Bot pacing (CONTEXT.md: Bot) — roughly how long clients take to show what
// just happened, so a Bot never acts while the board is still animating.
// The move/capture times come from the shared animation budget.
export const BOT_THINK_TICKS = 2; // before a Bot rolls
export const BOT_DICE_TICKS = 5; // dice physics settling before the Bot moves

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
export interface SeatSetup {
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

// shared/protocol.js sanitizeCosmetics: Finisher per player, Prop per pawn
// (top-level prop/flag mirror pawn 0 for older clients).
export interface Cosmetics {
  finisher: string;
  pawns: { prop: string; flag: string }[];
  prop: string;
  flag: string;
}

// Anything with a userId — nkruntime.Presence in production.
export interface PresenceLike {
  userId: string;
  username?: string;
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
  // CONTEXT.md: Table — 'open' | 'solo' | 'shared'; what each does
  // differently is shared/protocol.js tablePolicy. Solo/shared tables belong
  // to ownerUserId alone.
  table: string;
  ownerUserId: string | null;
  sharedSeats: SeatSetup[] | null;
  // Set by a LEAVE that ends the match (tablePolicy leaveEnds).
  ended: boolean;
  seats: (Seat | null)[];
  // userId -> displayName for everyone who ever joined (seated or not) —
  // broadcast so chat can name players who haven't picked a color yet.
  displayNames: { [userId: string]: string };
  // userId -> Cosmetics, already through memberCosmetics. Keyed by user, not
  // seat, so an unseated joiner's pick is known before they claim a color and
  // a disconnected seat keeps its owner's look; worn per seat via seatLook.
  cosmetics: { [userId: string]: Cosmetics };
  // userId -> the Title they show (CONTEXT.md: Title; '' = none), read at
  // join. Bots and Shared-table companions never show one.
  titles: { [userId: string]: string };
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
  // Per seat, the Points the finished game paid its human (null: a Bot, a
  // companion, or a table that pays nothing). CONTEXT.md: Points.
  earned: (Earned | null)[];
  // Per seat, the Finisher that colour's Bot plays this match.
  botFinishers: string[];
  startedAtMs: number;
  presences: { [userId: string]: PresenceLike };
  pendingDisplayNames: { [userId: string]: string };
  labelOpen: number;
  // DEMO_DICE=1 runtime env: ROLL_REQUEST may carry { demand: 1..6 } and the
  // server rolls exactly that value (testing shortcut — never enable in prod).
  demoDice: boolean;
  // A dev table (create_table { dev: true }, honored only with DEMO_DICE=1):
  // games start from ludo_logic devPawns instead of all-home.
  devLayout: boolean;
}

// What happens in a match, decoded from Nakama input by the adapter. Facts
// that need storage (names, Membership, owned items) arrive resolved.
export type MatchEvent =
  | { type: 'join'; presence: PresenceLike; displayName: string }
  | { type: 'leave'; userId: string } // presence gone (dropped or left)
  | { type: 'ready'; userId: string; ready: boolean }
  | { type: 'start'; userId: string }
  | { type: 'setCosmetics'; userId: string; member: boolean; cosmetics: Cosmetics }
  | { type: 'playAgain'; userId: string }
  | { type: 'leaveIntent'; userId: string } // LEAVE: an explicit Leave
  | { type: 'roll'; userId: string; demand?: number }
  | { type: 'move'; userId: string; pawnIndex: number }
  | { type: 'syncRequest'; userId: string }
  | { type: 'claimSeat'; userId: string; username: string; seat: number }
  | { type: 'tick' };

// What the adapter does with a reduction, in order.
// - send: a match message, to everyone (no `to`) or the listed userIds.
// - label: the match label changed (makeLabel).
// - gameStarted / gameOver: bookkeeping that needs storage (stats, Points,
//   Referrals); gameOver also broadcasts GAME_OVER once Points are paid.
export type Outbound =
  | { kind: 'send'; opCode: number; payload: object; to?: string[] }
  | { kind: 'label' }
  | { kind: 'gameStarted' }
  | { kind: 'gameOver' };

export interface Clock {
  tick: number;
  nowMs: number;
  // 0 <= random() < 1 — dice and Bot Finisher draws.
  random: () => number;
}

export interface Reduction {
  state: LudoState;
  outbound: Outbound[];
  // The match is over for good: matchLoop returns null.
  end: boolean;
}

// ── Construction ──────────────────────────────────────────────────────

export function emptyStats(): SeatStats[] {
  const stats: SeatStats[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    stats.push({ rolls: 0, sixes: 0, moves: 0, captures: 0, captured: 0, faces: [0, 0, 0, 0, 0, 0] });
  }
  return stats;
}

// Every seat no human holds is a Bot (CONTEXT.md: Bot), from matchInit on.
export function botSeat(index: number): Seat {
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

// Each colour's Bot Finisher for one match, drawn from the whole catalog
// (CONTEXT.md: Bot) — a showcase of what Points buy.
export function drawBotFinishers(random: () => number): string[] {
  const picks: string[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    picks.push(FINISHER_IDS[Math.floor(random() * FINISHER_IDS.length)]);
  }
  return picks;
}

export interface MatchParams {
  mode: 'private' | 'public';
  joinCode: string | null;
  environment: string;
  gameMode: string;
  table: string;
  ownerUserId: string | null;
  sharedSeats: SeatSetup[] | null;
  demoDice: boolean;
  dev: boolean;
}

export function initialState(params: MatchParams, random: () => number): LudoState {
  const policy = tablePolicy(params.table);
  // Solo/Shared tables are Classic for now (CONTEXT.md: Table).
  const gameMode = policy.gameModes ? params.gameMode : 'classic';
  return {
    phase: 'lobby',
    mode: policy.joinable ? params.mode : 'private',
    joinCode: params.joinCode,
    environment: params.environment,
    gameMode,
    table: params.table,
    ownerUserId: policy.joinable ? null : params.ownerUserId,
    sharedSeats: params.table === 'shared' ? params.sharedSeats : null,
    ended: false,
    seats: [botSeat(0), botSeat(1), botSeat(2), botSeat(3)],
    displayNames: {},
    cosmetics: {},
    titles: {},
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
    earned: [null, null, null, null],
    botFinishers: drawBotFinishers(random),
    startedAtMs: 0,
    presences: {},
    pendingDisplayNames: {},
    labelOpen: policy.joinable ? 1 : 0,
    demoDice: params.demoDice,
    devLayout: params.demoDice && !policy.joinable && params.dev,
  };
}

// ── Queries ───────────────────────────────────────────────────────────

export function makeLabel(state: LudoState): string {
  return JSON.stringify({
    mode: state.mode,
    gameMode: state.gameMode,
    table: state.table,
    code: state.joinCode || '',
    open: state.labelOpen,
  });
}

// The user's own seat (at a Shared table, never one of their companions).
export function seatOfUser(state: LudoState, userId: string): Seat | null {
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot && !seat.companion && seat.userId === userId) {
      return seat;
    }
  }
  return null;
}

// Every seat this user's device plays: their own and, at a Shared table,
// the companion seats — they all come and go with that one connection.
function seatsPlayedBy(state: LudoState, userId: string): Seat[] {
  const seats: Seat[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot && seat.userId === userId) {
      seats.push(seat);
    }
  }
  return seats;
}

// The seat whose turn it is is played from this user's device — their own
// seat, or a companion seat at their Shared table.
export function holdsTurn(state: LudoState, userId: string): boolean {
  const seat = state.seats[state.turnSeat];
  return !!seat && !seat.bot && seat.userId === userId;
}

export function humanUserIds(state: LudoState): string[] {
  const ids: string[] = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (seat && !seat.bot) {
      ids.push(seat.userId);
    }
  }
  return ids;
}

function isPresent(state: LudoState, userId: string | null): boolean {
  return !!userId && Object.prototype.hasOwnProperty.call(state.presences, userId);
}

function anyonePresent(state: LudoState): boolean {
  for (const userId in state.presences) {
    return true;
  }
  return false;
}

// A seat a human may take: a Bot's (or, defensively, an empty slot).
function isTakeable(seat: Seat | null): boolean {
  return !seat || seat.bot;
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
export function isJoinable(state: LudoState): boolean {
  if (!tablePolicy(state.table).joinable) {
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

// A Solo/Shared table is paused while its owner is away.
export function isPaused(state: LudoState): boolean {
  return tablePolicy(state.table).pauseWhileAway && !isPresent(state, state.ownerUserId);
}

export type JoinDecision = { accept: true; reconnect: boolean } | { accept: false; rejectMessage: string };

// matchJoinAttempt's answer (the adapter records names/Cosmetics on accept).
export function admitJoin(state: LudoState, userId: string): JoinDecision {
  const policy = tablePolicy(state.table);
  // A Solo/Shared table is its owner's alone.
  if (!policy.joinable && userId !== state.ownerUserId) {
    return { accept: false, rejectMessage: 'table_closed' };
  }

  const existing = seatOfUser(state, userId);
  if (existing) {
    if (existing.connected) {
      return { accept: false, rejectMessage: 'already_joined' };
    }
    return { accept: true, reconnect: true };
  }

  if (state.phase === 'finished') {
    return { accept: false, rejectMessage: 'match_over' };
  }

  if (!policy.joinable) {
    // The owner's first join (the game starts in the join event).
    return state.phase === 'lobby' ? { accept: true, reconnect: false } : { accept: false, rejectMessage: 'match_over' };
  }

  // Lobby: any free seat. Playing: drop-in is allowed onto a free seat or an
  // abandoned (disconnected) one — the newcomer picks it in the 3D scene.
  const joinable = state.phase === 'lobby'
    ? hasFreeSeat(state)
    : hasFreeSeat(state) || hasAbandonedSeat(state);
  return joinable ? { accept: true, reconnect: false } : { accept: false, rejectMessage: 'match_full' };
}

// Time left on the current turn, so clients can show the real remaining
// time (refresh / drop-in / tab return) instead of restarting the bar.
function turnMsLeft(state: LudoState, tick: number): number {
  if (state.phase !== 'playing' || state.turnDeadlineTick <= 0) {
    return 0;
  }
  return Math.max(0, state.turnDeadlineTick - tick) * (1000 / TICK_RATE);
}

function finishedPawns(state: LudoState, seat: number): number {
  let finished = 0;
  for (let j = 0; j < 4; j += 1) {
    if (state.pawns[seat][j] > 40) finished += 1;
  }
  return finished;
}

// ── Payloads ──────────────────────────────────────────────────────────

// The end-of-game board: the counters plus pawns in the finish per seat.
export function gameOverPayload(state: LudoState, nowMs: number): object {
  const stats = [];
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const s = state.stats[i];
    stats.push({ rolls: s.rolls, sixes: s.sixes, moves: s.moves, captures: s.captures, captured: s.captured, finished: finishedPawns(state, i) });
  }
  return {
    winnerSeat: state.winnerSeat,
    stats,
    earned: state.earned,
    durationMs: state.startedAtMs ? nowMs - state.startedAtMs : 0,
    rounds: state.round,
  };
}

export function lobbyStatePayload(state: LudoState): object {
  return {
    phase: state.phase,
    seats: state.seats,
    hostUserId: state.hostUserId,
    joinCode: state.joinCode,
    displayNames: state.displayNames,
    cosmetics: state.cosmetics,
    titles: state.titles,
    environment: state.environment,
    gameMode: state.gameMode,
    table: state.table,
  };
}

export function snapshotPayload(state: LudoState, clock: Clock): object {
  return {
    phase: state.phase,
    seats: state.seats,
    hostUserId: state.hostUserId,
    joinCode: state.joinCode,
    displayNames: state.displayNames,
    cosmetics: state.cosmetics,
    titles: state.titles,
    restyled: state.restyled,
    gameOver: state.phase === 'finished' ? gameOverPayload(state, clock.nowMs) : null,
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
    turnMsLeft: turnMsLeft(state, clock.tick),
  };
}

// ── The reducer ───────────────────────────────────────────────────────

// One reduction's outbound list, with the broadcast ritual written once.
class Out {
  list: Outbound[] = [];

  send(opCode: number, payload: object, to?: string[]) {
    this.list.push(to ? { kind: 'send', opCode, payload, to } : { kind: 'send', opCode, payload });
  }

  reject(userId: string, reason: string, forOpCode: number) {
    this.send(OpCode.REJECTED, { reason, forOpCode }, [userId]);
  }

  lobby(state: LudoState) {
    this.send(OpCode.LOBBY_STATE, lobbyStatePayload(state));
  }

  snapshot(state: LudoState, clock: Clock, to?: string[]) {
    this.send(OpCode.STATE_SYNC, snapshotPayload(state, clock), to);
  }

  // label.open follows isJoinable; the label is rewritten only on change.
  refreshLabel(state: LudoState) {
    const open = isJoinable(state) ? 1 : 0;
    if (open !== state.labelOpen) {
      state.labelOpen = open;
      this.list.push({ kind: 'label' });
    }
  }
}

export function reduce(state: LudoState, event: MatchEvent, clock: Clock): Reduction {
  const out = new Out();
  let end = false;

  switch (event.type) {
    case 'join':
      onJoin(state, event.presence, event.displayName, clock, out);
      break;
    case 'leave':
      onLeave(state, event.userId, clock, out);
      break;
    case 'ready': {
      const seat = seatOfUser(state, event.userId);
      if (state.phase === 'lobby' && seat) {
        seat.ready = event.ready;
        out.lobby(state);
      }
      break;
    }
    case 'start':
      onStart(state, event.userId, clock, out);
      break;
    case 'setCosmetics':
      onSetCosmetics(state, event.userId, event.member, event.cosmetics, out);
      break;
    case 'playAgain':
      onPlayAgain(state, event.userId, clock, out);
      break;
    case 'leaveIntent':
      onLeaveIntent(state, event.userId, clock, out);
      break;
    case 'roll':
      onRoll(state, event.userId, event.demand, clock, out);
      break;
    case 'move':
      onMove(state, event.userId, event.pawnIndex, clock, out);
      break;
    case 'syncRequest':
      out.snapshot(state, clock, [event.userId]);
      break;
    case 'claimSeat':
      onClaimSeat(state, event.userId, event.username, event.seat, clock, out);
      break;
    case 'tick':
      end = onTick(state, clock, out);
      break;
    default:
      break;
  }

  return { state, outbound: out.list, end: end || state.ended };
}

// ── Turn flow ─────────────────────────────────────────────────────────

function resetTurnState(state: LudoState) {
  state.dice = null;
  state.awaitingMove = false;
  state.legalPawns = [];
  state.rollsThisTurn = 0;
}

function turnDeadline(state: LudoState, tick: number): number {
  state.savedTurnDeadline = null;
  // Nobody else is waiting at a Solo/Shared table: no turn timer (0 = none).
  if (!tablePolicy(state.table).turnTimer) {
    return 0;
  }
  const seat = state.seats[state.turnSeat];
  const ticks = seat && seat.connected ? TURN_TIMEOUT_TICKS : DISCONNECTED_TURN_TIMEOUT_TICKS;
  return tick + ticks;
}

// Keeps a Bot from acting before `ticks` from now (never shortens a hold).
function holdBots(state: LudoState, tick: number, ticks: number) {
  state.botActTick = Math.max(state.botActTick, tick + ticks);
}

function msToTicks(ms: number): number {
  return Math.ceil(ms / (1000 / TICK_RATE));
}

function advanceTurn(state: LudoState, clock: Clock, out: Out, reason: string) {
  resetTurnState(state);
  holdBots(state, clock.tick, BOT_THINK_TICKS);

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
  state.turnDeadlineTick = turnDeadline(state, clock.tick);
  out.send(OpCode.TURN_CHANGE, { turnSeat: state.turnSeat, round: state.round, reason, turnMsLeft: turnMsLeft(state, clock.tick) });
}

function repeatTurn(state: LudoState, clock: Clock, out: Out) {
  resetTurnState(state);
  holdBots(state, clock.tick, BOT_THINK_TICKS);
  state.turnDeadlineTick = turnDeadline(state, clock.tick);
  out.send(OpCode.TURN_CHANGE, { turnSeat: state.turnSeat, round: state.round, reason: 'repeat', turnMsLeft: turnMsLeft(state, clock.tick) });
}

function doMove(state: LudoState, pawnIndex: number, clock: Clock, out: Out) {
  const seat = state.turnSeat;
  const steps = state.dice as number;
  const result = applyMove(state.pawns, seat, pawnIndex, steps, state.gameMode);
  state.stats[seat].moves += 1;
  state.stats[seat].captures += result.captures.length;
  for (let c = 0; c < result.captures.length; c += 1) {
    state.stats[result.captures[c].seat].captured += 1;
  }
  const moveMs = (result.fromPos === 0 ? 1 : steps) * ANIMATION_MS.pawnStep + ANIMATION_MS.moveSettle +
    (result.captures.length > 0 ? ANIMATION_MS.capture : 0);
  holdBots(state, clock.tick, msToTicks(moveMs));

  out.send(OpCode.MOVE_APPLIED, {
    seat,
    pawnIndex,
    fromPos: result.fromPos,
    toPos: result.toPos,
    steps,
    captures: result.captures,
    extraTurn: result.extraTurn && !result.won,
    // Stamped here so every client plays the same Finisher even if the
    // mover changes cosmetics while this event is still queued client-side.
    finisher: (seatLook(state.seats[seat], state.cosmetics, state.botFinishers[seat]) as Cosmetics).finisher,
  });

  if (result.won) {
    state.phase = 'finished';
    state.winnerSeat = seat;
    state.turnDeadlineTick = 0;
    resetTurnState(state);
    out.list.push({ kind: 'gameOver' });
    // A finished match takes no more joiners — close the label.
    out.refreshLabel(state);
    return;
  }

  if (result.extraTurn) {
    repeatTurn(state, clock, out);
  } else {
    advanceTurn(state, clock, out, 'end');
  }
}

// The turn-holder rolls `value` (validated by the caller; Bots call it
// directly). The three-roll rule: with every pawn home, a miss rolls again
// up to MAX_ROLLS_WHEN_ALL_HOME times.
function rollForTurn(state: LudoState, value: number, clock: Clock, out: Out) {
  holdBots(state, clock.tick, BOT_DICE_TICKS);
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
    state.turnDeadlineTick = turnDeadline(state, clock.tick);
    out.send(OpCode.DICE_RESULT, { seat: state.turnSeat, value, legalPawns: legal, rollsLeft: 0, autoEndTurn: false, turnMsLeft: turnMsLeft(state, clock.tick) });
    return;
  }

  const canRetry =
    allHome(state.pawns, state.turnSeat) &&
    value !== 6 &&
    state.rollsThisTurn < MAX_ROLLS_WHEN_ALL_HOME;

  if (canRetry) {
    state.dice = null;
    state.turnDeadlineTick = turnDeadline(state, clock.tick);
    out.send(OpCode.DICE_RESULT, {
      seat: state.turnSeat,
      value,
      legalPawns: [],
      rollsLeft: MAX_ROLLS_WHEN_ALL_HOME - state.rollsThisTurn,
      autoEndTurn: false,
      turnMsLeft: turnMsLeft(state, clock.tick),
    });
    return;
  }

  out.send(OpCode.DICE_RESULT, { seat: state.turnSeat, value, legalPawns: [], rollsLeft: 0, autoEndTurn: true });
  advanceTurn(state, clock, out, 'noMoves');
}

function rollDie(clock: Clock): number {
  return Math.floor(clock.random() * 6) + 1;
}

function onRoll(state: LudoState, userId: string, demandIn: number | undefined, clock: Clock, out: Out) {
  if (state.phase !== 'playing' || !holdsTurn(state, userId) || state.dice !== null || state.awaitingMove) {
    out.reject(userId, 'not_your_roll', OpCode.ROLL_REQUEST);
    return;
  }
  const demand = state.demoDice && typeof demandIn === 'number' ? Math.floor(demandIn) : 0;
  rollForTurn(state, demand >= 1 && demand <= 6 ? demand : rollDie(clock), clock, out);
}

function onMove(state: LudoState, userId: string, pawnIndex: number, clock: Clock, out: Out) {
  if (state.phase !== 'playing' || !holdsTurn(state, userId) || !state.awaitingMove || state.legalPawns.indexOf(pawnIndex) === -1) {
    out.reject(userId, 'illegal_move', OpCode.MOVE_REQUEST);
    return;
  }
  doMove(state, pawnIndex, clock, out);
}

// One Bot action per call: roll, or move the chosen pawn. Also the
// autopilot for an idle or Abandoned seat whose turn timed out.
function autoplay(state: LudoState, clock: Clock, out: Out) {
  if (state.awaitingMove && state.legalPawns.length > 0) {
    doMove(state, chooseBotMove(state.pawns, state.turnSeat, state.dice as number, state.legalPawns), clock, out);
  } else if (state.dice === null) {
    rollForTurn(state, rollDie(clock), clock, out);
  }
}

// Returns true when the match should end (nobody came back in time).
function onTick(state: LudoState, clock: Clock, out: Out): boolean {
  const policy = tablePolicy(state.table);
  if (!anyonePresent(state)) {
    state.emptyTicks += 1;
    if (state.emptyTicks >= (policy.pauseWhileAway ? CLOSED_TERMINATE_TICKS : EMPTY_TERMINATE_TICKS)) {
      return true;
    }
  } else {
    state.emptyTicks = 0;
  }

  if (state.phase !== 'playing' || isPaused(state)) {
    return false;
  }
  const turnHolder = state.seats[state.turnSeat];
  if (turnHolder && turnHolder.bot) {
    if (clock.tick >= state.botActTick) {
      autoplay(state, clock, out);
    }
  } else if (state.turnDeadlineTick > 0 && clock.tick >= state.turnDeadlineTick) {
    // Abandoned seat autopilot (or an idle human): same pick as a Bot.
    if (state.awaitingMove && state.legalPawns.length > 0) {
      autoplay(state, clock, out);
    } else {
      advanceTurn(state, clock, out, 'timeout');
    }
  }
  return false;
}

// ── Game lifecycle ────────────────────────────────────────────────────

function startGame(state: LudoState, clock: Clock, out: Out) {
  state.phase = 'playing';
  state.pawns = state.devLayout ? devPawns() : initialPawns(state.gameMode);
  state.round = 1;
  state.stats = emptyStats();
  state.earned = [null, null, null, null];
  state.botFinishers = drawBotFinishers(clock.random);
  state.startedAtMs = clock.nowMs;
  state.winnerSeat = null;
  resetTurnState(state);

  for (let i = 0; i < MAX_SEATS; i += 1) {
    if (state.seats[i]) {
      state.turnSeat = i;
      break;
    }
  }
  state.turnDeadlineTick = turnDeadline(state, clock.tick);
  state.botActTick = clock.tick + BOT_THINK_TICKS;
  // A started game stays open (label-wise) while it still has a Bot seat —
  // drop-in joiners take Bots over.
  state.labelOpen = isJoinable(state) ? 1 : 0;

  out.send(OpCode.GAME_START, {
    seats: state.seats,
    gameMode: state.gameMode,
    table: state.table,
    // Starting positions (Quick mode begins with a pawn out per seat).
    pawns: state.pawns,
    turnSeat: state.turnSeat,
    round: state.round,
    turnMsLeft: turnMsLeft(state, clock.tick),
  });
  out.list.push({ kind: 'label' });
  out.list.push({ kind: 'gameStarted' });
}

function onStart(state: LudoState, userId: string, clock: Clock, out: Out) {
  if (state.phase !== 'lobby' || userId !== state.hostUserId) {
    out.reject(userId, 'not_host', OpCode.START);
    return;
  }
  // Bots hold every other seat, so the host may start whenever they hold one.
  if (!seatOfUser(state, userId)) {
    out.reject(userId, 'not_seated', OpCode.START);
    return;
  }
  startGame(state, clock, out);
}

// "Play again" from the end-of-game board: the finished room becomes its own
// lobby again — same Game mode, environment, host and players still here;
// seats whose players left become Bots. Everyone still in the room lands in
// the lobby together (LOBBY_STATE with phase 'lobby').
function onPlayAgain(state: LudoState, userId: string, clock: Clock, out: Out) {
  if (state.phase !== 'finished' || !isPresent(state, userId)) {
    return;
  }
  state.phase = 'lobby';
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const seat = state.seats[i];
    if (!seat || seat.bot || (!seat.companion && !seat.connected) || !isPresent(state, seat.userId)) {
      state.seats[i] = botSeat(i);
    }
  }
  if (!state.hostUserId || !seatOfUser(state, state.hostUserId)) {
    state.hostUserId = userId;
  }
  state.pawns = initialPawns(state.gameMode);
  state.round = 0;
  state.turnSeat = -1;
  state.winnerSeat = null;
  state.turnDeadlineTick = 0;
  state.savedTurnDeadline = null;
  state.restyled = {};
  state.stats = emptyStats();
  state.earned = [null, null, null, null];
  state.startedAtMs = 0;
  resetTurnState(state);
  out.refreshLabel(state);
  out.lobby(state);
  // A Solo/Shared table has no lobby to wait in: same seats, straight on.
  if (!tablePolicy(state.table).lobby) {
    startGame(state, clock, out);
  }
}

// Cosmetics ride join metadata and change freely in the lobby. Once the
// game runs, each seated Member may restyle exactly once per match (the
// in-game Wardrobe); a Guest asking is told to register instead.
// `cosmetics` arrives through memberCosmetics already.
function onSetCosmetics(state: LudoState, userId: string, member: boolean, cosmetics: Cosmetics, out: Out) {
  if (state.phase === 'lobby') {
    state.cosmetics[userId] = cosmetics;
    out.lobby(state);
    return;
  }
  if (state.phase !== 'playing' || !seatOfUser(state, userId)) {
    out.reject(userId, 'not_seated', OpCode.SET_COSMETICS);
    return;
  }
  if (!member) {
    out.reject(userId, 'members_only', OpCode.SET_COSMETICS);
    return;
  }
  if (state.restyled[userId]) {
    out.reject(userId, 'restyle_used', OpCode.SET_COSMETICS);
    return;
  }
  state.restyled[userId] = true;
  state.cosmetics[userId] = cosmetics;
  out.send(OpCode.COSMETICS_CHANGED, { userId, cosmetics });
}

// ── Seat flow ─────────────────────────────────────────────────────────

// Seats a Solo/Shared table's owner on their first join. Solo: the owner at
// seat 0, Bots elsewhere. Shared: per the setup — the first player entry is
// the owner's own seat, every other player entry a companion seat.
function seatClosedTable(state: LudoState, owner: { userId: string; username: string }) {
  const ownName = state.displayNames[owner.userId] || owner.username || 'Player';
  if (state.table === 'solo' || !state.sharedSeats) {
    state.seats[0] = humanSeat(0, owner.userId, owner.username, ownName);
    return;
  }
  let ownerSeated = false;
  for (let i = 0; i < MAX_SEATS; i += 1) {
    const setup = state.sharedSeats[i];
    if (!setup || setup.kind !== 'player') {
      state.seats[i] = botSeat(i);
      continue;
    }
    const seat = humanSeat(i, owner.userId, owner.username, setup.name || (ownerSeated ? 'Player ' + (i + 1) : ownName));
    if (ownerSeated) {
      seat.companion = true;
    }
    ownerSeated = true;
    state.seats[i] = seat;
  }
}

function onJoin(state: LudoState, presence: PresenceLike, displayName: string, clock: Clock, out: Out) {
  const userId = presence.userId;
  const policy = tablePolicy(state.table);
  state.presences[userId] = presence;
  // Track the name of everyone in the match (seated or not) so chat and
  // seat claims can use it without another account lookup.
  state.displayNames[userId] = displayName;
  delete state.pendingDisplayNames[userId];

  const played = seatsPlayedBy(state, userId);
  if (played.length) {
    for (let i = 0; i < played.length; i += 1) {
      played[i].connected = true;
    }
    // Back before the shortened deadline ran out: same turn, so give them
    // back the time they had (never more).
    const saved = state.savedTurnDeadline;
    if (saved && state.seats[saved.seat] && state.seats[saved.seat]!.userId === userId) {
      if (state.phase === 'playing' && saved.seat === state.turnSeat && saved.tick > state.turnDeadlineTick) {
        state.turnDeadlineTick = saved.tick;
      }
      state.savedTurnDeadline = null;
    }
    // A paused Solo/Shared table resumes: give the client a moment to
    // rebuild the board before a Bot acts.
    if (policy.pauseWhileAway) {
      holdBots(state, clock.tick, BOT_DICE_TICKS);
    }
  } else if (!state.hostUserId) {
    // New players join as unassigned; they pick their seat/color by
    // clicking a base in 3D.
    state.hostUserId = userId;
  }
  // Mid-game (re)joiners need the snapshot to see the board.
  if (state.phase !== 'lobby') {
    out.snapshot(state, clock, [userId]);
  }

  out.refreshLabel(state);
  out.lobby(state);

  // A Solo/Shared table starts as soon as its owner is in — no lobby step.
  if (!policy.lobby && state.phase === 'lobby' && userId === state.ownerUserId) {
    seatClosedTable(state, { userId, username: presence.username || '' });
    state.hostUserId = userId;
    startGame(state, clock, out);
  }
}

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

function onLeave(state: LudoState, userId: string, clock: Clock, out: Out) {
  delete state.presences[userId];
  const policy = tablePolicy(state.table);

  if (policy.pauseWhileAway) {
    // Paused, not abandoned: nothing plays on until the owner is back. Every
    // seat the device played (companions too) went with the connection.
    const played = seatsPlayedBy(state, userId);
    for (let i = 0; i < played.length; i += 1) {
      played[i].connected = false;
    }
  } else {
    const seat = seatOfUser(state, userId);
    if (seat && state.phase === 'lobby') {
      vacateSeat(state, seat.seat, userId, clock.tick);
    } else if (seat) {
      seat.connected = false;
      if (state.phase === 'playing' && state.turnSeat === seat.seat) {
        const shortened = clock.tick + DISCONNECTED_TURN_TIMEOUT_TICKS;
        if (state.turnDeadlineTick === 0 || shortened < state.turnDeadlineTick) {
          state.savedTurnDeadline = { seat: seat.seat, tick: state.turnDeadlineTick };
          state.turnDeadlineTick = shortened;
        }
      }
    }
  }

  out.refreshLabel(state);
  out.lobby(state);
}

// LEAVE — sent just before the client leaves the match on purpose.
function onLeaveIntent(state: LudoState, userId: string, clock: Clock, out: Out) {
  if (tablePolicy(state.table).leaveEnds) {
    state.ended = userId === state.ownerUserId;
    return;
  }
  const leaving = seatOfUser(state, userId);
  if (!leaving || state.phase === 'finished') {
    return;
  }
  vacateSeat(state, leaving.seat, userId, clock.tick);
  if (state.phase === 'playing') {
    out.snapshot(state, clock);
  }
  out.lobby(state);
  out.refreshLabel(state);
}

function onClaimSeat(state: LudoState, userId: string, username: string, targetSeatIndex: number, clock: Clock, out: Out) {
  if (!tablePolicy(state.table).joinable || targetSeatIndex < 0 || targetSeatIndex >= MAX_SEATS) {
    return;
  }
  const senderSeat = seatOfUser(state, userId);
  const claimName = state.displayNames[userId] || username || 'Player';

  if (state.phase === 'lobby') {
    if (senderSeat) {
      if (senderSeat.seat === targetSeatIndex) {
        // Clicked own seat: unclaim — the Bot takes it back
        state.seats[targetSeatIndex] = botSeat(targetSeatIndex);
        out.lobby(state);
      } else if (isTakeable(state.seats[targetSeatIndex])) {
        // Move to another Bot's seat; the old one goes back to a Bot
        state.seats[senderSeat.seat] = botSeat(senderSeat.seat);
        senderSeat.seat = targetSeatIndex;
        senderSeat.ready = true; // Claiming color makes player ready
        state.seats[targetSeatIndex] = senderSeat;
        out.lobby(state);
      }
    } else if (isTakeable(state.seats[targetSeatIndex])) {
      // Unassigned player replacing a Bot (claiming makes them ready)
      state.seats[targetSeatIndex] = humanSeat(targetSeatIndex, userId, username, claimName);
      out.lobby(state);
    }
    return;
  }

  // Mid-game claims: only for players without a seat. A Bot's seat or a
  // disconnected (Abandoned) seat is taken over, pawns as they stand.
  if (state.phase !== 'playing' || senderSeat) {
    return;
  }
  const target = state.seats[targetSeatIndex];
  if (isTakeable(target)) {
    state.seats[targetSeatIndex] = humanSeat(targetSeatIndex, userId, username, claimName);
  } else if (target && !target.connected) {
    target.userId = userId;
    target.username = username;
    target.displayName = claimName;
    target.ready = true;
    target.connected = true;
  } else {
    return;
  }

  // If the claimed seat is mid-turn on the short disconnected deadline, give
  // its new owner the full turn window.
  if (state.turnSeat === targetSeatIndex) {
    state.turnDeadlineTick = turnDeadline(state, clock.tick);
  }

  // Everyone rebuilds their roster from a fresh snapshot (the same path used
  // for reconnect recovery).
  out.snapshot(state, clock);
  out.lobby(state);
  out.refreshLabel(state);
}
