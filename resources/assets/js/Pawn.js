class Pawn {
    constructor(_startingPlace, _color, _globalPosition = 0) {
        this.color = _color;
        this.position = 0;
        this.globalPosition = _globalPosition;
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
        let self = this;

        /*** Check if pawn is home and dice rolled to 6 ***/
        let pawnIsHome = function () {
            if (this.position == 0 && steps == 6)
                return true;
        };

        /*** Check if target field has pawn of the same color ***/
        let targetFieldTaken = function () {
            let targetFieldId = self.globalPosition + steps;
            let targetField = ApplicationStore.steppingFields[targetFieldId];

            if (targetField.hasPawn != false) {
                return targetField.hasPawn.color == self.color;
            }
            return false
        };

        // Pawn doesn't skip another pawn inside ending arena.

        return pawnIsHome && !targetFieldTaken;
    }

}

module.exports = Pawn;