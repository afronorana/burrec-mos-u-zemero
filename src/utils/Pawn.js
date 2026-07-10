import ApplicationStore from './ApplicationStore';
import EventBus from './eventhandler';
import EventKeys from './EventKeys';
import { PAWN_STEP_DURATION_MS } from './movementConstants';

class Pawn {

  constructor(_startingPlace, _color, _globalPosition = 0, _playerIndex) {
    this.id = 'id-' + _startingPlace + _playerIndex;
    this.position = 0;
    this.playerIndex = _playerIndex;
    this.globalPosition = _globalPosition;
    this.startingGlobalPosition = _globalPosition;
    this.color = _color;
    this.isActive = false;
    this.isInDestinationField = false;
    this.isSkipping = false;
    this.isSkippingTo = 0;
    this.startingPlace = _startingPlace;
    this.isMoving = false;
    this.activeMoveTimeout = null;
  }

  /**
   * Attempt to move pawn
   */
  move() {
    if (!this.isActive || this.isMoving) {
      return;
    }

    this.lockMoveSelection();
    this.isMoving = true;
    this.position ? this.moveToPosition() : this.getOutOfHome();
  }

  getOutOfHome() {
    this.runMoveSequence(
        [{
          position: 1,
          globalPosition: this.startingGlobalPosition,
          isInDestinationField: false,
        }],
        {
          captureField: this.startingGlobalPosition,
        },
    );
  }

  endOfMove() {
    this.isMoving = false;
    this.activeMoveTimeout = null;

    if (ApplicationStore.online.enabled) {
      // Online, turn advancement comes only from the server's TURN_CHANGE.
      EventBus.fire(EventKeys.pawn.moveComplete, { pawnId: this.id });
      return;
    }

    const owner = ApplicationStore.players[this.playerIndex];
    if (owner && owner.wonGame()) {
      EventBus.fire(EventKeys.game.won, { playerIndex: this.playerIndex });
      return;
    }

    if (ApplicationStore.lastRolledDice === 6)
      EventBus.fire(EventKeys.turns.repeatTurn);
    else
      EventBus.fire(EventKeys.turns.endTurn);
  }

  moveToPosition() {
    const steps = ApplicationStore.lastRolledDice;
    const states = [];

    for (let index = 1; index <= steps; index += 1) {
      const nextPosition = this.position + index;
      const isInDestinationField = nextPosition > 40;

      states.push({
        position: nextPosition,
        globalPosition: isInDestinationField
          ? this.positionToGlobalPosition(40)
          : this.positionToGlobalPosition(nextPosition),
        isInDestinationField,
      });
    }

    const finalState = states[states.length - 1];

    this.runMoveSequence(states, {
      captureField: finalState.position <= 40 ? finalState.globalPosition : null,
    });
  }

  toGlobalPosition() {
    return this.positionToGlobalPosition(this.position);
  }

  //
  //  Non-refractored below
  //
  getPosition(height = 0) {
    const { x, y, z } = this.getCoordinates(height);
    return `${x} ${y} ${z}`;
  }

  getCoordinates(height = 0) {
    let x, y, z;
    let fields = ApplicationStore.fields;
    if (!this.position) {
      x = fields.home[this.playerIndex].fields[this.startingPlace - 1].x;
      y = height;
      z = fields.home[this.playerIndex].fields[this.startingPlace - 1].z;
    } else if (this.position <= 40) {
      const globalPosition = this.positionToGlobalPosition(this.position);
      x = fields.path[globalPosition].x;
      y = height;
      z = fields.path[globalPosition].z;
    } else if (this.position > 39) {
      x = fields.target[this.playerIndex].fields[this.position - 41].x;
      y = height;
      z = fields.target[this.playerIndex].fields[this.position - 41].z;
    }

    return { x, y, z };
  }

  // Returns pawn classes
  classes() {
    return [
      this.isSkipping ? 'is-skipping' : '',                            // TODO Skip animation
    ];
  }

  // Returns pawn home (Triggered by other players)
  returnHome() {
    if (this.activeMoveTimeout) {
      clearTimeout(this.activeMoveTimeout);
      this.activeMoveTimeout = null;
    }

    this.isMoving = false;
    this.position = 0;
    this.globalPosition = this.startingGlobalPosition;
    this.isInDestinationField = false;
    this.isActive = false;
  }

  canLeaveHome(steps) {
    let doorIsFree = true;
    let player = ApplicationStore.players[ApplicationStore.playingPlayerIndex];

    player.pawns.forEach(function(pawn) {
      if (pawn.position === 1) doorIsFree = false;
    });

    return this.position === 0 && steps === 6 && doorIsFree;
  };

  pathEnds(steps) {
    return this.position + steps >= 45;
  }

  targetFieldIsEmpty(steps) {
    if (this.position === 0) return false;

    let targetFieldId = this.position + steps;
    let targetFieldIsEmpty = true;
    let player = ApplicationStore.players[ApplicationStore.playingPlayerIndex];

    player.pawns.forEach((pawn) => {
      if (pawn !== this && pawn.position === targetFieldId) {
        targetFieldIsEmpty = false;
      }
    });

    return targetFieldIsEmpty;
  }

  isAvaliable(steps) {

    return (this.canLeaveHome(steps) || this.targetFieldIsEmpty(steps)) &&
        !this.pathEnds(steps);
  }

  // Adds and removes skipping state
  skippingAnimation(targetIndex) {
    this.isSkippingTo = targetIndex;
    this.isSkipping = true;
    setTimeout(function() {
      this.isSkipping = false;
    }.bind(this), 100);
  }

  // Checks if an opponents pawn is on the target, if so removes it.
  // (Win detection lives in endOfMove / the server — not here.)
  removeOpponentPawns(targetField) {
    ApplicationStore.players.forEach(function(player) {
      if (!player.isPlaying) {
        player.pawns.forEach(function(pawn) {
          if (pawn.position !== 0 && pawn.globalPosition === targetField && !pawn.isInDestinationField) {
            pawn.returnHome();
          }
        });
      }
    });
  }

  enterDestinationZone(steps) {
    this.isInDestinationField = true;
    this.position += steps;
    this.globalPosition = -13 * this.startingGlobalPosition;
    this.endOfMove();
  }

  positionToGlobalPosition(position) {
    if (!position) {
      return this.startingGlobalPosition;
    }

    return (this.startingGlobalPosition + position - 1) % 40;
  }

  lockMoveSelection() {
    const currentPlayer = ApplicationStore.players[ApplicationStore.playingPlayerIndex];

    ApplicationStore.gamePlayStatus.isMoving = false;

    currentPlayer?.pawns.forEach((pawn) => {
      pawn.isActive = false;
    });
  }

  applyMoveState(state, stepIndex) {
    this.position = state.position;
    this.globalPosition = state.globalPosition;
    this.isInDestinationField = state.isInDestinationField;
    this.skippingAnimation(stepIndex);
  }

  runMoveSequence(states, options = {}) {
    const { captureField = null } = options;

    if (!states.length) {
      this.endOfMove();
      return;
    }

    const applyStep = (index) => {
      this.applyMoveState(states[index], index);

      if (index < states.length - 1) {
        this.activeMoveTimeout = window.setTimeout(() => {
          applyStep(index + 1);
        }, PAWN_STEP_DURATION_MS);
        return;
      }

      this.activeMoveTimeout = window.setTimeout(() => {
        if (captureField !== null) {
          this.removeOpponentPawns(captureField);
        }

        this.endOfMove();
      }, PAWN_STEP_DURATION_MS);
    };

    applyStep(0);
  }

}

export default Pawn;
