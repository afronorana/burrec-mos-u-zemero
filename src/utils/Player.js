import ApplicationStore from './ApplicationStore';
import EventBus from './eventhandler';
import EventKeys from './EventKeys';
import Pawn from './Pawn';

class Player {
  // controller: 'local' (this human, this client) | 'ai' (local computer)
  //           | 'remote' (online opponent — driven only by server events)
  constructor(_name, _color, _turn, _controller = 'ai') {
    this.index = _turn - 1;
    this.controller = _controller;
    this.turn = _turn;
    this.name = _name;
    this.isPlaying = false;
    this.avaliablePawnsIndexes = [];
    this.color = _color;
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
      setTimeout(() => {
        EventBus.fire(EventKeys.rollDice);
      }, 800);
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

  get isComputer() {
    return this.controller === 'ai';
  }

  rollDice(diceResult) {
    ApplicationStore.lastRolledDice = diceResult;

    if (ApplicationStore.online.enabled) {
      this.applyServerDiceResult(diceResult);
      return;
    }

    this.setAvaliablePawns(diceResult);

    /** Check if player has available pawns **/
    if (this.pawnsAvailable() !== 0 || this.stillHome) {

      /** If all pawns home, roll dice 3 times **/
      if (this.stillHome && diceResult !== 6) {
        ApplicationStore.gamePlayStatus.isRolling = true;
        ApplicationStore.gamePlayStatus.isMoving = false;

        this.stillHomeCounter++;

        if (this.stillHomeCounter >= 3) {
          ApplicationStore.gamePlayStatus.isRolling = false;
          EventBus.fire(EventKeys.turns.endTurn);
          this.stillHomeCounter = 0;
        } else if (this.isComputer) {
          setTimeout(() => {
            EventBus.fire(EventKeys.rollDice);
          }, 1200);
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

  // Online mode is presentation-only: pawn availability comes from the
  // server's DICE_RESULT and turn flow from TURN_CHANGE — never decided here.
  applyServerDiceResult(diceResult) {
    const pending = ApplicationStore.online.pendingDice;
    const legal = pending && pending.value === diceResult ? (pending.legalPawns || []) : [];

    this.avaliablePawnsIndexes = legal.slice();
    this.pawns.forEach((pawn, index) => {
      pawn.isActive = legal.indexOf(index) !== -1;
    });

    if (legal.length) {
      ApplicationStore.gamePlayStatus.isRolling = false;
      ApplicationStore.gamePlayStatus.isMoving = true;
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

  // AI only — humans always pick their pawn themselves, even when a single
  // move is legal.
  movePawnAutomatically() {
    if (ApplicationStore.online.enabled) {
      return;
    }

    if (this.isComputer) {
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
    return this.pawns.every(function(pawn) {
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

    return pawnsInDestination.length === 4;
  }

  setComputer(_isComputer) {
    this.controller = _isComputer ? 'ai' : 'local';
  }

}

export default Player;
