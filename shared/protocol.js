// Shared match protocol — imported by BOTH the Vite client and the Nakama
// server bundle (rollup). Body syntax must stay ES5-safe: the server bundle
// targets goja, and rollup does not transpile plain .js imports.

export var MATCH_MODULE = 'ludo';

export var OpCode = {
  // server → client
  LOBBY_STATE: 1, // { phase, seats:[{userId,username,displayName,seat,ready,connected}|null], hostUserId, joinCode }
  GAME_START: 2, // { seats, turnSeat, round }
  DICE_RESULT: 3, // { seat, value, legalPawns:[0..3], rollsLeft, autoEndTurn }
  MOVE_APPLIED: 4, // { seat, pawnIndex, fromPos, toPos, steps, captures:[{seat,pawnIndex}], extraTurn }
  TURN_CHANGE: 5, // { turnSeat, round, reason:'end'|'repeat'|'timeout'|'noMoves'|'left' }
  STATE_SYNC: 6, // full snapshot (reconnect/desync recovery)
  GAME_OVER: 7, // { winnerSeat }
  REJECTED: 8, // { reason, forOpCode }

  // client → server
  READY: 10, // { ready: boolean }
  START: 11, // {} (host only)
  ROLL_REQUEST: 12, // {} — or { demand: 1..6 }, honored only when the server runs with DEMO_DICE=1
  MOVE_REQUEST: 13, // { pawnIndex }
  SYNC_REQUEST: 14, // {}
  CLAIM_SEAT: 15, // { seat: number }
};

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
