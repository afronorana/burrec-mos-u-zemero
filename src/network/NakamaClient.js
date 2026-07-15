import { Client, Session } from '@heroiclabs/nakama-js';
import ApplicationStore from '../utils/ApplicationStore';

const HOST = import.meta.env.VITE_NAKAMA_HOST || '127.0.0.1';
const PORT = String(import.meta.env.VITE_NAKAMA_PORT || '7350');
const USE_SSL = String(import.meta.env.VITE_NAKAMA_SSL) === 'true';
const SERVER_KEY = import.meta.env.VITE_NAKAMA_KEY || 'burrec-dev-key';

// Per-tab identity in dev (sessionStorage) so two tabs can play against each
// other; stable per-browser identity in production (localStorage). Exported so
// the resume machinery (matchSession.js) parks the active-match handle in the
// SAME bucket as the identity that can rejoin it.
export const identityStorage = import.meta.env.DEV ? window.sessionStorage : window.localStorage;

const STORAGE_KEYS = {
  deviceId: 'burrec.online.deviceId',
  token: 'burrec.online.token',
  refreshToken: 'burrec.online.refreshToken',
};

class NakamaClientService {
  constructor() {
    this.client = null;
    this.session = null;
    this.socket = null;
    this.socketConnected = false;
    // Assigned by MatchController; called when the socket drops unexpectedly.
    this.onDisconnect = null;
  }

  getClient() {
    if (!this.client) {
      this.client = new Client(SERVER_KEY, HOST, PORT, USE_SSL);
    }
    return this.client;
  }

  getDeviceId() {
    let deviceId = identityStorage.getItem(STORAGE_KEYS.deviceId);
    if (!deviceId) {
      deviceId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `burrec-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
      identityStorage.setItem(STORAGE_KEYS.deviceId, deviceId);
    }
    return deviceId;
  }

  async login(displayName) {
    const online = ApplicationStore.online;
    const client = this.getClient();
    online.connectionState = 'connecting';

    let session = null;
    const token = identityStorage.getItem(STORAGE_KEYS.token);
    const refreshToken = identityStorage.getItem(STORAGE_KEYS.refreshToken);

    if (token && refreshToken) {
      session = Session.restore(token, refreshToken);
      const soon = (Date.now() / 1000) + 60;
      if (session.isexpired(soon)) {
        try {
          session = await client.sessionRefresh(session);
        } catch (error) {
          session = null;
        }
      }
    }

    if (!session) {
      session = await client.authenticateDevice(this.getDeviceId(), true);
    }

    // Always sync: online.displayName is set by the login screen before this
    // runs, so comparing against it would skip the account update forever and
    // seat claims would fall back to the random device username.
    const name = String(displayName || '').trim().slice(0, 12);
    if (name) {
      try {
        await client.updateAccount(session, { display_name: name });
      } catch (error) {
        // Non-fatal: the server falls back to the account username.
      }
    }

    identityStorage.setItem(STORAGE_KEYS.token, session.token);
    identityStorage.setItem(STORAGE_KEYS.refreshToken, session.refresh_token);

    this.session = session;
    online.selfUserId = session.user_id;
    if (name) {
      online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
    }

    return session;
  }

  async connectSocket() {
    if (this.socket && this.socketConnected) {
      return this.socket;
    }

    const socket = this.getClient().createSocket(USE_SSL);
    socket.ondisconnect = () => {
      this.socketConnected = false;
      if (ApplicationStore.online.connectionState === 'connected') {
        ApplicationStore.online.connectionState = 'disconnected';
      }
      if (this.onDisconnect) {
        this.onDisconnect();
      }
    };

    await socket.connect(this.session, true);
    this.socket = socket;
    this.socketConnected = true;
    ApplicationStore.online.connectionState = 'connected';
    return socket;
  }

  async rpc(id, input) {
    const response = await this.getClient().rpc(this.session, id, input || {});
    let payload = response ? response.payload : null;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (error) {
        payload = {};
      }
    }
    return payload || {};
  }
}

export default new NakamaClientService();
