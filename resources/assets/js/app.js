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
    players: [],
    currentPlayerId: -1,
    lastRolledDice: 'Start',
    currentRound: 0,

    gamePlayStatus: {
        isRolling: false,
        isMoving: false,
    }
};

// Components
Vue.component('the-game', require('./components/TheGame'));
Vue.component('the-dice', require('./components/TheDice'));
Vue.component('stepping-fields', require('./components/SteppingFields'));
Vue.component('player-homes', require('./components/PlayerHomes'));

window.Burrec = new Vue({
    el: '#app',
    mounted() {
        this.$nextTick(function () {
            EventBus.listen(EventKeys.pawn.move, function (fieldIndex) {
                // this.steppingFields[fieldIndex]

            }.bind(this));
        });
    },


    data: {
        steppingFields: [],
    },

    watch: {
        steppingFields: {
            handler(val) {
                // console.log(val);
                // console.log ( 'adsa' );
            },
            deep: true
        }
    },
    events: {},
    methods: {}
});