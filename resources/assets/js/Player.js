class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        this.color = _color;
        this.isPlaying = false;

        this.pawns = [new Pawn(1, _color), new Pawn(2, _color, 3), new Pawn(3, _color), new Pawn(4, _color)];
    }

    startTurn() {
        ApplicationStore.currentPlayer = this;
        this.isPlaying = true;
    }

    endTurn() {
        this.isPlaying = false;

        this.pawns.forEach(function (pawn) {
            pawn.isActive = false;
        });

    }

    /** Returns array of all avaliable pawns. */
    setAvaliablePawns(steps) {
        this.pawns.forEach(function (pawn) {
            if (pawn.isAvaliable(steps)) {
                pawn.isActive = true;
            }
        });
    }


}


module.exports = Player;