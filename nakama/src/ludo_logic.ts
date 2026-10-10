// Pure game rules — a faithful port of src/utils/Pawn.js semantics.
// No nkruntime imports, no side effects: testable with plain node.
//
// Position model (seat-relative, identical to Pawn.js):
//   0       = home
//   1..40   = main track; global tile = (seat*10 + position - 1) % 40
//   41..44  = the seat's target lane
//   pos + dice >= 45 would overshoot the lane -> move unavailable

export interface Capture {
  seat: number;
  pawnIndex: number;
}

export interface MoveResult {
  fromPos: number;
  toPos: number;
  captures: Capture[];
  extraTurn: boolean;
  won: boolean;
}

// 'classic' | 'quick' | 'firstCapture' (shared/protocol.js GAME_MODES).
export type GameMode = string;

// Pawns needed in the finish (positions 41-44) to win, per mode.
function pawnsToWin(mode: GameMode): number {
  return mode === 'quick' ? 1 : 4;
}

// Quick mode starts every seat with its first pawn already on the start
// field (position 1).
export function initialPawns(mode: GameMode = 'classic'): number[][] {
  const pawns: number[][] = [];
  for (let seat = 0; seat < 4; seat += 1) {
    pawns.push(mode === 'quick' ? [1, 0, 0, 0] : [0, 0, 0, 0]);
  }
  return pawns;
}

// Dev table (DEMO_DICE=1 only): every seat's pawns clustered on global
// tiles 2-12, so any roll 1-6 of seat 0's two front pawns lands near or on
// an opponent — for testing Captures/Finishers. Seat 0 also has a pawn
// about to enter its lane (38) and one at home.
export function devPawns(): number[][] {
  return [
    [3, 6, 38, 0], // global 2, 5, 37
    [38, 40, 0, 0], // global 7, 9
    [29, 32, 0, 0], // global 8, 11
    [21, 23, 0, 0], // global 10, 12
  ];
}

export function globalPosition(seat: number, position: number): number {
  return (seat * 10 + position - 1) % 40;
}

function ownPawnAt(pawns: number[][], seat: number, position: number, excludeIndex: number): boolean {
  for (let i = 0; i < 4; i += 1) {
    if (i !== excludeIndex && pawns[seat][i] === position) {
      return true;
    }
  }
  return false;
}

export function allHome(pawns: number[][], seat: number): boolean {
  for (let i = 0; i < 4; i += 1) {
    if (pawns[seat][i] !== 0) {
      return false;
    }
  }
  return true;
}

// Mirrors Pawn.isAvaliable: (canLeaveHome || targetFieldIsEmpty) && !pathEnds.
// - leave home: at home + rolled 6 + own start tile (position 1) free
// - track move: destination not occupied by an own pawn, no overshoot past 44
export function legalPawns(pawns: number[][], seat: number, dice: number): number[] {
  const legal: number[] = [];

  for (let i = 0; i < 4; i += 1) {
    const pos = pawns[seat][i];

    if (pos === 0) {
      if (dice === 6 && !ownPawnAt(pawns, seat, 1, i)) {
        legal.push(i);
      }
      continue;
    }

    if (pos + dice >= 45) {
      continue;
    }

    if (!ownPawnAt(pawns, seat, pos + dice, i)) {
      legal.push(i);
    }
  }

  return legal;
}

// Mutates `pawns`. Caller must have validated the move via legalPawns.
// Captures: landing on a main-track tile sends every opponent pawn on the
// same global tile home (pawns in home or a target lane are safe).
export function applyMove(pawns: number[][], seat: number, pawnIndex: number, dice: number, mode: GameMode = 'classic'): MoveResult {
  const fromPos = pawns[seat][pawnIndex];
  const toPos = fromPos === 0 ? 1 : fromPos + dice;
  pawns[seat][pawnIndex] = toPos;

  const captures: Capture[] = [];

  if (toPos <= 40) {
    const landing = globalPosition(seat, toPos);

    for (let s = 0; s < 4; s += 1) {
      if (s === seat) {
        continue;
      }

      for (let j = 0; j < 4; j += 1) {
        const p = pawns[s][j];
        if (p >= 1 && p <= 40 && globalPosition(s, p) === landing) {
          pawns[s][j] = 0;
          captures.push({ seat: s, pawnIndex: j });
        }
      }
    }
  }

  // First capture: any Capture wins. Otherwise enough pawns in the finish.
  let finished = 0;
  for (let j = 0; j < 4; j += 1) {
    if (pawns[seat][j] > 40) {
      finished += 1;
    }
  }
  const won = mode === 'firstCapture' ? captures.length > 0 : finished >= pawnsToWin(mode);

  return {
    fromPos,
    toPos,
    captures,
    extraTurn: dice === 6,
    won,
  };
}

export function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// True when an opponent pawn could land on main-track `tile` with one roll:
// a track pawn 1-6 tiles behind it (that would not turn into its own lane
// first), or a pawn at home when `tile` is that opponent's start tile.
function threatened(pawns: number[][], seat: number, tile: number): boolean {
  for (let s = 0; s < 4; s += 1) {
    if (s === seat) {
      continue;
    }
    for (let j = 0; j < 4; j += 1) {
      const p = pawns[s][j];
      if (p === 0) {
        if (globalPosition(s, 1) === tile) {
          return true;
        }
        continue;
      }
      if (p > 40) {
        continue;
      }
      const distance = (tile - globalPosition(s, p) + 40) % 40;
      if (distance >= 1 && distance <= 6 && p + distance <= 40) {
        return true;
      }
    }
  }
  return false;
}

function capturesAt(pawns: number[][], seat: number, tile: number): boolean {
  for (let s = 0; s < 4; s += 1) {
    if (s === seat) {
      continue;
    }
    for (let j = 0; j < 4; j += 1) {
      const p = pawns[s][j];
      if (p >= 1 && p <= 40 && globalPosition(s, p) === tile) {
        return true;
      }
    }
  }
  return false;
}

// The pawn a Bot moves (CONTEXT.md: Bot), also the autopilot for an
// Abandoned seat. Preference: Capture > leave home > enter the target lane >
// escape a threat > don't land in reach of an opponent > advance the leader.
// `legal` must be non-empty (legalPawns for this seat and dice).
export function chooseBotMove(pawns: number[][], seat: number, dice: number, legal: number[]): number {
  let best = legal[0];
  let bestScore = -Infinity;

  for (let k = 0; k < legal.length; k += 1) {
    const i = legal[k];
    const from = pawns[seat][i];
    const to = from === 0 ? 1 : from + dice;
    let score = from; // tie-break: advance the leading pawn

    if (to <= 40) {
      const tile = globalPosition(seat, to);
      if (capturesAt(pawns, seat, tile)) {
        score += 1000;
      }
      if (threatened(pawns, seat, tile)) {
        score -= 150;
      }
    }
    if (from === 0) {
      score += 500;
    } else if (from <= 40 && to > 40) {
      score += 300;
    }
    if (from >= 1 && from <= 40 && threatened(pawns, seat, globalPosition(seat, from))) {
      score += 200;
    }

    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }

  return best;
}
