<template>
    <div>

        <div class="board">


            <a href="javascript:void(0);" class="circle" v-for="(steppingField, index) in store.steppingFields">
                {{steppingField.hasPawn}}
                {{index}}
            </a>


            <div class="player-home" :style="{borderColor: player.color}" v-for="player in store.players">
                {{player.name}}
                <div class="circles">
                    <div class="circle"
                         :style="{borderColor: player.color}"
                         v-for="pawn in player.pawns"
                         :class="{taken:pawn.isHome()}"
                         @click="pawni(pawn)"></div>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
    export default {
        components: {},
        mounted() {
            this.$nextTick(function () {
                this.createPlayers();
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
            pawni(pawn){
                console.log ( pawn );
                pawn.position = 8;
            }

        }
    }
</script>
