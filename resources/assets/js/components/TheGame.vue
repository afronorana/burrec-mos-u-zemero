<template>
    <div>
        <div class="board">
            <div class="circle" v-for="i in 40">
                {{i}}
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
            }
        },
        events: {},
        methods: {}
    }
</script>
