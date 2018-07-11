class Pawn {

    constructor(_startingPlace, _color, _globalPosition = 0) {
        this.position = 0;
        this.globalPosition = _globalPosition;
        this.startingGlobalPosition = _globalPosition;
        this.color = _color;
        this.isActive = false;
        this.startingPlace = _startingPlace;
        this.isInTargetField = false;
    }

    targetPositionClassName() {
        if (this.position < 40)
            return '';
        let playerTurn = this.startingGlobalPosition / 10;
        return 'field-target-' + (this.position - 39 + (playerTurn * 4));
    }

    classes() {
        return [
            this.globalPosition >= 0 ? 'field-' + this.globalPosition : '',         // Position on playing fields
            this.targetPositionClassName(),         // Position on target
            this.isActive ? 'is-avaliable' : '',      // Availability
            this.color                              // Color
        ]
    }

    returnHome() {
        this.position = 0;
        this.globalPosition = this.startingGlobalPosition;
    }

    canLeaveHome(steps) {
        let canLeave = true;

        ApplicationStore.players.forEach(function (player) {
            if (player.isPlaying) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.globalPosition == this.startingGlobalPosition + 1) {
                        canLeave = false;
                    }
                }.bind(this));
            }
        }.bind(this));
        return this.position == 0 && steps == 6 && canLeave;
    };

    pathEnds(steps) {
        return this.position + steps >= 44
    }

    targetFieldIsEmpty(steps) {
        if (this.position == 0) return false;

        let targetFieldId = this.position + steps;
        let targetFieldIsFree = true;

        ApplicationStore.players.forEach(function (player) {
            if (player.isPlaying) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.position == targetFieldId) {
                        targetFieldIsFree = false;
                    }
                });
            }
        });
        return targetFieldIsFree;
    };

    isAvaliable(steps) {
        let self = this;
        return (self.canLeaveHome(steps) || this.targetFieldIsEmpty(steps)) && !self.pathEnds(steps);
    }

    move() {
        //If not active is home
        if (!this.isActive) return;

        let steps = ApplicationStore.lastRolledDice;

        if (this.position == 0) {
            /** If pawn is home **/
            this.globalPosition = this.startingGlobalPosition + 1;
            this.position = 1;

        } else if (this.position + steps >= 40) {

            /** If pawn is close to ending **/
            this.isInTargetField = true;
            this.position += steps;
            this.globalPosition = -13 * this.startingGlobalPosition;

        } else {

            let globalPosition = this.globalPosition + steps;
            this.globalPosition = globalPosition <= 39 ? globalPosition : globalPosition - 40;
            this.position += steps;

        }

        /** Check if there is an opponents pown on the target, if so, remove it. **/
        ApplicationStore.players.forEach(function (player) {
            if (!player.isPlaying) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.globalPosition == this.globalPosition && !pawn.isInTargetField) {
                        pawn.returnHome();
                    }
                }.bind(this));
            } else if (player.didWin()) {
                alert('congrats:' + player.name + '! You WON!!!');
            }
        }.bind(this));

        if (steps == 6) {
            EventBus.fire(EventKeys.turns.repeatTurn);
        } else {
            EventBus.fire(EventKeys.turns.endTurn);
        }
    }

}

module.exports = Pawn;