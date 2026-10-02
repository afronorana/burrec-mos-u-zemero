// Store (CONTEXT.md: Price tier, Entitlement, Claim). The catalog lives in
// shared/protocol.js (ITEM_TIERS); this module owns Entitlements and Claims.
// There is no purchase flow yet: Claims of special items are the only grant.
//
// Storage: entitlements/items — USER-owned (so account deletion removes it),
// readable by the owner, writable only by the server:
//   { items: { '<kind>:<id>': { at, source: 'claim' } } }

import { itemKey, itemTier, specialOpen } from '../../shared/protocol.js';
import { isMember } from './auth';

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

// Payload: {} -> { owned, now }. `now` is the server clock, so the Wardrobe
// shows special windows by the same clock the Claim is checked against.
export const rpcStoreState: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  return JSON.stringify({ owned: ownedItems(nk, ctx.userId), now: Date.now() });
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
