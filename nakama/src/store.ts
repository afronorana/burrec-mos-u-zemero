// Store (CONTEXT.md: Price tier, Entitlement, Claim). The catalog lives in
// shared/protocol.js (ITEM_TIERS); this module owns Entitlements and Claims.
// Grants come from Claims of special items and from Buying earned items with
// Points (adr/0003); there is no money purchase flow yet.
//
// Storage: entitlements/items — USER-owned (so account deletion removes it),
// readable by the owner, writable only by the server:
//   { items: { '<kind>:<id>': { at, source: 'claim' | 'buy' } } }

import { itemKey, itemTier, specialOpen } from '../../shared/protocol.js';
import { isMember } from './auth';
import { addPoints, collectStreak, grantWelcome, pointsBalance, readTitles, setShownTitle, touchStreak } from './progress';
import { Streak, streakPosition } from './progress_logic';

// The Streak as the client shows it (StreakPanel).
function streakView(streak: Streak) {
  const position = streakPosition(streak.count);
  return { count: streak.count, day: position.day, week: position.week, freeze: streak.freeze, pending: streak.pending, longest: streak.longest, lastDay: streak.lastDay };
}

const COLLECTION = 'entitlements';
const KEY = 'items';

interface EntitlementRecord {
  at: number;
  source: string;
}

function readItems(nk: nkruntime.Nakama, userId: string): { [key: string]: EntitlementRecord } {
  const objects = nk.storageRead([{ collection: COLLECTION, key: KEY, userId }]);
  const value = objects && objects[0] ? objects[0].value : null;
  return value && value.items ? value.items : {};
}

// The item keys this user holds an Entitlement for.
export function ownedItems(nk: nkruntime.Nakama, userId: string): string[] {
  try {
    return Object.keys(readItems(nk, userId));
  } catch (error) {
    return [];
  }
}

function grant(nk: nkruntime.Nakama, userId: string, key: string, source: string) {
  const items = readItems(nk, userId);
  if (items[key]) {
    return;
  }
  items[key] = { at: Date.now(), source };
  nk.storageWrite([{
    collection: COLLECTION,
    key: KEY,
    userId,
    value: { items },
    permissionRead: 1,
    permissionWrite: 0,
  }]);
}

// Payload: {} -> { owned, now, points, welcome, member, streak, titles,
// shownTitle }. Loading
// the store is how the client says "the game is open", so it also records
// today on the Streak (Guests too). `now` is the server clock,
// so the Wardrobe shows special windows by the same clock the Claim is
// checked against. A Member who never had the Welcome bonus gets it here —
// Google/Apple Members and everyone who was a Member before Points existed
// (adr/0003); `welcome` is what was paid just now.
export const rpcStoreState: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  let welcome = 0;
  const member = isMember(nk, ctx.userId);
  if (member) {
    try {
      welcome = grantWelcome(nk, ctx.userId);
    } catch (error) {
      logger.error('welcome bonus failed for %s: %s', ctx.userId, String(error));
    }
  }
  let streak = null;
  try {
    streak = streakView(touchStreak(nk, ctx.userId));
  } catch (error) {
    logger.error('streak update failed for %s: %s', ctx.userId, String(error));
  }
  const titles = readTitles(nk, ctx.userId);
  return JSON.stringify({
    owned: ownedItems(nk, ctx.userId),
    now: Date.now(),
    points: pointsBalance(nk, ctx.userId),
    welcome,
    member,
    streak,
    titles: titles.titles,
    shownTitle: titles.shownTitle,
  });
};

// Payload: {} -> { paid, points, streak }. Collects every Streak reward
// waiting (Guests too: their Points are spendable once they register).
export const rpcCollectStreak: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  const result = collectStreak(nk, ctx.userId);
  return JSON.stringify({ paid: result.paid, points: pointsBalance(nk, ctx.userId), streak: streakView(result.streak) });
};

// Payload: { kind: 'prop'|'finisher', id } -> { ok, owned, points }.
// Members only, earned items only (CONTEXT.md: Buy). The wallet refuses to go
// below zero, so a short balance fails before anything is granted; a failed
// grant is refunded.
export const rpcBuyItem: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  const userId = ctx.userId || '';
  if (!isMember(nk, userId)) {
    return JSON.stringify({ error: 'member_required' });
  }
  let request: { kind?: string; id?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }
  const kind = request.kind === 'finisher' ? 'finisher' : 'prop';
  const id = String(request.id || '');
  const key = itemKey(kind, id);
  const entry = itemTier(kind, id);
  if (entry.tier !== 'earned' || !(entry.price > 0)) {
    return JSON.stringify({ error: 'not_buyable' });
  }
  if (readItems(nk, userId)[key]) {
    return JSON.stringify({ error: 'already_owned' });
  }
  try {
    addPoints(nk, userId, -entry.price, { source: 'buy', item: key });
  } catch (error) {
    return JSON.stringify({ error: 'not_enough_points' });
  }
  try {
    grant(nk, userId, key, 'buy');
  } catch (error) {
    logger.error('buy grant failed for %s %s: %s', userId, key, String(error));
    addPoints(nk, userId, entry.price, { source: 'refund', item: key });
    return JSON.stringify({ error: 'generic' });
  }
  return JSON.stringify({ ok: true, owned: ownedItems(nk, userId), points: pointsBalance(nk, userId) });
};

// Payload: { kind: 'prop'|'finisher', id } -> { ok, owned }. Members only;
// only special items, only inside their window.
export const rpcClaimItem: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  const userId = ctx.userId || '';
  if (!isMember(nk, userId)) {
    return JSON.stringify({ error: 'member_required' });
  }
  let request: { kind?: string; id?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }
  const kind = request.kind === 'finisher' ? 'finisher' : 'prop';
  const id = String(request.id || '');
  const entry = itemTier(kind, id);
  if (entry.tier !== 'special') {
    return JSON.stringify({ error: 'not_claimable' });
  }
  if (!specialOpen(entry, Date.now())) {
    return JSON.stringify({ error: 'claim_closed' });
  }
  grant(nk, userId, itemKey(kind, id), 'claim');
  return JSON.stringify({ ok: true, owned: ownedItems(nk, userId) });
};

// Payload: { id } ('' = none) -> { ok, shownTitle }. Only an earned Title.
export const rpcSetTitle: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  let request: { id?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }
  const id = String(request.id || '');
  if (!setShownTitle(nk, ctx.userId, id)) {
    return JSON.stringify({ error: 'title_not_owned' });
  }
  return JSON.stringify({ ok: true, shownTitle: id });
};
