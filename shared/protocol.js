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
  GAME_OVER: 7, // { winnerSeat, stats: [{ rolls, sixes, moves, captures, captured, finished } x4], durationMs, rounds }
  REJECTED: 8, // { reason, forOpCode }
  COSMETICS_CHANGED: 9, // { userId, cosmetics } — a player's one mid-game restyle (see SET_COSMETICS)

  // client → server
  READY: 10, // { ready: boolean }
  START: 11, // {} (host only, and only while seated; Bots fill the rest)
  ROLL_REQUEST: 12, // {} — or { demand: 1..6 }, honored only when the server runs with DEMO_DICE=1
  MOVE_REQUEST: 13, // { pawnIndex }
  SYNC_REQUEST: 14, // {}
  CLAIM_SEAT: 15, // { seat: number }
  PLAY_AGAIN: 18, // {} — finished phase only: the room goes back to its lobby (same players, same Game mode; empty/abandoned seats become Bots), answered with LOBBY_STATE; a solo table restarts at once (GAME_START)
  LEAVE: 17, // {} — an explicit Leave (vs a dropped connection): mid-game the seat goes straight to a Bot, pawns as they stand; at a solo/shared table the match ends
  SET_COSMETICS: 16, // Cosmetics — lobby: answered with LOBBY_STATE; playing: once per player per match (Members only), answered with COSMETICS_CHANGED or REJECTED 'restyle_used' / 'members_only'
};

// Game modes (CONTEXT.md: Game mode), chosen when a room is created:
// - classic: the full game — all four pawns into the finish.
// - quick: every seat starts with one pawn on its start field; the first
//   pawn into the finish wins.
// - firstCapture: the first Capture wins.
export var GAME_MODES = ['classic', 'quick', 'firstCapture'];
export var DEFAULT_GAME_MODE = 'classic';

export function sanitizeGameMode(mode) {
  return GAME_MODES.indexOf(mode) !== -1 ? mode : DEFAULT_GAME_MODE;
}

// Tables (CONTEXT.md: Table) — who plays and whether anyone else can join:
// - open: anyone (Quick play, a room code); the only kind with chat.
// - solo: one human (seat 0) vs three Bots; starts as soon as its owner joins.
// - shared: 2-4 humans on the owner's one device (`companion` seats are the
//   ones the owner plays for someone else), the rest Bots.
// Solo and shared tables are never joinable, have no turn timer, pause while
// their owner is disconnected and end on an explicit LEAVE (adr/0002).
export var TABLES = ['open', 'solo', 'shared'];
export var DEFAULT_TABLE = 'open';

export function sanitizeTable(table) {
  return TABLES.indexOf(table) !== -1 ? table : DEFAULT_TABLE;
}

export function isClosedTable(table) {
  return table === 'solo' || table === 'shared';
}

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
// The lite presentation (burst + flight home, no Finisher); never offered in
// the Wardrobe. Guests and Bots play real Finishers, so this is only a
// fallback for a Capture with no mover look.
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
// An earned item ({ tier: 'earned', price }) is bought with Points (CONTEXT.md:
// Buy; adr/0003). Members wear four Props and four Finishers for free:
// crown, partyHat, sunglasses, flag / shove, pan, bat, hammer.
export var ITEM_TIERS = {
  'prop:pumpkin': { tier: 'special', from: '2026-10-24', until: '2026-11-03' },
  'prop:ghost': { tier: 'special', from: '2026-10-24', until: '2026-11-03' },
  'prop:santaHat': { tier: 'special', from: '2026-12-01', until: '2027-01-01' },
};

// Earned items by price band (cheap / mid / show piece), Points per kind.
var EARNED_PRICES = { prop: [150, 300, 500], finisher: [300, 600, 1000] };
var EARNED_BANDS = {
  prop: [
    ['topHat', 'catEars', 'rabbitEars', 'mustache', 'clownNose', 'scarf', 'bandana'],
    ['qeleshe', 'wizardHat', 'armyHelmet', 'vampireEars'],
    ['dinoSpikes', 'chicken', 'alienAntennae', 'halo', 'devilHorns'],
  ],
  finisher: [
    ['golf', 'racket', 'glove'],
    ['bowling', 'anvil', 'cannon'],
    ['trapdoor', 'magician', 'vampire', 'ufo'],
  ],
};
['prop', 'finisher'].forEach(function (kind) {
  EARNED_BANDS[kind].forEach(function (ids, band) {
    ids.forEach(function (id) {
      ITEM_TIERS[kind + ':' + id] = { tier: 'earned', price: EARNED_PRICES[kind][band] };
    });
  });
});

// The Points a player receives once on becoming a Member: one cheap Prop.
export var WELCOME_BONUS = 150;

// CONTEXT.md: Referral — paid once the referred player is a Member who has
// started a game: Points to the inviter (up to REFERRAL_CAP Referrals) and
// to the newcomer. A referral link is only accepted from an account younger
// than REFERRAL_WINDOW_DAYS.
export var REFERRAL_INVITER_POINTS = 100;
export var REFERRAL_JOINER_POINTS = 50;
export var REFERRAL_CAP = 20;
export var REFERRAL_WINDOW_DAYS = 7;

export function itemKey(kind, id) {
  return kind + ':' + id;
}

// { tier: 'free'|'earned'|'premium'|'special', price?, from?, until? }
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

// ── Points (CONTEXT.md: Points; adr/0003) ─────────────────────────────
// What one finished game pays a seated human: per game, per pawn in the
// finish, per Capture, and for the win. Open tables pay in full, Solo tables
// at SOLO_RATE up to SOLO_DAILY_CAP per UTC day, Shared tables nothing.
export var POINTS = { finished: 10, pawn: 3, capture: 2, win: 15 };
export var SOLO_RATE = 0.5;
export var SOLO_DAILY_CAP = 50;

// CONTEXT.md: Streak — what each day of a 7-day week pays (days 1-6), and
// the seventh-day bonus by week (week 4 and later pay the last one).
export var STREAK_DAILY = [10, 10, 15, 15, 20, 20];
export var STREAK_WEEKLY = [100, 150, 200, 250];

// CONTEXT.md: Title — earned when a lifetime counter reaches `at`. Counters
// count the games that pay Points (Open and Solo tables); `allModes` is a
// win in every Game mode, `streak` the longest Streak. Names are per locale
// (i18n `titles.<id>`).
export var TITLES = [
  { id: 'games1', counter: 'games', at: 1 },
  { id: 'games10', counter: 'games', at: 10 },
  { id: 'games50', counter: 'games', at: 50 },
  { id: 'games100', counter: 'games', at: 100 },
  { id: 'games500', counter: 'games', at: 500 },
  { id: 'wins1', counter: 'wins', at: 1 },
  { id: 'wins10', counter: 'wins', at: 10 },
  { id: 'wins50', counter: 'wins', at: 50 },
  { id: 'wins200', counter: 'wins', at: 200 },
  { id: 'captures10', counter: 'captures', at: 10 },
  { id: 'captures100', counter: 'captures', at: 100 },
  { id: 'captures500', counter: 'captures', at: 500 },
  { id: 'pawns100', counter: 'pawnsHome', at: 100 },
  { id: 'pawns1000', counter: 'pawnsHome', at: 1000 },
  { id: 'sixes100', counter: 'sixes', at: 100 },
  { id: 'captured100', counter: 'captured', at: 100 },
  { id: 'referrals1', counter: 'referrals', at: 1 },
  { id: 'referrals10', counter: 'referrals', at: 10 },
  { id: 'allModes', counter: 'allModes', at: 1 },
  { id: 'streak7', counter: 'streak', at: 7 },
  { id: 'streak30', counter: 'streak', at: 30 },
  { id: 'streak100', counter: 'streak', at: 100 },
];

export function isTitle(id) {
  for (var i = 0; i < TITLES.length; i += 1) {
    if (TITLES[i].id === id) return true;
  }
  return false;
}

// Report reasons (CONTEXT.md: Report); 'other' expects the free-text note.
export var REPORT_REASONS = ['harassment', 'hate', 'offensive_name', 'spam', 'cheating', 'other'];

// What a Guest wears in a match, whatever its client sent: no Prop, the
// default Finisher.
export function guestCosmetics() {
  return sanitizeCosmetics(null);
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
