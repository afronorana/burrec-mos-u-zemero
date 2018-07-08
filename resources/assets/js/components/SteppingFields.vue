<template>
    <div>
        <span class="circle"
              v-for="(steppingField, index) in steppingFields"
        >{{index}}</span>
        <span class="circle"
              v-for="(targetField, index) in 16"
        >{{index + 40}}</span>
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

        methods: {}
    }
</script>
