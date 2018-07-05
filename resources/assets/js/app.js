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
    }
};

// Components
Vue.component('the-game', require('./components/TheGame'));
Vue.component('the-dice', require('./components/TheDice'));

window.Burrec = new Vue({
    el: '#app',
    mounted() {
        this.$nextTick(function () {
            EventBus.listen(EventKeys.pawn.move, function (fieldIndex) {
                // this.steppingFields[fieldIndex]
                ApplicationStore.players.forEach(function (player) {
                    if (!player.isPlaying) {


                        player.pawns.forEach(function (pawn) {
                            if (pawn.globalPosition == fieldIndex) {
                                pawn.returnHome();
                            }
                        });
                    }
                });
            }.bind(this));
        });
    },


    data: {
        steppingFields: [],
    },

    watch: {
        steppingFields: {
            handler(val) {
                console.log(val);
            },
            deep: true
        }
    },
    events: {},
    methods: {}
});