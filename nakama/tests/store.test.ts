// Pure price-tier rules from shared/protocol.js (CONTEXT.md: Price tier,
// Entitlement, Claim). The catalog object is mutated per test and restored.
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  ITEM_TIERS,
  DEFAULT_FINISHER,
  DEFAULT_PROP,
  canWear,
  itemTier,
  specialOpen,
  wearableCosmetics,
} from '../../shared/protocol.js';

afterEach(() => {
  for (const key of Object.keys(ITEM_TIERS)) delete ITEM_TIERS[key];
});

test('unlisted items are free and wearable by any Member', () => {
  assert.equal(itemTier('prop', 'crown').tier, 'free');
  assert.equal(canWear('prop', 'crown', []), true);
});

test('special window is [from, until) in UTC', () => {
  const entry = { tier: 'special', from: '2026-10-20', until: '2026-11-03' };
  assert.equal(specialOpen(entry, Date.parse('2026-10-19T23:59:59Z')), false);
  assert.equal(specialOpen(entry, Date.parse('2026-10-20T00:00:00Z')), true);
  assert.equal(specialOpen(entry, Date.parse('2026-11-02T23:59:59Z')), true);
  assert.equal(specialOpen(entry, Date.parse('2026-11-03T00:00:00Z')), false);
  assert.equal(specialOpen({ tier: 'premium' }, Date.now()), false);
});

test('special and premium items need an Entitlement, even inside the window', () => {
  ITEM_TIERS['prop:pumpkin'] = { tier: 'special', from: '2000-01-01', until: '2100-01-01' };
  ITEM_TIERS['finisher:ufo'] = { tier: 'premium' };
  assert.equal(canWear('prop', 'pumpkin', []), false);
  assert.equal(canWear('prop', 'pumpkin', ['prop:pumpkin']), true);
  assert.equal(canWear('finisher', 'ufo', ['prop:ufo']), false);
  assert.equal(canWear('finisher', 'ufo', ['finisher:ufo']), true);
});

test('wearableCosmetics swaps what is not owned for the defaults, keeps the rest', () => {
  ITEM_TIERS['prop:pumpkin'] = { tier: 'special', from: '2000-01-01', until: '2001-01-01' };
  ITEM_TIERS['finisher:ufo'] = { tier: 'premium' };
  assert.deepEqual(wearableCosmetics({ prop: 'pumpkin', finisher: 'ufo', flag: 'xk' }, []),
    { prop: DEFAULT_PROP, finisher: DEFAULT_FINISHER, flag: 'xk' });
  assert.deepEqual(wearableCosmetics({ prop: 'pumpkin', finisher: 'anvil', flag: 'al' }, ['prop:pumpkin']),
    { prop: 'pumpkin', finisher: 'anvil', flag: 'al' });
});
