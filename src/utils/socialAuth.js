// Google Identity Services + Sign in with Apple (JS) for the web client.
// Both hand back an ID token that NakamaClient.loginSocial links onto the
// Guest (adr/0001) or signs in with. Buttons are config-gated: they only
// show when the client id is baked into the build.

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || '';

export const googleEnabled = !!GOOGLE_CLIENT_ID;
export const appleEnabled = !!APPLE_CLIENT_ID;

const loadedScripts = {};
function loadScript(src) {
  if (!loadedScripts[src]) {
    loadedScripts[src] = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = resolve;
      el.onerror = () => reject(new Error('connect_failed'));
      document.head.appendChild(el);
    });
  }
  return loadedScripts[src];
}

// Our own (white, translated) Continue with Google button: Google's OpenID
// implicit flow in a popup returns an ID token — the only Google token
// Nakama 3.21 accepts — to public/google-callback.html, which hands it back
// through localStorage. Needs that page as an Authorized redirect URI on the
// OAuth client. popup.closed is not watched: Google's opener policy can make
// it read true while the popup is still open, so a stuck attempt just times
// out and the next click starts over.
const GOOGLE_RESULT_KEY = 'burrec.googleAuth';
const GOOGLE_TIMEOUT_MS = 5 * 60 * 1000;
let pendingGoogle = null;

function randomToken() {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function parseJwtPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  } catch (error) {
    return {};
  }
}

// Must be called straight from the click handler (popup blockers).
export function googleIdToken(locale = 'en') {
  if (pendingGoogle) {
    pendingGoogle.cancel();
  }
  const state = randomToken();
  const nonce = randomToken();
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/google-callback.html`,
    response_type: 'id_token',
    scope: 'openid email profile',
    nonce,
    state,
    prompt: 'select_account',
    hl: locale,
  });
  try {
    window.localStorage.removeItem(GOOGLE_RESULT_KEY);
  } catch (error) {
    // Storage blocked: the result can't come back; the timeout reports it.
  }
  window.open(`https://accounts.google.com/o/oauth2/v2/auth?${params}`, 'burrec-google', 'width=480,height=640');

  return new Promise((resolve, reject) => {
    const finish = (error, token) => {
      window.removeEventListener('storage', onStorage);
      clearTimeout(timer);
      pendingGoogle = null;
      if (error) reject(error);
      else resolve(token);
    };
    const onStorage = (event) => {
      if (event.key !== GOOGLE_RESULT_KEY || !event.newValue) return;
      let hash = '';
      try {
        hash = JSON.parse(event.newValue).hash || '';
      } catch (error) {
        return;
      }
      window.localStorage.removeItem(GOOGLE_RESULT_KEY);
      const result = new URLSearchParams(hash.replace(/^#/, ''));
      const idToken = result.get('id_token');
      if (result.get('state') !== state || !idToken || parseJwtPayload(idToken).nonce !== nonce) {
        finish(new Error(result.get('error') === 'access_denied' ? 'auth_cancelled' : 'connect_failed'));
        return;
      }
      finish(null, idToken);
    };
    const timer = setTimeout(() => finish(new Error('auth_cancelled')), GOOGLE_TIMEOUT_MS);
    window.addEventListener('storage', onStorage);
    pendingGoogle = { cancel: () => finish(new Error('auth_cancelled')) };
  });
}

// Opens Apple's popup; resolves the ID token.
export async function appleIdToken() {
  await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');
  window.AppleID.auth.init({
    clientId: APPLE_CLIENT_ID,
    scope: 'email',
    redirectURI: window.location.origin + window.location.pathname,
    usePopup: true,
  });
  const response = await window.AppleID.auth.signIn();
  const idToken = response && response.authorization && response.authorization.id_token;
  if (!idToken) {
    throw new Error('connect_failed');
  }
  return idToken;
}
