// End-to-end store test against the local dev stack (pnpm nakama:up,
// EMAIL_DEV_ECHO=1): Claims and Entitlements (CONTEXT.md: Price tier,
// Entitlement, Claim). Entitlements are user-owned storage, so Nakama's
// account deletion removes them with the user. Uses whatever ITEM_TIERS in shared/protocol.js holds:
// checks for an open special, a closed special and a premium item are
// skipped when the catalog has none of that kind.
//
// Run: node nakama/tests/e2e_store.mjs   (from the repo root)

globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';
import { ITEM_TIERS, OpCode, decodePayload, specialOpen } from '../../shared/protocol.js';

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
  const session = await client.authenticateDevice(`e2e-store-${name}-${stamp}`, true);
  await client.linkEmail(session, { email: `e2e-store-${name}-${stamp}@example.com`, password: 'password123' });
  const resent = await rpc(session, 'resend_verification');
  await rpc(session, 'verify_email', { token: resent.devLink.split('#verify=')[1] });
  return session;
}

// Joins a fresh match wearing `cosmetics`; resolves what the server kept.
async function wornInMatch(session, cosmetics) {
  const created = await rpc(session, 'create_private_match');
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  const lobby = new Promise((resolve) => {
    socket.onmatchdata = (data) => {
      if (data.op_code === OpCode.LOBBY_STATE) resolve(decodePayload(data.data));
    };
  });
  await socket.joinMatch(created.matchId, null, { displayName: 'tester', ...cosmetics });
  const state = await Promise.race([lobby, delay(3000).then(() => null)]);
  socket.disconnect(false);
  return state && state.cosmetics ? state.cosmetics[session.user_id] : null;
}

function find(predicate) {
  const key = Object.keys(ITEM_TIERS).find((k) => predicate(ITEM_TIERS[k]));
  if (!key) return null;
  const [kind, id] = key.split(':');
  return { kind, id, key };
}

async function main() {
  const now = Date.now();
  const open = find((e) => e.tier === 'special' && specialOpen(e, now));
  const closed = find((e) => e.tier === 'special' && !specialOpen(e, now));
  const premium = find((e) => e.tier === 'premium');

  const alice = await member('alice');
  const state = await rpc(alice, 'store_state');
  assert(Array.isArray(state.owned) && state.owned.length === 0 && Math.abs(state.now - now) < 60000, 'store_state: nothing owned, server clock');
  assert((await rpc(alice, 'claim_item', { kind: 'prop', id: 'crown' })).error === 'not_claimable', 'free items are not claimable');

  const guest = await client.authenticateDevice(`e2e-store-guest-${stamp}`, true);
  if (open) {
    assert((await rpc(guest, 'claim_item', { kind: open.kind, id: open.id })).error === 'member_required', 'Guests cannot claim');
    const before = await wornInMatch(alice, { [open.kind]: open.id });
    assert(before && before[open.kind] !== open.id, `unclaimed special is not worn (${open.key})`);
    const claimed = await rpc(alice, 'claim_item', { kind: open.kind, id: open.id });
    assert(claimed.ok && claimed.owned.includes(open.key), `claiming the open special grants it (${open.key})`);
    const after = await wornInMatch(alice, { [open.kind]: open.id });
    assert(after && after[open.kind] === open.id, 'claimed special is worn');
  } else {
    console.log('skip open-special checks (none in ITEM_TIERS)');
  }
  if (closed) {
    assert((await rpc(alice, 'claim_item', { kind: closed.kind, id: closed.id })).error === 'claim_closed', `closed special cannot be claimed (${closed.key})`);
  } else {
    console.log('skip closed-special checks (none in ITEM_TIERS)');
  }
  if (premium) {
    assert((await rpc(alice, 'claim_item', { kind: premium.kind, id: premium.id })).error === 'not_claimable', 'premium items cannot be claimed');
    const worn = await wornInMatch(alice, { [premium.kind]: premium.id });
    assert(worn && worn[premium.kind] !== premium.id, `unowned premium is not worn (${premium.key})`);
  } else {
    console.log('skip premium checks (none in ITEM_TIERS)');
  }

  if (failures.length) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log('\nall store checks passed');
  process.exit(0);
}

main().catch((error) => {
  console.error('e2e_store crashed:', error && error.status ? `HTTP ${error.status}` : error);
  process.exit(1);
});
