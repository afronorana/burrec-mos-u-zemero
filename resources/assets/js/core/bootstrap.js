window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
window.Promise = require('promise');
window.Vuex = require('vuex');
window.Vue = require('vue');
Vue.use(Vuex);

window.EventKeys = require('../EventKeys');

// import * as VueGL from "vue-gl";
window.VueGL = require('vue-gl');
Object.keys(VueGL).forEach(name => {
  Vue.component(name, VueGL[name]);
});


window.Pawn = require('../Pawn');
window.Player = require('../Player');

window.THREE = require('three');

require('three/examples/js/controls/OrbitControls');