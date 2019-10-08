require('./core/bootstrap');
require('./ApplicationStore');
require('./core/register/eventhandler');
require('./core/register/mixins');
require('./core/register/components');


window.storeX = new Vuex.Store({
  state: {
    count: 0,
    cursorPointer: false,
  },
  mutations: {
    changeCursor(state, isPointer) {
      state.cursorPointer = isPointer
    },
    increment (state) {
      state.count++
    }
  }
})

window.Burrec = new Vue({
  el: '#app',

  mounted() {
    this.$nextTick(function() {

      setInterval(function() {
        this.flashIntensity = this.flashIntensity ? 0 : 4
      }.bind(this), 300);

      // Game logic
      this.createPlayers();
      this.startGame();

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

      let scene = this.$children[0].vglNamespace.scenes['scene'];
      let camera = this.$children[0].vglNamespace.cameras['cmr1'];
      let renderer = this.$children[0].vglNamespace.renderers[0];

      this.controls = new THREE.OrbitControls(
          this.$children[0].vglNamespace.cameras['cmr1'],
          renderer.$el,
      );

      this.controls.minPolarAngle = Math.PI / 5;
      this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.target = new THREE.Vector3(5, 0, 5);
      this.controls.maxDistance = 30;
      this.controls.minDistance = 15;
      this.controls.enablePan = false;

      this.controls.addEventListener('change', () => {
        this.$children[0].vglNamespace.update();
        render();
      });

      let lastHoveredObject = null;

      // Mouse events
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        render();
      }

      let self = this;

      var render = function() {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
          let intersectedObjectName = intersects[0].object.parent.name.toString();
          if (intersectedObjectName.startsWith('cube') ||
              intersectedObjectName === 'dice') {
            storeX.commit('changeCursor', true);
            lastHoveredObject = intersectedObjectName;
          } else {
            storeX.commit('changeCursor', false);
          }
        } else {
          lastHoveredObject = null;
          storeX.commit('changeCursor', false);
        }
        self.$children[0].vglNamespace.renderers[0].render(scene, camera);
      };
      window.addEventListener('mousemove', onMouseMove, false);

      window.addEventListener('click', function() {

        if (!lastHoveredObject) return;
        if (lastHoveredObject.toString().startsWith('cube')) {
          this.store.players.forEach(function(player) {
            player.pawns.forEach(function(pawn) {
              if ('cube-' + pawn.id === lastHoveredObject) {
                pawn.move();
              }
            });
          });
        } else if (lastHoveredObject.toString() === 'dice') {
          EventBus.fire('EventKeys.rollDice');
        }

      }.bind(this), false);

    });
  },

  data() {
    return {
    store: ApplicationStore,
      storeX: storeX,

    steppingFields: [],

    board: {position: `5 -0.05 5`},
    cameraDeets: `-15 15 -15`,

    pointLights: [
      {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, -2`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, 13`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, -2`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, 13`},
    ],
flashIntensity: 0,
    indicator: {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
    },
  }},

  watch: {
    steppingFields: {
      handler(val) {
        // console.log(val);
        // console.log ( 'adsa' );
      },
      deep: true,
    },

  },

  events: {},
  methods: {
    createPlayers() {
      this.store.players.push(new Player('Player 1', '#CE0000', 1, false));
      this.store.players.push(new Player('Player 2', '#F7D708', 2, true));
      this.store.players.push(new Player('Player 3', '#009ECE', 3, true));
      this.store.players.push(new Player('Player 4', '#9CCF31', 4, true));
      // this.store.players.push(new Player('Player 1', '#CE0000', 1, true));
      // this.store.players.push(new Player('Player 2', '#F7D708', 2, true));
      // this.store.players.push(new Player('Player 3', '#009ECE', 3, true));
      // this.store.players.push(new Player('Player 4', '#9CCF31', 4, true));
    },

    startGame() {
      this.store.currentRound = 1;
      this.changePlayersTurn();
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
    getPawnPosition(pawn) {
      return pawn.getPosition();
    },
    rollDice(amount) {

      if (!this.store.gamePlayStatus.isRolling) return;

      let diceResult = amount || 1 + Math.floor(Math.random() * 6);



      let diceAngles = [
        [Math.PI / 2, Math.PI / 2, Math.PI / 2],
        [Math.PI * 2, Math.PI * 2, Math.PI * 2],
        [Math.PI / 2, Math.PI, Math.PI / 2 * (Math.floor(Math.random() * 6) + 1)],
        [Math.PI / 2 * 3, Math.PI, Math.PI / 2 * (Math.floor(Math.random() * 6) + 1)],
        [Math.PI / 2 * 6, Math.PI / 2, Math.PI / 2 * 3],
        [Math.PI / 2 * 6, Math.PI / 2, Math.PI / 2]];

      this.store.diceData.x=0;
      this.store.diceData.y=0;
      this.store.diceData.z=0;

      setTimeout(function () {
        this.store.diceData.x = diceAngles[diceResult - 1][0];
        this.store.diceData.y = diceAngles[diceResult - 1][1];
        this.store.diceData.z = diceAngles[diceResult - 1][2];

        this.store.players[this.store.currentPlayerId].rollDice(diceResult);
      }.bind(this), 20);



    },
  },
});