// End-to-end test of Solo and Shared tables (CONTEXT.md: Table, adr/0002)
// against the local dev stack (pnpm nakama:up, DEMO_DICE=1): a closed table
// starts as soon as its owner joins, is never found or joinable by anyone
// else, has no turn timer, pauses while its owner is away, plays a Shared
// table's companion seats from the owner's device without Cosmetics, and
// ends on the owner's LEAVE.
//
// Run: node nakama/tests/e2e_tables.mjs   (from the repo root)

globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';
import { OpCode, decodePayload, encodePayload } from '../../shared/protocol.js';

const client = new Client('burrec-dev-key', '127.0.0.1', '7350', false);
const failures = [];
const stamp = Date.now();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, label) {
  console.log(`${condition ? 'ok  ' : 'FAIL'} ${label}`);
  if (!condition) failures.push(label);
}

async function rpc(session, id, input) {
  const response = await client.rpc(session, id, input || {});
  return typeof response.payload === 'string' ? JSON.parse(response.payload) : (response.payload || {});
}

async function rpcError(session, id, input) {
  try {
    await rpc(session, id, input);
    return null;
  } catch (error) {
    const body = error && typeof error.json === 'function' ? await error.json().catch(() => ({})) : {};
    return body.message || String(error);
  }
}

async function until(check, ms = 5000) {
  const t0 = Date.now();
  while (!check() && Date.now() - t0 < ms) await delay(100);
  return check();
}

// A connected socket that records every match message.
async function connect(name) {
  const session = await client.authenticateDevice(`e2e-tables-${name}-${stamp}`, true, `tbl${name}${stamp}`.slice(0, 20));
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  const log = [];
  socket.onmatchdata = (data) => log.push({ op: data.op_code, p: decodePayload(data.data) });
  const last = (op) => [...log].reverse().find((m) => m.op === op);
  return { session, socket, log, last };
}

const send = (who, matchId, op, body) => who.socket.sendMatchState(matchId, op, encodePayload(body || {}));

async function main() {
  const owner = await connect('owner');
  const other = await connect('other');

  // ── Solo table ───────────────────────────────────────────────────────
  const solo = await rpc(owner.session, 'create_table', { table: 'solo' });
  assert(Boolean(solo.matchId), 'create_table makes a Solo table');
  await owner.socket.joinMatch(solo.matchId, null, { displayName: 'Owner' });
  await until(() => owner.last(OpCode.GAME_START));
  const start = owner.last(OpCode.GAME_START);
  assert(Boolean(start), 'a Solo table starts as soon as its owner joins');
  assert(start && start.p.table === 'solo' && start.p.gameMode === 'classic', 'GAME_START reports the solo table, Classic rules');
  assert(start && start.p.seats[0].userId === owner.session.user_id && start.p.seats.slice(1).every((s) => s.bot),
    'the owner sits at seat 0 against three Bots');
  assert(start && start.p.turnMsLeft === 0, 'no turn timer at a Solo table');

  await delay(1500); // label index lag
  const quick = await rpc(other.session, 'quick_match', { gameMode: 'classic' });
  assert(quick.matchId !== solo.matchId, 'Quick play never finds a Solo table');
  let rejected = null;
  try {
    await other.socket.joinMatch(solo.matchId, null, { displayName: 'Other' });
  } catch (error) {
    rejected = error;
  }
  assert(Boolean(rejected), 'nobody but the owner may join a Solo table');

  // Paused while the owner is away: Bots don't act.
  // All home: three non-sixes pass the turn to the first Bot.
  for (let i = 0; i < 3; i += 1) {
    send(owner, solo.matchId, OpCode.ROLL_REQUEST, { demand: 3 });
    await delay(300);
  }
  await until(() => owner.last(OpCode.TURN_CHANGE));
  const away = owner.log.length;
  await owner.socket.leaveMatch(solo.matchId);
  const watcher = await connect('owner'); // same device id → same user
  await delay(5000);
  await watcher.socket.joinMatch(solo.matchId, null, { displayName: 'Owner' });
  await until(() => watcher.last(OpCode.STATE_SYNC));
  const snapshot = watcher.last(OpCode.STATE_SYNC);
  assert(away > 0 && snapshot && snapshot.p.phase === 'playing', 'the owner can come back to a paused Solo table');
  assert(snapshot && snapshot.p.turnSeat === 1 && snapshot.p.dice === null,
    `Bots wait while the owner is away (turn ${snapshot && snapshot.p.turnSeat}, dice ${snapshot && snapshot.p.dice})`);
  await until(() => watcher.last(OpCode.DICE_RESULT), 8000);
  assert(Boolean(watcher.last(OpCode.DICE_RESULT)), 'Bots play on once the owner is back');

  // Explicit Leave ends the match.
  send(watcher, solo.matchId, OpCode.LEAVE);
  await delay(1500);
  const after = await client.listMatches(owner.session, 100, true, null, 0, 10);
  assert(!(after.matches || []).some((m) => m.match_id === solo.matchId), 'LEAVE ends a Solo table');
  watcher.socket.disconnect(false);

  // ── Shared table ─────────────────────────────────────────────────────
  const invalid = await rpcError(owner.session, 'create_table', { table: 'shared', seats: [{ kind: 'player', name: 'A' }] });
  assert(Boolean(invalid), 'a Shared table needs at least two players');

  const shared = await rpc(owner.session, 'create_table', {
    table: 'shared',
    seats: [{ kind: 'player', name: 'Ana' }, { kind: 'computer' }, { kind: 'player', name: 'Bekim' }, { kind: 'computer' }],
  });
  const host = await connect('owner');
  await host.socket.joinMatch(shared.matchId, null, { displayName: 'Owner', finisher: 'bat' });
  await until(() => host.last(OpCode.GAME_START));
  const sharedStart = host.last(OpCode.GAME_START);
  const seats = sharedStart && sharedStart.p.seats;
  assert(seats && seats[0].userId === host.session.user_id && !seats[0].companion && seats[0].displayName === 'Ana',
    'the first player is the owner\'s own seat');
  assert(seats && seats[2].userId === host.session.user_id && seats[2].companion && seats[2].displayName === 'Bekim',
    'the other players are companion seats held by the owner');
  assert(seats && seats[1].bot && seats[3].bot, 'computer seats are Bots');

  // The owner's device plays both human seats: demand sixes for the
  // companion's turn and check it gets a move, played without a Finisher.
  const playSeat = async (seat) => {
    await until(() => {
      const turn = host.last(OpCode.TURN_CHANGE);
      return (turn ? turn.p.turnSeat : sharedStart.p.turnSeat) === seat;
    }, 20000);
    const before = host.log.length;
    send(host, shared.matchId, OpCode.ROLL_REQUEST, { demand: 6 });
    await until(() => host.log.slice(before).some((m) => m.op === OpCode.DICE_RESULT));
    send(host, shared.matchId, OpCode.MOVE_REQUEST, { pawnIndex: 0 });
    await until(() => host.log.slice(before).some((m) => m.op === OpCode.MOVE_APPLIED));
    return host.log.slice(before).find((m) => m.op === OpCode.MOVE_APPLIED);
  };
  const ownMove = await playSeat(0);
  assert(ownMove && ownMove.p.seat === 0, 'the owner moves for their own seat');
  // A six repeats the turn; roll a 1 to pass it on (pawn 0 can step).
  send(host, shared.matchId, OpCode.ROLL_REQUEST, { demand: 1 });
  await delay(400);
  send(host, shared.matchId, OpCode.MOVE_REQUEST, { pawnIndex: 0 });
  const companionMove = await playSeat(2);
  assert(companionMove && companionMove.p.seat === 2, 'the owner moves for a companion seat');
  assert(companionMove && companionMove.p.finisher === 'none', 'a companion seat captures without a Finisher');

  send(host, shared.matchId, OpCode.LEAVE);
  host.socket.disconnect(false);
  owner.socket.disconnect(false);
  other.socket.disconnect(false);
}

main()
  .catch((error) => {
    failures.push(String(error && error.stack || error));
    console.error(error);
  })
  .finally(() => {
    console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall passed');
    process.exit(failures.length ? 1 : 0);
  });
