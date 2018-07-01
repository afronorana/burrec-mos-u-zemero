class Pawn {
    constructor(_startingPlace, _color, _globalPosition = 0) {
        this.color = _color;
        this.position = 0;
        this.globalPosition = _globalPosition;
        this.isFinished = false;
        this.isActive = false;
        this.startingPlace = _startingPlace;
        this.animations = {
            isSkipping: false,
            isKnocked: false
        };

    }


    isAvaliable(steps) {
        let self = this;

        /*** Check if pawn is home and dice rolled to 6 ***/
        let pawnIsHome = function () {
            return self.position == 0 && steps == 6;
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

        return pawnIsHome() && !targetFieldTaken();
    }

    move() {
        if (!this.isActive) return;

        console.log('%c Moving pawn: ', 'color: green');
        console.log('pawn globalPosition before movement: ', this.globalPosition);
        console.log('pawn position before movement: ', this.position);


        this.globalPosition += ApplicationStore.lastRolledDice;

        this.position += this.position + ApplicationStore.lastRolledDice;


        console.log('pawn globalPosition after movement: ', this.globalPosition);
        console.log('pawn position after movement: ', this.position);

        ApplicationStore.steppingFields[this.globalPosition].hasPawn = this;

        EventBus.fire(EventKeys.turns.endTurn);

    }

}

module.exports = Pawn;