class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        this.color = _color;
        this.pawns = [new Pawn(1, _color), new Pawn(2, _color, 3), new Pawn(3, _color), new Pawn(4, _color)];
    }

    /** Returns array of all avaliable pawns. */
    getAvaliablePawns(steps) {
        let avaliablePawns = [];

        this.pawns.forEach(function (pawn) {
            if (pawn.isAvaliable(steps)) {
                avaliablePawns.push(pawn);
            }
        });

        return avaliablePawns;
    }


}


module.exports = Player;