<template>
    <div>
<!--Board containing -->
        <div class="board">

            <span href="javascript:void(0);"
               class="circle" v-for="(steppingField, index) in store.steppingFields"

            >
                <!--:class="[steppingField.hasPawn.color]"-->
                {{index}}
            </span>





            <div class="player-home"  :class="{'is-playing' : player.isPlaying}" v-for="player in store.players">
                {{player.name}} {{player.turn}}
                <div class="circles">
                    <a href="javascript:void(0);" class="circle"
                       v-for="pawn in player.pawns"
                       :class="[player.isPlaying && pawn.isActive && pawn.position ==0 ? 'is-avaliable': '', pawn.color]"
                       @click="pawn.move()"
                    >
                    </a>
                </div>
            </div>

<!--<div class="afroni"></div>-->

            <div class="player-pawns" style="color: #fff" v-for="player in store.players">
                <a href="javascript:void(0);" class="pawn-figure"
                   v-for="pawn in player.pawns"
                   v-show="pawn.position != 0"
                     :class="['field-' + pawn.globalPosition, player.isPlaying && pawn.isActive? 'is-avaliable': '', pawn.color]"
                     @click="pawn.move()"
                >
                    {{pawn.startingPlace}}
                </a>
            </div>


            <a href="javascript:void(0);" class="the-dice"
               @click="rollDice"
               :class="{'is-playing' : store.gamePlayStatus.isRolling}"
            >{{store.lastRolledDice}}</a>


        </div>





    </div>
</template>
<script>
    export default {
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

        computed: {
            fieldHasPawn() {
                return false;
            }
        },
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
                    this.store.steppingFields.push({
//                        hasPawn: false,
                        hasPawn: this.fieldHasPawn
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
            clickedField(steppingField){
                if (steppingField.hasPawn) {
                    steppingField.hasPawn.position = 12;
                    steppingField.hasPawn.globalPosition = 12;
                }
            }

        }
    }
</script>
