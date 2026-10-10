// Referrals (CONTEXT.md: Referral). Each player has a short code; a newcomer
// who registered through `#r=<code>` records its owner as their referrer
// once, and the Referral pays as soon as they are a Member who has started a
// game — whichever comes last, a game start or recording the referrer.
//
// Storage: referral_codes/<code> — SYSTEM-owned, { userId }; the rest lives
// in the user's progress object (progress.ts).

import {
  REFERRAL_CAP,
  REFERRAL_INVITER_POINTS,
  REFERRAL_JOINER_POINTS,
  REFERRAL_WINDOW_DAYS,
} from '../../shared/protocol.js';
import { isMember, readSystemObject, writeSystemObject } from './auth';
import { addPoints, awardTitles, readProgress, updateProgress } from './progress';

const CODES = 'referral_codes';
// No 0/O/1/I: codes get read out loud and typed.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomCode(): string {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return code;
}

// The player's referral code, minted on first ask.
export function referralCode(nk: nkruntime.Nakama, userId: string): string {
  const existing = readProgress(nk, userId).value.referralCode;
  if (existing) return existing;
  let code = randomCode();
  for (let attempt = 0; attempt < 5 && readSystemObject(nk, CODES, code); attempt += 1) {
    code = randomCode();
  }
  writeSystemObject(nk, CODES, code, { userId });
  let saved = code;
  updateProgress(nk, userId, (progress) => {
    if (progress.referralCode) {
      saved = progress.referralCode; // a parallel call won
    } else {
      progress.referralCode = code;
    }
  });
  return saved;
}

function accountAgeMs(nk: nkruntime.Nakama, userId: string): number {
  const created = Number(nk.accountGetId(userId).user.createTime) || 0;
  // goja hands back seconds; tolerate milliseconds too.
  return Date.now() - (created > 1e12 ? created : created * 1000);
}

// Pays the Referral if it is due: the player has a referrer, is a Member and
// has started a game. Once only (referralPaid).
function payIfDue(nk: nkruntime.Nakama, userId: string) {
  let referrer = '';
  updateProgress(nk, userId, (progress) => {
    referrer = '';
    if (progress.referrer && !progress.referralPaid && progress.startedGame) {
      referrer = progress.referrer;
      progress.referralPaid = true;
    }
  });
  if (!referrer) return;
  addPoints(nk, userId, REFERRAL_JOINER_POINTS, { source: 'referral', role: 'joiner' });
  let counted = false;
  updateProgress(nk, referrer, (progress) => {
    counted = progress.counters.referrals < REFERRAL_CAP;
    if (counted) {
      progress.counters.referrals += 1;
      awardTitles(progress);
    }
  });
  if (counted) {
    addPoints(nk, referrer, REFERRAL_INVITER_POINTS, { source: 'referral', role: 'inviter', joiner: userId });
  }
}

// Records the referrer behind `code` for a Member who just registered.
// Returns an error code, or '' on success.
export function setReferrer(nk: nkruntime.Nakama, userId: string, code: string): string {
  if (!isMember(nk, userId)) return 'member_required';
  const owner = readSystemObject(nk, CODES, code.toUpperCase());
  const referrer = owner && typeof owner.userId === 'string' ? owner.userId : '';
  if (!referrer) return 'referral_unknown';
  if (referrer === userId) return 'referral_self';
  if (accountAgeMs(nk, userId) > REFERRAL_WINDOW_DAYS * 86400000) return 'referral_too_late';
  let taken = false;
  updateProgress(nk, userId, (progress) => {
    taken = Boolean(progress.referrer);
    if (!taken) progress.referrer = referrer;
  });
  if (taken) return 'referral_already_set';
  payIfDue(nk, userId);
  return '';
}

// A human started a game: the other half of the payout condition. Cheap
// when there is nothing to do (one read for players who started before).
export function noteGameStarted(nk: nkruntime.Nakama, userId: string) {
  const progress = readProgress(nk, userId).value;
  if (progress.startedGame && (!progress.referrer || progress.referralPaid)) return;
  if (!progress.startedGame) {
    updateProgress(nk, userId, (p) => {
      p.startedGame = true;
    });
  }
  if (progress.referrer && !progress.referralPaid && isMember(nk, userId)) {
    payIfDue(nk, userId);
  }
}

// Payload: {} -> { code }.
export const rpcReferralCode: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  return JSON.stringify({ code: referralCode(nk, ctx.userId) });
};

// Payload: { code } -> { ok } | { error }.
export const rpcSetReferrer: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  if (!ctx.userId) {
    return JSON.stringify({ error: 'auth_required' });
  }
  let request: { code?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'generic' });
  }
  const error = setReferrer(nk, ctx.userId, String(request.code || '').slice(0, 12));
  return JSON.stringify(error ? { error } : { ok: true });
};
