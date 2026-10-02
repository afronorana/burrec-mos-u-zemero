// Moderation (terms in CONTEXT.md): players Block and Report; Admins review
// Reports and apply Shadowbans and Bans. Admins are Members whose user id is
// listed in the ADMIN_USER_IDS runtime env (comma-separated).
//
// Storage, all system-owned unless noted:
//   user_meta/<userId>    { shadowbanned, lastSeenAt, gamesPlayed, history[] }
//   reports/<reportId>    one Report (evidence copied at report time)
//   report_pairs/<reporter>:<target>  -> open reportId (one open per pair)
//   report_throttle/<reporter>        { times[] } (rate limit)
//   moderation/digest     { lastSentAt }
//   blocks/list           USER-owned { ids[] }, read/written only via RPC
//
// Volumes are small (a hobby game), so listing scans whole collections.

import { REPORT_REASONS } from '../../shared/protocol.js';
import {
  SYSTEM_USER_ID,
  deleteSystemObject,
  getEmailEnv,
  isEmailVerified,
  isMember,
  readSystemObject,
  sendEmail,
  writeSystemObject,
} from './auth';
import { readStats } from './stats';

const COLLECTION_META = 'user_meta';
const COLLECTION_REPORTS = 'reports';
const COLLECTION_PAIRS = 'report_pairs';
const COLLECTION_REPORT_THROTTLE = 'report_throttle';
const COLLECTION_MODERATION = 'moderation';
const COLLECTION_BLOCKS = 'blocks';

const MAX_HISTORY = 50;
const MAX_BLOCKS = 500;
const MAX_NOTE = 500;
const REPORTS_PER_HOUR = 10;
const USERS_PAGE = 50;

// The leaderboard is never written to: its daily reset schedule is the only
// clock goja offers (no timers), and the reset hook sends the Report digest.
export const DIGEST_CLOCK_ID = 'report_digest_clock';
export const DIGEST_SCHEDULE = '0 8 * * *'; // daily, 08:00 UTC

interface HistoryEntry {
  at: number;
  adminId: string;
  adminName: string;
  action: string;
  note: string;
}

interface UserMeta {
  shadowbanned: boolean;
  lastSeenAt: number;
  gamesPlayed: number;
  history: HistoryEntry[];
}

interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetName: string;
  kind: 'chat' | 'name';
  evidence: string;
  verified: boolean;
  reason: string;
  note: string;
  matchId: string;
  status: 'open' | 'resolved' | 'dismissed';
  createdAt: number;
  resolvedAt: number;
  resolvedBy: string;
  resolvedByName: string;
  resolutionNote: string;
  digested: boolean;
}

function parse(payload: string): { [key: string]: any } {
  try {
    return payload ? JSON.parse(payload) : {};
  } catch (error) {
    return {};
  }
}

function clip(value: any, max: number): string {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function displayNameOf(nk: nkruntime.Nakama, userId: string): string {
  try {
    const account = nk.accountGetId(userId);
    return account.user.displayName || account.user.username || userId;
  } catch (error) {
    return userId;
  }
}

// ── user meta ─────────────────────────────────────────────────────────

function readMeta(nk: nkruntime.Nakama, userId: string): UserMeta {
  const value = readSystemObject(nk, COLLECTION_META, userId) || {};
  return {
    shadowbanned: !!value.shadowbanned,
    lastSeenAt: value.lastSeenAt || 0,
    gamesPlayed: value.gamesPlayed || 0,
    history: value.history || [],
  };
}

function writeMeta(nk: nkruntime.Nakama, userId: string, meta: UserMeta) {
  writeSystemObject(nk, COLLECTION_META, userId, meta as any);
}

function readMetas(nk: nkruntime.Nakama, userIds: string[]): { [userId: string]: UserMeta } {
  const result: { [userId: string]: UserMeta } = {};
  if (!userIds.length) {
    return result;
  }
  const objects = nk.storageRead(userIds.map((id) => ({ collection: COLLECTION_META, key: id, userId: SYSTEM_USER_ID })));
  (objects || []).forEach((object) => {
    const value = object.value || {};
    result[object.key] = {
      shadowbanned: !!value.shadowbanned,
      lastSeenAt: value.lastSeenAt || 0,
      gamesPlayed: value.gamesPlayed || 0,
      history: value.history || [],
    };
  });
  return result;
}

// Best-effort bookkeeping from the match handler; never breaks a match.
export function touchLastSeen(nk: nkruntime.Nakama, userId: string) {
  try {
    const meta = readMeta(nk, userId);
    meta.lastSeenAt = Date.now();
    writeMeta(nk, userId, meta);
  } catch (error) {
    // Best-effort only.
  }
}

export function recordGamesPlayed(nk: nkruntime.Nakama, userIds: string[]) {
  userIds.forEach((userId) => {
    try {
      const meta = readMeta(nk, userId);
      meta.gamesPlayed += 1;
      writeMeta(nk, userId, meta);
    } catch (error) {
      // Best-effort only.
    }
  });
}

export function isShadowbanned(nk: nkruntime.Nakama, userId: string): boolean {
  return readMeta(nk, userId).shadowbanned;
}

// ── chat gate ─────────────────────────────────────────────────────────

// Guests can't chat. A Shadowbanned sender's message is refused too, but
// their client echoes every own message locally (ChatController) and ignores
// send errors, so to them it looks sent while nobody else receives it.
// Throwing (not returning null) matters: a null result makes Nakama close the
// sender's socket, which would also drop them out of their match.
export const beforeChannelMessageSend: nkruntime.RtBeforeHookFunction<nkruntime.EnvelopeChannelMessageSend> = function (ctx, logger, nk, envelope) {
  const userId = ctx.userId || '';
  if (!isMember(nk, userId) || isShadowbanned(nk, userId)) {
    throw new Error('chat_unavailable');
  }
  return envelope;
};

// ── Blocks ────────────────────────────────────────────────────────────

function readBlocks(nk: nkruntime.Nakama, userId: string): string[] {
  const objects = nk.storageRead([{ collection: COLLECTION_BLOCKS, key: 'list', userId }]);
  const value = objects && objects[0] ? objects[0].value : null;
  return value && value.ids ? value.ids : [];
}

function writeBlocks(nk: nkruntime.Nakama, userId: string, ids: string[]) {
  nk.storageWrite([{
    collection: COLLECTION_BLOCKS,
    key: 'list',
    userId,
    value: { ids },
    permissionRead: 1,
    permissionWrite: 0,
  }]);
}

function addBlock(nk: nkruntime.Nakama, userId: string, targetId: string) {
  const ids = readBlocks(nk, userId);
  if (ids.indexOf(targetId) === -1) {
    ids.push(targetId);
    writeBlocks(nk, userId, ids.slice(-MAX_BLOCKS));
  }
}

// Payload: {} -> { ids }
export const rpcBlockList: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  return JSON.stringify({ ids: readBlocks(nk, ctx.userId) });
};

// Payload: { userId, blocked } -> { ids }
export const rpcSetBlock: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const request = parse(payload);
  const targetId = clip(request.userId, 64);
  if (!targetId || targetId === ctx.userId) {
    return JSON.stringify({ error: 'generic' });
  }
  if (request.blocked === false) {
    writeBlocks(nk, ctx.userId, readBlocks(nk, ctx.userId).filter((id) => id !== targetId));
  } else {
    addBlock(nk, ctx.userId, targetId);
  }
  return JSON.stringify({ ids: readBlocks(nk, ctx.userId) });
};

// ── Reports ───────────────────────────────────────────────────────────

// The chat channel is persistent so the server can copy the reported
// message itself instead of trusting the reporter's text.
function findChatMessage(nk: nkruntime.Nakama, matchId: string, messageId: string, senderId: string): string | null {
  if (!matchId || !messageId) {
    return null;
  }
  try {
    const channelId = nk.channelIdBuild(undefined, 'ludo-' + matchId, nkruntime.ChanType.Room);
    let cursor: string | undefined;
    for (let page = 0; page < 5; page += 1) {
      const list = nk.channelMessagesList(channelId, 100, false, cursor);
      const messages = list.messages || [];
      for (let i = 0; i < messages.length; i += 1) {
        const message = messages[i];
        if (message.messageId === messageId && message.senderId === senderId) {
          const content = parse(message.content || '');
          return clip(content.message, 500);
        }
      }
      if (!list.nextCursor) {
        break;
      }
      cursor = list.nextCursor;
    }
  } catch (error) {
    // Fall through: unverifiable.
  }
  return null;
}

function reportThrottled(nk: nkruntime.Nakama, reporterId: string): boolean {
  const now = Date.now();
  const record = readSystemObject(nk, COLLECTION_REPORT_THROTTLE, reporterId) || {};
  const times: number[] = (record.times || []).filter((at: number) => now - at < 60 * 60 * 1000);
  if (times.length >= REPORTS_PER_HOUR) {
    return true;
  }
  times.push(now);
  writeSystemObject(nk, COLLECTION_REPORT_THROTTLE, reporterId, { times });
  return false;
}

// Payload: { userId, kind: 'chat'|'name', reason, note?, matchId?, messageId? }
// Guests may report too. Filing a Report also Blocks the target.
export const rpcReportPlayer: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  const reporterId = ctx.userId;
  if (!reporterId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const request = parse(payload);
  const targetId = clip(request.userId, 64);
  const kind = request.kind === 'chat' ? 'chat' : 'name';
  const reason = REPORT_REASONS.indexOf(request.reason) !== -1 ? request.reason : '';
  if (!targetId || targetId === reporterId || !reason) {
    return JSON.stringify({ error: 'generic' });
  }

  let targetName = '';
  try {
    const target = nk.accountGetId(targetId);
    targetName = target.user.displayName || target.user.username || '';
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }

  addBlock(nk, reporterId, targetId);

  const pairKey = reporterId + ':' + targetId;
  if (readSystemObject(nk, COLLECTION_PAIRS, pairKey)) {
    return JSON.stringify({ ok: true, duplicate: true });
  }
  if (reportThrottled(nk, reporterId)) {
    return JSON.stringify({ error: 'report_throttled' });
  }

  const matchId = clip(request.matchId, 128);
  let evidence = targetName;
  let verified = true;
  if (kind === 'chat') {
    const found = findChatMessage(nk, matchId, clip(request.messageId, 128), targetId);
    verified = found !== null;
    evidence = found !== null ? found : clip(request.messageText, 500);
  }

  const report: Report = {
    id: nk.uuidv4(),
    reporterId,
    reporterName: displayNameOf(nk, reporterId),
    targetId,
    targetName,
    kind,
    evidence,
    verified,
    reason,
    note: clip(request.note, MAX_NOTE),
    matchId,
    status: 'open',
    createdAt: Date.now(),
    resolvedAt: 0,
    resolvedBy: '',
    resolvedByName: '',
    resolutionNote: '',
    digested: false,
  };
  writeSystemObject(nk, COLLECTION_REPORTS, report.id, report as any);
  writeSystemObject(nk, COLLECTION_PAIRS, pairKey, { reportId: report.id });
  return JSON.stringify({ ok: true });
};

function listReports(nk: nkruntime.Nakama): Report[] {
  const reports: Report[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 50; page += 1) {
    const list = nk.storageList(SYSTEM_USER_ID, COLLECTION_REPORTS, 100, cursor);
    (list.objects || []).forEach((object) => reports.push(object.value as Report));
    if (!list.cursor) {
      break;
    }
    cursor = list.cursor;
  }
  return reports.sort((a, b) => b.createdAt - a.createdAt);
}

// ── Admin ─────────────────────────────────────────────────────────────

function adminIds(ctx: nkruntime.Context): string[] {
  const raw = (ctx.env && ctx.env['ADMIN_USER_IDS']) || '';
  return raw.split(',').map((id) => id.trim()).filter((id) => !!id);
}

function isAdmin(ctx: nkruntime.Context, nk: nkruntime.Nakama): boolean {
  return !!ctx.userId && adminIds(ctx).indexOf(ctx.userId) !== -1 && isMember(nk, ctx.userId);
}

function forbidden(ctx: nkruntime.Context): string {
  // The caller's id is echoed so the operator can copy it into ADMIN_USER_IDS.
  return JSON.stringify({ error: 'forbidden', userId: ctx.userId || null });
}

function addHistory(nk: nkruntime.Nakama, ctx: nkruntime.Context, userId: string, action: string, note: string) {
  const meta = readMeta(nk, userId);
  meta.history.unshift({
    at: Date.now(),
    adminId: ctx.userId || '',
    adminName: displayNameOf(nk, ctx.userId || ''),
    action,
    note: clip(note, MAX_NOTE),
  });
  meta.history = meta.history.slice(0, MAX_HISTORY);
  return meta;
}

// Payload: {} -> stats + open Report count. Replaces the old key-gated
// admin_stats.
export const rpcAdminOverview: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const stats = readStats(nk);
  const openReports = listReports(nk).filter((report) => report.status === 'open').length;
  return JSON.stringify({
    totalStarted: stats.totalStarted,
    totalFinished: stats.totalFinished,
    uniquePlayers: Object.keys(stats.players).length,
    recentGames: stats.recentGames,
    openReports,
  });
};

// Payload: { status?: 'open'|'all' }
export const rpcAdminReports: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const request = parse(payload);
  const all = listReports(nk);
  const reports = request.status === 'all' ? all : all.filter((report) => report.status === 'open');
  return JSON.stringify({ reports: reports.slice(0, 200) });
};

// Payload: { reportId, status: 'resolved'|'dismissed', note? }
export const rpcAdminResolveReport: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const request = parse(payload);
  const reportId = clip(request.reportId, 64);
  const status = request.status === 'dismissed' ? 'dismissed' : 'resolved';
  const report = readSystemObject(nk, COLLECTION_REPORTS, reportId) as Report | null;
  if (!report) {
    return JSON.stringify({ error: 'not_found' });
  }
  report.status = status;
  report.resolvedAt = Date.now();
  report.resolvedBy = ctx.userId || '';
  report.resolvedByName = displayNameOf(nk, ctx.userId || '');
  report.resolutionNote = clip(request.note, MAX_NOTE);
  writeSystemObject(nk, COLLECTION_REPORTS, report.id, report as any);
  deleteSystemObject(nk, COLLECTION_PAIRS, report.reporterId + ':' + report.targetId);

  const meta = addHistory(nk, ctx, report.targetId, 'report_' + status, report.resolutionNote);
  writeMeta(nk, report.targetId, meta);
  return JSON.stringify({ ok: true, report });
};

// Payload: { query?, includeGuests?, offset? } -> { users, hasMore }
// Lists Members (plus anyone with a Report against them) newest first;
// includeGuests adds every device Guest.
export const rpcAdminUsers: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const request = parse(payload);
  const query = clip(request.query, 100);
  const offset = Math.max(0, Math.floor(Number(request.offset) || 0));

  const reports = listReports(nk);
  const openAgainst: { [userId: string]: number } = {};
  const reportedIds: string[] = [];
  reports.forEach((report) => {
    if (reportedIds.indexOf(report.targetId) === -1) {
      reportedIds.push(report.targetId);
    }
    if (report.status === 'open') {
      openAgainst[report.targetId] = (openAgainst[report.targetId] || 0) + 1;
    }
  });

  const params: any[] = [SYSTEM_USER_ID];
  let where = 'id <> $1';
  if (query) {
    params.push('%' + query + '%');
    where += ' AND (display_name ILIKE $2 OR username ILIKE $2 OR email ILIKE $2 OR id::text = $3)';
    params.push(query);
  }
  if (!request.includeGuests) {
    let tier = '(email IS NOT NULL OR google_id IS NOT NULL OR apple_id IS NOT NULL';
    reportedIds.slice(0, 200).forEach((id) => {
      params.push(id);
      tier += ' OR id::text = $' + params.length;
    });
    where += ' AND ' + tier + ')';
  }
  params.push(USERS_PAGE + 1);
  const limitParam = '$' + params.length;
  params.push(offset);
  const offsetParam = '$' + params.length;

  const rows = nk.sqlQuery(
    'SELECT id::text AS id, username, display_name, email, ' +
    '(google_id IS NOT NULL) AS google, (apple_id IS NOT NULL) AS apple, ' +
    '(EXTRACT(EPOCH FROM create_time) * 1000)::bigint AS created_at, ' +
    "(disable_time > '1970-01-01 00:00:00+00') AS banned " +
    'FROM users WHERE ' + where + ' ORDER BY create_time DESC LIMIT ' + limitParam + ' OFFSET ' + offsetParam,
    params,
  ) || [];

  const page = rows.slice(0, USERS_PAGE);
  const metas = readMetas(nk, page.map((row) => String(row.id)));
  const users = page.map((row) => {
    const id = String(row.id);
    const email = row.email ? String(row.email) : null;
    const meta = metas[id];
    const member = !!row.google || !!row.apple || (!!email && isEmailVerified(nk, id));
    return {
      id,
      name: String(row.display_name || row.username || ''),
      email,
      method: row.google ? 'google' : row.apple ? 'apple' : email ? 'email' : 'guest',
      member,
      createdAt: Number(row.created_at) || 0,
      lastSeenAt: meta ? meta.lastSeenAt : 0,
      gamesPlayed: meta ? meta.gamesPlayed : 0,
      openReports: openAgainst[id] || 0,
      shadowbanned: meta ? meta.shadowbanned : false,
      banned: !!row.banned,
    };
  });
  return JSON.stringify({ users, hasMore: rows.length > USERS_PAGE });
};

// Payload: { userId } -> one user's detail: Reports against them + history.
export const rpcAdminUser: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const userId = clip(parse(payload).userId, 64);
  let account: nkruntime.Account;
  try {
    account = nk.accountGetId(userId);
  } catch (error) {
    return JSON.stringify({ error: 'not_found' });
  }
  const meta = readMeta(nk, userId);
  return JSON.stringify({
    id: userId,
    name: account.user.displayName || account.user.username,
    email: account.email || null,
    member: isMember(nk, userId),
    banned: account.disableTime > 0,
    shadowbanned: meta.shadowbanned,
    lastSeenAt: meta.lastSeenAt,
    gamesPlayed: meta.gamesPlayed,
    history: meta.history,
    reports: listReports(nk).filter((report) => report.targetId === userId),
  });
};

// Payload: { userId, on, note? }
export const rpcAdminSetShadowban: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const request = parse(payload);
  const userId = clip(request.userId, 64);
  if (!userId) {
    return JSON.stringify({ error: 'generic' });
  }
  const on = request.on !== false;
  const meta = addHistory(nk, ctx, userId, on ? 'shadowban' : 'unshadowban', request.note);
  meta.shadowbanned = on;
  writeMeta(nk, userId, meta);
  return JSON.stringify({ ok: true });
};

// Payload: { userId, on, note? } — Nakama's own ban: ends the user's
// sessions and refuses new sign-ins until unbanned.
export const rpcAdminSetBan: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  const request = parse(payload);
  const userId = clip(request.userId, 64);
  if (!userId || userId === ctx.userId) {
    return JSON.stringify({ error: 'generic' });
  }
  const on = request.on !== false;
  try {
    if (on) {
      nk.usersBanId([userId]);
    } else {
      nk.usersUnbanId([userId]);
    }
  } catch (error) {
    logger.error('admin ban(%s) failed for %s: %s', String(on), userId, String(error));
    return JSON.stringify({ error: 'generic' });
  }
  const meta = addHistory(nk, ctx, userId, on ? 'ban' : 'unban', request.note);
  writeMeta(nk, userId, meta);
  return JSON.stringify({ ok: true });
};

// Payload: {} — send the digest now (testing / catching up after an outage).
export const rpcAdminSendDigest: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!isAdmin(ctx, nk)) {
    return forbidden(ctx);
  }
  sendReportDigest(ctx, logger, nk);
  return JSON.stringify({ ok: true });
};

// ── daily digest ──────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Emails every Admin the Reports filed since the last digest. Runs from the
// digest clock's daily reset; a day with no new Reports sends nothing.
export function sendReportDigest(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama) {
  const fresh = listReports(nk).filter((report) => !report.digested);
  if (!fresh.length) {
    return;
  }
  const env = getEmailEnv(ctx);
  const recipients: string[] = [];
  adminIds(ctx).forEach((id) => {
    try {
      const account = nk.accountGetId(id);
      if (account.email) {
        recipients.push(account.email);
      }
    } catch (error) {
      // Stale id in ADMIN_USER_IDS.
    }
  });
  if (!recipients.length) {
    logger.warn('report digest: %d new reports but no admin has an email', fresh.length);
    return;
  }

  const rows = fresh.slice(0, 30).map((report) => (
    '<li style="margin-bottom:8px;"><strong>' + escapeHtml(report.targetName) + '</strong> — ' +
    escapeHtml(report.reason) + ' (' + report.kind + ')<br>' +
    '<span style="color:#555;">“' + escapeHtml(report.evidence) + '”</span></li>'
  )).join('');
  const html =
    '<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;">' +
    '<h2 style="margin:0 0 12px;">' + fresh.length + ' new report' + (fresh.length === 1 ? '' : 's') + '</h2>' +
    '<ul style="padding-left:18px;line-height:1.4;">' + rows + '</ul>' +
    '<p><a href="' + env.publicUrl + '/#admin">Open the admin panel</a></p></div>';

  let sent = false;
  recipients.forEach((to) => {
    if (sendEmail(logger, nk, env, to, 'Burrec: ' + fresh.length + ' new report(s)', html)) {
      sent = true;
    }
  });
  if (env.devEcho) {
    logger.info('report digest (dev echo): %d reports to %s', fresh.length, recipients.join(', '));
  }
  // Without a mail key nothing went out; keep them for the next digest.
  if (!sent && !env.devEcho) {
    return;
  }
  fresh.forEach((report) => {
    report.digested = true;
    writeSystemObject(nk, COLLECTION_REPORTS, report.id, report as any);
  });
  writeSystemObject(nk, COLLECTION_MODERATION, 'digest', { lastSentAt: Date.now() });
}

export const onDigestClock: nkruntime.LeaderboardResetFunction = function (ctx, logger, nk, leaderboard, reset) {
  if (leaderboard.id !== DIGEST_CLOCK_ID) {
    return;
  }
  try {
    sendReportDigest(ctx, logger, nk);
  } catch (error) {
    logger.error('report digest failed: %s', String(error));
  }
};
