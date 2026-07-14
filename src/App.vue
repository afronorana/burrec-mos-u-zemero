<template>
  <main class="app-shell">
    <canvas ref="canvas" class="board-canvas"></canvas>
    <canvas ref="overlayCanvas" class="overlay-canvas"></canvas>
    <start-screen></start-screen>
    <win-screen></win-screen>

  </main>
</template>

<script>
import { markRaw } from 'vue';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import StartScreen from './components/StartScreen.vue';
import WinScreen from './components/WinScreen.vue';
import ApplicationStore from './utils/ApplicationStore';
import EventBus from './utils/eventhandler';
import EventKeys from './utils/EventKeys';
import { PAWN_STEP_DURATION_MS } from './utils/movementConstants';
import { getOutlineAppearancePreset } from './utils/outlineAppearance';
import { getRenderQualityPreset } from './utils/renderQuality';
import { PLAYER_COLORS } from './utils/playerColors';
import Player from './utils/Player';
import MatchController from './network/MatchController';

const OUTLINE_COLOR = '#1b1411';
const BOARD_CENTER = { x: 5, z: 5 };
const DICE_SIZE = 0.456;
const DICE_CORNER_RADIUS = DICE_SIZE * 0.12;
const BOARD_BASE_SIZE = 12.6;
const BOARD_TOP_SIZE = 11.3;
// Central dice pit — a shallow round hole sunk into the middle of the board
// (both board slabs are extruded with a matching cutout, and the pit liner
// hides the cut edges). Invisible walls (an octagon of static physics boxes)
// keep the dice inside without caging it visually.
const DICE_PIT = {
  center: { x: 5, z: 5 },
  holeRadius: 1.42, // slab cutout — also the outer edge of the beveled rim
  innerRadius: 1.3, // vertical wall below the bevel
  wallRadius: 1.27, // physics octagon, just inside the visual wall
  wallHeight: 3.2,
  floorY: -0.08,
};
const TABLE_PHYSICS = {
  center: { x: BOARD_CENTER.x, z: BOARD_CENTER.z },
  topY: -0.52,
  topSize: { width: 14.2, height: 0.7, depth: 14.2 },
  floorY: -1.18,
};
const DICE_FACE_ORDER = [3, 4, 1, 6, 2, 5];
const DICE_FACE_NORMALS = {
  1: new THREE.Vector3(0, 1, 0),
  2: new THREE.Vector3(0, 0, 1),
  3: new THREE.Vector3(1, 0, 0),
  4: new THREE.Vector3(-1, 0, 0),
  5: new THREE.Vector3(0, 0, -1),
  6: new THREE.Vector3(0, -1, 0),
};
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const DICE_FACE_ENTRIES = Object.entries(DICE_FACE_NORMALS)
    .map(([value, normal]) => [Number(value), normal]);
const CAMERA_GAME_POSITION = new THREE.Vector3(5.6, 12.4, 16.2);
const CAMERA_GAME_TARGET = new THREE.Vector3(5, 0.4, 5);
// Render-loop scratch objects — reused every frame to avoid GC churn.
const _cameraLookScratch = new THREE.Vector3();
const _diceFaceQuaternion = new THREE.Quaternion();
const _diceFaceScratch = new THREE.Vector3();
const _diceBestNormal = new THREE.Vector3();
const _grassSwayEuler = new THREE.Euler();
const _grassSwayQuaternion = new THREE.Quaternion();
const _grassMatrix = new THREE.Matrix4();

// A square board slab with the dice-pit cutout at its center. The geometry
// origin is the bottom of the slab (extrusion runs along local +y).
const createSlabWithPitHole = (size, thickness) => {
  const half = size / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-half, -half);
  shape.lineTo(half, -half);
  shape.lineTo(half, half);
  shape.lineTo(-half, half);
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, DICE_PIT.holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: 48,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
};
// Slightly wide lens so the whole board stays in frame at all times.
const CAMERA_FOV_LANDSCAPE = 50;
const CAMERA_FOV_PORTRAIT = 66;
const RIPPLE_TIME_SCALE = 0.0006;
const DICE_SETTLE_RULES = {
  minimumMotionMs: 500,
  faceUpDotThreshold: 0.94,
  recoveryCooldownMs: 180,
  maxRecoveryAttempts: 3,
};
const BOARD_TOP_SURFACE_Y = 0.06;
const FIELD_CLEARANCE_Y = 0.022;
const FIELD_CENTER_Y = BOARD_TOP_SURFACE_Y + 0.04 + FIELD_CLEARANCE_Y;
const START_FIELD_CENTER_Y = BOARD_TOP_SURFACE_Y + 0.05 + FIELD_CLEARANCE_Y;
const PAWN_CENTER_Y = FIELD_CENTER_Y + 0.085;
const PAWN_ACTIVE_LIFT_Y = 0.04;
const DICE_VISUAL_FLOAT_Y = 0.016;

export default {
  name: 'AppRoot',
  components: {
    StartScreen,
    WinScreen,
  },
  watch: {
    'store.settings.outlineAppearance'() {
      this.applyOutlineAppearance();
      this.hoverNeedsUpdate = true;
    },
    'store.settings.quality'() {
      this.applyRenderQuality();
      this.hoverNeedsUpdate = true;
    },
    'store.settings.environment'() {
      this.applyEnvironment();
    },
    pendingDiceRoll(val) {
      this.store.gamePlayStatus.isDiceRolling = Boolean(val);
    },
    'store.currentScreen'(newScreen, oldScreen) {
      const isOrbitScreen = (s) => ['login-screen', 'main-menu', 'online-menu'].includes(s) || !s;
      const isFixedScreen = (s) => ['add-players', 'lobby', 'game-screen'].includes(s);

      if (isFixedScreen(newScreen) && isOrbitScreen(oldScreen)) {
        if (this.camera) {
          const fromPos = this.camera.position.clone();
          this.cameraTransition = {
            start: performance.now(),
            fromPosition: fromPos,
            fromTarget: CAMERA_GAME_TARGET.clone(),
          };
        }
      } else if (isOrbitScreen(newScreen) && isFixedScreen(oldScreen)) {
        this.menuOrbitTime = 0;
        if (this.controls) {
          this.controls.enabled = false;
        }
      }

      if (newScreen === 'add-players') {
        this.store.localSetupActive = [true, true, false, false];
        this.store.localSetupNames = [
          this.store.online.displayName || 'Player 1',
          'Robot 2',
          'Robot 3',
          'Robot 4'
        ];
        this.store.localSetupTypes = ['local', 'ai', 'ai', 'ai'];
        this.syncLocalPlayersFromSetup();
      } else if (newScreen === 'lobby') {
        this.syncOnlinePlayersFromLobby();
      }
    },
    'store.localSetupNames': {
      handler() {
        if (this.store.currentScreen === 'add-players') {
          this.syncLocalPlayersFromSetup();
        }
      },
      deep: true,
    },
    'store.localSetupActive': {
      handler() {
        if (this.store.currentScreen === 'add-players') {
          this.syncLocalPlayersFromSetup();
        }
      },
      deep: true,
    },
    'store.localSetupTypes': {
      handler() {
        if (this.store.currentScreen === 'add-players') {
          this.syncLocalPlayersFromSetup();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      store: ApplicationStore,
      camera: null,
      scene: null,
      renderer: null,
      shadowLight: null,
      controls: null,
      diceMesh: null,
      dicePhysicsBody: null,
      physicsWorld: null,
      physicsLastTime: null,
      pendingDiceRoll: null,
      onlineDice: null,
      diceSnapTween: null,
      dicePitMesh: null,
      pawnMeshes: markRaw({}),
      pawnMotionStates: markRaw({}),
      menuOrbitTime: 0,
      cameraTransition: null,
      overlayCtx: null,
      homeBaseHelpers: null,
      homeBaseRippleRings: null,
      clickableRipples: null,
      grassMeshes: null,
      grassInstances: null,
      treeGroups: null,
      pawnOutlineSyncPending: false,
      isMobile: false,
      sharedGeometries: markRaw({}),
      sharedMaterials: markRaw({}),
      sharedTextures: markRaw({}),
      animationFrameId: null,
      eventUnsubscribers: [],
      resizeHandler: null,
      keydownHandler: null,
      pointerDownHandler: null,
      pointerMoveHandler: null,
      pointerLeaveHandler: null,
      clickHandler: null,
      raycaster: null,
      pointer: null,
      hoveredTarget: null,
      pointerDownPosition: null,
      isDraggingScene: false,
      controlsChangeHandler: null,
      hoverNeedsUpdate: false,
      isPointerInsideCanvas: false,
      overlayHasContent: false,
    };
  },
  mounted() {
    this.addEventListeners();
    this.initThreeScene();
    this.overlayCtx = this.$refs.overlayCanvas.getContext('2d');
    this.resizeOverlayCanvas();

    this.resizeHandler = () => this.handleResize();
    this.keydownHandler = (event) => this.handleKeydown(event);
    this.pointerDownHandler = (event) => this.handlePointerDown(event);
    this.pointerMoveHandler = (event) => this.handlePointerMove(event);
    this.pointerLeaveHandler = () => this.clearHoveredTarget();
    this.clickHandler = (event) => this.handleCanvasClick(event);

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('keydown', this.keydownHandler);
    this.$refs.canvas.addEventListener('pointerdown', this.pointerDownHandler);
    this.$refs.canvas.addEventListener('mousemove', this.pointerMoveHandler);
    this.$refs.canvas.addEventListener('mouseleave', this.pointerLeaveHandler);
    this.$refs.canvas.addEventListener('click', this.clickHandler);
  },
  beforeUnmount() {
    this.eventUnsubscribers.forEach((unsubscribe) => unsubscribe());

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
    }

    if (this.$refs.canvas && this.pointerMoveHandler) {
      this.$refs.canvas.removeEventListener('mousemove', this.pointerMoveHandler);
    }

    if (this.$refs.canvas && this.pointerDownHandler) {
      this.$refs.canvas.removeEventListener('pointerdown', this.pointerDownHandler);
    }

    if (this.$refs.canvas && this.pointerLeaveHandler) {
      this.$refs.canvas.removeEventListener('mouseleave', this.pointerLeaveHandler);
    }

    if (this.$refs.canvas && this.clickHandler) {
      this.$refs.canvas.removeEventListener('click', this.clickHandler);
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    Object.values(this.pawnMeshes).forEach((mesh) => this.scene?.remove(mesh));

    if (this.diceMesh) {
      this.scene?.remove(this.diceMesh);
    }

    this.dicePhysicsBody = null;
    this.physicsWorld = null;
    this.physicsLastTime = null;
    this.pendingDiceRoll = null;
    this.shadowLight = null;
    this.pawnMotionStates = markRaw({});

    if (this.controls && this.controlsChangeHandler) {
      this.controls.removeEventListener('change', this.controlsChangeHandler);
    }

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    this.disposeSharedResources();
  },
  methods: {
    addEventListeners() {
      this.eventUnsubscribers = [
        EventBus.listen(EventKeys.turns.endTurn, this.changePlayersTurn),
        EventBus.listen(EventKeys.turns.repeatTurn, this.repeatPlayersTurn),
        EventBus.listen(EventKeys.rollDice, this.rollDice),
        EventBus.listen(EventKeys.game.start, this.startGame),
        EventBus.listen(EventKeys.game.startOnline, this.startOnlineGame),
        EventBus.listen(EventKeys.game.won, this.handleGameWon),
        EventBus.listen(EventKeys.net.diceResult, this.handleNetDiceResult),
        EventBus.listen(EventKeys.net.turnChange, this.handleNetTurnChange),
        EventBus.listen(EventKeys.net.stateSync, this.handleNetStateSync),
        EventBus.listen(EventKeys.net.lobbyUpdated, this.syncOnlinePlayersFromLobby),
      ];
    },

    handleKeydown(event) {
      if (event.code !== 'Space' || this.store.currentScreen !== 'game-screen') {
        return;
      }

      event.preventDefault();
      this.rollDice();
    },

    initThreeScene() {
      const canvas = this.$refs.canvas;
      const scene = new THREE.Scene();
      scene.background = this.getSkyGradientTexture(this.store.settings.environment);

      const camera = new THREE.PerspectiveCamera(
          CAMERA_FOV_LANDSCAPE,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
      );
      camera.position.set(5.6, 12.4, 16.2);
      camera.lookAt(new THREE.Vector3(5, 0.4, 5));

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.98;
      // PCFSoftShadowMap is deprecated in three r183+ (falls back to PCF).
      renderer.shadowMap.type = THREE.PCFShadowMap;
      // Shadows render on demand (requestShadowUpdate): every caster is
      // static except the dice, the pawns, and the environment lights.
      renderer.shadowMap.autoUpdate = false;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);

      const controls = markRaw(new OrbitControls(camera, renderer.domElement));
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.minDistance = 9;
      controls.maxDistance = 24;
      controls.minPolarAngle = Math.PI / 5;
      controls.maxPolarAngle = Math.PI / 2.15;
      // Restricted view: the board is meant to be seen from the player's
      // side, not orbited fully.
      controls.minAzimuthAngle = -Math.PI / 6;
      controls.maxAzimuthAngle = Math.PI / 6;
      controls.target.set(5, 0.4, 5);
      controls.update();

      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      const isMobile = this.isMobile;
      if (isMobile) {
        controls.minDistance = 11;
        controls.maxDistance = 18;
        controls.minPolarAngle = Math.PI / 4;
        controls.maxPolarAngle = Math.PI / 2.3;
        controls.minAzimuthAngle = -Math.PI / 8;
        controls.maxAzimuthAngle = Math.PI / 8;
      }

      this.scene = markRaw(scene);
      this.camera = markRaw(camera);
      this.renderer = markRaw(renderer);
      if (import.meta.env.DEV) {
        window.__burrecRenderer = renderer; // profiling hook, dev server only
      }
      this.controls = controls;
      if (this.isMenuMode()) {
        controls.enabled = false;
      }
      this.raycaster = markRaw(new THREE.Raycaster());
      this.pointer = markRaw(new THREE.Vector2());
      this.controlsChangeHandler = () => {
        if (this.isPointerInsideCanvas) {
          this.hoverNeedsUpdate = true;
        }
      };
      controls.addEventListener('change', this.controlsChangeHandler);

      this.createBoard();
      this.createLights();
      this.createPhysicsWorld();
      this.createDice();
      this.createHomeBaseHelpers();
      this.createGrassAndTrees();
      this.applyRenderQuality();
      this.applyOutlineAppearance();
      this.handleResize();
      this.renderScene();
    },

    createBoard() {
      this.createCartoonSurroundings();
      this.createGroundEnvironment();

      // Both slabs carry the pit cutout; origin sits at the slab bottom.
      const boardBase = this.createOutlinedMesh(
          this.getSharedGeometry('board-base-pit', () => createSlabWithPitHole(BOARD_BASE_SIZE, 0.3)),
          this.createToonMaterial('board-base-material', {
            color: '#eca95d',
            roughness: 0.72,
            metalness: 0.03,
          }, {
            outlineThickness: 0.012,
            outlineColor: '#5b3115',
          }),
          { outlineScale: { x: 1.022, y: 1.008, z: 1.022 }, receiveShadow: true },
      );
      boardBase.position.set(BOARD_CENTER.x, -0.3, BOARD_CENTER.z);
      this.scene.add(boardBase);

      const boardTop = this.createOutlinedMesh(
          this.getSharedGeometry('board-top-pit', () => createSlabWithPitHole(BOARD_TOP_SIZE, 0.08)),
          this.createToonMaterial('board-top-material', {
            color: '#fff0bf',
            roughness: 0.88,
            metalness: 0.01,
          }, {
            outlineThickness: 0.0095,
            outlineColor: '#735227',
          }),
          { outlineScale: { x: 1.014, y: 1.01, z: 1.014 }, receiveShadow: true },
      );
      boardTop.position.set(BOARD_CENTER.x, -0.02, BOARD_CENTER.z);
      this.scene.add(boardTop);

      this.createDicePit();

      const fieldGeometry = this.getSharedGeometry(
          'field-cylinder',
          () => new THREE.CylinderGeometry(0.27, 0.31, 0.08, 20),
      );
      const startGeometry = this.getSharedGeometry(
          'start-cylinder',
          () => new THREE.CylinderGeometry(0.31, 0.35, 0.1, 20),
      );
      const homeGeometry = this.getSharedGeometry(
          'home-cylinder',
          () => new THREE.CylinderGeometry(0.37, 0.42, 0.08, 20),
      );

      const pathTiles = this.createOutlinedInstancedSet(
          fieldGeometry,
          this.createToonMaterial('path-material', {
            color: '#fffaf0',
            roughness: 0.82,
            metalness: 0.01,
          }, {
            outlineThickness: 0.0068,
            outlineColor: '#85623c',
          }),
          this.store.fields.path.map((field) => ({ x: field.x, y: FIELD_CENTER_Y, z: field.z })),
          { outlineScale: { x: 1.06, y: 1.01, z: 1.06 }, receiveShadow: true },
      );
      this.scene.add(pathTiles);

      this.store.fields.home.forEach((home, playerIndex) => {
        const playerFieldMaterial = this.createToonMaterial(
            `field-material-${playerIndex}`,
            {
              color: home.color,
              roughness: 0.8,
              metalness: 0.02,
            },
            {
              outlineThickness: 0.0072,
            },
        );
        const homeTiles = this.createOutlinedInstancedSet(
            homeGeometry,
            playerFieldMaterial,
            home.fields.map((field) => ({ x: field.x, y: FIELD_CENTER_Y, z: field.z })),
            { outlineScale: { x: 1.062, y: 1.01, z: 1.062 }, receiveShadow: true },
        );
        this.scene.add(homeTiles);

        const targetTiles = this.createOutlinedInstancedSet(
            fieldGeometry,
            playerFieldMaterial,
            this.store.fields.target[playerIndex].fields.map((field) => ({ x: field.x, y: FIELD_CENTER_Y, z: field.z })),
            { outlineScale: { x: 1.062, y: 1.01, z: 1.062 }, receiveShadow: true },
        );
        this.scene.add(targetTiles);

        const startField = this.store.fields.path[playerIndex * 10];
        const startMesh = this.createOutlinedInstancedSet(
            startGeometry,
            playerFieldMaterial,
            [{ x: startField.x, y: START_FIELD_CENTER_Y, z: startField.z }],
            { outlineScale: { x: 1.07, y: 1.012, z: 1.07 }, receiveShadow: true },
        );
        this.scene.add(startMesh);
      });
    },

    createCartoonSurroundings() {
      const meadow = this.createOutlinedMesh(
          this.getSharedGeometry('meadow-top', () => new THREE.CylinderGeometry(18.4, 19.6, 0.42, 48)),
          this.createToonMaterial('meadow-top-material', {
            color: '#8cdd68',
          }, {
            outlineThickness: 0.012,
            outlineColor: '#1d3819',
          }),
      );
      meadow.position.set(6.2, -1.58, 5);
      this.scene.add(meadow);

      const meadowEdge = this.createOutlinedMesh(
          this.getSharedGeometry('meadow-edge', () => new THREE.CylinderGeometry(19.8, 21.4, 0.6, 48)),
          this.createToonMaterial('meadow-edge-material', {
            color: '#5ba34b',
          }, {
            outlineThickness: 0.011,
            outlineColor: '#163216',
          }),
      );
      meadowEdge.position.set(6.2, -1.9, 5);
      this.scene.add(meadowEdge);

      const hillGeometry = this.getSharedGeometry('surrounding-hill', () => new THREE.SphereGeometry(1, 24, 24));
      const hillConfigs = [
        { x: -8.8, y: -0.18, z: -9.4, scale: [7.8, 2.9, 3.4], color: '#7dcb6f' },
        { x: 5.4, y: 0.06, z: -11.8, scale: [8.8, 3.6, 3.8], color: '#8fda7d' },
        { x: 18.4, y: -0.2, z: -8.8, scale: [6.8, 2.7, 3], color: '#6fc262' },
        { x: -9.8, y: -0.12, z: 18.2, scale: [8.6, 3.1, 3.6], color: '#78c768' },
        { x: 7.8, y: -0.08, z: 20.6, scale: [10.2, 3.7, 4.1], color: '#89d876' },
        { x: 20.6, y: -0.16, z: 18.4, scale: [7.4, 2.8, 3.3], color: '#73c05e' },
      ];

      // One instanced draw for all hills; the per-hill tint rides on
      // instance colors over a white base material.
      const hills = this.createStaticInstancedMesh(
          hillGeometry,
          this.createToonMaterial('surrounding-hill-material', { color: '#ffffff' }),
          hillConfigs.length,
      );
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      hillConfigs.forEach((hill, index) => {
        matrix.compose(
            new THREE.Vector3(hill.x, hill.y, hill.z),
            quaternion,
            new THREE.Vector3(hill.scale[0], hill.scale[1], hill.scale[2]),
        );
        hills.setMatrixAt(index, matrix);
        hills.setColorAt(index, new THREE.Color(hill.color));
      });
      hills.instanceColor.needsUpdate = true;
      this.finalizeInstancedMesh(hills);

      const bushGeometry = this.getSharedGeometry('surrounding-bush', () => new THREE.SphereGeometry(1, 20, 20));
      const bushConfigs = [
        { x: -2.6, y: -1.04, z: -5.4, scale: [0.9, 0.68, 0.7] },
        { x: 12.6, y: -1.02, z: -4.8, scale: [1.1, 0.72, 0.78] },
        { x: -1.8, y: -1.02, z: 14.9, scale: [1.15, 0.78, 0.84] },
        { x: 13.8, y: -1.03, z: 15.3, scale: [1.02, 0.7, 0.74] },
        { x: -5.8, y: -1.02, z: 5.6, scale: [0.96, 0.7, 0.72] },
        { x: 18.1, y: -1.02, z: 5.2, scale: [1.08, 0.76, 0.8] },
      ];
      const bushes = this.createStaticInstancedMesh(
          bushGeometry,
          this.createToonMaterial('surrounding-bush-material', { color: '#4ebf63' }),
          bushConfigs.length,
      );
      bushConfigs.forEach((bush, index) => {
        matrix.compose(
            new THREE.Vector3(bush.x, bush.y, bush.z),
            quaternion,
            new THREE.Vector3(bush.scale[0], bush.scale[1], bush.scale[2]),
        );
        bushes.setMatrixAt(index, matrix);
      });
      this.finalizeInstancedMesh(bushes);

      const sun = this.createOutlinedMesh(
          this.getSharedGeometry('cartoon-sun', () => new THREE.SphereGeometry(1, 24, 24)),
          this.createToonMaterial('cartoon-sun-material', {
            color: '#ffd65c',
          }, {
            outlineThickness: 0.01,
            outlineColor: '#8d5a18',
          }),
      );
      sun.position.set(-7.5, 11.6, -17.5);
      sun.scale.set(2.4, 2.4, 2.4);
      this.scene.add(sun);

      this.createCloudsInstanced();
    },

    createGroundEnvironment() {
      const tableTop = this.createOutlinedMesh(
          this.getSharedGeometry(
              'table-top',
              () => new THREE.BoxGeometry(
                  TABLE_PHYSICS.topSize.width,
                  TABLE_PHYSICS.topSize.height,
                  TABLE_PHYSICS.topSize.depth,
              ),
          ),
          this.createToonMaterial('table-top-material', {
            color: '#c98748',
            roughness: 0.78,
            metalness: 0.04,
          }, {
            outlineThickness: 0.012,
            outlineColor: '#392012',
          }),
          { receiveShadow: true },
      );
      tableTop.position.set(TABLE_PHYSICS.center.x, TABLE_PHYSICS.topY, TABLE_PHYSICS.center.z);
      this.scene.add(tableTop);

      const tableSupport = this.createOutlinedMesh(
          this.getSharedGeometry('table-support', () => new THREE.BoxGeometry(11, 0.26, 11)),
          this.createToonMaterial('table-support-material', {
            color: '#8f6037',
            roughness: 0.82,
            metalness: 0.03,
          }, {
            outlineThickness: 0.011,
            outlineColor: '#2a170f',
          }),
          { receiveShadow: true },
      );
      tableSupport.position.set(TABLE_PHYSICS.center.x, -0.96, TABLE_PHYSICS.center.z);
      this.scene.add(tableSupport);

      const floor = this.createOutlinedMesh(
          this.getSharedGeometry('table-floor', () => new THREE.BoxGeometry(26, 0.08, 18.5)),
          this.createToonMaterial('table-floor-material', {
            color: '#e9d39d',
            roughness: 0.92,
            metalness: 0,
          }, {
            outlineThickness: 0.01,
            outlineColor: '#705537',
          }),
          { receiveShadow: true },
      );
      floor.position.set(6.2, -1.18, 5);
      this.scene.add(floor);
    },

    createLights() {
      const ambientLight = markRaw(new THREE.AmbientLight('#f6f0e7', 0.28));
      const skyLight = markRaw(new THREE.HemisphereLight('#d2e6ff', '#97ae72', 0.62));
      const sunLight = markRaw(new THREE.DirectionalLight('#fff1db', 1.45));
      const fillLight = markRaw(new THREE.DirectionalLight('#c7dfff', 0.42));
      const trayLight = markRaw(new THREE.PointLight('#ffd6a8', 0.18, 12));

      sunLight.position.set(-5.5, 13.5, 6.5);
      sunLight.target.position.set(5.4, 0.7, 5.1);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.set(1024, 1024);
      sunLight.shadow.camera.near = 1;
      sunLight.shadow.camera.far = 34;
      sunLight.shadow.camera.left = -10;
      sunLight.shadow.camera.right = 10;
      sunLight.shadow.camera.top = 10;
      sunLight.shadow.camera.bottom = -10;
      sunLight.shadow.bias = -0.00018;
      sunLight.shadow.normalBias = 0.025;

      fillLight.position.set(16, 7.5, 14.5);
      trayLight.position.set(DICE_PIT.center.x, 2.6, DICE_PIT.center.z);
      
      this.shadowLight = sunLight;
      this.ambientLight = ambientLight;
      this.skyLight = skyLight;
      this.sunLight = sunLight;
      this.fillLight = fillLight;
      this.trayLight = trayLight;

      this.scene.add(ambientLight);
      this.scene.add(skyLight);
      this.scene.add(sunLight);
      this.scene.add(sunLight.target);
      this.scene.add(fillLight);
      this.scene.add(trayLight);

      this.applyEnvironment();
    },

    // Lines the pit cutout with a single lathe profile: a small lip that
    // overlaps the board around the cutout, a beveled rim sloping into the
    // hole, the vertical wall, and the floor the dice rests on. Neutral
    // board tones — the lighting shades the slope and wall darker on its
    // own, which is what makes the recess read as depth.
    createDicePit() {
      const surfaceY = BOARD_TOP_SURFACE_Y + 0.002;
      const bevelBottomY = 0.004;
      const liner = markRaw(new THREE.Mesh(
          this.getSharedGeometry('dice-pit-liner', () => new THREE.LatheGeometry([
            new THREE.Vector2(DICE_PIT.holeRadius + 0.06, surfaceY),
            new THREE.Vector2(DICE_PIT.holeRadius, surfaceY),
            new THREE.Vector2(DICE_PIT.innerRadius, bevelBottomY),
            new THREE.Vector2(DICE_PIT.innerRadius, DICE_PIT.floorY),
            new THREE.Vector2(0.001, DICE_PIT.floorY),
          ], 64)),
          this.createToonMaterial('dice-pit-liner-material', {
            color: '#e8d8a9',
            side: THREE.DoubleSide,
          }),
      ));
      liner.name = 'dice-pit';
      liner.position.set(DICE_PIT.center.x, 0, DICE_PIT.center.z);
      liner.receiveShadow = true;
      this.dicePitMesh = liner;
      this.scene.add(liner);
    },

    createPhysicsWorld() {
      const world = markRaw(new CANNON.World({
        gravity: new CANNON.Vec3(0, -18, 0),
      }));
      world.allowSleep = true;
      world.broadphase = new CANNON.SAPBroadphase(world);
      // The dice is the only dynamic body, so the default contact material
      // is effectively the dice contact: low friction + a bit of bounce so
      // it slides off edges and walls instead of sticking tilted.
      world.defaultContactMaterial.friction = 0.08;
      world.defaultContactMaterial.restitution = 0.3;

      const pitFloorBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(
            DICE_PIT.holeRadius + 0.2,
            0.06,
            DICE_PIT.holeRadius + 0.2,
        )),
        position: new CANNON.Vec3(
            DICE_PIT.center.x,
            DICE_PIT.floorY - 0.06,
            DICE_PIT.center.z,
        ),
      });
      world.addBody(pitFloorBody);

      const tableBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(
            TABLE_PHYSICS.topSize.width / 2,
            TABLE_PHYSICS.topSize.height / 2,
            TABLE_PHYSICS.topSize.depth / 2,
        )),
        position: new CANNON.Vec3(
            TABLE_PHYSICS.center.x,
            TABLE_PHYSICS.topY,
            TABLE_PHYSICS.center.z,
        ),
      });
      world.addBody(tableBody);

      const safetyFloor = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        position: new CANNON.Vec3(0, TABLE_PHYSICS.floorY, 0),
      });
      safetyFloor.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      world.addBody(safetyFloor);

      // Invisible pit walls: eight tall boxes forming an octagon around the
      // pit rim. Tangent orientation: rotating a +x-long box by
      // -(angle + 90°) about Y lines it up with the rim.
      for (let i = 0; i < 8; i += 1) {
        const angle = (i * Math.PI) / 4;
        const wall = new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(0.65, DICE_PIT.wallHeight / 2, 0.1)),
          position: new CANNON.Vec3(
              DICE_PIT.center.x + (DICE_PIT.wallRadius * Math.cos(angle)),
              DICE_PIT.floorY + (DICE_PIT.wallHeight / 2),
              DICE_PIT.center.z + (DICE_PIT.wallRadius * Math.sin(angle)),
          ),
        });
        wall.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -angle - (Math.PI / 2));
        world.addBody(wall);
      }

      this.physicsWorld = world;
      this.physicsLastTime = performance.now();
    },

    createDice() {
      const diceMesh = this.createOutlinedMesh(
          // RoundedBoxGeometry keeps BoxGeometry's six material groups, so
          // the per-face pip textures still map.
          this.getSharedGeometry('dice-box', () => new RoundedBoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE, 3, DICE_CORNER_RADIUS)),
          this.createDiceMaterials(),
          { outlineScale: 1.09, castShadow: true, receiveShadow: true },
      );

      diceMesh.name = 'dice';
      this.diceMesh = markRaw(diceMesh);
      if (this.isMobile) {
        diceMesh.visible = false;
      }
      this.scene.add(diceMesh);

      const diceBody = markRaw(new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(DICE_SIZE / 2, DICE_SIZE / 2, DICE_SIZE / 2)),
        allowSleep: true,
        sleepSpeedLimit: 0.16,
        sleepTimeLimit: 0.35,
        // Bleeds off residual spin so the dice flops onto a face instead of
        // pirouetting on an edge.
        angularDamping: 0.08,
      }));
      this.physicsWorld?.addBody(diceBody);
      this.dicePhysicsBody = diceBody;
      this.resetDiceBody();
      this.syncDice();
    },

    renderScene() {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        
        this.updateCameraPath();

        this.updateGrassSway(performance.now() * 0.0025);

        const rippleTime = performance.now() * RIPPLE_TIME_SCALE;

        if (this.homeBaseHelpers && (this.store.currentScreen === 'add-players' || this.store.currentScreen === 'lobby')) {
          this.homeBaseHelpers.forEach((group, baseIdx) => {
            group.visible = true;
            let isEmpty = false;
            if (this.store.currentScreen === 'add-players') {
              isEmpty = !this.store.localSetupActive[baseIdx];
            } else {
              isEmpty = !this.store.online.seats[baseIdx];
            }

            const rings = this.homeBaseRippleRings[baseIdx];
            if (rings) {
              rings.forEach((ring, ringIdx) => {
                if (isEmpty) {
                  const phase = (rippleTime + ringIdx * 0.5) % 1.0;
                  const scale = 0.2 + phase * 1.15;
                  ring.scale.set(scale, scale, 1);
                  ring.material.opacity = (1 - phase) * 0.65;
                  ring.visible = true;
                } else {
                  const scale = ringIdx === 0 ? 0.95 : 0.7;
                  ring.scale.set(scale, scale, 1);
                  ring.material.opacity = 0.5;
                  ring.visible = true;
                }
              });
            }
          });
        } else if (this.homeBaseHelpers) {
          this.homeBaseHelpers.forEach((group) => {
            group.visible = false;
          });
        }

        this.animateClickableRipples(rippleTime);

        if (this.controls && !this.isMenuMode() && !this.cameraTransition) {
          this.controls.update();
        }
        
        this.stepPhysicsWorld();
        this.syncDice();
        this.syncPawns();
        if (this.hoverNeedsUpdate) {
          this.refreshHoveredTarget();
        }
        this.renderer.render(this.scene, this.camera);
        this.renderHighlights2D();
      };

      animate();
    },

    syncDice() {
      if (!this.diceMesh || !this.dicePhysicsBody) {
        return;
      }

      const mesh = this.diceMesh;
      const body = this.dicePhysicsBody;
      const targetY = body.position.y + DICE_VISUAL_FLOAT_Y;

      if (
        mesh.position.x !== body.position.x ||
        mesh.position.y !== targetY ||
        mesh.position.z !== body.position.z
      ) {
        mesh.position.set(body.position.x, targetY, body.position.z);
        this.requestShadowUpdate();
      }

      if (this.diceSnapTween) {
        const tween = this.diceSnapTween;
        const progress = Math.min((performance.now() - tween.start) / tween.duration, 1);
        mesh.quaternion.slerpQuaternions(tween.from, tween.to, progress);
        this.requestShadowUpdate();
        if (progress >= 1) {
          this.diceSnapTween = null;
        }
        return;
      }

      if (
        mesh.quaternion.x !== body.quaternion.x ||
        mesh.quaternion.y !== body.quaternion.y ||
        mesh.quaternion.z !== body.quaternion.z ||
        mesh.quaternion.w !== body.quaternion.w
      ) {
        mesh.quaternion.set(
            body.quaternion.x,
            body.quaternion.y,
            body.quaternion.z,
            body.quaternion.w,
        );
        this.requestShadowUpdate();
      }
    },

    stepPhysicsWorld() {
      if (!this.physicsWorld) {
        return;
      }

      // The dice is the only dynamic body: once it sleeps with no roll in
      // flight there is nothing left to simulate.
      if (!this.pendingDiceRoll && this.dicePhysicsBody?.sleepState === CANNON.Body.SLEEPING) {
        this.physicsLastTime = null;
        return;
      }

      const now = performance.now();
      const deltaSeconds = Math.min((now - (this.physicsLastTime ?? now)) / 1000, 1 / 20);
      this.physicsLastTime = now;
      this.physicsWorld.step(1 / 60, deltaSeconds, 4);

      if (this.pendingDiceRoll && this.dicePhysicsBody) {
        const isSleeping = this.dicePhysicsBody.sleepState === CANNON.Body.SLEEPING;
        const isSlowEnough = this.dicePhysicsBody.velocity.lengthSquared() < 0.03 &&
          this.dicePhysicsBody.angularVelocity.lengthSquared() < 0.03;
        const canEvaluateRestState = now - this.pendingDiceRoll.startedAt > DICE_SETTLE_RULES.minimumMotionMs;

        if (this.dicePhysicsBody.position.y < TABLE_PHYSICS.floorY - 2) {
          this.resetDiceBody();
          this.finishDiceSettle(null);
          return;
        }

        if (!canEvaluateRestState || (!isSleeping && !isSlowEnough)) {
          return;
        }

        const faceData = this.getDiceTopFaceData();

        if (faceData.dot >= DICE_SETTLE_RULES.faceUpDotThreshold) {
          this.finishDiceSettle(faceData);
          return;
        }

        if (this.pendingDiceRoll.recoveryAttempts >= DICE_SETTLE_RULES.maxRecoveryAttempts) {
          this.finishDiceSettle(faceData);
          return;
        }

        if (
          now - this.pendingDiceRoll.lastRecoveryAt >= DICE_SETTLE_RULES.recoveryCooldownMs
        ) {
          this.recoverTiltedDice(faceData, now);
        }
      }
    },

    syncPawns() {
      const now = performance.now();
      const activePawnIds = new Set();

      this.store.players.forEach((player) => {
        player.pawns.forEach((pawn) => {
          activePawnIds.add(pawn.id);
          this.ensurePawnMesh(pawn);

          const pawnMesh = this.pawnMeshes[pawn.id];
          if (!pawnMesh.visible) {
            pawnMesh.visible = true;
            this.requestShadowUpdate();
          }

          const animatedPosition = this.getAnimatedPawnPosition(pawn, now);
          const targetScale = pawn.isActive ? 1.1 : 1;

          if (
            pawnMesh.position.x !== animatedPosition.x ||
            pawnMesh.position.y !== animatedPosition.y ||
            pawnMesh.position.z !== animatedPosition.z ||
            pawnMesh.scale.x !== targetScale
          ) {
            this.requestShadowUpdate();
          }

          pawnMesh.position.set(
              animatedPosition.x,
              animatedPosition.y,
              animatedPosition.z,
          );

          pawnMesh.scale.setScalar(targetScale);
        });
      });

      // Hide any cached pawn meshes that are no longer active in store.players
      Object.keys(this.pawnMeshes).forEach((pawnId) => {
        if (!activePawnIds.has(pawnId) && this.pawnMeshes[pawnId].visible) {
          this.pawnMeshes[pawnId].visible = false;
          this.requestShadowUpdate();
        }
      });

      if (this.pawnOutlineSyncPending) {
        this.pawnOutlineSyncPending = false;
        this.applyOutlineAppearance();
      }
    },

    getPawnJumpHeight(pawn) {
      if (pawn.position === 0) {
        return 0.2;
      }

      if (pawn.position > 40) {
        return 0.24;
      }

      return 0.34;
    },

    getAnimatedPawnPosition(pawn, now) {
      const coordinates = pawn.getCoordinates(PAWN_CENTER_Y);
      const targetX = coordinates.x;
      const targetY = coordinates.y + (pawn.isActive ? PAWN_ACTIVE_LIFT_Y : 0);
      const targetZ = coordinates.z;

      let motion = this.pawnMotionStates[pawn.id];
      if (!motion) {
        motion = markRaw({
          current: { x: targetX, y: targetY, z: targetZ },
          from: { x: targetX, y: targetY, z: targetZ },
          to: { x: targetX, y: targetY, z: targetZ },
          position: pawn.position,
          globalPosition: pawn.globalPosition,
          inDestination: pawn.isInDestinationField,
          startTime: now,
          duration: PAWN_STEP_DURATION_MS,
          jumpHeight: this.getPawnJumpHeight(pawn),
          isAnimating: false,
        });
        this.pawnMotionStates[pawn.id] = motion;
      }

      if (
        motion.position !== pawn.position ||
        motion.globalPosition !== pawn.globalPosition ||
        motion.inDestination !== pawn.isInDestinationField
      ) {
        motion.from.x = motion.current.x;
        motion.from.y = motion.current.y;
        motion.from.z = motion.current.z;
        motion.to.x = targetX;
        motion.to.y = targetY;
        motion.to.z = targetZ;
        motion.position = pawn.position;
        motion.globalPosition = pawn.globalPosition;
        motion.inDestination = pawn.isInDestinationField;
        motion.startTime = now;
        motion.jumpHeight = this.getPawnJumpHeight(pawn);
        motion.isAnimating = true;
      }

      if (!motion.isAnimating) {
        motion.current.x = targetX;
        motion.current.y = targetY;
        motion.current.z = targetZ;
        return motion.current;
      }

      const progress = Math.min((now - motion.startTime) / motion.duration, 1);
      if (progress >= 1) {
        motion.current.x = motion.to.x;
        motion.current.y = motion.to.y;
        motion.current.z = motion.to.z;
        motion.isAnimating = false;
        return motion.current;
      }

      motion.current.x = motion.from.x + ((motion.to.x - motion.from.x) * progress);
      motion.current.y = motion.from.y + ((motion.to.y - motion.from.y) * progress)
          + (Math.sin(Math.PI * progress) * motion.jumpHeight);
      motion.current.z = motion.from.z + ((motion.to.z - motion.from.z) * progress);
      return motion.current;
    },

    ensurePawnMesh(pawn) {
      if (this.pawnMeshes[pawn.id]) {
        return;
      }

      const group = markRaw(new THREE.Group());
      const bodyMaterial = this.createToonMaterial(
          `pawn-body-material-${pawn.playerIndex}`,
          {
            color: pawn.color,
          },
          {
            outlineThickness: 0.01,
          },
      );
      const headMaterial = this.createToonMaterial(
          `pawn-head-material-${pawn.playerIndex}`,
          {
            color: pawn.color,
          },
          {
            outlineThickness: 0.0095,
          },
      );

      const body = this.createOutlinedMesh(
          this.getSharedGeometry('pawn-body', () => new THREE.CylinderGeometry(0.08, 0.28, 0.75, 24)),
          bodyMaterial,
          { castShadow: true, receiveShadow: true },
      );
      body.position.y = 0.35;
      this.attachOutlineShell(
          body,
          1.055,
      );

      const head = this.createOutlinedMesh(
          this.getSharedGeometry('pawn-head', () => new THREE.SphereGeometry(0.18, 24, 24)),
          headMaterial,
          { castShadow: true, receiveShadow: true },
      );
      head.position.y = 0.85;
      this.attachOutlineShell(
          head,
          1.075,
      );

      group.name = `cube-${pawn.id}`;
      group.add(body);
      group.add(head);

      this.pawnMeshes[pawn.id] = group;
      this.scene.add(group);
      // Batched in syncPawns: one applyOutlineAppearance traverse per frame
      // instead of one per created pawn mesh.
      this.pawnOutlineSyncPending = true;
    },

    createOutlinedMesh(geometry, material, options = {}) {
      const mesh = markRaw(new THREE.Mesh(geometry, material));
      mesh.castShadow = Boolean(options.castShadow);
      mesh.receiveShadow = Boolean(options.receiveShadow);
      if (options.outlineScale) {
        this.attachOutlineShell(mesh, options.outlineScale);
      }
      return mesh;
    },

    createOutlinedInstancedSet(geometry, material, positions, options = {}) {
      const fillMesh = markRaw(new THREE.InstancedMesh(geometry, material, positions.length));
      fillMesh.castShadow = Boolean(options.castShadow);
      fillMesh.receiveShadow = Boolean(options.receiveShadow);
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3(1, 1, 1);

      positions.forEach((position, index) => {
        matrix.compose(
            new THREE.Vector3(position.x, position.y, position.z),
            quaternion,
            scale,
        );
        fillMesh.setMatrixAt(index, matrix);
      });

      fillMesh.instanceMatrix.needsUpdate = true;

      if (options.outlineScale) {
        const outlineMesh = markRaw(new THREE.InstancedMesh(
            geometry,
            this.getOutlineShellMaterial(),
            positions.length,
        ));
        outlineMesh.userData.isOutlineShell = true;
        outlineMesh.userData.baseOutlineScale = options.outlineScale;
        outlineMesh.userData.outlinePositions = positions.map((position) => ({
          x: position.x,
          y: position.y,
          z: position.z,
        }));
        outlineMesh.renderOrder = 1;
        outlineMesh.castShadow = false;
        outlineMesh.receiveShadow = false;
        fillMesh.renderOrder = 2;
        this.applyInstancedOutlineMatrices(outlineMesh, outlineMesh.userData.outlinePositions, options.outlineScale, 1);
        fillMesh.add(outlineMesh);
      }

      return fillMesh;
    },

    renderHighlights2D() {
      const canvas = this.$refs.overlayCanvas;
      const ctx = this.overlayCtx;
      if (!canvas || !ctx) return;

      // Idle "clickable" cues are the ground ripples (animateClickableRipples);
      // the 2D hull outline is hover feedback only, so most frames draw nothing.
      const status = this.store.gamePlayStatus;
      const wantsDice = Boolean(this.diceMesh && status.isRolling
          && (this.hoveredTarget === 'dice' || this.hoveredTarget === 'dice-pit')
          && this.isHumanTurn());
      const wantsPawn = Boolean(status.isMoving && this.hoveredTarget
          && this.hoveredTarget.startsWith('cube-') && this.isHumanTurn());

      if (!wantsDice && !wantsPawn) {
        if (this.overlayHasContent) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.overlayHasContent = false;
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let drew = false;

      if (wantsDice) {
        this.drawObjectHighlight2D(
          ctx, canvas,
          [this.getDiceOutlinePoints()],
          0.95,
          '#ffaa22',
        );
        drew = true;
      } else {
        const pawn = this.findPawnByMeshName(this.hoveredTarget);
        const mesh = pawn?.isActive ? this.pawnMeshes[pawn.id] : null;
        if (mesh) {
          this.drawObjectHighlight2D(
            ctx, canvas,
            [this.getPawnBodyOutlinePoints(mesh), this.getPawnHeadOutlinePoints(mesh)],
            0.95,
            '#ffaa22',
          );
          drew = true;
        }
      }

      this.overlayHasContent = drew;
    },

    getDiceOutlinePoints() {
      const h = DICE_SIZE / 2;
      return [
        new THREE.Vector3(-h, -h, -h), new THREE.Vector3(-h, -h,  h),
        new THREE.Vector3(-h,  h, -h), new THREE.Vector3(-h,  h,  h),
        new THREE.Vector3( h, -h, -h), new THREE.Vector3( h, -h,  h),
        new THREE.Vector3( h,  h, -h), new THREE.Vector3( h,  h,  h),
      ].map((v) => v.applyMatrix4(this.diceMesh.matrixWorld));
    },

    getPawnBodyOutlinePoints(group) {
      const pts = [];
      const n = 20;
      const levels = [
        { y: -0.025, r: 0.28 },
        { y: 0.175,  r: 0.227 },
        { y: 0.35,   r: 0.18 },
        { y: 0.55,   r: 0.127 },
        { y: 0.725,  r: 0.08 },
      ];
      for (const { y, r } of levels) {
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
        }
      }
      return pts.map((v) => v.applyMatrix4(group.matrixWorld));
    },

    getPawnHeadOutlinePoints(group) {
      const pts = [];
      const n = 20;
      const r = 0.18;
      const cy = 0.85;
      const sinLatitudes = [-0.85, -0.6, -0.35, -0.1, 0.15, 0.4, 0.65, 0.85, 1.0];
      for (const sinLat of sinLatitudes) {
        const ringR = r * Math.sqrt(Math.max(0, 1 - sinLat * sinLat));
        const ringY = cy + sinLat * r;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * ringR, ringY, Math.sin(a) * ringR));
        }
      }
      return pts.map((v) => v.applyMatrix4(group.matrixWorld));
    },

    drawObjectHighlight2D(ctx, canvas, worldPointSets, opacity, color) {
      const w = canvas.width;
      const h = canvas.height;

      const hulls = worldPointSets.map((worldPoints) => {
        const screenPts = worldPoints.map((wp) => {
          const v = wp.clone().project(this.camera);
          return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h };
        });
        return this.convexHull2D(screenPts);
      }).filter((hull) => hull.length >= 2);

      if (!hulls.length) return;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 12;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      for (const hull of hulls) {
        ctx.beginPath();
        this.smoothHullPath(ctx, hull);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      for (const hull of hulls) {
        ctx.beginPath();
        this.smoothHullPath(ctx, hull);
        ctx.fill();
      }

      ctx.restore();
    },

    smoothHullPath(ctx, hull) {
      if (hull.length < 3) {
        ctx.moveTo(hull[0].x, hull[0].y);
        if (hull.length === 2) ctx.lineTo(hull[1].x, hull[1].y);
        return;
      }
      const n = hull.length;
      const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      const start = mid(hull[n - 1], hull[0]);
      ctx.moveTo(start.x, start.y);
      for (let i = 0; i < n; i++) {
        const curr = hull[i];
        const next = hull[(i + 1) % n];
        const m = mid(curr, next);
        ctx.quadraticCurveTo(curr.x, curr.y, m.x, m.y);
      }
      ctx.closePath();
    },

    convexHull2D(points) {
      if (points.length <= 2) return points;
      const sorted = [...points].sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
      const cross = (o, a, b) =>
        (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
      const lower = [];
      for (const p of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
        lower.push(p);
      }
      const upper = [];
      for (let i = sorted.length - 1; i >= 0; i--) {
        const p = sorted[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
        upper.push(p);
      }
      lower.pop();
      upper.pop();
      return lower.concat(upper);
    },

    createToonMaterial(key, materialOptions = {}) {
      return this.getSharedMaterial(
          key,
          () => {
            // Lambert keeps the flat cartoon look the old MeshStandardMaterial
            // produced here at a fraction of the per-fragment lighting cost.
            // PBR params some callers still pass don't apply to it.
            const { roughness, metalness, ...options } = materialOptions;
            void roughness;
            void metalness;
            const material = markRaw(new THREE.MeshLambertMaterial(options));
            this.prepareFillMaterial(material);
            return material;
          },
      );
    },

    getOutlineShellMaterial() {
      return this.getSharedMaterial(
          'outline-shell-material',
          () => markRaw(new THREE.MeshBasicMaterial({
            color: OUTLINE_COLOR,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            toneMapped: false,
          })),
      );
    },

    getOutlineScaleVector(baseScale, lineScale = 1) {
      const normalizedScale = typeof baseScale === 'number'
        ? { x: baseScale, y: baseScale, z: baseScale }
        : {
          x: baseScale?.x ?? 1,
          y: baseScale?.y ?? 1,
          z: baseScale?.z ?? 1,
        };

      return new THREE.Vector3(
          1 + ((normalizedScale.x - 1) * lineScale),
          1 + ((normalizedScale.y - 1) * lineScale),
          1 + ((normalizedScale.z - 1) * lineScale),
      );
    },

    attachOutlineShell(mesh, baseScale) {
      const outline = markRaw(new THREE.Mesh(
          mesh.geometry,
          this.getOutlineShellMaterial(),
      ));
      outline.userData.isOutlineShell = true;
      outline.userData.baseOutlineScale = baseScale;
      outline.renderOrder = 1;
      outline.castShadow = false;
      outline.receiveShadow = false;
      outline.scale.copy(this.getOutlineScaleVector(baseScale, 1));
      mesh.renderOrder = 2;
      mesh.add(outline);
    },

    applyInstancedOutlineMatrices(outlineMesh, positions, baseScale, lineScale) {
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const scale = this.getOutlineScaleVector(baseScale, lineScale);

      positions.forEach((position, index) => {
        matrix.compose(
            new THREE.Vector3(position.x, position.y, position.z),
            quaternion,
            scale,
        );
        outlineMesh.setMatrixAt(index, matrix);
      });

      outlineMesh.instanceMatrix.needsUpdate = true;
    },

    createDiceMaterials() {
      return DICE_FACE_ORDER.map((faceValue) => {
        const material = this.getSharedMaterial(
            `dice-face-material-${faceValue}`,
            () => {
              const faceMaterial = markRaw(new THREE.MeshLambertMaterial({
                color: '#ffffff',
                map: this.getDiceFaceTexture(faceValue),
              }));
              this.prepareFillMaterial(faceMaterial);
              return faceMaterial;
            },
        );

        return material;
      });
    },

    getDiceFaceTexture(value) {
      return this.getSharedTexture(
          `dice-face-texture-${value}`,
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;

            const context = canvas.getContext('2d');
            context.fillStyle = '#fff8e8';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.strokeStyle = '#e0d2b2';
            context.lineWidth = 12;
            context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

            context.fillStyle = '#231a15';
            const pipRadius = 22;
            const positions = {
              center: [128, 128],
              topLeft: [72, 72],
              topRight: [184, 72],
              middleLeft: [72, 128],
              middleRight: [184, 128],
              bottomLeft: [72, 184],
              bottomRight: [184, 184],
            };
            const faceMap = {
              1: ['center'],
              2: ['topLeft', 'bottomRight'],
              3: ['topLeft', 'center', 'bottomRight'],
              4: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
              5: ['topLeft', 'topRight', 'center', 'bottomLeft', 'bottomRight'],
              6: ['topLeft', 'topRight', 'middleLeft', 'middleRight', 'bottomLeft', 'bottomRight'],
            };

            faceMap[value].forEach((key) => {
              const [x, y] = positions[key];
              context.beginPath();
              context.arc(x, y, pipRadius, 0, Math.PI * 2);
              context.fill();
            });

            const texture = markRaw(new THREE.CanvasTexture(canvas));
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            return texture;
          },
      );
    },

    getToonGradientMap() {
      return this.getSharedTexture(
          'toon-gradient-map',
          () => {
            const data = new Uint8Array([0, 84, 152, 208, 255]);
            const texture = markRaw(new THREE.DataTexture(
                data,
                data.length,
                1,
                THREE.RedFormat,
            ));
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            return texture;
          },
      );
    },

    getSkyGradientTexture(env = 'day') {
      return this.getSharedTexture(
          'sky-gradient-texture-' + env,
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 512;

            const context = canvas.getContext('2d');
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

            if (env === 'night') {
              gradient.addColorStop(0, '#050811');
              gradient.addColorStop(0.48, '#0c1529');
              gradient.addColorStop(0.75, '#19273f');
              gradient.addColorStop(1, '#2a3854');
              context.fillStyle = gradient;
              context.fillRect(0, 0, canvas.width, canvas.height);

              context.fillStyle = 'rgba(100, 140, 255, 0.05)';
              context.fillRect(0, canvas.height * 0.56, canvas.width, canvas.height * 0.06);
              context.fillStyle = 'rgba(50, 80, 150, 0.06)';
              context.fillRect(0, canvas.height * 0.76, canvas.width, canvas.height * 0.08);
            } else if (env === 'dusk') {
              gradient.addColorStop(0, '#120917');
              gradient.addColorStop(0.48, '#341829');
              gradient.addColorStop(0.75, '#8a2c26');
              gradient.addColorStop(1, '#f98231');
              context.fillStyle = gradient;
              context.fillRect(0, 0, canvas.width, canvas.height);

              context.fillStyle = 'rgba(255, 120, 50, 0.1)';
              context.fillRect(0, canvas.height * 0.56, canvas.width, canvas.height * 0.06);
              context.fillStyle = 'rgba(255, 200, 100, 0.08)';
              context.fillRect(0, canvas.height * 0.76, canvas.width, canvas.height * 0.08);
            } else if (env === 'dawn') {
              gradient.addColorStop(0, '#090e17');
              gradient.addColorStop(0.48, '#222442');
              gradient.addColorStop(0.75, '#5e3c54');
              gradient.addColorStop(1, '#ffd080');
              context.fillStyle = gradient;
              context.fillRect(0, 0, canvas.width, canvas.height);

              context.fillStyle = 'rgba(255, 200, 150, 0.08)';
              context.fillRect(0, canvas.height * 0.56, canvas.width, canvas.height * 0.06);
              context.fillStyle = 'rgba(255, 150, 200, 0.06)';
              context.fillRect(0, canvas.height * 0.76, canvas.width, canvas.height * 0.08);
            } else {
              // Day
              gradient.addColorStop(0, '#85d8ff');
              gradient.addColorStop(0.48, '#c2ecff');
              gradient.addColorStop(0.75, '#f9efc8');
              gradient.addColorStop(1, '#ffd4a8');
              context.fillStyle = gradient;
              context.fillRect(0, 0, canvas.width, canvas.height);

              context.fillStyle = 'rgba(255, 255, 255, 0.14)';
              context.fillRect(0, canvas.height * 0.56, canvas.width, canvas.height * 0.06);
              context.fillStyle = 'rgba(255, 226, 177, 0.16)';
              context.fillRect(0, canvas.height * 0.76, canvas.width, canvas.height * 0.08);
            }

            const texture = markRaw(new THREE.CanvasTexture(canvas));
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            return texture;
          },
      );
    },

    applyEnvironment() {
      if (!this.scene || !this.camera) return;

      const env = this.store.settings.environment || 'day';

      this.scene.background = this.getSkyGradientTexture(env);

      if (!this.ambientLight || !this.skyLight || !this.sunLight || !this.fillLight || !this.trayLight) {
        return;
      }

      switch (env) {
        case 'night':
          this.ambientLight.color.set('#1a2b4c');
          this.ambientLight.intensity = 0.45;

          this.skyLight.color.set('#2b3e66');
          this.skyLight.groundColor.set('#0d131f');
          this.skyLight.intensity = 0.65;

          this.sunLight.color.set('#b3ccff');
          this.sunLight.intensity = 0.9;
          this.sunLight.position.set(-5.5, 13.5, 6.5);

          this.fillLight.color.set('#4c70b3');
          this.fillLight.intensity = 0.45;

          this.trayLight.color.set('#55aaee');
          this.trayLight.intensity = 0.22;
          break;

        case 'dusk':
          this.ambientLight.color.set('#4c2e3d');
          this.ambientLight.intensity = 0.42;

          this.skyLight.color.set('#805373');
          this.skyLight.groundColor.set('#2d1a24');
          this.skyLight.intensity = 0.75;

          this.sunLight.color.set('#ff8855');
          this.sunLight.intensity = 1.55;
          this.sunLight.position.set(-11.5, 6.5, 3.5);

          this.fillLight.color.set('#a65f91');
          this.fillLight.intensity = 0.55;

          this.trayLight.color.set('#ff8833');
          this.trayLight.intensity = 0.28;
          break;

        case 'dawn':
          this.ambientLight.color.set('#373d59');
          this.ambientLight.intensity = 0.45;

          this.skyLight.color.set('#8c7299');
          this.skyLight.groundColor.set('#26202c');
          this.skyLight.intensity = 0.75;

          this.sunLight.color.set('#ffbb77');
          this.sunLight.intensity = 1.65;
          this.sunLight.position.set(-10.5, 8.5, 4.5);

          this.fillLight.color.set('#7592c9');
          this.fillLight.intensity = 0.52;

          this.trayLight.color.set('#ffbb77');
          this.trayLight.intensity = 0.28;
          break;

        case 'day':
        default:
          this.ambientLight.color.set('#f6f0e7');
          this.ambientLight.intensity = 0.28;

          this.skyLight.color.set('#d2e6ff');
          this.skyLight.groundColor.set('#97ae72');
          this.skyLight.intensity = 0.62;

          this.sunLight.color.set('#fff1db');
          this.sunLight.intensity = 1.45;
          this.sunLight.position.set(-5.5, 13.5, 6.5);

          this.fillLight.color.set('#c7dfff');
          this.fillLight.intensity = 0.42;

          this.trayLight.color.set('#ffd6a8');
          this.trayLight.intensity = 0.18;
          break;
      }

      this.requestShadowUpdate();
      this.hoverNeedsUpdate = true;
    },

    createCloudsInstanced() {
      const puffGeometry = this.getSharedGeometry('cartoon-cloud-puff', () => new THREE.SphereGeometry(1, 20, 20));
      const puffMaterial = this.createToonMaterial('cartoon-cloud-material', { color: '#ffffff' });
      const clouds = [
        { x: -9.8, y: 9.4, z: -15.6, scale: 1.35 },
        { x: 3.8, y: 11.2, z: -18.4, scale: 1.55 },
        { x: 18.2, y: 10.1, z: -14.8, scale: 1.25 },
        { x: 15.6, y: 8.5, z: -6.4, scale: 0.96 },
      ];
      const puffs = [
        { x: -1.35, y: 0, z: 0.15, scale: [1.1, 0.82, 0.92] },
        { x: -0.35, y: 0.3, z: 0, scale: [1.28, 0.96, 1.02] },
        { x: 0.7, y: 0.2, z: -0.08, scale: [1.15, 0.88, 0.95] },
        { x: 1.55, y: -0.02, z: 0.1, scale: [0.92, 0.7, 0.8] },
      ];

      const mesh = this.createStaticInstancedMesh(
          puffGeometry,
          puffMaterial,
          clouds.length * puffs.length,
      );
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      let index = 0;
      clouds.forEach((cloud) => {
        puffs.forEach((puff) => {
          matrix.compose(
              new THREE.Vector3(
                  cloud.x + (puff.x * cloud.scale),
                  cloud.y + (puff.y * cloud.scale),
                  cloud.z + (puff.z * cloud.scale),
              ),
              quaternion,
              new THREE.Vector3(
                  puff.scale[0] * cloud.scale,
                  puff.scale[1] * cloud.scale,
                  puff.scale[2] * cloud.scale,
              ),
          );
          mesh.setMatrixAt(index, matrix);
          index += 1;
        });
      });
      this.finalizeInstancedMesh(mesh);
    },

    applyOutlineAppearance() {
      const preset = getOutlineAppearancePreset(this.store.settings.outlineAppearance);
      const outlineMaterial = this.getOutlineShellMaterial();
      outlineMaterial.opacity = preset.visible ? preset.lineOpacity : 0;
      outlineMaterial.transparent = true;
      outlineMaterial.needsUpdate = true;

      this.scene?.traverse((object) => {
        if (!object.userData?.isOutlineShell) {
          return;
        }

        object.visible = preset.visible;

        if (object.isInstancedMesh) {
          this.applyInstancedOutlineMatrices(
              object,
              object.userData.outlinePositions || [],
              object.userData.baseOutlineScale || 1.02,
              preset.lineScale,
          );
          return;
        }

        object.scale.copy(this.getOutlineScaleVector(
            object.userData.baseOutlineScale || 1.02,
            preset.lineScale,
        ));
      });
    },

    // Marks the shadow map dirty so the next renderer.render redraws it.
    // Must be called whenever a shadow caster or a light moves/changes —
    // shadowMap.autoUpdate is off.
    requestShadowUpdate() {
      if (this.renderer) {
        this.renderer.shadowMap.needsUpdate = true;
      }
    },

    applyRenderQuality() {
      if (!this.renderer) {
        return;
      }

      const preset = getRenderQualityPreset(this.store.settings.quality);
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rendererPixelRatio = Math.min(
          devicePixelRatio * preset.pixelRatioScale,
          preset.maxPixelRatio,
      );

      this.renderer.setPixelRatio(rendererPixelRatio);
      this.renderer.shadowMap.enabled = preset.shadowsEnabled;

      if (this.scene) {
        this.scene.traverse((child) => {
          if (child.userData.isOutlineShell) {
            child.visible = preset.outlinesEnabled !== false;
          }
        });

        const showDecorations = preset.decorationsEnabled !== false;
        if (this.treeGroups) {
          this.treeGroups.forEach((group) => {
            group.visible = showDecorations;
          });
        }
        if (this.grassMeshes) {
          this.grassMeshes.forEach((mesh) => {
            mesh.visible = showDecorations;
          });
        }
      }

      if (this.shadowLight) {
        this.shadowLight.castShadow = preset.shadowsEnabled;

        if (preset.shadowsEnabled && preset.shadowMapSize) {
          const currentWidth = this.shadowLight.shadow.mapSize.width;
          const currentHeight = this.shadowLight.shadow.mapSize.height;

          if (currentWidth !== preset.shadowMapSize || currentHeight !== preset.shadowMapSize) {
            this.shadowLight.shadow.map?.dispose?.();
            this.shadowLight.shadow.map = null;
            this.shadowLight.shadow.mapSize.set(preset.shadowMapSize, preset.shadowMapSize);
          }
        }

        this.shadowLight.shadow.needsUpdate = true;
      }

      this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      this.requestShadowUpdate();
    },

    prepareFillMaterial(material) {
      if (!material || material.polygonOffset) {
        return;
      }

      material.polygonOffset = true;
      material.polygonOffsetFactor = 1;
      material.polygonOffsetUnits = 2;
      material.needsUpdate = true;
    },

    getSharedGeometry(key, createGeometry) {
      if (!this.sharedGeometries[key]) {
        this.sharedGeometries[key] = markRaw(createGeometry());
      }

      return this.sharedGeometries[key];
    },

    getSharedTexture(key, createTexture) {
      if (!this.sharedTextures[key]) {
        this.sharedTextures[key] = markRaw(createTexture());
      }

      return this.sharedTextures[key];
    },

    getSharedMaterial(key, createMaterial) {
      if (!this.sharedMaterials[key]) {
        this.sharedMaterials[key] = markRaw(createMaterial());
      }

      return this.sharedMaterials[key];
    },

    disposeSharedResources() {
      Object.values(this.sharedGeometries).forEach((geometry) => geometry.dispose?.());
      Object.values(this.sharedTextures).forEach((texture) => texture.dispose?.());
      Object.values(this.sharedMaterials).forEach((material) => material.dispose?.());
      this.sharedGeometries = markRaw({});
      this.sharedTextures = markRaw({});
      this.sharedMaterials = markRaw({});
    },

    handleResize() {
      if (!this.camera || !this.renderer) {
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;

      if (width < height) {
        this.camera.fov = CAMERA_FOV_PORTRAIT;
      } else {
        this.camera.fov = CAMERA_FOV_LANDSCAPE;
      }

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
      this.resizeOverlayCanvas();
      this.hoverNeedsUpdate = true;
    },

    resizeOverlayCanvas() {
      const canvas = this.$refs.overlayCanvas;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },

    isHumanTurn() {
      // "This human, on this client" — remote players are not interactive here.
      const currentPlayer = this.store.players[this.store.currentPlayerId];
      return Boolean(currentPlayer && currentPlayer.controller === 'local');
    },

    setPointerFromEvent(event) {
      if (!this.pointer || !this.$refs.canvas) {
        return false;
      }

      const rect = this.$refs.canvas.getBoundingClientRect();
      this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      return true;
    },

    handlePointerDown(event) {
      this.pointerDownPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      this.isPointerInsideCanvas = true;
      this.isDraggingScene = false;
      this.setPointerFromEvent(event);
      this.hoverNeedsUpdate = true;
    },

    getInteractiveHit() {
      if (!this.raycaster || !this.camera) {
        return null;
      }

      const interactiveObjects = [];

      if (this.store.currentScreen === 'add-players' || this.store.currentScreen === 'lobby') {
        if (this.homeBaseHelpers) {
          this.homeBaseHelpers.forEach((group, baseIdx) => {
            // In the lobby only free seats are claimable; keep taken ones out
            // so they don't advertise a pointer cursor for a dead click.
            if (this.store.currentScreen === 'lobby' && this.store.online.seats[baseIdx]) {
              return;
            }
            interactiveObjects.push(group);
          });
        }
      }

      if (this.diceMesh && this.store.gamePlayStatus.isRolling && this.isHumanTurn() && !this.isMobile) {
        interactiveObjects.push(this.diceMesh);
        // The whole pit doubles as a roll button, not just the small dice.
        if (this.dicePitMesh) {
          interactiveObjects.push(this.dicePitMesh);
        }
      }

      if (this.store.gamePlayStatus.isMoving && this.isHumanTurn()) {
        Object.values(this.pawnMeshes).forEach((mesh) => {
          const pawn = this.findPawnByMeshName(mesh.name);
          if (pawn?.isActive) {
            interactiveObjects.push(mesh);
          }
        });
      }

      if (!interactiveObjects.length) {
        return null;
      }

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersections = this.raycaster.intersectObjects(interactiveObjects, true);
      if (!intersections.length) {
        return null;
      }

      const hitObject = intersections[0].object;
      let current = hitObject;

      while (current) {
        if (current.name === 'dice' || current.name === 'dice-pit' || current.name.startsWith('cube-') || current.name.startsWith('home-base-helper-')) {
          return current.name;
        }
        current = current.parent;
      }

      return null;
    },

    refreshHoveredTarget() {
      if (!this.pointer) {
        this.hoverNeedsUpdate = false;
        return;
      }

      const nextTarget = this.getInteractiveHit();
      if (this.hoveredTarget === nextTarget) {
        this.hoverNeedsUpdate = false;
        return;
      }

      this.hoveredTarget = nextTarget;
      if (this.$refs.canvas) {
        this.$refs.canvas.style.cursor = this.hoveredTarget ? 'pointer' : 'default';
      }
      this.hoverNeedsUpdate = false;
    },

    clearHoveredTarget() {
      this.hoveredTarget = null;
      this.pointerDownPosition = null;
      this.isDraggingScene = false;
      this.isPointerInsideCanvas = false;
      this.hoverNeedsUpdate = false;
      if (this.$refs.canvas) {
        this.$refs.canvas.style.cursor = 'default';
      }
    },

    handlePointerMove(event) {
      if (this.pointerDownPosition) {
        const deltaX = event.clientX - this.pointerDownPosition.x;
        const deltaY = event.clientY - this.pointerDownPosition.y;
        if ((deltaX * deltaX) + (deltaY * deltaY) > 25) {
          this.isDraggingScene = true;
        }
      }

      if (!this.setPointerFromEvent(event)) {
        return;
      }

      this.isPointerInsideCanvas = true;
      this.hoverNeedsUpdate = true;
    },

    handleCanvasClick(event) {
      if (this.isDraggingScene) {
        this.isDraggingScene = false;
        this.pointerDownPosition = null;
        return;
      }

      this.pointerDownPosition = null;

      if (!this.setPointerFromEvent(event)) {
        return;
      }

      const target = this.getInteractiveHit();
      if (!target) {
        return;
      }

      if (target.startsWith('home-base-helper-')) {
        const idx = parseInt(target.replace('home-base-helper-', ''), 10);
        this.handleBaseClick(idx);
        this.hoverNeedsUpdate = true;
        return;
      }

      if (target === 'dice' || target === 'dice-pit') {
        this.rollDice();
        this.hoverNeedsUpdate = true;
        return;
      }

      const pawn = this.findPawnByMeshName(target);
      if (pawn?.isActive) {
        this.movePawnAsCurrentPlayer(pawn);
        this.hoverNeedsUpdate = true;
      }
    },

    movePawnAsCurrentPlayer(pawn) {
      if (this.store.online.enabled) {
        // The server validates and echoes the move back as MOVE_APPLIED;
        // deactivate locally so it cannot be sent twice.
        const player = this.store.players[this.store.currentPlayerId];
        player?.pawns.forEach((ownPawn) => {
          ownPawn.isActive = false;
        });
        this.store.gamePlayStatus.isMoving = false;
        MatchController.requestMove(pawn.startingPlace - 1);
        return;
      }

      pawn.move();
    },

    findPawnByMeshName(meshName) {
      const pawnId = meshName.replace(/^cube-/, '');
      return this.store.players
        .flatMap((player) => player.pawns)
        .find((pawn) => pawn.id === pawnId) || null;
    },

    resetGameState() {
      this.store.players.splice(0, this.store.players.length);
      this.store.currentPlayerId = -1;
      this.store.currentRound = 0;
      this.store.playingPlayerIndex = null;
      this.store.lastRolledDice = 'Start';
      this.store.gamePlayStatus.isRolling = false;
      this.store.gamePlayStatus.isMoving = false;

      Object.values(this.pawnMeshes).forEach((mesh) => {
        this.scene.remove(mesh);
      });

      this.pawnMeshes = markRaw({});
      this.pawnMotionStates = markRaw({});
      this.requestShadowUpdate();

      this.pendingDiceRoll = null;
      this.onlineDice = null;
      this.diceSnapTween = null;
      this.store.winner = null;
      this.store.online.pendingDice = null;
      this.store.online.diceInFlight = false;
      this.freezeDiceBody();
      this.syncDice();
      this.clearHoveredTarget();
    },

    startGame() {
      if (this.store.players.length < 2) {
        return;
      }

      this.store.online.enabled = false;
      this.store.currentPlayerId = -1;
      this.store.currentRound = 1;
      this.store.playingPlayerIndex = null;
      this.store.lastRolledDice = 'Start';
      this.store.gamePlayStatus.isRolling = false;
      this.store.gamePlayStatus.isMoving = false;
      this.store.winner = null;

      this.store.players.forEach((player) => {
        player.pawns.forEach((pawn) => {
          pawn.position = 0;
          pawn.isActive = false;
        });
        player.stillHome = true;
        player.stillHomeCounter = 0;
        player.isPlaying = false;
      });

      this.pendingDiceRoll = null;
      this.onlineDice = null;
      this.diceSnapTween = null;
      this.freezeDiceBody();
      this.resetDiceBody();

      this.store.currentScreen = 'game-screen';
      this.changePlayersTurn();
      this.hoverNeedsUpdate = true;
    },

    syncOnlinePlayersFromLobby() {
      if (this.store.currentScreen !== 'lobby') {
        return;
      }
      this.store.players.splice(0, this.store.players.length);
      const seats = this.store.online.seats || [];
      seats.forEach((seat) => {
        if (seat) {
          const isMe = seat.userId === this.store.online.selfUserId;
          const controller = isMe ? 'local' : 'remote';
          const name = seat.displayName || seat.username || `Player ${seat.seat + 1}`;
          const player = markRaw(new Player(name, PLAYER_COLORS[seat.seat], seat.seat + 1, controller));
          this.store.players.push(player);
        }
      });
      this.hoverNeedsUpdate = true;
    },

    syncLocalPlayersFromSetup() {
      this.store.players.splice(0, this.store.players.length);
      for (let i = 0; i < 4; i++) {
        if (this.store.localSetupActive[i]) {
          const controller = this.store.localSetupTypes[i];
          const name = this.store.localSetupNames[i].trim() || (controller === 'ai' ? `Robot ${i+1}` : `Lojtari ${i+1}`);
          const player = markRaw(new Player(name, PLAYER_COLORS[i], i + 1, controller));
          this.store.players.push(player);
        }
      }
      this.hoverNeedsUpdate = true;
    },

    handleBaseClick(idx) {
      if (this.store.currentScreen === 'add-players') {
        const isActive = this.store.localSetupActive[idx];
        const isAI = this.store.localSetupTypes[idx] === 'ai';

        if (!isActive) {
          this.store.localSetupActive[idx] = true;
          this.store.localSetupTypes[idx] = 'local';
          const humanCount = this.store.localSetupActive.filter((active, index) => active && this.store.localSetupTypes[index] === 'local').length;
          if (humanCount === 1) {
            this.store.localSetupNames[idx] = this.store.online.displayName || `Lojtari ${idx + 1}`;
          } else {
            this.store.localSetupNames[idx] = `Lojtari ${idx + 1}`;
          }
        } else if (!isAI) {
          this.store.localSetupTypes[idx] = 'ai';
          this.store.localSetupNames[idx] = `Robot ${idx + 1}`;
        } else {
          this.store.localSetupActive[idx] = false;
          this.store.localSetupNames[idx] = '';
        }

        this.syncLocalPlayersFromSetup();
      } else if (this.store.currentScreen === 'lobby') {
        if (!this.store.online.seats[idx]) {
          MatchController.requestClaimSeat(idx);
        }
      }
    },

    createHomeBaseHelpers() {
      const centers = [
        new THREE.Vector3(0.5, 0.51, 0.5),   // Red (seat 0)
        new THREE.Vector3(9.5, 0.51, 0.5),   // Yellow (seat 1)
        new THREE.Vector3(9.5, 0.51, 9.5),   // Blue (seat 2)
        new THREE.Vector3(0.5, 0.51, 9.5),   // Green (seat 3)
      ];

      const ringGeo = this.getSharedGeometry('home-base-ripple-ring', () => new THREE.RingGeometry(0.85, 0.95, 32));
      // Invisible disc spanning the whole 2x2 base so clicking/hovering a base
      // works anywhere on it, not just on the thin ripple rings.
      const hitGeo = this.getSharedGeometry('home-base-hit-disc', () => new THREE.CircleGeometry(1.3, 24));
      const hitMat = this.getSharedMaterial('home-base-hit-disc-mat', () => new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: false,
        transparent: true,
      }));
      this.homeBaseHelpers = [];
      this.homeBaseRippleRings = [];

      centers.forEach((center, baseIdx) => {
        const color = PLAYER_COLORS[baseIdx];
        const group = markRaw(new THREE.Group());
        group.position.copy(center);
        group.rotation.x = -Math.PI / 2;
        group.name = `home-base-helper-${baseIdx}`;

        const hitDisc = markRaw(new THREE.Mesh(hitGeo, hitMat));
        group.add(hitDisc);

        const baseRings = [];
        for (let r = 0; r < 2; r++) {
          const mat = markRaw(new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            depthWrite: false,
            transparent: true,
            opacity: 0,
          }));
          const mesh = markRaw(new THREE.Mesh(ringGeo, mat));
          group.add(mesh);
          baseRings.push(mesh);
        }

        this.scene.add(group);
        this.homeBaseHelpers.push(group);
        this.homeBaseRippleRings.push(baseRings);
      });

      this.createClickableRipplePool();
    },

    // A small pool of ground ripple rings (same look as the home-base ones)
    // that get repositioned each frame under whatever is currently clickable:
    // up to four movable pawns plus the dice.
    createClickableRipplePool() {
      // Thicker band than the home-base rings: these get scaled down under
      // pawns, where a thin ring reads as a hairline and disappears.
      const ringGeo = this.getSharedGeometry('clickable-ripple-ring', () => new THREE.RingGeometry(0.6, 0.95, 32));
      this.clickableRipples = [];

      for (let poolIdx = 0; poolIdx < 5; poolIdx++) {
        const group = markRaw(new THREE.Group());
        group.rotation.x = -Math.PI / 2;
        group.visible = false;

        const rings = [];
        for (let r = 0; r < 2; r++) {
          const mat = markRaw(new THREE.MeshBasicMaterial({
            color: '#ffffff',
            side: THREE.DoubleSide,
            depthWrite: false,
            transparent: true,
            opacity: 0,
          }));
          const mesh = markRaw(new THREE.Mesh(ringGeo, mat));
          group.add(mesh);
          rings.push(mesh);
        }

        this.scene.add(group);
        this.clickableRipples.push(markRaw({ group, rings }));
      }
    },

    getClickableRippleTargets() {
      const targets = [];
      if (!this.isHumanTurn()) {
        return targets;
      }

      if (this.diceMesh && this.store.gamePlayStatus.isRolling && !this.isMobile) {
        targets.push({
          x: this.diceMesh.position.x,
          y: DICE_PIT.floorY + 0.012,
          z: this.diceMesh.position.z,
          color: '#ff7700',
          scale: 0.6,
        });
      }

      if (this.store.gamePlayStatus.isMoving) {
        this.store.players.forEach((player) => {
          player.pawns.forEach((pawn) => {
            if (!pawn.isActive) return;
            const mesh = this.pawnMeshes[pawn.id];
            if (!mesh) return;
            targets.push({
              x: mesh.position.x,
              // Just above the tallest field disc (start fields: center 0.132
              // + half height 0.05) so the ring isn't occluded by the discs.
              y: START_FIELD_CENTER_Y + 0.058,
              z: mesh.position.z,
              // The shared "clickable" orange, not the player color — a
              // player-colored ring vanishes on the player's own home discs.
              color: '#ff7700',
              scale: 0.6,
            });
          });
        });
      }

      return targets;
    },

    animateClickableRipples(rippleTime) {
      if (!this.clickableRipples) {
        return;
      }

      const targets = this.getClickableRippleTargets();
      this.clickableRipples.forEach((ripple, poolIdx) => {
        const target = targets[poolIdx];
        if (!target) {
          ripple.group.visible = false;
          return;
        }

        ripple.group.visible = true;
        ripple.group.position.set(target.x, target.y, target.z);
        ripple.rings.forEach((ring, ringIdx) => {
          const phase = (rippleTime + ringIdx * 0.5) % 1.0;
          // Start at ~the pawn's base radius so the ring never wastes part of
          // its cycle hidden underneath the object it's highlighting.
          const scale = (0.45 + phase * 0.9) * target.scale;
          ring.scale.set(scale, scale, 1);
          ring.material.color.set(target.color);
          ring.material.opacity = (1 - phase) * 0.9;
        });
      });
    },

    createGrassAndTrees() {
      const treePositions = [
        [-3.2, 3], [-3.8, 8.5], [3.2, -2.8], [9.8, -3.2],
        [15.5, 1.8], [15.2, 9.2], [9.5, 13.5], [14.0, 13.2],
        [2.2, 12.8], [-1.8, 11.2]
      ];
      this.createTreesInstanced(treePositions);

      const grassPositions = [
        [-3, 4.8], [-2.5, 6.2], [-4, 2], [-1.5, -1.2], [3, -3],
        [6.5, -2.5], [9, -3.2], [12, -2.2], [14.5, 1], [15.5, 4.2],
        [15, 6.5], [14, 11.2], [11.5, 13.2], [8.5, 12.2], [5.5, 12.8],
        [1, 11.8], [-1.5, 10.2], [-4, 9], [6, 12.5], [10, -2.5]
      ];
      this.createGrassInstanced(grassPositions);
    },

    createStaticInstancedMesh(geometry, material, count, options = {}) {
      const mesh = markRaw(new THREE.InstancedMesh(geometry, material, count));
      mesh.castShadow = Boolean(options.castShadow);
      mesh.receiveShadow = Boolean(options.receiveShadow);
      return mesh;
    },

    // Culling for an InstancedMesh defaults to the geometry's origin-centered
    // bounds, which would drop the whole set when the origin leaves view —
    // recompute from the actual instance matrices once they are set.
    finalizeInstancedMesh(mesh) {
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      this.scene.add(mesh);
    },

    createTreesInstanced(positions) {
      const trunkGeo = this.getSharedGeometry('tree-trunk', () => new THREE.CylinderGeometry(0.12, 0.18, 0.8, 8));
      const trunkMat = this.createToonMaterial('tree-trunk-mat', { color: '#8b5a2b' });
      const foliageGeo = this.getSharedGeometry('tree-foliage', () => new THREE.ConeGeometry(0.48, 1.0, 8));
      const foliageMat = this.createToonMaterial('tree-foliage-mat', { color: '#38761d' });

      const trunks = this.createStaticInstancedMesh(trunkGeo, trunkMat, positions.length, { castShadow: true, receiveShadow: true });
      const lowerFoliage = this.createStaticInstancedMesh(foliageGeo, foliageMat, positions.length, { castShadow: true });
      const upperFoliage = this.createStaticInstancedMesh(foliageGeo, foliageMat, positions.length, { castShadow: true });

      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const groundY = -1.18;
      positions.forEach(([x, z], index) => {
        const s = 0.75 + Math.random() * 0.35;
        matrix.compose(new THREE.Vector3(x, groundY + (0.4 * s), z), quaternion, new THREE.Vector3(s, s, s));
        trunks.setMatrixAt(index, matrix);
        matrix.compose(new THREE.Vector3(x, groundY + (0.9 * s), z), quaternion, new THREE.Vector3(s, s, s));
        lowerFoliage.setMatrixAt(index, matrix);
        matrix.compose(new THREE.Vector3(x, groundY + (1.35 * s), z), quaternion, new THREE.Vector3(0.8 * s, 0.8 * s, 0.8 * s));
        upperFoliage.setMatrixAt(index, matrix);
      });

      this.treeGroups = [trunks, lowerFoliage, upperFoliage];
      this.treeGroups.forEach((mesh) => this.finalizeInstancedMesh(mesh));
    },

    createGrassInstanced(positions) {
      const bladeGeo = this.getSharedGeometry('grass-blade', () => {
        const geom = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          -0.04, 0, 0,
           0.04, 0, 0,
           0, 0.36, 0
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        return geom;
      });

      const grassMat = this.createToonMaterial('grass-blade-mat', {
        color: '#5ea24e',
        side: THREE.DoubleSide,
      });

      const bladesPerClump = 3;
      const mesh = this.createStaticInstancedMesh(bladeGeo, grassMat, positions.length * bladesPerClump);
      const clumps = positions.map(([gx, gz]) => {
        const s = 0.65 * (0.8 + (Math.random() * 0.4));
        return {
          position: new THREE.Vector3(gx, -1.18, gz),
          scale: new THREE.Vector3(s, s, s),
          bladeRotations: Array.from({ length: bladesPerClump }, (_, bladeIdx) => new THREE.Matrix4().makeRotationFromEuler(
              new THREE.Euler(0.08 + (Math.random() * 0.08), (bladeIdx * Math.PI) / 3, 0),
          )),
        };
      });

      this.grassInstances = markRaw({ mesh, clumps });
      this.grassMeshes = [mesh];
      this.updateGrassSway(0);
      this.finalizeInstancedMesh(mesh);
    },

    // The same wave the old per-clump Groups ran, written into instance
    // matrices instead: world = T(clump) * R(sway) * S(clump) * R(blade).
    updateGrassSway(time) {
      const grass = this.grassInstances;
      if (!grass || !grass.mesh.visible) {
        return;
      }

      let index = 0;
      grass.clumps.forEach((clump, clumpIdx) => {
        const wave = Math.sin(time + (clumpIdx * 0.6)) * 0.09;
        _grassSwayEuler.set(0, wave * 0.3, wave);
        _grassSwayQuaternion.setFromEuler(_grassSwayEuler);
        clump.bladeRotations.forEach((bladeRotation) => {
          _grassMatrix.compose(clump.position, _grassSwayQuaternion, clump.scale).multiply(bladeRotation);
          grass.mesh.setMatrixAt(index, _grassMatrix);
          index += 1;
        });
      });
      grass.mesh.instanceMatrix.needsUpdate = true;
    },

    // ---- Online game flow (server-authoritative) ----

    startOnlineGame(payload) {
      this.resetGameState();
      this.store.online.enabled = true;

      const seatToPlayerIndex = {};
      (payload.seats || []).forEach((seat) => {
        if (!seat) {
          return;
        }
        // Player turn = seat + 1 so pawn colors/offsets/home fields stay tied
        // to the seat; the array index can differ when seats are sparse.
        seatToPlayerIndex[seat.seat] = this.store.players.length;
        this.store.players.push(
            markRaw(new Player(
                seat.displayName || seat.username || `Player ${seat.seat + 1}`,
                PLAYER_COLORS[seat.seat],
                seat.seat + 1,
                seat.seat === this.store.online.mySeat ? 'local' : 'remote',
            )),
        );
      });

      this.store.online.seatToPlayerIndex = seatToPlayerIndex;
      this.store.currentScreen = 'game-screen';
      this.setTurnBySeat(payload.turnSeat, payload.round || 1);
    },

    // Online replacement for changePlayersTurn/repeatPlayersTurn: seats may be
    // non-contiguous, so the turn is addressed by seat, not by array rotation.
    setTurnBySeat(seat, round) {
      const playerIndex = this.store.online.seatToPlayerIndex[seat];
      const player = this.store.players[playerIndex];
      if (!player) {
        return;
      }

      const previous = this.store.players[this.store.currentPlayerId];
      if (previous && previous !== player) {
        previous.endTurn();
      }

      player.pawns.forEach((pawn) => {
        pawn.isActive = false;
      });

      this.store.currentPlayerId = playerIndex;
      this.store.currentRound = round;
      this.store.playingPlayerIndex = playerIndex;
      player.isPlaying = true;
      this.store.online.pendingDice = null;
      this.store.gamePlayStatus.isRolling = true;
      this.store.gamePlayStatus.isMoving = false;
      this.hoverNeedsUpdate = true;
    },

    handleNetTurnChange(payload) {
      if (!this.store.online.enabled) {
        return;
      }
      this.setTurnBySeat(payload.turnSeat, payload.round);
    },

    handleGameWon(payload) {
      const player = this.store.players[payload.playerIndex];
      if (!player) {
        return;
      }
      this.store.winner = {
        name: player.name,
        color: player.color,
        self: player.controller === 'local',
      };
      this.store.gamePlayStatus.isRolling = false;
      this.store.gamePlayStatus.isMoving = false;
      this.hoverNeedsUpdate = true;
    },

    handleNetStateSync(payload) {
      if (!payload || !payload.seats) {
        return;
      }

      // Rebuild players from the snapshot, then teleport pawns into place.
      this.startOnlineGame({
        seats: payload.seats,
        turnSeat: payload.turnSeat,
        round: payload.round,
      });

      (payload.seats || []).forEach((seat) => {
        if (!seat) {
          return;
        }
        const player = this.store.players[this.store.online.seatToPlayerIndex[seat.seat]];
        const positions = (payload.pawns && payload.pawns[seat.seat]) || [];
        player.pawns.forEach((pawn, pawnIndex) => {
          const position = positions[pawnIndex] || 0;
          pawn.position = position;
          pawn.isInDestinationField = position > 40;
          pawn.isActive = false;
          pawn.isMoving = false;
          if (position === 0) {
            pawn.globalPosition = pawn.startingGlobalPosition;
          } else if (position <= 40) {
            pawn.globalPosition = (pawn.startingGlobalPosition + position - 1) % 40;
          } else {
            pawn.globalPosition = (pawn.startingGlobalPosition + 39) % 40;
          }
        });
      });

      this.pawnMotionStates = markRaw({});

      if (payload.awaitingMove && payload.dice != null) {
        this.store.lastRolledDice = payload.dice;
        this.store.gamePlayStatus.isRolling = false;
        this.store.gamePlayStatus.isMoving = true;
        const mover = this.store.players[this.store.online.seatToPlayerIndex[payload.turnSeat]];
        mover?.pawns.forEach((pawn, pawnIndex) => {
          pawn.isActive = (payload.legalPawns || []).indexOf(pawnIndex) !== -1;
        });
      }

      if (payload.phase === 'finished' && payload.winnerSeat != null) {
        const winner = this.store.players[this.store.online.seatToPlayerIndex[payload.winnerSeat]];
        this.store.winner = {
          name: winner ? winner.name : 'Player',
          color: winner ? winner.color : '#ffffff',
          self: payload.winnerSeat === this.store.online.mySeat,
        };
      }

      this.hoverNeedsUpdate = true;
    },

    changePlayersTurn() {
      if (!this.store.players.length) {
        return;
      }

      ApplicationStore.gamePlayStatus.isMoving = false;

      const currentPlayer = this.store.players[this.store.currentPlayerId];
      if (currentPlayer) {
        currentPlayer.endTurn();
      }

      if (this.store.currentPlayerId === this.store.players.length - 1) {
        this.store.currentPlayerId = 0;
        this.store.currentRound += 1;
      } else {
        this.store.currentPlayerId += 1;
      }

      this.store.players[this.store.currentPlayerId].startTurn();
      this.hoverNeedsUpdate = true;
    },

    repeatPlayersTurn() {
      const currentPlayer = this.store.players[this.store.currentPlayerId];
      if (!currentPlayer) {
        return;
      }

      ApplicationStore.gamePlayStatus.isMoving = false;
      currentPlayer.endTurn();
      currentPlayer.startTurn();
      this.hoverNeedsUpdate = true;
    },

    resetDiceBody() {
      if (!this.dicePhysicsBody) {
        return;
      }

      this.clearDiceBodyMotion();
      this.dicePhysicsBody.position.set(
          DICE_PIT.center.x,
          this.getDiceTrayRestY(),
          DICE_PIT.center.z,
      );
      this.dicePhysicsBody.quaternion.set(0, 0, 0, 1);
      this.dicePhysicsBody.sleep();
    },

    getDiceTrayRestY() {
      return DICE_PIT.floorY + (DICE_SIZE / 2);
    },

    // Square clamp inscribed in the pit, used only to re-center a
    // stray dice before a throw.
    getDiceTrayBounds() {
      const reach = DICE_PIT.wallRadius - (DICE_SIZE * 0.9);
      return {
        minX: DICE_PIT.center.x - reach,
        maxX: DICE_PIT.center.x + reach,
        minZ: DICE_PIT.center.z - reach,
        maxZ: DICE_PIT.center.z + reach,
      };
    },

    clearDiceBodyMotion() {
      if (!this.dicePhysicsBody) {
        return;
      }

      this.dicePhysicsBody.velocity.setZero();
      this.dicePhysicsBody.angularVelocity.setZero();
      this.dicePhysicsBody.force.setZero();
      this.dicePhysicsBody.torque.setZero();
    },

    freezeDiceBody() {
      if (!this.dicePhysicsBody) {
        return;
      }

      this.clearDiceBodyMotion();
      this.dicePhysicsBody.sleep();
    },

    startDiceRoll() {
      if (!this.dicePhysicsBody) {
        return;
      }

      const body = this.dicePhysicsBody;
      const bounds = this.getDiceTrayBounds();
      const trayRestY = this.getDiceTrayRestY();

      if (
        !Number.isFinite(body.position.x) ||
        !Number.isFinite(body.position.y) ||
        !Number.isFinite(body.position.z) ||
        body.position.y < TABLE_PHYSICS.floorY - 1.5
      ) {
        this.resetDiceBody();
      }

      body.wakeUp();
      this.clearDiceBodyMotion();
      body.position.set(
          Math.min(Math.max(body.position.x, bounds.minX), bounds.maxX),
          Math.max(body.position.y + 0.08, trayRestY + 0.06),
          Math.min(Math.max(body.position.z, bounds.minZ), bounds.maxZ),
      );

      const randomAxis = new CANNON.Vec3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
      );
      randomAxis.normalize();
      body.quaternion.setFromAxisAngle(randomAxis, Math.random() * Math.PI * 2);

      const centerBiasX = (DICE_PIT.center.x - body.position.x) * 1.25;
      const centerBiasZ = (DICE_PIT.center.z - body.position.z) * 1.25;
      // Gentler sideways throw than the old table-side tray — this one is
      // small enough that a hard throw just slams the walls.
      const horizontalX = centerBiasX + ((Math.random() - 0.5) * 2.2);
      const horizontalZ = centerBiasZ + ((Math.random() - 0.5) * 2.2);
      body.angularVelocity.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 30,
      );

      body.applyImpulse(
          new CANNON.Vec3(
              horizontalX,
              5.1 + (Math.random() * 0.95),
              horizontalZ,
          ),
          new CANNON.Vec3(
              (Math.random() - 0.5) * 0.52,
              0,
              (Math.random() - 0.5) * 0.52,
          ),
      );

      this.pendingDiceRoll = {
        startedAt: performance.now(),
        lastRecoveryAt: 0,
        recoveryAttempts: 0,
      };
    },

    // The physical dice came to rest. Local mode resolves with the physical
    // face; online mode waits for the server's DICE_RESULT value instead —
    // the physical face (including the fell-off-table fallback) must never
    // feed game logic online.
    finishDiceSettle(faceData) {
      if (faceData) {
        this.snapDiceToFaceUp(faceData);
      }

      if (this.store.online.enabled) {
        if (this.onlineDice) {
          this.onlineDice.settled = true;
          this.tryResolveOnlineDice();
        } else {
          this.pendingDiceRoll = null;
        }
        return;
      }

      this.completeDiceRoll(faceData ? faceData.value : 1);
    },

    handleNetDiceResult(payload) {
      if (!this.store.online.enabled) {
        return;
      }

      if (!this.onlineDice) {
        // Roll initiated by another player (or restored) — play it locally too.
        this.onlineDice = { settled: false, serverValue: null, payload: null };
        if (!this.pendingDiceRoll) {
          this.startDiceRoll();
        }
      }

      this.onlineDice.serverValue = payload.value;
      this.onlineDice.payload = payload;
      this.tryResolveOnlineDice();
    },

    tryResolveOnlineDice() {
      const onlineDice = this.onlineDice;
      if (!onlineDice || !onlineDice.settled || onlineDice.serverValue == null) {
        return;
      }

      const payload = onlineDice.payload;
      this.onlineDice = null;
      this.snapDiceToValue(onlineDice.serverValue);

      // Only feed game logic if the turn has not moved on (e.g. server timeout).
      const currentSeat = this.seatOfPlayerIndex(this.store.currentPlayerId);
      if (payload && payload.seat === currentSeat) {
        this.completeDiceRoll(onlineDice.serverValue);
      } else {
        this.pendingDiceRoll = null;
      }

      this.store.online.diceInFlight = false;
      EventBus.fire(EventKeys.net.diceResolved);

      // Single legal pawn for our own seat: send the move automatically.
      if (
        payload &&
        payload.seat === this.store.online.mySeat &&
        payload.seat === currentSeat &&
        Array.isArray(payload.legalPawns) &&
        payload.legalPawns.length === 1
      ) {
        window.setTimeout(() => MatchController.requestMove(payload.legalPawns[0]), 350);
      }
    },

    // Rotates the settled dice so `value` faces up, with a short visual tween
    // that reads as a final wobble.
    snapDiceToValue(value) {
      if (!this.dicePhysicsBody || !this.diceMesh || !DICE_FACE_NORMALS[value]) {
        return;
      }

      const current = this.getDiceTopFaceData();
      const fromQuaternion = new THREE.Quaternion(
          this.dicePhysicsBody.quaternion.x,
          this.dicePhysicsBody.quaternion.y,
          this.dicePhysicsBody.quaternion.z,
          this.dicePhysicsBody.quaternion.w,
      );

      if (current.value === value) {
        return;
      }

      const desiredWorldNormal = DICE_FACE_NORMALS[value].clone().applyQuaternion(fromQuaternion);
      const snappedQuaternion = new THREE.Quaternion()
          .setFromUnitVectors(desiredWorldNormal.normalize(), WORLD_UP)
          .multiply(fromQuaternion.clone())
          .normalize();

      // Body gets the final orientation immediately (it is asleep); the mesh
      // slerps toward it in syncDice.
      this.dicePhysicsBody.quaternion.set(
          snappedQuaternion.x,
          snappedQuaternion.y,
          snappedQuaternion.z,
          snappedQuaternion.w,
      );
      this.diceSnapTween = markRaw({
        from: fromQuaternion,
        to: snappedQuaternion,
        start: performance.now(),
        duration: 140,
      });
    },

    seatOfPlayerIndex(playerIndex) {
      const map = this.store.online.seatToPlayerIndex;
      for (const seat in map) {
        if (map[seat] === playerIndex) {
          return Number(seat);
        }
      }
      return -1;
    },

    completeDiceRoll(diceResult = this.getDiceResultFromBody()) {
      if (!this.pendingDiceRoll) {
        return;
      }

      this.pendingDiceRoll = null;
      this.store.lastRolledDice = diceResult;
      this.hoverNeedsUpdate = true;
      this.store.players[this.store.currentPlayerId]?.rollDice(diceResult);
    },

    getDiceTopFaceData() {
      if (!this.dicePhysicsBody) {
        return {
          value: 1,
          dot: 1,
          worldNormal: WORLD_UP.clone(),
          quaternion: new THREE.Quaternion(),
        };
      }

      _diceFaceQuaternion.set(
          this.dicePhysicsBody.quaternion.x,
          this.dicePhysicsBody.quaternion.y,
          this.dicePhysicsBody.quaternion.z,
          this.dicePhysicsBody.quaternion.w,
      );
      let bestFace = 1;
      let bestDot = -Infinity;

      DICE_FACE_ENTRIES.forEach(([faceValue, normal]) => {
        const dot = _diceFaceScratch.copy(normal).applyQuaternion(_diceFaceQuaternion).dot(WORLD_UP);

        if (dot > bestDot) {
          bestDot = dot;
          bestFace = faceValue;
        }
      });

      // worldNormal/quaternion are shared scratch objects — callers clone
      // anything they keep past the current call.
      return {
        value: bestFace,
        dot: bestDot,
        worldNormal: _diceBestNormal.copy(DICE_FACE_NORMALS[bestFace]).applyQuaternion(_diceFaceQuaternion),
        quaternion: _diceFaceQuaternion,
      };
    },

    getDiceResultFromBody() {
      return this.getDiceTopFaceData().value;
    },

    snapDiceToFaceUp(faceData = this.getDiceTopFaceData()) {
      if (!this.dicePhysicsBody) {
        return;
      }

      const body = this.dicePhysicsBody;
      const bounds = this.getDiceTrayBounds();
      const snappedQuaternion = new THREE.Quaternion()
          .setFromUnitVectors(faceData.worldNormal.clone().normalize(), WORLD_UP)
          .multiply(faceData.quaternion.clone())
          .normalize();

      this.clearDiceBodyMotion();
      body.position.set(
          Math.min(Math.max(body.position.x, bounds.minX), bounds.maxX),
          this.getDiceTrayRestY(),
          Math.min(Math.max(body.position.z, bounds.minZ), bounds.maxZ),
      );
      body.quaternion.set(
          snappedQuaternion.x,
          snappedQuaternion.y,
          snappedQuaternion.z,
          snappedQuaternion.w,
      );
      body.sleep();
    },

    recoverTiltedDice(faceData, now) {
      if (!this.dicePhysicsBody || !this.pendingDiceRoll) {
        return;
      }

      const body = this.dicePhysicsBody;
      const bounds = this.getDiceTrayBounds();
      const sidewaysNormal = faceData.worldNormal.clone();
      sidewaysNormal.y = 0;

      if (sidewaysNormal.lengthSq() < 0.0001) {
        const randomAngle = Math.random() * Math.PI * 2;
        sidewaysNormal.set(Math.cos(randomAngle), 0, Math.sin(randomAngle));
      } else {
        sidewaysNormal.normalize();
      }

      body.wakeUp();
      this.clearDiceBodyMotion();
      body.position.set(
          Math.min(Math.max(body.position.x, bounds.minX), bounds.maxX),
          Math.max(body.position.y, this.getDiceTrayRestY() + 0.04),
          Math.min(Math.max(body.position.z, bounds.minZ), bounds.maxZ),
      );

      const sidewaysForce = 0.22 + (Math.random() * 0.16);
      body.applyImpulse(
          new CANNON.Vec3(
              sidewaysNormal.x * sidewaysForce,
              0.42 + (Math.random() * 0.12),
              sidewaysNormal.z * sidewaysForce,
          ),
          new CANNON.Vec3(
              (Math.random() - 0.5) * 0.18,
              0,
              (Math.random() - 0.5) * 0.18,
          ),
      );
      body.angularVelocity.set(
          ((Math.random() - 0.5) * 3.2) + (sidewaysNormal.z * 2.8),
          1.8 + (Math.random() * 1.4),
          ((Math.random() - 0.5) * 3.2) - (sidewaysNormal.x * 2.8),
      );

      this.pendingDiceRoll.startedAt = now;
      this.pendingDiceRoll.lastRecoveryAt = now;
      this.pendingDiceRoll.recoveryAttempts += 1;
    },

    rollDice(amount) {
      if (!this.store.gamePlayStatus.isRolling || this.store.currentPlayerId < 0 || this.pendingDiceRoll) {
        return;
      }

      void amount;

      if (this.store.online.enabled) {
        const currentPlayer = this.store.players[this.store.currentPlayerId];
        if (currentPlayer?.controller !== 'local') {
          return;
        }
        // Throw the physical dice immediately to hide latency; the result is
        // resolved with the server value in tryResolveOnlineDice.
        this.store.gamePlayStatus.isRolling = false;
        this.hoverNeedsUpdate = true;
        this.onlineDice = { settled: false, serverValue: null, payload: null };
        MatchController.requestRoll();
        this.startDiceRoll();
        return;
      }

      this.store.gamePlayStatus.isRolling = false;
      this.hoverNeedsUpdate = true;
      this.startDiceRoll();
    },

    isMenuMode() {
      const orbitingScreens = ['login-screen', 'main-menu', 'online-menu'];
      return orbitingScreens.includes(this.store.currentScreen);
    },

    updateCameraPath() {
      if (!this.camera) return;

      if (this.isMenuMode()) {
        if (this.controls) {
          this.controls.enabled = false;
        }
        this.menuOrbitTime += 0.0025; // slow cinematic orbit speed
        const radius = 9.5;
        const target = CAMERA_GAME_TARGET;
        this.camera.position.x = target.x + Math.sin(this.menuOrbitTime) * radius;
        this.camera.position.z = target.z + Math.cos(this.menuOrbitTime) * radius;
        this.camera.position.y = 4.2 + Math.sin(this.menuOrbitTime * 2.2) * 1.5; // low and high wave
        this.camera.lookAt(target);
      } else if (this.cameraTransition) {
        if (this.controls) {
          this.controls.enabled = false;
        }
        const now = performance.now();
        const duration = 1500; // smooth 1.5s transition
        const elapsed = now - this.cameraTransition.start;
        const t = Math.min(elapsed / duration, 1);
        
        // Cubic ease-in-out
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        this.camera.position.lerpVectors(this.cameraTransition.fromPosition, CAMERA_GAME_POSITION, ease);

        const currentLook = _cameraLookScratch.lerpVectors(this.cameraTransition.fromTarget, CAMERA_GAME_TARGET, ease);
        this.camera.lookAt(currentLook);

        if (t >= 1) {
          this.cameraTransition = null;
          if (this.controls) {
            this.controls.enabled = true;
            this.controls.target.copy(CAMERA_GAME_TARGET);
            this.controls.update();
          }
        }
      }
    },
  },
};
</script>
