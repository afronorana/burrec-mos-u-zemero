<template>
  <main class="app-shell">
    <canvas ref="canvas" class="board-canvas"></canvas>
    <start-screen></start-screen>
    <div class="mobile-block-overlay">
      <div class="mobile-block-panel">
        <p class="mobile-block-icon">🖥️</p>
        <p class="mobile-block-title">Desktop Only</p>
        <p class="mobile-block-message">This game is only playable on desktop. Please open it on a computer to play.</p>
      </div>
    </div>
  </main>
</template>

<script>
import { markRaw } from 'vue';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import StartScreen from './components/StartScreen.vue';
import ApplicationStore from './utils/ApplicationStore';
import EventBus from './utils/eventhandler';
import EventKeys from './utils/EventKeys';
import { PAWN_STEP_DURATION_MS } from './utils/movementConstants';
import { getOutlineAppearancePreset } from './utils/outlineAppearance';
import { getRenderQualityPreset } from './utils/renderQuality';
import Player from './utils/Player';

const PLAYER_COLORS = ['#CE0000', '#F7D708', '#009ECE', '#9CCF31'];
const OUTLINE_COLOR = '#1b1411';
const BOARD_CENTER = { x: 5, z: 5 };
const DICE_SIZE = 0.9;
const BOARD_BASE_SIZE = 12.6;
const BOARD_TOP_SIZE = 11.3;
const DICE_TRAY = {
  center: { x: 16.1, y: -1.08, z: 4.2 },
  floor: { width: 3.35, height: 0.12, depth: 2.9 },
  wallThickness: 0.18,
  wallHeight: 0.86,
  guardPadding: 0.42,
  guardThickness: 0.42,
  guardHeight: 3.2,
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
const INTERACTION_SUNRAY = {
  pulseSpeed: 0.0052,
  dice: {
    beamHeight: 2.5,
    topRadius: 0.09,
    bottomRadius: 0.64,
    haloRadius: 0.5,
    anchorOffsetY: (-DICE_SIZE / 2) + 0.06,
  },
  pawn: {
    beamHeight: 2.15,
    topRadius: 0.08,
    bottomRadius: 0.46,
    haloRadius: 0.34,
    anchorOffsetY: -0.02,
  },
};

export default {
  name: 'AppRoot',
  components: {
    StartScreen,
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
      diceIndicator: null,
      dicePhysicsBody: null,
      physicsWorld: null,
      physicsLastTime: null,
      pendingDiceRoll: null,
      pawnMeshes: markRaw({}),
      pawnIndicators: markRaw({}),
      pawnMotionStates: markRaw({}),
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
    };
  },
  mounted() {
    this.addEventListeners();
    this.initThreeScene();

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

    if (this.diceIndicator) {
      this.scene?.remove(this.diceIndicator);
    }

    Object.values(this.pawnIndicators).forEach((indicator) => this.scene?.remove(indicator));

    this.dicePhysicsBody = null;
    this.physicsWorld = null;
    this.physicsLastTime = null;
    this.pendingDiceRoll = null;
    this.shadowLight = null;
    this.diceIndicator = null;
    this.pawnIndicators = markRaw({});
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
      scene.background = this.getSkyGradientTexture();

      const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
      );
      camera.position.set(7.2, 12.2, 16.1);
      camera.lookAt(new THREE.Vector3(6.3, 0, 5));

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.98;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
      controls.target.set(6.3, 0.4, 5);
      controls.update();

      this.scene = markRaw(scene);
      this.camera = markRaw(camera);
      this.renderer = markRaw(renderer);
      this.controls = controls;
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
      this.applyRenderQuality();
      this.applyOutlineAppearance();
      this.handleResize();
      this.renderScene();
    },

    createBoard() {
      this.createCartoonSurroundings();
      this.createGroundEnvironment();

      const boardBase = this.createOutlinedMesh(
          this.getSharedGeometry('board-base', () => new THREE.BoxGeometry(BOARD_BASE_SIZE, 0.3, BOARD_BASE_SIZE)),
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
      boardBase.position.set(BOARD_CENTER.x, -0.15, BOARD_CENTER.z);
      this.scene.add(boardBase);

      const boardTop = this.createOutlinedMesh(
          this.getSharedGeometry('board-top', () => new THREE.BoxGeometry(BOARD_TOP_SIZE, 0.08, BOARD_TOP_SIZE)),
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
      boardTop.position.set(BOARD_CENTER.x, 0.02, BOARD_CENTER.z);
      this.scene.add(boardTop);

      this.createDiceTray();

      const fieldGeometry = this.getSharedGeometry(
          'field-cylinder',
          () => new THREE.CylinderGeometry(0.37, 0.42, 0.08, 20),
      );
      const startGeometry = this.getSharedGeometry(
          'start-cylinder',
          () => new THREE.CylinderGeometry(0.42, 0.46, 0.1, 20),
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
        const playerTiles = this.createOutlinedInstancedSet(
            fieldGeometry,
            playerFieldMaterial,
            [
              ...home.fields.map((field) => ({ x: field.x, y: FIELD_CENTER_Y, z: field.z })),
              ...this.store.fields.target[playerIndex].fields.map((field) => ({ x: field.x, y: FIELD_CENTER_Y, z: field.z })),
            ],
            { outlineScale: { x: 1.062, y: 1.01, z: 1.062 }, receiveShadow: true },
        );
        this.scene.add(playerTiles);

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
        { x: -8.8, y: -0.18, z: -9.4, scale: [7.8, 2.9, 3.4], materialKey: 'hill-a', color: '#7dcb6f' },
        { x: 5.4, y: 0.06, z: -11.8, scale: [8.8, 3.6, 3.8], materialKey: 'hill-b', color: '#8fda7d' },
        { x: 18.4, y: -0.2, z: -8.8, scale: [6.8, 2.7, 3], materialKey: 'hill-c', color: '#6fc262' },
        { x: -9.8, y: -0.12, z: 18.2, scale: [8.6, 3.1, 3.6], materialKey: 'hill-d', color: '#78c768' },
        { x: 7.8, y: -0.08, z: 20.6, scale: [10.2, 3.7, 4.1], materialKey: 'hill-e', color: '#89d876' },
        { x: 20.6, y: -0.16, z: 18.4, scale: [7.4, 2.8, 3.3], materialKey: 'hill-f', color: '#73c05e' },
      ];

      hillConfigs.forEach((hill) => {
        const mesh = this.createOutlinedMesh(
            hillGeometry,
            this.createToonMaterial(`surrounding-${hill.materialKey}`, {
              color: hill.color,
            }, {
              outlineThickness: 0.0092,
              outlineColor: '#1f381a',
            }),
        );
        mesh.position.set(hill.x, hill.y, hill.z);
        mesh.scale.set(hill.scale[0], hill.scale[1], hill.scale[2]);
        this.scene.add(mesh);
      });

      const bushGeometry = this.getSharedGeometry('surrounding-bush', () => new THREE.SphereGeometry(1, 20, 20));
      const bushMaterial = this.createToonMaterial('surrounding-bush-material', {
        color: '#4ebf63',
      }, {
        outlineThickness: 0.0084,
        outlineColor: '#173617',
      });
      [
        { x: -2.6, y: -1.04, z: -5.4, scale: [0.9, 0.68, 0.7] },
        { x: 12.6, y: -1.02, z: -4.8, scale: [1.1, 0.72, 0.78] },
        { x: -1.8, y: -1.02, z: 14.9, scale: [1.15, 0.78, 0.84] },
        { x: 13.8, y: -1.03, z: 15.3, scale: [1.02, 0.7, 0.74] },
        { x: -5.8, y: -1.02, z: 5.6, scale: [0.96, 0.7, 0.72] },
        { x: 18.1, y: -1.02, z: 5.2, scale: [1.08, 0.76, 0.8] },
      ].forEach((bush) => {
        const mesh = this.createOutlinedMesh(bushGeometry, bushMaterial);
        mesh.position.set(bush.x, bush.y, bush.z);
        mesh.scale.set(bush.scale[0], bush.scale[1], bush.scale[2]);
        this.scene.add(mesh);
      });

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

      this.createCloud({ x: -9.8, y: 9.4, z: -15.6 }, 1.35);
      this.createCloud({ x: 3.8, y: 11.2, z: -18.4 }, 1.55);
      this.createCloud({ x: 18.2, y: 10.1, z: -14.8 }, 1.25);
      this.createCloud({ x: 15.6, y: 8.5, z: -6.4 }, 0.96);
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
      trayLight.position.set(DICE_TRAY.center.x, 2.6, DICE_TRAY.center.z);
      this.shadowLight = sunLight;

      this.scene.add(ambientLight);
      this.scene.add(skyLight);
      this.scene.add(sunLight);
      this.scene.add(sunLight.target);
      this.scene.add(fillLight);
      this.scene.add(trayLight);
    },

    createDiceTray() {
      const trayGroup = markRaw(new THREE.Group());
      const floorMaterial = this.createToonMaterial('dice-tray-floor-material', {
        color: '#f8d38c',
        roughness: 0.8,
        metalness: 0.03,
      }, {
        outlineThickness: 0.01,
        outlineColor: '#5a3319',
      });
      const wallMaterial = this.createToonMaterial('dice-tray-wall-material', {
        color: '#c37d42',
        roughness: 0.74,
        metalness: 0.04,
      }, {
        outlineThickness: 0.01,
        outlineColor: '#4b2a18',
      });
      const floor = this.createOutlinedMesh(
          this.getSharedGeometry(
              'dice-tray-floor',
              () => new THREE.BoxGeometry(
                  DICE_TRAY.floor.width,
                  DICE_TRAY.floor.height,
                  DICE_TRAY.floor.depth,
              ),
          ),
          floorMaterial,
          { outlineScale: { x: 1.03, y: 1.005, z: 1.03 }, receiveShadow: true },
      );
      floor.position.set(DICE_TRAY.center.x, DICE_TRAY.center.y, DICE_TRAY.center.z);
      trayGroup.add(floor);

      const wallHeightCenter = DICE_TRAY.center.y + (DICE_TRAY.floor.height / 2) + (DICE_TRAY.wallHeight / 2);
      const wallZOffset = (DICE_TRAY.floor.depth / 2) + (DICE_TRAY.wallThickness / 2);
      const wallXOffset = (DICE_TRAY.floor.width / 2) + (DICE_TRAY.wallThickness / 2);
      const northWall = this.createOutlinedMesh(
          this.getSharedGeometry(
              'dice-tray-wall-z',
              () => new THREE.BoxGeometry(
                  DICE_TRAY.floor.width + DICE_TRAY.wallThickness,
                  DICE_TRAY.wallHeight,
                  DICE_TRAY.wallThickness,
              ),
          ),
          wallMaterial,
          { outlineScale: 1.04, castShadow: true, receiveShadow: true },
      );
      northWall.position.set(DICE_TRAY.center.x, wallHeightCenter, DICE_TRAY.center.z - wallZOffset);
      trayGroup.add(northWall);

      const southWall = this.createOutlinedMesh(
          this.getSharedGeometry('dice-tray-wall-z', () => new THREE.BoxGeometry(
              DICE_TRAY.floor.width + DICE_TRAY.wallThickness,
              DICE_TRAY.wallHeight,
              DICE_TRAY.wallThickness,
          )),
          wallMaterial,
          { outlineScale: 1.04, castShadow: true, receiveShadow: true },
      );
      southWall.position.set(DICE_TRAY.center.x, wallHeightCenter, DICE_TRAY.center.z + wallZOffset);
      trayGroup.add(southWall);

      const westWall = this.createOutlinedMesh(
          this.getSharedGeometry(
              'dice-tray-wall-x',
              () => new THREE.BoxGeometry(
                  DICE_TRAY.wallThickness,
                  DICE_TRAY.wallHeight,
                  DICE_TRAY.floor.depth - DICE_TRAY.wallThickness,
              ),
          ),
          wallMaterial,
          { outlineScale: 1.04, castShadow: true, receiveShadow: true },
      );
      westWall.position.set(DICE_TRAY.center.x - wallXOffset, wallHeightCenter, DICE_TRAY.center.z);
      trayGroup.add(westWall);

      const eastWall = this.createOutlinedMesh(
          this.getSharedGeometry('dice-tray-wall-x', () => new THREE.BoxGeometry(
              DICE_TRAY.wallThickness,
              DICE_TRAY.wallHeight,
              DICE_TRAY.floor.depth - DICE_TRAY.wallThickness,
          )),
          wallMaterial,
          { outlineScale: 1.04, castShadow: true, receiveShadow: true },
      );
      eastWall.position.set(DICE_TRAY.center.x + wallXOffset, wallHeightCenter, DICE_TRAY.center.z);
      trayGroup.add(eastWall);

      this.scene.add(trayGroup);
    },

    createPhysicsWorld() {
      const world = markRaw(new CANNON.World({
        gravity: new CANNON.Vec3(0, -18, 0),
      }));
      world.allowSleep = true;
      world.broadphase = new CANNON.SAPBroadphase(world);
      world.defaultContactMaterial.friction = 0.24;
      world.defaultContactMaterial.restitution = 0.24;

      const floorBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(
            DICE_TRAY.floor.width / 2,
            DICE_TRAY.floor.height / 2,
            DICE_TRAY.floor.depth / 2,
        )),
        position: new CANNON.Vec3(
            DICE_TRAY.center.x,
            DICE_TRAY.center.y,
            DICE_TRAY.center.z,
        ),
      });
      world.addBody(floorBody);

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

      const wallY = DICE_TRAY.center.y + (DICE_TRAY.floor.height / 2) + (DICE_TRAY.wallHeight / 2);
      const wallZOffset = (DICE_TRAY.floor.depth / 2) + (DICE_TRAY.wallThickness / 2);
      const wallXOffset = (DICE_TRAY.floor.width / 2) + (DICE_TRAY.wallThickness / 2);
      const wallBodies = [
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              (DICE_TRAY.floor.width + DICE_TRAY.wallThickness) / 2,
              DICE_TRAY.wallHeight / 2,
              DICE_TRAY.wallThickness / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x, wallY, DICE_TRAY.center.z - wallZOffset),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              (DICE_TRAY.floor.width + DICE_TRAY.wallThickness) / 2,
              DICE_TRAY.wallHeight / 2,
              DICE_TRAY.wallThickness / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x, wallY, DICE_TRAY.center.z + wallZOffset),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              DICE_TRAY.wallThickness / 2,
              DICE_TRAY.wallHeight / 2,
              (DICE_TRAY.floor.depth - DICE_TRAY.wallThickness) / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x - wallXOffset, wallY, DICE_TRAY.center.z),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              DICE_TRAY.wallThickness / 2,
              DICE_TRAY.wallHeight / 2,
              (DICE_TRAY.floor.depth - DICE_TRAY.wallThickness) / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x + wallXOffset, wallY, DICE_TRAY.center.z),
        }),
      ];

      wallBodies.forEach((body) => world.addBody(body));

      const guardWallY = DICE_TRAY.center.y + (DICE_TRAY.guardHeight / 2);
      const guardZOffset = (DICE_TRAY.floor.depth / 2) + DICE_TRAY.guardPadding + (DICE_TRAY.guardThickness / 2);
      const guardXOffset = (DICE_TRAY.floor.width / 2) + DICE_TRAY.guardPadding + (DICE_TRAY.guardThickness / 2);
      const guardWalls = [
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              (DICE_TRAY.floor.width + (DICE_TRAY.guardPadding * 2) + DICE_TRAY.guardThickness) / 2,
              DICE_TRAY.guardHeight / 2,
              DICE_TRAY.guardThickness / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x, guardWallY, DICE_TRAY.center.z - guardZOffset),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              (DICE_TRAY.floor.width + (DICE_TRAY.guardPadding * 2) + DICE_TRAY.guardThickness) / 2,
              DICE_TRAY.guardHeight / 2,
              DICE_TRAY.guardThickness / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x, guardWallY, DICE_TRAY.center.z + guardZOffset),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              DICE_TRAY.guardThickness / 2,
              DICE_TRAY.guardHeight / 2,
              (DICE_TRAY.floor.depth + (DICE_TRAY.guardPadding * 2)) / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x - guardXOffset, guardWallY, DICE_TRAY.center.z),
        }),
        new CANNON.Body({
          mass: 0,
          shape: new CANNON.Box(new CANNON.Vec3(
              DICE_TRAY.guardThickness / 2,
              DICE_TRAY.guardHeight / 2,
              (DICE_TRAY.floor.depth + (DICE_TRAY.guardPadding * 2)) / 2,
          )),
          position: new CANNON.Vec3(DICE_TRAY.center.x + guardXOffset, guardWallY, DICE_TRAY.center.z),
        }),
      ];

      guardWalls.forEach((body) => world.addBody(body));

      this.physicsWorld = world;
      this.physicsLastTime = performance.now();
    },

    createDice() {
      const diceMesh = this.createOutlinedMesh(
          this.getSharedGeometry('dice-box', () => new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE)),
          this.createDiceMaterials(),
          { outlineScale: 1.09, castShadow: true, receiveShadow: true },
      );

      diceMesh.name = 'dice';
      this.diceMesh = markRaw(diceMesh);
      this.scene.add(diceMesh);

      const diceBody = markRaw(new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(DICE_SIZE / 2, DICE_SIZE / 2, DICE_SIZE / 2)),
        allowSleep: true,
        sleepSpeedLimit: 0.16,
        sleepTimeLimit: 0.35,
      }));
      this.physicsWorld?.addBody(diceBody);
      this.dicePhysicsBody = diceBody;
      this.resetDiceBody();
      this.syncDice();
      this.createDiceIndicator();
    },

    renderScene() {
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        if (this.controls) {
          this.controls.update();
        }
        this.stepPhysicsWorld();
        this.syncDice();
        this.syncPawns();
        this.syncInteractionIndicators(performance.now());
        if (this.hoverNeedsUpdate) {
          this.refreshHoveredTarget();
        }
        this.renderer.render(this.scene, this.camera);
      };

      animate();
    },

    syncDice() {
      if (!this.diceMesh || !this.dicePhysicsBody) {
        return;
      }

      this.diceMesh.position.set(
          this.dicePhysicsBody.position.x,
          this.dicePhysicsBody.position.y + DICE_VISUAL_FLOAT_Y,
          this.dicePhysicsBody.position.z,
      );
      this.diceMesh.quaternion.set(
          this.dicePhysicsBody.quaternion.x,
          this.dicePhysicsBody.quaternion.y,
          this.dicePhysicsBody.quaternion.z,
          this.dicePhysicsBody.quaternion.w,
      );
    },

    stepPhysicsWorld() {
      if (!this.physicsWorld) {
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
          this.completeDiceRoll(1);
          return;
        }

        if (!canEvaluateRestState || (!isSleeping && !isSlowEnough)) {
          return;
        }

        const faceData = this.getDiceTopFaceData();

        if (faceData.dot >= DICE_SETTLE_RULES.faceUpDotThreshold) {
          this.snapDiceToFaceUp(faceData);
          this.completeDiceRoll(faceData.value);
          return;
        }

        if (this.pendingDiceRoll.recoveryAttempts >= DICE_SETTLE_RULES.maxRecoveryAttempts) {
          this.snapDiceToFaceUp(faceData);
          this.completeDiceRoll(faceData.value);
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

      this.store.players.forEach((player) => {
        player.pawns.forEach((pawn) => {
          this.ensurePawnMesh(pawn);

          const pawnMesh = this.pawnMeshes[pawn.id];
          const targetState = this.getPawnWorldState(pawn);
          const animatedPosition = this.getAnimatedPawnPosition(pawn, targetState, now);

          pawnMesh.position.set(
              animatedPosition.x,
              animatedPosition.y,
              animatedPosition.z,
          );

          pawnMesh.scale.setScalar(pawn.isActive ? 1.1 : 1);
        });
      });
    },

    syncInteractionIndicators(now) {
      const canShowDiceIndicator = Boolean(
          this.diceIndicator &&
          this.diceMesh &&
          this.store.gamePlayStatus.isRolling &&
          this.isHumanTurn(),
      );

      if (canShowDiceIndicator) {
        this.updateSunrayIndicator(
            this.diceIndicator,
            {
              x: this.diceMesh.position.x,
              y: this.diceMesh.position.y + INTERACTION_SUNRAY.dice.anchorOffsetY,
              z: this.diceMesh.position.z,
            },
            now,
            this.hoveredTarget === 'dice' ? 1.08 : 1,
        );
      } else if (this.diceIndicator) {
        this.diceIndicator.visible = false;
      }

      this.store.players.forEach((player) => {
        player.pawns.forEach((pawn) => {
          const indicator = this.pawnIndicators[pawn.id];
          const mesh = this.pawnMeshes[pawn.id];
          const shouldShow = Boolean(
              indicator &&
              mesh &&
              this.store.gamePlayStatus.isMoving &&
              this.isHumanTurn() &&
              pawn.isActive,
          );

          if (!indicator) {
            return;
          }

          if (!shouldShow) {
            indicator.visible = false;
            return;
          }

          this.updateSunrayIndicator(
              indicator,
              {
                x: mesh.position.x,
                y: mesh.position.y + INTERACTION_SUNRAY.pawn.anchorOffsetY,
                z: mesh.position.z,
              },
              now,
              this.hoveredTarget === mesh.name ? 1.08 : 1,
          );
        });
      });
    },

    getPawnWorldState(pawn) {
      const coordinates = pawn.getCoordinates(PAWN_CENTER_Y);

      return {
        key: `${pawn.position}:${pawn.globalPosition}:${pawn.isInDestinationField ? 1 : 0}`,
        jumpHeight: this.getPawnJumpHeight(pawn),
        position: {
          x: coordinates.x,
          y: coordinates.y + (pawn.isActive ? PAWN_ACTIVE_LIFT_Y : 0),
          z: coordinates.z,
        },
      };
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

    cloneWorldPosition(position) {
      return {
        x: position.x,
        y: position.y,
        z: position.z,
      };
    },

    getAnimatedPawnPosition(pawn, targetState, now) {
      if (!this.pawnMotionStates[pawn.id]) {
        this.pawnMotionStates[pawn.id] = markRaw({
          current: this.cloneWorldPosition(targetState.position),
          from: this.cloneWorldPosition(targetState.position),
          to: this.cloneWorldPosition(targetState.position),
          logicalKey: targetState.key,
          startTime: now,
          duration: PAWN_STEP_DURATION_MS,
          jumpHeight: targetState.jumpHeight,
          isAnimating: false,
        });
      }

      const motion = this.pawnMotionStates[pawn.id];

      if (motion.logicalKey !== targetState.key) {
        motion.from = this.cloneWorldPosition(motion.current);
        motion.to = this.cloneWorldPosition(targetState.position);
        motion.logicalKey = targetState.key;
        motion.startTime = now;
        motion.duration = PAWN_STEP_DURATION_MS;
        motion.jumpHeight = targetState.jumpHeight;
        motion.isAnimating = true;
      }

      if (!motion.isAnimating) {
        motion.current = this.cloneWorldPosition(targetState.position);
        return motion.current;
      }

      const progress = Math.min((now - motion.startTime) / motion.duration, 1);
      const current = {
        x: motion.from.x + ((motion.to.x - motion.from.x) * progress),
        y: motion.from.y + ((motion.to.y - motion.from.y) * progress) + (Math.sin(Math.PI * progress) * motion.jumpHeight),
        z: motion.from.z + ((motion.to.z - motion.from.z) * progress),
      };

      motion.current = current;

      if (progress >= 1) {
        motion.current = this.cloneWorldPosition(motion.to);
        motion.isAnimating = false;
      }

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
      this.ensurePawnIndicator(pawn);
      this.applyOutlineAppearance();
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

    createDiceIndicator() {
      if (this.diceIndicator || !this.scene) {
        return;
      }

      this.diceIndicator = this.createSunrayIndicator('dice', INTERACTION_SUNRAY.dice);
      this.scene.add(this.diceIndicator);
    },

    ensurePawnIndicator(pawn) {
      if (this.pawnIndicators[pawn.id] || !this.scene) {
        return;
      }

      const indicator = this.createSunrayIndicator(`pawn-${pawn.id}`, INTERACTION_SUNRAY.pawn);
      this.pawnIndicators[pawn.id] = indicator;
      this.scene.add(indicator);
    },

    createSunrayIndicator(key, config) {
      const group = markRaw(new THREE.Group());
      const beam = markRaw(new THREE.Mesh(
          this.getSharedGeometry(
              `sunray-beam-${key}`,
              () => new THREE.CylinderGeometry(
                  config.topRadius,
                  config.bottomRadius,
                  config.beamHeight,
                  18,
                  1,
                  true,
              ),
          ),
          this.getSunrayBeamMaterial(),
      ));
      const core = markRaw(new THREE.Mesh(
          this.getSharedGeometry(
              `sunray-core-${key}`,
              () => new THREE.CylinderGeometry(
                  config.topRadius * 0.52,
                  config.bottomRadius * 0.42,
                  config.beamHeight * 0.88,
                  16,
                  1,
                  true,
              ),
          ),
          this.getSunrayCoreMaterial(),
      ));
      const halo = markRaw(new THREE.Mesh(
          this.getSharedGeometry(
              `sunray-halo-${key}`,
              () => new THREE.CircleGeometry(config.haloRadius, 28),
          ),
          this.getSunrayHaloMaterial(),
      ));

      beam.position.y = config.beamHeight * 0.5;
      core.position.y = config.beamHeight * 0.46;
      halo.position.y = 0.014;
      halo.rotation.x = -Math.PI / 2;

      [beam, core, halo].forEach((mesh) => {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.renderOrder = 30;
      });

      group.userData.beam = beam;
      group.userData.core = core;
      group.userData.halo = halo;
      group.userData.phase = Math.random() * Math.PI * 2;
      group.visible = false;
      group.add(beam);
      group.add(core);
      group.add(halo);
      return group;
    },

    updateSunrayIndicator(indicator, position, now, emphasis = 1) {
      if (!indicator) {
        return;
      }

      const phase = indicator.userData.phase || 0;
      const pulse = 1 + (Math.sin((now * INTERACTION_SUNRAY.pulseSpeed) + phase) * 0.05 * emphasis);
      const haloPulse = 1 + (Math.sin((now * 0.0072) + phase) * 0.08 * emphasis);
      const bob = Math.sin((now * 0.0035) + phase) * 0.015;
      const beam = indicator.userData.beam;
      const core = indicator.userData.core;
      const halo = indicator.userData.halo;

      indicator.visible = true;
      indicator.position.set(position.x, position.y + bob, position.z);
      beam.scale.set(pulse, 1, pulse);
      core.scale.set(pulse * 0.88, 1, pulse * 0.88);
      halo.scale.setScalar(haloPulse);
    },

    createToonMaterial(key, materialOptions) {
      return this.getSharedMaterial(
          key,
          () => {
            const material = markRaw(new THREE.MeshStandardMaterial({
              roughness: 0.78,
              metalness: 0.02,
              ...materialOptions,
            }));
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

    getSunrayBeamMaterial() {
      return this.getSharedMaterial(
          'sunray-beam-material',
          () => markRaw(new THREE.MeshBasicMaterial({
            color: '#ffe3a0',
            transparent: true,
            opacity: 0.38,
            alphaMap: this.getSunrayBeamTexture(),
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            toneMapped: false,
          })),
      );
    },

    getSunrayCoreMaterial() {
      return this.getSharedMaterial(
          'sunray-core-material',
          () => markRaw(new THREE.MeshBasicMaterial({
            color: '#fff6cf',
            transparent: true,
            opacity: 0.26,
            alphaMap: this.getSunrayBeamTexture(),
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            toneMapped: false,
          })),
      );
    },

    getSunrayHaloMaterial() {
      return this.getSharedMaterial(
          'sunray-halo-material',
          () => markRaw(new THREE.MeshBasicMaterial({
            color: '#ffe4a8',
            transparent: true,
            opacity: 0.52,
            alphaMap: this.getSunrayHaloTexture(),
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            toneMapped: false,
          })),
      );
    },

    getSunrayBeamTexture() {
      return this.getSharedTexture(
          'sunray-beam-texture',
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 256;

            const context = canvas.getContext('2d');
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(0.16, '#4a4a4a');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(0.84, '#7f7f7f');
            gradient.addColorStop(1, '#000000');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            const texture = markRaw(new THREE.CanvasTexture(canvas));
            texture.needsUpdate = true;
            return texture;
          },
      );
    },

    getSunrayHaloTexture() {
      return this.getSharedTexture(
          'sunray-halo-texture',
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;

            const context = canvas.getContext('2d');
            const gradient = context.createRadialGradient(128, 128, 12, 128, 128, 128);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.28, '#e8e8e8');
            gradient.addColorStop(0.62, '#7f7f7f');
            gradient.addColorStop(1, '#000000');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            const texture = markRaw(new THREE.CanvasTexture(canvas));
            texture.needsUpdate = true;
            return texture;
          },
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
              const faceMaterial = markRaw(new THREE.MeshStandardMaterial({
                color: '#ffffff',
                map: this.getDiceFaceTexture(faceValue),
                roughness: 0.5,
                metalness: 0.01,
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

    getSkyGradientTexture() {
      return this.getSharedTexture(
          'sky-gradient-texture',
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 512;

            const context = canvas.getContext('2d');
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
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

            const texture = markRaw(new THREE.CanvasTexture(canvas));
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            return texture;
          },
      );
    },

    createCloud(position, scale = 1) {
      const cloud = markRaw(new THREE.Group());
      const puffGeometry = this.getSharedGeometry('cartoon-cloud-puff', () => new THREE.SphereGeometry(1, 20, 20));
      const puffMaterial = this.createToonMaterial('cartoon-cloud-material', {
        color: '#ffffff',
      }, {
        outlineThickness: 0.0082,
        outlineColor: '#68818f',
        outlineAlpha: 0.9,
      });

      [
        { x: -1.35, y: 0, z: 0.15, scale: [1.1, 0.82, 0.92] },
        { x: -0.35, y: 0.3, z: 0, scale: [1.28, 0.96, 1.02] },
        { x: 0.7, y: 0.2, z: -0.08, scale: [1.15, 0.88, 0.95] },
        { x: 1.55, y: -0.02, z: 0.1, scale: [0.92, 0.7, 0.8] },
      ].forEach((puff) => {
        const mesh = this.createOutlinedMesh(puffGeometry, puffMaterial);
        mesh.position.set(puff.x, puff.y, puff.z);
        mesh.scale.set(puff.scale[0], puff.scale[1], puff.scale[2]);
        cloud.add(mesh);
      });

      cloud.position.set(position.x, position.y, position.z);
      cloud.scale.setScalar(scale);
      this.scene.add(cloud);
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
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
      this.hoverNeedsUpdate = true;
    },

    isHumanTurn() {
      const currentPlayer = this.store.players[this.store.currentPlayerId];
      return Boolean(currentPlayer && !currentPlayer.isComputer);
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

      if (this.diceMesh && this.store.gamePlayStatus.isRolling && this.isHumanTurn()) {
        interactiveObjects.push(this.diceMesh);
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
        if (current.name === 'dice' || current.name.startsWith('cube-')) {
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

      if (target === 'dice') {
        this.rollDice();
        this.hoverNeedsUpdate = true;
        return;
      }

      const pawn = this.findPawnByMeshName(target);
      if (pawn?.isActive) {
        pawn.move();
        this.hoverNeedsUpdate = true;
      }
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

      Object.values(this.pawnIndicators).forEach((indicator) => {
        this.scene.remove(indicator);
      });

      this.pawnMeshes = markRaw({});
      this.pawnIndicators = markRaw({});
      this.pawnMotionStates = markRaw({});

      this.pendingDiceRoll = null;
      this.freezeDiceBody();
      this.syncDice();
      if (this.diceIndicator) {
        this.diceIndicator.visible = false;
      }

      this.clearHoveredTarget();
    },

    createPlayers(playerNames) {
      playerNames.forEach((playerName, index) => {
        this.store.players.push(
            new Player(
                playerName || 'Computer',
                PLAYER_COLORS[index],
                index + 1,
                !playerName,
            ),
        );
      });
    },

    startGame(playerNames) {
      const normalizedNames = Array.isArray(playerNames)
        ? playerNames.slice(0, 4)
        : [];

      while (normalizedNames.length < 4) {
        normalizedNames.push('');
      }

      this.resetGameState();
      this.createPlayers(normalizedNames);
      this.store.currentRound = 1;
      this.store.currentScreen = 'game-screen';
      this.changePlayersTurn();
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
          DICE_TRAY.center.x,
          DICE_TRAY.center.y + (DICE_TRAY.floor.height / 2) + (DICE_SIZE / 2),
          DICE_TRAY.center.z,
      );
      this.dicePhysicsBody.quaternion.set(0, 0, 0, 1);
      this.dicePhysicsBody.sleep();
    },

    getDiceTrayRestY() {
      return DICE_TRAY.center.y + (DICE_TRAY.floor.height / 2) + (DICE_SIZE / 2);
    },

    getDiceTrayBounds() {
      return {
        minX: DICE_TRAY.center.x - ((DICE_TRAY.floor.width / 2) - (DICE_SIZE * 0.56)),
        maxX: DICE_TRAY.center.x + ((DICE_TRAY.floor.width / 2) - (DICE_SIZE * 0.56)),
        minZ: DICE_TRAY.center.z - ((DICE_TRAY.floor.depth / 2) - (DICE_SIZE * 0.56)),
        maxZ: DICE_TRAY.center.z + ((DICE_TRAY.floor.depth / 2) - (DICE_SIZE * 0.56)),
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

      const centerBiasX = (DICE_TRAY.center.x - body.position.x) * 1.25;
      const centerBiasZ = (DICE_TRAY.center.z - body.position.z) * 1.25;
      const horizontalX = centerBiasX + ((Math.random() - 0.5) * 3.4);
      const horizontalZ = centerBiasZ + ((Math.random() - 0.5) * 3.1);
      body.angularVelocity.set(
          (Math.random() - 0.5) * 18,
          10 + (Math.random() * 12),
          (Math.random() - 0.5) * 18,
      );

      body.applyImpulse(
          new CANNON.Vec3(
              horizontalX,
              5.1 + (Math.random() * 0.95),
              horizontalZ,
          ),
          new CANNON.Vec3(
              (Math.random() - 0.5) * 0.24,
              0,
              (Math.random() - 0.5) * 0.24,
          ),
      );

      this.pendingDiceRoll = {
        startedAt: performance.now(),
        lastRecoveryAt: 0,
        recoveryAttempts: 0,
      };
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

      const quaternion = new THREE.Quaternion(
          this.dicePhysicsBody.quaternion.x,
          this.dicePhysicsBody.quaternion.y,
          this.dicePhysicsBody.quaternion.z,
          this.dicePhysicsBody.quaternion.w,
      );
      let bestFace = 1;
      let bestDot = -Infinity;
      let bestWorldNormal = WORLD_UP.clone();

      Object.entries(DICE_FACE_NORMALS).forEach(([faceValue, normal]) => {
        const worldNormal = normal.clone().applyQuaternion(quaternion);
        const dot = worldNormal.dot(WORLD_UP);

        if (dot > bestDot) {
          bestDot = dot;
          bestFace = Number(faceValue);
          bestWorldNormal = worldNormal;
        }
      });

      return {
        value: bestFace,
        dot: bestDot,
        worldNormal: bestWorldNormal,
        quaternion,
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
      this.store.gamePlayStatus.isRolling = false;
      this.hoverNeedsUpdate = true;
      this.startDiceRoll();
    },
  },
};
</script>
