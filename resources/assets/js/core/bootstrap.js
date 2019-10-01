window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
window.Promise = require('promise');
window.Vue = require('vue');
window.EventKeys = require('../EventKeys');

import * as VueGL from "vue-gl";
Object.keys(VueGL).forEach(name => {
  Vue.component(name, VueGL[name]);
});


window.Pawn = require('../Pawn');
window.Player = require('../Player');

window.THREE = require('three');

