// End-to-end test of Game modes against the local dev stack (pnpm nakama:up,
// DEMO_DICE=1): Quick mode starts every seat with a pawn out and is won by the
// first pawn into the finish, Quick play
// only matches rooms of the same mode, and First capture ends the game on
// the first Capture — with the end-of-game stats, and Play again reopening
// the room as its lobby.
//
// Run: node nakama/tests/e2e_modes.mjs   (from the repo root)

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

const toGlobal = (seat, pos) => ((seat * 10) + pos - 1) % 40;

// One seated human in seat 0; the other three are Bots. Plays instantly and,
// when `hunt` is set, demands (DEMO_DICE) a roll that captures if one exists.
async function soloGame(name, gameMode, { hunt = false, race = false, until, playAgain = false }) {
  const session = await client.authenticateDevice(`e2e-modes-${name}-${stamp}`, true);
  const { matchId } = await rpc(session, 'create_private_match', { gameMode });
  const socket = client.createSocket(false);
  await socket.connect(session, true);
  let closed = false;
  // Delayed rolls/moves may fire after we've disconnected — drop them.
  const send = (op, body) => {
    if (closed) return;
    socket.sendMatchState(matchId, op, encodePayload(body || {})).catch(() => {});
  };
  const log = { start: null, moves: [], over: null };
  let pawns = null;
  let turnSeat = -1;
  const demand = () => {
    if (race) return 6; // every six repeats the turn: seat 0 runs a lap alone
    if (!hunt || !pawns) return null;
    for (const mine of pawns[0]) {
      if (mine < 1 || mine > 40) continue;
      for (let s = 1; s < 4; s += 1) {
        for (const theirs of pawns[s]) {
          if (theirs < 1 || theirs > 40) continue;
          const dist = (toGlobal(s, theirs) - toGlobal(0, mine) + 40) % 40;
          if (dist >= 1 && dist <= 6 && mine + dist <= 40) return dist;
        }
      }
    }
    return pawns[0].every((p) => p === 0) ? 6 : null;
  };
  const roll = () => setTimeout(() => { const d = demand(); send(OpCode.ROLL_REQUEST, d ? { demand: d } : {}); }, 120);
  socket.onmatchdata = (data) => {
    const p = decodePayload(data.data);
    if (data.op_code === OpCode.GAME_START) {
      log.start = p;
      pawns = JSON.parse(JSON.stringify(p.pawns));
      turnSeat = p.turnSeat;
      if (turnSeat === 0) roll();
    } else if (data.op_code === OpCode.TURN_CHANGE) {
      turnSeat = p.turnSeat;
      if (turnSeat === 0 && !log.over) roll();
    } else if (data.op_code === OpCode.DICE_RESULT && p.seat === 0) {
      if (p.legalPawns.length) {
        // Prefer the move that lands on an opponent.
        let pick = p.legalPawns[0];
        for (const idx of p.legalPawns) {
          const to = pawns[0][idx] === 0 ? 1 : pawns[0][idx] + p.value;
          if (to <= 40 && [1, 2, 3].some((s) => pawns[s].some((q) => q >= 1 && q <= 40 && toGlobal(s, q) === toGlobal(0, to)))) pick = idx;
        }
        setTimeout(() => send(OpCode.MOVE_REQUEST, { pawnIndex: pick }), 120);
      } else if (!p.autoEndTurn) {
        roll();
      }
    } else if (data.op_code === OpCode.MOVE_APPLIED) {
      pawns[p.seat][p.pawnIndex] = p.toPos;
      p.captures.forEach((c) => { pawns[c.seat][c.pawnIndex] = 0; });
      log.moves.push(p);
    } else if (data.op_code === OpCode.GAME_OVER) {
      log.over = p;
    } else if (data.op_code === OpCode.LOBBY_STATE && log.over && p.phase === 'lobby') {
      log.lobby = p;
    }
  };
  await socket.joinMatch(matchId, null, { displayName: name });
  await delay(400);
  send(OpCode.CLAIM_SEAT, { seat: 0 });
  await delay(600);
  send(OpCode.START);
  const t0 = Date.now();
  while (!until(log) && Date.now() - t0 < 240000) await delay(250);
  if (playAgain && log.over) {
    send(OpCode.PLAY_AGAIN);
    const t1 = Date.now();
    while (!log.lobby && Date.now() - t1 < 4000) await delay(100);
    log.selfId = session.user_id;
  }
  closed = true;
  socket.disconnect(false);
  return log;
}

async function main() {
  // Quick mode: starting positions.
  const quick = await soloGame('quick', 'quick', { until: (log) => log.start });
  assert(quick.start && quick.start.gameMode === 'quick', 'GAME_START reports the quick Game mode');
  assert(quick.start && quick.start.pawns.every((seat) => seat[0] === 1 && seat[1] === 0 && seat[2] === 0 && seat[3] === 0),
    `quick mode starts every seat with its first pawn on the start field (${JSON.stringify(quick.start && quick.start.pawns)})`);

  // Quick mode: the first pawn into the finish wins.
  const race = await soloGame('race', 'quick', { race: true, until: (log) => log.over });
  const finishedPawns = race.start ? race.moves.filter((m) => m.seat === 0 && m.toPos > 40).length : 0;
  assert(race.over && race.over.winnerSeat === 0, 'a quick game is won by seat 0 racing one pawn home');
  assert(finishedPawns === 1, `one pawn in the finish ends a quick game (${finishedPawns})`);

  // Quick play matches by mode.
  const a = await client.authenticateDevice(`e2e-modes-qa-${stamp}`, true);
  const b = await client.authenticateDevice(`e2e-modes-qb-${stamp}`, true);
  const c = await client.authenticateDevice(`e2e-modes-qc-${stamp}`, true);
  const roomA = await rpc(a, 'quick_match', { gameMode: 'firstCapture' });
  const sockA = client.createSocket(false);
  await sockA.connect(a, true);
  await sockA.joinMatch(roomA.matchId, null, { displayName: 'qa' });
  await delay(1500); // label index lag
  const roomB = await rpc(b, 'quick_match', { gameMode: 'firstCapture' });
  const roomC = await rpc(c, 'quick_match', { gameMode: 'classic' });
  assert(roomB.matchId === roomA.matchId, 'quick play joins an open room of the same mode');
  assert(roomC.matchId !== roomA.matchId, 'quick play never mixes modes');
  sockA.disconnect(false);

  // First capture: the game ends on the first Capture.
  const fc = await soloGame('first', 'firstCapture', { hunt: true, until: (log) => log.over, playAgain: true });
  const firstCapture = fc.moves.find((move) => move.captures.length > 0);
  assert(Boolean(fc.over), 'a first-capture game finishes');
  assert(firstCapture && fc.over && fc.over.winnerSeat === firstCapture.seat,
    `the first capturer wins (capture by seat ${firstCapture && firstCapture.seat}, winner ${fc.over && fc.over.winnerSeat})`);
  assert(firstCapture && fc.moves[fc.moves.length - 1] === firstCapture, 'no moves are played after the first Capture');

  // End-of-game board + Play again.
  const stats = fc.over && fc.over.stats;
  assert(Array.isArray(stats) && stats.length === 4, 'GAME_OVER carries stats for every seat');
  assert(stats && firstCapture && stats[firstCapture.seat].captures === 1, 'the capturer is credited with the Capture');
  const victimSeat = firstCapture && firstCapture.captures[0].seat;
  assert(stats && victimSeat != null && stats[victimSeat].captured === 1, 'the victim is credited with being captured');
  assert(stats && stats.reduce((sum, s) => sum + s.moves, 0) === fc.moves.length, 'move counts add up to the moves played');
  assert(fc.over && fc.over.durationMs > 0 && fc.over.rounds >= 1, 'GAME_OVER reports game time and rounds');
  assert(fc.lobby && fc.lobby.phase === 'lobby', 'Play again reopens the room as a lobby');
  assert(fc.lobby && fc.lobby.seats[0].userId === fc.selfId && fc.lobby.gameMode === 'firstCapture',
    'the player keeps their seat and the room keeps its Game mode');
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
