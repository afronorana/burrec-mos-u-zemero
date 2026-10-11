import ApplicationStore from './ApplicationStore';
import EventBus from './eventhandler';
import EventKeys from './EventKeys';
import { PAWN_STEP_DURATION_MS } from './movementConstants';

// A pawn on the board, and the presenter of its moves. The rules live only
// on the server (nakama/src/ludo_logic.ts): MOVE_APPLIED says where a pawn
// goes and whom it captures, and play() shows it — one hop per field on
// PAWN_STEP_DURATION_MS timers, then the victims go home. The render loop
// (App.vue syncPawns) tweens meshes toward getCoordinates() each frame.
//
// Position model (seat-relative, as on the server): 0 home, 1-40 the main
// track (global field (seat * 10 + position - 1) % 40), 41-44 the seat's
// target lane.
class Pawn {
  constructor(startingPlace, color, seat) {
    this.id = 'id-' + startingPlace + seat;
    this.seat = seat;
    this.startingPlace = startingPlace;
    this.color = color;
    this.startingGlobalPosition = seat * 10;
    this.position = 0;
    this.globalPosition = this.startingGlobalPosition;
    this.isInDestinationField = false;
    // Clickable this turn (a legal pawn from DICE_RESULT).
    this.isActive = false;
    this.isMoving = false;
    this.activeMoveTimeout = null;
    // Presentation hints for App.vue: this hop lands on a Capture (the mesh
    // stops beside the victim), or isn't the move's last, so another pawn on
    // the field is being passed (hop onto it instead of through).
    this.landingOnCapture = false;
    this.passingStep = false;
  }

  positionToGlobalPosition(position) {
    if (!position) {
      return this.startingGlobalPosition;
    }
    // The target lane hangs off the last track field.
    return (this.startingGlobalPosition + Math.min(position, 40) - 1) % 40;
  }

  // Teleports to `position` (snapshots, no tween).
  placeAt(position) {
    this.stopMove();
    this.position = position;
    this.globalPosition = this.positionToGlobalPosition(position);
    this.isInDestinationField = position > 40;
    this.isActive = false;
  }

  // Sent home by a Capture.
  returnHome() {
    this.placeAt(0);
  }

  stopMove() {
    if (this.activeMoveTimeout) {
      clearTimeout(this.activeMoveTimeout);
      this.activeMoveTimeout = null;
    }
    this.isMoving = false;
    this.landingOnCapture = false;
    this.passingStep = false;
  }

  // Plays the server's move from the current position to `toPos`: leaving
  // home is one hop onto the start field, anything else one hop per field.
  // `victims` (Pawns) are sent home once the last hop lands, as one
  // pawn.captured event so App.vue plays a single Finisher for them all.
  // `onDone` runs when the move has finished showing.
  play(toPos, victims = [], onDone = () => {}) {
    this.stopMove();
    const hops = [];
    for (let position = this.position === 0 ? 1 : this.position + 1; position <= toPos; position += 1) {
      hops.push(position);
    }
    if (!hops.length) {
      onDone();
      return;
    }
    this.isMoving = true;

    const hop = (index) => {
      this.landingOnCapture = victims.length > 0 && index === hops.length - 1;
      this.passingStep = index < hops.length - 1;
      const position = hops[index];
      this.position = position;
      this.globalPosition = this.positionToGlobalPosition(position);
      this.isInDestinationField = position > 40;

      this.activeMoveTimeout = window.setTimeout(() => {
        if (index < hops.length - 1) {
          hop(index + 1);
          return;
        }
        this.activeMoveTimeout = null;
        this.landingOnCapture = false;
        this.sendHome(victims);
        this.isMoving = false;
        this.passingStep = false;
        onDone();
      }, PAWN_STEP_DURATION_MS);
    };
    hop(0);
  }

  // A Capture is logically instant: the victims are home at once and only
  // their meshes wait for the Finisher (App.vue handleCaptured).
  sendHome(victims) {
    if (!victims.length) {
      return;
    }
    const sent = victims.map((victim) => {
      // World coordinates must be read before returnHome resets position.
      const { x, y, z } = victim.getCoordinates();
      victim.returnHome();
      return { pawnId: victim.id, color: victim.color, x, y, z };
    });
    EventBus.fire(EventKeys.pawn.captured, { attackerId: this.id, victims: sent });
  }

  // Pass `target` to reuse an object instead of allocating — the render loop
  // calls this per pawn per frame.
  getCoordinates(height = 0, target = null) {
    return this.getCoordinatesAt(this.position, height, target);
  }

  // Where this pawn would stand at `position` (0 home, 1-40 track, 41-44
  // target lane) — App.vue uses it to face the next field.
  getCoordinatesAt(position, height = 0, target = null) {
    const fields = ApplicationStore.fields;
    let field;
    if (!position) {
      field = fields.home[this.seat].fields[this.startingPlace - 1];
    } else if (position <= 40) {
      field = fields.path[this.positionToGlobalPosition(position)];
    } else {
      field = fields.target[this.seat].fields[position - 41];
    }

    if (target) {
      target.x = field.x;
      target.y = height;
      target.z = field.z;
      return target;
    }
    return { x: field.x, y: height, z: field.z };
  }
}

export default Pawn;
