import './../styles/app.scss';

require('./core/bootstrap');
require('./ApplicationStore');
require('./eventhandler');
require('./core/register/mixins');
require('./core/register/components');
require('./components');

/**
 * Development only
*/

import Stats from 'stats.js'
var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

function animate() {
	stats.begin();
  // monitored code goes here

	stats.end();
	requestAnimationFrame( animate );
}

requestAnimationFrame( animate );

window.storeX = new Vuex.Store({
  state: {
    count: 0,
    currentScreen: 'main-menu',
    cursorPointer: false,
    flashIntensity: 0,
  },


  getters: {
    flashIntensity: state => {
      return state.flashIntensity;
    },
  },

  mutations: {
    changeScreen(state, screen) {
      state.currentScreen = screen;
    },
    changeCursor(state, isPointer) {
      state.cursorPointer = isPointer;
    },
    switchIntensity(state, intensity) {
      state.flashIntensity = intensity;
    },
  },
});

window.Burrec = new Vue({
  el: '#app',
  mounted() {
    this.$nextTick(function() {
      // Game logic
      this.addEventListeners();

      this.initThreeJs();

    });
  },

  data() {
    return {
      store: ApplicationStore,

      rayCaster: null,
      mouse: null,
      lastHoveredObject: null,

      board: {position: `5 -0.05 5`},

      pointLights: [
        {color: '#ffffff', intensity: 0.3, distance: 20, position: `-2, 10, -2`},
        {color: '#ffffff', intensity: 0.3, distance: 20, position: `-2, 10, 13`},
        {color: '#ffffff', intensity: 0.3, distance: 20, position: `13, 10, -2`},
        {color: '#ffffff', intensity: 0.3, distance: 20, position: `13, 10, 13`},
      ],

      
    };
  },

  events: {},
  methods: {
    addEventListeners() {
      EventBus.listen(EventKeys.turns.endTurn, function() {
        this.changePlayersTurn();
      }.bind(this));

      EventBus.listen(EventKeys.turns.repeatTurn, function() {
        this.repeatPlayersTurn();
      }.bind(this));

      window.addEventListener('keypress', function(e) {
        if (e.keyCode === 32) {this.rollDice();}
      }.bind(this));

      EventBus.listen('EventKeys.rollDice', function(amount) {
        this.rollDice(amount);
      }.bind(this));

      EventBus.listen('EventKeys.game.start', function(playerNames) {
        this.startGame(playerNames);
      }.bind(this));

    },

    initThreeJs() {
      this.initCameraControls();
      this.initMouseFunctions();
    },

    initCameraControls() {
      setTimeout(function () {
        this.$children[0].vglNamespace.cameras['cmr1'].lookAt(new THREE.Vector3(5, 0, 5));
      }.bind(this), 300);
      this.controls = new THREE.OrbitControls(
          this.$children[0].vglNamespace.cameras['cmr1'],
          this.$children[0].vglNamespace.renderers[0].$el,
      );
      this.controls.minPolarAngle = Math.PI / 5;
      this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.target = new THREE.Vector3(5, 0, 5);
      this.controls.maxDistance = 30;
      this.controls.minDistance = 15;
      this.controls.enablePan = false;
    },

    initMouseFunctions() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      window.addEventListener('mousemove', function(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.render();
      }.bind(this), false);

      window.addEventListener('click', function() {
        if (!this.lastHoveredObject) return;
        if (this.lastHoveredObject.toString().startsWith('cube')) {
          this.store.players.forEach(function(player) {
            player.pawns.forEach(function(pawn) {
              if ('cube-' + pawn.id === this.lastHoveredObject) { pawn.move() }
            }.bind(this));
          }.bind(this));
        } else if (this.lastHoveredObject.toString() === 'dice') {
          EventBus.fire('EventKeys.rollDice');
        }
      }.bind(this), false);
    },

    render() {
      let scene = this.$children[0].vglNamespace.scenes['scene'];
      let camera = this.$children[0].vglNamespace.cameras['cmr1'];
      this.raycaster.setFromCamera(this.mouse, camera);
      let intersects = this.raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        let intersectedObjectName = intersects[0].object.parent.name.toString();
        if (intersectedObjectName.startsWith('cube') ||
            intersectedObjectName === 'dice') {
          // storeX.commit('changeCursor', true);
          this.lastHoveredObject = intersectedObjectName;
        } else {
          // storeX.commit('changeCursor', false);
        }
      } else {
        this.lastHoveredObject = null;
        // storeX.commit('changeCursor', false);
      }
      this.$children[0].vglNamespace.renderers[0].render(scene, camera);
    },

    createPlayers(playerNames) {
      let colors = ['#CE0000', '#F7D708', '#009ECE', '#9CCF31'];
      playerNames.forEach(function(playerName, index){
        this.store.players.push(new Player(playerName ? playerName : 'Computer', colors[index], index + 1, !playerName));
      }.bind(this))
      // this.store.players.push(new Player('Player 1', '#CE0000', 1, false));
      // this.store.players.push(new Player('Player 2', '#F7D708', 2, true));
      // this.store.players.push(new Player('Player 3', '#009ECE', 3, true));
      // this.store.players.push(new Player('Player 4', '#9CCF31', 4, true));
    },

    startGame(playerNames) {
      this.createPlayers(playerNames);
      this.store.currentRound = 1;
      this.changePlayersTurn();
      this.switchScreen('game-screen')
      EventBus.fire('game.start');
    },

    changePlayersTurn() {

      ApplicationStore.gamePlayStatus.isMoving = false;
      /** Check if its first round **/
      let currentPlayer = this.store.players[this.store.currentPlayerId];
      if (currentPlayer)
        currentPlayer.endTurn();

      /** Set next player **/
      if (this.store.currentPlayerId === this.store.players.length - 1) {
        this.store.currentPlayerId = 0;
        this.store.currentRound++;
      } else {
        this.store.currentPlayerId++;
      }

      this.store.players[this.store.currentPlayerId].startTurn();
    },

    repeatPlayersTurn() {
      ApplicationStore.gamePlayStatus.isMoving = false;
      let currentPlayer = this.store.players[this.store.currentPlayerId];
      currentPlayer.endTurn();
      currentPlayer.startTurn();
    },

    rollDice(amount) {

      if (!this.store.gamePlayStatus.isRolling) return;

      let diceResult = amount || 1 + Math.floor(Math.random() * 6);

      let diceAngles = [
        [Math.PI / 2, Math.PI / 2, Math.PI / 2],
        [Math.PI * 2, Math.PI * 2, Math.PI * 2],
        [
          Math.PI / 2,
          Math.PI,
          Math.PI / 2 * (Math.floor(Math.random() * 6) + 1)],
        [
          Math.PI / 2 * 3,
          Math.PI,
          Math.PI / 2 * (Math.floor(Math.random() * 6) + 1)],
        [Math.PI / 2 * 6, Math.PI / 2, Math.PI / 2 * 3],
        [Math.PI / 2 * 6, Math.PI / 2, Math.PI / 2]];

      this.store.diceData.x = 0;
      this.store.diceData.y = 0;
      this.store.diceData.z = 0;

      setTimeout(function() {
        this.store.diceData.x = diceAngles[diceResult - 1][0];
        this.store.diceData.y = diceAngles[diceResult - 1][1];
        this.store.diceData.z = diceAngles[diceResult - 1][2];

        this.store.players[this.store.currentPlayerId].rollDice(diceResult);
      }.bind(this), 20);

    },
  },
});