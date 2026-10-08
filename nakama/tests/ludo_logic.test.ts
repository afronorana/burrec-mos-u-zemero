import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  allHome,
  applyMove,
  chooseBotMove,
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

test('bot: a Capture beats everything', () => {
  const pawns = initialPawns();
  pawns[0][0] = 30;
  pawns[0][1] = 5;
  pawns[1][0] = 1; // seat 1 start = global 10; seat 0 position 11 = global 10
  assert.equal(chooseBotMove(pawns, 0, 6, legalPawns(pawns, 0, 6)), 1);
});

test('bot: leaves home on a 6 when nothing to capture', () => {
  const pawns = initialPawns();
  pawns[0][0] = 20;
  assert.equal(chooseBotMove(pawns, 0, 6, legalPawns(pawns, 0, 6)), 1);
});

test('bot: enters the target lane', () => {
  const pawns = initialPawns();
  pawns[0][0] = 38;
  pawns[0][1] = 12;
  assert.equal(chooseBotMove(pawns, 0, 4, legalPawns(pawns, 0, 4)), 0);
});

test('bot: avoids landing right in front of an opponent', () => {
  const pawns = initialPawns();
  pawns[0][0] = 15; // +3 -> 18 (global 17), seat 1 pawn at global 15 threatens it
  pawns[0][1] = 5; // +3 -> 8 (global 7), safe
  pawns[1][0] = 6; // global 15
  assert.equal(chooseBotMove(pawns, 0, 3, legalPawns(pawns, 0, 3)), 1);
});

test('bot: otherwise advances the leading pawn', () => {
  const pawns = initialPawns();
  pawns[0][0] = 5;
  pawns[0][1] = 20;
  assert.equal(chooseBotMove(pawns, 0, 2, legalPawns(pawns, 0, 2)), 1);
});

test('quick mode: every seat starts with one pawn on its start field', () => {
  const pawns = initialPawns('quick');
  for (let seat = 0; seat < 4; seat += 1) {
    assert.deepEqual(pawns[seat], [1, 0, 0, 0]);
  }
  // The door is taken by our own pawn, so a 6 moves only that one.
  assert.deepEqual(legalPawns(pawns, 0, 6), [0]);
  assert.deepEqual(legalPawns(pawns, 0, 3), [0]);
});

test('quick mode: two pawns in the finish win', () => {
  const pawns = initialPawns('quick');
  pawns[0][0] = 43;
  pawns[0][1] = 38;
  assert.equal(applyMove(pawns, 0, 1, 4, 'quick').won, true); // 38 + 4 = 42
  const classic = initialPawns();
  classic[0][0] = 43;
  classic[0][1] = 38;
  assert.equal(applyMove(classic, 0, 1, 4).won, false);
});

test('first-capture mode: the first Capture wins', () => {
  const pawns = initialPawns();
  pawns[0][0] = 5;
  pawns[1][0] = 33; // global (10 + 33 - 1) % 40 = 2 -> seat 0 position 3
  const miss = applyMove(pawns, 0, 0, 1, 'firstCapture');
  assert.equal(miss.won, false);
  const pawnsHit = initialPawns();
  pawnsHit[0][0] = 1;
  pawnsHit[1][0] = 33;
  const hit = applyMove(pawnsHit, 0, 0, 2, 'firstCapture');
  assert.equal(hit.captures.length, 1);
  assert.equal(hit.won, true);
});
