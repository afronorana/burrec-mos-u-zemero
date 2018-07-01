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
    currentPlayerId: -1,
    lastRolledDice: 'Start',
    currentRound: 0,

    gamePlayStatus: {
        isRolling: false,
        isMoving: false,
    },
    currentPlayer: new Player(),
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