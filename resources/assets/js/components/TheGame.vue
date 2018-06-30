<template>
    <div>

        <div class="board">


            <a href="javascript:void(0);"
               class="circle" v-for="(steppingField, index) in store.steppingFields"
               :class="[steppingField.hasPawn.color]"
            >
                {{index + 1}}
            </a>

            <div class="player-home" :style="{borderColor: player.color}" v-for="player in store.players">
                {{player.name}} {{player.turn}}
                <div class="circles">
                    <a href="javascript:void(0);" class="circle"
                       v-for="pawn in player.pawns"
                       :class="[player.isPlaying && pawn.isActive ? 'is-avaliable': '', pawn.color]"
                       @click="pawn.move()"
                    >
                    </a>
                </div>
            </div>

        </div>


        <h3>Current turn: {{store.currentPlayer.name}}</h3>
        <h3>Dice: {{store.lastRolledDice}}</h3>

        <h3>
            <a href="javascript:void(0);" @click="rollDice">Roll the dice</a>
        </h3>

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
        methods: {
            createPlayers() {
                this.store.players.push(new Player('Jon Doe', 'red', 1));
                this.store.players.push(new Player('Jane Doe', 'yellow', 2));
                this.store.players.push(new Player('Filan Fisteku', 'blue', 3));
                this.store.players.push(new Player('Filane Fisteku', 'green', 4));
            },

            fillSteppingFields() {
                for (let field = 1; field <= 40; field++) {
                    this.store.steppingFields.push({
                        hasPawn: false,
                    })
                }
            },


            startGame() {
                this.store.curentRound = 1;
                this.changePlayersTurn();
            },

            changePlayersTurn() {
                /** Check if its first round **/
                let currentPlayer = this.store.players[this.store.currentPlayerId];
                if (currentPlayer)
                    currentPlayer.endTurn();

                /** Set next player **/
                if (this.store.currentPlayerId == this.store.players.length - 1) {
                    this.store.currentPlayerId = 0;
                    this.store.curentRound++;
                } else {
                    this.store.currentPlayerId++;
                }

                this.store.players[this.store.currentPlayerId].startTurn();
            },

            rollDice() {
                let diceResult = 1 + Math.floor(Math.random() * 6);
//                let diceResult = 6;
                this.store.lastRolledDice = diceResult;
                this.store.players[this.store.currentPlayerId].setAvaliablePawns(diceResult);
            },

        }
    }
</script>
