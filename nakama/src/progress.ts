// Progression (CONTEXT.md: Points; adr/0003). The balance is the user's
// Nakama wallet ({ points }), whose ledger records every change with its
// source; everything else lives in one user-owned storage object, readable
// by the owner, writable only by the server (account deletion removes both):
//   progress/state: { solo: { day, points }, welcomeAt, streak, counters,
//                     titles: [ids], shownTitle: id | '' | null,
//                     referralCode, referrer, referralPaid, startedGame }
// shownTitle null = never chosen: the first Title earned is shown until the
// player picks one ('' = show none).
// Pure rules are in progress_logic.ts.

import { WELCOME_BONUS, isTitle } from '../../shared/protocol.js';
import {
  Counters,
  Earned,
  GameResult,
  SoloDay,
  Streak,
  applySoloCap,
  countGame,
  emptyCounters,
  emptyStreak,
  gamePoints,
  newTitles,
  streakAdvance,
  utcDay,
} from './progress_logic';

const COLLECTION = 'progress';
const KEY = 'state';

export interface Progress {
  solo: SoloDay | null;
  // When the Welcome bonus was paid (0: not yet).
  welcomeAt: number;
  streak: Streak;
  counters: Counters;
  titles: string[];
  shownTitle: string | null;
  // CONTEXT.md: Referral — this player's own code, who referred them (a
  // userId), whether that Referral was paid, and whether they ever started
  // a game (the payout condition).
  referralCode: string;
  referrer: string;
  referralPaid: boolean;
  startedGame: boolean;
}

function emptyProgress(): Progress {
  return {
    solo: null,
    welcomeAt: 0,
    streak: emptyStreak(),
    counters: emptyCounters(),
    titles: [],
    shownTitle: null,
    referralCode: '',
    referrer: '',
    referralPaid: false,
    startedGame: false,
  };
}

export function readProgress(nk: nkruntime.Nakama, userId: string): { value: Progress; version: string } {
  const objects = nk.storageRead([{ collection: COLLECTION, key: KEY, userId }]);
  const object = objects && objects[0];
  if (!object) {
    return { value: emptyProgress(), version: '*' };
  }
  const value = emptyProgress();
  const stored = object.value || {};
  if (stored.solo) value.solo = stored.solo;
  if (stored.welcomeAt) value.welcomeAt = stored.welcomeAt;
  if (stored.streak) value.streak = stored.streak;
  if (stored.counters) value.counters = stored.counters;
  if (stored.titles) value.titles = stored.titles;
  if (typeof stored.shownTitle === 'string') value.shownTitle = stored.shownTitle;
  if (stored.referralCode) value.referralCode = stored.referralCode;
  if (stored.referrer) value.referrer = stored.referrer;
  if (stored.referralPaid) value.referralPaid = true;
  if (stored.startedGame) value.startedGame = true;
  return { value, version: object.version };
}

// Read-modify-write under the storage version (the match loop and RPCs may
// write the same object); one retry on a version conflict.
export function updateProgress(nk: nkruntime.Nakama, userId: string, change: (progress: Progress) => void) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const current = readProgress(nk, userId);
    change(current.value);
    try {
      nk.storageWrite([{
        collection: COLLECTION,
        key: KEY,
        userId,
        value: current.value as any,
        version: current.version,
        permissionRead: 1,
        permissionWrite: 0,
      }]);
      return;
    } catch (error) {
      if (attempt === 1) throw error;
    }
  }
}

export function addPoints(nk: nkruntime.Nakama, userId: string, amount: number, metadata: { [key: string]: any }) {
  if (amount === 0) return;
  nk.walletUpdate(userId, { points: amount }, metadata, true);
}

export function pointsBalance(nk: nkruntime.Nakama, userId: string): number {
  const account = nk.accountGetId(userId);
  const wallet: any = account && account.wallet;
  const parsed = typeof wallet === 'string' ? JSON.parse(wallet || '{}') : (wallet || {});
  return Number(parsed.points) || 0;
}

// Adds Titles the progress has reached; the first one ever earned is shown
// until the player chooses. Returns the new ids.
export function awardTitles(progress: Progress): string[] {
  const fresh = newTitles(progress.counters, progress.streak.longest, progress.titles);
  if (fresh.length) {
    progress.titles = progress.titles.concat(fresh);
    if (progress.shownTitle === null) progress.shownTitle = fresh[fresh.length - 1];
  }
  return fresh;
}

// Pays one seat's finished game and counts it toward Titles; returns what
// was paid, with any new Titles (null: the table pays nothing, or the payout
// failed). Never throws — a storage hiccup must not break game over.
export function payGame(nk: nkruntime.Nakama, userId: string, table: string, game: GameResult): Earned | null {
  const full = gamePoints(table, game.pawnsHome, game.captures, game.won);
  if (!full) return null;
  try {
    let earned = full;
    updateProgress(nk, userId, (progress) => {
      earned = full;
      if (full.solo) {
        const result = applySoloCap(full, progress.solo, Date.now());
        earned = result.earned;
        progress.solo = result.solo;
      }
      progress.counters = countGame(progress.counters, game);
      earned.newTitles = awardTitles(progress);
    });
    addPoints(nk, userId, earned.total, { source: 'game', table, gameMode: game.gameMode });
    return earned;
  } catch (error) {
    return null;
  }
}

// The player's Titles and the one they show (CONTEXT.md: Title).
export function readTitles(nk: nkruntime.Nakama, userId: string): { titles: string[]; shownTitle: string } {
  const progress = readProgress(nk, userId).value;
  return { titles: progress.titles, shownTitle: progress.shownTitle || '' };
}

// Shows an owned Title, or none (''). Returns false for a Title not owned.
export function setShownTitle(nk: nkruntime.Nakama, userId: string, id: string): boolean {
  let ok = false;
  updateProgress(nk, userId, (progress) => {
    ok = id === '' || (isTitle(id) && progress.titles.indexOf(id) !== -1);
    if (ok) progress.shownTitle = id;
  });
  return ok;
}

// The Welcome bonus, once per user; the caller has checked isMember. Returns
// the Points paid now (0 when already paid). Marked before paying, so a race
// between two callers pays once.
export function grantWelcome(nk: nkruntime.Nakama, userId: string): number {
  let fresh = false;
  updateProgress(nk, userId, (progress) => {
    fresh = !progress.welcomeAt;
    if (fresh) progress.welcomeAt = Date.now();
  });
  if (!fresh) return 0;
  addPoints(nk, userId, WELCOME_BONUS, { source: 'welcome' });
  return WELCOME_BONUS;
}

// Records today on the player's Streak (CONTEXT.md: Streak) and returns it,
// awarding the Streak Titles it reaches.
export function touchStreak(nk: nkruntime.Nakama, userId: string): Streak {
  let streak = emptyStreak();
  updateProgress(nk, userId, (progress) => {
    progress.streak = streakAdvance(progress.streak, utcDay(Date.now()));
    awardTitles(progress);
    streak = progress.streak;
  });
  return streak;
}

// Pays everything the Streak has waiting into the wallet; returns the
// Points paid and the Streak after.
export function collectStreak(nk: nkruntime.Nakama, userId: string): { paid: number; streak: Streak } {
  let paid = 0;
  let streak = emptyStreak();
  updateProgress(nk, userId, (progress) => {
    paid = progress.streak.pending;
    progress.streak.pending = 0;
    streak = progress.streak;
  });
  addPoints(nk, userId, paid, { source: 'streak' });
  return { paid, streak };
}
