<template>
    <div>
        <span class="circle" v-for="(steppingField, index) in steppingFields"></span>
        <span class="circle" v-for="(targetField, index) in 16"></span>

    </div>
</template>
<script>
    export default {
        props: ['steppingFields'],
        mounted() {},
        data() {
            return {}
        },
        events: {},
        methods: {}
    }
</script>
