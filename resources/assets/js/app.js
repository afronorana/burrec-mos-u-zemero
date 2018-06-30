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


// Mixins
const GlobalMixin = require('./mixins/Global');
Vue.use(GlobalMixin);

window.ApplicationStore = {
    steppingFields: [],
    players: [],
    currentPlayer: new Player(),
    lastRolledDice: 0
};

// Components
Vue.component('the-game', require('./components/TheGame'));

const Burrec = new Vue({
    el: '#app',
    mounted() {
        this.$nextTick(function () {
        }.bind(this));
    },
    data: {},
    events: {},
    methods: {}
});