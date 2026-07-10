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

export function initialPawns(): number[][] {
  const pawns: number[][] = [];
  for (let seat = 0; seat < 4; seat += 1) {
    pawns.push([0, 0, 0, 0]);
  }
  return pawns;
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
export function applyMove(pawns: number[][], seat: number, pawnIndex: number, dice: number): MoveResult {
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

  let won = true;
  for (let j = 0; j < 4; j += 1) {
    if (pawns[seat][j] <= 40) {
      won = false;
      break;
    }
  }

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
