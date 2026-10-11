import test from 'node:test';
import assert from 'node:assert/strict';
import { controllerFor, isSeated, isSelfSeat, playerAt, playersBySeat, playsHere, selfSeat } from '../src/utils/roster.js';

const ME = 'me';
const human = (seat, userId, extra = {}) => ({ seat, userId, bot: false, connected: true, ...extra });
const bot = (seat) => ({ seat, userId: '', bot: true, connected: true });

test('open table: our seat is "you" and plays here; others are remote', () => {
  const room = { selfUserId: ME, table: 'open', seats: [bot(0), human(1, 'other'), human(2, ME), bot(3)] };
  assert.equal(selfSeat(room), 2);
  assert.equal(isSeated(room), true);
  assert.equal(isSelfSeat(room, 2), true);
  assert.equal(isSelfSeat(room, 1), false);
  assert.equal(controllerFor(room, 2), 'local');
  assert.equal(controllerFor(room, 1), 'remote');
  assert.equal(controllerFor(room, 0), 'remote', 'a Bot is played by the server');
});

test('unseated: no self seat, nothing plays here', () => {
  const room = { selfUserId: ME, table: 'open', seats: [bot(0), human(1, 'other'), bot(2), bot(3)] };
  assert.equal(selfSeat(room), -1);
  assert.equal(isSeated(room), false);
  assert.equal(isSelfSeat(room, -1), false);
  assert.equal([0, 1, 2, 3].some((seat) => playsHere(room, seat)), false);
});

test('shared table: companions play here but nobody is "you"', () => {
  const room = {
    selfUserId: ME,
    table: 'shared',
    seats: [human(0, ME), bot(1), human(2, ME, { companion: true }), human(3, ME, { companion: true })],
  };
  assert.equal(selfSeat(room), 0, 'own seat, never a companion');
  assert.deepEqual([0, 1, 2, 3].map((seat) => playsHere(room, seat)), [true, false, true, true]);
  assert.deepEqual([0, 1, 2, 3].map((seat) => isSelfSeat(room, seat)), [false, false, false, false]);
});

test('solo table: our seat is "you"', () => {
  const room = { selfUserId: ME, table: 'solo', seats: [human(0, ME), bot(1), bot(2), bot(3)] };
  assert.equal(isSelfSeat(room, 0), true);
});

test('players are found by seat whatever their array order', () => {
  const players = [{ seat: 3, name: 'd' }, { seat: 0, name: 'a' }, { seat: 2, name: 'c' }];
  assert.equal(playerAt(players, 2).name, 'c');
  assert.equal(playerAt(players, 1), null);
  assert.deepEqual(playersBySeat(players).map((p) => p.seat), [0, 2, 3]);
});
