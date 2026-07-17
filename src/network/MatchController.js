// Bridge between the Nakama socket and the local game: translates match
// opcodes into ApplicationStore mutations and EventBus events, and client
// intents into match messages.
//
// Ordering: MOVE_APPLIED / TURN_CHANGE / GAME_OVER go through a FIFO queue
// that pauses while dice physics (store.online.diceInFlight) or a pawn move
// animation (this.moveInFlight) is playing, so server events never interrupt
// a running animation.

import { OpCode, encodePayload, decodePayload } from '../../shared/protocol';
import NakamaClient from './NakamaClient';
import ChatController from './ChatController';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import {
  saveActiveMatch,
  writeMatchUrl,
  clearMatchSession,
} from '../utils/matchSession';

const JOIN_CODE_RETRY_MS = 1500; // match label indexing lags ~1s behind matchCreate
const REJOIN_ATTEMPTS = 5;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  async createPrivate(displayName) {
    await this.ensureConnected(displayName);
    const result = await NakamaClient.rpc('create_private_match', { environment: this.creationEnvironment() });
    if (!result.matchId) {
      throw new Error(result.error || 'create_failed');
    }
    await this.joinById(result.matchId, { mode: 'private', joinCode: result.code });
  }

  async createPublic(displayName) {
    await this.ensureConnected(displayName);
    const result = await NakamaClient.rpc('create_public_match', { environment: this.creationEnvironment() });
    if (!result.matchId) {
      throw new Error(result.error || 'create_failed');
    }
    await this.joinById(result.matchId, { mode: 'public' });
  }

  async joinByCode(code, displayName) {
    await this.ensureConnected(displayName);
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
  async quickMatch(displayName) {
    await this.ensureConnected(displayName);
    for (let attempt = 0; attempt < 2; attempt += 1) {
      // Environment only applies when quick_match has to create a fresh room.
      const result = await NakamaClient.rpc('quick_match', { environment: this.creationEnvironment() });
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

  async joinById(matchId, info) {
    const online = this.online();
    await this.socket.joinMatch(matchId, null, { displayName: online.displayName });

    online.matchId = matchId;
    online.mode = info.mode || null;
    online.joinCode = info.joinCode || null;
    online.lastError = null;
    // Joining an ongoing match: the server's STATE_SYNC (sent during the
    // join) may already have routed us to the game screen — don't stomp it.
    if (ApplicationStore.currentScreen !== 'game-screen') {
      ApplicationStore.currentScreen = 'lobby';
    }

    this.persistSession();

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

    await this.socket.joinMatch(matchId, null, { displayName: online.displayName });

    online.matchId = matchId;
    online.joinCode = joinCode;
    online.mode = ref.mode || (joinCode ? 'private' : online.mode);
    online.lastError = null;
    this.persistSession();

    try {
      await ChatController.join(matchId);
    } catch (error) {
      // Non-critical.
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
    online.environment = null;
    online.seatToPlayerIndex = {};
    online.pendingDice = null;
    online.diceInFlight = false;
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

  requestClaimSeat(seatIndex) {
    this.send(OpCode.CLAIM_SEAT, { seat: seatIndex });
  }

  handleMatchData(matchData) {
    const payload = decodePayload(matchData.data);

    switch (matchData.op_code) {
      case OpCode.LOBBY_STATE:
        this.applyLobbyState(payload);
        break;
      case OpCode.GAME_START:
        this.handleGameStart(payload);
        break;
      case OpCode.DICE_RESULT:
        this.online().pendingDice = payload;
        this.online().diceInFlight = true;
        EventBus.fire(EventKeys.net.diceResult, payload);
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
      case OpCode.REJECTED:
        // An illegal request usually means we drifted from server state.
        if (payload.forOpCode === OpCode.MOVE_REQUEST || payload.forOpCode === OpCode.ROLL_REQUEST) {
          this.requestSync();
        }
        break;
      default:
        break;
    }
  }

  seatOfSelf(seats) {
    const selfUserId = this.online().selfUserId;
    for (const seat of seats || []) {
      if (seat && seat.userId === selfUserId) {
        return seat.seat;
      }
    }
    return -1;
  }

  applyLobbyState(payload) {
    const online = this.online();
    online.seats = payload.seats || [];
    online.hostUserId = payload.hostUserId || null;
    online.joinCode = payload.joinCode || online.joinCode;
    online.displayNames = payload.displayNames || online.displayNames;
    online.environment = payload.environment || online.environment;
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
    online.mySeat = this.seatOfSelf(online.seats);
    online.pendingDice = null;
    online.diceInFlight = false;
    this.opQueue = [];
    this.moveInFlight = false;
    EventBus.fire(EventKeys.game.startOnline, payload);
  }

  pumpQueue() {
    while (this.opQueue.length) {
      if (this.online().diceInFlight || this.moveInFlight) {
        return;
      }

      const item = this.opQueue.shift();
      if (item.opCode === OpCode.MOVE_APPLIED) {
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
    ApplicationStore.winner = {
      name: player ? player.name : 'Player',
      color: player ? player.color : '#ffffff',
      self: payload.winnerSeat === online.mySeat,
    };
    ApplicationStore.gamePlayStatus.isRolling = false;
    ApplicationStore.gamePlayStatus.isMoving = false;
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
    online.environment = payload.environment || online.environment;
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
      ApplicationStore.currentScreen = 'lobby';
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
        await socket.joinMatch(online.matchId, null, { displayName: online.displayName });
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
