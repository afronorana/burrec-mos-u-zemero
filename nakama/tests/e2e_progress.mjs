// End-to-end test of Points (CONTEXT.md: Points; adr/0003) against the local
// dev stack (pnpm nakama:up + nakama:build, DEMO_DICE=1): a won Quick game
// at an Open table pays every part in full into the wallet, a won Solo game
// pays half, and GAME_OVER carries the breakdown; loading the store records
// today's Streak day once, and collecting pays it; a Referral pays both
// players once the referred Member starts a game.
//
// Run: node nakama/tests/e2e_progress.mjs   (from the repo root)

globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';
import { OpCode, POINTS, REFERRAL_INVITER_POINTS, REFERRAL_JOINER_POINTS, SOLO_RATE, WELCOME_BONUS, decodePayload, encodePayload } from '../../shared/protocol.js';

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

async function balance(session) {
  const account = await client.getAccount(session);
  const wallet = typeof account.wallet === 'string' ? JSON.parse(account.wallet || '{}') : (account.wallet || {});
  return Number(wallet.points) || 0;
}

// Seat 0 wins by demanding (DEMO_DICE) exact rolls: pawn i heads for field
// 44 - i, so the pawns never block each other in the finish lane. `lobby`
// rooms need CLAIM_SEAT + START; closed tables start on join.
async function playToWin(session, matchId, { lobby }) {
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  let closed = false;
  const send = (op, body) => {
    if (closed) return;
    socket.sendMatchState(matchId, op, encodePayload(body || {})).catch(() => {});
  };
  let pawns = null;
  let over = null;
  const active = () => pawns[0].findIndex((pos, i) => pos !== 44 - i);
  const roll = () => setTimeout(() => {
    const i = active();
    const pos = pawns[0][i];
    send(OpCode.ROLL_REQUEST, { demand: pos === 0 ? 6 : Math.min(6, 44 - i - pos) });
  }, 120);
  socket.onmatchdata = (data) => {
    const p = decodePayload(data.data);
    if (data.op_code === OpCode.GAME_START || (data.op_code === OpCode.STATE_SYNC && p.pawns && !pawns)) {
      pawns = JSON.parse(JSON.stringify(p.pawns));
      if (p.turnSeat === 0) roll();
    } else if (data.op_code === OpCode.TURN_CHANGE) {
      if (p.turnSeat === 0 && !over) roll();
    } else if (data.op_code === OpCode.DICE_RESULT && p.seat === 0) {
      if (p.legalPawns.length) {
        const i = active();
        const pick = p.legalPawns.includes(i) ? i : p.legalPawns[0];
        setTimeout(() => send(OpCode.MOVE_REQUEST, { pawnIndex: pick }), 120);
      } else if (!p.autoEndTurn) {
        roll();
      }
    } else if (data.op_code === OpCode.MOVE_APPLIED) {
      pawns[p.seat][p.pawnIndex] = p.toPos;
      p.captures.forEach((c) => { pawns[c.seat][c.pawnIndex] = 0; });
    } else if (data.op_code === OpCode.GAME_OVER) {
      over = p;
    }
  };
  await socket.joinMatch(matchId, null, { displayName: 'points' });
  if (lobby) {
    await delay(400);
    send(OpCode.CLAIM_SEAT, { seat: 0 });
    await delay(600);
    send(OpCode.START);
  }
  const t0 = Date.now();
  while (!over && Date.now() - t0 < 240000) await delay(250);
  closed = true;
  socket.disconnect(false);
  return over;
}

function fullTotal(e) {
  return e.finished + e.pawns + e.captures + e.win;
}

async function main() {
  // Streak: the first load of the day counts it, a second load doesn't.
  const carol = await client.authenticateDevice(`e2e-progress-streak-${stamp}`, true);
  const first = await rpc(carol, 'store_state');
  assert(first.streak && first.streak.count === 1 && first.streak.day === 1 && first.streak.pending === 10, `the first load starts the Streak (${JSON.stringify(first.streak)})`);
  const again = await rpc(carol, 'store_state');
  assert(again.streak.count === 1 && again.streak.pending === 10, 'a second load the same day counts nothing');
  const collected = await rpc(carol, 'collect_streak');
  assert(collected.paid === 10 && collected.points === 10 && collected.streak.pending === 0, `collecting pays the waiting reward (${JSON.stringify(collected)})`);
  assert((await rpc(carol, 'collect_streak')).paid === 0, 'nothing left to collect');

  // Open table, Quick mode: one pawn home wins.
  const alice = await client.authenticateDevice(`e2e-progress-open-${stamp}`, true);
  assert((await balance(alice)) === 0, 'a new player starts with no Points (an uncollected Streak day pays nothing yet)');
  const open = await rpc(alice, 'create_private_match', { gameMode: 'quick' });
  const quick = await playToWin(alice, open.matchId, { lobby: true });
  const e = quick && quick.earned && quick.earned[0];
  assert(Boolean(e), 'GAME_OVER carries the winner\'s Points');
  if (e) {
    assert(e.finished === POINTS.finished && e.win === POINTS.win && e.pawns === POINTS.pawn, `breakdown: game, win and one pawn home (${JSON.stringify(e)})`);
    assert(e.total === fullTotal(e) && !e.solo && !e.capped, 'an Open table pays in full');
    assert((await balance(alice)) === e.total, 'the payout lands in the wallet');
  }
  assert(quick && quick.earned.slice(1).every((x) => x === null), 'Bots earn nothing');

  // Titles: the first game and win earn them; the newest is shown until picked.
  assert(e && JSON.stringify(e.newTitles) === JSON.stringify(['games1', 'wins1']), `the first won game earns two Titles (${e && JSON.stringify(e.newTitles)})`);
  const titled = await rpc(alice, 'store_state');
  assert(titled.titles.includes('wins1') && titled.shownTitle === 'wins1', `store_state lists Titles, the newest shown (${titled.shownTitle})`);
  assert((await rpc(alice, 'set_title', { id: 'wins200' })).error === 'title_not_owned', 'an unearned Title cannot be shown');
  assert((await rpc(alice, 'set_title', { id: 'games1' })).ok, 'an earned Title can be picked');
  const room = await rpc(alice, 'create_private_match', {});
  const sock = client.createSocket(false);
  await sock.connect(alice, true);
  const lobby = new Promise((resolve) => { sock.onmatchdata = (d) => { if (d.op_code === OpCode.LOBBY_STATE) resolve(decodePayload(d.data)); }; });
  await sock.joinMatch(room.matchId, null, { displayName: 'points' });
  const lobbyState = await Promise.race([lobby, delay(3000).then(() => null)]);
  assert(lobbyState && lobbyState.titles && lobbyState.titles[alice.user_id] === 'games1', 'LOBBY_STATE carries the shown Title');
  sock.disconnect(false);
  assert((await rpc(alice, 'set_title', { id: '' })).ok && (await rpc(alice, 'store_state')).shownTitle === '', 'showing no Title is a choice');

  // Solo table, Classic: half rate.
  const bob = await client.authenticateDevice(`e2e-progress-solo-${stamp}`, true);
  const solo = await rpc(bob, 'create_table', { table: 'solo' });
  const classic = await playToWin(bob, solo.matchId, { lobby: false });
  const s = classic && classic.earned && classic.earned[0];
  assert(Boolean(s), 'a Solo game pays its owner');
  if (s) {
    assert(s.pawns === 4 * POINTS.pawn && s.win === POINTS.win && s.solo, `Solo breakdown: four pawns home and the win (${JSON.stringify(s)})`);
    assert(s.total === Math.floor(fullTotal(s) * SOLO_RATE) && !s.capped, `a Solo table pays half (${s.total})`);
    assert((await balance(bob)) === s.total, 'the Solo payout lands in the wallet');
  }

  // Referral: recorded once by a fresh Member, paid on their first game.
  const dave = await client.authenticateDevice(`e2e-progress-inviter-${stamp}`, true);
  const { code } = await rpc(dave, 'referral_code');
  assert(/^[A-Z2-9]{6}$/.test(code) && (await rpc(dave, 'referral_code')).code === code, `a player keeps one referral code (${code})`);
  const erin = await client.authenticateDevice(`e2e-progress-joiner-${stamp}`, true);
  assert((await rpc(erin, 'set_referrer', { code })).error === 'member_required', 'a Guest cannot record a referrer');
  await client.linkEmail(erin, { email: `e2e-progress-${stamp}@example.com`, password: 'password123' });
  const resent = await rpc(erin, 'resend_verification');
  await rpc(erin, 'verify_email', { token: resent.devLink.split('#verify=')[1] });
  assert((await rpc(erin, 'set_referrer', { code: 'ZZZZZZ' })).error === 'referral_unknown', 'an unknown code is refused');
  assert((await rpc(erin, 'set_referrer', { code: code.toLowerCase() })).ok, 'a fresh Member records their referrer');
  assert((await rpc(erin, 'set_referrer', { code })).error === 'referral_already_set', 'the referrer is recorded once');
  assert((await balance(dave)) === 0, 'nothing is paid before the newcomer starts a game');
  const table = await rpc(erin, 'create_table', { table: 'solo' });
  const erinSocket = client.createSocket(false);
  await erinSocket.connect(erin, true);
  await erinSocket.joinMatch(table.matchId, null, { displayName: 'erin' });
  await delay(1500);
  erinSocket.disconnect(false);
  assert((await balance(dave)) === REFERRAL_INVITER_POINTS, `the inviter is paid when the newcomer starts a game (${await balance(dave)})`);
  assert((await balance(erin)) === WELCOME_BONUS + REFERRAL_JOINER_POINTS, 'the newcomer gets the Welcome bonus and the Referral Points');
  assert((await rpc(dave, 'store_state')).titles.includes('referrals1'), 'the first Referral earns the Host Title');

  console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall progress checks passed');
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
