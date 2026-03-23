import _ from 'lodash';
import $ from 'jquery';
import Promise from 'promise';
import Vuex from 'vuex';
import { createApp } from 'vue';
import EventKeys from '../utils/EventKeys';
import Pawn from '../utils/Pawn';
import Player from '../utils/Player';
import * as THREE from 'three';

window._ = _;
window.$ = window.jQuery = $;
window.Promise = Promise;
window.Vuex = Vuex;
window.EventKeys = EventKeys;

window.Pawn = Pawn;
window.Player = Player;
window.THREE = THREE; // Ensure THREE is globally available

// Create Vue app instance and use Vuex
const app = createApp({});
app.use(Vuex);

// Export the Vue app instance for use in other parts of the application
export default app;