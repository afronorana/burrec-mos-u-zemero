import test from 'node:test';
import assert from 'node:assert/strict';
import { createPresentationLock } from '../src/network/presentationLock.js';

test('held until every hold is released; listeners hear each release', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const lock = createPresentationLock();
  let releases = 0;
  lock.onRelease(() => { releases += 1; });
  const dice = lock.acquire('dice');
  const move = lock.acquire('move');
  assert.equal(lock.held(), true);
  assert.equal(lock.held('move'), true);
  dice();
  assert.equal(lock.held(), true);
  assert.equal(lock.held('dice'), false);
  move();
  assert.equal(lock.held(), false);
  assert.equal(releases, 2);
  move(); // idempotent
  assert.equal(releases, 2);
});

test('a stalled hold runs its own onStall, or the default', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const lock = createPresentationLock();
  const stalled = [];
  lock.setDefaultStall((kind) => stalled.push(`default:${kind}`));
  lock.acquire('finisher', { timeoutMs: 4000, onStall: (kind) => stalled.push(`own:${kind}`) });
  lock.acquire('move', { timeoutMs: 1000 });
  lock.acquire('dice', { timeoutMs: 9000 });
  t.mock.timers.tick(999);
  assert.deepEqual(stalled, []);
  t.mock.timers.tick(1);
  assert.deepEqual(stalled, ['default:move']);
  t.mock.timers.tick(3000);
  assert.deepEqual(stalled, ['default:move', 'own:finisher']);
  assert.equal(lock.held('dice'), true);
  t.mock.timers.tick(5000);
  assert.equal(lock.held(), false);
  assert.deepEqual(stalled, ['default:move', 'own:finisher', 'default:dice']);
});

test('a released hold never stalls', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const lock = createPresentationLock();
  let stalls = 0;
  lock.setDefaultStall(() => { stalls += 1; });
  const release = lock.acquire('move', { timeoutMs: 500 });
  release();
  t.mock.timers.tick(10000);
  assert.equal(stalls, 0);
});

test('reset drops holds silently; old releases stay no-ops', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const lock = createPresentationLock();
  let stalls = 0;
  let releases = 0;
  lock.setDefaultStall(() => { stalls += 1; });
  lock.onRelease(() => { releases += 1; });
  const old = lock.acquire('move', { timeoutMs: 500 });
  lock.reset();
  assert.equal(lock.held(), false);
  const fresh = lock.acquire('move', { timeoutMs: 5000 });
  old();
  assert.equal(lock.held('move'), true, 'a stale release must not free a new hold');
  t.mock.timers.tick(1000);
  assert.equal(stalls, 0);
  fresh();
  assert.equal(releases, 1);
});
