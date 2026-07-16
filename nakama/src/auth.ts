// Email account flows: verification + password reset. Nakama has no built-in
// email sending, so these RPCs mint one-time tokens in system-owned storage
// and deliver them through Resend's HTTP API (the goja runtime has no SMTP,
// only nk.httpRequest). Google/Apple sign-in need no code here: Nakama
// validates those tokens natively (Apple needs social.apple.bundle_id set).
//
// Callers of request_password_reset / reset_password / verify_email hold only
// a guest device session; the token names the affected user, never the caller.

// Owner id of system-owned storage objects (writes with userId undefined).
const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

const COLLECTION_RESET = 'auth_reset'; // key = token -> { userId, email, expiresAt }
const COLLECTION_VERIFY = 'auth_verify'; // key = token -> { userId, email, expiresAt }
const COLLECTION_PROFILE = 'auth_profile'; // key = userId -> { emailVerified }
const COLLECTION_THROTTLE = 'auth_throttle'; // key = kind:email -> { sentAt }

const RESET_TTL_MS = 60 * 60 * 1000; // 1h
const VERIFY_TTL_MS = 48 * 60 * 60 * 1000; // 48h
const THROTTLE_MS = 60 * 1000; // one email per address per minute
const MIN_PASSWORD_LENGTH = 8; // Nakama's own minimum for authenticateEmail

interface EmailEnv {
  apiKey: string;
  from: string;
  publicUrl: string;
  devEcho: boolean;
}

function getEmailEnv(ctx: nkruntime.Context): EmailEnv {
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

function writeSystemObject(nk: nkruntime.Nakama, collection: string, key: string, value: { [key: string]: any }) {
  nk.storageWrite([{ collection, key, userId: undefined, value }]);
}

function readSystemObject(nk: nkruntime.Nakama, collection: string, key: string): { [key: string]: any } | null {
  const objects = nk.storageRead([{ collection, key, userId: SYSTEM_USER_ID }]);
  if (!objects || objects.length === 0 || !objects[0].value) {
    return null;
  }
  return objects[0].value;
}

function deleteSystemObject(nk: nkruntime.Nakama, collection: string, key: string) {
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

function isEmailVerified(nk: nkruntime.Nakama, userId: string): boolean {
  const profile = readSystemObject(nk, COLLECTION_PROFILE, userId);
  return !!(profile && profile.emailVerified);
}

function findUserIdByEmail(nk: nkruntime.Nakama, email: string): string | null {
  const rows = nk.sqlQuery('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
  if (!rows || rows.length === 0) {
    return null;
  }
  return String(rows[0].id);
}

function sendEmail(logger: nkruntime.Logger, nk: nkruntime.Nakama, env: EmailEnv, to: string, subject: string, html: string): boolean {
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

// Bilingual (sq/en) single-button email body shared by both flows.
function emailHtml(heading: string, body: string, link: string, button: string): string {
  return (
    '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">' +
    '<h2 style="margin:0 0 12px;">' + heading + '</h2>' +
    '<p style="margin:0 0 20px;line-height:1.5;">' + body + '</p>' +
    '<p style="margin:0 0 20px;"><a href="' + link + '" ' +
    'style="background:#e76f51;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">' +
    button + '</a></p>' +
    '<p style="font-size:12px;color:#888;line-height:1.5;">' +
    'Nëse butoni nuk punon, hape këtë lidhje / If the button does not work, open this link:<br>' +
    '<a href="' + link + '">' + link + '</a></p>' +
    '</div>'
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
      'Mirësevjen në Burrec!',
      'Kliko butonin për të vërtetuar adresën tënde. / Click the button to verify your email address.',
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

// Payload: {} — reports the calling user's email + verification state so the
// client can render the account section without extra endpoints.
export const rpcAuthStatus: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const account = nk.accountGetId(ctx.userId);
  const email = account.email || null;
  return JSON.stringify({
    email,
    emailVerified: email ? isEmailVerified(nk, ctx.userId) : false,
  });
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
