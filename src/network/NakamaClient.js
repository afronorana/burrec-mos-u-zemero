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
  authMethod: 'burrec.online.authMethod', // 'guest' | 'email' | 'google' | 'apple'
};

// nakama-js throws the raw fetch Response on non-2xx; reduce it to one of the
// errors.* i18n keys so the UI can show a translated message.
function mapAuthError(error) {
  const status = error && typeof error.status === 'number' ? error.status : 0;
  if (status === 401 || status === 404) {
    return new Error('auth_invalid_credentials');
  }
  if (status === 400) {
    return new Error('auth_invalid_input');
  }
  if (status === 409) {
    return new Error('auth_email_taken');
  }
  return new Error('connect_failed');
}

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

  getAuthMethod() {
    return identityStorage.getItem(STORAGE_KEYS.authMethod) || 'guest';
  }

  // Restore the stored session, refreshing it when it's about to expire.
  // Returns null when there is nothing restorable.
  async restoreSession() {
    const token = identityStorage.getItem(STORAGE_KEYS.token);
    const refreshToken = identityStorage.getItem(STORAGE_KEYS.refreshToken);
    if (!token || !refreshToken) {
      return null;
    }
    let session = Session.restore(token, refreshToken);
    const soon = (Date.now() / 1000) + 60;
    if (session.isexpired(soon)) {
      try {
        session = await this.getClient().sessionRefresh(session);
      } catch (error) {
        return null;
      }
    }
    return session;
  }

  async login(displayName) {
    const online = ApplicationStore.online;
    online.connectionState = 'connecting';

    let session = await this.restoreSession();

    if (!session) {
      if (this.getAuthMethod() !== 'guest') {
        // An email/Google/Apple session that can't be refreshed must not
        // silently degrade into a fresh guest account — ask to sign in again.
        online.connectionState = 'idle';
        throw new Error('auth_session_expired');
      }
      session = await this.getClient().authenticateDevice(this.getDeviceId(), true);
    }

    await this.adoptSession(session, this.getAuthMethod(), displayName);
    return session;
  }

  async loginEmail(email, password, { create = false } = {}) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    let session;
    try {
      session = await this.getClient().authenticateEmail(cleanEmail, password, create);
    } catch (error) {
      throw mapAuthError(error);
    }
    await this.adoptSession(session, 'email', ApplicationStore.online.displayName);
    return session;
  }

  async loginGoogle(idToken) {
    let session;
    try {
      session = await this.getClient().authenticateGoogle(idToken, true);
    } catch (error) {
      throw mapAuthError(error);
    }
    await this.adoptSession(session, 'google', ApplicationStore.online.displayName);
    return session;
  }

  async loginApple(idToken) {
    let session;
    try {
      session = await this.getClient().authenticateApple(idToken, true);
    } catch (error) {
      throw mapAuthError(error);
    }
    await this.adoptSession(session, 'apple', ApplicationStore.online.displayName);
    return session;
  }

  // Make a freshly authenticated/restored session the active identity:
  // persist it, sync the display name, and refresh the account panel state.
  async adoptSession(session, method, displayName) {
    const online = ApplicationStore.online;
    const switching = this.session && this.session.user_id !== session.user_id;
    if (switching) {
      this.disconnectSocket();
    }

    // Always sync: online.displayName is set by the login screen before this
    // runs, so comparing against it would skip the account update forever and
    // seat claims would fall back to the random device username.
    const name = String(displayName || '').trim().slice(0, 12);
    if (name) {
      try {
        await this.getClient().updateAccount(session, { display_name: name });
      } catch (error) {
        // Non-fatal: the server falls back to the account username.
      }
    }

    identityStorage.setItem(STORAGE_KEYS.token, session.token);
    identityStorage.setItem(STORAGE_KEYS.refreshToken, session.refresh_token);
    identityStorage.setItem(STORAGE_KEYS.authMethod, method);

    this.session = session;
    online.selfUserId = session.user_id;
    if (name) {
      online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
    }

    await this.refreshAccountStatus(method);
    return session;
  }

  // Fill store.online.account so the menu can show who is signed in. Guests
  // skip the RPC — they have no email to report.
  async refreshAccountStatus(method) {
    const account = ApplicationStore.online.account;
    account.method = method;
    if (method === 'guest') {
      account.email = null;
      account.emailVerified = false;
      return;
    }
    try {
      const status = await this.rpc('auth_status');
      account.email = status.email || null;
      account.emailVerified = !!status.emailVerified;
    } catch (error) {
      // Non-fatal: the account chip just stays generic.
      account.email = null;
      account.emailVerified = false;
    }
  }

  // Drop the current identity (tokens + method), keeping the device id and
  // display name. Callers also clear the active-match record (matchSession)
  // so the next guest session can't try to resume another account's game.
  logout() {
    identityStorage.removeItem(STORAGE_KEYS.token);
    identityStorage.removeItem(STORAGE_KEYS.refreshToken);
    identityStorage.removeItem(STORAGE_KEYS.authMethod);
    this.disconnectSocket();
    this.session = null;

    const online = ApplicationStore.online;
    online.selfUserId = null;
    online.connectionState = 'idle';
    online.account = { method: 'guest', email: null, emailVerified: false };
  }

  // Token RPCs (verify_email / reset_password / request_password_reset) need
  // *a* session but act on the token's user, not the caller. Reuse whatever
  // session exists; otherwise take a device session WITHOUT adopting it as
  // the player's identity (no tokens persisted, authMethod untouched) — an
  // expired email sign-in must still be able to complete a password reset.
  async ensureAnySession() {
    if (this.session) {
      return this.session;
    }
    const restored = await this.restoreSession();
    if (restored) {
      this.session = restored;
      // A restored account session can also fill in the menu's account chip
      // (email + verified flag) that a plain reload leaves empty.
      const method = this.getAuthMethod();
      if (method !== 'guest' && !ApplicationStore.online.account.email) {
        await this.refreshAccountStatus(method);
      }
      return this.session;
    }
    this.session = await this.getClient().authenticateDevice(this.getDeviceId(), true);
    return this.session;
  }

  disconnectSocket() {
    if (this.socket && this.socketConnected) {
      try {
        // false = don't fire ondisconnect: this is a deliberate identity
        // change, not a dropped connection to recover from.
        this.socket.disconnect(false);
      } catch (error) {
        // Already gone.
      }
    }
    this.socket = null;
    this.socketConnected = false;
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

const service = new NakamaClientService();

// Seed the menu's account chip before any connection happens, and for
// signed-in accounts eagerly restore the session so the chip shows the real
// email instead of the generic method label.
ApplicationStore.online.account.method = service.getAuthMethod();
if (service.getAuthMethod() !== 'guest') {
  service.ensureAnySession().catch(() => {
    // Expired/offline: login() will surface auth_session_expired when the
    // player actually tries to play.
  });
}

export default service;
