class Pawn {
    constructor(_startingPlace) {
        this.selfPosition = 0;
        this.globalPosition = 0;
        this.isFinished = false;
        this.startingPlace = _startingPlace;
        this.animations = {
            isSkipping: false,
            isKnocked: false
        }
    }

    isAvaliable(steps) {
        return (
            this.selfPosition + steps <= 40 &&
            this.selfPosition + steps
        )

    }

}

module.exports = Pawn;