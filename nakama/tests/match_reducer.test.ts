// The match's turn and seat flow (match_reducer.ts) driven in node with a
// recording array as the adapter — what used to need docker + e2e scripts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OpCode } from '../../shared/protocol.js';
import {
  BOT_THINK_TICKS,
  CLOSED_TERMINATE_TICKS,
  DISCONNECTED_TURN_TIMEOUT_TICKS,
  EMPTY_TERMINATE_TICKS,
  TURN_TIMEOUT_TICKS,
  admitJoin,
  initialState,
  reduce,
} from '../src/match_reducer.ts';
import type { LudoState, MatchEvent, MatchParams, Outbound } from '../src/match_reducer.ts';

const ALICE = 'user-alice';
const BOB = 'user-bob';

function params(overrides: Partial<MatchParams> = {}): MatchParams {
  return {
    mode: 'private',
    joinCode: 'ABCDE',
    environment: 'day',
    gameMode: 'classic',
    table: 'open',
    ownerUserId: null,
    sharedSeats: null,
    demoDice: true,
    dev: false,
    ...overrides,
  };
}

// A match plus a recording adapter: every reduction's outbound list lands in
// `sent`, the clock is advanced by hand and the dice are fixed.
class Harness {
  state: LudoState;
  tick = 0;
  sent: Outbound[] = [];
  ended = false;
  random = () => 0; // a Bot rolls 1, Bot Finishers draw the first id

  constructor(overrides: Partial<MatchParams> = {}) {
    this.state = initialState(params(overrides), () => 0);
  }

  run(event: MatchEvent) {
    const result = reduce(this.state, event, { tick: this.tick, nowMs: 1000 + this.tick * 500, random: this.random });
    this.sent.push(...result.outbound);
    this.ended = this.ended || result.end;
    return result.outbound;
  }

  join(userId: string, name = userId) {
    return this.run({ type: 'join', presence: { userId, username: name }, displayName: name });
  }

  advance(ticks: number) {
    for (let i = 0; i < ticks && !this.ended; i += 1) {
      this.tick += 1;
      this.run({ type: 'tick' });
    }
  }

  messages(opCode: number) {
    return this.sent.filter((item) => item.kind === 'send' && item.opCode === opCode)
      .map((item) => (item as { payload: any }).payload);
  }

  last(opCode: number) {
    const list = this.messages(opCode);
    return list[list.length - 1];
  }

  clear() {
    this.sent = [];
  }

  // An open room: Alice hosts at seat 0, Bob (if asked) at seat 2, started.
  static started(withBob = true, overrides: Partial<MatchParams> = {}) {
    const h = new Harness(overrides);
    h.join(ALICE);
    h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 0 });
    if (withBob) {
      h.join(BOB);
      h.run({ type: 'claimSeat', userId: BOB, username: BOB, seat: 2 });
    }
    h.run({ type: 'start', userId: ALICE });
    h.clear();
    return h;
  }
}

test('host starts once seated; Bots hold every other seat', () => {
  const h = new Harness();
  h.join(ALICE);
  assert.equal(h.state.hostUserId, ALICE);
  h.run({ type: 'start', userId: ALICE });
  assert.equal(h.last(OpCode.REJECTED).reason, 'not_seated');
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 1 });
  h.run({ type: 'start', userId: ALICE });
  const start = h.last(OpCode.GAME_START);
  assert.ok(start);
  assert.equal(start.turnSeat, 0);
  assert.deepEqual(h.state.seats.map((seat) => seat && seat.bot), [true, false, true, true]);
  assert.ok(h.sent.some((item) => item.kind === 'gameStarted'));
});

test('only the host may start', () => {
  const h = new Harness();
  h.join(ALICE);
  h.join(BOB);
  h.run({ type: 'claimSeat', userId: BOB, username: BOB, seat: 1 });
  h.run({ type: 'start', userId: BOB });
  assert.equal(h.last(OpCode.REJECTED).reason, 'not_host');
  assert.equal(h.state.phase, 'lobby');
});

test('three-roll rule: all pawns home gets three tries, then the turn passes', () => {
  const h = Harness.started();
  assert.equal(h.state.turnSeat, 0);
  for (let i = 1; i <= 2; i += 1) {
    h.run({ type: 'roll', userId: ALICE, demand: 3 });
    const dice = h.last(OpCode.DICE_RESULT);
    assert.equal(dice.autoEndTurn, false);
    assert.equal(dice.rollsLeft, 3 - i);
    assert.equal(h.state.turnSeat, 0);
  }
  h.run({ type: 'roll', userId: ALICE, demand: 3 });
  assert.equal(h.last(OpCode.DICE_RESULT).autoEndTurn, true);
  const change = h.last(OpCode.TURN_CHANGE);
  assert.equal(change.reason, 'noMoves');
  assert.equal(change.turnSeat, 1);
});

test('a six leaves home and repeats the turn', () => {
  const h = Harness.started();
  h.run({ type: 'roll', userId: ALICE, demand: 6 });
  assert.deepEqual(h.last(OpCode.DICE_RESULT).legalPawns, [0, 1, 2, 3]);
  h.run({ type: 'move', userId: ALICE, pawnIndex: 2 });
  const move = h.last(OpCode.MOVE_APPLIED);
  assert.equal(move.fromPos, 0);
  assert.equal(move.toPos, 1);
  assert.equal(move.extraTurn, true);
  assert.equal(h.last(OpCode.TURN_CHANGE).reason, 'repeat');
  assert.equal(h.state.turnSeat, 0);
});

test('requests out of turn are rejected', () => {
  const h = Harness.started();
  h.run({ type: 'roll', userId: BOB });
  assert.equal(h.last(OpCode.REJECTED).reason, 'not_your_roll');
  h.run({ type: 'move', userId: ALICE, pawnIndex: 0 });
  assert.equal(h.last(OpCode.REJECTED).reason, 'illegal_move');
});

test('round wraps when the turn passes the last seat', () => {
  const h = Harness.started();
  assert.equal(h.state.round, 1);
  // Play every seat out with misses; Bots play themselves on ticks.
  for (let guard = 0; guard < 200 && h.state.round === 1; guard += 1) {
    if (h.state.turnSeat === 0) h.run({ type: 'roll', userId: ALICE, demand: 1 });
    else if (h.state.turnSeat === 2) h.run({ type: 'roll', userId: BOB, demand: 1 });
    else h.advance(1);
  }
  assert.equal(h.state.round, 2);
  assert.equal(h.state.turnSeat, 0);
});

test('Bots wait for their pacing before acting', () => {
  const h = Harness.started(false);
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  assert.equal(h.state.turnSeat, 1);
  // The hold is the longer of the think and the last roll's dice settle.
  assert.ok(h.state.botActTick >= h.tick + BOT_THINK_TICKS);
  h.clear();
  h.advance(h.state.botActTick - h.tick - 1);
  assert.equal(h.messages(OpCode.DICE_RESULT).length, 0);
  h.advance(1);
  assert.equal(h.messages(OpCode.DICE_RESULT).length, 1);
});

test('an idle turn times out after TURN_TIMEOUT_TICKS', () => {
  const h = Harness.started();
  h.advance(TURN_TIMEOUT_TICKS - 1);
  assert.equal(h.state.turnSeat, 0);
  h.advance(1);
  assert.equal(h.last(OpCode.TURN_CHANGE).reason, 'timeout');
  assert.equal(h.state.turnSeat, 1);
});

test('the timeout autopilot moves a pawn when a move is pending', () => {
  const h = Harness.started();
  h.run({ type: 'roll', userId: ALICE, demand: 6 });
  h.clear();
  h.advance(TURN_TIMEOUT_TICKS);
  assert.equal(h.messages(OpCode.MOVE_APPLIED).length, 1);
});

test('a dropped connection cuts the turn short, a quick return restores it', () => {
  const h = Harness.started();
  const deadline = h.state.turnDeadlineTick;
  h.advance(4);
  h.run({ type: 'leave', userId: ALICE });
  assert.equal(h.state.seats[0]!.connected, false);
  assert.equal(h.state.turnDeadlineTick, h.tick + DISCONNECTED_TURN_TIMEOUT_TICKS);
  assert.equal(h.state.labelOpen, 1, 'an Abandoned seat opens the label');
  h.advance(2);
  h.join(ALICE);
  assert.equal(h.state.seats[0]!.connected, true);
  assert.equal(h.state.turnDeadlineTick, deadline);
  assert.ok(h.messages(OpCode.STATE_SYNC).length >= 1, 'the rejoiner gets a snapshot');
});

test('an explicit Leave hands the seat to a Bot, pawns as they stand', () => {
  const h = Harness.started();
  h.run({ type: 'roll', userId: ALICE, demand: 6 });
  h.run({ type: 'move', userId: ALICE, pawnIndex: 0 });
  h.clear();
  h.run({ type: 'leaveIntent', userId: ALICE });
  assert.equal(h.state.seats[0]!.bot, true);
  assert.equal(h.state.pawns[0][0], 1);
  assert.equal(h.state.hostUserId, BOB);
  const sync = h.last(OpCode.STATE_SYNC);
  assert.ok(sync && !sync.seats.some((seat: any) => seat && seat.userId === ALICE));
});

test('a lobby leave vacates the seat; claiming moves and unclaims', () => {
  const h = new Harness();
  h.join(ALICE);
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 0 });
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 3 });
  assert.equal(h.state.seats[0]!.bot, true);
  assert.equal(h.state.seats[3]!.userId, ALICE);
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 3 });
  assert.equal(h.state.seats[3]!.bot, true);
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 1 });
  h.run({ type: 'leave', userId: ALICE });
  assert.equal(h.state.seats[1]!.bot, true);
});

test('mid-game drop-in takes over a Bot or an Abandoned seat', () => {
  const h = Harness.started();
  const carol = 'user-carol';
  assert.deepEqual(admitJoin(h.state, carol), { accept: true, reconnect: false });
  h.join(carol);
  h.run({ type: 'claimSeat', userId: carol, username: carol, seat: 1 });
  assert.equal(h.state.seats[1]!.userId, carol);
  // Bob drops; a newcomer may take his seat with its pawns.
  h.run({ type: 'leave', userId: BOB });
  const dave = 'user-dave';
  h.join(dave);
  h.run({ type: 'claimSeat', userId: dave, username: dave, seat: 2 });
  assert.equal(h.state.seats[2]!.userId, dave);
  assert.equal(h.state.seats[2]!.connected, true);
  // A seated player can't claim a second seat mid-game.
  h.run({ type: 'claimSeat', userId: carol, username: carol, seat: 3 });
  assert.equal(h.state.seats[3]!.bot, true);
});

test('join decisions: full, already joined, finished', () => {
  const h = Harness.started();
  assert.deepEqual(admitJoin(h.state, ALICE), { accept: false, rejectMessage: 'already_joined' });
  h.state.phase = 'finished';
  assert.deepEqual(admitJoin(h.state, 'user-new'), { accept: false, rejectMessage: 'match_over' });
});

test('quick mode: the first pawn home wins and GAME_OVER follows the move', () => {
  const h = Harness.started(true, { gameMode: 'quick' });
  assert.deepEqual(h.state.pawns[0], [1, 0, 0, 0]);
  h.state.pawns[0][0] = 39;
  h.run({ type: 'roll', userId: ALICE, demand: 3 });
  h.run({ type: 'move', userId: ALICE, pawnIndex: 0 });
  assert.equal(h.state.phase, 'finished');
  assert.equal(h.state.winnerSeat, 0);
  const kinds = h.sent.map((item) => (item.kind === 'send' ? item.opCode : item.kind));
  assert.ok(kinds.indexOf(OpCode.MOVE_APPLIED) < kinds.indexOf('gameOver'));
  assert.equal(h.last(OpCode.MOVE_APPLIED).extraTurn, false);
  assert.equal(h.state.labelOpen, 0, 'a finished match closes its label');
});

test('first capture mode: any Capture wins; MOVE_APPLIED names the victims', () => {
  const h = Harness.started(true, { gameMode: 'firstCapture' });
  h.state.pawns[0] = [5, 0, 0, 0]; // global 4
  h.state.pawns[2] = [27, 0, 0, 0]; // global (20 + 26) % 40 = 6
  h.run({ type: 'roll', userId: ALICE, demand: 2 });
  h.run({ type: 'move', userId: ALICE, pawnIndex: 0 });
  const move = h.last(OpCode.MOVE_APPLIED);
  assert.deepEqual(move.captures, [{ seat: 2, pawnIndex: 0 }]);
  assert.equal(h.state.pawns[2][0], 0);
  assert.equal(h.state.phase, 'finished');
});

test('MOVE_APPLIED stamps the mover look: a Bot plays its colour\'s Finisher', () => {
  const h = Harness.started(false);
  h.state.botFinishers = ['shove', 'ufo', 'pan', 'bat'];
  h.state.turnSeat = 1;
  h.state.dice = 6;
  h.state.awaitingMove = true;
  h.state.legalPawns = [0];
  h.state.botActTick = 0;
  h.advance(1);
  assert.equal(h.last(OpCode.MOVE_APPLIED).finisher, 'ufo');
});

test('restyle: once per match, Members only', () => {
  const h = Harness.started();
  const look = { finisher: 'pan', pawns: [], prop: 'crown', flag: 'al' };
  h.run({ type: 'setCosmetics', userId: BOB, member: false, cosmetics: look });
  assert.equal(h.last(OpCode.REJECTED).reason, 'members_only');
  h.run({ type: 'setCosmetics', userId: ALICE, member: true, cosmetics: look });
  assert.equal(h.last(OpCode.COSMETICS_CHANGED).userId, ALICE);
  h.run({ type: 'setCosmetics', userId: ALICE, member: true, cosmetics: look });
  assert.equal(h.last(OpCode.REJECTED).reason, 'restyle_used');
});

test('Play again reopens the lobby; gone players become Bots', () => {
  const h = Harness.started();
  h.state.phase = 'finished';
  h.run({ type: 'leave', userId: BOB });
  h.run({ type: 'playAgain', userId: ALICE });
  assert.equal(h.state.phase, 'lobby');
  assert.equal(h.state.seats[0]!.userId, ALICE);
  assert.equal(h.state.seats[2]!.bot, true);
  assert.equal(h.last(OpCode.LOBBY_STATE).phase, 'lobby');
});

test('an empty open room ends after EMPTY_TERMINATE_TICKS', () => {
  const h = new Harness();
  h.advance(EMPTY_TERMINATE_TICKS - 1);
  assert.equal(h.ended, false);
  h.advance(1);
  assert.equal(h.ended, true);
});

// ── Solo / Shared tables (CONTEXT.md: Table) ──────────────────────────

function soloTable() {
  const h = new Harness({ table: 'solo', ownerUserId: ALICE, gameMode: 'quick' });
  h.join(ALICE);
  h.clear();
  return h;
}

test('a Solo table starts on its owner\'s join: Classic, no timer, closed', () => {
  const h = new Harness({ table: 'solo', ownerUserId: ALICE, gameMode: 'quick' });
  assert.deepEqual(admitJoin(h.state, BOB), { accept: false, rejectMessage: 'table_closed' });
  h.join(ALICE);
  assert.equal(h.state.phase, 'playing');
  assert.equal(h.state.gameMode, 'classic');
  assert.equal(h.state.seats[0]!.userId, ALICE);
  assert.equal(h.state.turnDeadlineTick, 0);
  assert.equal(h.state.labelOpen, 0);
  h.advance(TURN_TIMEOUT_TICKS * 2);
  assert.equal(h.state.turnSeat, 0, 'no turn timer');
});

test('a Solo table pauses while its owner is away and resumes on return', () => {
  const h = soloTable();
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  h.run({ type: 'roll', userId: ALICE, demand: 1 });
  assert.equal(h.state.turnSeat, 1);
  h.run({ type: 'leave', userId: ALICE });
  h.clear();
  h.advance(50);
  assert.equal(h.messages(OpCode.DICE_RESULT).length, 0, 'Bots wait while paused');
  h.join(ALICE);
  h.advance(10);
  assert.ok(h.messages(OpCode.DICE_RESULT).length > 0, 'Bots play on');
});

test('a Solo table waits CLOSED_TERMINATE_TICKS, and its LEAVE ends it', () => {
  const h = soloTable();
  h.run({ type: 'leave', userId: ALICE });
  h.advance(EMPTY_TERMINATE_TICKS);
  assert.equal(h.ended, false);
  h.advance(CLOSED_TERMINATE_TICKS - EMPTY_TERMINATE_TICKS);
  assert.equal(h.ended, true);

  const g = soloTable();
  g.run({ type: 'leaveIntent', userId: ALICE });
  assert.equal(g.ended, true);
});

test('a Solo table takes no claims and restarts at once on Play again', () => {
  const h = soloTable();
  h.run({ type: 'claimSeat', userId: ALICE, username: ALICE, seat: 2 });
  assert.equal(h.state.seats[2]!.bot, true);
  h.state.phase = 'finished';
  h.run({ type: 'playAgain', userId: ALICE });
  assert.equal(h.state.phase, 'playing');
  assert.ok(h.last(OpCode.GAME_START));
});

test('a Shared table seats the owner and companions; companions roll from the owner\'s device', () => {
  const h = new Harness({
    table: 'shared',
    ownerUserId: ALICE,
    sharedSeats: [
      { kind: 'player', name: 'Ana' },
      { kind: 'computer', name: '' },
      { kind: 'player', name: 'Ben' },
      { kind: 'computer', name: '' },
    ],
  });
  h.join(ALICE);
  assert.equal(h.state.seats[0]!.companion, undefined);
  assert.equal(h.state.seats[2]!.companion, true);
  assert.equal(h.state.seats[2]!.userId, ALICE);
  h.state.turnSeat = 2;
  h.run({ type: 'roll', userId: ALICE, demand: 6 });
  assert.equal(h.last(OpCode.DICE_RESULT).seat, 2);
  h.run({ type: 'move', userId: ALICE, pawnIndex: 0 });
  assert.equal(h.last(OpCode.MOVE_APPLIED).finisher, 'shove', 'companions wear the guest look');
});

test('a Shared table\'s companion seats disconnect and reconnect with the device', () => {
  const h = new Harness({
    table: 'shared',
    ownerUserId: ALICE,
    sharedSeats: [
      { kind: 'player', name: 'Ana' },
      { kind: 'player', name: 'Ben' },
      { kind: 'computer', name: '' },
      { kind: 'player', name: 'Cleo' },
    ],
  });
  h.join(ALICE);
  h.run({ type: 'leave', userId: ALICE });
  assert.deepEqual([0, 1, 3].map((i) => h.state.seats[i]!.connected), [false, false, false]);
  h.join(ALICE);
  assert.deepEqual([0, 1, 3].map((i) => h.state.seats[i]!.connected), [true, true, true]);
});
