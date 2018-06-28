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
    players: []
};

// Components
Vue.component('the-game', require('./components/TheGame'));

const Burrec = new Vue({
    el: '#app',
    mounted() {
        this.$nextTick(function () {
            this.fillSteppingFields();
        }.bind(this));
    },
    data: {},
    events: {},
    methods: {
        fillSteppingFields() {
            console.log ( 'asd' );
            for (let field = 1; field <= 40; field++) {
                ApplicationStore.steppingFields.push({
                    hasPawn: false,
                })
            }
        }
    }
});