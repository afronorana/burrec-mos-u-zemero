<template>
    <div>
        <div class="scene">
            <div class="cube" :class="['show-' + currentFace, store.gamePlayStatus.isRolling?'is-active':'']" @click="rollDice" >
                <div v-for="cubeFace in cubeFaces" class="cube__face" :class="['cube__face--' + cubeFace.face]">
                    <div class="dot" v-for="dot in cubeFace.number"></div>
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

            }.bind(this));
        },
        data() {
            return {
                store: window.ApplicationStore,
                currentFace: 'one',
                cubeFaces: [
                    {face: 'one', number: 1},
                    {face: 'two', number: 2},
                    {face: 'three', number: 3},
                    {face: 'four', number: 4},
                    {face: 'five', number: 5},
                    {face: 'six', number: 6}
                ]
            }
        },
        events: {},
        methods: {
            showFace(face){
                this.currentFace = face;
            },
            rollDice() {
                if (!this.store.gamePlayStatus.isRolling) return;
                let diceResult = 1 + Math.floor(Math.random() * 6);

                this.cubeFaces.forEach(function (cubeFace) {
                    if (cubeFace.number == diceResult) {
                        this.showFace(cubeFace.face)
                    }
                }.bind(this));

                this.store.players[this.store.currentPlayerId].rollDice(diceResult);
            }
        }
    }
</script>
