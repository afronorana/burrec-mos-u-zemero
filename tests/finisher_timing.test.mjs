// Server Bot pacing must outlast every client animation (shared/protocol.js
// ANIMATION_MS): a Finisher longer than the capture budget would let a Bot
// act while the board is still playing the Capture.
import test from 'node:test';
import assert from 'node:assert/strict';
import { ANIMATION_MS, FINISHER_IDS } from '../shared/protocol.js';
import { finisherTiming, LITE_FINISHER_TIMING } from '../src/utils/finisherTiming.js';

test('every Finisher ends within the capture budget', () => {
  for (const id of FINISHER_IDS) {
    const total = finisherTiming(id).total;
    assert.ok(total < ANIMATION_MS.capture, `${id}: ${total}ms >= ${ANIMATION_MS.capture}ms`);
  }
});

test('the lite capture ends within the capture budget', () => {
  assert.ok(LITE_FINISHER_TIMING.total < ANIMATION_MS.capture);
});

test('every Finisher phase ends by its total', () => {
  for (const id of FINISHER_IDS) {
    const timing = finisherTiming(id);
    for (const [phase, value] of Object.entries(timing)) {
      const end = Array.isArray(value) ? value[1] : value;
      if (phase !== 'flight' && phase !== 'landing' && phase !== 'shake' && phase !== 'hitStop') {
        assert.ok(end <= timing.total, `${id}.${phase} ends at ${end} after total ${timing.total}`);
      }
    }
  }
});
