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
            let canLeave = true;

            ApplicationStore.players.forEach(function (player) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.globalPosition == self.startingGlobalPosition + 1 && player.isPlaying) {
                        canLeave = false;
                    }
                });
            });
            return self.position == 0 && steps == 6 && canLeave;
        };

        // console.log(self.id, 'pawnCanLeaveHome', pawnCanLeaveHome());

        /*** Check if target field has pawn of the same color ***/
        let targetFieldIsEmpty = function () {
            if (self.position == 0) return false;

            let finalTarget = self.globalPosition + steps; // 23
            let targetFieldId = finalTarget <= 39 ? finalTarget : finalTarget - 40;  // 23

            let targetFieldIsFree = true;

            ApplicationStore.players.forEach(function (player) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.globalPosition == targetFieldId && player.isPlaying) {
                        targetFieldIsFree = false;
                    }
                });
            });

            return targetFieldIsFree;
        };

        // Pawn doesn't skip another pawn inside ending arena.

        return pawnCanLeaveHome() || targetFieldIsEmpty();
    }

    move() {
        if (!this.isActive) return;

        if (this.position == 0) {
            this.globalPosition = this.startingGlobalPosition + 1;
            this.position = 1;
        } else {
            let globalPosition = this.globalPosition + ApplicationStore.lastRolledDice;
            this.globalPosition = globalPosition <= 39 ? globalPosition : globalPosition - 40;
            this.position += this.position + ApplicationStore.lastRolledDice;
        }

        ApplicationStore.players.forEach(function (player) {
            if (!player.isPlaying) {
                player.pawns.forEach(function (pawn) {
                    if (pawn.globalPosition == this.globalPosition) {
                        pawn.returnHome();
                    }
                }.bind(this));
            }
        }.bind(this));

        EventBus.fire(EventKeys.turns.endTurn);

    }

}

module.exports = Pawn;