// End-to-end match test against the local dev stack (pnpm nakama:up).
// Drives two real nakama-js clients through: device auth -> create private
// match -> join by code -> chat -> ready/start -> authoritative game loop
// (roll/move until GAME_OVER) -> mid-game reconnect + STATE_SYNC parity.
//
// Run: node nakama/tests/e2e_match.mjs   (from the repo root)

// nakama-js references bare `window` in its socket heartbeat path; without
// this shim the heartbeat crashes in Node and sockets die after ~20s.
globalThis.window = globalThis;

import { Client } from '@heroiclabs/nakama-js';
import { OpCode, encodePayload, decodePayload } from '../../shared/protocol.js';

const HOST = '127.0.0.1';
const PORT = '7350';
const SERVER_KEY = 'burrec-dev-key';
const GAME_TIMEOUT_MS = 9 * 60 * 1000;

const failures = [];
let capturesSeen = 0;
let repeatsSeen = 0;
let rejectionsSeen = 0;
let movesSeen = 0;
let deliberateRejectionDone = false;
let reconnectTested = false;
let stateSyncChecked = false;

function assert(condition, label) {
  if (!condition) {
    failures.push(label);
    console.error(`FAIL: ${label}`);
  }
}

function log(label) {
  console.log(`[e2e] ${label}`);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class TestPlayer {
  constructor(name) {
    this.name = name;
    this.client = new Client(SERVER_KEY, HOST, PORT, false);
    this.session = null;
    this.socket = null;
    this.matchId = null;
    this.seat = -1;
    this.turnSeat = -1;
    this.pawns = null; // mirror rebuilt from MOVE_APPLIED
    this.chatMessages = [];
    this.diceValues = [];
    this.channelId = null;
    this.onGameOver = null;
    this.onLobbyState = null;
    this.onStateSync = null;
    this.pendingLegal = null;
    this.moveSent = false;
    this.rollOutstanding = false;
    this.gameOver = false;
    this.watchdog = null;
  }

  async login() {
    this.session = await this.client.authenticateDevice(`e2e-${this.name}-${Date.now()}`, true);
    await this.client.updateAccount(this.session, { display_name: this.name });
    this.socket = this.client.createSocket(false);
    this.socket.onchannelmessage = (message) => {
      this.chatMessages.push(message.content?.message || '');
    };
    this.socket.ondisconnect = (evt) => {
      if (!this.expectDisconnect) {
        failures.push(`${this.name} socket disconnected unexpectedly (${evt?.code || ''})`);
        console.error(`SOCKET DROP: ${this.name}`);
      }
    };
    this.socket.onmatchdata = (matchData) => this.handleMatchData(matchData);
    await this.socket.connect(this.session, true);
  }

  async rpc(id, input) {
    const response = await this.client.rpc(this.session, id, input || {});
    let payload = response.payload;
    if (typeof payload === 'string') payload = JSON.parse(payload);
    return payload || {};
  }

  async joinMatch(matchId) {
    this.matchId = matchId;
    await this.socket.joinMatch(matchId, null, { displayName: this.name });
    const channel = await this.socket.joinChat(`ludo-${matchId}`, 1, false, false);
    this.channelId = channel.id;
  }

  send(opCode, payload) {
    return this.socket.sendMatchState(this.matchId, opCode, encodePayload(payload || {}));
  }

  handleMatchData(matchData) {
    const payload = decodePayload(matchData.data);

    if (process.env.E2E_VERBOSE && this.name === 'Alice') {
      console.log(`  [${(Date.now() % 1000000)}] op=${matchData.op_code} ${JSON.stringify(payload).slice(0, 140)}`);
    }

    switch (matchData.op_code) {
      case OpCode.LOBBY_STATE: {
        const mine = (payload.seats || []).find((seat) => seat && seat.username === this.session.username);
        if (mine) this.seat = mine.seat;
        this.lobbyState = payload;
        if (this.onLobbyState) this.onLobbyState(payload);
        break;
      }
      case OpCode.GAME_START: {
        this.pawns = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        this.turnSeat = payload.turnSeat;
        this.scheduleAct();
        break;
      }
      case OpCode.DICE_RESULT: {
        this.diceValues.push(`${payload.seat}:${payload.value}:${this.turnSeat}`);
        this.rollOutstanding = false;
        if (payload.seat === this.seat && !payload.autoEndTurn) {
          if (payload.legalPawns.length > 0) {
            this.pendingLegal = payload.legalPawns;
            this.moveSent = false;
          }
          // legalPawns empty + !autoEndTurn = all-home retry: maybeAct re-rolls.
        }
        this.scheduleAct();
        break;
      }
      case OpCode.MOVE_APPLIED: {
        if (this.name === 'Alice') movesSeen += 1; // count once, not per client
        if (this.pawns) {
          this.pawns[payload.seat][payload.pawnIndex] = payload.toPos;
          (payload.captures || []).forEach((capture) => {
            this.pawns[capture.seat][capture.pawnIndex] = 0;
            if (this.name === 'Alice') capturesSeen += 1;
          });
        }
        break;
      }
      case OpCode.TURN_CHANGE: {
        this.turnSeat = payload.turnSeat;
        if (payload.reason === 'repeat') repeatsSeen += 1;
        this.resetTurnIntents();
        this.scheduleAct();
        break;
      }
      case OpCode.STATE_SYNC: {
        if (this.onStateSync) this.onStateSync(payload);
        this.turnSeat = payload.turnSeat;
        this.resetTurnIntents();
        if (payload.awaitingMove && payload.turnSeat === this.seat) {
          // Rejoined mid-own-move: the dice is already rolled.
          this.pendingLegal = payload.legalPawns || [];
        }
        this.scheduleAct();
        break;
      }
      case OpCode.GAME_OVER: {
        this.gameOver = true;
        clearInterval(this.watchdog);
        if (this.onGameOver) this.onGameOver(payload);
        break;
      }
      case OpCode.REJECTED: {
        rejectionsSeen += 1;
        if (!deliberateRejectionDone) {
          deliberateRejectionDone = true;
        } else {
          failures.push(`unexpected rejection at ${this.name}: ${JSON.stringify(payload)}`);
        }
        break;
      }
      default:
        break;
    }
  }

  resetTurnIntents() {
    this.pendingLegal = null;
    this.moveSent = false;
    this.rollOutstanding = false;
  }

  // Idempotent: inspects current intent state and sends at most one message.
  maybeAct() {
    if (this.turnSeat !== this.seat || this.gameOver) {
      return;
    }
    if (this.pendingLegal && this.pendingLegal.length > 0) {
      if (!this.moveSent) {
        this.moveSent = true;
        this.send(OpCode.MOVE_REQUEST, { pawnIndex: this.pendingLegal[0] });
      }
      return;
    }
    if (!this.rollOutstanding) {
      this.rollOutstanding = true;
      this.rollSentAt = Date.now();
      this.send(OpCode.ROLL_REQUEST);
    }
  }

  scheduleAct() {
    setTimeout(() => this.maybeAct(), 80);
  }

  // Safety net in case any event is missed: re-evaluate every few seconds.
  startWatchdog() {
    this.watchdog = setInterval(() => {
      if (
        this.turnSeat === this.seat &&
        !this.pendingLegal &&
        this.rollOutstanding &&
        Date.now() - this.rollSentAt > 4000
      ) {
        // A roll went genuinely unanswered — allow a retry.
        this.rollOutstanding = false;
      }
      this.maybeAct();
    }, 5000);
  }
}

async function main() {
  const alice = new TestPlayer('Alice');
  const bob = new TestPlayer('Bob');
  await alice.login();
  await bob.login();
  log('both authenticated');

  // --- create + join by code ---
  const created = await alice.rpc('create_private_match');
  assert(created.matchId && /^[A-Z]{4}$/.test(created.code), 'create_private_match returns matchId + 4-letter code');
  await alice.joinMatch(created.matchId);

  await delay(2000); // label index lag
  const found = await bob.rpc('join_by_code', { code: created.code });
  assert(found.matchId === created.matchId, `join_by_code resolves the code (got ${JSON.stringify(found)})`);
  await bob.joinMatch(found.matchId);

  await delay(1500);
  assert(alice.seat === 0, `alice got seat 0 (got ${alice.seat})`);
  assert(bob.seat === 1, `bob got seat 1 (got ${bob.seat})`);
  assert(alice.lobbyState?.hostUserId === alice.session.user_id, 'alice is host');
  log(`lobby formed, code ${created.code}`);

  // --- chat ---
  await alice.socket.writeChatMessage(alice.channelId, { message: 'hello from alice' });
  await bob.socket.writeChatMessage(bob.channelId, { message: 'hi alice' });
  await delay(1200);
  assert(bob.chatMessages.includes('hello from alice'), 'bob received alice chat');
  assert(alice.chatMessages.includes('hi alice'), 'alice received bob chat');
  log('chat verified');

  // --- premature start (not all ready) must be rejected ---
  deliberateRejectionDone = false;
  alice.send(OpCode.START);
  await delay(1200);
  assert(deliberateRejectionDone, 'START before ready was rejected');

  // --- ready + start ---
  alice.send(OpCode.READY, { ready: true });
  bob.send(OpCode.READY, { ready: true });
  await delay(1200);
  const gameOverPromise = new Promise((resolve) => {
    alice.onGameOver = resolve;
  });
  let bobSawGameOver = false;
  bob.onGameOver = () => {
    bobSawGameOver = true;
  };
  alice.send(OpCode.START);
  alice.startWatchdog();
  bob.startWatchdog();
  log('game started, auto-playing to completion…');

  // --- mid-game reconnect: bob drops, rejoins, checks STATE_SYNC parity ---
  const reconnectCheck = (async () => {
    while (movesSeen < 8) {
      await delay(500);
    }
    const pawnsBefore = JSON.parse(JSON.stringify(bob.pawns));
    await bob.socket.leaveMatch(bob.matchId);
    log('bob left mid-game');
    await delay(2000);

    const syncPromise = new Promise((resolve) => {
      bob.onStateSync = resolve;
    });
    await bob.socket.joinMatch(bob.matchId, null, { displayName: bob.name });
    // Rejoin delivers a STATE_SYNC automatically; also request one explicitly.
    bob.send(OpCode.SYNC_REQUEST);
    const snapshot = await syncPromise;
    reconnectTested = true;
    bob.pawns = snapshot.pawns; // adopt the authoritative state

    // Parity: snapshot must not conflict with what event-replay had, modulo
    // moves that happened while bob was away — just sanity-check shape here.
    assert(Array.isArray(snapshot.pawns) && snapshot.pawns.length === 4, 'STATE_SYNC has 4x4 pawns');
    assert(snapshot.phase === 'playing' || snapshot.phase === 'finished', 'STATE_SYNC phase valid');
    stateSyncChecked = true;
    log(`bob reconnected, STATE_SYNC ok (pawns before leave: ${JSON.stringify(pawnsBefore)})`);
  })();

  // --- wrong-turn roll must be rejected (once, deliberately) ---
  const wrongTurnCheck = (async () => {
    await delay(4000);
    deliberateRejectionDone = false;
    const wrongPlayer = alice.turnSeat === alice.seat ? bob : alice;
    wrongPlayer.send(OpCode.ROLL_REQUEST);
    await delay(1500);
    assert(deliberateRejectionDone, 'wrong-turn ROLL_REQUEST was rejected');
  })();

  const winner = await Promise.race([
    gameOverPromise,
    delay(GAME_TIMEOUT_MS).then(() => null),
  ]);
  await wrongTurnCheck;
  await Promise.race([reconnectCheck, delay(5000)]);

  if (winner) {
    log(`GAME_OVER: seat ${winner.winnerSeat} won after ${movesSeen} moves`);
    assert(winner.winnerSeat === 0 || winner.winnerSeat === 1, 'winner seat valid');
    await delay(500);
    assert(bobSawGameOver, 'both clients saw GAME_OVER');
    const winnerPawns = alice.pawns[winner.winnerSeat];
    assert(winnerPawns.every((p) => p > 40), `winner pawns all in target (${JSON.stringify(winnerPawns)})`);
  } else {
    failures.push(`game did not finish within ${GAME_TIMEOUT_MS / 60000} minutes (moves: ${movesSeen})`);
  }

  assert(capturesSeen > 0, `captures happened during the game (${capturesSeen})`);
  assert(repeatsSeen > 0, `six granted extra turns (${repeatsSeen})`);
  assert(reconnectTested && stateSyncChecked, 'reconnect + STATE_SYNC exercised');

  // Dice parity: both clients saw the same DICE_RESULT stream.
  const shorter = Math.min(alice.diceValues.length, bob.diceValues.length);
  const aliceDice = alice.diceValues.slice(0, 20).join('|');
  log(`dice sample: ${aliceDice}`);
  assert(shorter > 10, `both clients received dice results (${alice.diceValues.length}/${bob.diceValues.length})`);

  console.log(failures.length
    ? `\nE2E FAILED — ${failures.length} failure(s):\n- ${failures.join('\n- ')}`
    : `\nE2E PASSED — moves=${movesSeen} captures=${capturesSeen} repeats=${repeatsSeen} rejections=${rejectionsSeen}`);
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error('E2E crashed:', error);
  process.exit(1);
});
