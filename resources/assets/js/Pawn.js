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
    this.startingPlace = _startingPlace;
  }

  // Generate target class name
  targetPositionClassName() { // TODO
    if (this.position < 40) return ;
    let playerTurn = this.startingGlobalPosition / 10;
    return 'field-target-' + (this.position - 39 + (playerTurn * 4));
  }


  targetPosition() { // TODO
    let playerTurn = this.startingGlobalPosition / 10;
    return (this.position - 39 + (playerTurn * 4) -1);
  }

  getPosition(height) {
    if (!this.position) {
      return `${ApplicationStore.fields.home[this.playerIndex].fields[this.startingPlace -
      1].x} ${height} ${ApplicationStore.fields.home[this.playerIndex].fields[this.startingPlace -
      1].z}`;

    }
    else if (this.position <= 40){
      return `${ApplicationStore.fields.path[this.globalPosition].x} ${height} ${ApplicationStore.fields.path[this.globalPosition].z}`;
    }
    else if (this.position > 40){

      return `${ApplicationStore.fields.target[this.playerIndex].fields[this.targetPosition()].x} ${height} ${ApplicationStore.fields.target[this.playerIndex].fields[this.targetPosition()].z}`;
    }

  }

  // Returns pawn classes
  classes() {
    return [
      this.globalPosition >= 0 ? 'field-' + this.globalPosition : '',  // Position on playing fields
      this.targetPositionClassName(),                                  // TODO Position on target
      this.isActive ? 'is-avaliable' : '',                             // Availability
      this.color,                                                      // Color
      this.isSkipping ? 'is-skipping' : '',                            // TODO Skip animation
    ];
  }

  // Returns pawn home (Triggered by other players)
  returnHome() {
    this.position = 0;
    this.globalPosition = this.startingGlobalPosition;
  }

  canLeaveHome(steps) {
    let canLeave = true;

    ApplicationStore.players.forEach(function(player) {

      if (player.isPlaying) {
        player.pawns.forEach(function(pawn) {
          if (pawn.globalPosition === this.startingGlobalPosition + 1) {
            canLeave = false;
          }
        }.bind(this));
      }

    }.bind(this));
    return this.position === 0 && steps === 6 && canLeave;
  };

  pathEnds(steps) {
    return this.position + steps >= 44;
  }

  targetFieldIsEmpty(steps) {

    if (this.position === 0) return false;

    let targetFieldId = this.position + steps;
    let targetFieldIsFree = true;

    ApplicationStore.players.forEach(function(player) {
      if (player.isPlaying) {
        player.pawns.forEach(function(pawn) {
          if (pawn.position === targetFieldId) {
            targetFieldIsFree = false;
          }
        });
      }
    });
    return targetFieldIsFree;
  };

  isAvaliable(steps) {
    let self = this;
    return (self.canLeaveHome(steps) || this.targetFieldIsEmpty(steps)) &&
        !self.pathEnds(steps);
  }

  // Adds and removes skipping state
  skippingAnimation() {
    this.isSkipping = true;
    setTimeout(function() {
      this.isSkipping = false;
    }.bind(this), 100);
  }

  // Checks if an opponents pawn is on the target, if so removes it.
  checkIfTargetfieldEmpty(targetField) {
    ApplicationStore.players.forEach(function(player) {
      if (!player.isPlaying) {
        player.pawns.forEach(function(pawn) {
          if (pawn.globalPosition === targetField && !pawn.isInTargetField) {
            pawn.returnHome();
          }
        });
      } else if (player.wonGame()) {
        alert('congrats:' + player.name + '! You WON!!!');
      }
    });
  }

  getOutOfHome(steps) {
    this.globalPosition = this.startingGlobalPosition;
    this.position = 1;
    this.endOfMove(steps);
  }

  enterTargetZone(steps) {
    this.isInTargetField = true;
    this.position += steps;
    this.globalPosition = -13 * this.startingGlobalPosition;
    this.endOfMove(steps);
  }

  moveToPosition(steps) {

    let targetSum = this.globalPosition + steps;
    let targetField = targetSum <= 39 ? targetSum : targetSum - 40;

    this.checkIfTargetfieldEmpty(targetField);

    let steppingIndex = this.globalPosition;

    let skippingInterval = setInterval(function() {

      this.skippingAnimation();

      if ((steppingIndex < targetField && steppingIndex <= 39) ||
          (targetSum > 40 && steppingIndex < 40) ||
          (targetSum == 40 && steppingIndex <= 39)) {
        steppingIndex++;
        this.globalPosition = steppingIndex;
        if (steppingIndex == targetField) {
          this.endOfMove(steps);
          clearInterval(skippingInterval);
        }
      } else if (targetSum >= 40 && steppingIndex == 40) {
        steppingIndex = 0;
        this.globalPosition = steppingIndex;
        if (targetSum == 40)
          clearInterval(skippingInterval);
      } else {
        console.log('Guess I missed something here!');
        this.endOfMove(steps);
        clearInterval(skippingInterval);
      }
    }.bind(this), 200);
    this.position += steps;
  }

  move() {
    //If not active is home
    if (!this.isActive) return;

    let steps = ApplicationStore.lastRolledDice;

    if (this.position == 0) { // If pawn is home
      this.getOutOfHome(steps);
    } else if (this.position + steps >= 40) { // If pawn is close to ending
      this.enterTargetZone(steps);
    } else {

      this.moveToPosition(steps);
    }
  }

  endOfMove(steps) {
    if (steps == 6) {
      EventBus.fire(EventKeys.turns.repeatTurn);
    } else {
      EventBus.fire(EventKeys.turns.endTurn);
    }
  }
}

module.exports = Pawn;