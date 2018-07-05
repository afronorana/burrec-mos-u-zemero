class Pawn {

    constructor(_startingPlace, _color, _globalPosition = 0) {

        this.startingGlobalPosition = _globalPosition + 37 <= 39 ? _globalPosition  + 37 : _globalPosition  + 37- 40;
        this.globalPosition = _globalPosition + 37 <= 39 ? _globalPosition  + 37 : _globalPosition  + 37- 40;

        this.color = _color;
        this.position = 37;
        // this.startingGlobalPosition = _globalPosition;
        // this.globalPosition = _globalPosition;
        this.isActive = false;
        this.startingPlace = _startingPlace;

        // this.id = _id;
        // this.isFinished = false;
        // this.animations = {
        //     isSkipping: false,
        //     isKnocked: false
        // };
    }

    returnHome() {
        this.position = 0;
        this.globalPosition = this.startingGlobalPosition;
    }

    canLeaveHome(steps) {
        let canLeave = true;

        ApplicationStore.players.forEach(function (player) {
            player.pawns.forEach(function (pawn) {
                if (pawn.globalPosition == this.startingGlobalPosition + 1 && player.isPlaying) {
                    canLeave = false;
                }
            }.bind(this));
        }.bind(this));
        return this.position == 0 && steps == 6 && canLeave;
    };

    isAvaliable(steps) {
        let self = this;



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

        return self.canLeaveHome(steps) || targetFieldIsEmpty();
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