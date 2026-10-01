// Shared match protocol — imported by BOTH the Vite client and the Nakama
// server bundle (rollup). Body syntax must stay ES5-safe: the server bundle
// targets goja, and rollup does not transpile plain .js imports.

export var MATCH_MODULE = 'ludo';

export var OpCode = {
  // server → client
  LOBBY_STATE: 1, // { phase, seats:[{userId,username,displayName,seat,ready,connected}|null], hostUserId, joinCode }
  GAME_START: 2, // { seats, turnSeat, round, turnMsLeft }
  DICE_RESULT: 3, // { seat, value, legalPawns:[0..3], rollsLeft, autoEndTurn, turnMsLeft? } (turnMsLeft unless autoEndTurn)
  MOVE_APPLIED: 4, // { seat, pawnIndex, fromPos, toPos, steps, captures:[{seat,pawnIndex}], extraTurn, finisher }
  TURN_CHANGE: 5, // { turnSeat, round, reason:'end'|'repeat'|'timeout'|'noMoves'|'left', turnMsLeft }
  STATE_SYNC: 6, // full snapshot incl. turnMsLeft (reconnect/desync recovery)
  GAME_OVER: 7, // { winnerSeat }
  REJECTED: 8, // { reason, forOpCode }

  // client → server
  READY: 10, // { ready: boolean }
  START: 11, // {} (host only)
  ROLL_REQUEST: 12, // {} — or { demand: 1..6 }, honored only when the server runs with DEMO_DICE=1
  MOVE_REQUEST: 13, // { pawnIndex }
  SYNC_REQUEST: 14, // {}
  CLAIM_SEAT: 15, // { seat: number }
  SET_COSMETICS: 16, // { prop, finisher, flag } — lobby phase only; answered with a LOBBY_STATE broadcast
};

// Cosmetics catalog: a player's Prop (worn by all four pawns) and Finisher
// (the presentation of their captures), plus the country flag the `flag`
// Prop waves. Purely visual — the server only whitelists ids and relays them
// (LOBBY_STATE/STATE_SYNC `cosmetics`, keyed by userId). Add ids here first;
// unknown ids fall back to the defaults.
export var PROP_IDS = ['none', 'crown', 'partyHat', 'flag'];
export var FINISHER_IDS = ['shove', 'kick', 'bat', 'bowling'];
export var DEFAULT_PROP = 'none';
export var DEFAULT_FINISHER = 'shove';
export var DEFAULT_FLAG = 'al';

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

export function sanitizeCosmetics(input) {
  var source = input || {};
  var prop = PROP_IDS.indexOf(source.prop) !== -1 ? source.prop : DEFAULT_PROP;
  var finisher = FINISHER_IDS.indexOf(source.finisher) !== -1 ? source.finisher : DEFAULT_FINISHER;
  var flag = FLAG_CODES.indexOf(source.flag) !== -1 ? source.flag : DEFAULT_FLAG;
  return { prop: prop, finisher: finisher, flag: flag };
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
