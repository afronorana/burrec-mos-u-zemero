import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  allHome,
  applyMove,
  globalPosition,
  initialPawns,
  legalPawns,
} from '../src/ludo_logic.ts';

test('globalPosition offsets per seat', () => {
  assert.equal(globalPosition(0, 1), 0);
  assert.equal(globalPosition(1, 1), 10);
  assert.equal(globalPosition(2, 1), 20);
  assert.equal(globalPosition(3, 1), 30);
  assert.equal(globalPosition(3, 11), 0); // wraps
});

test('leaving home requires a 6', () => {
  const pawns = initialPawns();
  assert.deepEqual(legalPawns(pawns, 0, 5), []);
  assert.deepEqual(legalPawns(pawns, 0, 6), [0, 1, 2, 3]);
});

test('own pawn on the start tile blocks the door', () => {
  const pawns = initialPawns();
  pawns[0][0] = 1;
  assert.deepEqual(legalPawns(pawns, 0, 6), [0]); // only the door pawn itself can move (1+6=7 free)
});

test('own pawn on the destination blocks a track move', () => {
  const pawns = initialPawns();
  pawns[0][0] = 5;
  pawns[0][1] = 8;
  assert.deepEqual(legalPawns(pawns, 0, 3), [1]); // pawn 0 would land on own pawn at 8
});

test('overshooting the target lane (>= 45) is illegal', () => {
  const pawns = initialPawns();
  pawns[0][0] = 40; // 40 + 5 = 45 -> illegal, 40 + 4 = 44 -> legal
  assert.deepEqual(legalPawns(pawns, 0, 5), []);
  assert.deepEqual(legalPawns(pawns, 0, 4), [0]);
});

test('leaving home places the pawn at position 1', () => {
  const pawns = initialPawns();
  const result = applyMove(pawns, 2, 0, 6);
  assert.equal(result.fromPos, 0);
  assert.equal(result.toPos, 1);
  assert.equal(pawns[2][0], 1);
  assert.equal(result.extraTurn, true);
});

test('landing on an opponent captures it', () => {
  const pawns = initialPawns();
  pawns[0][0] = 5; // 5 + 3 = 8 -> global (0*10 + 8 - 1) % 40 = 7
  pawns[1][0] = 38; // seat 1: (10 + 38 - 1) % 40 = 7 -> same tile
  const res = applyMove(pawns, 0, 0, 3);
  assert.equal(res.toPos, 8);
  assert.deepEqual(res.captures, [{ seat: 1, pawnIndex: 0 }]);
  assert.equal(pawns[1][0], 0);
});

test('pawns in home or target lane are never captured', () => {
  const pawns = initialPawns();
  pawns[0][0] = 5;
  pawns[1][0] = 0; // home: globalPosition would collide but position 0 is safe
  pawns[1][1] = 41; // target lane: safe
  const res = applyMove(pawns, 0, 0, 3);
  assert.deepEqual(res.captures, []);
});

test('moving into the target lane, no capture computed there', () => {
  const pawns = initialPawns();
  pawns[0][0] = 39;
  const res = applyMove(pawns, 0, 0, 3);
  assert.equal(res.toPos, 42);
  assert.deepEqual(res.captures, []);
});

test('win when all four pawns are past 40', () => {
  const pawns = initialPawns();
  pawns[0] = [41, 42, 43, 39];
  const res = applyMove(pawns, 0, 3, 5); // 39 + 5 = 44
  assert.equal(res.toPos, 44);
  assert.equal(res.won, true);
});

test('allHome', () => {
  const pawns = initialPawns();
  assert.equal(allHome(pawns, 0), true);
  pawns[0][2] = 12;
  assert.equal(allHome(pawns, 0), false);
});
