class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        this.color = _color;
        this.isPlaying = false;
        this.avaliablePawnsIndexes = [];
        this.pawns = [new Pawn(1, _color, (_turn - 1) * 10), new Pawn(2, _color, (_turn - 1) * 10), new Pawn(3, _color, (_turn - 1) * 10), new Pawn(4, _color, (_turn - 1) * 10)];

        this.stillHome = true;
        this.stillHomeCounter = 0;
    }

    startTurn() {
        console.log('startTurn');
        ApplicationStore.currentPlayer = this;
        ApplicationStore.gamePlayStatus.isRolling = true;

        this.isPlaying = true;
    }

    rollDice() {

        let diceResult = 1 + Math.floor(Math.random() * 6);
        console.log(diceResult);
        ApplicationStore.lastRolledDice = diceResult;

        this.setAvaliablePawns(diceResult);

        /** Check if player has available pawns **/
        if (!this.avaliablePawnsIndexes.length) {
            console.log(ApplicationStore.currentRound, 'ApplicationStore.currentRound ');

            if (this.stillHome && diceResult != 6) {
                this.stillHomeCounter++;
                console.log('this.stillHomeCounter', this.stillHomeCounter);
                if (this.stillHomeCounter < 3) {
                } else {
                    EventBus.fire(EventKeys.turns.endTurn);
                    this.stillHomeCounter = 0;
                }
            } else {
                this.stillHome = false;
                EventBus.fire(EventKeys.turns.endTurn);
            }
        } else {

            ApplicationStore.gamePlayStatus.isRolling = false;
            ApplicationStore.gamePlayStatus.isMoving = true;

        }
    }

    hasAllPawnsHome() {
        console.log('hasAllPawnsHome');
        this.pawns.every(function (pawn) {
            pawn.position = 0;
        })
    }

    endTurn() {
        console.log('endTurn');
        this.isPlaying = false;

        this.pawns.forEach(function (pawn) {
            pawn.isActive = false;
        });

    }

    /** Returns array of all avaliable pawns. */
    setAvaliablePawns(steps) {
        console.log('setAvaliablePawns');
        this.avaliablePawnsIndexes = [];
        this.pawns.forEach(function (pawn, index) {
            if (pawn.isAvaliable(steps)) {
                this.avaliablePawnsIndexes.push(index)
                pawn.isActive = true;
            }
        }.bind(this));
    }


}


module.exports = Player;