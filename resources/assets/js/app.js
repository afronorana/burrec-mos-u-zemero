require('./core/bootstrap');
require('./core/plugins');


window.EventBus = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        if (typeof callback === "function")
            this.vue.$on(event, callback);
    }
};


window.ApplicationStore = {

};



// Components
Vue.component('component', require('./components/Component'));

const ProjectName = new Vue({
    el: 'main',
    mounted() {
        this.$nextTick(function () {

        }.bind(this));
    },
    data: {},
    events: {},
    methods: {


    }
});