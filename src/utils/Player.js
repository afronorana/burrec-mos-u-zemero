import ApplicationStore from './ApplicationStore';
import EventBus from './eventhandler';
import EventKeys from './EventKeys';
import Pawn from './Pawn';

// A beat to read the dice before our only move plays itself.
const AUTO_MOVE_DELAY_MS = 450;

// One seat's player and its four pawns. Presentation only: legal pawns come
// from the server's DICE_RESULT and turn flow from TURN_CHANGE — nothing is
// decided here.
class Player {
  // controller: 'local' (played on this device — our seat, or a Shared
  // table's companion seat) | 'remote' (another player or a Bot, driven only
  // by server events). See utils/roster.js controllerFor.
  constructor(name, color, seat, controller = 'remote') {
    this.seat = seat;
    this.controller = controller;
    this.name = name;
    this.color = color;
    this.pawns = [1, 2, 3, 4].map((startingPlace) => new Pawn(startingPlace, color, seat));
  }

  deactivatePawns() {
    this.pawns.forEach((pawn) => {
      pawn.isActive = false;
    });
  }

  // The server's DICE_RESULT for this player's roll is showing: make its
  // legal pawns clickable, or wait for another try / the TURN_CHANGE.
  applyServerDiceResult(diceResult) {
    const pending = ApplicationStore.online.pendingDice;
    const legal = pending && pending.value === diceResult ? (pending.legalPawns || []) : [];

    this.pawns.forEach((pawn, index) => {
      pawn.isActive = legal.indexOf(index) !== -1;
    });

    if (legal.length) {
      ApplicationStore.gamePlayStatus.isRolling = false;
      ApplicationStore.gamePlayStatus.isMoving = true;
      const only = this.controller === 'local' ? this.onlyDistinctOption(legal) : null;
      if (only) {
        // One real choice: play it for the human (App handles the event).
        ApplicationStore.online.autoMovePawn = only.id;
        setTimeout(() => EventBus.fire(EventKeys.pawn.autoMove, { pawnId: only.id }), AUTO_MOVE_DELAY_MS);
      }
    } else if (pending && !pending.autoEndTurn) {
      // All pawns home, another of the three tries granted.
      ApplicationStore.gamePlayStatus.isRolling = true;
      ApplicationStore.gamePlayStatus.isMoving = false;
    } else {
      // No moves — the server's TURN_CHANGE is on its way.
      ApplicationStore.gamePlayStatus.isRolling = false;
      ApplicationStore.gamePlayStatus.isMoving = false;
    }
  }

  // The single pawn worth moving among the legal ones, or null when there's a
  // real choice. Pawns still at home are interchangeable (any of them lands
  // on the same start field), so they count as one option.
  onlyDistinctOption(legalIndexes) {
    const options = [];
    legalIndexes.forEach((index) => {
      const pawn = this.pawns[index];
      if (pawn && !options.some((other) => other.position === 0 && pawn.position === 0)) {
        options.push(pawn);
      }
    });
    return options.length === 1 ? options[0] : null;
  }
}

export default Player;
