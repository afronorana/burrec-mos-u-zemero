// The Roster: every "which seat / who is that" question, keyed by seat only
// (seats can be sparse; the order of store.players is nobody's business).
// Pure functions over a room — { seats, selfUserId, table }, i.e.
// store.online — and the players list, so they're node-testable
// (tests/roster.test.mjs) and reactive when a computed calls them.
//
// Three different "me"s, each asked by name:
// - selfSeat: our own seat (at a Shared table, never a companion seat).
// - isSelfSeat: the seat marked "you" (nobody at a Shared table, where
//   everyone at the device is playing).
// - playsHere: this device plays the seat — our own and our companions'.
import { tablePolicy } from '../../shared/protocol.js';

export function seatAt(room, seat) {
  return (room.seats || [])[seat] || null;
}

export function selfSeat(room) {
  for (const info of room.seats || []) {
    if (info && !info.bot && !info.companion && info.userId === room.selfUserId) {
      return info.seat;
    }
  }
  return -1;
}

export function isSeated(room) {
  return selfSeat(room) >= 0;
}

export function isSelfSeat(room, seat) {
  return tablePolicy(room.table).selfIsSeat && seat >= 0 && seat === selfSeat(room);
}

export function playsHere(room, seat) {
  const info = seatAt(room, seat);
  return Boolean(info && !info.bot && room.selfUserId && info.userId === room.selfUserId);
}

// Player.controller for a seat: 'local' when this device plays it.
export function controllerFor(room, seat) {
  return playsHere(room, seat) ? 'local' : 'remote';
}

export function playerAt(players, seat) {
  for (const player of players || []) {
    if (player && player.seat === seat) {
      return player;
    }
  }
  return null;
}

// Players in seat order (the turn order).
export function playersBySeat(players) {
  return (players || []).slice().sort((a, b) => a.seat - b.seat);
}
