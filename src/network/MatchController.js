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

const JOIN_CODE_RETRY_MS = 1500; // match label indexing lags ~1s behind matchCreate
const REJOIN_ATTEMPTS = 5;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class MatchControllerService {
  constructor() {
    this.socket = null;
    this.matchmakerTicket = null;
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
    socket.onmatchmakermatched = (matched) => this.handleMatchmakerMatched(matched);
    ChatController.attach(socket);
    NakamaClient.onDisconnect = () => this.handleDisconnect();
  }

  async createPrivate(displayName) {
    await this.ensureConnected(displayName);
    const result = await NakamaClient.rpc('create_private_match');
    if (!result.matchId) {
      throw new Error(result.error || 'create_failed');
    }
    await this.joinById(result.matchId, { mode: 'private', joinCode: result.code });
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

  async quickMatch(displayName) {
    await this.ensureConnected(displayName);
    this.matchmakerTicket = await this.socket.addMatchmaker('*', 2, 4);
    this.online().matchmaking = true;
  }

  async cancelQuickMatch() {
    const ticket = this.matchmakerTicket;
    this.matchmakerTicket = null;
    this.online().matchmaking = false;
    if (ticket && this.socket) {
      try {
        await this.socket.removeMatchmaker(ticket.ticket);
      } catch (error) {
        // Ticket may have already matched or expired.
      }
    }
  }

  async handleMatchmakerMatched(matched) {
    this.matchmakerTicket = null;
    this.online().matchmaking = false;
    try {
      await this.joinById(matched.match_id, { mode: 'quick' }, matched.token);
    } catch (error) {
      this.online().lastError = 'join_failed';
    }
  }

  async joinById(matchId, info, matchmakerToken) {
    const online = this.online();
    await this.socket.joinMatch(
        matchmakerToken ? null : matchId,
        matchmakerToken || null,
        { displayName: online.displayName },
    );

    online.matchId = matchId;
    online.mode = info.mode || null;
    online.joinCode = info.joinCode || null;
    online.lastError = null;
    ApplicationStore.currentScreen = 'lobby';

    try {
      await ChatController.join(matchId);
    } catch (error) {
      // Chat is non-critical; the lobby works without it.
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
    online.seatToPlayerIndex = {};
    online.pendingDice = null;
    online.diceInFlight = false;
    online.enabled = false;
    ApplicationStore.winner = null;
    ApplicationStore.gamePlayStatus.isRolling = false;
    ApplicationStore.gamePlayStatus.isMoving = false;
    ApplicationStore.currentScreen = 'online-menu';
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

  requestRoll() {
    this.send(OpCode.ROLL_REQUEST, {});
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
  }

  handleStateSync(payload) {
    const online = this.online();
    this.opQueue = [];
    this.moveInFlight = false;
    online.diceInFlight = false;
    online.seats = payload.seats || [];
    online.hostUserId = payload.hostUserId || null;
    online.joinCode = payload.joinCode || online.joinCode;
    online.mySeat = this.seatOfSelf(online.seats);
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
