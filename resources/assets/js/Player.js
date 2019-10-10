class Player {
  constructor(_name, _color, _turn, _isComputer = true) {
    this.index = _turn - 1;
    this.isComputer = _isComputer;
    this.turn = _turn;
    this.name = _name;
    this.isPlaying = false;
    this.avaliablePawnsIndexes = [];
    this.pawns = [
      new Pawn(1, _color, (_turn - 1) * 10, _turn - 1),
      new Pawn(2, _color, (_turn - 1) * 10, _turn - 1),
      new Pawn(3, _color, (_turn - 1) * 10, _turn - 1),
      new Pawn(4, _color, (_turn - 1) * 10, _turn - 1),
    ];
    this.indicatorIntervals = [];
    this.stillHome = true;
    this.stillHomeCounter = 0;
  }

  startTurn() {
    ApplicationStore.gamePlayStatus.isRolling = true;
    ApplicationStore.playingPlayerIndex = this.index;
    this.isPlaying = true;

    if (this.isComputer) {
      setTimeout(function() {
        EventBus.fire('EventKeys.rollDice');
      }.bind(this), 1000);
    }
  }

  endTurn() {
    this.indicatorIntervals.forEach(function(interval) {
      clearInterval(interval);
    });
    this.indicatorIntervals = [];

    this.isPlaying = false;
    ApplicationStore.playingPlayerIndex = null;
    this.pawns.forEach(function(pawn) {
      pawn.isActive = false;
    });
  }

  pawnsAvailable() {
    return this.avaliablePawnsIndexes.length;
  }

  rollDice(diceResult) {
    ApplicationStore.lastRolledDice = diceResult;

    this.setAvaliablePawns(diceResult);

    if (this.pawnsAvailable()) {
      this.indicatorIntervals.push(
          setInterval(function() {
            // let intensity = storeX.getters.flashIntensity ? 0 : 4;
            // storeX.commit('switchIntensity', intensity);
          }, 300),
      );
    }

    // console.log(this.name, ' rolled ', diceResult);

    /** Check if player has available pawns **/
    if (this.pawnsAvailable() !== 0 || this.stillHome) {

      /** If all pawns home, roll dice 3 times **/
      if (this.stillHome && diceResult !== 6) {

        this.stillHomeCounter++;

        if (this.stillHomeCounter >= 3) {
          EventBus.fire(EventKeys.turns.endTurn);
          this.stillHomeCounter = 0;
        } else if (this.isComputer) {
          // console.log ( 'Rollin again, still home' );
          setTimeout(function() {
            EventBus.fire('EventKeys.rollDice');
          }.bind(this), 2000);
        }

      } else if (this.stillHome && diceResult === 6 && this.isComputer) {

        ApplicationStore.gamePlayStatus.isRolling = false;
        ApplicationStore.gamePlayStatus.isMoving = true;
        this.stillHome = false;
        this.movePawnAutomatically();

      } else {
        ApplicationStore.gamePlayStatus.isRolling = false;
        ApplicationStore.gamePlayStatus.isMoving = true;
        this.stillHome = false;

        this.movePawnAutomatically();

        // if (this.isComputer) {
        //     this.movePawnAutomatically();
        // }
      }
    } else if (!this.pawnsAvailable()) {
      /** If no pawns available **/
      EventBus.fire(EventKeys.turns.endTurn);
    }
  }

  movePawnAutomatically() {
    if (this.pawnsAvailable() == 1 || this.isComputer) {
      let pawnMoved = false;
      this.pawns.forEach(function(pawn) {
        if (pawn.isActive && !pawnMoved) {
          pawn.move();
          pawnMoved = true;
        }
      });
    }
  }

  hasAllPawnsHome() {
    this.pawns.every(function(pawn) {
      return pawn.position === 0;
    });
  }

  /** Returns array of all avaliable pawns. */
  setAvaliablePawns(steps) {
    this.avaliablePawnsIndexes = [];

    this.pawns.forEach(function(pawn, index) {
      if (pawn.isAvaliable(steps)) {
        this.avaliablePawnsIndexes.push(index);
        pawn.isActive = true;
      }
    }.bind(this));
  }

  pawnPositions() {
    let pawnGlobalPositions = [];
    this.pawns.forEach(function(pawn) {
      pawnGlobalPositions.push(pawn.globalPosition);
    });
    return pawnGlobalPositions;
  }

  wonGame() {
    let pawnsInDestination = [];

    this.pawns.forEach(function(pawn, index) {
      if (pawn.isInDestinationField) {
        pawnsInDestination.push(index);
      }
    }.bind(this));

    return pawnsInDestination.length == 4;
  }

}

module.exports = Player;