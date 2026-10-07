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
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
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
import { getRenderQualityPreset, RENDER_QUALITY_MIN } from './utils/renderQuality';
import { PLAYER_COLORS } from './utils/playerColors';
import Player from './utils/Player';
import MatchController, { seatPlayerName } from './network/MatchController';
import { readMatchUrl, loadActiveMatch } from './utils/matchSession';
import {
  loadNatureKit,
  NATURE_BACKDROP,
  NATURE_DETAILS,
  NATURE_MODEL_NAMES,
} from './utils/natureKit';
import { PROP_MATERIAL_PREFIXES, flagMaterialKey, buildPropMesh } from './utils/cosmetics';
import {
  finisherTiming,
  FINISHER_LAUNCH_DELAY,
  LITE_FINISHER_TIMING,
  STAGE_GAP,
  TRAPDOOR_ORDER,
  TRAPDOOR_DEPTH,
  actionTime,
  landingTime,
  cameraShake,
  buildFinisherTool,
  poseFinisherTool,
  attackerLunge,
  attackerStretch,
  attackerHop,
  attackerTakeover,
  victimTremble,
  victimLean,
  victimSpin,
  victimStretch,
  victimLandingHop,
  trapdoorVictim,
  propWobble,
  buildRabbit,
  victimForm,
  rabbitHop,
  ufoVictim,
  buildPoof,
  posePoof,
  buildDustPuff,
  poseDustPuff,
} from './utils/finishers';
import { playFinisherImpact, playFinisherWindup } from './utils/sound';
import { DEFAULT_FINISHER, DEFAULT_FLAG, NO_FINISHER, guestCosmetics, pawnLook, wearableCosmetics } from '../shared/protocol';

const OUTLINE_COLOR = '#1b1411';
const BOARD_CENTER = { x: 5, z: 5 };
const DICE_SIZE = 0.456;
const DICE_CORNER_RADIUS = DICE_SIZE * 0.12;
const BOARD_BASE_SIZE = 12.6;
const BOARD_TOP_SIZE = 11.3;
// Rounded plan corners. The top slab is inset 0.65 per side, so its radius
// is smaller by exactly that much — the two curves stay concentric with an
// even margin all the way around the corner.
const BOARD_BASE_CORNER_RADIUS = 1.2;
const BOARD_TOP_CORNER_RADIUS = 0.55;
// Central dice pit — a shallow round hole sunk into the middle of the board
// (both board slabs are extruded with a matching cutout, and the pit liner
// hides the cut edges). Invisible walls (an octagon of static physics boxes)
// keep the dice inside without caging it visually.
const DICE_PIT_NEUTRAL_COLOR = '#e8d8a9';
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
// Per-environment lights (applyEnvironment). `ambient` is folded into the
// hemisphere light rather than being its own AmbientLight.
const ENVIRONMENT_LIGHTING = {
  day: {
    ambient: '#f6f0e7', ambientIntensity: 0.28,
    sky: '#d2e6ff', ground: '#97ae72', skyIntensity: 0.62,
    sun: '#fff1db', sunIntensity: 1.45, sunPosition: [-5.5, 13.5, 6.5],
    fill: '#c7dfff', fillIntensity: 0.42,
  },
  night: {
    ambient: '#1a2b4c', ambientIntensity: 0.45,
    sky: '#2b3e66', ground: '#0d131f', skyIntensity: 0.65,
    sun: '#b3ccff', sunIntensity: 0.9, sunPosition: [-5.5, 13.5, 6.5],
    fill: '#4c70b3', fillIntensity: 0.45,
  },
  dusk: {
    ambient: '#4c2e3d', ambientIntensity: 0.42,
    sky: '#805373', ground: '#2d1a24', skyIntensity: 0.75,
    sun: '#ff8855', sunIntensity: 1.55, sunPosition: [-11.5, 6.5, 3.5],
    fill: '#a65f91', fillIntensity: 0.55,
  },
  dawn: {
    ambient: '#373d59', ambientIntensity: 0.45,
    sky: '#8c7299', ground: '#26202c', skyIntensity: 0.75,
    sun: '#ffbb77', sunIntensity: 1.65, sunPosition: [-10.5, 8.5, 4.5],
    fill: '#7592c9', fillIntensity: 0.52,
  },
};
const _envAmbientScratch = new THREE.Color();
const DICE_ATLAS_COLUMNS = 3;
const DICE_ATLAS_ROWS = 2;
// RoundedBoxGeometry keeps BoxGeometry's six face groups (+x,-x,+y,-y,+z,-z
// = DICE_FACE_ORDER) with 0..1 UVs per face; squeeze each face's UVs into
// its pip tile of the atlas, then drop the groups so one material covers it.
const buildDiceGeometry = () => {
  const geometry = new RoundedBoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE, 3, DICE_CORNER_RADIUS);
  const uv = geometry.attributes.uv;
  const index = geometry.index;
  const remapped = new Set();
  geometry.groups.forEach((group, faceIndex) => {
    const value = DICE_FACE_ORDER[faceIndex];
    const col = (value - 1) % DICE_ATLAS_COLUMNS;
    const rowFromTop = Math.floor((value - 1) / DICE_ATLAS_COLUMNS);
    const row = DICE_ATLAS_ROWS - 1 - rowFromTop; // UV v grows upward
    for (let i = group.start; i < group.start + group.count; i += 1) {
      const vertex = index ? index.getX(i) : i;
      if (remapped.has(vertex)) continue;
      remapped.add(vertex);
      uv.setXY(
          vertex,
          (col + uv.getX(vertex)) / DICE_ATLAS_COLUMNS,
          (row + uv.getY(vertex)) / DICE_ATLAS_ROWS,
      );
    }
  });
  uv.needsUpdate = true;
  geometry.clearGroups();
  return geometry;
};
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
// Pawn = cone body + ball head merged into one geometry; each part scaled
// about its own center (the outline shell variant uses > 1).
const buildPawnGeometry = (bodyScale, headScale) => {
  const body = new THREE.CylinderGeometry(0.08, 0.28, 0.75, 24)
      .scale(bodyScale, bodyScale, bodyScale)
      .translate(0, 0.35, 0);
  const head = new THREE.SphereGeometry(0.18, 24, 24)
      .scale(headScale, headScale, headScale)
      .translate(0, 0.85, 0);
  const merged = mergeGeometries([body, head]);
  body.dispose();
  head.dispose();
  return merged;
};

// Render-loop scratch objects — reused every frame to avoid GC churn.
const _cameraLookScratch = new THREE.Vector3();
const _finisherCamPos = new THREE.Vector3();
const _finisherCamLook = new THREE.Vector3();
const _finisherBasePos = new THREE.Vector3();
const _finisherFocus = new THREE.Vector3();
const _finisherSpherical = new THREE.Spherical();
const _finisherSphericalFrom = new THREE.Spherical();
const _finisherSpin = new THREE.Quaternion();
const _finisherYaw = new THREE.Quaternion();
const _worldUp = new THREE.Vector3(0, 1, 0);
const _wardrobeCamPos = new THREE.Vector3();
const _wardrobeCamLook = new THREE.Vector3();
const _wardrobeScratch = new THREE.Vector3();

// Wardrobe preview stage (its own little scene, see renderWardrobeStage):
// the pawn stands at the origin; a Finisher preview hits a victim along +X
// with the camera side-on from +Z. Idle framing is a close-up of the pawn,
// action framing is wide enough for the tools and the launch.
// A white photo-studio room: off-white backdrop, a fine grid on the floor
// that fog fades into the backdrop, and a light plinth.
const WARDROBE_BACKGROUND = '#f4f2ed';
const WARDROBE_FLOOR_Y = -1.6;

// Floor tile: white with a faint grid line on two edges (tiles via repeat).
function gridFloorTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(38, 63, 42, 0.13)';
  ctx.fillRect(0, 0, size, 3);
  ctx.fillRect(0, 0, 3, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  return texture;
}

// A soft dark radial blob (contact shadow under the preview pawn).
function contactShadowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.32)');
  gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.12)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}
const WARDROBE_FRAMING = {
  idle: { pos: [0.2, 1.55, 4.7], look: [0.2, 0.82, 0] },
  action: { pos: [0.45, 1.9, 6.4], look: [0.45, 0.65, 0] },
};
const WARDROBE_VICTIM_HOME = { x: 9, y: 0, z: -2 };
const _attackerPoseScratch = { x: 0, y: 0, z: 0 };
// Props hang off a pivot at the head center (pawn-group local y), so a
// Finisher can tilt them about it (tiltProp).
const PROP_PIVOT_Y = 0.85;
const _propAxis = new THREE.Vector3();
const _propInverse = new THREE.Quaternion();
const _diceFaceQuaternion = new THREE.Quaternion();
const _diceFaceScratch = new THREE.Vector3();
const _diceBestNormal = new THREE.Vector3();
const _diceDisplayQuaternion = new THREE.Quaternion();

const createRoundedRectShape = (size, cornerRadius) => {
  const half = size / 2;
  const r = cornerRadius;
  const shape = new THREE.Shape();
  shape.moveTo(-half + r, -half);
  shape.lineTo(half - r, -half);
  shape.quadraticCurveTo(half, -half, half, -half + r);
  shape.lineTo(half, half - r);
  shape.quadraticCurveTo(half, half, half - r, half);
  shape.lineTo(-half + r, half);
  shape.quadraticCurveTo(-half, half, -half, half - r);
  shape.lineTo(-half, -half + r);
  shape.quadraticCurveTo(-half, -half, -half + r, -half);
  shape.closePath();
  return shape;
};

const extrudeSlab = (shape, thickness) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments: 48,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
};

// A rounded-corner slab; geometry origin is the bottom of the slab
// (extrusion runs along local +y).
const createRoundedSlab = (size, thickness, cornerRadius) => extrudeSlab(
    createRoundedRectShape(size, cornerRadius),
    thickness,
);

// Same slab with the dice-pit cutout at its center.
const createSlabWithPitHole = (size, thickness, cornerRadius) => {
  const shape = createRoundedRectShape(size, cornerRadius);

  const hole = new THREE.Path();
  hole.absarc(0, 0, DICE_PIT.holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return extrudeSlab(shape, thickness);
};
// The dice arena: physics world with all static colliders (pit floor,
// table, safety floor, octagon walls). Built by a free function so the
// hidden landing-prediction world is an exact clone of the live one.
const createDiceArenaWorld = () => {
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

  return world;
};

const createDicePhysicsBody = () => markRaw(new CANNON.Body({
  mass: 1,
  shape: new CANNON.Box(new CANNON.Vec3(DICE_SIZE / 2, DICE_SIZE / 2, DICE_SIZE / 2)),
  allowSleep: true,
  sleepSpeedLimit: 0.16,
  sleepTimeLimit: 0.35,
  // Bleeds off residual spin so the dice flops onto a face instead of
  // pirouetting on an edge.
  angularDamping: 0.08,
}));

// Slightly wide lens so the whole board stays in frame at all times.
const CAMERA_FOV_LANDSCAPE = 50;
const CAMERA_FOV_PORTRAIT = 66;
// Every clickable cue (ground ring + hover outline) is one static UI
// orange. They used to pulse, but an animated cue forces continuous
// rendering for as long as it's on screen (a whole turn) — keep them still.
const CLICKABLE_COLOR_HEX = '#ff7700';
const CLICKABLE_COLOR = new THREE.Color(CLICKABLE_COLOR_HEX);
// Selectable home bases wear their own player color.
const HOME_BASE_RING_COLORS = PLAYER_COLORS.map((hex) => new THREE.Color(hex));
// Render cap for every source (camera, dice, pawn hops, menu orbit), picked
// per device by updateRenderCap: phones/tablets and laptops on battery get
// the low cap, everything else the high one. These are targets: the real cap
// is a whole divisor of the display refresh rate nearest to them (ties go to
// the smoother one), because an uneven cadence (24fps on 60Hz = 33/50ms
// alternating) judders worse than a slightly lower even one.
const RENDER_FPS_LOW = 24;
const RENDER_FPS_HIGH = 48;
// Display refresh is estimated from the median of recent rAF deltas.
const REFRESH_SAMPLE_COUNT = 31;
const REFRESH_DEFAULT_HZ = 60;
// Menu backdrop drift: deliberately barely-there (~5 min per full turn,
// a gentle height swell) so it reads as a living scene, not a spin.
const MENU_ORBIT_RAD_PER_MS = 0.02 / 1000;
const MENU_ORBIT_BOB = 0.35;

const DICE_SETTLE_RULES = {
  minimumMotionMs: 500,
  faceUpDotThreshold: 0.94,
  recoveryCooldownMs: 180,
  maxRecoveryAttempts: 3,
};
// Local-space outline sample points for the 2D hover highlight — constant,
// so they're computed once here; per-frame projection reuses one scratch
// vector instead of allocating hundreds of Vector3s (see drawObjectHighlight2D).
const _highlightProjScratch = new THREE.Vector3();
const DICE_LOCAL_CORNERS = (() => {
  const h = DICE_SIZE / 2;
  const corners = [];
  [-h, h].forEach((x) => [-h, h].forEach((y) => [-h, h].forEach((z) => {
    corners.push(new THREE.Vector3(x, y, z));
  })));
  return corners;
})();
const PAWN_BODY_LOCAL_POINTS = (() => {
  const pts = [];
  const n = 20;
  const levels = [
    { y: -0.025, r: 0.28 },
    { y: 0.175, r: 0.227 },
    { y: 0.35, r: 0.18 },
    { y: 0.55, r: 0.127 },
    { y: 0.725, r: 0.08 },
  ];
  for (const { y, r } of levels) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
  }
  return pts;
})();
const PAWN_HEAD_LOCAL_POINTS = (() => {
  const pts = [];
  const n = 20;
  const r = 0.18;
  const cy = 0.85;
  const sinLatitudes = [-0.85, -0.6, -0.35, -0.1, 0.15, 0.4, 0.65, 0.85, 1.0];
  for (const sinLat of sinLatitudes) {
    const ringR = r * Math.sqrt(Math.max(0, 1 - (sinLat * sinLat)));
    const ringY = cy + (sinLat * r);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ringR, ringY, Math.sin(a) * ringR));
    }
  }
  return pts;
})();
// Reused across frames by getAnimatedPawnPosition — values are consumed
// immediately, never kept.
const _pawnCoordsScratch = { x: 0, y: 0, z: 0 };
// Ripple targets: at most one per pool ring, reused every frame.
const _rippleTargets = [];
const RIPPLE_TARGET_POOL = [0, 1, 2, 3, 4].map(() => ({ x: 0, y: 0, z: 0, scale: 0.6 }));

const BOARD_TOP_SURFACE_Y = 0.06;
const FIELD_CLEARANCE_Y = 0.022;
const FIELD_CENTER_Y = BOARD_TOP_SURFACE_Y + 0.04 + FIELD_CLEARANCE_Y;
const START_FIELD_CENTER_Y = BOARD_TOP_SURFACE_Y + 0.05 + FIELD_CLEARANCE_Y;
const PAWN_CENTER_Y = FIELD_CENTER_Y + 0.085;
// Passing a pawn mid-move: the hop lands on its head (pawn ≈ 1.03 tall)
// and leaps higher to get there.
const PAWN_PERCH_HEIGHT = 1.0;
const PAWN_PERCH_JUMP = 0.55;
const _occupantScratch = { x: 0, y: 0, z: 0 };
// Facing: the last target-lane position, and scratch for the two fields.
const TARGET_LANE_END = 44;
const _facingFromScratch = { x: 0, y: 0, z: 0 };
const _facingToScratch = { x: 0, y: 0, z: 0 };
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
    // Per-match environment chosen by the room creator — overrides the local
    // preference while connected to that match.
    'store.online.environment'() {
      this.applyEnvironment();
    },
    // Props follow the match's cosmetics map (replaced wholesale on every
    // LOBBY_STATE/STATE_SYNC) and, for our own pawns, the local pick.
    'store.online.cosmetics'() {
      this.applyPawnProps();
    },
    'store.settings.cosmetics': {
      deep: true,
      handler() {
        this.applyPawnProps();
      },
    },
    'store.wardrobe.inGame'(open) {
      if (!open && this.finisher?.wardrobe) {
        this.endFinisher();
      }
      this.requestRender();
    },
    'store.wardrobe.play'(request) {
      if (request) {
        this.startWardrobeFinisher(request.id);
      }
    },
    pendingDiceRoll(val) {
      this.store.gamePlayStatus.isDiceRolling = Boolean(val);
    },
    'store.currentPlayerId'() {
      this.applyPitRimColor();
    },
    'store.currentScreen'(newScreen, oldScreen) {
      const isOrbitScreen = (s) => ['main-menu', 'home', 'create-room', 'join-room', 'admin', 'wardrobe'].includes(s) || !s;
      const isFixedScreen = (s) => ['lobby', 'game-screen'].includes(s);

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
        this.menuOrbitLastAt = 0;
        if (this.controls) {
          this.controls.enabled = false;
        }
      }

      if (oldScreen === 'game-screen') {
        this.store.wardrobe.inGame = false;
      }
      if (oldScreen === 'wardrobe' && this.finisher?.wardrobe) {
        this.endFinisher();
      }

      this.applyPitRimColor();
      this.requestRender();

      if (newScreen === 'lobby') {
        this.syncOnlinePlayersFromLobby();
      }
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
      diceVisualLiftY: DICE_VISUAL_FLOAT_Y,
      dicePhysicsBody: null,
      physicsWorld: null,
      physicsLastTime: null,
      pendingDiceRoll: null,
      onlineDice: null,
      diceSnapTween: null,
      // Mesh-local rotation that remaps the pips so a rigged online roll
      // lands on the server value (identity in local games). Applied on top
      // of the physics orientation in syncDice; always a cube symmetry, so
      // the die still rests axis-aligned.
      diceVisualOffset: markRaw(new THREE.Quaternion()),
      diceOffsetTween: null,
      dicePredictionSim: null,
      dicePitMesh: null,
      dicePitRimMaterial: null,
      pawnMeshes: markRaw({}),
      pawnMotionStates: markRaw({}),
      cameraTransition: null,
      overlayCtx: null,
      homeBaseHelpers: null,
      homeBaseRippleRings: null,
      clickableRipples: null,
      decorationMeshes: null,
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
      pointerDownPosition: null,
      isDraggingScene: false,
      controlsChangeHandler: null,
      isPointerInsideCanvas: false,
      demoKeyBuffer: '',
      // The running Finisher (see startFinisher), or null.
      finisher: null,
      // Wardrobe preview scene, built on first visit (ensureWardrobeStage).
      wardrobeStage: null,
      swallowNextClick: false,
      // Rolling window of consecutive rendered-frame deltas (auto quality).
      autoQuality: markRaw({ deltas: [], lastSampleAt: 0, dropsLeft: 2 }),
    };
  },
  created() {
    // Per-frame render-loop bookkeeping lives outside data(): written every
    // rAF tick, never read by a template, so Vue reactivity is pure overhead.
    this.menuOrbitTime = 0;
    this.menuOrbitLastAt = 0;
    this.hoveredTarget = null;
    this.hoverNeedsUpdate = false;
    // false, or the hovered target the 2D outline was last drawn for.
    this.overlayHasContent = false;
    // Demand rendering: render passes run only when something changed.
    this.renderNeeded = true;
    this.lastRenderAt = 0;
    // Frame cap (updateRenderCap, once isMobile is known in initThreeScene).
    this.renderFps = RENDER_FPS_LOW;
    this.renderFpsLow = RENDER_FPS_LOW;
    this.renderFrameIntervalMs = 1000 / RENDER_FPS_LOW;
    this.refreshHz = REFRESH_DEFAULT_HZ;
    this.refreshDeltas = new Float32Array(REFRESH_SAMPLE_COUNT);
    this.refreshSorted = new Float32Array(REFRESH_SAMPLE_COUNT);
    this.refreshDeltaCount = 0;
    this.lastFrameStamp = 0;
    this.lastFrameRendered = false;
    this.onBattery = false;
    this.renderCapDowngraded = false;
    this.battery = null;
    this.batteryHandler = null;
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

    // A visible-but-unfocused window (game behind another app) keeps rAF
    // running; freeze the menu orbit — the only endless render source — then.
    this.windowFocused = document.hasFocus();
    this.focusHandler = () => {
      this.windowFocused = true;
      this.requestRender();
    };
    this.blurHandler = () => {
      this.windowFocused = false;
    };

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('focus', this.focusHandler);
    window.addEventListener('blur', this.blurHandler);
    this.$refs.canvas.addEventListener('pointerdown', this.pointerDownHandler);
    this.$refs.canvas.addEventListener('mousemove', this.pointerMoveHandler);
    this.$refs.canvas.addEventListener('mouseleave', this.pointerLeaveHandler);
    this.$refs.canvas.addEventListener('click', this.clickHandler);

    this.checkResumeOnLoad();
  },
  beforeUnmount() {
    this.eventUnsubscribers.forEach((unsubscribe) => unsubscribe());

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    window.removeEventListener('focus', this.focusHandler);
    window.removeEventListener('blur', this.blurHandler);
    this.battery?.removeEventListener('chargingchange', this.batteryHandler);
    this.battery = undefined;

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
    this.dicePredictionSim = null;
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
        EventBus.listen(EventKeys.game.startOnline, this.startOnlineGame),
        EventBus.listen(EventKeys.game.won, this.handleGameWon),
        EventBus.listen(EventKeys.net.diceResult, this.handleNetDiceResult),
        EventBus.listen(EventKeys.net.turnChange, this.handleNetTurnChange),
        EventBus.listen(EventKeys.net.stateSync, this.handleNetStateSync),
        EventBus.listen(EventKeys.net.lobbyUpdated, this.handleLobbyUpdated),
        EventBus.listen(EventKeys.pawn.captured, this.handleCaptured),
        EventBus.listen(EventKeys.pawn.autoMove, this.handleAutoMove),
      ];
    },

    handleKeydown(event) {
      // Typing in the chat (or any input) must keep its keys — the shortcuts
      // below only apply outside editable elements.
      const target = event.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Typing T-E-S-T toggles demo mode: keys 1-6 then roll that exact value
      // (the server honors the demand only when it runs with DEMO_DICE=1).
      if (/^[a-z]$/i.test(event.key)) {
        this.demoKeyBuffer = (this.demoKeyBuffer + event.key.toUpperCase()).slice(-4);
        if (this.demoKeyBuffer === 'TEST') {
          this.demoKeyBuffer = '';
          this.store.demoMode = !this.store.demoMode;
        }
        return;
      }

      if (this.store.currentScreen !== 'game-screen') {
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();
        this.rollDice();
        return;
      }

      if (this.store.demoMode && event.key >= '1' && event.key <= '6') {
        this.rollDice(Number(event.key));
      }
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
        // The trapdoor's pit is cut into the board with a stencil mask.
        stencil: true,
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
      this.store.isMobile = this.isMobile;
      const isMobile = this.isMobile;
      this.updateRenderCap();
      this.watchBatteryForRenderCap();
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
        window.__burrecApp = this; // e2e/debug hook, dev server only
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
      this.createNatureEnvironment();
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
          this.getSharedGeometry('board-base-pit', () => createSlabWithPitHole(BOARD_BASE_SIZE, 0.3, BOARD_BASE_CORNER_RADIUS)),
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
          this.getSharedGeometry('board-top-pit', () => createSlabWithPitHole(BOARD_TOP_SIZE, 0.08, BOARD_TOP_CORNER_RADIUS)),
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

      // Every field disc (path, home, target lane, start) is one InstancedMesh
      // + one outline shell: 2 draw calls for the whole board. Home/start
      // discs are the path disc scaled per instance (top radius and height
      // match their old dedicated cylinders) and tinted via instance colors.
      const fieldGeometry = this.getSharedGeometry(
          'field-cylinder',
          () => new THREE.CylinderGeometry(0.27, 0.31, 0.08, 20),
      );
      const homeScale = { x: 0.37 / 0.27, y: 1, z: 0.37 / 0.27 };
      const startScale = { x: 0.31 / 0.27, y: 0.1 / 0.08, z: 0.31 / 0.27 };
      const pathOutline = { x: 1.06, y: 1.01, z: 1.06 };
      const playerOutline = { x: 1.062, y: 1.01, z: 1.062 };
      const startOutline = { x: 1.07, y: 1.012, z: 1.07 };

      const fields = this.store.fields.path.map((field) => ({
        x: field.x, y: FIELD_CENTER_Y, z: field.z, color: '#fffaf0', outlineScale: pathOutline,
      }));
      this.store.fields.home.forEach((home, playerIndex) => {
        home.fields.forEach((field) => fields.push({
          x: field.x, y: FIELD_CENTER_Y, z: field.z, color: home.color, scale: homeScale, outlineScale: playerOutline,
        }));
        this.store.fields.target[playerIndex].fields.forEach((field) => fields.push({
          x: field.x, y: FIELD_CENTER_Y, z: field.z, color: home.color, outlineScale: playerOutline,
        }));
        // Drawn over the plain path disc it sits on (both instances exist).
        const startField = this.store.fields.path[playerIndex * 10];
        fields.push({
          x: startField.x, y: START_FIELD_CENTER_Y, z: startField.z, color: home.color, scale: startScale, outlineScale: startOutline,
        });
      });

      const fieldTiles = this.createOutlinedInstancedSet(
          fieldGeometry,
          this.createToonMaterial('field-material', { color: '#ffffff' }),
          fields,
          { outlineScale: pathOutline, receiveShadow: true },
      );
      this.scene.add(fieldTiles);
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
    },

    createGroundEnvironment() {
      // Rounded corners concentric with the board base: the table extends
      // 0.8 past the base per side, so its radius is the base's + 0.8.
      const tableTop = this.createOutlinedMesh(
          this.getSharedGeometry(
              'table-top-rounded',
              () => createRoundedSlab(
                  TABLE_PHYSICS.topSize.width,
                  TABLE_PHYSICS.topSize.height,
                  BOARD_BASE_CORNER_RADIUS + 0.8,
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
      tableTop.position.set(
          TABLE_PHYSICS.center.x,
          TABLE_PHYSICS.topY - (TABLE_PHYSICS.topSize.height / 2),
          TABLE_PHYSICS.center.z,
      );
      this.scene.add(tableTop);

      // The support runs all the way down into the meadow — there is no
      // floor slab under the table anymore, the board sits on the grass.
      const tableSupport = this.createOutlinedMesh(
          this.getSharedGeometry('table-support-rounded', () => createRoundedSlab(11, 0.56, 0.55)),
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
      tableSupport.position.set(TABLE_PHYSICS.center.x, -1.39, TABLE_PHYSICS.center.z);
      this.scene.add(tableSupport);
    },

    createLights() {
      // Three lights total (colors/intensities come from applyEnvironment):
      // the hemisphere light also carries the flat ambient term, and there is
      // no point light — each light is per-fragment work on every surface.
      const skyLight = markRaw(new THREE.HemisphereLight());
      const sunLight = markRaw(new THREE.DirectionalLight());
      const fillLight = markRaw(new THREE.DirectionalLight());

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

      this.shadowLight = sunLight;
      this.skyLight = skyLight;
      this.sunLight = sunLight;
      this.fillLight = fillLight;

      this.scene.add(skyLight);
      this.scene.add(sunLight);
      this.scene.add(sunLight.target);
      this.scene.add(fillLight);

      this.applyEnvironment();
    },

    // Lines the pit cutout in two parts: the rim (lip overlapping the board
    // plus the beveled slope into the hole) and the neutral bowl (vertical
    // wall + floor). The rim has its own unshared material so it can wear
    // the active player's color as a turn indicator; both meshes live in a
    // single 'dice-pit' group so the whole pit stays one click target.
    createDicePit() {
      const surfaceY = BOARD_TOP_SURFACE_Y + 0.002;
      const bevelBottomY = 0.004;

      const group = markRaw(new THREE.Group());
      group.name = 'dice-pit';
      group.position.set(DICE_PIT.center.x, 0, DICE_PIT.center.z);

      const rimMaterial = markRaw(new THREE.MeshLambertMaterial({
        color: DICE_PIT_NEUTRAL_COLOR,
        side: THREE.DoubleSide,
      }));
      this.prepareFillMaterial(rimMaterial);
      this.dicePitRimMaterial = rimMaterial;

      const rim = markRaw(new THREE.Mesh(
          this.getSharedGeometry('dice-pit-rim', () => new THREE.LatheGeometry([
            new THREE.Vector2(DICE_PIT.holeRadius + 0.06, surfaceY),
            new THREE.Vector2(DICE_PIT.holeRadius, surfaceY),
            new THREE.Vector2(DICE_PIT.innerRadius, bevelBottomY),
          ], 64)),
          rimMaterial,
      ));
      rim.receiveShadow = true;
      group.add(rim);

      const bowl = markRaw(new THREE.Mesh(
          this.getSharedGeometry('dice-pit-bowl', () => new THREE.LatheGeometry([
            new THREE.Vector2(DICE_PIT.innerRadius, bevelBottomY),
            new THREE.Vector2(DICE_PIT.innerRadius, DICE_PIT.floorY),
            new THREE.Vector2(0.001, DICE_PIT.floorY),
          ], 64)),
          this.createToonMaterial('dice-pit-liner-material', {
            color: DICE_PIT_NEUTRAL_COLOR,
            side: THREE.DoubleSide,
          }),
      ));
      bowl.receiveShadow = true;
      group.add(bowl);

      this.dicePitMesh = group;
      this.scene.add(group);
    },

    // The pit rim doubles as a turn indicator: the active player's color
    // during a game, the neutral board tone everywhere else.
    applyPitRimColor() {
      if (!this.dicePitRimMaterial) {
        return;
      }
      const player = this.store.players[this.store.currentPlayerId];
      const useColor = this.store.currentScreen === 'game-screen' && player;
      this.dicePitRimMaterial.color.set(useColor ? player.color : DICE_PIT_NEUTRAL_COLOR);
      this.requestRender();
    },

    createPhysicsWorld() {
      this.physicsWorld = createDiceArenaWorld();
      this.physicsLastTime = performance.now();
    },

    createDice() {
      const diceMesh = this.createOutlinedMesh(
          this.getSharedGeometry('dice-box', () => buildDiceGeometry()),
          this.createDiceMaterial(),
          { outlineScale: 1.09, castShadow: true, receiveShadow: true },
      );

      diceMesh.name = 'dice';
      // Bigger, easier-to-read dice on phones (visual only — physics/pit
      // unchanged; syncDice sets position/quaternion but never scale).
      // The scaled mesh reaches further below its center than the physics
      // cube, so lift the visual by the extra half-size or it sinks into
      // the pit floor.
      if (this.isMobile) {
        diceMesh.scale.setScalar(1.5);
        this.diceVisualLiftY = DICE_VISUAL_FLOAT_Y + ((1.5 - 1) * DICE_SIZE) / 2;
      }
      this.diceMesh = markRaw(diceMesh);
      this.scene.add(diceMesh);

      const diceBody = createDicePhysicsBody();
      this.physicsWorld?.addBody(diceBody);
      this.dicePhysicsBody = diceBody;
      this.resetDiceBody();
      this.syncDice();
    },

    // A render pass is needed next frame — set by everything that changes
    // what's on screen outside the per-frame animation sources.
    requestRender() {
      this.renderNeeded = true;
    },

    // Sources that animate every frame while active. Everything else marks
    // itself dirty via requestRender/requestShadowUpdate, so idle frames
    // (e.g. waiting on a remote player's turn) skip the GPU entirely.
    needsContinuousRender() {
      if (this.cameraTransition) {
        return true; // camera flight into the game view
      }
      if (this.isMenuMode() && this.windowFocused) {
        return true; // cinematic orbit (frozen while unfocused)
      }
      if (this.pendingDiceRoll || this.diceSnapTween || this.diceOffsetTween) {
        return true;
      }
      if (this.dicePhysicsBody && this.dicePhysicsBody.sleepState !== CANNON.Body.SLEEPING) {
        return true;
      }
      if (this.finisher) {
        return true;
      }
      if (this.store.wardrobe.inGame && this.windowFocused) {
        return true; // the in-game Wardrobe's turning preview pawn
      }
      return false;
    },

    // Home-base rings: static cues, so they only dirty the frame when the
    // roster/seat state actually flips one of them.
    syncHomeBaseHelpers() {
      if (!this.homeBaseHelpers) {
        return;
      }
      if (!this.baseHelpersVisible()) {
        this.homeBaseHelpers.forEach((group) => {
          if (group.visible) {
            group.visible = false;
            this.requestRender();
          }
        });
        return;
      }

      const inGame = this.store.currentScreen === 'game-screen';
      const selfSeated = this.store.online.mySeat >= 0;
      this.homeBaseHelpers.forEach((group, baseIdx) => {
        const claimable = this.isSeatClaimable(baseIdx);
        // Mid-game the helpers only mark claimable bases; in the lobby
        // taken bases keep their small faint ring.
        const groupVisible = inGame ? claimable : true;
        if (group.visible !== groupVisible) {
          group.visible = groupVisible;
          this.requestRender();
        }
        if (!groupVisible) {
          return;
        }

        const color = HOME_BASE_RING_COLORS[baseIdx];
        this.homeBaseRippleRings[baseIdx]?.forEach((ring, ringIdx) => {
          let visible = true;
          let scale;
          let opacity;
          if (claimable) {
            // The cue is for choosers only — once the local player has
            // picked their color it disappears (the base stays clickable
            // for seat switching).
            visible = !selfSeated && ringIdx === 0;
            scale = 1.45;
            opacity = 0.95;
          } else {
            scale = ringIdx === 0 ? 0.95 : 0.7;
            opacity = 0.5;
          }
          if (ring.visible !== visible || ring.scale.x !== scale || ring.material.opacity !== opacity) {
            ring.visible = visible;
            ring.scale.set(scale, scale, 1);
            ring.material.color.copy(color);
            ring.material.opacity = opacity;
            this.requestRender();
          }
        });
      });
    },

    // Low target (24) on phones/tablets and on laptops running on battery
    // (Battery API: Chromium only — elsewhere a laptop counts as plugged
    // in), and after auto quality found the high cap unsustainable; high
    // target (48) otherwise. Both snap to a whole vsync divisor.
    updateRenderCap() {
      const low = this.isMobile || this.onBattery || this.renderCapDowngraded;
      this.renderFpsLow = this.refreshHz / this.refreshDivisor(RENDER_FPS_LOW);
      this.renderFps = this.refreshHz / this.refreshDivisor(low ? RENDER_FPS_LOW : RENDER_FPS_HIGH);
      // Gate half a vsync early: rAF timestamps jitter, and a strict >=
      // would sometimes slip a whole extra vsync.
      this.renderFrameIntervalMs = 1000 / this.renderFps - 500 / this.refreshHz;
      // Fresh fps samples for the new cadence.
      this.autoQuality.deltas.length = 0;
      this.autoQuality.lastSampleAt = 0;
    },

    // Render every Nth vsync; N rounds refresh/target half-down, so 24 on
    // 60Hz becomes 30 (every 2nd) rather than 20, and on 120Hz stays 24.
    refreshDivisor(targetFps) {
      return Math.max(1, Math.ceil(this.refreshHz / targetFps - 0.5));
    },

    // Rolling refresh-rate estimate (monitors differ, windows move between
    // them, iOS Low Power Mode drops rAF to 30). Only intervals that follow
    // a frame without a render pass count, so a slow GPU frame can't pass
    // for a slow display. Re-derives the cap only when the rate changes.
    sampleRefreshRate(stamp) {
      const delta = stamp - this.lastFrameStamp;
      const idle = !this.lastFrameRendered;
      this.lastFrameStamp = stamp;
      if (!idle || !(delta > 2 && delta < 100)) {
        return;
      }
      const i = this.refreshDeltaCount % REFRESH_SAMPLE_COUNT;
      this.refreshDeltas[i] = delta;
      this.refreshDeltaCount += 1;
      if (this.refreshDeltaCount < REFRESH_SAMPLE_COUNT || i !== REFRESH_SAMPLE_COUNT - 1) {
        return;
      }
      this.refreshSorted.set(this.refreshDeltas);
      this.refreshSorted.sort();
      const hz = Math.round(1000 / this.refreshSorted[REFRESH_SAMPLE_COUNT >> 1]);
      // Ignore a few Hz of measurement noise around the current estimate.
      if (Math.abs(hz - this.refreshHz) > 3) {
        this.refreshHz = hz;
        this.updateRenderCap();
      }
    },

    watchBatteryForRenderCap() {
      navigator.getBattery?.().then((battery) => {
        if (this.battery === undefined) {
          return; // unmounted meanwhile
        }
        this.battery = battery;
        this.batteryHandler = () => {
          this.onBattery = !battery.charging;
          this.updateRenderCap();
        };
        battery.addEventListener('chargingchange', this.batteryHandler);
        this.batteryHandler();
      }).catch(() => {});
    },

    renderScene() {
      const animate = (stamp) => {
        this.animationFrameId = requestAnimationFrame(animate);
        const frameNow = performance.now();
        if (stamp !== undefined) {
          this.sampleRefreshRate(stamp);
        }

        this.updateCameraPath(frameNow);
        this.updateFinisher(frameNow);
        if (this.wardrobeOpen()) {
          this.updateWardrobeStage(frameNow);
        }
        this.syncHomeBaseHelpers();
        this.updateClickableRipples();

        // A zooming Finisher owns the camera; controls.update() would snap it back.
        if (this.controls && !this.isMenuMode() && !this.cameraTransition && !this.finisher?.camera) {
          if (this.controls.update() === true) {
            this.requestRender();
          }
        }

        // Simulation always runs (it's cheap and sets renderNeeded via
        // requestShadowUpdate when meshes actually move); only the GPU work
        // below is skipped on unchanged or capped frames.
        this.stepPhysicsWorld();
        this.syncDice();
        this.syncPawns();
        this.enforceTurnTimer();
        if (this.hoverNeedsUpdate) {
          this.refreshHoveredTarget();
        }
        if (this.needsContinuousRender()) {
          this.requestRender();
        }

        // Every render is capped to every Nth vsync (see updateRenderCap). The
        // dirty flag survives skipped
        // frames, so the final state of an animation (camera damping, the
        // last pawn hop) still gets drawn on the next allowed frame.
        const sinceLastRender = frameNow - this.lastRenderAt;
        let rendered = false;
        const interval = this.renderFrameIntervalMs;
        if (this.renderNeeded && sinceLastRender >= interval) {
          this.renderNeeded = false;
          this.renderer.render(this.scene, this.camera);
          if (this.wardrobeOpen()) {
            this.renderWardrobeStage();
          }
          this.sampleRenderPerformance(frameNow);
          // The interval is a whole number of vsyncs (minus half a vsync of
          // slack), so stamping the actual render time keeps an even cadence.
          this.lastRenderAt = frameNow;
          rendered = true;
        } else if (!this.renderNeeded) {
          // Only consecutive rendered frames are meaningful fps samples.
          this.autoQuality.lastSampleAt = 0;
        }
        this.renderHighlights2D(rendered);
        this.lastFrameRendered = rendered;
      };

      animate();
    },

    // Auto quality: while frames render back-to-back (dice rolling, pawn
    // hops, menu orbit), collect frame deltas; when a full window's median
    // says the device can't hold the current cap (< 2/3 of it), first drop a
    // high cap to the low one, then step the quality preset down. Never steps up (no
    // oscillation) and stops after two quality drops.
    sampleRenderPerformance(now) {
      const aq = this.autoQuality;
      if (aq.dropsLeft <= 0) {
        return;
      }
      if (aq.lastSampleAt) {
        const delta = now - aq.lastSampleAt;
        if (delta > 0 && delta < 250) {
          aq.deltas.push(delta);
        }
      }
      aq.lastSampleAt = now;

      if (aq.deltas.length >= 48) {
        const sorted = aq.deltas.slice().sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        aq.deltas.length = 0;
        if (median <= (1000 / this.renderFps) * 1.5) {
          return;
        }
        // Can't hold the cap: give up the high frame rate first, and only
        // then start lowering quality.
        if (this.renderFps > this.renderFpsLow) {
          this.renderCapDowngraded = true;
          this.updateRenderCap();
        } else if (this.store.settings.quality > RENDER_QUALITY_MIN) {
          this.store.settings.quality -= 1; // watcher applies the preset
          aq.dropsLeft -= 1;
        }
      }
    },

    syncDice() {
      if (!this.diceMesh || !this.dicePhysicsBody) {
        return;
      }

      const mesh = this.diceMesh;
      const body = this.dicePhysicsBody;
      const targetY = body.position.y + this.diceVisualLiftY;

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

      // Blend a pending rig offset in while the dice still tumbles.
      if (this.diceOffsetTween) {
        const tween = this.diceOffsetTween;
        const progress = Math.min((performance.now() - tween.start) / tween.duration, 1);
        this.diceVisualOffset.slerpQuaternions(tween.from, tween.to, progress);
        if (progress >= 1) {
          this.diceOffsetTween = null;
        }
      }

      // Displayed orientation = physics orientation ∘ rig offset.
      _diceDisplayQuaternion.set(
          body.quaternion.x,
          body.quaternion.y,
          body.quaternion.z,
          body.quaternion.w,
      ).multiply(this.diceVisualOffset);

      if (!mesh.quaternion.equals(_diceDisplayQuaternion)) {
        mesh.quaternion.copy(_diceDisplayQuaternion);
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

          // A captured pawn mid-Finisher is posed by updateFinisher; its
          // logical position is already home and must not start a hop tween.
          const finisher = this.finisher;
          if (finisher && finisher.victimIds.has(pawn.id)) {
            return;
          }

          let animatedPosition = this.getAnimatedPawnPosition(pawn, now);
          if (finisher && finisher.attackerId === pawn.id) {
            // Scratch copy: animatedPosition is the motion state's own object.
            _attackerPoseScratch.x = animatedPosition.x + finisher.attackerOffset.x;
            _attackerPoseScratch.y = animatedPosition.y + finisher.attackerHop;
            _attackerPoseScratch.z = animatedPosition.z + finisher.attackerOffset.z;
            animatedPosition = _attackerPoseScratch;
          }
          const targetScale = pawn.isActive ? 1.1 : 1;
          // Squash & stretch from the hop (and the attacker's Finisher
          // crouch/spring), roughly volume-preserving.
          let stretch = this.pawnMotionStates[pawn.id]?.stretch ?? 1;
          if (finisher && finisher.attackerId === pawn.id) {
            stretch *= finisher.attackerStretch;
          }
          const heightScale = targetScale * stretch;
          const widthScale = targetScale / Math.sqrt(stretch);

          if (
            pawnMesh.position.x !== animatedPosition.x ||
            pawnMesh.position.y !== animatedPosition.y ||
            pawnMesh.position.z !== animatedPosition.z ||
            pawnMesh.scale.y !== heightScale
          ) {
            this.requestShadowUpdate();
          }

          pawnMesh.position.set(
              animatedPosition.x,
              animatedPosition.y,
              animatedPosition.z,
          );

          pawnMesh.scale.set(widthScale, heightScale, widthScale);
          // On the board a pawn faces where it's going (its face, local +Z,
          // toward the next field); at home it faces the viewer.
          const yaw = this.pawnBoardYaw(pawn, animatedPosition);
          if (pawnMesh.rotation.y !== yaw) {
            pawnMesh.rotation.y = yaw;
            this.requestRender();
          }
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
        // Fresh pawn materials default to full opacity — re-apply the
        // connected/disconnected dimming (matters for drop-in joiners whose
        // meshes are created after the seat snapshot arrived).
        this.applySeatPresence();
      }
    },

    // Board pawns: mid-hop, the direction of travel; at rest, toward the
    // next field (the last lane field keeps the lane's direction). Home
    // pawns face the camera.
    pawnBoardYaw(pawn, animatedPosition) {
      if (!pawn.position) {
        return this.pawnFacingYaw(animatedPosition);
      }
      const motion = this.pawnMotionStates[pawn.id];
      if (motion?.isAnimating) {
        const dx = motion.to.x - motion.from.x;
        const dz = motion.to.z - motion.from.z;
        if (Math.abs(dx) + Math.abs(dz) > 0.01) {
          return Math.atan2(dx, dz);
        }
      }
      const last = pawn.position >= TARGET_LANE_END;
      const from = pawn.getCoordinatesAt(last ? pawn.position - 1 : pawn.position, 0, _facingFromScratch);
      const to = pawn.getCoordinatesAt(last ? pawn.position : pawn.position + 1, 0, _facingToScratch);
      return Math.atan2(to.x - from.x, to.z - from.z);
    },

    // Yaw that turns a pawn's face (local +Z) toward the camera.
    pawnFacingYaw(position) {
      if (!this.camera) {
        return 0;
      }
      return Math.atan2(this.camera.position.x - position.x, this.camera.position.z - position.z);
    },

    // Another pawn (any color) standing on this field, by logical position.
    isFieldOccupiedByOther(pawn, x, z) {
      for (const player of this.store.players) {
        for (const other of player.pawns) {
          if (other === pawn) continue;
          const at = other.getCoordinates(0, _occupantScratch);
          if (Math.abs(at.x - x) < 0.01 && Math.abs(at.z - z) < 0.01) {
            return true;
          }
        }
      }
      return false;
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
      // Clickable pawns keep their resting height — the pulsing ground ring
      // is the "movable" cue, no lift needed. The scratch target avoids one
      // object allocation per pawn per frame.
      const coordinates = pawn.getCoordinates(PAWN_CENTER_Y, _pawnCoordsScratch);
      const targetX = coordinates.x;
      const targetY = coordinates.y;
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
          stretch: 1,
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
        motion.landOffset = this.captureLandingOffset(pawn);
        // Passing over another pawn: perch on it rather than clip through.
        motion.perchY = pawn.passingStep && this.isFieldOccupiedByOther(pawn, targetX, targetZ)
          ? PAWN_PERCH_HEIGHT
          : 0;
        motion.to.x = targetX + (motion.landOffset?.x ?? 0);
        motion.to.y = targetY + motion.perchY;
        motion.to.z = targetZ + (motion.landOffset?.z ?? 0);
        motion.position = pawn.position;
        motion.globalPosition = pawn.globalPosition;
        motion.inDestination = pawn.isInDestinationField;
        motion.startTime = now;
        motion.jumpHeight = motion.perchY ? PAWN_PERCH_JUMP : this.getPawnJumpHeight(pawn);
        motion.isAnimating = true;
      }

      if (!motion.isAnimating) {
        motion.current.x = targetX + (motion.landOffset?.x ?? 0);
        motion.current.y = targetY + (motion.perchY ?? 0);
        motion.current.z = targetZ + (motion.landOffset?.z ?? 0);
        motion.stretch = 1;
        return motion.current;
      }

      const progress = Math.min((now - motion.startTime) / motion.duration, 1);
      if (progress >= 1) {
        motion.current.x = motion.to.x;
        motion.current.y = motion.to.y;
        motion.current.z = motion.to.z;
        motion.isAnimating = false;
        motion.stretch = 1;
        return motion.current;
      }

      // A hop, not a slide: horizontal travel eases in and out of each step
      // while the arc keeps its sinusoidal flight, and the pawn squashes a
      // touch at take-off/landing and stretches at the top of the arc.
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - (Math.pow((-2 * progress) + 2, 2) / 2);
      const arc = Math.sin(Math.PI * progress);

      motion.current.x = motion.from.x + ((motion.to.x - motion.from.x) * eased);
      motion.current.y = motion.from.y + ((motion.to.y - motion.from.y) * eased)
          + (arc * motion.jumpHeight);
      motion.current.z = motion.from.z + ((motion.to.z - motion.from.z) * eased);
      motion.stretch = 0.94 + (0.18 * arc);
      return motion.current;
    },

    // A hop that's about to Capture lands beside the victim (STAGE_GAP back
    // from its square, on the side away from its home: where the Finisher's
    // attacker stands); the Finisher hops it onto the square once the victim
    // is sent home. Null when there's no Capture, Finishers are off, or the
    // mover is a Guest (no Finisher, CONTEXT.md).
    captureLandingOffset(pawn) {
      if (!pawn.landingOnCapture || !this.store.settings.finishersEnabled) {
        return null;
      }
      if ((this.store.online.moveFinisher || this.finisherForSeat(pawn.playerIndex)) === NO_FINISHER) {
        return null;
      }
      for (const player of this.store.players) {
        const victim = player.pawns.find((other) => (
          other.playerIndex !== pawn.playerIndex
          && other.position !== 0
          && !other.isInDestinationField
          && other.globalPosition === pawn.globalPosition
        ));
        if (victim) {
          const square = victim.getCoordinates();
          const home = this.store.fields.home[victim.playerIndex].fields[victim.startingPlace - 1];
          const dirX = home.x - square.x;
          const dirZ = home.z - square.z;
          const length = Math.hypot(dirX, dirZ) || 1;
          return { x: (-dirX / length) * STAGE_GAP, z: (-dirZ / length) * STAGE_GAP };
        }
      }
      return null;
    },

    ensurePawnMesh(pawn) {
      if (this.pawnMeshes[pawn.id]) {
        return;
      }

      const group = this.buildPawnGroup(pawn.playerIndex, pawn.color);
      group.name = `cube-${pawn.id}`;
      const look = this.lookForPawn(pawn.playerIndex, pawn.startingPlace - 1);
      this.applyPropToPawnGroup(group, pawn.playerIndex, look.prop, look.flag);

      this.pawnMeshes[pawn.id] = group;
      this.scene.add(group);
      // Batched in syncPawns: one applyOutlineAppearance traverse per frame
      // instead of one per created pawn mesh.
      this.pawnOutlineSyncPending = true;
    },

    // Tilts a pawn group's Prop by `angle` about a world-space axis through
    // the head (Finisher overlapping action); 0 puts it back at rest.
    tiltProp(group, worldAxis, angle) {
      const pivot = group?.userData.propMesh;
      if (!pivot) {
        return;
      }
      if (!angle) {
        pivot.quaternion.identity();
        return;
      }
      _propAxis.copy(worldAxis).applyQuaternion(_propInverse.copy(group.quaternion).invert());
      pivot.quaternion.setFromAxisAngle(_propAxis, angle);
    },

    // Body + head for a seat's color, baked into ONE geometry (plus one
    // pre-built outline shell) so a pawn is 2 draw calls and 1 shadow caster
    // instead of 4 and 2. The material is shared per seat (the presence
    // dimming relies on it); also used for Finisher preview pawns.
    buildPawnGroup(seat, color) {
      const group = markRaw(new THREE.Group());
      const bodyMaterial = this.createToonMaterial(`pawn-body-material-${seat}`, { color });

      const pawn = this.createOutlinedMesh(
          this.getSharedGeometry('pawn-shape', () => buildPawnGeometry(1, 1)),
          bodyMaterial,
          { castShadow: true, receiveShadow: true },
      );

      // Each part's shell is scaled about its own center (body 1.055, head
      // 1.075) — one uniform scale of the merged shape would shift the head
      // shell — so the shell geometry is baked and the mesh stays at scale 1
      // (baseOutlineScale 1 = the presets' ±2% line scale doesn't apply).
      const outline = markRaw(new THREE.Mesh(
          this.getSharedGeometry('pawn-shape-outline', () => buildPawnGeometry(1.055, 1.075)),
          this.getOutlineShellMaterial(),
      ));
      outline.userData.isOutlineShell = true;
      outline.userData.baseOutlineScale = 1;
      outline.renderOrder = 1;
      pawn.renderOrder = 2;
      pawn.add(outline);

      group.add(pawn);
      group.userData.bodyMaterial = bodyMaterial;
      return group;
    },

    // ── Cosmetics ──────────────────────────────────────────────────────
    // A seat's Cosmetics: our own seat reads the local pick (instant
    // feedback) when we're a Member, everyone else — and a Guest's own seat,
    // which wears nothing — the match's cosmetics map.
    cosmeticsForSeat(seat) {
      const online = this.store.online;
      const seatInfo = (online.seats || [])[seat];
      if (!seatInfo) {
        return null;
      }
      if (seatInfo.bot) {
        return guestCosmetics(); // a Bot wears nothing (CONTEXT.md: Bot)
      }
      if (seatInfo.userId === online.selfUserId && online.account.member) {
        return wearableCosmetics(this.store.settings.cosmetics, online.store.owned);
      }
      return online.cosmetics[seatInfo.userId] || null;
    },

    // One pawn's { prop, flag } (index 0-3 = startingPlace - 1).
    lookForPawn(seat, index) {
      return pawnLook(this.cosmeticsForSeat(seat), index);
    },

    finisherForSeat(seat) {
      return this.cosmeticsForSeat(seat)?.finisher || DEFAULT_FINISHER;
    },



    cosmeticsKit() {
      return {
        getSharedGeometry: this.getSharedGeometry,
        getSharedTexture: this.getSharedTexture,
        createToonMaterial: this.createToonMaterial,
        createOutlinedMesh: this.createOutlinedMesh,
        createBakedOutline: this.createBakedOutline,
        getSharedMaterial: this.getSharedMaterial,
        requestRender: this.requestRender,
      };
    },

    // An outline shell from its own pre-built geometry (for shapes a uniform
    // scale can't outline, e.g. the rippled flag cloth). Scale stays 1.
    createBakedOutline(geometry) {
      const outline = markRaw(new THREE.Mesh(geometry, this.getOutlineShellMaterial()));
      outline.userData.isOutlineShell = true;
      outline.userData.baseOutlineScale = 1;
      outline.renderOrder = 1;
      return outline;
    },

    applyPropToPawnGroup(group, seat, propId, flagCode = DEFAULT_FLAG) {
      const propKey = propId === 'flag' ? `flag:${flagCode}` : propId;
      if (group.userData.propKey === propKey) {
        return;
      }
      if (group.userData.propMesh) {
        group.remove(group.userData.propMesh);
      }
      const propMesh = buildPropMesh(propId, this.cosmeticsKit(), seat, flagCode);
      let propPivot = null;
      if (propMesh) {
        propPivot = markRaw(new THREE.Group());
        propPivot.position.y = PROP_PIVOT_Y;
        propMesh.position.y -= PROP_PIVOT_Y;
        propPivot.add(propMesh);
        group.add(propPivot);
      }
      group.userData.propMesh = propPivot;
      group.userData.propKey = propKey;
      // New outline shells need the current outline preset; fresh prop
      // materials need the seat's presence dimming (both run in syncPawns).
      this.pawnOutlineSyncPending = true;
      this.requestShadowUpdate();
    },

    applyPawnProps() {
      this.store.players.forEach((player) => {
        const seat = player.turn - 1;
        const cosmetics = this.cosmeticsForSeat(seat);
        player.pawns.forEach((pawn) => {
          const group = this.pawnMeshes[pawn.id];
          if (group) {
            const look = pawnLook(cosmetics, pawn.startingPlace - 1);
            this.applyPropToPawnGroup(group, seat, look.prop, look.flag);
          }
        });
      });
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

    // positions: [{ x, y, z, scale?: {x,y,z}, color?, outlineScale? }] —
    // optional per-instance scale, instance color (over a white material)
    // and outline scale (else options.outlineScale).
    createOutlinedInstancedSet(geometry, material, positions, options = {}) {
      const fillMesh = markRaw(new THREE.InstancedMesh(geometry, material, positions.length));
      fillMesh.castShadow = Boolean(options.castShadow);
      fillMesh.receiveShadow = Boolean(options.receiveShadow);
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      const translation = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const color = new THREE.Color();

      positions.forEach((position, index) => {
        const s = position.scale;
        matrix.compose(
            translation.set(position.x, position.y, position.z),
            quaternion,
            scale.set(s?.x ?? 1, s?.y ?? 1, s?.z ?? 1),
        );
        fillMesh.setMatrixAt(index, matrix);
        if (position.color) {
          fillMesh.setColorAt(index, color.set(position.color));
        }
      });

      fillMesh.instanceMatrix.needsUpdate = true;
      if (fillMesh.instanceColor) {
        fillMesh.instanceColor.needsUpdate = true;
      }

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
          scale: position.scale,
          outlineScale: position.outlineScale,
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

    // ── Finishers ──────────────────────────────────────────────────────
    // A Capture is logically instant (the victims are already home); the
    // Finisher only delays the victims' meshes. While it runs,
    // store.online.finisherInFlight holds MatchController's event queue, and
    // finisher.done releases it.
    handleCaptured(data) {
      const attacker = this.findPawnById(data.attackerId);
      if (!attacker || !data.victims?.length) {
        return;
      }
      const seat = attacker.playerIndex;
      const finisherId = this.store.online.moveFinisher || this.finisherForSeat(seat);
      this.store.online.moveFinisher = null;

      const victims = [];
      data.victims.forEach((victim) => {
        const pawn = this.findPawnById(victim.pawnId);
        if (!pawn) {
          return;
        }
        victims.push({
          pawnId: pawn.id,
          mesh: this.pawnMeshes[pawn.id] || null,
          from: { x: victim.x, y: PAWN_CENTER_Y, z: victim.z },
          home: pawn.getCoordinates(PAWN_CENTER_Y),
        });
      });
      if (!victims.length) {
        return;
      }

      this.startFinisher({
        finisherId,
        attackerId: attacker.id,
        attackerPos: attacker.getCoordinates(PAWN_CENTER_Y),
        victims,
        lite: !this.store.settings.finishersEnabled || finisherId === NO_FINISHER,
      });
    },

    findPawnById(pawnId) {
      for (const player of this.store.players) {
        for (const pawn of player.pawns) {
          if (pawn.id === pawnId) {
            return pawn;
          }
        }
      }
      return null;
    },

    // Wardrobe "▶": the preview pawn (wearing the draft Cosmetics) acts the
    // Finisher out on a throwaway victim in the wardrobe stage — always the
    // full version, since that's what's being chosen.
    startWardrobeFinisher(finisherId) {
      const stage = this.ensureWardrobeStage();
      // In-game, a real capture's Finisher has the slot — never cut it short.
      if (!stage || !this.wardrobeOpen() || (this.finisher && !this.finisher.wardrobe)) {
        this.store.wardrobe.play = null;
        return;
      }
      if (this.finisher) {
        this.endFinisher();
      }
      const victimMesh = this.buildPawnGroup('wardrobe-1', PLAYER_COLORS[1]);
      stage.scene.add(victimMesh);
      // The preview pawn stands at the pedestal's center, beside the victim's
      // "square"; the victim drops in onto it.
      const homeLength = Math.hypot(WARDROBE_VICTIM_HOME.x, WARDROBE_VICTIM_HOME.z);
      const gapX = (WARDROBE_VICTIM_HOME.x / homeLength) * STAGE_GAP;
      const gapZ = (WARDROBE_VICTIM_HOME.z / homeLength) * STAGE_GAP;
      const attackerPos = { x: gapX, y: 0, z: gapZ };
      this.startFinisher({
        finisherId,
        attackerMesh: stage.pawn,
        attackerPos,
        approachFrom: { x: -gapX, z: -gapZ },
        victims: [{
          pawnId: null,
          mesh: victimMesh,
          from: { ...attackerPos, y: 1.6 },
          home: { ...WARDROBE_VICTIM_HOME },
        }],
        lite: false,
        wardrobe: true,
        tempMeshes: [victimMesh],
      });
    },

    startFinisher({ finisherId, attackerId = null, attackerMesh = null, attackerPos, approachFrom = null, victims, lite, wardrobe = false, tempMeshes = [] }) {
      if (this.finisher) {
        this.endFinisher();
      }
      const scene = wardrobe ? this.wardrobeStage.scene : this.scene;

      // Hit direction: from the capture square toward the (first) victim's
      // home, so the blow visibly sends it where it lands.
      const first = victims[0];
      let dirX = first.home.x - first.from.x;
      let dirZ = first.home.z - first.from.z;
      const length = Math.hypot(dirX, dirZ) || 1;
      dirX /= length;
      dirZ /= length;
      const perpX = -dirZ;
      const perpZ = dirX;

      // Victims stay on their square (spread sideways when several; further
      // apart over trapdoors so the hatches don't overlap).
      const spacing = finisherId === 'trapdoor' && !lite ? 0.76 : 0.42;
      victims.forEach((victim, index) => {
        const spread = (index - ((victims.length - 1) / 2)) * spacing;
        victim.stand = {
          x: victim.from.x + (perpX * spread),
          y: attackerPos.y,
          z: victim.from.z + (perpZ * spread),
        };
        victim.spinAxis = markRaw(new THREE.Vector3(perpX, 0, perpZ));
      });
      const kit = this.cosmeticsKit();

      const f = {
        id: finisherId,
        lite,
        wardrobe,
        scene,
        start: performance.now(),
        timing: lite ? LITE_FINISHER_TIMING : finisherTiming(finisherId),
        attackerId,
        attackerMesh,
        attackerPos,
        attackerOffset: { x: 0, z: 0 },
        // The attacker stands STAGE_GAP back from the square (where its move
        // landed: captureLandingOffset) and hops onto it once the victim is
        // sent home.
        approach: lite ? null : {
          from: approachFrom ?? this.pawnMotionStates[attackerId]?.landOffset ?? { x: 0, z: 0 },
          to: { x: -dirX * STAGE_GAP, z: -dirZ * STAGE_GAP },
        },
        attackerStretch: 1,
        attackerHop: 0,
        // Camera shake offset for this frame (world units).
        shake: { x: 0, y: 0, z: 0 },
        victims,
        victimIds: new Set(victims.map((victim) => victim.pawnId).filter(Boolean)),
        dir: { x: dirX, z: dirZ },
        sideAxis: markRaw(new THREE.Vector3(perpX, 0, perpZ)),
        tempMeshes,
        // One { stage, tool } per victim.
        stages: [],
        camera: null,
        windupPlayed: false,
        impactDone: false,
        fallbackTimer: null,
      };

      if (!lite) {
        // Tools live in a stage frame, one per victim: origin at its standing
        // spot and base height (the wardrobe stage stands at y 0), local +Z
        // along the hit direction.
        f.stages = victims.map((victim) => {
          const stage = markRaw(new THREE.Group());
          stage.position.set(victim.stand.x, victim.stand.y, victim.stand.z);
          stage.rotation.y = Math.atan2(dirX, dirZ);
          const tool = buildFinisherTool(finisherId, kit);
          if (tool) {
            tool.scale.setScalar(0.001);
            stage.add(tool);
          }
          scene.add(stage);
          return { stage, tool };
        });
        this.pawnOutlineSyncPending = true;
        // The wardrobe stage frames the action itself (updateWardrobeStage),
        // from the stage's -X side.
        f.camera = wardrobe ? null : this.planFinisherCamera(f);
        // Tools are laid out for a camera on the stage's -X side; mirror them
        // over when the close-up looks from +X.
        if (f.camera?.side === -1) {
          f.stages.forEach(({ stage }) => {
            stage.scale.x = -1;
          });
        }
        if (finisherId === 'trapdoor') {
          // One lever opens every hatch. Victims draw after the pit, so they
          // show inside the hole.
          f.stages.slice(1).forEach(({ tool }) => {
            tool.userData.lever.visible = false;
          });
          victims.forEach((victim) => this.setFinisherRenderOrder(this.finisherVictimMesh(victim), TRAPDOOR_ORDER));
        }
      }

      // Tools that travel to the victim's home (bats, the UFO) get it in
      // their stage frame (mirroring included).
      f.stages.forEach(({ stage, tool }, index) => {
        if (tool?.userData.home) {
          stage.updateMatrixWorld(true);
          const { home } = victims[index];
          stage.worldToLocal(tool.userData.home.set(home.x, home.y, home.z));
        }
      });

      // A dust ring waits at each victim's home for the touchdown; a victim
      // that gets transformed also turns back in a poof there, and a
      // magician's victim carries its rabbit form (hidden until the spell).
      victims.forEach((victim) => {
        victim.dust = buildDustPuff(kit);
        victim.dust.position.set(victim.home.x, victim.home.y, victim.home.z);
        victim.dust.visible = false;
        scene.add(victim.dust);
        if (!lite && (finisherId === 'magician' || finisherId === 'vampire')) {
          victim.poof = buildPoof(kit, finisherId);
          victim.poof.position.set(victim.home.x, victim.home.y + 0.4, victim.home.z);
          victim.poof.visible = false;
          scene.add(victim.poof);
        }
        const mesh = this.finisherVictimMesh(victim);
        if (!lite && finisherId === 'magician' && mesh) {
          victim.ownParts = mesh.children.filter((child) => child.visible);
          victim.rabbit = buildRabbit(kit);
          victim.rabbit.visible = false;
          mesh.add(victim.rabbit);
        }
      });

      // Safety net: a hidden tab stops rAF, and the queue must never stall.
      f.fallbackTimer = window.setTimeout(() => {
        if (this.finisher === f) {
          this.endFinisher();
        }
      }, f.timing.total + 1500);

      // From here the Finisher places the attacker (f.attackerOffset).
      if (attackerId && this.pawnMotionStates[attackerId]) {
        this.pawnMotionStates[attackerId].landOffset = null;
      }
      this.finisher = markRaw(f);
      if (!wardrobe) {
        this.store.online.finisherInFlight = true;
      }
      this.requestShadowUpdate();
    },

    // Side-on close-up of attacker + victim, on the side the viewer is
    // already looking from.
    planFinisherCamera(f) {
      if (!this.camera) {
        return null;
      }
      const target = this.controls && !this.isMenuMode() ? this.controls.target : CAMERA_GAME_TARGET;
      const stand = f.victims[0].stand;
      const attackerX = f.attackerPos.x + (f.approach?.to.x ?? 0);
      const attackerZ = f.attackerPos.z + (f.approach?.to.z ?? 0);
      const focus = markRaw(new THREE.Vector3(
          (attackerX + stand.x) / 2,
          PAWN_CENTER_Y + 0.45,
          (attackerZ + stand.z) / 2,
      ));
      let viewX = this.camera.position.x - target.x;
      let viewZ = this.camera.position.z - target.z;
      const viewLength = Math.hypot(viewX, viewZ) || 1;
      viewX /= viewLength;
      viewZ /= viewLength;
      const perpX = -f.dir.z;
      const perpZ = f.dir.x;
      const side = (perpX * viewX) + (perpZ * viewZ) >= 0 ? 1 : -1;
      const camDir = new THREE.Vector3((perpX * side) + (viewX * 0.6), 0, (perpZ * side) + (viewZ * 0.6)).normalize();
      // Side-on, attacker and victim spread across the screen: back off far
      // enough that both (plus room for the tool and the victim's launch)
      // fit the frame's width — a portrait phone needs a much longer lens
      // than the landscape close-up.
      const separation = Math.hypot(attackerX - stand.x, attackerZ - stand.z);
      const halfWidth = (separation / 2) + 1.05;
      const halfHorizontalFov = Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * this.camera.aspect);
      const distance = Math.min(7.5, Math.max(3.3, halfWidth / Math.tan(halfHorizontalFov)));
      const controlsEnabled = this.controls ? this.controls.enabled : false;
      if (this.controls) {
        this.controls.enabled = false;
      }
      return {
        focus,
        zoomPos: markRaw(focus.clone().addScaledVector(camDir, distance).setY(focus.y + (distance * (2.1 / 3.3)))),
        fromPos: markRaw(this.camera.position.clone()),
        fromTarget: markRaw(target.clone()),
        controlsEnabled,
        // Which side of the hit line (±perpendicular) the close-up is on.
        side,
      };
    },

    // The close-up: swings in on an arc around the action (not a straight
    // dolly through the scene), turning to look a beat before it moves; drifts
    // slowly round during the hold; partly follows the victim's flight home;
    // then eases back. Allocation-free (scratch vectors) — runs every frame.
    poseFinisherCamera(f, t, T) {
      // In menus the orbit keeps running underneath (updateCameraPath ran
      // this frame), so zoom from / return to the live orbit position.
      const menu = this.isMenuMode();
      const basePos = menu ? _finisherBasePos.copy(this.camera.position) : f.camera.fromPos;
      const baseTarget = menu ? CAMERA_GAME_TARGET : f.camera.fromTarget;
      const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const back = ease(Math.min(1, Math.max(0, (t - T.cameraBack[0]) / (T.cameraBack[1] - T.cameraBack[0]))));
      const amount = ease(Math.min(1, t / T.zoomIn)) * (1 - back);
      const look = ease(Math.min(1, t / (T.zoomIn * 0.7))) * (1 - back);

      // Follow the (first) victim's flight with a third of the frame.
      _finisherFocus.copy(f.camera.focus);
      const victimMesh = this.finisherVictimMesh(f.victims[0]);
      if (victimMesh && victimMesh.visible) {
        const launch = T.impact + T.hitStop + (FINISHER_LAUNCH_DELAY[f.id] || 0);
        const follow = ease(Math.min(1, Math.max(0, (t - launch) / (T.flight * 0.7)))) * 0.33;
        _finisherFocus.x += (victimMesh.position.x - _finisherFocus.x) * follow;
        _finisherFocus.z += (victimMesh.position.z - _finisherFocus.z) * follow;
      }

      // Position on an arc: interpolate radius, elevation and azimuth around
      // the focus (shortest way round), plus a slow drift while held.
      _finisherSphericalFrom.setFromVector3(_finisherCamPos.subVectors(basePos, _finisherFocus));
      _finisherSpherical.setFromVector3(_finisherCamPos.subVectors(f.camera.zoomPos, _finisherFocus));
      let dTheta = _finisherSpherical.theta - _finisherSphericalFrom.theta;
      dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
      const drift = f.camera.side * 0.14 * Math.min(1, t / T.total);
      _finisherSpherical.radius = _finisherSphericalFrom.radius + ((_finisherSpherical.radius - _finisherSphericalFrom.radius) * amount);
      _finisherSpherical.phi = _finisherSphericalFrom.phi + ((_finisherSpherical.phi - _finisherSphericalFrom.phi) * amount);
      _finisherSpherical.theta = _finisherSphericalFrom.theta + ((dTheta + drift) * amount);
      _finisherCamPos.setFromSpherical(_finisherSpherical).add(_finisherFocus).add(f.shake);
      _finisherCamLook.lerpVectors(baseTarget, _finisherFocus, look);
      this.camera.position.copy(_finisherCamPos);
      this.camera.lookAt(_finisherCamLook);
    },

    updateFinisher(now) {
      const f = this.finisher;
      if (!f) {
        return;
      }
      const t = now - f.start;
      const T = f.timing;
      // Wall time drives the camera; the action freezes for the hit-stop.
      const at = actionTime(t, T);

      const shake = cameraShake(t, T);
      f.shake.x = shake * Math.sin(t * 0.071);
      f.shake.y = shake * 0.6 * Math.sin(t * 0.093 + 1.3);
      f.shake.z = shake * Math.sin(t * 0.057 + 2.1);

      if (f.camera) {
        this.poseFinisherCamera(f, t, T);
      }

      if (!f.lite) {
        f.stages.forEach(({ tool }) => poseFinisherTool(f.id, tool, at, T));
        // Into place beside the square (a hop, unless the move already landed
        // there), lunging into the blow, then hopping onto the square.
        const { from, to } = f.approach;
        const settle = Math.min(1, t / T.scoot);
        const stay = 1 - attackerTakeover(f.id, at, T);
        const lunge = attackerLunge(f.id, at, T);
        f.attackerOffset.x = ((from.x + ((to.x - from.x) * settle)) * stay) + (f.dir.x * lunge);
        f.attackerOffset.z = ((from.z + ((to.z - from.z) * settle)) * stay) + (f.dir.z * lunge);
        const settleHop = Math.hypot(to.x - from.x, to.z - from.z) > 0.01 ? Math.sin(Math.PI * settle) * 0.25 : 0;
        f.attackerStretch = attackerStretch(f.id, at, T);
        f.attackerHop = settleHop + attackerHop(f.id, at, T);
        if (f.attackerMesh) {
          const width = 1 / Math.sqrt(f.attackerStretch);
          f.attackerMesh.position.set(
              f.attackerPos.x + f.attackerOffset.x,
              f.attackerPos.y + f.attackerHop,
              f.attackerPos.z + f.attackerOffset.z,
          );
          f.attackerMesh.scale.set(width, f.attackerStretch, width);
        }
        // Overlapping action: the attacker's Prop flops on the blow and the hop.
        this.tiltProp(this.finisherAttackerGroup(f), f.sideAxis, propWobble('attacker', f.id, t, at, T));
        if (!f.windupPlayed && t >= T.toolIn[0]) {
          f.windupPlayed = true;
          playFinisherWindup(f.id);
        }
      }

      if (!f.impactDone && t >= T.impact) {
        f.impactDone = true;
        playFinisherImpact(f.id);
      }

      f.victims.forEach((victim) => this.poseFinisherVictim(f, victim, t, at));

      if (t >= T.total) {
        this.endFinisher();
        return;
      }
      this.requestShadowUpdate();
    },

    finisherVictimMesh(victim) {
      return victim.pawnId ? this.pawnMeshes[victim.pawnId] : victim.mesh;
    },

    // Raises a pawn's fill meshes to `order` (outline shells are in the
    // transparent pass and keep theirs); null restores them.
    setFinisherRenderOrder(group, order) {
      group?.traverse((object) => {
        if (!object.isMesh || object.userData.isOutlineShell) {
          return;
        }
        if (order === null) {
          object.renderOrder = object.userData.baseRenderOrder ?? object.renderOrder;
          delete object.userData.baseRenderOrder;
        } else {
          object.userData.baseRenderOrder ??= object.renderOrder;
          object.renderOrder = order;
        }
      });
    },

    finisherAttackerGroup(f) {
      return f.attackerMesh || (f.attackerId ? this.pawnMeshes[f.attackerId] : null);
    },

    poseFinisherVictim(f, victim, t, at) {
      const mesh = this.finisherVictimMesh(victim);
      if (!mesh) {
        return;
      }
      const T = f.timing;
      const id = f.lite ? null : f.id;
      // The flight's own clock: starts after any launch delay (a pancake, the
      // hang over the trapdoor).
      const flightAt = at - (FINISHER_LAUNCH_DELAY[id] || 0);
      poseDustPuff(victim.dust, at - landingTime(id, T));
      if (victim.poof) {
        posePoof(victim.poof, at - landingTime(id, T));
      }
      // Transformed (magician, vampire): a rabbit, or gone into bats (or
      // inside the UFO).
      const form = id ? victimForm(id, at, T) : 'pawn';
      if (victim.rabbit) {
        victim.rabbit.visible = form === 'rabbit';
        victim.ownParts.forEach((part) => {
          part.visible = form !== 'rabbit';
        });
      }
      if (form === 'gone') {
        mesh.visible = false;
        return;
      }
      let facing = null;
      let shrink = 1;
      let x;
      let y;
      let z;
      let spin = 0;

      if (t < T.impact) {
        // Hop off the attacker's square, then tremble and shrink away from
        // what's coming while the blow winds up.
        const p = f.lite ? 1 : Math.min(1, t / T.scoot);
        const tremble = f.lite ? 0 : victimTremble(t, T);
        x = victim.from.x + ((victim.stand.x - victim.from.x) * p) + (victim.spinAxis.x * tremble);
        z = victim.from.z + ((victim.stand.z - victim.from.z) * p) + (victim.spinAxis.z * tremble);
        // A startled hop in place (the wardrobe's victim drops in instead).
        const drop = victim.from.y - victim.stand.y;
        y = drop > 0
          ? victim.stand.y + (drop * (1 - (p * p)))
          : victim.stand.y + (Math.sin(Math.PI * p) * 0.25);
        spin = f.lite ? 0 : victimLean(f.id, t, T);
      } else if (id === 'trapdoor' && flightAt - T.impact < T.flight) {
        // Hangs over the open pit peering down, drops through, then springs
        // up out of its home field; hidden while fully below the board.
        const { atHome, drop, lookDown } = trapdoorVictim(at, T);
        const spot = atHome ? victim.home : victim.stand;
        x = spot.x;
        z = spot.z;
        y = spot.y - drop;
        spin = lookDown;
        if (drop >= TRAPDOOR_DEPTH) {
          mesh.visible = false;
          return;
        }
      } else if (id === 'ufo' && ufoVictim(at, T)) {
        // In the tractor beam: floating up (shrinking, turning) into the
        // saucer, or set down at home.
        const beam = ufoVictim(at, T);
        const spot = at - T.impact < T.flight ? victim.stand : victim.home;
        x = spot.x;
        z = spot.z;
        y = spot.y + beam.lift;
        shrink = beam.shrink;
        facing = (f.wardrobe ? 0 : this.pawnFacingYaw(spot)) + beam.spin;
      } else if (flightAt < T.impact) {
        // Flattened where it stood (hammer, anvil), or a fresh rabbit
        // twitching its nose; the flight waits.
        x = victim.stand.x;
        z = victim.stand.z;
        y = victim.stand.y;
        if (form === 'rabbit') {
          facing = Math.atan2(victim.home.x - x, victim.home.z - z);
        }
      } else if (flightAt - T.impact < T.flight) {
        // Launched: a spinning cartoon arc that lands exactly on its home
        // field (a rabbit hops there instead).
        const p = (flightAt - T.impact) / T.flight;
        const launch = victim.stand;
        x = launch.x + ((victim.home.x - launch.x) * p);
        z = launch.z + ((victim.home.z - launch.z) * p);
        if (form === 'rabbit') {
          y = launch.y + ((victim.home.y - launch.y) * p) + rabbitHop(p);
          facing = Math.atan2(victim.home.x - launch.x, victim.home.z - launch.z);
        } else {
          const distance = Math.hypot(victim.home.x - launch.x, victim.home.z - launch.z);
          const peak = 1.6 + (distance * 0.18);
          y = launch.y + ((victim.home.y - launch.y) * p) + (Math.sin(Math.PI * p) * peak);
          spin = victimSpin(p, f.lite);
        }
      } else {
        // Touched down: squash, a little bounce, settle.
        x = victim.home.x;
        z = victim.home.z;
        y = victim.home.y + victimLandingHop(flightAt, T);
      }

      const stretch = victimStretch(t, at, T, id);
      // Volume-preserving, but a pancake shouldn't spread across the board.
      const width = Math.min(1.75, 1 / Math.sqrt(stretch));
      mesh.position.set(x, y, z);
      mesh.scale.set(width * shrink, stretch * shrink, width * shrink);
      // Spun about the hit's side axis, still facing the viewer.
      // (A rabbit faces where it's hopping.)
      const yaw = facing ?? (f.wardrobe ? 0 : this.pawnFacingYaw(mesh.position));
      _finisherYaw.setFromAxisAngle(_worldUp, yaw);
      mesh.quaternion.copy(_finisherSpin.setFromAxisAngle(victim.spinAxis, spin)).multiply(_finisherYaw);
      mesh.visible = true;
      // Overlapping action: its Prop whips on the launch, flops on landing.
      this.tiltProp(mesh, victim.spinAxis, propWobble('victim', id, t, at, T));
    },

    // ── Wardrobe stage ─────────────────────────────────────────────────
    // A tiny separate scene (dark backdrop, plinth, one pawn) that the main
    // renderer draws into the wardrobe's preview panel (store.wardrobe.rect)
    // with a scissored viewport, after the orbiting board. Reusing this
    // renderer and the shared caches means props and Finishers preview with
    // exactly the code the match uses.
    // The Wardrobe is the menu screen or, during a match, an overlay.
    wardrobeOpen() {
      return this.store.currentScreen === 'wardrobe' || this.store.wardrobe.inGame;
    },

    ensureWardrobeStage() {
      if (this.wardrobeStage) {
        return this.wardrobeStage;
      }
      if (!this.renderer) {
        return null;
      }
      const scene = markRaw(new THREE.Scene());
      scene.background = markRaw(new THREE.Color(WARDROBE_BACKGROUND));
      // The grid floor fades into the backdrop instead of ending at a horizon.
      scene.fog = markRaw(new THREE.Fog(WARDROBE_BACKGROUND, 6, 16));
      const camera = markRaw(new THREE.PerspectiveCamera(30, 1, 0.1, 60));

      // A bright studio: strong ambient, a key, a cool rim and a soft
      // spotlight from above. (Its own little scene, so the extra lights
      // cost nothing on the board.)
      const sky = markRaw(new THREE.HemisphereLight('#ffffff', '#d8d4cb', 2.4));
      const key = markRaw(new THREE.DirectionalLight('#fff4e6', 1.7));
      key.position.set(-2.5, 4, 3.5);
      const rim = markRaw(new THREE.DirectionalLight('#cfdcff', 0.8));
      rim.position.set(3, 2.5, -3);
      const spot = markRaw(new THREE.SpotLight('#fff6e8', 2.2, 0, Math.PI / 7, 0.55, 0));
      spot.position.set(0, 7, 1.2);
      spot.target.position.set(0, 0, 0);
      scene.add(sky, key, rim, spot, spot.target);

      // A tall pedestal, wide enough for a Finisher's victim to stand on (and
      // to hide it falling through the trapdoor).
      const plinth = this.createOutlinedMesh(
          this.getSharedGeometry('wardrobe-plinth', () => new THREE.CylinderGeometry(0.95, 0.98, 1.6, 48)),
          this.createToonMaterial('wardrobe-plinth-material', { color: '#e4dfd5' }),
          { outlineScale: { x: 1.02, y: 1.005, z: 1.02 } },
      );
      plinth.position.y = -0.8;
      const floor = markRaw(new THREE.Mesh(
          this.getSharedGeometry('wardrobe-floor', () => new THREE.PlaneGeometry(48, 48)),
          markRaw(new THREE.MeshLambertMaterial({
            map: this.getSharedTexture('wardrobe-floor-grid', () => {
              const texture = gridFloorTexture();
              texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
              return texture;
            }),
          })),
      ));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = WARDROBE_FLOOR_Y;
      // Soft contact shadow under the pawn (the stage renders no shadow maps).
      const shadow = markRaw(new THREE.Mesh(
          this.getSharedGeometry('wardrobe-contact-shadow', () => new THREE.CircleGeometry(0.5, 32)),
          markRaw(new THREE.MeshBasicMaterial({
            map: this.getSharedTexture('wardrobe-contact-shadow', contactShadowTexture),
            transparent: true,
            depthWrite: false,
          })),
      ));
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.004;
      const pawn = this.buildPawnGroup('wardrobe-0', PLAYER_COLORS[0]);
      scene.add(floor, plinth, shadow, pawn);

      this.wardrobeStage = markRaw({
        scene,
        camera,
        pawn,
        pawnColor: PLAYER_COLORS[0],
        spin: 0,
        framing: 0,
        lastAt: 0,
        aspect: 0,
      });
      this.applyOutlineAppearance();
      return this.wardrobeStage;
    },

    // Per frame while the wardrobe is open: dress the pawn in the draft,
    // turntable it (plus the viewer's drag), and ease the camera between the
    // close-up and the wide Finisher framing.
    wardrobePawnColor() {
      if (this.store.wardrobe.inGame) {
        const own = this.store.players.find((player) => player.turn - 1 === this.store.online.mySeat);
        if (own) {
          return own.color;
        }
      }
      return PLAYER_COLORS[0];
    },

    updateWardrobeStage(now) {
      const stage = this.ensureWardrobeStage();
      const rect = this.store.wardrobe.rect;
      if (!stage || !rect || rect.width < 2 || rect.height < 2) {
        return;
      }
      const dt = stage.lastAt ? Math.min(now - stage.lastAt, 100) : 0;
      stage.lastAt = now;

      const look = pawnLook(this.store.wardrobe.draft || this.store.settings.cosmetics, this.store.wardrobe.previewPawn);
      this.applyPropToPawnGroup(stage.pawn, 'wardrobe-0', look.prop, look.flag);
      // In a match the preview pawn wears our own seat's color.
      const ownColor = this.wardrobePawnColor();
      if (stage.pawnColor !== ownColor) {
        stage.pawnColor = ownColor;
        stage.pawn.userData.bodyMaterial.color.set(ownColor);
      }

      const acting = Boolean(this.finisher?.wardrobe);
      if (acting) {
        // Facing the camera, turned a touch toward the victim.
        stage.pawn.rotation.y = 0.3;
      } else {
        if (!this.store.wardrobe.dragging) {
          stage.spin += dt * 0.0005;
        }
        stage.pawn.rotation.y = stage.spin + this.store.wardrobe.yaw;
        // Glides back to the center after a Finisher's takeover hop.
        stage.pawn.position.multiplyScalar(1 - Math.min(1, dt / 160));
        if (stage.pawn.position.lengthSq() < 1e-6) {
          stage.pawn.position.set(0, 0, 0);
        }
      }

      const goal = acting ? 1 : 0;
      stage.framing += (goal - stage.framing) * Math.min(1, dt / 220);
      const { idle, action } = WARDROBE_FRAMING;
      const amount = stage.framing;
      _wardrobeCamPos.set(...idle.pos).lerp(_wardrobeCamLook.set(...action.pos), amount);
      _wardrobeCamLook.set(...idle.look).lerp(_wardrobeScratch.set(...action.look), amount);
      // Narrow (portrait) panels back the camera off so the scene still fits
      // horizontally.
      const aspect = rect.width / rect.height;
      if (aspect < 1.1) {
        const back = Math.pow(1.1 / aspect, 0.85);
        _wardrobeCamPos.sub(_wardrobeCamLook).multiplyScalar(back).add(_wardrobeCamLook);
      }
      if (acting) {
        _wardrobeCamPos.add(this.finisher.shake);
      }
      stage.camera.position.copy(_wardrobeCamPos);
      stage.camera.lookAt(_wardrobeCamLook);
      if (stage.aspect !== aspect) {
        stage.aspect = aspect;
        stage.camera.aspect = aspect;
        stage.camera.updateProjectionMatrix();
      }
    },

    renderWardrobeStage() {
      const stage = this.wardrobeStage;
      const rect = this.store.wardrobe.rect;
      if (!stage || !rect || rect.width < 2 || rect.height < 2) {
        return;
      }
      const renderer = this.renderer;
      // WebGL viewports count from the bottom edge.
      const y = window.innerHeight - rect.top - rect.height;
      renderer.setScissorTest(true);
      renderer.setScissor(rect.left, y, rect.width, rect.height);
      renderer.setViewport(rect.left, y, rect.width, rect.height);
      renderer.render(stage.scene, stage.camera);
      renderer.setScissorTest(false);
      renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    },

    // Ends (or cuts short) the running Finisher: victims land home, the
    // camera goes back, the event queue resumes.
    endFinisher() {
      const f = this.finisher;
      if (!f) {
        return;
      }
      this.finisher = null;
      window.clearTimeout(f.fallbackTimer);

      f.stages.forEach(({ stage }) => f.scene.remove(stage));
      f.tempMeshes.forEach((mesh) => f.scene.remove(mesh));
      f.victims.forEach((victim) => {
        f.scene.remove(victim.dust);
        if (victim.poof) {
          f.scene.remove(victim.poof);
        }
        const mesh = this.finisherVictimMesh(victim);
        if (victim.rabbit) {
          mesh?.remove(victim.rabbit);
          victim.ownParts.forEach((part) => {
            part.visible = true;
          });
        }
        if (mesh) {
          mesh.visible = true;
        }
        this.setFinisherRenderOrder(mesh, null);
      });
      f.attackerMesh?.scale.set(1, 1, 1);
      this.tiltProp(this.finisherAttackerGroup(f), null, 0);

      f.victims.forEach((victim) => {
        if (!victim.pawnId) {
          return;
        }
        const mesh = this.pawnMeshes[victim.pawnId];
        mesh?.quaternion.identity();
        mesh?.scale.set(1, 1, 1);
        this.tiltProp(mesh, null, 0);
        // Settle the tween state on the logical (home) position so syncPawns
        // doesn't start a hop from where the mesh used to be.
        const pawn = this.findPawnById(victim.pawnId);
        const motion = this.pawnMotionStates[victim.pawnId];
        if (pawn && motion) {
          const home = pawn.getCoordinates(PAWN_CENTER_Y);
          ['current', 'from', 'to'].forEach((key) => {
            motion[key].x = home.x;
            motion[key].y = home.y;
            motion[key].z = home.z;
          });
          motion.position = pawn.position;
          motion.globalPosition = pawn.globalPosition;
          motion.inDestination = pawn.isInDestinationField;
          motion.isAnimating = false;
          motion.stretch = 1;
        }
      });

      if (f.camera && this.camera && !this.isMenuMode()) {
        this.camera.position.copy(f.camera.fromPos);
        if (this.controls) {
          this.controls.target.copy(f.camera.fromTarget);
          this.controls.enabled = f.camera.controlsEnabled;
          this.controls.update();
        } else {
          this.camera.lookAt(f.camera.fromTarget);
        }
      }

      this.requestShadowUpdate();
      // A Wardrobe preview never held MatchController's queue, so it must not
      // release it (in-game, a real capture may be preempting it right now).
      if (f.wardrobe) {
        this.store.wardrobe.play = null;
        return;
      }
      this.store.online.finisherInFlight = false;
      EventBus.fire(EventKeys.finisher.done);
    },

    // Called every rAF frame; the stroke is only redrawn when the 3D scene
    // was just rendered (the hovered mesh/camera may have moved) or the
    // hovered target changed. Otherwise the last drawing stays valid.
    renderHighlights2D(rendered) {
      const canvas = this.$refs.overlayCanvas;
      const ctx = this.overlayCtx;
      if (!canvas || !ctx) return;

      // Idle "clickable" cues are the ground rings (updateClickableRipples);
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

      if (!rendered && this.overlayHasContent === this.hoveredTarget) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let drew = false;

      if (wantsDice) {
        this.drawObjectHighlight2D(
          ctx, canvas,
          [{ points: DICE_LOCAL_CORNERS, matrix: this.diceMesh.matrixWorld }],
          1,
          CLICKABLE_COLOR_HEX,
        );
        drew = true;
      } else {
        const pawn = this.findPawnByMeshName(this.hoveredTarget);
        const mesh = pawn?.isActive ? this.pawnMeshes[pawn.id] : null;
        if (mesh) {
          this.drawObjectHighlight2D(
            ctx, canvas,
            [
              { points: PAWN_BODY_LOCAL_POINTS, matrix: mesh.matrixWorld },
              { points: PAWN_HEAD_LOCAL_POINTS, matrix: mesh.matrixWorld },
            ],
            1,
            CLICKABLE_COLOR_HEX,
          );
          drew = true;
        }
      }

      // The hovered target the stroke was drawn for (false = blank).
      this.overlayHasContent = drew ? this.hoveredTarget : false;
    },

    // pointSets: [{ points: constant local-space Vector3[], matrix: world
    // matrix }] — projection reuses one scratch vector, no allocation beyond
    // the tiny screen-point literals the hull needs.
    drawObjectHighlight2D(ctx, canvas, pointSets, opacity, color) {
      const w = canvas.width;
      const h = canvas.height;

      const hulls = pointSets.map(({ points, matrix }) => {
        const screenPts = points.map((lp) => {
          const v = _highlightProjScratch.copy(lp).applyMatrix4(matrix).project(this.camera);
          return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h };
        });
        return this.convexHull2D(screenPts);
      }).filter((hull) => hull.length >= 2);

      if (!hulls.length) return;

      // Crisp stroke — no shadow blur, no pulse.
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 7;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;

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
      const translation = new THREE.Vector3();

      positions.forEach((position, index) => {
        // Shell = the instance's own scale × its outline scale.
        const scale = this.getOutlineScaleVector(position.outlineScale || baseScale, lineScale);
        const s = position.scale;
        if (s) {
          scale.multiply(translation.set(s.x, s.y, s.z));
        }
        matrix.compose(
            translation.set(position.x, position.y, position.z),
            quaternion,
            scale,
        );
        outlineMesh.setMatrixAt(index, matrix);
      });

      outlineMesh.instanceMatrix.needsUpdate = true;
    },

    // One material over the 3x2 pip atlas (buildDiceGeometry remaps each
    // face's UVs into its tile): 1 draw call instead of 6.
    createDiceMaterial() {
      return this.getSharedMaterial('dice-material', () => {
        const material = markRaw(new THREE.MeshLambertMaterial({
          color: '#ffffff',
          map: this.getDiceAtlasTexture(),
        }));
        this.prepareFillMaterial(material);
        return material;
      });
    },

    // Pip faces 1–6 painted into a 3x2 atlas of 256px tiles; tile of face
    // value v: column (v-1) % 3, row floor((v-1) / 3) from the top. Tile
    // edges are all the same cream, so mipmap bleed between tiles is invisible.
    getDiceAtlasTexture() {
      return this.getSharedTexture(
          'dice-atlas-texture',
          () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256 * DICE_ATLAS_COLUMNS;
            canvas.height = 256 * DICE_ATLAS_ROWS;

            const context = canvas.getContext('2d');
            context.fillStyle = '#fff8e8';
            context.fillRect(0, 0, canvas.width, canvas.height);
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

            for (let value = 1; value <= 6; value += 1) {
              const ox = ((value - 1) % DICE_ATLAS_COLUMNS) * 256;
              const oy = Math.floor((value - 1) / DICE_ATLAS_COLUMNS) * 256;

              context.strokeStyle = '#e0d2b2';
              context.lineWidth = 12;
              context.strokeRect(ox + 18, oy + 18, 256 - 36, 256 - 36);

              context.fillStyle = '#231a15';
              faceMap[value].forEach((key) => {
                const [x, y] = positions[key];
                context.beginPath();
                context.arc(ox + x, oy + y, pipRadius, 0, Math.PI * 2);
                context.fill();
              });
            }

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

      // The match's environment (set by whoever created the room) wins while
      // online; the local setting is the solo/menu fallback.
      const env = this.store.online.environment || this.store.settings.environment || 'day';

      this.scene.background = this.getSkyGradientTexture(env);

      if (!this.skyLight || !this.sunLight || !this.fillLight) {
        return;
      }

      const look = ENVIRONMENT_LIGHTING[env] || ENVIRONMENT_LIGHTING.day;
      // A constant ambient term added to both hemisphere colors is exactly
      // an AmbientLight (three sums both as plain irradiance), so fold it in
      // — linear-space math, intensity baked into the colors.
      const ambient = _envAmbientScratch.set(look.ambient).multiplyScalar(look.ambientIntensity);
      this.skyLight.color.set(look.sky).multiplyScalar(look.skyIntensity).add(ambient);
      this.skyLight.groundColor.set(look.ground).multiplyScalar(look.skyIntensity).add(ambient);
      this.skyLight.intensity = 1;

      this.sunLight.color.set(look.sun);
      this.sunLight.intensity = look.sunIntensity;
      this.sunLight.position.set(...look.sunPosition);

      this.fillLight.color.set(look.fill);
      this.fillLight.intensity = look.fillIntensity;

      this.requestShadowUpdate();
      this.hoverNeedsUpdate = true;
    },

    applyOutlineAppearance() {
      this.requestRender();
      const preset = getOutlineAppearancePreset(this.store.settings.outlineAppearance);
      const outlineMaterial = this.getOutlineShellMaterial();
      outlineMaterial.opacity = preset.visible ? preset.lineOpacity : 0;
      outlineMaterial.transparent = true;
      outlineMaterial.needsUpdate = true;

      const applyToShell = (object) => {
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
      };
      this.scene?.traverse(applyToShell);
      this.wardrobeStage?.scene.traverse(applyToShell);
    },

    // Marks the shadow map dirty so the next renderer.render redraws it.
    // Must be called whenever a shadow caster or a light moves/changes —
    // shadowMap.autoUpdate is off. A shadow redraw implies a visual change,
    // so this also schedules a render pass.
    requestShadowUpdate() {
      if (this.renderer) {
        this.renderer.shadowMap.needsUpdate = true;
      }
      this.renderNeeded = true;
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
        if (this.decorationMeshes) {
          this.decorationMeshes.forEach((mesh) => {
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
      this.requestRender();
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
      // Tap skips a running Finisher (and must not also click the board).
      if (this.finisher && !this.finisher.lite) {
        this.endFinisher();
        this.swallowNextClick = true;
        return;
      }
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

      // Mobile: pawns get a generous invisible tap radius, resolved by nearest
      // screen-space center so two pawns sitting close stay distinguishable.
      if (this.isMobile && this.store.gamePlayStatus.isMoving && this.isHumanTurn()) {
        return this.pickNearestActivePawn();
      }

      const interactiveObjects = [];

      if (this.homeBaseHelpers && this.baseHelpersVisible()) {
        this.homeBaseHelpers.forEach((group, baseIdx) => {
          // Only claimable seats are targets; keep taken ones out so they
          // don't advertise a pointer cursor for a dead click.
          if (!this.isSeatClaimable(baseIdx)) {
            return;
          }
          interactiveObjects.push(group);
        });
      }

      if (this.diceMesh && this.store.gamePlayStatus.isRolling && this.isHumanTurn()) {
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

    // Screen-space pawn picking for touch: each active pawn owns a generous
    // invisible tap radius; the tap resolves to the pawn whose projected center
    // is nearest, so two adjacent pawns never trade taps.
    pickNearestActivePawn() {
      if (!this.pointer || !this.camera || !this.$refs.canvas) {
        return null;
      }

      const rect = this.$refs.canvas.getBoundingClientRect();
      const tapX = (this.pointer.x * 0.5 + 0.5) * rect.width;
      const tapY = (-this.pointer.y * 0.5 + 0.5) * rect.height;
      const TAP_RADIUS_PX = 64;

      const projected = new THREE.Vector3();
      let bestName = null;
      let bestDist = TAP_RADIUS_PX;

      Object.values(this.pawnMeshes).forEach((mesh) => {
        const pawn = this.findPawnByMeshName(mesh.name);
        if (!pawn || !pawn.isActive) {
          return;
        }
        // Aim at the pawn body, a little above its base disc.
        projected.set(mesh.position.x, mesh.position.y + 0.5, mesh.position.z).project(this.camera);
        const sx = (projected.x * 0.5 + 0.5) * rect.width;
        const sy = (-projected.y * 0.5 + 0.5) * rect.height;
        const dist = Math.hypot(sx - tapX, sy - tapY);
        if (dist < bestDist) {
          bestDist = dist;
          bestName = mesh.name;
        }
      });

      return bestName;
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
      if (this.swallowNextClick) {
        this.swallowNextClick = false;
        return;
      }
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

    // Our only option, played for us — if the moment hasn't passed (turn
    // timed out, a resync, or we already clicked).
    handleAutoMove({ pawnId }) {
      if (this.store.online.autoMovePawn !== pawnId) {
        return;
      }
      this.store.online.autoMovePawn = null;
      const pawn = this.findPawnById(pawnId);
      if (pawn?.isActive && this.isHumanTurn() && this.store.gamePlayStatus.isMoving) {
        this.movePawnAsCurrentPlayer(pawn);
        this.hoverNeedsUpdate = true;
      }
    },

    movePawnAsCurrentPlayer(pawn) {
      this.store.online.autoMovePawn = null;
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
      this.endFinisher();
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
      this.stopTurnTimer();
      this.freezeDiceBody();
      this.syncDice();
      this.clearHoveredTarget();
    },

    // Seats changed (join/leave/claim): in the lobby rebuild the roster; in a
    // running game refresh the connected/disconnected pawn dimming.
    handleLobbyUpdated() {
      this.syncOnlinePlayersFromLobby();
      this.applySeatPresence();
      this.applyPawnProps();
      this.hoverNeedsUpdate = true;
      this.requestRender(); // seat rings appear/freeze/vanish with the roster
    },

    // A departed player's pawns go semi-transparent until they reconnect or
    // someone takes the seat over. Pawn materials are shared per seat, so
    // dimming one material pair dims exactly that player's four pawns.
    applySeatPresence() {
      if (!this.store.online.enabled) {
        return;
      }
      (this.store.online.seats || []).forEach((seat) => {
        if (!seat) {
          return;
        }
        const dim = seat.connected === false;
        const cosmetics = this.cosmeticsForSeat(seat.seat);
        const flagKeys = [0, 1, 2, 3].map((index) => flagMaterialKey(pawnLook(cosmetics, index).flag, seat.seat));
        const keys = [`pawn-body-material-${seat.seat}`, ...flagKeys]
          .concat(PROP_MATERIAL_PREFIXES.map((prefix) => `${prefix}-${seat.seat}`));
        keys.forEach((key) => {
          const material = this.sharedMaterials[key];
          if (!material) {
            return;
          }
          const opacity = dim ? 0.35 : 1;
          if (material.opacity !== opacity) {
            material.transparent = dim;
            material.opacity = opacity;
            material.needsUpdate = true;
            this.requestRender();
          }
        });
      });
    },

    syncOnlinePlayersFromLobby() {
      if (this.store.currentScreen !== 'lobby') {
        return;
      }
      this.store.players.splice(0, this.store.players.length);
      const seats = this.store.online.seats || [];
      seats.forEach((seat) => {
        if (seat) {
          const isMe = !seat.bot && seat.userId === this.store.online.selfUserId;
          const controller = isMe ? 'local' : 'remote';
          const name = seatPlayerName(seat);
          const player = markRaw(new Player(name, PLAYER_COLORS[seat.seat], seat.seat + 1, controller));
          this.store.players.push(player);
        }
      });
      this.hoverNeedsUpdate = true;
    },

    // Base helpers are live in the lobby, and mid-game for a connected user
    // who has no seat yet (joined an ongoing match with a free/abandoned slot).
    baseHelpersVisible() {
      if (this.store.currentScreen === 'lobby') {
        return true;
      }
      return this.store.currentScreen === 'game-screen' &&
        this.store.online.enabled &&
        this.store.online.mySeat < 0 &&
        !this.store.winner;
    },

    // A Bot's seat, any time; mid-game also a disconnected player's seat
    // (both taken over with their pawns as they stand).
    isSeatClaimable(baseIdx) {
      const seat = this.store.online.seats[baseIdx];
      if (!seat || seat.bot) {
        return true;
      }
      return this.store.currentScreen === 'game-screen' && seat.connected === false;
    },

    handleBaseClick(idx) {
      if (this.baseHelpersVisible() && this.isSeatClaimable(idx)) {
        MatchController.requestClaimSeat(idx);
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

        // Never drawn (it would be a draw call that writes nothing) — the
        // Raycaster ignores `visible`, so it still catches clicks.
        const hitDisc = markRaw(new THREE.Mesh(hitGeo, hitMat));
        hitDisc.visible = false;
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

    // Reuses a module-scoped array + object pool (one entry per ripple ring)
    // instead of allocating fresh literals every frame.
    getClickableRippleTargets() {
      _rippleTargets.length = 0;
      if (!this.isHumanTurn()) {
        return _rippleTargets;
      }

      if (this.diceMesh && this.store.gamePlayStatus.isRolling) {
        const target = RIPPLE_TARGET_POOL[_rippleTargets.length];
        target.x = this.diceMesh.position.x;
        target.y = DICE_PIT.floorY + 0.012;
        target.z = this.diceMesh.position.z;
        _rippleTargets.push(target);
      }

      if (this.store.gamePlayStatus.isMoving) {
        this.store.players.forEach((player) => {
          player.pawns.forEach((pawn) => {
            if (!pawn.isActive || _rippleTargets.length >= RIPPLE_TARGET_POOL.length) return;
            const mesh = this.pawnMeshes[pawn.id];
            if (!mesh) return;
            const target = RIPPLE_TARGET_POOL[_rippleTargets.length];
            target.x = mesh.position.x;
            // Just above the tallest field disc (start fields: center 0.132
            // + half height 0.05) so the ring isn't occluded by the discs.
            target.y = START_FIELD_CENTER_Y + 0.058;
            target.z = mesh.position.z;
            _rippleTargets.push(target);
          });
        });
      }

      return _rippleTargets;
    },

    // Static rings under the dice / movable pawns on the local turn. Only
    // dirties the frame when a ring appears, moves or disappears.
    updateClickableRipples() {
      if (!this.clickableRipples) {
        return;
      }

      const targets = this.getClickableRippleTargets();
      this.clickableRipples.forEach((ripple, poolIdx) => {
        const target = targets[poolIdx];
        const group = ripple.group;
        if (!target) {
          if (group.visible) {
            group.visible = false;
            this.requestRender();
          }
          return;
        }

        if (
          !group.visible ||
          group.position.x !== target.x ||
          group.position.y !== target.y ||
          group.position.z !== target.z
        ) {
          group.visible = true;
          group.position.set(target.x, target.y, target.z);
          ripple.rings.forEach((ring, ringIdx) => {
            ring.visible = ringIdx === 0;
            ring.scale.set(target.scale, target.scale, 1);
            ring.material.color.copy(CLICKABLE_COLOR);
            ring.material.opacity = 0.95;
          });
          this.requestRender();
        }
      });
    },

    // Nature Kit scenery (utils/natureKit.js): mountains, hills, trees,
    // bushes and clouds are always shown; rocks/reeds/grass are the
    // `decorationMeshes` the lowest quality preset hides. Loads async — the
    // board is playable before it arrives. Baked into static merged meshes
    // sharing a Lambert material over the kit's palette texture.
    async createNatureEnvironment() {
      const scene = this.scene;
      let kit;
      try {
        kit = await loadNatureKit(NATURE_MODEL_NAMES);
      } catch (error) {
        console.warn('Nature kit failed to load', error);
        return;
      }

      // Unmounted (or the scene was rebuilt) while loading.
      if (!this.scene || this.scene !== scene) {
        Object.values(kit.geometries).forEach((geometry) => geometry.dispose());
        kit.texture?.dispose();
        return;
      }

      const texture = this.getSharedTexture('nature-kit-palette', () => kit.texture);
      const material = this.createToonMaterial('nature-kit-material', { color: '#ffffff', map: texture });
      // The kit's clouds sample a grey strip of the palette and read as
      // rocks against the sky — keep them plain white like the old puffs.
      const cloudMaterial = this.createToonMaterial('cartoon-cloud-material', { color: '#ffffff' });

      // The scenery never moves, so each set is baked into one static mesh
      // per material (instance transforms applied to cloned geometry): the
      // whole backdrop is 2 draw calls (palette + clouds), details 1.
      const buildSet = (setName, entries, options) => {
        const byMaterial = new Map();
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);

        entries.forEach((entry) => {
          const source = kit.geometries[entry.model];
          // Normalize to the attributes every kit file shares (mergeGeometries
          // needs identical attribute sets and indexing).
          const part = new THREE.BufferGeometry();
          ['position', 'normal', 'uv'].forEach((name) => {
            if (source.attributes[name]) part.setAttribute(name, source.attributes[name]);
          });
          part.setIndex(source.index);
          // Always a private copy: the transform below must not touch the
          // source (toNonIndexed on an unindexed geometry returns itself).
          const baked = source.index ? part.toNonIndexed() : part.clone();
          position.set(entry.x, entry.y, entry.z);
          quaternion.setFromAxisAngle(up, entry.yaw || 0);
          scale.setScalar(entry.scale);
          baked.applyMatrix4(matrix.compose(position, quaternion, scale));

          const partMaterial = entry.model.startsWith('Cloud') ? cloudMaterial : material;
          if (!byMaterial.has(partMaterial)) byMaterial.set(partMaterial, []);
          byMaterial.get(partMaterial).push(baked);
        });

        return [...byMaterial].map(([partMaterial, parts], index) => {
          const geometry = this.getSharedGeometry(`nature-${setName}-${index}`, () => mergeGeometries(parts));
          parts.forEach((part) => part.dispose());
          const mesh = markRaw(new THREE.Mesh(geometry, partMaterial));
          mesh.receiveShadow = Boolean(options.receiveShadow);
          mesh.matrixAutoUpdate = false; // identity, never moves
          this.scene.add(mesh);
          return mesh;
        });
      };

      buildSet('backdrop', NATURE_BACKDROP, { receiveShadow: true });
      this.decorationMeshes = buildSet('details', NATURE_DETAILS, { receiveShadow: true });
      // Only the baked copies are kept.
      Object.values(kit.geometries).forEach((geometry) => geometry.dispose());

      const showDecorations = getRenderQualityPreset(this.store.settings.quality).decorationsEnabled !== false;
      this.decorationMeshes.forEach((mesh) => {
        mesh.visible = showDecorations;
      });

      this.requestShadowUpdate();
    },

    // ---- Online game flow (server-authoritative) ----

    // On page load, decide whether we can drop the player back into a match.
    // The server keeps their seat (matchJoinAttempt accepts the disconnected
    // rejoin), so all we do here is pick the match handle and hand off to
    // MatchController.resumeSession — the URL wins (seamless refresh / shared
    // link), else a stored record drives the "continue?" prompt.
    checkResumeOnLoad() {
      // StartScreen routed a #admin hash before this ran — leave it alone.
      if (this.store.currentScreen === 'admin') {
        return;
      }

      const online = this.store.online;
      const fromUrl = readMatchUrl();

      if (fromUrl) {
        if (!online.displayName) {
          // A nameless visitor followed a shared link — collect a name on the
          // intro first; StartScreen resumes pendingResume once it's entered.
          online.pendingResume = { matchId: fromUrl.matchId, code: fromUrl.code };
          this.store.currentScreen = 'main-menu';
          return;
        }
        MatchController.resumeSession({ matchId: fromUrl.matchId, joinCode: fromUrl.code });
        return;
      }

      const record = loadActiveMatch();
      if (record) {
        online.resumePrompt = record;
        if (online.displayName) {
          this.store.currentScreen = 'main-menu';
        }
      }
    },

    startOnlineGame(payload) {
      this.resetGameState();
      this.store.online.enabled = true;
      this.store.online.resuming = false;

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
                seatPlayerName(seat),
                PLAYER_COLORS[seat.seat],
                seat.seat + 1,
                seat.seat === this.store.online.mySeat ? 'local' : 'remote',
            )),
        );
      });

      this.store.online.seatToPlayerIndex = seatToPlayerIndex;
      this.store.currentScreen = 'game-screen';
      this.setTurnBySeat(payload.turnSeat, payload.round || 1, payload);
      this.applySeatPresence();
    },

    // Online replacement for changePlayersTurn/repeatPlayersTurn: seats may be
    // non-contiguous, so the turn is addressed by seat, not by array rotation.
    // `timing`: the server payload (turnMsLeft + receivedAt) for the timer.
    setTurnBySeat(seat, round, timing) {
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
      this.store.online.autoMovePawn = null;
      this.store.gamePlayStatus.isRolling = true;
      this.store.gamePlayStatus.isMoving = false;
      this.startTurnTimer(timing);
      this.hoverNeedsUpdate = true;
    },

    handleNetTurnChange(payload) {
      if (!this.store.online.enabled) {
        return;
      }
      this.setTurnBySeat(payload.turnSeat, payload.round, payload);
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
      this.stopTurnTimer();
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
        turnMsLeft: payload.turnMsLeft,
        receivedAt: payload.receivedAt,
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
      this.startTurnTimer();
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
      this.startTurnTimer();
      this.hoverNeedsUpdate = true;
    },

    // `timing` is a server payload carrying turnMsLeft (+ the receivedAt
    // MatchController stamps): back-date startedAt so the bar shows the real
    // time left after a refresh, a drop-in join or a queued TURN_CHANGE.
    // Without it the turn starts now.
    startTurnTimer(timing) {
      const timer = this.store.turnTimer;
      const now = performance.now();
      if (timing && typeof timing.turnMsLeft === 'number') {
        const msLeft = Math.min(timing.turnMsLeft, timer.duration);
        timer.startedAt = (timing.receivedAt ?? now) + msLeft - timer.duration;
      } else {
        timer.startedAt = now;
      }
      timer.running = true;
    },

    stopTurnTimer() {
      this.store.turnTimer.running = false;
    },

    // Local games only: force the turn over once its 60 seconds run out.
    // Online the server's own turn timeout is authoritative — the bar just
    // sits empty until TURN_CHANGE arrives.
    enforceTurnTimer() {
      const timer = this.store.turnTimer;
      if (
        !timer.running ||
        this.store.online.enabled ||
        this.store.currentScreen !== 'game-screen' ||
        performance.now() - timer.startedAt < timer.duration
      ) {
        return;
      }

      if (this.store.winner || !this.store.players[this.store.currentPlayerId]) {
        this.stopTurnTimer();
        return;
      }

      // Let dice physics or a pawn move finish — their end-of-turn events
      // land right after and restart the timer anyway.
      if (this.pendingDiceRoll) {
        return;
      }

      const currentPlayer = this.store.players[this.store.currentPlayerId];
      if (currentPlayer.pawns.some((pawn) => pawn.isMoving)) {
        return;
      }

      this.stopTurnTimer();
      EventBus.fire(EventKeys.turns.endTurn);
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

      // A fresh throw starts unrigged — the orientation is being randomized
      // anyway, so the reset is invisible. Local rolls must stay at identity
      // (their game value comes from the physical face).
      this.diceVisualOffset.identity();
      this.diceOffsetTween = null;

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
      // Both horizontal axes always get real spin: a near-zero X/Z angular
      // velocity leaves the dice pirouetting flat around Y with the top face
      // never changing, which reads as a fake roll.
      const tumble = (min, max) => {
        const magnitude = min + (Math.random() * (max - min));
        return Math.random() < 0.5 ? -magnitude : magnitude;
      };
      body.angularVelocity.set(
          tumble(9, 15),
          (Math.random() - 0.5) * 8,
          tumble(9, 15),
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

    getDicePredictionSim() {
      if (!this.dicePredictionSim) {
        const world = createDiceArenaWorld();
        const body = createDicePhysicsBody();
        world.addBody(body);
        this.dicePredictionSim = markRaw({ world, body });
      }
      return this.dicePredictionSim;
    },

    // Fast-forwards a hidden clone of the arena from the live dice state at
    // the same fixed 1/60 timestep the visible world uses, so both worlds
    // walk the identical step sequence. Returns the face that will end up
    // on top, or null if the clone never settles cleanly.
    predictDiceLandingFace() {
      const source = this.dicePhysicsBody;
      if (!source) {
        return null;
      }

      const sim = this.getDicePredictionSim();
      const body = sim.body;
      body.position.copy(source.position);
      body.quaternion.copy(source.quaternion);
      body.velocity.copy(source.velocity);
      body.angularVelocity.copy(source.angularVelocity);
      body.force.setZero();
      body.torque.setZero();
      body.wakeUp();

      // 20 simulated seconds cap; a throw settles in well under 5.
      for (let i = 0; i < 1200; i += 1) {
        sim.world.step(1 / 60);
        if (body.sleepState === CANNON.Body.SLEEPING) {
          break;
        }
      }

      if (body.sleepState !== CANNON.Body.SLEEPING) {
        return null;
      }

      _diceFaceQuaternion.set(
          body.quaternion.x,
          body.quaternion.y,
          body.quaternion.z,
          body.quaternion.w,
      );
      let bestFace = 0;
      let bestDot = -Infinity;
      DICE_FACE_ENTRIES.forEach(([faceValue, normal]) => {
        const dot = _diceFaceScratch.copy(normal).applyQuaternion(_diceFaceQuaternion).dot(WORLD_UP);
        if (dot > bestDot) {
          bestDot = dot;
          bestFace = faceValue;
        }
      });

      // A tilted rest would trigger recovery nudges live (which re-rig), so
      // only a clean face-up prediction is worth acting on.
      return bestDot >= DICE_SETTLE_RULES.faceUpDotThreshold ? bestFace : null;
    },

    // Rig the tumbling dice so the server's value comes up naturally:
    // predict the landing face, then remap the pips with a constant
    // mesh-local rotation (always a cube symmetry — face normal to face
    // normal), blended in over a quarter second while the dice still spins
    // fast enough that the correction can't be seen.
    rigOnlineDiceToValue(value) {
      const body = this.dicePhysicsBody;
      if (!body || !this.pendingDiceRoll || !DICE_FACE_NORMALS[value]) {
        return false;
      }

      // Nearly settled: a blend would read as a wobble — let the snap
      // fallback handle this rare case instead.
      if (body.angularVelocity.lengthSquared() < 4) {
        return false;
      }

      const predictedFace = this.predictDiceLandingFace();
      if (!predictedFace) {
        return false;
      }

      const targetOffset = predictedFace === value
        ? new THREE.Quaternion()
        : new THREE.Quaternion().setFromUnitVectors(
            DICE_FACE_NORMALS[value],
            DICE_FACE_NORMALS[predictedFace],
        );

      this.diceOffsetTween = markRaw({
        from: this.diceVisualOffset.clone(),
        to: markRaw(targetOffset),
        start: performance.now(),
        duration: 260,
      });
      return true;
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

      // A roll that leaves the turn open restarts the server's deadline.
      if (typeof payload.turnMsLeft === 'number') {
        this.startTurnTimer(payload);
      }

      this.onlineDice.serverValue = payload.value;
      this.onlineDice.payload = payload;
      if (this.pendingDiceRoll) {
        this.rigOnlineDiceToValue(payload.value);
      }
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
    },

    // Fallback for a missed rig: rotates the settled dice so `value` faces
    // up, with a short visual tween that reads as a final wobble. Judges
    // and corrects the DISPLAYED orientation (physics ∘ rig offset), then
    // bakes the result into the body and resets the offset.
    snapDiceToValue(value) {
      if (!this.dicePhysicsBody || !this.diceMesh || !DICE_FACE_NORMALS[value]) {
        return;
      }

      const fromQuaternion = new THREE.Quaternion(
          this.dicePhysicsBody.quaternion.x,
          this.dicePhysicsBody.quaternion.y,
          this.dicePhysicsBody.quaternion.z,
          this.dicePhysicsBody.quaternion.w,
      ).multiply(this.diceVisualOffset);

      let displayedFace = 0;
      let bestDot = -Infinity;
      DICE_FACE_ENTRIES.forEach(([faceValue, normal]) => {
        const dot = _diceFaceScratch.copy(normal).applyQuaternion(fromQuaternion).dot(WORLD_UP);
        if (dot > bestDot) {
          bestDot = dot;
          displayedFace = faceValue;
        }
      });

      if (displayedFace === value) {
        return;
      }

      const desiredWorldNormal = DICE_FACE_NORMALS[value].clone().applyQuaternion(fromQuaternion);
      const snappedQuaternion = new THREE.Quaternion()
          .setFromUnitVectors(desiredWorldNormal.normalize(), WORLD_UP)
          .multiply(fromQuaternion.clone())
          .normalize();

      // Body gets the final displayed orientation immediately (it is
      // asleep) and the offset folds away; the mesh slerps toward it in
      // syncDice.
      this.diceVisualOffset.identity();
      this.diceOffsetTween = null;
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

      // The nudge changed the trajectory — re-run the landing prediction.
      if (this.store.online.enabled && this.onlineDice?.serverValue != null) {
        this.rigOnlineDiceToValue(this.onlineDice.serverValue);
      }
    },

    rollDice(amount) {
      if (!this.store.gamePlayStatus.isRolling || this.store.currentPlayerId < 0 || this.pendingDiceRoll) {
        return;
      }

      // Demo mode only: a 1-6 amount (from the number-key shortcut) is sent
      // as a demand; the EventBus roll trigger passes no amount.
      const demand = this.store.demoMode && Number.isInteger(amount) && amount >= 1 && amount <= 6
        ? amount
        : null;

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
        MatchController.requestRoll(demand);
        this.startDiceRoll();
        return;
      }

      this.store.gamePlayStatus.isRolling = false;
      this.hoverNeedsUpdate = true;
      this.startDiceRoll();
    },

    isMenuMode() {
      const orbitingScreens = ['main-menu', 'home', 'create-room', 'join-room', 'admin', 'wardrobe'];
      return orbitingScreens.includes(this.store.currentScreen);
    },

    updateCameraPath(now) {
      if (!this.camera) return;

      if (this.isMenuMode()) {
        if (this.controls) {
          this.controls.enabled = false;
        }
        // Very slow cinematic drift, time-based so it runs at the same speed on
        // 60Hz and 120Hz displays (clamped across tab-switch gaps). Holds
        // still while the window is unfocused.
        const dt = this.windowFocused && this.menuOrbitLastAt
          ? Math.min(now - this.menuOrbitLastAt, 100)
          : 0;
        this.menuOrbitLastAt = this.windowFocused ? now : 0;
        this.menuOrbitTime += dt * MENU_ORBIT_RAD_PER_MS;
        const radius = 9.5;
        const target = CAMERA_GAME_TARGET;
        this.camera.position.x = target.x + Math.sin(this.menuOrbitTime) * radius;
        this.camera.position.z = target.z + Math.cos(this.menuOrbitTime) * radius;
        this.camera.position.y = 4.2 + Math.sin(this.menuOrbitTime * 3) * MENU_ORBIT_BOB; // slow swell
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
