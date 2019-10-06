require('./core/bootstrap');

window.EventBus = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }

  listen(event, callback) {
    if (typeof callback === 'function')
      this.vue.$on(event, callback);
  }
};

require('./core/plugins');

// Mixins
const GlobalMixin = require('./mixins/Global');
Vue.use(GlobalMixin);

// Components
// Vue.component('the-Scene', require('./components/TheScene'));
Vue.component('the-game', require('./components/TheGame'));
// Vue.component('the-dice', require('./components/TheDice'));
// Vue.component('stepping-fields', require('./components/SteppingFields'));
// Vue.component('player-homes', require('./components/PlayerHomes'));

window.ApplicationStore = {

  x: 0,
  y: 0,
  z: 0,

  cursorPointer: false,

  diceData: {
    interval: [null, null, null],
    allDone: [false, false, false],
    diceCalc: {
      x: 0,
      y: 0,
      z: 0,
    },
    time: 300,
    x: 0,
    y: 0,
    z: 0,
  },

  settings: {
    quality: 12,
  },
  fields: {
    home: [
      {
        fields: [
          new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, 0.5, 1),
          new THREE.Vector3(1, 0.5, 0), new THREE.Vector3(1, 0.5, 1),
        ],
        color: '#CE0000',
      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 0), new THREE.Vector3(9, 0.5, 1),
          new THREE.Vector3(10, 0.5, 0), new THREE.Vector3(10, 0.5, 1),
        ],
        color: '#F7D708',

      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 9), new THREE.Vector3(9, 0.5, 10),
          new THREE.Vector3(10, 0.5, 9), new THREE.Vector3(10, 0.5, 10),
        ],
        color: '#9CCF31',
      },
      {
        fields: [
          new THREE.Vector3(0, 0.5, 9), new THREE.Vector3(0, 0.5, 10),
          new THREE.Vector3(1, 0.5, 9), new THREE.Vector3(1, 0.5, 10),
        ],
        color: '#009ECE',

      },
    ],
    target: [
      {
        fields: [
          new THREE.Vector3(1, 0.5, 5), new THREE.Vector3(2, 0.5, 5),
          new THREE.Vector3(3, 0.5, 5), new THREE.Vector3(4, 0.5, 5),
        ],
        color: '#CE0000',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 1), new THREE.Vector3(5, 0.5, 2),
          new THREE.Vector3(5, 0.5, 3), new THREE.Vector3(5, 0.5, 4),
        ],
        color: '#F7D708',
      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 5), new THREE.Vector3(8, 0.5, 5),
          new THREE.Vector3(7, 0.5, 5), new THREE.Vector3(6, 0.5, 5),
        ],
        color: '#9CCF31',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 9), new THREE.Vector3(5, 0.5, 8),
          new THREE.Vector3(5, 0.5, 7), new THREE.Vector3(5, 0.5, 6),
        ],
        color: '#009ECE',
      },
    ],
    path: [
      new THREE.Vector3(0, 0.5, 4), // 0
      new THREE.Vector3(1, 0.5, 4), // 1
      new THREE.Vector3(2, 0.5, 4),
      new THREE.Vector3(3, 0.5, 4),
      new THREE.Vector3(4, 0.5, 4),
      new THREE.Vector3(4, 0.5, 3),
      new THREE.Vector3(4, 0.5, 2),
      new THREE.Vector3(4, 0.5, 1),
      new THREE.Vector3(4, 0.5, 0),
      new THREE.Vector3(5, 0.5, 0),
      new THREE.Vector3(6, 0.5, 0),
      new THREE.Vector3(6, 0.5, 1),
      new THREE.Vector3(6, 0.5, 2),
      new THREE.Vector3(6, 0.5, 3),
      new THREE.Vector3(6, 0.5, 4),
      new THREE.Vector3(7, 0.5, 4),
      new THREE.Vector3(8, 0.5, 4),
      new THREE.Vector3(9, 0.5, 4),
      new THREE.Vector3(10, 0.5, 4),
      new THREE.Vector3(10, 0.5, 5),
      new THREE.Vector3(10, 0.5, 6),
      new THREE.Vector3(9, 0.5, 6),
      new THREE.Vector3(8, 0.5, 6),
      new THREE.Vector3(7, 0.5, 6),
      new THREE.Vector3(6, 0.5, 6),
      new THREE.Vector3(6, 0.5, 7),
      new THREE.Vector3(6, 0.5, 8),
      new THREE.Vector3(6, 0.5, 9),
      new THREE.Vector3(6, 0.5, 10),
      new THREE.Vector3(5, 0.5, 10),
      new THREE.Vector3(4, 0.5, 10),
      new THREE.Vector3(4, 0.5, 9),
      new THREE.Vector3(4, 0.5, 8),
      new THREE.Vector3(4, 0.5, 7),
      new THREE.Vector3(4, 0.5, 6),
      new THREE.Vector3(3, 0.5, 6),
      new THREE.Vector3(2, 0.5, 6),
      new THREE.Vector3(1, 0.5, 6),
      new THREE.Vector3(0, 0.5, 6),
      new THREE.Vector3(0, 0.5, 5),

    ],
  },

  players: [],
  currentPlayerId: -1,

  lastRolledDice: 'Start',

  currentRound: 0,
  gamePlayStatus: {
    isRolling: false,
    isMoving: false,
  },
  controls: null,
};

require('three/examples/js/controls/OrbitControls');

window.Burrec = new Vue({
  el: '#app',
  mounted() {
    this.$nextTick(function() {



      window.addEventListener('keypress', function(e) {
        if (e.keyCode === 32) {
          this.rollDice();
        }
      }.bind(this));
      EventBus.listen('EventKeys.rollDice', function(amount) {
        this.rollDice(amount);
      }.bind(this));

      let scene = this.$children[1].vglNamespace.scenes['scene'];
      let camera = this.$children[1].vglNamespace.cameras['cmr1'];
      let renderer = this.$children[1].vglNamespace.renderers[0];

      this.controls = new THREE.OrbitControls(
          this.$children[1].vglNamespace.cameras['cmr1'],
          renderer.$el,
      );

      this.controls.minPolarAngle = Math.PI / 5;
      this.controls.maxPolarAngle = Math.PI / 3;
      this.controls.target = new THREE.Vector3(5, 0, 5);
      this.controls.maxDistance = 30;
      this.controls.minDistance = 15;
      this.controls.enablePan = false;

      this.controls.addEventListener('change', () => {
        this.$children[1].vglNamespace.update();
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
            self.store.cursorPointer = true;
            lastHoveredObject = intersectedObjectName;
          } else {
            self.store.cursorPointer = false;
          }
        } else {
          lastHoveredObject = null;
          self.store.cursorPointer = false;
        }
        self.$children[1].vglNamespace.renderers[0].render(scene, camera);
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

  data: {
    store: ApplicationStore,

    steppingFields: [],

    board: {position: `5 -0.05 5`},
    cameraDeets: `-15 15 -15`,

    pointLights: [
      {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, -2`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `-2, 10, 13`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, -2`},
      {color: '#ffffff', intensity: 1, distance: 20, position: `13, 10, 13`},
    ],

    indicator: {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
    },
  },

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