class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        this.isPlaying = false;
        this.avaliablePawnsIndexes = [];
        this.pawns = [
            new Pawn(1, _color, (_turn - 1) * 10),
            new Pawn(2, _color, (_turn - 1) * 10),
            new Pawn(3, _color, (_turn - 1) * 10),
            new Pawn(4, _color, (_turn - 1) * 10)
        ];

        this.stillHome = true;
        this.stillHomeCounter = 0;
    }

    startTurn() {
        ApplicationStore.gamePlayStatus.isRolling = true;
        this.isPlaying = true;
    }

    endTurn() {
        this.isPlaying = false;
        this.pawns.forEach(function (pawn) {
            pawn.isActive = false;
        });
    }

    pawnsAvailable() {
        return this.avaliablePawnsIndexes.length;
    }

    rollDice(diceResult) {
        ApplicationStore.lastRolledDice = diceResult;

        this.setAvaliablePawns(diceResult);

        /** Check if player has available pawns **/
        if (this.pawnsAvailable() != 0 || this.stillHome ) {

            if (this.stillHome && diceResult != 6) {
                /** If all pawns home, roll dice 3 times **/

                this.stillHomeCounter++;
                if (this.stillHomeCounter >= 3) {
                    EventBus.fire(EventKeys.turns.endTurn);
                    this.stillHomeCounter = 0;
                }
            } else {
                ApplicationStore.gamePlayStatus.isRolling = false;
                ApplicationStore.gamePlayStatus.isMoving = true;
                this.stillHome = false;

                if (this.pawnsAvailable() == 1) {
                    this.movePawnAutomatically();
                }
            }
        } else {
            /** If no pawns available **/
            EventBus.fire(EventKeys.turns.endTurn);
        }
    }

    movePawnAutomatically() {
        this.pawns.forEach(function (pawn) {

             if(pawn.isActive) {
                 pawn.move();
             }
        });
    }

    hasAllPawnsHome() {
        this.pawns.every(function (pawn) {
            pawn.position = 0;
        })
    }


    /** Returns array of all avaliable pawns. */
    setAvaliablePawns(steps) {
        this.avaliablePawnsIndexes = [];

        this.pawns.forEach(function (pawn, index) {
            if (pawn.isAvaliable(steps)) {
                this.avaliablePawnsIndexes.push(index);
                pawn.isActive = true;
            }
        }.bind(this));
    }

    pawnPositions() {
        let pawnGlobalPositions = [];
        this.pawns.forEach(function (pawn) {
            pawnGlobalPositions.push(pawn.globalPosition);
        });
        return pawnGlobalPositions;
    }

    didWin() {
        let pawnsInTarget = [];


        this.pawns.forEach(function (pawn, index) {
            if (pawn.isInTargetField) {
                pawnsInTarget.push(index);
            }
        }.bind(this));

        return pawnsInTarget.length == 4;
    }


}


module.exports = Player;