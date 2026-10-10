// Pure price-tier rules from shared/protocol.js (CONTEXT.md: Price tier,
// Entitlement, Claim). The catalog object is mutated per test and restored.
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  ITEM_TIERS,
  DEFAULT_FINISHER,
  DEFAULT_PROP,
  FINISHER_IDS,
  PROP_IDS,
  canWear,
  guestCosmetics,
  itemTier,
  specialOpen,
  sanitizeCosmetics,
  wearableCosmetics,
} from '../../shared/protocol.js';

// The shipped catalog, before the tests below swap in their own entries.
const CATALOG = { ...ITEM_TIERS };

afterEach(() => {
  for (const key of Object.keys(ITEM_TIERS)) delete ITEM_TIERS[key];
});

test('the shipped catalog: four free Props and four free Finishers, the rest earned or special', () => {
  Object.assign(ITEM_TIERS, CATALOG);
  const free = (kind, ids) => ids.filter((id) => id !== 'none' && itemTier(kind, id).tier === 'free');
  assert.deepEqual(free('prop', PROP_IDS), ['crown', 'partyHat', 'sunglasses', 'flag']);
  assert.deepEqual(free('finisher', FINISHER_IDS), ['shove', 'bat', 'pan', 'hammer']);
  assert.ok(itemTier('finisher', DEFAULT_FINISHER).tier === 'free');
  for (const id of ['pumpkin', 'ghost', 'santaHat']) assert.equal(itemTier('prop', id).tier, 'special', id);
  assert.deepEqual(itemTier('prop', 'qeleshe'), { tier: 'earned', price: 300 });
  assert.deepEqual(itemTier('finisher', 'ufo'), { tier: 'earned', price: 1000 });
  assert.equal(canWear('prop', 'topHat', []), false);
  assert.equal(canWear('prop', 'topHat', ['prop:topHat']), true);
});

test('a Guest wears no Prop and the default Finisher', () => {
  const worn = guestCosmetics();
  assert.equal(worn.finisher, DEFAULT_FINISHER);
  assert.ok(worn.pawns.every((p) => p.prop === DEFAULT_PROP));
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

test('wearableCosmetics swaps what is not owned for the defaults, per pawn', () => {
  ITEM_TIERS['prop:pumpkin'] = { tier: 'special', from: '2000-01-01', until: '2001-01-01' };
  ITEM_TIERS['finisher:ufo'] = { tier: 'premium' };
  const worn = wearableCosmetics({
    finisher: 'ufo',
    pawns: [{ prop: 'pumpkin', flag: 'xk' }, { prop: 'crown', flag: 'al' }, { prop: 'pumpkin', flag: 'al' }, { prop: 'halo', flag: 'al' }],
  }, []);
  assert.equal(worn.finisher, DEFAULT_FINISHER);
  assert.deepEqual(worn.pawns.map((p) => p.prop), [DEFAULT_PROP, 'crown', DEFAULT_PROP, 'halo']);
  assert.equal(worn.pawns[0].flag, 'xk');
  assert.equal(worn.prop, DEFAULT_PROP, 'legacy prop mirrors pawn 0');
  const owned = wearableCosmetics({ prop: 'pumpkin', finisher: 'anvil', flag: 'al' }, ['prop:pumpkin']);
  assert.deepEqual(owned.pawns.map((p) => p.prop), ['pumpkin', 'pumpkin', 'pumpkin', 'pumpkin']);
});

test('sanitizeCosmetics: per-pawn looks from an array or a JSON string, legacy shape fills all four', () => {
  const legacy = sanitizeCosmetics({ prop: 'crown', flag: 'xk', finisher: 'anvil' });
  assert.equal(legacy.pawns.length, 4);
  assert.ok(legacy.pawns.every((p) => p.prop === 'crown' && p.flag === 'xk'));
  const fromString = sanitizeCosmetics({ prop: 'crown', pawns: JSON.stringify([{ prop: 'halo' }, { prop: 'bogus' }]) });
  assert.deepEqual(fromString.pawns.map((p) => p.prop), ['halo', 'crown', 'crown', 'crown'], 'invalid/missing pawns fall back to prop');
  assert.equal(fromString.prop, 'halo');
  assert.equal(sanitizeCosmetics({ pawns: 'not json' }).pawns[3].prop, DEFAULT_PROP);
});
