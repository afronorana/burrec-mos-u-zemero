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
Vue.component('the-Scene', require('./components/TheScene'));
Vue.component('the-game', require('./components/TheGame'));
Vue.component('the-dice', require('./components/TheDice'));
Vue.component('stepping-fields', require('./components/SteppingFields'));
Vue.component('player-homes', require('./components/PlayerHomes'));

window.ApplicationStore = {
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
        color: '#ff0000',
      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 0), new THREE.Vector3(9, 0.5, 1),
          new THREE.Vector3(10, 0.5, 0), new THREE.Vector3(10, 0.5, 1),
        ],
        color: '#ffff00',

      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 9), new THREE.Vector3(9, 0.5, 10),
          new THREE.Vector3(10, 0.5, 9), new THREE.Vector3(10, 0.5, 10),
        ],
        color: '#00ff00',
      },
      {
        fields: [
          new THREE.Vector3(0, 0.5, 9), new THREE.Vector3(0, 0.5, 10),
          new THREE.Vector3(1, 0.5, 9), new THREE.Vector3(1, 0.5, 10),
        ],
        color: '#0000ff',

      },
    ],
    target: [
      {
        fields: [
          new THREE.Vector3(1, 0.5, 5), new THREE.Vector3(2, 0.5, 5),
          new THREE.Vector3(3, 0.5, 5), new THREE.Vector3(4, 0.5, 5),
        ],
        color: '#ff0000',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 1), new THREE.Vector3(5, 0.5, 2),
          new THREE.Vector3(5, 0.5, 3), new THREE.Vector3(5, 0.5, 4),
        ],
        color: '#ffff00',
      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 5), new THREE.Vector3(8, 0.5, 5),
          new THREE.Vector3(7, 0.5, 5), new THREE.Vector3(6, 0.5, 5),
        ],
        color: '#00ff00',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 9), new THREE.Vector3(5, 0.5, 8),
          new THREE.Vector3(5, 0.5, 7), new THREE.Vector3(5, 0.5, 6),
        ],
        color: '#0000ff',
      },
    ],

    path: [
      new THREE.Vector3(0, 0.5, 4),
      new THREE.Vector3(1, 0.5, 4),
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
};


require('three/examples/js/controls/OrbitControls');

window.Burrec = new Vue({
  el: '#app',
  mounted() {
    this.$nextTick(function() {
      setInterval(function() {
        this.indicator.rotation += 0.1;
      }.bind(this), 70);

      let scene = this.$children[1].vglNamespace.scenes['scene'];
      let camera = this.$children[1].vglNamespace.cameras['cmr1'];
      let renderer = this.$children[1].vglNamespace.renderers[0];
      const controls = new THREE.OrbitControls(
          this.$children[1].vglNamespace.cameras['cmr1'], renderer.$el);
      controls.addEventListener('change', () => {
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
          console.log ( intersects);
          if (intersects[0].object.parent.name.toString().startsWith('cube'))
          {
            setCursor('pointer');
            lastHoveredObject =intersects[0].object.parent.name
          }

        } else {
          if (lastHoveredObject) {
            //The dice logic here
          }
          lastHoveredObject = null;
          setCursor('default');
        }
        self.$children[1].vglNamespace.renderers[0].render(scene, camera);
      };
      window.addEventListener('mousemove', onMouseMove, false);

      window.addEventListener('click', function() {

        if (!lastHoveredObject ||
            !lastHoveredObject.toString().startsWith('cube')) return;
        this.store.players.forEach(function(player) {
          player.pawns.forEach(function(pawn) {
            if ('cube-' + pawn.id === lastHoveredObject) {
              pawn.move();
            }
          });

        });

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
      rotation: 0,
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
    rotate() {},
  },
});