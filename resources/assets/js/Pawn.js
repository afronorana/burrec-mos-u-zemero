class Pawn {

  constructor(_startingPlace, _color, _globalPosition = 0, _playerIndex) {
    this.id = 'id-' + _startingPlace + _playerIndex;
    this.position = 0;
    this.playerIndex = _playerIndex;
    this.globalPosition = _globalPosition;
    this.startingGlobalPosition = _globalPosition;
    this.color = _color;
    this.isActive = false;
    this.isInTargetField = false;
    this.isSkipping = false;
    this.isSkippingTo = 0;
    this.startingPlace = _startingPlace;
  }

  /**
   * Attempt to move pawn
   */
  move() {
    if (this.isActive) {
      this.position ? this.moveToPosition() : this.getOutOfHome();
    }
  }

  getOutOfHome() {
    this.globalPosition = this.startingGlobalPosition;
    this.position = 1;

    this.removeOpponentPawns(this.globalPosition);

    this.endOfMove();
  }

  endOfMove() {
    if (ApplicationStore.lastRolledDice === 6)
      EventBus.fire(EventKeys.turns.repeatTurn);
    else
      EventBus.fire(EventKeys.turns.endTurn);
  }

  moveToPosition() {
    let steps = ApplicationStore.lastRolledDice;

    //  TODO
    let willEnterTarget = this.position + steps >= 40;
    if (willEnterTarget) {
      this.enterTargetZone(steps);
      return;
    }

    let finalPosition = this.globalPosition + steps;
    let targetField = finalPosition <= 40 ? finalPosition : finalPosition - 40;  // 8

    this.removeOpponentPawns(targetField);

    let steppingIndex = this.globalPosition;

    let skippingInterval = setInterval(function() {

      this.skippingAnimation();

      if ((steppingIndex < targetField && steppingIndex <= 40) ||
          (finalPosition > 40 && steppingIndex < 40) ||
          (finalPosition === 40 && steppingIndex <= 39)) {

        steppingIndex++;

        this.globalPosition = steppingIndex;
        if (steppingIndex === targetField) {
          this.endOfMove();
          clearInterval(skippingInterval);
        }
      } else if (finalPosition >= 40 && steppingIndex === 40) {
        steppingIndex = 0;
        this.globalPosition = steppingIndex;
        if (finalPosition === 40)
          clearInterval(skippingInterval);
      } else {

        console.log('Guess I missed something here!');
        this.endOfMove();
        clearInterval(skippingInterval);
      }
    }.bind(this), 200);
    this.position += steps;

    console.log(this.position, 'toGlobalPosition', this.toGlobalPosition());
  }

  toGlobalPosition() {
    if (!this.position) return this.startingGlobalPosition;

    if (this.position + this.startingGlobalPosition <= 39)
      return this.position + this.startingGlobalPosition - 1;
    else {
      return this.startingGlobalPosition
          ? this.position + this.startingGlobalPosition - 41
          : this.position - 1;

    }
  }

  //
  //  Non-refractored below
  //

  getPosition(height = 0) {
    let x, y, z;
    let fields = ApplicationStore.fields;
    if (!this.position) {

      x = fields.home[this.playerIndex].fields[this.startingPlace - 1].x;
      y = height;
      z = fields.home[this.playerIndex].fields[this.startingPlace - 1].z;

    } else if (this.position <= 39) {

      if (this.globalPosition > 39) {
        x = fields.path[0].x;
        y = height;
        z = fields.path[0].z;

        console.log(`%c Lepuri: ${this.globalPosition}`,
            `color: ${this.color}`);
      } else {
        x = fields.path[this.globalPosition].x;
        y = height;
        z = fields.path[this.globalPosition].z;
      }

    } else if (this.position > 39) {
      x = fields.target[this.playerIndex].fields[this.position - 41].x;
      y = height;
      z = fields.target[this.playerIndex].fields[this.position - 41].z;
    }
    return `${x} ${y} ${z}`;
  }

  // Returns pawn classes
  classes() {
    return [
      this.isSkipping ? 'is-skipping' : '',                            // TODO Skip animation
    ];
  }

  // Returns pawn home (Triggered by other players)
  returnHome() {
    this.position = 0;
    this.globalPosition = this.startingGlobalPosition;
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
    return this.position + steps >= 44;
  }

  targetFieldIsEmpty(steps) {

    if (this.position === 0) return false;

    let targetFieldId = this.position + steps;
    let targetFieldIsEmpty = true;

    let player = ApplicationStore.players[ApplicationStore.playingPlayerIndex];

    player.pawns.forEach(function(pawn) {
      if (pawn.position === targetFieldId) targetFieldIsEmpty = false;
      if (pawn.position === 0 && this.startingGlobalPosition +
          1) targetFieldIsEmpty = false;
    });

    return targetFieldIsEmpty;
  };

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
  removeOpponentPawns(targetField) {
    ApplicationStore.players.forEach(function(player) {
      if (!player.isPlaying) {
        player.pawns.forEach(function(pawn) {
          if (pawn.globalPosition === 0) console.log ( pawn );
          if (pawn.globalPosition === targetField && !pawn.isInTargetField) {
            pawn.returnHome();
          }
        });

        //   TODO Check if my own pawn is here
      } else if (player.wonGame()) {
        alert('congrats:' + player.name + '! You WON!!!');
      }
    });
  }

  enterTargetZone(steps) {
    this.isInTargetField = true;
    this.position += steps;
    this.globalPosition = -13 * this.startingGlobalPosition;
    this.endOfMove();
  }

}

module.exports = Pawn;