// Pure progression rules (CONTEXT.md: Points; adr/0003). No nkruntime
// imports, no side effects: testable with plain node. progress.ts applies
// them to storage and the wallet.

import { GAME_MODES, POINTS, SOLO_DAILY_CAP, SOLO_RATE, STREAK_DAILY, STREAK_WEEKLY, TITLES } from '../../shared/protocol.js';

// What one finished game paid a seat (GAME_OVER `earned`). The parts are at
// full rate; `total` is what was actually paid after the Solo rate and cap.
export interface Earned {
  finished: number;
  pawns: number;
  captures: number;
  win: number;
  total: number;
  solo: boolean;
  capped: boolean;
  // Titles this game earned (set by progress.ts).
  newTitles?: string[];
}

// Today's Solo-table payouts, reset when the UTC day changes.
export interface SoloDay {
  day: string;
  points: number;
}

export function utcDay(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

// The full-rate breakdown of one seat's game; null for tables that pay
// nothing (Shared).
export function gamePoints(table: string, pawnsHome: number, captures: number, won: boolean): Earned | null {
  if (table !== 'open' && table !== 'solo') {
    return null;
  }
  const earned: Earned = {
    finished: POINTS.finished,
    pawns: POINTS.pawn * pawnsHome,
    captures: POINTS.capture * captures,
    win: won ? POINTS.win : 0,
    total: 0,
    solo: table === 'solo',
    capped: false,
  };
  earned.total = earned.finished + earned.pawns + earned.captures + earned.win;
  return earned;
}

// Applies the Solo rate and the daily cap. Returns the payout and the
// updated day record (unchanged for Open tables).
export function applySoloCap(earned: Earned, solo: SoloDay | null, nowMs: number): { earned: Earned; solo: SoloDay | null } {
  if (!earned.solo) {
    return { earned, solo };
  }
  const today = utcDay(nowMs);
  const used = solo && solo.day === today ? solo.points : 0;
  const reduced = Math.floor(earned.total * SOLO_RATE);
  const paid = Math.max(0, Math.min(reduced, SOLO_DAILY_CAP - used));
  return {
    earned: {
      finished: earned.finished,
      pawns: earned.pawns,
      captures: earned.captures,
      win: earned.win,
      total: paid,
      solo: true,
      capped: paid < reduced,
    },
    solo: { day: today, points: used + paid },
  };
}

// CONTEXT.md: Streak / Streak freeze. `count` is the consecutive days so far
// (0: none yet); the day of the week and the week follow from it. `pending`
// is the Points waiting to be collected.
export interface Streak {
  count: number;
  lastDay: string;
  freeze: number;
  pending: number;
  longest: number;
}

export function emptyStreak(): Streak {
  return { count: 0, lastDay: '', freeze: 0, pending: 0, longest: 0 };
}

// 1..7 within the current week, and the week (1-based).
export function streakPosition(count: number): { day: number; week: number } {
  if (count < 1) return { day: 0, week: 1 };
  return { day: ((count - 1) % 7) + 1, week: Math.floor((count - 1) / 7) + 1 };
}

export function streakReward(count: number): number {
  const { day, week } = streakPosition(count);
  if (day === 7) return STREAK_WEEKLY[Math.min(week, STREAK_WEEKLY.length) - 1];
  return STREAK_DAILY[day - 1] || 0;
}

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86400000);
}

// Records that the player opened the game on `today` (UTC day). Once per day:
// the next day continues the Streak; one missed day is covered by a held
// freeze (that day pays nothing); anything else starts over at day 1 of week
// 1, without a freeze. Each completed week earns a freeze (at most one held).
export function streakAdvance(streak: Streak, today: string): Streak {
  if (streak.lastDay === today) return streak;
  const gap = streak.lastDay ? daysBetween(streak.lastDay, today) : 0;
  let count = streak.count;
  let freeze = streak.freeze;
  if (gap === 1) {
    count += 1;
  } else if (gap === 2 && freeze > 0) {
    freeze -= 1;
    count += 1;
  } else {
    count = 1;
    freeze = 0;
  }
  if (streakPosition(count).day === 7) freeze = 1;
  return {
    count,
    lastDay: today,
    freeze,
    pending: streak.pending + streakReward(count),
    longest: Math.max(streak.longest, count),
  };
}

// Lifetime counters behind Titles (CONTEXT.md: Title).
export interface Counters {
  games: number;
  wins: number;
  captures: number;
  pawnsHome: number;
  sixes: number;
  captured: number;
  referrals: number;
  modeWins: { [gameMode: string]: number };
}

export function emptyCounters(): Counters {
  return { games: 0, wins: 0, captures: 0, pawnsHome: 0, sixes: 0, captured: 0, referrals: 0, modeWins: {} };
}

export interface GameResult {
  pawnsHome: number;
  captures: number;
  sixes: number;
  captured: number;
  won: boolean;
  gameMode: string;
}

export function countGame(counters: Counters, game: GameResult): Counters {
  const modeWins: { [gameMode: string]: number } = {};
  for (const mode in counters.modeWins) modeWins[mode] = counters.modeWins[mode];
  if (game.won) modeWins[game.gameMode] = (modeWins[game.gameMode] || 0) + 1;
  return {
    games: counters.games + 1,
    wins: counters.wins + (game.won ? 1 : 0),
    captures: counters.captures + game.captures,
    pawnsHome: counters.pawnsHome + game.pawnsHome,
    sixes: counters.sixes + game.sixes,
    captured: counters.captured + game.captured,
    referrals: counters.referrals,
    modeWins,
  };
}

function counterValue(counters: Counters, longestStreak: number, counter: string): number {
  if (counter === 'streak') return longestStreak;
  if (counter === 'allModes') {
    for (let i = 0; i < GAME_MODES.length; i += 1) {
      if (!counters.modeWins[GAME_MODES[i]]) return 0;
    }
    return 1;
  }
  return Number((counters as any)[counter]) || 0;
}

// Titles reached but not yet owned, in catalog order.
export function newTitles(counters: Counters, longestStreak: number, owned: string[]): string[] {
  const earned: string[] = [];
  for (let i = 0; i < TITLES.length; i += 1) {
    const title = TITLES[i];
    if (owned.indexOf(title.id) === -1 && counterValue(counters, longestStreak, title.counter) >= title.at) {
      earned.push(title.id);
    }
  }
  return earned;
}
