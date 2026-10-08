import { MATCH_MODULE, isClosedTable, sanitizeGameMode, sanitizeTable } from '../../shared/protocol.js';

// Letters only (same alphabet Shtet Qytet uses for room codes).
const CODE_ALPHABET = 'ABDEFGHIJKLMNOPQRSTUVWZ';
const CODE_LENGTH = 4;
const MAX_SEATS = 4;

// 4-letter combinations a code must never spell (Albanian + English),
// ported from Shtet Qytet's room-code list.
const NASTY_CODES: { [code: string]: boolean } = {};
[
  'KARI', 'RAKI', 'RAKU', 'KAAR', 'KARR', 'KARE', 'KARO', 'KKAR',
  'MUTI', 'MUTA', 'MMUT', 'MUUT', 'MUTT', 'MUET',
  'QIRU', 'QIJU', 'QIHU', 'QIHE', 'QIJE', 'QIJA', 'QIVA', 'QIVI', 'QIVE',
  'CIRU', 'CIJU', 'CIHU', 'CIHE', 'CIJE', 'CIJA', 'CIVA', 'CIVI', 'CIVE',
  'BOTH', 'BETH', 'BYTH',
  'PIDH', 'PILL', 'PILI', 'PIQK', 'PICK', 'PIZD', 'DHIP', 'LLIP',
  'KURV', 'KRVA',
  'KOQE', 'KOCE', 'BOLE', 'TOPE',
  'VDEK', 'GJAK', 'PORN', 'TAQI', 'MAQI', 'NAQI', 'GEJA', 'GEJI', 'HAMA', 'MAHA',
  'DICK', 'KILL',
].forEach((word) => {
  NASTY_CODES[word] = true;
});

function generateCode(): string {
  let code = '';
  do {
    code = '';
    for (let i = 0; i < CODE_LENGTH; i += 1) {
      code += CODE_ALPHABET.charAt(Math.floor(Math.random() * CODE_ALPHABET.length));
    }
  } while (NASTY_CODES[code]);
  return code;
}

// The creator's chosen environment rides into matchInit params; the match
// handler validates the value, so this just forwards the raw string.
// CONTEXT.md: Game mode. Unknown or missing = classic.
function gameModeFromPayload(payload: string): string {
  try {
    const request = payload ? JSON.parse(payload) : {};
    return sanitizeGameMode(request && request.gameMode ? String(request.gameMode) : '');
  } catch (error) {
    return sanitizeGameMode('');
  }
}

function environmentFromPayload(payload: string): string {
  try {
    const request = payload ? JSON.parse(payload) : {};
    return request && request.environment ? String(request.environment) : 'day';
  } catch (error) {
    return 'day';
  }
}

// The match label query IS the code -> matchId mapping: no storage writes,
// codes die with the match.
export const rpcCreatePrivateMatch: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let code = '';

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = generateCode();
    const existing = nk.matchList(1, true, null, null, null, '+label.code:' + candidate);
    if (!existing || existing.length === 0) {
      code = candidate;
      break;
    }
  }

  if (!code) {
    throw new Error('code_generation_failed');
  }

  const matchId = nk.matchCreate(MATCH_MODULE, { mode: 'private', code, environment: environmentFromPayload(payload), gameMode: gameModeFromPayload(payload) });
  return JSON.stringify({ matchId, code });
};

// A public room is a codeless lobby anyone can find via Quick Match. Like
// private rooms it lives entirely in the match label — no storage writes.
export const rpcCreatePublicMatch: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  const matchId = nk.matchCreate(MATCH_MODULE, { mode: 'public', environment: environmentFromPayload(payload), gameMode: gameModeFromPayload(payload) });
  return JSON.stringify({ matchId });
};

// Quick Match = find-or-create a joinable public room. The match label
// carries mode/open, so a single matchList query is the whole search; no
// matchmaker, no waiting for N players to queue at once.
export const rpcQuickMatch: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  // open:1 means "a seat is claimable" — an open lobby, or a running game
  // with a free/abandoned slot (drop-in). The size ceiling (< MAX_SEATS
  // presences) guards against piling everyone into one room. Only rooms of
  // the requested Game mode.
  const gameMode = gameModeFromPayload(payload);
  const matches = nk.matchList(20, true, null, 1, MAX_SEATS - 1, '+label.mode:public +label.table:open +label.open:1 +label.gameMode:' + gameMode);

  if (matches && matches.length > 0) {
    // Fill the fullest joinable room first so games start sooner.
    let best = matches[0];
    for (let i = 1; i < matches.length; i += 1) {
      if ((matches[i].size || 0) > (best.size || 0)) {
        best = matches[i];
      }
    }
    return JSON.stringify({ matchId: best.matchId });
  }

  const matchId = nk.matchCreate(MATCH_MODULE, { mode: 'public', environment: environmentFromPayload(payload), gameMode });
  return JSON.stringify({ matchId, created: true });
};

// CONTEXT.md: Table — a Solo or Shared table: a closed match only the caller
// may join, started by the server as soon as they do (adr/0002). Payload:
// { table: 'solo' | 'shared', seats?: [{ kind: 'player' | 'computer', name } x4], environment }.
export const rpcCreateTable: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let request: { table?: string; seats?: any } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    throw new Error('invalid_table');
  }
  const table = sanitizeTable(String(request.table || ''));
  if (!isClosedTable(table) || !ctx.userId) {
    throw new Error('invalid_table');
  }
  const params: { [key: string]: string } = { table, owner: ctx.userId, environment: environmentFromPayload(payload) };
  if (table === 'shared') {
    const seats = Array.isArray(request.seats) ? request.seats.slice(0, MAX_SEATS) : [];
    const players = seats.filter(function (seat: any) { return seat && seat.kind === 'player'; }).length;
    if (players < 2) {
      throw new Error('invalid_table');
    }
    params.seats = JSON.stringify(seats);
  }
  const matchId = nk.matchCreate(MATCH_MODULE, params);
  return JSON.stringify({ matchId });
};

export const rpcJoinByCode: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  let request: { code?: string } = {};
  try {
    request = payload ? JSON.parse(payload) : {};
  } catch (error) {
    return JSON.stringify({ error: 'invalid_code' });
  }

  const code = String(request.code || '').trim().toUpperCase();
  if (!code || code.length !== CODE_LENGTH) {
    return JSON.stringify({ error: 'invalid_code' });
  }

  const matches = nk.matchList(1, true, null, null, null, '+label.code:' + code + ' +label.open:1');
  if (!matches || matches.length === 0) {
    return JSON.stringify({ error: 'not_found' });
  }

  return JSON.stringify({ matchId: matches[0].matchId });
};

export const rpcHealthcheck: nkruntime.RpcFunction = function (ctx, logger, nk, payload) {
  return JSON.stringify({ success: true });
};
