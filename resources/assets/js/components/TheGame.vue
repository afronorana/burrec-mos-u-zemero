<template>
    <div>
        <div class="board">

            <player-homes></player-homes>

            <stepping-fields :stepping-fields="steppingFields"></stepping-fields>

            <div class="player-pawns" style="color: #fff"
                 v-for="player in store.players"
            >
                <a href="javascript:void(0);"
                   class="pawn-figure"
                   v-for="pawn in player.pawns"
                   v-show="pawn.position != 0"
                   :class="[
                   'field-' + pawn.globalPosition,
                   player.isPlaying && pawn.isActive? 'is-avaliable': '',
                   pawn.color
                   ]"
                   @click="pawn.move()"
                >
                    {{pawn.startingPlace}}
                </a>
            </div>

        </div>


        <the-dice></the-dice>


    </div>
</template>
<script>
    export default {
        props: ['steppingFields'],
        components: {},
        mounted() {
            this.$nextTick(function () {
                this.createPlayers();
                this.fillSteppingFields();
                this.startGame();

                EventBus.listen(EventKeys.turns.endTurn, function () {
                    this.changePlayersTurn();
                }.bind(this));

            }.bind(this));
        },
        data() {
            return {
                store: window.ApplicationStore,
            }
        },
        events: {},

        methods: {

            rollDice() {
                if (!this.store.gamePlayStatus.isRolling) return;
                this.store.players[this.store.currentPlayerId].rollDice();
            },

            createPlayers() {
                this.store.players.push(new Player('Jon Doe', 'red', 1));
                this.store.players.push(new Player('Jane Doe', 'yellow', 2));
                this.store.players.push(new Player('Filan Fisteku', 'blue', 3));
                this.store.players.push(new Player('Filane Fisteku', 'green', 4));
            },

            fillSteppingFields() {
                for (let field = 1; field <= 40; field++) {
                    this.steppingFields.push({
                        hasPawn: false,
                    })
                }
            },

            startGame() {
                this.store.currentRound = 1;
                this.changePlayersTurn();
            },

            changePlayersTurn() {
                ApplicationStore.gamePlayStatus.isMoving = false;

                /** Check if its first round **/
                let currentPlayer = this.store.players[this.store.currentPlayerId];
                if (currentPlayer)
                    currentPlayer.endTurn();

                /** Set next player **/
                if (this.store.currentPlayerId == this.store.players.length - 1) {
                    this.store.currentPlayerId = 0;
                    this.store.currentRound++;
                } else {
                    this.store.currentPlayerId++;
                }

                this.store.players[this.store.currentPlayerId].startTurn();
            },


        }
    }
</script>
