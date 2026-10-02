// End-to-end moderation test against the local dev stack (pnpm nakama:up,
// EMAIL_DEV_ECHO=1). Covers Block, Report (server-verified chat evidence,
// one open per pair, Guests may report), Admin gating, Shadowban (sender's
// messages reach nobody), Ban/Unban, report resolution + history, digest.
//
// The Admin is the custom-auth user "burrec-e2e-admin"; its user id must be in
// ADMIN_USER_IDS (nakama/local.yml). The test prints it when refused.
//
// Run: node nakama/tests/e2e_moderation.mjs   (from the repo root)

globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';

const client = new Client('burrec-dev-key', '127.0.0.1', '7350', false);
const failures = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const stamp = Date.now();

function assert(condition, label) {
  console.log(`${condition ? 'ok  ' : 'FAIL'} ${label}`);
  if (!condition) failures.push(label);
}

async function rpc(session, id, input) {
  const response = await client.rpc(session, id, input || {});
  return typeof response.payload === 'string' ? JSON.parse(response.payload) : (response.payload || {});
}

async function makeMember(session, email) {
  const status = await rpc(session, 'auth_status');
  if (status.member) return;
  if (!status.email) {
    await client.linkEmail(session, { email, password: 'password123' });
  }
  const resent = await rpc(session, 'resend_verification');
  const token = resent.devLink ? resent.devLink.split('#verify=')[1] : null;
  const verified = token ? await rpc(session, 'verify_email', { token }) : {};
  if (!verified.ok) throw new Error(`could not verify ${email} (is EMAIL_DEV_ECHO=1?)`);
}

async function player(name, { member = true } = {}) {
  const session = await client.authenticateDevice(`e2e-mod-${name}-${stamp}`, true);
  await client.updateAccount(session, { display_name: `${name}${stamp % 1000}` });
  if (member) await makeMember(session, `e2e-mod-${name}-${stamp}@example.com`);
  const socket = client.createSocket(false);
  const received = [];
  socket.onchannelmessage = (message) => received.push(message);
  await socket.connect(session, true);
  return { name, session, socket, received, channelId: null };
}

async function joinAll(matchId, players) {
  for (const p of players) {
    await p.socket.joinMatch(matchId, null, { displayName: p.name });
    const channel = await p.socket.joinChat(`ludo-${matchId}`, 1, true, false);
    p.channelId = channel.id;
  }
}

async function main() {
  const admin = await client.authenticateCustom('burrec-e2e-admin', true, 'e2e-admin');
  await makeMember(admin, 'e2e-admin@example.com');

  const alice = await player('alice');
  const bob = await player('bob');
  const gus = await player('gus', { member: false });

  const created = await rpc(alice.session, 'create_private_match');
  await joinAll(created.matchId, [alice, bob, gus]);

  // ── chat + Block + Report ─────────────────────────────────────────
  await bob.socket.writeChatMessage(bob.channelId, { message: 'you are terrible' });
  await delay(600);
  const abuse = alice.received.find((m) => m.sender_id === bob.session.user_id);
  assert(!!abuse, 'alice receives bob\'s message');

  const blocked = await rpc(alice.session, 'set_block', { userId: bob.session.user_id, blocked: true });
  assert(blocked.ids.includes(bob.session.user_id), 'alice blocks bob');
  const unblocked = await rpc(alice.session, 'set_block', { userId: bob.session.user_id, blocked: false });
  assert(!unblocked.ids.includes(bob.session.user_id), 'alice unblocks bob');

  const report = await rpc(alice.session, 'report_player', {
    userId: bob.session.user_id, kind: 'chat', reason: 'harassment',
    matchId: created.matchId, messageId: abuse && abuse.message_id, messageText: 'FORGED TEXT',
  });
  assert(report.ok === true && !report.duplicate, 'alice reports bob\'s message');
  const listAfter = await rpc(alice.session, 'block_list');
  assert(listAfter.ids.includes(bob.session.user_id), 'reporting also blocks');
  const again = await rpc(alice.session, 'report_player', { userId: bob.session.user_id, kind: 'name', reason: 'spam' });
  assert(again.duplicate === true, 'second open report on the same pair is a no-op');
  const guestReport = await rpc(gus.session, 'report_player', { userId: bob.session.user_id, kind: 'name', reason: 'offensive_name' });
  assert(guestReport.ok === true, 'a Guest can report');
  const self = await rpc(alice.session, 'report_player', { userId: alice.session.user_id, kind: 'name', reason: 'spam' });
  assert(self.error === 'generic', 'cannot report yourself');

  // ── Admin gating ──────────────────────────────────────────────────
  const refused = await rpc(alice.session, 'admin_overview');
  assert(refused.error === 'forbidden' && refused.userId === alice.session.user_id, 'non-admin refused (id echoed)');
  const overview = await rpc(admin, 'admin_overview');
  if (overview.error) {
    console.error(`\nAdmin refused. Put this id in ADMIN_USER_IDS (nakama/local.yml) and restart: ${overview.userId}`);
    process.exit(1);
  }
  assert(overview.openReports >= 2, `overview counts open reports (${overview.openReports})`);

  const { reports } = await rpc(admin, 'admin_reports');
  const chatReport = reports.find((r) => r.reporterId === alice.session.user_id && r.targetId === bob.session.user_id);
  assert(chatReport && chatReport.verified && chatReport.evidence === 'you are terrible',
    `chat evidence is the server's copy, not the reporter's (${chatReport && chatReport.evidence})`);

  const users = await rpc(admin, 'admin_users', { query: `bob${stamp % 1000}` });
  const bobRow = users.users.find((u) => u.id === bob.session.user_id);
  assert(bobRow && bobRow.openReports === 2 && bobRow.member, 'user list shows bob with 2 open reports');
  const guests = await rpc(admin, 'admin_users', { query: `gus${stamp % 1000}` });
  assert(!guests.users.length, 'unreported Guests hidden by default');
  const withGuests = await rpc(admin, 'admin_users', { query: `gus${stamp % 1000}`, includeGuests: true });
  assert(withGuests.users.length === 1 && !withGuests.users[0].member, 'includeGuests shows the Guest');

  // ── Shadowban ─────────────────────────────────────────────────────
  await rpc(admin, 'admin_set_shadowban', { userId: bob.session.user_id, on: true, note: 'chat abuse' });
  const before = gus.received.length;
  const ack = bob.socket.writeChatMessage(bob.channelId, { message: 'can anyone hear me' })
    .then(() => 'acked', () => 'rejected');
  const outcome = await Promise.race([ack, delay(1500).then(() => 'pending')]);
  assert(gus.received.length === before, 'shadowbanned message reaches nobody');
  assert(outcome === 'rejected', `shadowbanned send is refused, not hung (${outcome})`);
  await delay(300);
  let stillConnected = true;
  try {
    await bob.socket.rpc('healthcheck', '{}');
  } catch (error) {
    stillConnected = false;
  }
  assert(stillConnected, 'shadowbanned sender keeps their socket (and match)');
  await rpc(admin, 'admin_set_shadowban', { userId: bob.session.user_id, on: false });
  await bob.socket.writeChatMessage(bob.channelId, { message: 'back again' });
  await delay(600);
  assert(gus.received.some((m) => m.content && m.content.message === 'back again'), 'lifting the shadowban restores chat');

  // ── resolve + history ─────────────────────────────────────────────
  const resolved = await rpc(admin, 'admin_resolve_report', { reportId: chatReport.id, status: 'resolved', note: 'warned' });
  assert(resolved.ok && resolved.report.status === 'resolved', 'report resolved');
  const reopen = await rpc(alice.session, 'report_player', { userId: bob.session.user_id, kind: 'name', reason: 'spam' });
  assert(reopen.ok && !reopen.duplicate, 'after resolution the pair can report again');

  // ── Ban ───────────────────────────────────────────────────────────
  await rpc(admin, 'admin_set_ban', { userId: bob.session.user_id, on: true, note: 'repeat offender' });
  let bannedOut = false;
  try {
    await client.authenticateDevice(`e2e-mod-bob-${stamp}`, false);
  } catch (error) {
    bannedOut = true;
  }
  assert(bannedOut, 'banned user cannot sign in');
  await delay(500);
  let liveCut = false;
  try {
    await bob.socket.rpc('healthcheck', '{}');
  } catch (error) {
    liveCut = true;
  }
  assert(liveCut, 'ban cuts the banned user\'s live socket');
  await rpc(admin, 'admin_set_ban', { userId: bob.session.user_id, on: false });
  const back = await client.authenticateDevice(`e2e-mod-bob-${stamp}`, false);
  assert(back.user_id === bob.session.user_id, 'unbanned user can sign in again');

  const detail = await rpc(admin, 'admin_user', { userId: bob.session.user_id });
  const actions = detail.history.map((h) => h.action);
  assert(['shadowban', 'unshadowban', 'report_resolved', 'ban', 'unban'].every((a) => actions.includes(a)),
    `history records every admin action (${actions.join(',')})`);
  assert(detail.history.every((h) => h.adminId === admin.user_id), 'history names the acting admin');

  // ── digest ────────────────────────────────────────────────────────
  const digest = await rpc(admin, 'admin_send_digest');
  assert(digest.ok === true, 'digest runs');
  const all = await rpc(admin, 'admin_reports', { status: 'all' });
  assert(all.reports.filter((r) => r.targetId === bob.session.user_id).every((r) => r.digested), 'digested reports are marked');

  [alice, gus].forEach((p) => p.socket.disconnect(false));
  if (failures.length) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log('\nall moderation checks passed');
  process.exit(0);
}

main().catch((error) => {
  console.error('e2e_moderation crashed:', error && error.status ? `HTTP ${error.status}` : error);
  process.exit(1);
});
