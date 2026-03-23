import './../styles/app.scss';

/**
 * Development only
*/

import Stats from 'stats.js'
import './../core/bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ApplicationStore from './ApplicationStore';
import EventBus from './eventhandler';
import EventKeys from './EventKeys';
import Player from './Player';
import './components';
import { useMainStore } from '../store/useMainStore';
import * as THREE from 'three';

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

const app = createApp({
  data() {
    return {
      store: ApplicationStore,
      rayCaster: null,
      mouse: null,
      lastHoveredObject: null,
      board: { position: new THREE.Vector3(5, -0.05, 5) },
      pointLights: [
        { color: '#ffffff', intensity: 0.3, distance: 20, position: new THREE.Vector3(-2, 10, -2) },
        { color: '#ffffff', intensity: 0.3, distance: 20, position: new THREE.Vector3(-2, 10, 13) },
        { color: '#ffffff', intensity: 0.3, distance: 20, position: new THREE.Vector3(13, 10, -2) },
        { color: '#ffffff', intensity: 0.3, distance: 20, position: new THREE.Vector3(13, 10, 13) },
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.addEventListeners();
        this.initThreeJs();
      }, 500); // Delay to ensure child components are rendered
    });
  },

  methods: {
    initThreeJs() {
      const canvas = document.getElementById('canvas');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#222222');

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(5, 5, 5);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvas.appendChild(renderer.domElement);

      // Board
      const boardGeometry = new THREE.BoxGeometry(11, 0.1, 11);
      const boardMaterial = new THREE.MeshPhongMaterial({ color: '#cccccc' });
      const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
      boardMesh.position.copy(this.board.position);
      scene.add(boardMesh);

      // Lights
      this.pointLights.forEach(lightConfig => {
        const light = new THREE.PointLight(lightConfig.color, lightConfig.intensity, lightConfig.distance);
        light.position.copy(lightConfig.position);
        scene.add(light);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    },

    addEventListeners() {
      EventBus.listen(EventKeys.turns.endTurn, this.changePlayersTurn);
      EventBus.listen(EventKeys.turns.repeatTurn, this.repeatPlayersTurn);
      window.addEventListener('keypress', (e) => {
        if (e.keyCode === 32) this.rollDice();
      });
      EventBus.listen('EventKeys.rollDice', this.rollDice);
      EventBus.listen('EventKeys.game.start', this.startGame);
    },

    initCameraControls() {
      console.log('Initializing camera controls...');

      setTimeout(() => {
        const camera = this.camera; // Use the camera initialized in initThreeJs
        const renderer = this.renderer; // Use the renderer initialized in initThreeJs

        if (!camera || !renderer) {
          console.error('Camera or renderer is not available.');
          return;
        }

        camera.lookAt(new THREE.Vector3(5, 0, 5));
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        this.controls.minPolarAngle = Math.PI / 5;
        this.controls.maxPolarAngle = Math.PI / 3;
        this.controls.target = new THREE.Vector3(5, 0, 5);
        this.controls.maxDistance = 30;
        this.controls.minDistance = 15;
        this.controls.enablePan = false;
      }, 300);
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
      if (!this.scene || !this.camera) {
        console.error('Scene or camera is not available.');
        return;
      }

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length > 0) {
        const intersectedObjectName = intersects[0]?.object?.parent?.name?.toString();
        if (intersectedObjectName?.startsWith('cube') || intersectedObjectName === 'dice') {
          this.lastHoveredObject = intersectedObjectName;
        } else {
          this.lastHoveredObject = null;
        }
      } else {
        this.lastHoveredObject = null;
      }

      this.renderer.render(this.scene, this.camera);
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

const pinia = createPinia();
app.use(pinia);

const mainStore = useMainStore();
mainStore.$patch({
  count: 0,
  currentScreen: 'main-menu',
  cursorPointer: false,
  flashIntensity: 0,
});

app.mount('#app');

/* 
<vgl-renderer name="renderer" camera="cmr1" antialias style="height: 100vh; width: 100vw;">
            <vgl-scene name="scene" background-color="#222222">

                <!-- Board -->
               <vgl-box-geometry name="boardGeometry" width=11 height=0.1 depth="11"></vgl-box-geometry>
                <vgl-cylinder-geometry name="boardGeometry" :radial-segments=8  radius-top=8  radius-bottom=8.2 height=0.1></vgl-cylinder-geometry>
                <vgl-mesh-phong-material name="boardMaterial" color="#cccccc"></vgl-mesh-phong-material>
                <vgl-mesh geometry="boardGeometry" material="boardMaterial" :position="board.position"
                          recieve-shadow></vgl-mesh>

                <!-- Dice -->
                <dice-figure></dice-figure>

                <!-- Stepping Fields -->
                <vgl-group>
                    <vgl-cylinder-geometry name="fieldGeometry"
                                           radius-top=0.4
                                           radius-bottom=0.5
                                           height=0.1
                                           :radial-segments=store.settings.quality
                    ></vgl-cylinder-geometry>
                    <vgl-mesh-lambert-material name="fieldMaterial" color="#eeeeee"></vgl-mesh-lambert-material>
                    <vgl-mesh v-for="(field, index) in store.fields.path"
                              v-if="index%10"
                              :key="`field-${index}`"
                              :position="`${field.x} 0 ${field.z}`"
                              geometry="fieldGeometry" material="fieldMaterial"
                    >
                    </vgl-mesh>
                </vgl-group>


                <!-- Home Fields -->
                <vgl-group v-for="(player, playerIndex) in store.players" :key="`home-${playerIndex}`">
                                        <vgl-spot-light
                                                v-if="player.isPlaying"
                                                :name="`spotlight-${playerIndex}`"
                                                distance="10"
                                                angle=".2"
                                                penumbra="1.3"
                                                intensity="2"
                                                color="#ffffff"
                                                :target="`${store.fields.home[playerIndex].fields[0].x} 0 ${store.fields.home[playerIndex].fields[0].z}`"
                                                position="5 5 5"
                                        ></vgl-spot-light>

                    <vgl-mesh-lambert-material :name="`fieldMaterial-${playerIndex}`"
                                               :color="`${store.fields.home[playerIndex].color}`"
                    ></vgl-mesh-lambert-material>
                    <vgl-mesh v-for="(field, index) in store.fields.home[playerIndex].fields"
                              :key="`home-field-${index}`"
                              :material="`fieldMaterial-${playerIndex}`"
                              :position="`${field.x} 0 ${field.z}`"
                              geometry="fieldGeometry"
                    ></vgl-mesh>
                    <vgl-mesh v-for="(field, index) in store.fields.path"
                              v-if="index === player.index"
                              :key="`field-start-${playerIndex}`"
                              :position="`${store.fields.path[playerIndex*10].x} 0 ${store.fields.path[playerIndex*10].z}`"
                              geometry="fieldGeometry" :material="`fieldMaterial-${playerIndex}`"
                    >
                    </vgl-mesh>
                </vgl-group>

                <!-- Target Fields -->
                <vgl-group v-for="(player, playerIndex) in store.players"  :key="`target-${playerIndex}`">
                    <vgl-mesh-lambert-material :name="`fieldMaterial-${playerIndex}`"
                                               :color="`${store.fields.home[playerIndex ].color}`"
                    ></vgl-mesh-lambert-material>
                    <vgl-mesh v-for="(field, index) in store.fields.target[playerIndex].fields"
                              :key="`home-field-${index}`"
                              :material="`fieldMaterial-${playerIndex}`"
                              :position="`${field.x} 0.0${index} ${field.z}`"
                              geometry="fieldGeometry"
                    ></vgl-mesh>
                </vgl-group>




                <!-- Pawns -->
                <vgl-group>
                    <span v-for="(player, playerIndex) in store.players">

                        <pawn-geometry-material
                            :player-index='playerIndex'>
                        </pawn-geometry-material>
                        
                        <pawn-figure 
                        v-for="(pawn, index) in player.pawns" :key="`pawn-${playerIndex}-${index}`"
                        :index='index'
                        :player-index='playerIndex'
                        :pawn='pawn'
                        :name="`cube-${pawn.id}`"
                        ></pawn-figure>
                    
                </span>
                </vgl-group>




                <vgl-ambient-light color="#ffffff" intensity="0.12"></vgl-ambient-light>
                <vgl-point-light v-for="(light, index) in pointLights"
                                 :key="`light-${index}`"
                                 :color="light.color"
                                 :intensity="light.intensity"
                                 :distance="light.distance"
                                 :position="light.position"
                ></vgl-point-light>

            </vgl-scene>

            <vgl-perspective-camera name="cmr1" :position="`-4 8 -4`"></vgl-perspective-camera>

        </vgl-renderer>
*/