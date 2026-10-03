// End-to-end Guest/Member test against the local dev stack (pnpm nakama:up,
// EMAIL_DEV_ECHO=1). Covers: a Guest can't chat and wears no Cosmetics; a
// Guest registering with email keeps their user id (link, adr/0001) but stays
// a Guest until the address is verified; a Member chats and wears what they
// picked; account deletion.
//
// Run: node nakama/tests/e2e_auth.mjs   (from the repo root)

globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';
import { OpCode, decodePayload } from '../../shared/protocol.js';

const client = new Client('burrec-dev-key', '127.0.0.1', '7350', false);
const failures = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, label) {
  console.log(`${condition ? 'ok  ' : 'FAIL'} ${label}`);
  if (!condition) failures.push(label);
}

async function rpc(session, id, input) {
  const response = await client.rpc(session, id, input || {});
  return typeof response.payload === 'string' ? JSON.parse(response.payload) : (response.payload || {});
}

function uid() {
  return `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Joins the match + its chat; resolves the first LOBBY_STATE's cosmetics.
async function joinWithCosmetics(session, matchId, cosmetics) {
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  const lobby = new Promise((resolve) => {
    socket.onmatchdata = (data) => {
      if (data.op_code === OpCode.LOBBY_STATE) resolve(decodePayload(data.data));
    };
  });
  await socket.joinMatch(matchId, null, { displayName: 'tester', ...cosmetics });
  const channel = await socket.joinChat(`ludo-${matchId}`, 1, false, false);
  const state = await Promise.race([lobby, delay(3000).then(() => null)]);
  return { socket, channelId: channel.id, cosmetics: state && state.cosmetics ? state.cosmetics[session.user_id] : null };
}

async function trySend(socket, channelId) {
  try {
    await socket.writeChatMessage(channelId, { message: 'hello' });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const crown = { prop: 'crown', finisher: 'anvil', flag: 'al' };

  // ── Guest ──────────────────────────────────────────────────────────
  const guest = await client.authenticateDevice(uid(), true);
  const created = await rpc(guest, 'create_private_match');
  const asGuest = await joinWithCosmetics(guest, created.matchId, crown);
  assert(asGuest.cosmetics && asGuest.cosmetics.prop === 'none' && asGuest.cosmetics.finisher === 'none'
    && asGuest.cosmetics.pawns.every((p) => p.prop === 'none'),
    `Guest wears nothing (got ${JSON.stringify(asGuest.cosmetics)})`);
  assert(!(await trySend(asGuest.socket, asGuest.channelId)), 'Guest chat message is rejected');
  asGuest.socket.disconnect(false);

  // ── Guest links email: same user, still a Guest until verified ─────
  const email = `${uid()}@example.com`;
  await client.linkEmail(guest, { email, password: 'password123' });
  const linked = await client.authenticateEmail(email, 'password123', false);
  assert(linked.user_id === guest.user_id, 'email link keeps the Guest user id');
  let status = await rpc(linked, 'auth_status');
  assert(status.email === email && status.member === false, 'unverified email is still a Guest');

  // The link hook mailed one already; resend echoes a fresh link in dev.
  const resent = await rpc(linked, 'resend_verification');
  const token = resent.devLink ? resent.devLink.split('#verify=')[1] : null;
  assert(!!token, 'verification link echoed in dev');
  const verified = await rpc(linked, 'verify_email', { token });
  assert(verified.ok === true, 'verify_email succeeds');
  status = await rpc(linked, 'auth_status');
  assert(status.member === true, 'verified email is a Member');

  // ── Member: chat + cosmetics ───────────────────────────────────────
  const created2 = await rpc(linked, 'create_private_match');
  const asMember = await joinWithCosmetics(linked, created2.matchId, crown);
  assert(asMember.cosmetics && asMember.cosmetics.prop === 'crown' && asMember.cosmetics.finisher === 'anvil',
    `Member wears their pick (got ${JSON.stringify(asMember.cosmetics)})`);
  assert(await trySend(asMember.socket, asMember.channelId), 'Member chat message is accepted');
  asMember.socket.disconnect(false);

  // Per-pawn Props ride join metadata as a JSON string.
  const created3 = await rpc(linked, 'create_private_match');
  const joined3 = await joinWithCosmetics(linked, created3.matchId, {
    finisher: 'anvil',
    pawns: JSON.stringify([{ prop: 'halo', flag: 'al' }, { prop: 'bandana', flag: 'al' }, { prop: 'flag', flag: 'xk' }, { prop: 'nonsense', flag: 'al' }]),
  });
  const perPawn = joined3.cosmetics;
  assert(perPawn && perPawn.pawns && perPawn.pawns.map((p) => p.prop).join(',') === 'halo,bandana,flag,none'
    && perPawn.pawns[2].flag === 'xk' && perPawn.prop === 'halo',
    `Member wears a Prop per pawn (got ${JSON.stringify(perPawn && perPawn.pawns)})`);
  joined3.socket.disconnect(false);

  // ── Deletion ───────────────────────────────────────────────────────
  const bareGuest = await client.authenticateDevice(uid(), true);
  const refused = await rpc(bareGuest, 'delete_account', { confirm: true });
  assert(refused.error === 'auth_required', 'a bare device Guest cannot delete');
  const deleted = await rpc(linked, 'delete_account', { confirm: true });
  assert(deleted.ok === true, 'Member deletes their account');
  let gone = false;
  try {
    await client.authenticateEmail(email, 'password123', false);
  } catch (error) {
    gone = true;
  }
  assert(gone, 'deleted account can no longer sign in');

  if (failures.length) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log('\nall auth checks passed');
  process.exit(0);
}

main().catch((error) => {
  console.error('e2e_auth crashed:', error && error.status ? `HTTP ${error.status}` : error);
  process.exit(1);
});
