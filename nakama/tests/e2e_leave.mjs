// End-to-end test of an explicit Leave against the local dev stack
// (pnpm nakama:up): a player who leaves a running game on purpose (LEAVE
// before leaving the match) hands their seat to a Bot at once — pawns as
// they stand — instead of lingering as a disconnected "reconnecting" seat.
// A dropped connection (no LEAVE) still keeps the seat as Abandoned.
//
// Run: node nakama/tests/e2e_leave.mjs   (from the repo root)

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

async function player(name, matchId) {
  const session = await client.authenticateDevice(`e2e-leave-${name}-${stamp}`, true);
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  const waiters = [];
  const me = { session, socket, last: {} };
  socket.onmatchdata = (data) => {
    const payload = decodePayload(data.data);
    me.last[data.op_code] = payload;
    // A dice result only counts within its own turn.
    if (data.op_code === OpCode.TURN_CHANGE) delete me.last[OpCode.DICE_RESULT];
    for (let i = waiters.length - 1; i >= 0; i -= 1) {
      if (waiters[i].opCode === data.op_code && waiters[i].test(payload)) {
        waiters[i].resolve(payload);
        waiters.splice(i, 1);
      }
    }
  };
  me.join = (id) => socket.joinMatch(id, null, { displayName: name });
  me.send = (opCode, payload) => socket.sendMatchState(me.matchId, opCode, encodePayload(payload || {}));
  me.next = (opCode, test = () => true, ms = 4000) => Promise.race([
    new Promise((resolve) => waiters.push({ opCode, test, resolve })),
    delay(ms).then(() => null),
  ]);
  return me;
}

async function main() {
  const alice = await player('alice');
  const created = await client.rpc(alice.session, 'create_private_match', {});
  const { matchId } = typeof created.payload === 'string' ? JSON.parse(created.payload) : created.payload;
  alice.matchId = matchId;
  await alice.join(matchId);
  const bob = await player('bob');
  bob.matchId = matchId;
  await bob.join(matchId);
  await delay(400);
  alice.send(OpCode.CLAIM_SEAT, { seat: 0 });
  bob.send(OpCode.CLAIM_SEAT, { seat: 1 });
  await delay(800);
  const started = alice.next(OpCode.GAME_START);
  alice.send(OpCode.START);
  assert(Boolean(await started), 'game starts with alice and bob seated');

  // Bob leaves on purpose: LEAVE, then leave the match.
  const handedOver = alice.next(OpCode.STATE_SYNC, (snap) => snap.seats[1] && snap.seats[1].bot);
  bob.send(OpCode.LEAVE);
  const snap = await handedOver;
  await bob.socket.leaveMatch(matchId);
  assert(Boolean(snap), 'an explicit Leave hands the seat to a Bot (STATE_SYNC)');
  assert(snap && snap.seats[1].connected === true && snap.seats[1].userId === '', 'the seat is a connected Bot, not a reconnecting ghost');
  assert(snap && Array.isArray(snap.pawns[1]) && snap.pawns[1].length === 4, "the leaver's pawns stay on the board");

  // The game goes on: the Bot plays bob's turns. Alice keeps rolling hers.
  const sawBotRoll = alice.next(OpCode.DICE_RESULT, (roll) => roll.seat === 1, 60000);
  const keepPlaying = setInterval(() => {
    const turn = alice.last[OpCode.TURN_CHANGE] || alice.last[OpCode.GAME_START] || {};
    const dice = alice.last[OpCode.DICE_RESULT];
    if (turn.turnSeat !== 0) return;
    if (dice && dice.seat === 0 && dice.legalPawns && dice.legalPawns.length) {
      alice.send(OpCode.MOVE_REQUEST, { pawnIndex: dice.legalPawns[0] });
      delete alice.last[OpCode.DICE_RESULT];
    } else if (!dice || (dice.seat === 0 && !dice.autoEndTurn)) {
      alice.send(OpCode.ROLL_REQUEST, {});
      delete alice.last[OpCode.DICE_RESULT];
    }
  }, 700);
  assert(Boolean(await sawBotRoll), 'the Bot rolls on the seat the leaver gave up');
  clearInterval(keepPlaying);

  // A dropped connection (no LEAVE) still keeps the seat for a reconnect.
  const carol = await player('carol');
  carol.matchId = matchId;
  await carol.join(matchId);
  await delay(500);
  const carolSeated = alice.next(OpCode.STATE_SYNC, (s) => s.seats[2] && s.seats[2].userId === carol.session.user_id);
  carol.send(OpCode.CLAIM_SEAT, { seat: 2 });
  assert(Boolean(await carolSeated), 'carol takes over the Bot on seat 2');
  const dropped = alice.next(OpCode.LOBBY_STATE, (state) => state.seats[2] && state.seats[2].connected === false);
  carol.socket.disconnect(false);
  const afterDrop = await dropped;
  assert(afterDrop && !afterDrop.seats[2].bot && afterDrop.seats[2].userId === carol.session.user_id,
    'a dropped connection keeps the seat as Abandoned (not handed to a Bot)');

  alice.socket.disconnect(false);
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
