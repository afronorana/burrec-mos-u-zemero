<template>
    <div>

        <div class="dice text-right">
            <a href="javascript:void(0);" @click="diceRoll">Roll the dice</a>
            <br>
            Rolled: {{diceStatus}}
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
                diceStatus: ''
            }
        },
        events: {},
        methods: {
            diceRoll() {
                this.diceStatus =  1+Math.floor(Math.random()*6);
            }
        }
    }
</script>
