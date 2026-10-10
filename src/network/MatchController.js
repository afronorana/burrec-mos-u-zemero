// Bridge between the Nakama socket and the local game: translates match
// opcodes into ApplicationStore mutations and EventBus events, and client
// intents into match messages.
//
// Ordering: DICE_RESULT (when something is still animating) / MOVE_APPLIED /
// TURN_CHANGE / GAME_OVER go through a FIFO queue
// that pauses while dice physics (store.online.diceInFlight), a pawn move
// animation (this.moveInFlight) or a capture Finisher
// (store.online.finisherInFlight) is playing, so server events never interrupt
// a running animation.

import { OpCode, encodePayload, decodePayload, isClosedTable } from '../../shared/protocol';
import NakamaClient from './NakamaClient';
import ChatController from './ChatController';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import { t } from '../utils/i18n';
import {
  saveActiveMatch,
  writeMatchUrl,
  clearMatchSession,
} from '../utils/matchSession';

const JOIN_CODE_RETRY_MS = 1500; // match label indexing lags ~1s behind matchCreate
const LEAVE_ACK_TIMEOUT_MS = 1500; // max wait for the server to hand our seat to a Bot
// The winner's pawns jump this long before the end-of-game board appears.
export const CELEBRATION_MS = 2600;
const REJOIN_ATTEMPTS = 5;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A seat's shown name; every Bot is "Computer" (CONTEXT.md: Bot).
export function seatPlayerName(seat) {
  if (seat.bot) {
    return t('online.computer');
  }
  return seat.displayName || seat.username || `Player ${seat.seat + 1}`;
}

class MatchControllerService {
  constructor() {
    this.socket = null;
    this.opQueue = [];
    this.moveInFlight = false;
    this.rejoining = false;

    EventBus.listen(EventKeys.pawn.moveComplete, () => {
      this.moveInFlight = false;
      this.pumpQueue();
    });
    EventBus.listen(EventKeys.net.diceResolved, () => this.pumpQueue());
    EventBus.listen(EventKeys.finisher.done, () => this.pumpQueue());
  }

  online() {
    return ApplicationStore.online;
  }

  async ensureConnected(displayName) {
    await NakamaClient.login(displayName);
    const socket = await NakamaClient.connectSocket();
    if (socket !== this.socket) {
      this.socket = socket;
      this.wireSocket(socket);
    }
    return socket;
  }

  wireSocket(socket) {
    socket.onmatchdata = (matchData) => this.handleMatchData(matchData);
    ChatController.attach(socket);
    NakamaClient.onDisconnect = () => this.handleDisconnect();
  }

  // The creator's environment travels with the match — everyone who joins
  // sees the room in the environment it was created with.
  creationEnvironment() {
    return ApplicationStore.settings.environment || 'day';
  }

  // Matchmaking progress for the loader overlay (StartScreen): 'connecting'
  // while the socket comes up, then the request's own stage until it lands
  // (lobby/game screen) or fails. Always cleared.
  async withMatchmaking(stage, displayName, run) {
    const online = this.online();
    online.matchmaking = 'connecting';
    try {
      await this.ensureConnected(displayName);
      online.matchmaking = stage;
      await run();
    } finally {
      online.matchmaking = null;
    }
  }

  createPrivate(displayName) {
    return this.withMatchmaking('creating', displayName, () => this.createPrivateRoom());
  }

  async createPrivateRoom() {
    const result = await NakamaClient.rpc('create_private_match', { environment: this.creationEnvironment(), gameMode: ApplicationStore.settings.gameMode });
    if (!result.matchId) {
      throw new Error(result.error || 'create_failed');
    }
    await this.joinById(result.matchId, { mode: 'private', joinCode: result.code });
  }

  createPublic(displayName) {
    return this.withMatchmaking('creating', displayName, () => this.createPublicRoom());
  }

  async createPublicRoom() {
    const result = await NakamaClient.rpc('create_public_match', { environment: this.creationEnvironment(), gameMode: ApplicationStore.settings.gameMode });
    if (!result.matchId) {
      throw new Error(result.error || 'create_failed');
    }
    await this.joinById(result.matchId, { mode: 'public' });
  }

  joinByCode(code, displayName) {
    return this.withMatchmaking('joining', displayName, () => this.joinRoomByCode(code));
  }

  async joinRoomByCode(code) {
    let result = await NakamaClient.rpc('join_by_code', { code });
    if (result.error === 'not_found') {
      // The label index lags match creation by ~1s; retry once.
      await delay(JOIN_CODE_RETRY_MS);
      result = await NakamaClient.rpc('join_by_code', { code });
    }
    if (!result.matchId) {
      throw new Error(result.error || 'not_found');
    }
    await this.joinById(result.matchId, { mode: 'private', joinCode: String(code).trim().toUpperCase() });
  }

  // Find-or-create: the server returns an open public room (or makes one). If
  // the room filled between the query and our join, ask again for a fresh one.
  quickMatch(displayName) {
    return this.withMatchmaking('finding', displayName, () => this.findQuickMatch());
  }

  async findQuickMatch() {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      // Environment only applies when quick_match has to create a fresh room.
      const result = await NakamaClient.rpc('quick_match', { environment: this.creationEnvironment(), gameMode: ApplicationStore.settings.gameMode });
      if (!result.matchId) {
        throw new Error(result.error || 'join_failed');
      }
      try {
        await this.joinById(result.matchId, { mode: 'public' });
        return;
      } catch (error) {
        if (attempt === 1) {
          throw error;
        }
        // Room raced full/started — loop asks quick_match for another.
      }
    }
  }

  // CONTEXT.md: Table — a Solo or Shared table: a closed match the server
  // starts as soon as we join (no lobby). `seats` (shared only):
  // [{ kind: 'player' | 'computer', name } x4], the first player being us.
  // `dev`: a dev table — clustered pawns, honored only by a DEMO_DICE=1 server.
  startTable(table, displayName, seats, { dev = false } = {}) {
    return this.withMatchmaking('starting', displayName, async () => {
      const result = await NakamaClient.rpc('create_table', { table, seats, dev, environment: this.creationEnvironment() });
      if (!result.matchId) {
        throw new Error(result.error || 'create_failed');
      }
      this.online().table = table;
      await this.joinById(result.matchId, { mode: 'private' });
    });
  }

  isClosedTable() {
    return isClosedTable(this.online().table);
  }

  // Join metadata: the name plus this player's Cosmetics (the server
  // whitelists them).
  joinMetadata() {
    // Nakama join metadata is string-valued: the per-pawn looks ride as JSON.
    const { prop, finisher, flag, pawns } = ApplicationStore.settings.cosmetics;
    return { displayName: this.online().displayName, prop, finisher, flag, pawns: JSON.stringify(pawns) };
  }

  async joinById(matchId, info) {
    const online = this.online();
    await this.socket.joinMatch(matchId, null, this.joinMetadata());

    online.matchId = matchId;
    online.mode = info.mode || null;
    online.joinCode = info.joinCode || null;
    online.lastError = null;
    // Joining an ongoing match: the server's STATE_SYNC (sent during the
    // join) may already have routed us to the game screen — don't stomp it.
    // A Solo/Shared table has no lobby: GAME_START takes us to the board.
    if (ApplicationStore.currentScreen !== 'game-screen' && !this.isClosedTable()) {
      ApplicationStore.currentScreen = 'lobby';
    }

    this.persistSession();

    if (this.isClosedTable()) {
      return; // no chat at a Solo/Shared table
    }
    try {
      await ChatController.join(matchId);
    } catch (error) {
      // Chat is non-critical; the lobby works without it.
    }
  }

  // Mirror the active match into the URL hash + identityStorage so a reload or
  // reopened tab can resume it (see utils/matchSession.js).
  persistSession() {
    const online = this.online();
    const record = { matchId: online.matchId, mode: online.mode, joinCode: online.joinCode };
    saveActiveMatch(record);
    writeMatchUrl(record);
  }

  // Rejoin a match named by the URL/stored record after a reload. The server
  // recognises the seat by userId and replies with a STATE_SYNC snapshot, so
  // this reuses the exact recovery path used for mid-game desyncs.
  async resume(ref) {
    const online = this.online();
    online.resuming = true;
    online.connectionState = 'reconnecting';
    await this.ensureConnected(online.displayName);

    let matchId = ref.matchId || null;
    let joinCode = ref.joinCode || ref.code || null;
    if (!matchId && joinCode) {
      let result = await NakamaClient.rpc('join_by_code', { code: joinCode });
      if (result.error === 'not_found') {
        await delay(JOIN_CODE_RETRY_MS);
        result = await NakamaClient.rpc('join_by_code', { code: joinCode });
      }
      matchId = result.matchId || null;
    }
    if (!matchId) {
      throw new Error('match_gone');
    }

    await this.socket.joinMatch(matchId, null, this.joinMetadata());

    online.matchId = matchId;
    online.joinCode = joinCode;
    online.mode = ref.mode || (joinCode ? 'private' : online.mode);
    online.lastError = null;
    this.persistSession();

    try {
      await ChatController.join(matchId);
    } catch (error) {
      // Non-critical (and refused at a Solo/Shared table, which has no chat).
    }

    // Pull the authoritative snapshot; handleStateSync routes us to lobby or
    // game and clears online.resuming.
    this.requestSync();
  }

  // Entry point for reload/reopen resume: wraps resume() so a gone/full/started
  // match lands the player back in the menu with a readable error instead of a
  // stuck overlay.
  async resumeSession(ref) {
    try {
      await this.resume(ref);
    } catch (error) {
      const online = this.online();
      clearMatchSession();
      online.resuming = false;
      online.pendingResume = null;
      online.matchId = null;
      online.enabled = false;
      online.connectionState = 'idle';
      online.lastError = 'match_gone';
      ApplicationStore.currentScreen = 'main-menu';
    }
  }

  async leaveMatch() {
    const online = this.online();
    const matchId = online.matchId;

    this.opQueue = [];
    this.moveInFlight = false;

    await ChatController.leave();
    if (matchId && this.socket) {
      // Tell the server this is a real Leave, not a dropped connection: our
      // seat goes to a Computer right away instead of waiting as a
      // "reconnecting" ghost. Wait (briefly) until it confirms — the leave
      // itself could otherwise overtake the message.
      await this.announceLeave(matchId);
      try {
        await this.socket.leaveMatch(matchId);
      } catch (error) {
        // Socket may already be closed.
      }
    }

    online.matchId = null;
    online.mode = null;
    online.joinCode = null;
    online.mySeat = -1;
    online.hostUserId = null;
    online.seats = [];
    online.displayNames = {};
    online.cosmetics = {};
    online.titles = {};
    online.restyled = {};
    online.restyleError = null;
    online.environment = null;
    online.gameMode = null;
    online.table = null;
    online.gameOver = null;
    clearTimeout(this.celebrationTimer);
    online.seatToPlayerIndex = {};
    online.pendingDice = null;
    online.diceInFlight = false;
    online.finisherInFlight = false;
    online.moveFinisher = null;
    online.autoMovePawn = null;
    online.enabled = false;
    online.resuming = false;
    online.resumePrompt = null;
    online.pendingResume = null;
    // Explicit leave is intentional — forget the match so it isn't offered back.
    clearMatchSession();
    ApplicationStore.winner = null;
    ApplicationStore.gamePlayStatus.isRolling = false;
    ApplicationStore.gamePlayStatus.isMoving = false;
    ApplicationStore.currentScreen = 'main-menu';
  }

  // Resolves once a LOBBY_STATE/STATE_SYNC no longer seats us (or after a
  // short timeout, e.g. we had no seat or the socket is already gone).
  announceLeave(matchId) {
    const selfUserId = this.online().selfUserId;
    if (this.seatOfSelf(this.online().seats) < 0) {
      return Promise.resolve();
    }
    // A Solo/Shared table just ends — nothing to wait for.
    if (this.isClosedTable()) {
      try {
        this.socket.sendMatchState(matchId, OpCode.LEAVE, encodePayload({}));
      } catch (error) {
        // Socket may already be closed.
      }
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const previous = this.socket.onmatchdata;
      const done = () => {
        clearTimeout(timer);
        if (this.socket && this.socket.onmatchdata === watcher) {
          this.socket.onmatchdata = previous;
        }
        resolve();
      };
      const watcher = (matchData) => {
        if (matchData.op_code === OpCode.LOBBY_STATE || matchData.op_code === OpCode.STATE_SYNC) {
          const seats = decodePayload(matchData.data).seats || [];
          if (!seats.some((seat) => seat && seat.userId === selfUserId)) {
            done();
          }
        }
      };
      const timer = setTimeout(done, LEAVE_ACK_TIMEOUT_MS);
      this.socket.onmatchdata = watcher;
      try {
        this.socket.sendMatchState(matchId, OpCode.LEAVE, encodePayload({}));
      } catch (error) {
        done();
      }
    });
  }

  send(opCode, payload) {
    const online = this.online();
    if (!this.socket || !online.matchId) {
      return;
    }
    this.socket.sendMatchState(online.matchId, opCode, encodePayload(payload));
  }

  sendReady(ready) {
    this.send(OpCode.READY, { ready: Boolean(ready) });
  }

  sendStart() {
    this.send(OpCode.START, {});
  }

  requestRoll(demand) {
    this.send(OpCode.ROLL_REQUEST, demand ? { demand } : {});
  }

  requestMove(pawnIndex) {
    this.send(OpCode.MOVE_REQUEST, { pawnIndex });
  }

  requestSync() {
    this.send(OpCode.SYNC_REQUEST, {});
  }

  // End-of-game board: reopen this room as a lobby for another round.
  requestPlayAgain() {
    this.send(OpCode.PLAY_AGAIN, {});
  }

  requestClaimSeat(seatIndex) {
    this.send(OpCode.CLAIM_SEAT, { seat: seatIndex });
  }

  // The one mid-game restyle (the server refuses a second one).
  requestRestyle(cosmetics) {
    this.online().restyleError = null;
    this.send(OpCode.SET_COSMETICS, cosmetics);
  }

  handleMatchData(matchData) {
    const payload = decodePayload(matchData.data);
    // Client-only arrival stamp: `turnMsLeft` is relative to when the server
    // sent it, and TURN_CHANGE may sit in opQueue behind animations for a
    // while — the turn timer anchors to arrival, not to processing.
    if (payload && typeof payload === 'object') {
      payload.receivedAt = performance.now();
    }

    switch (matchData.op_code) {
      case OpCode.LOBBY_STATE:
        this.applyLobbyState(payload);
        break;
      case OpCode.GAME_START:
        this.handleGameStart(payload);
        break;
      case OpCode.DICE_RESULT:
        // Bots roll on the server's clock: a roll may arrive while earlier
        // events are still animating, so it waits its turn in the FIFO.
        if (this.opQueue.length || this.queueBlocked()) {
          this.opQueue.push({ opCode: matchData.op_code, payload });
        } else {
          this.applyDiceResult(payload);
        }
        break;
      case OpCode.MOVE_APPLIED:
      case OpCode.TURN_CHANGE:
      case OpCode.GAME_OVER:
        this.opQueue.push({ opCode: matchData.op_code, payload });
        this.pumpQueue();
        break;
      case OpCode.STATE_SYNC:
        this.handleStateSync(payload);
        break;
      case OpCode.COSMETICS_CHANGED: {
        // Applied at once: Props are purely visual, and queued MOVE_APPLIEDs
        // carry their own stamped Finisher.
        const online = this.online();
        online.cosmetics = { ...online.cosmetics, [payload.userId]: payload.cosmetics };
        online.restyled = { ...online.restyled, [payload.userId]: true };
        break;
      }
      case OpCode.REJECTED:
        if (payload.forOpCode === OpCode.SET_COSMETICS) {
          this.online().restyleError = payload.reason;
          if (payload.reason === 'restyle_used') {
            this.online().restyled = { ...this.online().restyled, [this.online().selfUserId]: true };
          }
          break;
        }
        // An illegal request usually means we drifted from server state.
        if (payload.forOpCode === OpCode.MOVE_REQUEST || payload.forOpCode === OpCode.ROLL_REQUEST) {
          this.requestSync();
        }
        break;
      default:
        break;
    }
  }

  // Our own seat — at a Shared table never a companion seat we play for
  // someone else.
  seatOfSelf(seats) {
    const selfUserId = this.online().selfUserId;
    for (const seat of seats || []) {
      if (seat && !seat.companion && seat.userId === selfUserId) {
        return seat.seat;
      }
    }
    return -1;
  }

  applyLobbyState(payload) {
    const online = this.online();
    // Someone pressed Play again: the finished room is a lobby again —
    // everyone still in it goes back to the lobby together.
    // At a Solo table there's no lobby: the server's GAME_START follows at
    // once and rebuilds the board where we are.
    if (payload.phase === 'lobby' && ApplicationStore.currentScreen === 'game-screen') {
      clearTimeout(this.celebrationTimer);
      online.gameOver = null;
      online.restyled = {};
      ApplicationStore.winner = null;
      if (!isClosedTable(payload.table)) {
        online.enabled = false;
        ApplicationStore.currentScreen = 'lobby';
      }
      this.persistSession(); // resumable again after a reload
    }
    online.seats = payload.seats || [];
    online.hostUserId = payload.hostUserId || null;
    online.joinCode = payload.joinCode || online.joinCode;
    online.displayNames = payload.displayNames || online.displayNames;
    online.cosmetics = payload.cosmetics || online.cosmetics;
    online.titles = payload.titles || online.titles;
    online.environment = payload.environment || online.environment;
    online.gameMode = payload.gameMode || online.gameMode;
    online.table = payload.table || online.table;
    // A code in the payload means this is a private room — infer it when we
    // resumed from a bare matchId and never learned the mode.
    if (online.joinCode && !online.mode) {
      online.mode = 'private';
    }
    online.mySeat = this.seatOfSelf(online.seats);
    EventBus.fire(EventKeys.net.lobbyUpdated);
  }

  handleGameStart(payload) {
    const online = this.online();
    online.seats = payload.seats || [];
    online.gameMode = payload.gameMode || online.gameMode;
    online.table = payload.table || online.table;
    online.mySeat = this.seatOfSelf(online.seats);
    online.pendingDice = null;
    online.diceInFlight = false;
    this.opQueue = [];
    this.moveInFlight = false;
    EventBus.fire(EventKeys.game.startOnline, payload);
  }

  // Is this seat "you"? At a Shared table nobody is singled out: everyone
  // at the device is playing.
  isSelfSeat(seat) {
    const online = this.online();
    return online.table !== 'shared' && seat === online.mySeat && seat >= 0;
  }

  queueBlocked() {
    const online = this.online();
    return online.diceInFlight || this.moveInFlight || online.finisherInFlight;
  }

  applyDiceResult(payload) {
    this.online().pendingDice = payload;
    this.online().diceInFlight = true;
    EventBus.fire(EventKeys.net.diceResult, payload);
  }

  pumpQueue() {
    while (this.opQueue.length) {
      if (this.queueBlocked()) {
        return;
      }

      const item = this.opQueue.shift();
      if (item.opCode === OpCode.DICE_RESULT) {
        this.applyDiceResult(item.payload);
      } else if (item.opCode === OpCode.MOVE_APPLIED) {
        this.applyMove(item.payload);
      } else if (item.opCode === OpCode.TURN_CHANGE) {
        EventBus.fire(EventKeys.net.turnChange, item.payload);
      } else if (item.opCode === OpCode.GAME_OVER) {
        this.applyGameOver(item.payload);
      }
    }
  }

  applyMove(payload) {
    const online = this.online();
    const playerIndex = online.seatToPlayerIndex[payload.seat];
    const player = ApplicationStore.players[playerIndex];
    const pawn = player ? player.pawns[payload.pawnIndex] : null;
    if (!pawn) {
      this.requestSync();
      return;
    }

    // Replay the server move through the existing animation path: Pawn.move()
    // reads lastRolledDice for the step count and handles captures itself.
    ApplicationStore.lastRolledDice = payload.steps;
    ApplicationStore.playingPlayerIndex = playerIndex;
    ApplicationStore.gamePlayStatus.isMoving = true;
    online.moveFinisher = payload.finisher || null;
    pawn.isActive = true;
    this.moveInFlight = true;
    pawn.move();

    if (!pawn.isMoving) {
      // The move did not start (client out of sync) — recover.
      this.moveInFlight = false;
      this.requestSync();
    }
  }

  applyGameOver(payload) {
    const online = this.online();
    const playerIndex = online.seatToPlayerIndex[payload.winnerSeat];
    const player = ApplicationStore.players[playerIndex];
    online.gameOver = payload;
    ApplicationStore.gamePlayStatus.isRolling = false;
    ApplicationStore.gamePlayStatus.isMoving = false;
    // First the winner's pawns jump on the board, then the board of stats.
    EventBus.fire(EventKeys.game.celebrate, { playerIndex });
    clearTimeout(this.celebrationTimer);
    const matchId = online.matchId;
    this.celebrationTimer = setTimeout(() => {
      if (online.matchId !== matchId || !online.gameOver) {
        return; // left or already back in the lobby
      }
      ApplicationStore.winner = {
        name: player ? player.name : 'Player',
        color: player ? player.color : '#ffffff',
        self: this.isSelfSeat(payload.winnerSeat),
        seat: payload.winnerSeat,
      };
    }, CELEBRATION_MS);
    // The match is over — don't offer to resume a finished game.
    clearMatchSession();
  }

  handleStateSync(payload) {
    const online = this.online();
    // A snapshot arrived — whatever we were resuming/reconnecting, we're back.
    online.resuming = false;
    if (online.connectionState !== 'connected') {
      online.connectionState = 'connected';
    }
    this.opQueue = [];
    this.moveInFlight = false;
    online.diceInFlight = false;
    online.seats = payload.seats || [];
    online.hostUserId = payload.hostUserId || null;
    online.joinCode = payload.joinCode || online.joinCode;
    online.displayNames = payload.displayNames || online.displayNames;
    online.cosmetics = payload.cosmetics || online.cosmetics;
    online.titles = payload.titles || online.titles;
    online.restyled = payload.restyled || online.restyled;
    online.environment = payload.environment || online.environment;
    online.gameMode = payload.gameMode || online.gameMode;
    online.table = payload.table || online.table;
    if (online.joinCode && !online.mode) {
      online.mode = 'private';
    }
    online.mySeat = this.seatOfSelf(online.seats);
    // Keep the URL/record current — a resume from a bare matchId only learns
    // the private join code here.
    if (online.matchId) {
      this.persistSession();
    }
    online.pendingDice = payload.awaitingMove
      ? {
        seat: payload.turnSeat,
        value: payload.dice,
        legalPawns: payload.legalPawns || [],
        rollsLeft: 0,
        autoEndTurn: false,
      }
      : null;

    if (payload.phase === 'lobby') {
      if (!isClosedTable(online.table)) {
        ApplicationStore.currentScreen = 'lobby';
      }
      return;
    }
    EventBus.fire(EventKeys.net.stateSync, payload);
  }

  handleDisconnect() {
    const online = this.online();
    if (!online.matchId || this.rejoining) {
      return;
    }
    this.attemptRejoin();
  }

  async attemptRejoin() {
    const online = this.online();
    this.rejoining = true;
    online.connectionState = 'reconnecting';

    for (let attempt = 1; attempt <= REJOIN_ATTEMPTS; attempt += 1) {
      await delay(1500 * attempt);
      try {
        await NakamaClient.login(online.displayName);
        const socket = await NakamaClient.connectSocket();
        this.socket = socket;
        this.wireSocket(socket);
        await socket.joinMatch(online.matchId, null, this.joinMetadata());
        try {
          await ChatController.join(online.matchId);
        } catch (chatError) {
          // Non-critical.
        }
        this.requestSync();
        online.connectionState = 'connected';
        this.rejoining = false;
        return;
      } catch (error) {
        // Server may still be unreachable, or the match may be gone.
      }
    }

    online.connectionState = 'disconnected';
    online.lastError = 'reconnect_failed';
    this.rejoining = false;
  }
}

export default new MatchControllerService();
