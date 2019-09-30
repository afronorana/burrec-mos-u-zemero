require('./core/bootstrap');

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




require('./core/plugins');

// Mixins
const GlobalMixin = require('./mixins/Global');
Vue.use(GlobalMixin);

window.ApplicationStore = {
    homeFields: [
        {
            fields: [
                new THREE.Vector3(0, 0.5, 0),
                new THREE.Vector3(0, 0.5, 1),
                new THREE.Vector3(1, 0.5, 0),
                new THREE.Vector3(1, 0.5, 1),
            ],
            color: '#ff0000'
        },
        {
            fields: [
                new THREE.Vector3(0, 0.5, 9),
                new THREE.Vector3(0, 0.5, 10),
                new THREE.Vector3(1, 0.5, 9),
                new THREE.Vector3(1, 0.5, 10),
            ],
            color: '#00ff00'
        },
        {
            fields: [
                new THREE.Vector3(9, 0.5, 0),
                new THREE.Vector3(9, 0.5, 1),
                new THREE.Vector3(10, 0.5, 0),
                new THREE.Vector3(10, 0.5, 1),
            ],
            color: '#0000ff'
        },
        {
            fields: [
                new THREE.Vector3(9, 0.5, 9),
                new THREE.Vector3(9, 0.5, 10),
                new THREE.Vector3(10, 0.5, 9),
                new THREE.Vector3(10, 0.5, 10),
            ],
            color: '#ffff00'
        },





    ],
    fields: [
        new THREE.Vector3(4, 0.5, 0),
        new THREE.Vector3(4, 0.5, 1),
        new THREE.Vector3(4, 0.5, 2),
        new THREE.Vector3(4, 0.5, 3),
        new THREE.Vector3(4, 0.5, 4),
        new THREE.Vector3(3, 0.5, 4),
        new THREE.Vector3(2, 0.5, 4),
        new THREE.Vector3(1, 0.5, 4),
        new THREE.Vector3(0, 0.5, 4),
        new THREE.Vector3(0, 0.5, 5),
        new THREE.Vector3(0, 0.5, 6),
        new THREE.Vector3(1, 0.5, 6),
        new THREE.Vector3(2, 0.5, 6),
        new THREE.Vector3(3, 0.5, 6),
        new THREE.Vector3(4, 0.5, 6),
        new THREE.Vector3(4, 0.5, 7),
        new THREE.Vector3(4, 0.5, 8),
        new THREE.Vector3(4, 0.5, 9),
        new THREE.Vector3(4, 0.5, 10),
        new THREE.Vector3(5, 0.5, 10),
        new THREE.Vector3(6, 0.5, 10),
        new THREE.Vector3(6, 0.5, 9),
        new THREE.Vector3(6, 0.5, 8),
        new THREE.Vector3(6, 0.5, 7),
        new THREE.Vector3(6, 0.5, 6),
        new THREE.Vector3(7, 0.5, 6),
        new THREE.Vector3(8, 0.5, 6),
        new THREE.Vector3(9, 0.5, 6),
        new THREE.Vector3(10, 0.5, 6),
        new THREE.Vector3(10, 0.5, 5),
        new THREE.Vector3(10, 0.5, 4),
        new THREE.Vector3(9, 0.5, 4),
        new THREE.Vector3(8, 0.5, 4),
        new THREE.Vector3(7, 0.5, 4),
        new THREE.Vector3(6, 0.5, 4),
        new THREE.Vector3(6, 0.5, 3),
        new THREE.Vector3(6, 0.5, 2),
        new THREE.Vector3(6, 0.5, 1),
        new THREE.Vector3(6, 0.5, 0),
        new THREE.Vector3(5, 0.5, 0),
    ],
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
Vue.component('the-Scene', require('./components/TheScene'));
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

            console.log ( this.data );
        });
    },


    data: {
store: ApplicationStore,
        steppingFields: [],

        board:{position:  `5 -0.05 5`},
        cameraDeets: `-15 15 -15`,


        pointLights: [
            {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, -2`},
            {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, 13`},
            {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, -2`},
            {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, 13`}
            ]
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