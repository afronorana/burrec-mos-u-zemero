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

// Google only allows its own rendered button (no custom styling). The
// credential callback is global to the page, so the latest mounted button's
// handler wins — every caller does the same thing with it.
export async function mountGoogleButton(el, onCredential, width = 280, locale = 'en') {
  if (!googleEnabled || !el) return;
  await loadScript('https://accounts.google.com/gsi/client');
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
  });
  window.google.accounts.id.renderButton(el, {
    theme: 'outline',
    size: 'large',
    width,
    text: 'continue_with',
    locale,
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
