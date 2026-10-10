// End-to-end test of the one mid-game restyle against the local dev stack
// (pnpm nakama:up, EMAIL_DEV_ECHO=1): once the game runs, a seated Member
// may change their Cosmetics exactly once (COSMETICS_CHANGED to everyone);
// a second try is REJECTED 'restyle_used', and a Guest gets 'members_only'.
//
// Run: node nakama/tests/e2e_restyle.mjs   (from the repo root)

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

async function member(name) {
  const session = await client.authenticateDevice(`e2e-restyle-${name}-${stamp}`, true);
  await client.linkEmail(session, { email: `e2e-restyle-${name}-${stamp}@example.com`, password: 'password123' });
  const resent = await rpc(session, 'resend_verification');
  await rpc(session, 'verify_email', { token: resent.devLink.split('#verify=')[1] });
  return session;
}

// A socket in the match that records every message, plus a waiter for the
// next one with a given opcode.
async function joinPlayer(session, matchId, metadata) {
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  const inbox = [];
  const waiters = [];
  socket.onmatchdata = (data) => {
    const message = { opCode: data.op_code, payload: decodePayload(data.data) };
    inbox.push(message);
    for (let i = waiters.length - 1; i >= 0; i -= 1) {
      if (waiters[i].opCode === message.opCode) {
        waiters[i].resolve(message.payload);
        waiters.splice(i, 1);
      }
    }
  };
  await socket.joinMatch(matchId, null, { displayName: 'tester', ...metadata });
  return {
    send: (opCode, payload) => socket.sendMatchState(matchId, opCode, encodePayload(payload)),
    next: (opCode, ms = 3000) => Promise.race([
      new Promise((resolve) => waiters.push({ opCode, resolve })),
      delay(ms).then(() => null),
    ]),
    close: () => socket.disconnect(false),
  };
}

async function main() {
  const alice = await member('alice');
  const guest = await client.authenticateDevice(`e2e-restyle-guest-${stamp}`, true);

  const created = await rpc(alice, 'create_private_match');
  const a = await joinPlayer(alice, created.matchId, { prop: 'crown', finisher: 'bat' });
  const g = await joinPlayer(guest, created.matchId, {});
  await delay(300);

  a.send(OpCode.CLAIM_SEAT, { seat: 0 });
  await a.next(OpCode.LOBBY_STATE);
  g.send(OpCode.CLAIM_SEAT, { seat: 1 });
  await g.next(OpCode.LOBBY_STATE);

  const started = a.next(OpCode.GAME_START);
  a.send(OpCode.START, {});
  assert(Boolean(await started), 'game starts');

  const seenByGuest = g.next(OpCode.COSMETICS_CHANGED);
  const changed = a.next(OpCode.COSMETICS_CHANGED);
  a.send(OpCode.SET_COSMETICS, { prop: 'partyHat', finisher: 'pan', flag: 'al' });
  const first = await changed;
  assert(first && first.userId === alice.user_id && first.cosmetics.prop === 'partyHat' && first.cosmetics.finisher === 'pan', 'first mid-game restyle is applied');
  assert(Boolean(await seenByGuest), 'other players receive COSMETICS_CHANGED');

  const rejected = a.next(OpCode.REJECTED);
  a.send(OpCode.SET_COSMETICS, { prop: 'halo', finisher: 'golf', flag: 'al' });
  const second = await rejected;
  assert(second && second.reason === 'restyle_used' && second.forOpCode === OpCode.SET_COSMETICS, 'second restyle is rejected (restyle_used)');

  const guestRejected = g.next(OpCode.REJECTED);
  g.send(OpCode.SET_COSMETICS, { prop: 'crown', finisher: 'bat', flag: 'al' });
  const guestReply = await guestRejected;
  assert(guestReply && guestReply.reason === 'members_only', 'a Guest restyle is rejected (members_only)');

  const synced = a.next(OpCode.STATE_SYNC);
  a.send(OpCode.SYNC_REQUEST, {});
  const snapshot = await synced;
  assert(snapshot && snapshot.restyled && snapshot.restyled[alice.user_id] === true, 'STATE_SYNC reports the spent restyle');
  assert(snapshot && snapshot.cosmetics[alice.user_id].prop === 'partyHat', 'STATE_SYNC carries the restyled Cosmetics, not the second try');

  a.close();
  g.close();
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
