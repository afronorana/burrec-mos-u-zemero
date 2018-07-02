class Pawn {
    constructor(_id, _startingPlace, _color, _globalPosition = 0) {
        this.id = _id;
        this.color = _color;
        this.position = 0;
        this.startingGlobalPosition = _globalPosition;
        this.globalPosition = _globalPosition;
        this.isFinished = false;
        this.isActive = false;
        this.startingPlace = _startingPlace;
        this.animations = {
            isSkipping: false,
            isKnocked: false
        };

    }

    returnHome() {
        this.position = 0;
        this.globalPosition = this.startingGlobalPosition;
    }

    isAvaliable(steps) {
        let self = this;

        /*** Check if pawn is home and dice rolled to 6 ***/
        let pawnCanLeaveHome = function () {
            return self.position == 0 && steps == 6
        };

        console.log(self.id, 'pawnCanLeaveHome', pawnCanLeaveHome());

        /*** Check if target field has pawn of the same color ***/
        let targetFieldIsEmpty = function () {
            if (self.position == 0) return false;

            let targetFieldId = self.globalPosition + steps;
            let targetField = ApplicationStore.steppingFields[targetFieldId];

            if (targetField.hasPawn != false) {
                if (targetField.hasPawn.color != self.color) {
                    targetField.hasPawn.returnHome();
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        };

        console.log('pawnCanLeaveHome', pawnCanLeaveHome());
        console.log('targetFieldIsEmpty', targetFieldIsEmpty());

        // Pawn doesn't skip another pawn inside ending arena.

        return pawnCanLeaveHome() || targetFieldIsEmpty();
    }

    move() {
        if (!this.isActive) return;

        ApplicationStore.steppingFields[this.globalPosition].hasPawn = false;

        if (this.position == 0) {
            this.globalPosition = this.startingGlobalPosition + 1;
            this.position = 1;
        } else {

            this.globalPosition += ApplicationStore.lastRolledDice;
            this.position += this.position + ApplicationStore.lastRolledDice;
        }


        ApplicationStore.steppingFields[this.globalPosition].hasPawn = this;

        EventBus.fire(EventKeys.turns.endTurn);

    }

}

module.exports = Pawn;