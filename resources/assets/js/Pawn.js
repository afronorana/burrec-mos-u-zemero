class Pawn {
    constructor(_startingPlace) {
        this.position = 0;
        this.globalPosition = 4;
        this.isFinished = false;
        this.startingPlace = _startingPlace;
        this.animations = {
            isSkipping: false,
            isKnocked: false
        }
    }

    isHome() {
        return this.position == 0;
    }

    isAvaliable(steps) {
        return (
            this.selfPosition + steps <= 40 &&
            this.selfPosition + steps
        )

    }

}

module.exports = Pawn;