// Shared match protocol — imported by BOTH the Vite client and the Nakama
// server bundle (rollup). Body syntax must stay ES5-safe: the server bundle
// targets goja, and rollup does not transpile plain .js imports.

export var MATCH_MODULE = 'ludo';

export var OpCode = {
  // server → client
  LOBBY_STATE: 1, // { phase, seats:[{userId,username,displayName,seat,ready,connected,bot}], hostUserId, joinCode } — bot seats have userId ''
  GAME_START: 2, // { seats, turnSeat, round, turnMsLeft }
  DICE_RESULT: 3, // { seat, value, legalPawns:[0..3], rollsLeft, autoEndTurn, turnMsLeft? } (turnMsLeft unless autoEndTurn)
  MOVE_APPLIED: 4, // { seat, pawnIndex, fromPos, toPos, steps, captures:[{seat,pawnIndex}], extraTurn, finisher }
  TURN_CHANGE: 5, // { turnSeat, round, reason:'end'|'repeat'|'timeout'|'noMoves'|'left', turnMsLeft }
  STATE_SYNC: 6, // full snapshot incl. turnMsLeft (reconnect/desync recovery)
  GAME_OVER: 7, // { winnerSeat }
  REJECTED: 8, // { reason, forOpCode }
  COSMETICS_CHANGED: 9, // { userId, cosmetics } — a player's one mid-game restyle (see SET_COSMETICS)

  // client → server
  READY: 10, // { ready: boolean }
  START: 11, // {} (host only, and only while seated; Bots fill the rest)
  ROLL_REQUEST: 12, // {} — or { demand: 1..6 }, honored only when the server runs with DEMO_DICE=1
  MOVE_REQUEST: 13, // { pawnIndex }
  SYNC_REQUEST: 14, // {}
  CLAIM_SEAT: 15, // { seat: number }
  LEAVE: 17, // {} — an explicit Leave (vs a dropped connection): mid-game the seat goes straight to a Bot, pawns as they stand
  SET_COSMETICS: 16, // Cosmetics — lobby: answered with LOBBY_STATE; playing: once per player per match (Members only), answered with COSMETICS_CHANGED or REJECTED 'restyle_used' / 'members_only'
};

// CONTEXT.md: Bot — every seat no human holds. Bots have no userId, wear no
// Props (their Captures get a random free Finisher, stamped server-side) and
// are shown under this name (clients may translate it).
export var BOT_DISPLAY_NAME = 'Computer';

// Cosmetics catalog: a player's Prop (worn by all four pawns) and Finisher
// (the presentation of their captures), plus the country flag the `flag`
// Prop waves. Purely visual — the server only whitelists ids and relays them
// (LOBBY_STATE/STATE_SYNC `cosmetics`, keyed by userId). Add ids here first;
// unknown ids fall back to the defaults.
export var PROP_IDS = [
  'none', 'crown', 'partyHat', 'topHat', 'qeleshe', 'santaHat', 'wizardHat', 'rabbitEars', 'catEars', 'vampireEars',
  'alienAntennae', 'sunglasses', 'clownNose', 'mustache', 'chicken', 'scarf', 'dinoSpikes', 'pumpkin', 'ghost',
  'bandana', 'armyHelmet', 'devilHorns', 'halo', 'flag',
];
export var FINISHER_IDS = ['shove', 'trapdoor', 'bat', 'pan', 'golf', 'racket', 'bowling', 'hammer', 'anvil', 'glove', 'cannon', 'magician', 'vampire', 'ufo'];
export var DEFAULT_PROP = 'none';
export var DEFAULT_FINISHER = 'shove';
export var DEFAULT_FLAG = 'al';
// A Guest's Capture plays no Finisher, only the lite presentation (burst +
// flight home); 'none' is never offered in the Wardrobe.
export var NO_FINISHER = 'none';

// Lowercase ISO 3166 codes (+ Kosovo and the UK home nations), one SVG each
// in public/flags/.
export var FLAG_CODES = [
  'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at',
  'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi',
  'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by',
  'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn',
  'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm',
  'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'fi', 'fj', 'fk',
  'fm', 'fo', 'fr', 'ga', 'gb', 'gb-eng', 'gb-nir', 'gb-sct', 'gb-wls', 'gd',
  'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs',
  'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie',
  'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp',
  'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la',
  'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc',
  'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq',
  'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne',
  'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe',
  'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py',
  'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg',
  'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv',
  'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm',
  'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'um', 'us', 'uy',
  'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'xk', 'ye',
  'yt', 'za', 'zm', 'zw'
];

// Cosmetics: one Finisher per player, one Prop (+ flag) per pawn —
// { finisher, pawns: [{ prop, flag } x PAWNS_PER_PLAYER], prop, flag } where
// the top-level prop/flag mirror pawn 0 for clients that predate per-pawn
// styling. `pawns` may arrive as a JSON string (Nakama join metadata is
// string-valued); a payload without it styles all pawns from prop/flag.
export var PAWNS_PER_PLAYER = 4;

function sanitizeLook(look, fallback) {
  var source = look || {};
  return {
    prop: PROP_IDS.indexOf(source.prop) !== -1 ? source.prop : fallback.prop,
    flag: FLAG_CODES.indexOf(source.flag) !== -1 ? source.flag : fallback.flag,
  };
}

export function sanitizeCosmetics(input) {
  var source = input || {};
  var base = sanitizeLook(source, { prop: DEFAULT_PROP, flag: DEFAULT_FLAG });
  var pawnsIn = source.pawns;
  if (typeof pawnsIn === 'string') {
    try {
      pawnsIn = JSON.parse(pawnsIn);
    } catch (error) {
      pawnsIn = null;
    }
  }
  var pawns = [];
  for (var i = 0; i < PAWNS_PER_PLAYER; i += 1) {
    pawns.push(sanitizeLook(pawnsIn && pawnsIn[i], base));
  }
  return {
    finisher: FINISHER_IDS.indexOf(source.finisher) !== -1 ? source.finisher : DEFAULT_FINISHER,
    pawns: pawns,
    prop: pawns[0].prop,
    flag: pawns[0].flag,
  };
}

// The { prop, flag } one pawn (0-3) wears; tolerates legacy shapes.
export function pawnLook(cosmetics, index) {
  if (cosmetics && cosmetics.pawns && cosmetics.pawns[index]) {
    return cosmetics.pawns[index];
  }
  return { prop: (cosmetics && cosmetics.prop) || DEFAULT_PROP, flag: (cosmetics && cosmetics.flag) || DEFAULT_FLAG };
}

// ── Store (CONTEXT.md: Price tier, Entitlement, Claim) ──────────────────
// Items are keyed 'prop:<id>' / 'finisher:<id>'. Anything not listed here is
// free for every Member; flags (the country the flag Prop waves) are always
// free. A special item is claimable by any Member at no cost between `from`
// (inclusive) and `until` (exclusive), both UTC ISO dates; claiming grants a
// lasting Entitlement. A premium item is only worn through an Entitlement.
//   e.g. 'prop:pumpkin': { tier: 'special', from: '2026-10-20', until: '2026-11-03' }
//        'finisher:ufo': { tier: 'premium' }
export var ITEM_TIERS = {};

export function itemKey(kind, id) {
  return kind + ':' + id;
}

// { tier: 'free'|'premium'|'special', from?, until? }
export function itemTier(kind, id) {
  return ITEM_TIERS[itemKey(kind, id)] || { tier: 'free' };
}

export function specialOpen(entry, nowMs) {
  if (!entry || entry.tier !== 'special') {
    return false;
  }
  return nowMs >= Date.parse(entry.from + 'T00:00:00Z') && nowMs < Date.parse(entry.until + 'T00:00:00Z');
}

// A Member may wear an item if it is free or they hold an Entitlement for it.
export function canWear(kind, id, ownedKeys) {
  return itemTier(kind, id).tier === 'free' || (ownedKeys || []).indexOf(itemKey(kind, id)) !== -1;
}

// Whitelisted cosmetics with anything not wearable swapped for the default.
export function wearableCosmetics(input, ownedKeys) {
  var cosmetics = sanitizeCosmetics(input);
  for (var i = 0; i < cosmetics.pawns.length; i += 1) {
    if (!canWear('prop', cosmetics.pawns[i].prop, ownedKeys)) {
      cosmetics.pawns[i].prop = DEFAULT_PROP;
    }
  }
  cosmetics.prop = cosmetics.pawns[0].prop;
  if (!canWear('finisher', cosmetics.finisher, ownedKeys)) {
    cosmetics.finisher = DEFAULT_FINISHER;
  }
  return cosmetics;
}

// Report reasons (CONTEXT.md: Report); 'other' expects the free-text note.
export var REPORT_REASONS = ['harassment', 'hate', 'offensive_name', 'spam', 'cheating', 'other'];

// What a Guest wears in a match, whatever its client sent.
export function guestCosmetics() {
  var cosmetics = sanitizeCosmetics(null);
  cosmetics.finisher = NO_FINISHER;
  return cosmetics;
}

export function encodePayload(payload) {
  return JSON.stringify(payload == null ? {} : payload);
}

// The client receives Uint8Array from nakama-js; the goja server runtime
// receives match message data as an ArrayBuffer (and has no TextDecoder).
// The byte-wise fallback is ASCII-only, which all match payloads are.
export function decodePayload(data) {
  if (data == null || data === '') {
    return {};
  }
  var text = data;
  if (typeof data !== 'string') {
    var bytes = data;
    if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
      bytes = new Uint8Array(data);
    }
    if (typeof TextDecoder !== 'undefined') {
      text = new TextDecoder().decode(bytes);
    } else {
      var chars = [];
      for (var i = 0; i < bytes.length; i += 1) {
        chars.push(String.fromCharCode(bytes[i]));
      }
      text = chars.join('');
    }
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return {};
  }
}
