// Email account flows: verification + password reset. Nakama has no built-in
// email sending, so these RPCs mint one-time tokens in system-owned storage
// and deliver them through Resend's HTTP API (the goja runtime has no SMTP,
// only nk.httpRequest). Google/Apple sign-in need no code here: Nakama
// validates those tokens natively (Apple needs social.apple.bundle_id set).
//
// Callers of request_password_reset / reset_password / verify_email hold only
// a guest device session; the token names the affected user, never the caller.
//
// Tiers (CONTEXT.md): a Member has a Google or Apple login or a verified email;
// everyone else is a Guest. Registering from a Guest links the login onto the
// same Nakama user (adr/0001), so the hooks below cover both link and create.

import { grantWelcome } from './progress';

// Owner id of system-owned storage objects (writes with userId undefined).
export const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

const COLLECTION_RESET = 'auth_reset'; // key = token -> { userId, email, expiresAt }
const COLLECTION_VERIFY = 'auth_verify'; // key = token -> { userId, email, expiresAt }
const COLLECTION_PROFILE = 'auth_profile'; // key = userId -> { emailVerified }
const COLLECTION_THROTTLE = 'auth_throttle'; // key = kind:email -> { sentAt }

const RESET_TTL_MS = 60 * 60 * 1000; // 1h
const VERIFY_TTL_MS = 48 * 60 * 60 * 1000; // 48h
const THROTTLE_MS = 60 * 1000; // one email per address per minute
const MIN_PASSWORD_LENGTH = 8; // Nakama's own minimum for authenticateEmail

export interface EmailEnv {
  apiKey: string;
  from: string;
  publicUrl: string;
  devEcho: boolean;
}

export function getEmailEnv(ctx: nkruntime.Context): EmailEnv {
  const env = ctx.env || {};
  return {
    apiKey: env['RESEND_API_KEY'] || '',
    from: env['EMAIL_FROM'] || 'Burrec <noreply@example.com>',
    publicUrl: (env['PUBLIC_URL'] || 'http://localhost:3000').replace(/\/+$/, ''),
    devEcho: env['EMAIL_DEV_ECHO'] === '1',
  };
}

// Two UUIDs give 64 hex chars; nk.uuidv4 is the runtime's CSPRNG source
// (goja's Math.random is not crypto-safe).
function makeToken(nk: nkruntime.Nakama): string {
  return (nk.uuidv4() + nk.uuidv4()).split('-').join('');
}

export function writeSystemObject(nk: nkruntime.Nakama, collection: string, key: string, value: { [key: string]: any }) {
  nk.storageWrite([{ collection, key, userId: undefined, value }]);
}

export function readSystemObject(nk: nkruntime.Nakama, collection: string, key: string): { [key: string]: any } | null {
  const objects = nk.storageRead([{ collection, key, userId: SYSTEM_USER_ID }]);
  if (!objects || objects.length === 0 || !objects[0].value) {
    return null;
  }
  return objects[0].value;
}

export function deleteSystemObject(nk: nkruntime.Nakama, collection: string, key: string) {
  nk.storageDelete([{ collection, key, userId: SYSTEM_USER_ID }]);
}

// True when an email of this kind went to this address less than THROTTLE_MS
// ago. Stamps the throttle record as a side effect when allowed.
function throttled(nk: nkruntime.Nakama, kind: string, email: string): boolean {
  const key = kind + ':' + email;
  const record = readSystemObject(nk, COLLECTION_THROTTLE, key);
  if (record && typeof record.sentAt === 'number' && Date.now() - record.sentAt < THROTTLE_MS) {
    return true;
  }
  writeSystemObject(nk, COLLECTION_THROTTLE, key, { sentAt: Date.now() });
  return false;
}

function markEmailVerified(nk: nkruntime.Nakama, userId: string) {
  writeSystemObject(nk, COLLECTION_PROFILE, userId, { emailVerified: true });
}

export function isEmailVerified(nk: nkruntime.Nakama, userId: string): boolean {
  const profile = readSystemObject(nk, COLLECTION_PROFILE, userId);
  return !!(profile && profile.emailVerified);
}

// Member = Google/Apple login, or an email login whose address is verified.
export function isMember(nk: nkruntime.Nakama, userId: string): boolean {
  if (!userId) {
    return false;
  }
  let account: nkruntime.Account;
  try {
    account = nk.accountGetId(userId);
  } catch (error) {
    return false;
  }
  if (account.user.googleId || account.user.appleId) {
    return true;
  }
  return !!account.email && isEmailVerified(nk, userId);
}

function findUserIdByEmail(nk: nkruntime.Nakama, email: string): string | null {
  const rows = nk.sqlQuery('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
  if (!rows || rows.length === 0) {
    return null;
  }
  return String(rows[0].id);
}

export function sendEmail(logger: nkruntime.Logger, nk: nkruntime.Nakama, env: EmailEnv, to: string, subject: string, html: string): boolean {
  if (!env.apiKey) {
    logger.warn('auth email skipped (RESEND_API_KEY not configured): %s -> %s', subject, to);
    return false;
  }
  try {
    const response = nk.httpRequest(
      'https://api.resend.com/emails',
      'post',
      {
        'Authorization': 'Bearer ' + env.apiKey,
        'Content-Type': 'application/json',
      },
      JSON.stringify({ from: env.from, to: [to], subject, html }),
      10000,
    );
    if (response.code < 200 || response.code >= 300) {
      logger.error('resend rejected email (%d): %s', response.code, response.body);
      return false;
    }
    return true;
  } catch (error) {
    logger.error('resend request failed: %s', String(error));
    return false;
  }
}

// Bilingual (sq/en) single-button email body shared by both flows, dressed
// like the game's UI (afrons-game-ui): an orange panel with a dark-green
// border and pill title, a green chunky button, Outfit type. Email clients
// ignore inset box-shadows and most CSS, so it's tables + inline styles,
// with a thick bottom border standing in for the panel/button "lip".
const EMAIL_COLORS = {
  backdrop: '#241d18',
  base: '#263f2a',
  orange: '#fdc25b',
  orangeDark: '#ee9448',
  green: '#71bd26',
  greenDark: '#4f8a17',
};
const EMAIL_FONT = "'Outfit', 'Helvetica Neue', Arial, sans-serif";

function emailHtml(heading: string, body: string, link: string, button: string): string {
  const c = EMAIL_COLORS;
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">' +
    '</head>' +
    '<body style="margin:0;padding:0;background:' + c.backdrop + ';">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + c.backdrop + ';">' +
    '<tr><td align="center" style="padding:32px 16px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;font-family:' + EMAIL_FONT + ';">' +
    // Game title, as on the start screen.
    '<tr><td align="center" style="padding:0 0 28px;font-size:26px;line-height:1.2;font-weight:800;' +
    'letter-spacing:0.03em;text-transform:uppercase;color:' + c.orange + ';">Burrec mos u zemero</td></tr>' +
    // Panel: orange card, dark-green border, darker orange bottom lip.
    '<tr><td style="background:' + c.orange + ';border:2px solid ' + c.base + ';border-bottom:8px solid ' + c.orangeDark + ';' +
    'border-radius:12px;padding:24px;color:' + c.base + ';">' +
    // Pill title (in the game it straddles the panel edge; mail clients
    // strip the negative margin that needs, so it sits just inside).
    '<table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px;">' +
    '<tr><td style="background:' + c.orange + ';border:2px solid ' + c.base + ';border-bottom:4px solid ' + c.orangeDark + ';' +
    'border-radius:20px;padding:6px 16px;font-size:14px;line-height:1.5;font-weight:800;letter-spacing:0.03em;' +
    'text-transform:uppercase;white-space:nowrap;color:' + c.base + ';">' + heading + '</td></tr></table>' +
    '<p style="margin:0 0 22px;font-size:16px;line-height:1.55;text-align:center;color:' + c.base + ';">' + body + '</p>' +
    // Chunky green game button.
    '<table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 22px;">' +
    '<tr><td style="background:' + c.green + ';border:2px solid ' + c.base + ';border-bottom:5px solid ' + c.greenDark + ';border-radius:8px;">' +
    '<a href="' + link + '" style="display:inline-block;padding:14px 26px;font-family:' + EMAIL_FONT + ';font-size:16px;' +
    'font-weight:600;letter-spacing:0.03em;text-transform:uppercase;color:#ffffff;text-decoration:none;">' + button + '</a>' +
    '</td></tr></table>' +
    '<p style="margin:0;font-size:12px;line-height:1.5;text-align:center;color:' + c.base + ';opacity:0.8;">' +
    'Nëse butoni nuk punon, hape këtë lidhje / If the button does not work, open this link:<br>' +
    '<a href="' + link + '" style="color:' + c.base + ';word-break:break-all;">' + link + '</a></p>' +
    '</td></tr>' +
    '<tr><td align="center" style="padding:20px 0 0;font-size:12px;line-height:1.5;color:#a8998a;">' +
    'burrec.com</td></tr>' +
    '</table></td></tr></table></body></html>'
  );
}

function sendVerificationEmail(logger: nkruntime.Logger, nk: nkruntime.Nakama, env: EmailEnv, userId: string, email: string): string {
  const token = makeToken(nk);
  writeSystemObject(nk, COLLECTION_VERIFY, token, {
    userId,
    email,
    expiresAt: Date.now() + VERIFY_TTL_MS,
  });
  const link = env.publicUrl + '/#verify=' + token;
  sendEmail(
    logger, nk, env, email,
    'Vërteto email-in / Verify your email — Burrec Mos u Zemero',
    emailHtml(
      'Mirësevjen! / Welcome!',
      'Vërteto adresën tënde dhe vishi pionët me aksesorë, zgjidh goditjen kur kap dhe bisedo në lojë. / ' +
      'Verify your address to dress your pawns in Props, pick a capture Finisher and chat in games.',
      link,
      'Vërteto / Verify',
    ),
  );
  if (env.devEcho) {
    logger.info('auth dev echo: verify link for %s: %s', email, link);
  }
  return link;
}

// After a successful authenticateEmail that CREATED the account, kick off
// verification. Login of an existing account passes through untouched.
export const afterAuthenticateEmail: nkruntime.AfterHookFunction<nkruntime.Session, nkruntime.AuthenticateEmailRequest> = function (ctx, logger, nk, data, request) {
  if (!data.created) {
    return;
  }
  const email = String((request.account && request.account.email) || '').trim().toLowerCase();
  if (!email) {
    return;
  }
  const userId = ctx.userId || findUserIdByEmail(nk, email);
  if (!userId) {
    logger.warn('afterAuthenticateEmail: no userId resolvable for %s', email);
    return;
  }
  writeSystemObject(nk, COLLECTION_PROFILE, userId, { emailVerified: false });
  sendVerificationEmail(logger, nk, getEmailEnv(ctx), userId, email);
};

// A Guest registering with email links it onto their device user; same
// verification kick-off as a fresh email sign-up.
export const afterLinkEmail: nkruntime.AfterHookFunction<void, nkruntime.AccountEmail> = function (ctx, logger, nk, data, request) {
  const email = String((request && request.email) || '').trim().toLowerCase();
  if (!ctx.userId || !email) {
    return;
  }
  writeSystemObject(nk, COLLECTION_PROFILE, ctx.userId, { emailVerified: false });
  sendVerificationEmail(logger, nk, getEmailEnv(ctx), ctx.userId, email);
};

// Payload: {} — reports the calling user's login + tier so the client can
// render the account section and gate Guest-only UI without extra endpoints.
export const rpcAuthStatus: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const account = nk.accountGetId(ctx.userId);
  const email = account.email || null;
  return JSON.stringify({
    email,
    emailVerified: email ? isEmailVerified(nk, ctx.userId) : false,
    google: !!account.user.googleId,
    apple: !!account.user.appleId,
    member: isMember(nk, ctx.userId),
  });
};

// Payload: { confirm: true }. App Store 5.1.1(v): anyone who can create an
// account must be able to delete it in-app. Only accounts with a login can
// call it — a bare device Guest has nothing to delete.
export const rpcDeleteAccount: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  let request: { confirm?: boolean } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }
  if (request.confirm !== true) {
    return JSON.stringify({ error: 'generic' });
  }
  const account = nk.accountGetId(ctx.userId);
  if (!account.email && !account.user.googleId && !account.user.appleId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  try {
    deleteSystemObject(nk, COLLECTION_PROFILE, ctx.userId);
    nk.accountDeleteId(ctx.userId, false);
  } catch (error) {
    logger.error('delete_account failed for %s: %s', ctx.userId, String(error));
    return JSON.stringify({ error: 'generic' });
  }
  return JSON.stringify({ ok: true });
};

// Payload: { email }. Always answers ok so the endpoint cannot be used to
// probe which addresses have accounts.
export const rpcRequestPasswordReset: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let request: { email?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ ok: true });
  }
  const email = String(request.email || '').trim().toLowerCase();
  if (!email || email.indexOf('@') === -1) {
    return JSON.stringify({ ok: true });
  }
  if (throttled(nk, 'reset', email)) {
    return JSON.stringify({ ok: true });
  }

  const userId = findUserIdByEmail(nk, email);
  if (!userId) {
    return JSON.stringify({ ok: true });
  }

  const env = getEmailEnv(ctx);
  const token = makeToken(nk);
  writeSystemObject(nk, COLLECTION_RESET, token, {
    userId,
    email,
    expiresAt: Date.now() + RESET_TTL_MS,
  });
  const link = env.publicUrl + '/#reset=' + token;
  sendEmail(
    logger, nk, env, email,
    'Rivendos fjalëkalimin / Reset your password — Burrec Mos u Zemero',
    emailHtml(
      'Rivendos fjalëkalimin',
      'Dikush kërkoi rivendosjen e fjalëkalimit për këtë adresë. Nëse nuk ishe ti, injoroje këtë email. / ' +
      'Someone requested a password reset for this address. If it was not you, ignore this email.',
      link,
      'Rivendos / Reset',
    ),
  );
  if (env.devEcho) {
    logger.info('auth dev echo: reset link for %s: %s', email, link);
    return JSON.stringify({ ok: true, devLink: link });
  }
  return JSON.stringify({ ok: true });
};

// Payload: { token, password }. Consumes the token and sets the new password
// via linkEmail (which updates the stored hash for the already-linked email).
export const rpcResetPassword: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let request: { token?: string; password?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }
  const token = String(request.token || '').trim();
  const password = String(request.password || '');
  if (!token) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return JSON.stringify({ error: 'auth_weak_password' });
  }

  const record = readSystemObject(nk, COLLECTION_RESET, token);
  if (!record) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }
  if (typeof record.expiresAt !== 'number' || Date.now() > record.expiresAt) {
    deleteSystemObject(nk, COLLECTION_RESET, token);
    return JSON.stringify({ error: 'auth_expired_token' });
  }

  try {
    nk.linkEmail(String(record.userId), String(record.email), password);
  } catch (error) {
    logger.error('reset_password linkEmail failed for %s: %s', String(record.userId), String(error));
    return JSON.stringify({ error: 'generic' });
  }

  deleteSystemObject(nk, COLLECTION_RESET, token);
  // Completing a reset proves mailbox ownership as strongly as verification.
  markEmailVerified(nk, String(record.userId));
  try {
    grantWelcome(nk, String(record.userId));
  } catch (error) {
    logger.error('welcome bonus failed for %s: %s', String(record.userId), String(error));
  }
  return JSON.stringify({ ok: true, email: record.email });
};

// Payload: { token }.
export const rpcVerifyEmail: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let request: { token?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }
  const token = String(request.token || '').trim();
  if (!token) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }

  const record = readSystemObject(nk, COLLECTION_VERIFY, token);
  if (!record) {
    return JSON.stringify({ error: 'auth_invalid_token' });
  }
  if (typeof record.expiresAt !== 'number' || Date.now() > record.expiresAt) {
    deleteSystemObject(nk, COLLECTION_VERIFY, token);
    return JSON.stringify({ error: 'auth_expired_token' });
  }

  deleteSystemObject(nk, COLLECTION_VERIFY, token);
  markEmailVerified(nk, String(record.userId));
  try {
    grantWelcome(nk, String(record.userId));
  } catch (error) {
    logger.error('welcome bonus failed for %s: %s', String(record.userId), String(error));
  }
  return JSON.stringify({ ok: true, email: record.email });
};

// Payload: {} — re-send the verification email for the calling account.
export const rpcResendVerification: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const account = nk.accountGetId(ctx.userId);
  const email = String(account.email || '').trim().toLowerCase();
  if (!email) {
    return JSON.stringify({ error: 'auth_no_email' });
  }
  if (isEmailVerified(nk, ctx.userId)) {
    return JSON.stringify({ ok: true, alreadyVerified: true });
  }
  if (throttled(nk, 'verify', email)) {
    return JSON.stringify({ ok: true });
  }

  const env = getEmailEnv(ctx);
  const link = sendVerificationEmail(logger, nk, env, ctx.userId, email);
  if (env.devEcho) {
    return JSON.stringify({ ok: true, devLink: link });
  }
  return JSON.stringify({ ok: true });
};
