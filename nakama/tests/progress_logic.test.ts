// Pure progression rules (CONTEXT.md: Points; adr/0003).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applySoloCap, countGame, emptyCounters, newTitles, emptyStreak, gamePoints, streakAdvance, streakPosition, streakReward, utcDay } from '../src/progress_logic.ts';

const NOW = Date.parse('2026-10-09T12:00:00Z');

test('an Open-table game pays every part in full', () => {
  const earned = gamePoints('open', 2, 3, true);
  assert.deepEqual(earned, { finished: 10, pawns: 6, captures: 6, win: 15, total: 37, solo: false, capped: false });
  assert.equal(applySoloCap(earned, null, NOW).earned, earned);
});

test('a loss still pays for finishing the game', () => {
  assert.equal(gamePoints('open', 0, 0, false).total, 10);
});

test('Shared tables pay nothing', () => {
  assert.equal(gamePoints('shared', 4, 5, true), null);
});

test('Solo tables pay half, rounded down', () => {
  const { earned, solo } = applySoloCap(gamePoints('solo', 1, 1, false), null, NOW);
  assert.equal(earned.total, 7); // (10 + 3 + 2) / 2
  assert.equal(earned.capped, false);
  assert.deepEqual(solo, { day: '2026-10-09', points: 7 });
});

test('Solo payouts stop at the daily cap', () => {
  const big = gamePoints('solo', 4, 0, true); // 37 -> 18
  const first = applySoloCap(big, { day: '2026-10-09', points: 40 }, NOW);
  assert.equal(first.earned.total, 10);
  assert.equal(first.earned.capped, true);
  assert.equal(first.solo.points, 50);
  const second = applySoloCap(big, first.solo, NOW);
  assert.equal(second.earned.total, 0);
  assert.equal(second.earned.capped, true);
});

test('the cap resets on a new UTC day', () => {
  const { earned, solo } = applySoloCap(gamePoints('solo', 0, 0, false), { day: '2026-10-08', points: 50 }, NOW);
  assert.equal(earned.total, 5);
  assert.deepEqual(solo, { day: '2026-10-09', points: 5 });
});

test('utcDay is the UTC calendar date', () => {
  assert.equal(utcDay(Date.parse('2026-10-09T23:59:59Z')), '2026-10-09');
  assert.equal(utcDay(Date.parse('2026-10-10T00:00:00Z')), '2026-10-10');
});

// Days from 2026-10-01 as UTC day strings.
const day = (n) => utcDay(Date.parse('2026-10-01T00:00:00Z') + n * 86400000);
const run = (days) => days.reduce((streak, n) => streakAdvance(streak, day(n)), emptyStreak());

test('a first day starts the Streak at day 1 and pays 10', () => {
  const streak = streakAdvance(emptyStreak(), day(0));
  assert.deepEqual(streak, { count: 1, lastDay: day(0), freeze: 0, pending: 10, longest: 1 });
});

test('opening twice on one day counts once', () => {
  const once = run([0]);
  assert.equal(streakAdvance(once, day(0)), once);
});

test('a full week pays 190 and earns a freeze', () => {
  const week = run([0, 1, 2, 3, 4, 5, 6]);
  assert.equal(week.count, 7);
  assert.equal(week.pending, 10 + 10 + 15 + 15 + 20 + 20 + 100);
  assert.equal(week.freeze, 1);
});

test('the seventh-day bonus grows each week and tops out at week 4', () => {
  assert.deepEqual([7, 14, 21, 28, 35].map(streakReward), [100, 150, 200, 250, 250]);
  assert.deepEqual(streakPosition(8), { day: 1, week: 2 });
  assert.equal(streakReward(8), 10);
});

test('a missed day without a freeze starts over at day 1 of week 1', () => {
  const broken = run([0, 1, 2, 4]);
  assert.equal(broken.count, 1);
  assert.equal(broken.longest, 3);
});

test('a held freeze covers one missed day, which pays nothing', () => {
  const week = run([0, 1, 2, 3, 4, 5, 6]);
  const saved = streakAdvance(week, day(8));
  assert.equal(saved.count, 8);
  assert.equal(saved.freeze, 0);
  assert.equal(saved.pending, week.pending + 10);
});

test('two missed days break the Streak even with a freeze', () => {
  const week = run([0, 1, 2, 3, 4, 5, 6]);
  const broken = streakAdvance(week, day(9));
  assert.equal(broken.count, 1);
  assert.equal(broken.freeze, 0, 'starting over starts without a freeze');
});

test('at most one freeze is held', () => {
  const twoWeeks = run([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  assert.equal(twoWeeks.freeze, 1);
});

const game = (over) => ({ pawnsHome: 1, captures: 2, sixes: 3, captured: 1, won: false, gameMode: 'classic', ...over });

test('a finished game adds to every counter, and a win to its Game mode', () => {
  const counters = countGame(emptyCounters(), game({ won: true, gameMode: 'quick' }));
  assert.deepEqual(counters, { games: 1, wins: 1, captures: 2, pawnsHome: 1, sixes: 3, captured: 1, referrals: 0, modeWins: { quick: 1 } });
});

test('the first finished game and the first win earn their Titles', () => {
  assert.deepEqual(newTitles(countGame(emptyCounters(), game()), 0, []), ['games1']);
  assert.deepEqual(newTitles(countGame(emptyCounters(), game({ won: true })), 0, []), ['games1', 'wins1']);
});

test('owned Titles are not earned again', () => {
  assert.deepEqual(newTitles(countGame(emptyCounters(), game({ won: true })), 0, ['games1', 'wins1']), []);
});

test('thresholds: captures, streak and a win in every Game mode', () => {
  const counters = { ...emptyCounters(), captures: 10, modeWins: { classic: 2, quick: 1 } };
  assert.deepEqual(newTitles(counters, 7, []), ['captures10', 'streak7']);
  counters.modeWins.firstCapture = 1;
  assert.ok(newTitles(counters, 0, []).includes('allModes'));
});
