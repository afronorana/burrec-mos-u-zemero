<template>
    <div>
        <div class="player-home"
             :class="{'is-playing' : player.isPlaying}"
             v-for="player in store.players">
            {{player.name}} {{player.turn}}
            <div class="circles">
                    <span class="circle"
                          v-for="pawn in player.pawns"
                          :class="[player.isPlaying && pawn.isActive && pawn.position ==0 ? 'is-avaliable': '', pawn.color]"
                          @click="pawn.move()"
                    >
                    </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['steppingFields'],
        mounted() {
            this.$nextTick(function () {

            }.bind(this));
        },
        data() {
            return {
                store: window.ApplicationStore,
            }
        },
        events: {},

        methods: {


        }
    }
</script>
