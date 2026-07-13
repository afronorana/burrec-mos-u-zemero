import { MATCH_MODULE } from '../../shared/protocol.js';

// Letters only (same alphabet Shtet Qytet uses for room codes).
const CODE_ALPHABET = 'ABDEFGHIJKLMNOPQRSTUVWZ';
const CODE_LENGTH = 4;

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

  const matchId = nk.matchCreate(MATCH_MODULE, { mode: 'private', code });
  return JSON.stringify({ matchId, code });
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
