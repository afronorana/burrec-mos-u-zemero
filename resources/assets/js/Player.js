class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        // this.color = _color;
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
                this.setAvaliablePawns(diceResult);
                // console.log ( this.name, 'got: ', diceResult, 'Choose pawn to move.' );
                ApplicationStore.gamePlayStatus.isRolling = false;
                ApplicationStore.gamePlayStatus.isMoving = true;

                this.stillHome = false;
                // console.log ( 'home nomore' );
                // EventBus.fire(EventKeys.turns.endTurn);
            }
        } else {
            /** If no pawns available **/
            EventBus.fire(EventKeys.turns.endTurn);
            // ApplicationStore.gamePlayStatus.isRolling = trie;
            // ApplicationStore.gamePlayStatus.isMoving = true;

        }
    }

    hasAllPawnsHome() {
        this.pawns.every(function (pawn) {
            pawn.position = 0;
        })
    }

    endTurn() {
        this.isPlaying = false;

        this.pawns.forEach(function (pawn) {
            pawn.isActive = false;
        });

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

        // console.log ( this.avaliablePawnsIndexes );
    }

    pawnPositions() {
        let pawnGlobalPositions = [];
        this.pawns.forEach(function (pawn) {
            pawnGlobalPositions.push(pawn.globalPosition);
        });
        return pawnGlobalPositions;
    }


}


module.exports = Player;