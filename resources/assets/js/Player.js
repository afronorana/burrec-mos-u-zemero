class Player {
    constructor(_name, _color, _turn) {
        this.turn = _turn;
        this.name = _name;
        this.color = _color;
        this.pawns = [new Pawn(1), new Pawn(2), new Pawn(3), new Pawn(4)];
    }

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