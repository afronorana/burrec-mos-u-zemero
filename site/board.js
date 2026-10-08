// The board as an inline SVG for the rules pages: the same 40-field track,
// 4-field finish lanes and corner homes as the 3D board (seat order and
// colors from src/utils/playerColors.js), drawn on the classic 11x11 grid.

const COLORS = ['#CE0000', '#F7D708', '#009ECE', '#9CCF31'];
const INK = '#263f2a';
const CELL = 40;

// Walk the track from seat 0's start field, clockwise: [dx, dy, steps].
const LEGS = [[1, 0, 4], [0, -1, 4], [1, 0, 2], [0, 1, 4], [1, 0, 4], [0, 1, 2],
  [-1, 0, 4], [0, 1, 4], [-1, 0, 2], [0, -1, 4], [-1, 0, 4], [0, -1, 1]];

function track() {
  const fields = [[0, 4]];
  let [x, y] = [0, 4];
  LEGS.forEach(([dx, dy, n]) => {
    for (let i = 0; i < n; i += 1) {
      x += dx;
      y += dy;
      fields.push([x, y]);
    }
  });
  return fields; // 40 fields; seat s starts at index 10 * s
}

const LANES = [
  [[1, 5], [2, 5], [3, 5], [4, 5]],
  [[5, 1], [5, 2], [5, 3], [5, 4]],
  [[9, 5], [8, 5], [7, 5], [6, 5]],
  [[5, 9], [5, 8], [5, 7], [5, 6]],
];
const HOMES = [
  [[0, 0], [1, 0], [0, 1], [1, 1]],
  [[9, 0], [10, 0], [9, 1], [10, 1]],
  [[9, 9], [10, 9], [9, 10], [10, 10]],
  [[0, 9], [1, 9], [0, 10], [1, 10]],
];

function disc([x, y], fill, r = 15, width = 2.5) {
  return `<circle cx="${x * CELL + CELL / 2}" cy="${y * CELL + CELL / 2}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="${width}"/>`;
}

export function boardSvg(label) {
  const fields = track();
  const parts = [];
  fields.forEach((f, i) => {
    const seat = i % 10 === 0 ? i / 10 : -1;
    parts.push(disc(f, seat >= 0 ? COLORS[seat] : '#ffffff'));
  });
  LANES.forEach((lane, s) => lane.forEach((f) => parts.push(disc(f, COLORS[s], 13))));
  HOMES.forEach((home, s) => home.forEach((f) => parts.push(disc(f, COLORS[s], 13))));
  // Direction of play: a small arrow beside seat 0's start field.
  parts.push(`<path d="M ${0.5 * CELL} ${3.35 * CELL} l 18 0 m -6 -6 l 6 6 l -6 6" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
  const size = 11 * CELL;
  return `<svg class="board" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`
    + `<rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="22" fill="#efe6cf" stroke="${INK}" stroke-width="3"/>`
    + parts.join('')
    + '</svg>';
}
