<template>
    <div>

        <div class="board">


            <a href="javascript:void(0);" class="circle" v-for="(steppingField, index) in store.steppingFields">
                {{index + 1}}
            </a>


            <div class="player-home" :style="{borderColor: player.color}" v-for="player in store.players">
                {{player.name}} {{player.turn}}
                <div class="circles">
                    <a href="javascript:void(0);" class="circle"
                       :style="{borderColor: player.color}"
                       v-for="pawn in player.pawns"
                       :class="{taken:pawn.isHome()}"></a>
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
                this.store.currentPlayer = this.store.players[0];

                this.store.steppingFields[5].hasPawn = this.store.players[1].pawns[2];

                this.store.currentPlayer.getAvaliablePawns(2);
            },

            rollDice() {
                this.store.lastRolledDice = this.rollTheDice()

            }
        }
    }
</script>
