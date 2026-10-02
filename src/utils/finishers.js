// Finishers (see CONTEXT.md): the tools, the timeline and the pose functions
// that App.vue's startFinisher/updateFinisher drive every frame. Ids come
// from shared/protocol.js (the picker catalog is in cosmetics.js). Builders
// take App.vue's helpers (`kit`) so every geometry/material goes through the
// shared caches. Everything here is a pure function of time — nothing keeps
// moving once the Finisher ends, so demand rendering stays intact.

import * as THREE from 'three';
import { markRaw } from 'vue';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ── Easing ──────────────────────────────────────────────────────────────
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const phase = (now, [start, end]) => clamp01((now - start) / (end - start));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeIn = (t) => t * t * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => {
  const c = 1.7;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
// A damped wobble starting at `since` = 0 (nothing before).
const wobble = (since, amplitude, frequency, decay) => (
  since > 0 ? amplitude * Math.sin(since * frequency) * Math.exp(-since / decay) : 0
);

// ── Timeline ────────────────────────────────────────────────────────────
// Times in ms from start. Impact is where the burst, sound and victim launch
// happen; the camera zooms in over the first phase and eases back at the end.
// `hitStop` freezes the action on the impact pose for a beat (the camera keeps
// moving and shakes), so everything after impact runs on `actionTime`. The
// victim then flies home and bounces on `landing`. The "lite" timeline
// (Finishers switched off) has no tool, no zoom: impact at once, then the
// flight home.
export const FINISHER_TIMING = {
  zoomIn: 550,
  scoot: 250, // victim hops off the attacker's square
  toolIn: [150, 380], // tool pops in
  windup: [380, 820],
  impact: 960,
  hitStop: 110,
  toolOut: [1250, 1480],
  flight: 850,
  landing: 300,
  shake: 320,
  cameraBack: [1800, 2500],
  total: 2500,
};

// Each gag gets its own beat. The anvil hangs in frame before it drops and
// the cannon's fuse burns longer (both push impact later); pancakes and the
// trapdoor's "look down" hold the victim before it flies, so they end later.
const FINISHER_TIMING_OVERRIDES = {
  trapdoor: { cameraBack: [2000, 2650], total: 2650 },
  hammer: { cameraBack: [2000, 2700], total: 2700 },
  anvil: { windup: [380, 900], impact: 1060, toolOut: [1350, 1580], cameraBack: [2150, 2850], total: 2850 },
  cannon: { windup: [380, 1150], impact: 1290, toolOut: [1580, 1810], cameraBack: [2050, 2700], total: 2700 },
  magician: { cameraBack: [2250, 2950], total: 2950 },
  vampire: { windup: [380, 700], cameraBack: [2050, 2750], total: 2750 },
  ufo: { cameraBack: [2350, 3050], total: 3050 },
};

export function finisherTiming(finisherId) {
  const overrides = FINISHER_TIMING_OVERRIDES[finisherId];
  return overrides ? { ...FINISHER_TIMING, ...overrides } : FINISHER_TIMING;
}

export const LITE_FINISHER_TIMING = {
  impact: 0,
  hitStop: 0,
  flight: 850,
  landing: 220,
  shake: 0,
  total: 1070,
};

// How long (actionTime ms after impact) the victim stays put before its
// flight home starts: lying flat (hammer, anvil), hanging over the pit, a
// freshly conjured rabbit twitching its nose, bats swirling out of the
// smoke, or being beamed up into a UFO.
export const FINISHER_LAUNCH_DELAY = { hammer: 380, anvil: 420, trapdoor: 380, magician: 600, vampire: 260, ufo: 560 };

const launchDelay = (finisherId) => FINISHER_LAUNCH_DELAY[finisherId] || 0;

// Animation clock: wall time with the hit-stop cut out after impact.
export function actionTime(t, timing) {
  if (t <= timing.impact) return t;
  return Math.max(timing.impact, t - timing.hitStop);
}

// actionTime of the victim touching down at home. `finisherId` is null for
// the lite version.
export function landingTime(finisherId, timing) {
  return timing.impact + launchDelay(finisherId) + timing.flight;
}

// Camera shake amplitude (world units), decaying after impact.
export function cameraShake(t, timing) {
  const since = t - timing.impact;
  if (!timing.shake || since < 0 || since > timing.shake) return 0;
  return 0.09 * Math.pow(1 - (since / timing.shake), 2);
}

// Hit-stop squash: 1 on the impact frame (and so held through the freeze),
// relaxing over the next 150ms. Tools squash on contact with this.
const impactSquash = (t, T) => (t < T.impact ? 0 : 1 - easeInOut(phase(t, [T.impact, T.impact + 150])));

// ── Materials ───────────────────────────────────────────────────────────
const TOOL_COLORS = {
  'finisher-metal': '#4a4d5a',
  'finisher-steel': '#b8bec8',
  'finisher-knob': '#d7263d',
  'finisher-pit': '#0d0b10',
  'finisher-door': '#9a6a3c',
  'finisher-mallet': '#c08a52',
  'finisher-anvil': '#3b3f4a',
  'finisher-jack': '#d7263d',
  'finisher-lid': '#f5c542',
  'finisher-glove': '#e0262f',
  'finisher-cuff': '#fff8ec',
  'finisher-iron': '#2c2f38',
  'finisher-carriage': '#7a4a26',
  'finisher-spark': '#ffb627',
  'finisher-mallet-band': '#5b3a22',
  'finisher-bat': '#d9a066',
  'finisher-bat-grip': '#2a2a33',
  'finisher-ball': '#2b3a8c',
  'finisher-ball-hole': '#12162e',
  'finisher-pan-handle': '#6b3f22',
  'finisher-pan-inside': '#55596a',
  'finisher-golf-head': '#9aa1ad',
  'finisher-racket': '#2f6fd6',
  'finisher-strings': '#f2efe2',
  'finisher-wand': '#17151c',
  'finisher-wand-tip': '#fff8ec',
  'finisher-sparkle': '#ffd23f',
  'finisher-rabbit': '#f6f3ee',
  'finisher-rabbit-pink': '#ffaec4',
  'finisher-rabbit-eye': '#17151c',
  'finisher-bomb': '#2d2438',
  'finisher-flyer': '#2b2233',
  'finisher-flyer-wing': '#6b5486',
  'finisher-saucer': '#a7b0c2',
  'finisher-saucer-dome': '#8fe3ff',
  'finisher-saucer-light': '#ffe14d',
};

const toolMaterial = (kit, key) => kit.createToonMaterial(key, { color: TOOL_COLORS[key] });

// See-through puffs (cannon smoke, landing dust) fade by opacity.
const puffMaterial = (kit, key, color) => kit.createToonMaterial(key, { color, transparent: true, opacity: 0.9, depthWrite: false });

// ── Stage frame ─────────────────────────────────────────────────────────
// Tools are built in a "stage" frame: origin at the victim (at its base
// height), +Z the hit direction (toward its home), the attacker standing at
// z = -STAGE_GAP. Each tool is wrapped in a pivot group the pose function
// rotates/moves. The camera always sees the stage from its -X side (App.vue
// mirrors the stage when it doesn't), so tools beside the pawns go on -X.
export const STAGE_GAP = 0.6; // victim scoots this far off the attacker's square

// Trapdoor hatch: a square hole in a metal frame, two doors that drop open
// into the pit. Doors (and the victim, during a trapdoor) draw at
// TRAPDOOR_ORDER, after the pit's stencil mask and walls.
const HATCH_SIZE = 0.6;
const HATCH_RIM = 0.05;
const HATCH_DOOR_TOP = 0.022;
const PIT_DEPTH = 1.4;
export const TRAPDOOR_ORDER = 5;

function buildHatchFrameGeometry(pad = 0) {
  const outer = HATCH_SIZE + (HATCH_RIM * 2);
  const mid = (HATCH_SIZE + HATCH_RIM) / 2;
  const h = 0.026 + (pad * 2);
  return mergeGeometries([
    new THREE.BoxGeometry(outer + (pad * 2), h, HATCH_RIM + (pad * 2)).translate(0, 0.013, mid),
    new THREE.BoxGeometry(outer + (pad * 2), h, HATCH_RIM + (pad * 2)).translate(0, 0.013, -mid),
    new THREE.BoxGeometry(HATCH_RIM + (pad * 2), h, HATCH_SIZE).translate(mid, 0.013, 0),
    new THREE.BoxGeometry(HATCH_RIM + (pad * 2), h, HATCH_SIZE).translate(-mid, 0.013, 0),
  ].map((geometry) => geometry.toNonIndexed()));
}

// One door leaf: from its hinge (origin, top edge) across half the hole.
function buildHatchDoorGeometry(pad = 0) {
  const width = (HATCH_SIZE / 2) - 0.006;
  return new THREE.BoxGeometry(width + (pad * 2), 0.022 + (pad * 2), HATCH_SIZE - 0.01 + (pad * 2)).translate(width / 2, -0.011, 0);
}

// Mallet: gripped low behind-left of the attacker, the handle yawed in so
// the head lands on the victim and the overhead swing clears the attacker's
// head. Head axis along the handle-perpendicular, so it lands face-down.
const HAMMER_GRIP = new THREE.Vector3(-0.4, 0.45, -0.8);
const HAMMER_REACH = Math.hypot(HAMMER_GRIP.x, HAMMER_GRIP.z);
const HAMMER_YAW = Math.atan2(-HAMMER_GRIP.x, -HAMMER_GRIP.z);

function buildMalletHeadGeometry(pad = 0) {
  return new THREE.CylinderGeometry(0.22 + pad, 0.22 + pad, 0.5 + (pad * 2), 20);
}

// Anvil: base, waist, face and horn, merged; origin at the bottom center.
function buildAnvilGeometry(pad = 0) {
  const p2 = pad * 2;
  return mergeGeometries([
    new THREE.BoxGeometry(0.5 + p2, 0.12 + p2, 0.32 + p2).translate(0, 0.06, 0),
    new THREE.BoxGeometry(0.28 + p2, 0.16 + p2, 0.2 + p2).translate(0, 0.2, 0),
    new THREE.BoxGeometry(0.6 + p2, 0.14 + p2, 0.34 + p2).translate(0, 0.34, 0),
    new THREE.ConeGeometry(0.1 + pad, 0.3 + p2, 12).rotateZ(-Math.PI / 2).translate(0.45, 0.35, 0),
  ].map((geometry) => geometry.toNonIndexed()));
}

// Spring glove: the box sits at the tool origin; the arm leaves its top and
// aims at the victim's side, facing the box.
const JACK_BOX = 0.3;
const GLOVE_RADIUS = 0.15;
const GLOVE_ARM_ORIGIN = new THREE.Vector3(0, JACK_BOX + 0.01, 0);
const JACK_POSITION = new THREE.Vector3(-0.6, 0, -0.7);
// Glove center at impact (stage frame): touching the victim's body, on the
// side facing the box.
const GLOVE_TARGET = (() => {
  const side = new THREE.Vector3(JACK_POSITION.x, 0, JACK_POSITION.z).normalize();
  return side.multiplyScalar(0.14 + GLOVE_RADIUS).setY(0.5);
})();
const GLOVE_REACH = GLOVE_TARGET.clone().sub(JACK_POSITION).sub(GLOVE_ARM_ORIGIN);

function buildCoilGeometry() {
  // Unit-length helix along +Z; the pose scales it to the arm's extension.
  const turns = 7;
  const points = [];
  for (let i = 0; i <= turns * 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * 0.05, Math.sin(a) * 0.05, i / (turns * 12)));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), turns * 12, 0.012, 5, false);
}

function buildGloveGeometry() {
  return mergeGeometries([
    new THREE.SphereGeometry(GLOVE_RADIUS, 16, 12).scale(1, 0.9, 1.1),
    new THREE.SphereGeometry(0.06, 10, 8).translate(0.12, 0.03, -0.03),
  ]);
}

// Cannon: behind the attacker on the camera side, aimed past it at the
// victim (the tool turns its +Z onto the victim). The barrel pivots at its
// trunnions, pitched up just enough that the ball flies straight into the
// victim's middle; it's fired CANNON_FIRE_LEAD ms before impact.
const CANNON_POSITION = { x: -0.62, z: -1.12 };
const CANNON_YAW = Math.atan2(-CANNON_POSITION.x, -CANNON_POSITION.z);
const CANNON_RANGE = Math.hypot(CANNON_POSITION.x, CANNON_POSITION.z);
const CANNON_TRUNNION_Y = 0.27;
const CANNON_BARREL_LENGTH = 0.55;
const CANNONBALL_RADIUS = 0.08;
// Where the ball meets the victim's body, along the aim.
const CANNONBALL_HIT = { y: 0.45, z: CANNON_RANGE - 0.14 - CANNONBALL_RADIUS };
const CANNON_PITCH = -Math.atan2(CANNONBALL_HIT.y - CANNON_TRUNNION_Y, CANNONBALL_HIT.z);
const CANNON_MUZZLE = {
  y: CANNON_TRUNNION_Y - (Math.sin(CANNON_PITCH) * CANNON_BARREL_LENGTH),
  z: Math.cos(CANNON_PITCH) * CANNON_BARREL_LENGTH,
};
const CANNON_FIRE_LEAD = 110;

function buildBarrelGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.CylinderGeometry(0.1 + pad, 0.135 + pad, 0.7 + (pad * 2), 16).rotateX(Math.PI / 2).translate(0, 0, 0.2),
    new THREE.TorusGeometry(0.105 + pad, 0.025 + pad, 6, 16).translate(0, 0, CANNON_BARREL_LENGTH),
    new THREE.SphereGeometry(0.075 + pad, 10, 8).translate(0, 0, -0.17),
  ].map((geometry) => geometry.toNonIndexed()));
}

// Bowling: rolls in diagonally from behind the pawns on the far (+X) side —
// from the camera side it would fill the close-up — and touches the victim
// at travel 1.
const BOWLING_FROM = { x: 3, z: -1.2 };
const BOWLING_PATH = { x: -2.8, z: 1.1 };

// A cluster of spheres: cannon smoke and landing dust.
function buildPuffGeometry() {
  return mergeGeometries([
    new THREE.SphereGeometry(0.16, 10, 8),
    new THREE.SphereGeometry(0.12, 10, 8).translate(0.13, 0.05, -0.04),
    new THREE.SphereGeometry(0.12, 10, 8).translate(-0.12, 0.04, 0.03),
    new THREE.SphereGeometry(0.1, 10, 8).translate(0.02, 0.13, 0.05),
  ]);
}

// A ring of small puffs kicked up around a landing pawn's base.
function buildDustGeometry() {
  const parts = [];
  for (let i = 0; i < 7; i += 1) {
    const angle = (i / 7) * Math.PI * 2;
    parts.push(new THREE.SphereGeometry(0.07 + (0.02 * (i % 2)), 8, 6).translate(Math.cos(angle) * 0.26, 0.05, Math.sin(angle) * 0.26));
  }
  return mergeGeometries(parts);
}

// Magic wand: held at the attacker's side, pointing at the victim (+Z).
const WAND_GRIP = new THREE.Vector3(-0.24, 0.5, -STAGE_GAP + 0.08);
const WAND_LENGTH = 0.46;
const SPARKLES = 4;

function buildSparkleGeometry() {
  return new THREE.OctahedronGeometry(0.065).scale(1, 1.4, 0.5);
}

// The conjured rabbit (built facing +Z, feet at y 0): a body, a head, ears
// (pink inside), a tail; one white mesh with a baked outline plus details.
function buildRabbitGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.SphereGeometry(0.17 + pad, 16, 12).scale(1, 0.9, 1.15).translate(0, 0.16, -0.02),
    new THREE.SphereGeometry(0.12 + pad, 16, 12).translate(0, 0.34, 0.12),
    ...[-1, 1].map((side) => new THREE.SphereGeometry(0.045 + pad, 10, 8).scale(0.8, 3.2, 0.5)
        .rotateZ(-side * 0.2).rotateX(-0.25).translate(side * 0.05, 0.56, 0.08)),
    new THREE.SphereGeometry(0.06 + pad, 10, 8).translate(0, 0.17, -0.22),
  ]);
}

function buildRabbitDetailGeometry() {
  return mergeGeometries([
    ...[-1, 1].map((side) => new THREE.SphereGeometry(0.03, 8, 6).scale(0.7, 3.1, 0.3)
        .rotateZ(-side * 0.2).rotateX(-0.25).translate(side * 0.05, 0.56, 0.1)),
    new THREE.SphereGeometry(0.022, 8, 6).translate(0, 0.35, 0.24),
  ]);
}

function buildRabbitEyesGeometry() {
  return mergeGeometries([-1, 1].map((side) => new THREE.SphereGeometry(0.018, 8, 6).translate(side * 0.055, 0.385, 0.21)));
}

// Smoke bomb: a round bomb with a fuse, lobbed onto the victim's feet.
const BOMB_FROM = new THREE.Vector3(-0.22, 0.55, -STAGE_GAP + 0.05);
const BOMB_RADIUS = 0.1;
const BATS = 7;
const BAT_SIZE = 1.7;

// A bat: round body with ears; its wings are a separate mesh, built as a
// shallow V so flipping its y scale flaps them.
function buildFlyerBodyGeometry() {
  return mergeGeometries([
    new THREE.SphereGeometry(0.06, 10, 8).scale(1, 1.15, 0.9),
    ...[-1, 1].map((side) => new THREE.ConeGeometry(0.02, 0.05, 4).translate(side * 0.03, 0.075, 0)),
  ].map((geometry) => geometry.toNonIndexed()));
}

function buildFlyerWingsGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0.03, 0.01);
  shape.lineTo(0.12, 0.08);
  shape.lineTo(0.2, 0.05);
  shape.lineTo(0.16, 0.0);
  shape.lineTo(0.13, 0.02);
  shape.lineTo(0.1, -0.03);
  shape.lineTo(0.07, -0.01);
  shape.lineTo(0.04, -0.04);
  const right = new THREE.ShapeGeometry(shape);
  const left = new THREE.ShapeGeometry(shape).scale(-1, 1, 1);
  return mergeGeometries([right, left].map((geometry) => geometry.toNonIndexed()));
}

// UFO: a saucer that hovers over the victim (stage frame), beams it up,
// flies to its home and beams it down there. App.vue sets `home`.
const UFO_HOVER = 1.5;
const UFO_DESCEND = 280; // ms the victim takes to be set down at home
const UFO_LIFT = 0.95; // how high the beam lifts the victim (into the saucer)

function buildSaucerGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.SphereGeometry(0.42 + pad, 28, 10).scale(1, 0.22, 1),
    new THREE.CylinderGeometry(0.14 + pad, 0.2 + pad, 0.08 + (pad * 2), 20).translate(0, -0.1, 0),
  ].map((geometry) => geometry.toNonIndexed()));
}

function buildSaucerLightsGeometry() {
  const parts = [];
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    parts.push(new THREE.SphereGeometry(0.028, 8, 6).translate(Math.cos(angle) * 0.36, -0.02, Math.sin(angle) * 0.36));
  }
  return mergeGeometries(parts);
}

// Swing tools (bat, pan, golf, racket): parts are [geometryKey, build,
// materialKey, outlineScale?, buildOutline?] (a baked outline when the shape
// can't be outlined by scaling). Held at the attacker's flank (the attacker
// stands at z = -STAGE_GAP), so the swing pivots around the swinger instead
// of spearing through it.
function buildSwingTool(kit, parts) {
  const pivot = markRaw(new THREE.Group());
  const body = markRaw(new THREE.Group());
  parts.forEach(([key, build, materialKey, outlineScale, buildOutline]) => {
    const mesh = kit.createOutlinedMesh(
        kit.getSharedGeometry(key, build),
        toolMaterial(kit, materialKey),
        { castShadow: true, outlineScale },
    );
    if (buildOutline) {
      mesh.add(kit.createBakedOutline(kit.getSharedGeometry(`${key}-outline`, buildOutline)));
    }
    body.add(mesh);
  });
  pivot.add(body);
  pivot.position.set(-0.3, 0.48, -STAGE_GAP + 0.05);
  pivot.userData.bat = body;
  return pivot;
}

// Frying pan: a shallow dish (bottom toward +Z) with a rolled rim.
function buildPanGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.CylinderGeometry(0.18 + pad, 0.21 + pad, 0.07 + (pad * 2), 24, 1, true).rotateX(Math.PI / 2).translate(0.62, 0, -0.005),
    new THREE.CylinderGeometry(0.18 + pad, 0.18 + pad, 0.012 + (pad * 2), 24).rotateX(Math.PI / 2).translate(0.62, 0, 0.03),
    new THREE.TorusGeometry(0.21 + pad, 0.014 + pad, 6, 24).translate(0.62, 0, -0.04),
  ].map((geometry) => geometry.toNonIndexed()));
}

// ── Tools ───────────────────────────────────────────────────────────────
const TOOL_BUILDERS = {
  shove: () => null,

  // A floor lever beside the attacker and a trapdoor under the victim. The
  // container stays at scale 1; the pose pops the two parts in separately.
  trapdoor(kit) {
    const tool = markRaw(new THREE.Group());

    const lever = markRaw(new THREE.Group());
    const base = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-lever-base', () => new THREE.BoxGeometry(0.16, 0.06, 0.2)),
        toolMaterial(kit, 'finisher-metal'),
        { castShadow: true, outlineScale: 1.12 },
    );
    base.position.y = 0.03;
    const arm = markRaw(new THREE.Group());
    const stick = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-lever-stick', () => new THREE.CylinderGeometry(0.018, 0.018, 0.5, 8).translate(0, 0.25, 0)),
        toolMaterial(kit, 'finisher-steel'),
        { castShadow: true, outlineScale: { x: 1.35, y: 1.02, z: 1.35 } },
    );
    const knob = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-lever-knob', () => new THREE.SphereGeometry(0.05, 12, 10)),
        toolMaterial(kit, 'finisher-knob'),
        { castShadow: true, outlineScale: 1.12 },
    );
    knob.position.y = 0.5;
    arm.add(stick, knob);
    arm.position.y = 0.05;
    lever.add(base, arm);
    // At the attacker's flank, set back so the pull reads side-on.
    lever.position.set(-0.36, 0, -STAGE_GAP - 0.05);

    // Under the victim's feet: a square hatch (metal frame, two wooden doors
    // hinged on its ±X edges) over a pit that opens into the board. The pit
    // is faked with the stencil buffer: an invisible mask marks the hole's
    // pixels, then the pit's inner walls draw there over the board (ignoring
    // its depth). Doors and the falling victim draw after it (TRAPDOOR_ORDER),
    // so they show inside the hole while the board still hides them anywhere
    // else below its surface.
    const door = markRaw(new THREE.Group());
    const frame = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-hatch-frame', () => buildHatchFrameGeometry()),
        toolMaterial(kit, 'finisher-metal'),
        { receiveShadow: true },
    );
    frame.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-hatch-frame-outline', () => buildHatchFrameGeometry(0.012))));
    const mask = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-pit-mask', () => new THREE.PlaneGeometry(HATCH_SIZE, HATCH_SIZE).rotateX(-Math.PI / 2)),
        kit.getSharedMaterial('finisher-pit-mask', () => markRaw(new THREE.MeshBasicMaterial({
          colorWrite: false,
          depthWrite: false,
          stencilWrite: true,
          stencilRef: 1,
          stencilFunc: THREE.AlwaysStencilFunc,
          stencilZPass: THREE.ReplaceStencilOp,
        }))),
    ));
    mask.position.y = 0.003;
    mask.renderOrder = TRAPDOOR_ORDER - 2;
    const pit = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-pit', () => new THREE.BoxGeometry(HATCH_SIZE, PIT_DEPTH, HATCH_SIZE).translate(0, -PIT_DEPTH / 2, 0)),
        kit.createToonMaterial('finisher-pit-walls', {
          color: '#2a2230',
          side: THREE.BackSide,
          depthFunc: THREE.AlwaysDepth,
          stencilWrite: true,
          stencilRef: 1,
          stencilFunc: THREE.EqualStencilFunc,
        }),
    ));
    pit.renderOrder = TRAPDOOR_ORDER - 1;
    const doorGeometry = kit.getSharedGeometry('finisher-hatch-door', () => buildHatchDoorGeometry());
    const doorOutline = kit.getSharedGeometry('finisher-hatch-door-outline', () => buildHatchDoorGeometry(0.012));
    // Each door hangs from its hinge and spans half the hole toward the
    // middle; `side` mirrors the right one.
    const doors = [-1, 1].map((side) => {
      const hinge = markRaw(new THREE.Group());
      hinge.position.set(side * (HATCH_SIZE / 2), HATCH_DOOR_TOP, 0);
      hinge.scale.x = -side;
      const leaf = markRaw(new THREE.Mesh(doorGeometry, toolMaterial(kit, 'finisher-door')));
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      leaf.renderOrder = TRAPDOOR_ORDER;
      const outline = kit.createBakedOutline(doorOutline);
      leaf.add(outline);
      hinge.add(leaf);
      return hinge;
    });
    door.add(mask, pit, frame, ...doors);

    tool.add(lever, door);
    tool.userData = { lever, arm, door, doors };
    return tool;
  },

  // Swung tools share the bat's swing: each lies along +X from the pivot
  // (the grip), its business end at the tip, any striking face facing +Z.
  bat: (kit) => buildSwingTool(kit, [
    // Tapered along +X: thin handle at the pivot, fat barrel at the tip
    // (rotateZ turns the cylinder's top end to -X).
    ['finisher-bat', () => new THREE.CylinderGeometry(0.028, 0.075, 0.95, 12).rotateZ(Math.PI / 2).translate(0.475, 0, 0), 'finisher-bat', 1.08],
    ['finisher-bat-knob', () => new THREE.CylinderGeometry(0.045, 0.045, 0.03, 10).rotateZ(Math.PI / 2), 'finisher-bat-grip', 1.15],
    ['finisher-bat-grip', () => new THREE.CylinderGeometry(0.034, 0.031, 0.22, 10).rotateZ(Math.PI / 2).translate(0.12, 0, 0), 'finisher-bat-grip', 1.1],
  ]),

  pan: (kit) => buildSwingTool(kit, [
    ['finisher-pan-handle', () => new THREE.CylinderGeometry(0.03, 0.024, 0.4, 10).rotateZ(Math.PI / 2).translate(0.2, 0, 0), 'finisher-pan-handle', { x: 1.03, y: 1.3, z: 1.3 }],
    // The dish faces +Z (its bottom slaps the victim).
    ['finisher-pan', () => buildPanGeometry(), 'finisher-iron', null, () => buildPanGeometry(0.012)],
    ['finisher-pan-inside', () => new THREE.CylinderGeometry(0.19, 0.19, 0.01, 24).rotateX(Math.PI / 2).translate(0.62, 0, 0.022), 'finisher-pan-inside'],
  ]),

  golf: (kit) => buildSwingTool(kit, [
    ['finisher-golf-shaft', () => new THREE.CylinderGeometry(0.014, 0.014, 0.88, 8).rotateZ(Math.PI / 2).translate(0.44, 0, 0), 'finisher-steel', { x: 1.02, y: 1.5, z: 1.5 }],
    ['finisher-golf-grip', () => new THREE.CylinderGeometry(0.026, 0.022, 0.24, 10).rotateZ(Math.PI / 2).translate(0.12, 0, 0), 'finisher-bat-grip', { x: 1.04, y: 1.3, z: 1.3 }],
    // Clubhead: a chunky block hanging below the tip, its face to +Z.
    ['finisher-golf-head', () => new THREE.BoxGeometry(0.2, 0.08, 0.07).translate(0.93, -0.02, 0.005), 'finisher-golf-head', null, () => new THREE.BoxGeometry(0.224, 0.104, 0.094).translate(0.93, -0.02, 0.005)],
  ]),

  racket: (kit) => buildSwingTool(kit, [
    ['finisher-racket-handle', () => new THREE.CylinderGeometry(0.028, 0.024, 0.32, 10).rotateZ(Math.PI / 2).translate(0.16, 0, 0), 'finisher-bat-grip', { x: 1.03, y: 1.3, z: 1.3 }],
    ['finisher-racket-throat', () => new THREE.CylinderGeometry(0.016, 0.016, 0.14, 8).rotateZ(Math.PI / 2).translate(0.38, 0, 0), 'finisher-racket', { x: 1.01, y: 1.5, z: 1.5 }],
    // Oval frame and string bed in the XY plane, so the face is +Z.
    ['finisher-racket-frame', () => new THREE.TorusGeometry(0.17, 0.018, 8, 28).scale(1.25, 1, 1).translate(0.66, 0, 0), 'finisher-racket', null, () => new THREE.TorusGeometry(0.17, 0.028, 8, 28).scale(1.25, 1, 1).translate(0.66, 0, 0)],
    ['finisher-racket-strings', () => new THREE.CylinderGeometry(0.165, 0.165, 0.006, 24).rotateX(Math.PI / 2).scale(1.25, 1, 1).translate(0.66, 0, 0), 'finisher-strings'],
  ]),

  bowling(kit) {
    const pivot = markRaw(new THREE.Group());
    const ball = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-ball', () => new THREE.SphereGeometry(0.26, 20, 16)),
        toolMaterial(kit, 'finisher-ball'),
        { castShadow: true, outlineScale: 1.05 },
    );
    const holeGeometry = kit.getSharedGeometry('finisher-ball-hole', () => new THREE.SphereGeometry(0.035, 8, 8));
    const holeMaterial = toolMaterial(kit, 'finisher-ball-hole');
    [[-0.06, 0.2], [0.06, 0.2], [0, 0.1]].forEach(([x, y]) => {
      const hole = markRaw(new THREE.Mesh(holeGeometry, holeMaterial));
      hole.position.set(x, y, Math.sqrt(Math.max(0, 0.26 * 0.26 - x * x - y * y)) - 0.012);
      ball.add(hole);
    });
    // The pivot faces the travel direction (+Z) so it can squash/stretch
    // along it; the ball rolls inside it.
    pivot.add(ball);
    pivot.userData.ball = ball;
    pivot.position.set(BOWLING_FROM.x, 0.26, BOWLING_FROM.z);
    pivot.rotation.y = Math.atan2(BOWLING_PATH.x, BOWLING_PATH.z);
    return pivot;
  },

  hammer(kit) {
    const pivot = markRaw(new THREE.Group());
    const head = markRaw(new THREE.Group());
    head.position.z = HAMMER_REACH;
    const block = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-mallet-head', () => buildMalletHeadGeometry()),
        toolMaterial(kit, 'finisher-mallet'),
        { castShadow: true },
    );
    block.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-mallet-head-outline', () => buildMalletHeadGeometry(0.012))));
    // Dark bands just in from each face (no outline of their own).
    const bands = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-mallet-bands', () => mergeGeometries([0.17, -0.17].map((y) => (
          new THREE.CylinderGeometry(0.228, 0.228, 0.05, 20).translate(0, y, 0)
        )))),
        toolMaterial(kit, 'finisher-mallet-band'),
    ));
    head.add(block, bands);
    const handle = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-mallet-handle', () => (
          new THREE.CylinderGeometry(0.04, 0.034, HAMMER_REACH + 0.15, 10).rotateX(Math.PI / 2).translate(0, 0, (HAMMER_REACH - 0.15) / 2)
        )),
        toolMaterial(kit, 'finisher-bat'),
        { castShadow: true, outlineScale: { x: 1.3, y: 1.3, z: 1.01 } },
    );
    pivot.add(head, handle);
    pivot.position.copy(HAMMER_GRIP);
    // Yaw first (aim at the victim), then the pose pitches about the yawed X.
    pivot.rotation.order = 'YXZ';
    pivot.rotation.y = HAMMER_YAW;
    pivot.userData.head = head;
    return pivot;
  },

  anvil(kit) {
    const tool = markRaw(new THREE.Group());
    // A fake drop shadow that grows as the anvil nears (the real shadow map
    // would only catch it at the last moment).
    const shadow = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-drop-shadow', () => new THREE.CircleGeometry(0.4, 24).rotateX(-Math.PI / 2)),
        kit.createToonMaterial('finisher-drop-shadow', { color: '#000000', transparent: true, opacity: 0.35, depthWrite: false }),
    ));
    shadow.position.y = 0.006;
    const anvil = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-anvil', () => buildAnvilGeometry()),
        toolMaterial(kit, 'finisher-anvil'),
        { castShadow: true },
    );
    anvil.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-anvil-outline', () => buildAnvilGeometry(0.012))));
    tool.add(shadow, anvil);
    tool.userData = { shadow, anvil };
    return tool;
  },

  glove(kit) {
    const tool = markRaw(new THREE.Group());
    tool.position.copy(JACK_POSITION);
    // Turned so the box's front faces the victim.
    const box = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-jack-box', () => new THREE.BoxGeometry(JACK_BOX, JACK_BOX, JACK_BOX).translate(0, JACK_BOX / 2, 0)),
        toolMaterial(kit, 'finisher-jack'),
        { castShadow: true, outlineScale: 1.06 },
    );
    box.rotation.y = Math.atan2(-JACK_POSITION.x, -JACK_POSITION.z);
    // Lid hinged on the box's back edge.
    const hinge = markRaw(new THREE.Group());
    hinge.position.set(0, JACK_BOX, -JACK_BOX / 2);
    const lid = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-jack-lid', () => new THREE.BoxGeometry(JACK_BOX + 0.03, 0.03, JACK_BOX + 0.03).translate(0, 0.015, (JACK_BOX / 2))),
        toolMaterial(kit, 'finisher-lid'),
        { outlineScale: 1.08 },
    );
    hinge.add(lid);
    box.add(hinge);

    const arm = markRaw(new THREE.Group());
    arm.position.copy(GLOVE_ARM_ORIGIN);
    arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), GLOVE_REACH.clone().normalize());
    const coil = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-coil', () => buildCoilGeometry()),
        toolMaterial(kit, 'finisher-steel'),
    ));
    const glove = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-glove', () => buildGloveGeometry()),
        toolMaterial(kit, 'finisher-glove'),
        { castShadow: true, outlineScale: 1.08 },
    );
    const cuff = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-glove-cuff', () => new THREE.CylinderGeometry(0.09, 0.1, 0.1, 14).rotateX(Math.PI / 2).translate(0, 0, -GLOVE_RADIUS)),
        toolMaterial(kit, 'finisher-cuff'),
        { outlineScale: 1.1 },
    );
    glove.add(cuff);
    arm.add(coil, glove);
    tool.add(box, arm);
    tool.userData = { box, hinge, arm, coil, glove, reach: GLOVE_REACH.length() };
    return tool;
  },

  cannon(kit) {
    const tool = markRaw(new THREE.Group());
    tool.position.set(CANNON_POSITION.x, 0, CANNON_POSITION.z);
    tool.rotation.y = CANNON_YAW;
    // Everything but the ball recoils together.
    const body = markRaw(new THREE.Group());
    const carriage = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-carriage', () => new THREE.BoxGeometry(0.26, 0.12, 0.44).translate(0, 0.16, -0.04)),
        toolMaterial(kit, 'finisher-carriage'),
        { castShadow: true, outlineScale: 1.06 },
    );
    const wheelGeometry = kit.getSharedGeometry('finisher-wheel', () => new THREE.CylinderGeometry(0.13, 0.13, 0.05, 16).rotateZ(Math.PI / 2));
    [-0.17, 0.17].forEach((x) => {
      const wheel = kit.createOutlinedMesh(wheelGeometry, toolMaterial(kit, 'finisher-iron'), { castShadow: true, outlineScale: 1.1 });
      wheel.position.set(x, 0.13, 0);
      body.add(wheel);
    });
    const barrel = markRaw(new THREE.Group());
    barrel.position.y = CANNON_TRUNNION_Y;
    const tube = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-barrel', () => buildBarrelGeometry()),
        toolMaterial(kit, 'finisher-iron'),
        { castShadow: true },
    );
    tube.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-barrel-outline', () => buildBarrelGeometry(0.012))));
    const spark = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-spark', () => new THREE.OctahedronGeometry(0.05)),
        toolMaterial(kit, 'finisher-spark'),
    ));
    spark.position.set(0, 0.12, -0.2);
    const smoke = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-puff', () => buildPuffGeometry()),
        puffMaterial(kit, 'finisher-smoke', '#f4f1ea'),
    ));
    smoke.position.z = CANNON_BARREL_LENGTH + 0.12;
    barrel.add(tube, spark, smoke);
    barrel.rotation.x = CANNON_PITCH;
    body.add(carriage, barrel);
    const ball = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-cannonball', () => new THREE.SphereGeometry(CANNONBALL_RADIUS, 16, 12)),
        toolMaterial(kit, 'finisher-iron'),
        { castShadow: true, outlineScale: 1.12 },
    );
    tool.add(body, ball);
    tool.userData = { body, barrel, tube, spark, smoke, ball };
    return tool;
  },

  // A wand at the attacker's side; sparkles that spiral from its tip onto the
  // victim; the poof cloud the victim vanishes into.
  magician(kit) {
    const tool = markRaw(new THREE.Group());
    const wand = markRaw(new THREE.Group());
    wand.position.copy(WAND_GRIP);
    wand.rotation.order = 'YXZ';
    wand.rotation.y = Math.atan2(-WAND_GRIP.x, -WAND_GRIP.z);
    const stick = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-wand', () => new THREE.CylinderGeometry(0.014, 0.018, WAND_LENGTH, 8).rotateX(Math.PI / 2).translate(0, 0, WAND_LENGTH / 2)),
        toolMaterial(kit, 'finisher-wand'),
        { castShadow: true, outlineScale: { x: 1.4, y: 1.4, z: 1.01 } },
    );
    const tip = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-wand-tip', () => new THREE.CylinderGeometry(0.02, 0.02, 0.09, 8).rotateX(Math.PI / 2)),
        toolMaterial(kit, 'finisher-wand-tip'),
        { outlineScale: { x: 1.35, y: 1.35, z: 1.08 } },
    );
    tip.position.z = WAND_LENGTH - 0.04;
    wand.add(stick, tip);
    const sparkles = [];
    for (let i = 0; i < SPARKLES; i += 1) {
      const sparkle = markRaw(new THREE.Mesh(
          kit.getSharedGeometry('finisher-sparkle', () => buildSparkleGeometry()),
          toolMaterial(kit, 'finisher-sparkle'),
      ));
      sparkles.push(sparkle);
      tool.add(sparkle);
    }
    const poof = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-puff', () => buildPuffGeometry()),
        puffMaterial(kit, 'finisher-poof', '#fbe8ff'),
    ));
    poof.position.y = 0.4;
    tool.add(wand, poof);
    tool.userData = { wand, sparkles, poof };
    return tool;
  },

  // A smoke bomb lobbed from the attacker; the purple cloud; the bats that
  // burst out of it and flutter off to the victim's home (App.vue sets
  // `home`, in the stage frame).
  vampire(kit) {
    const tool = markRaw(new THREE.Group());
    const bomb = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-bomb', () => mergeGeometries([
          new THREE.SphereGeometry(BOMB_RADIUS, 14, 10),
          new THREE.CylinderGeometry(0.035, 0.04, 0.04, 10).translate(0, BOMB_RADIUS, 0),
          new THREE.CylinderGeometry(0.008, 0.008, 0.07, 5).rotateZ(0.5).translate(0.015, BOMB_RADIUS + 0.045, 0),
        ].map((geometry) => geometry.toNonIndexed()))),
        toolMaterial(kit, 'finisher-bomb'),
        { castShadow: true, outlineScale: 1.1 },
    );
    const spark = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-spark', () => new THREE.OctahedronGeometry(0.05)),
        toolMaterial(kit, 'finisher-spark'),
    ));
    spark.position.set(0.035, BOMB_RADIUS + 0.08, 0);
    spark.scale.setScalar(0.6);
    bomb.add(spark);
    const smoke = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-puff', () => buildPuffGeometry()),
        puffMaterial(kit, 'finisher-bat-smoke', '#7a5a9c'),
    ));
    smoke.position.y = 0.35;
    const bats = [];
    for (let i = 0; i < BATS; i += 1) {
      const bat = markRaw(new THREE.Group());
      const body = kit.createOutlinedMesh(
          kit.getSharedGeometry('finisher-flyer-body', () => buildFlyerBodyGeometry()),
          toolMaterial(kit, 'finisher-flyer'),
          { outlineScale: 1.15 },
      );
      const wings = markRaw(new THREE.Mesh(
          kit.getSharedGeometry('finisher-flyer-wings', () => buildFlyerWingsGeometry()),
          kit.createToonMaterial('finisher-flyer-wing', { color: TOOL_COLORS['finisher-flyer-wing'], side: THREE.DoubleSide }),
      ));
      bat.add(body, wings);
      bat.userData = { wings, seed: i };
      bats.push(bat);
      tool.add(bat);
    }
    tool.add(bomb, smoke);
    tool.userData = { bomb, spark, smoke, bats, home: new THREE.Vector3(0, 0, 4) };
    return tool;
  },

  ufo(kit) {
    const tool = markRaw(new THREE.Group());
    const saucer = markRaw(new THREE.Group());
    const hull = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-saucer', () => buildSaucerGeometry()),
        toolMaterial(kit, 'finisher-saucer'),
        { castShadow: true },
    );
    hull.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-saucer-outline', () => buildSaucerGeometry(0.012))));
    const dome = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-saucer-dome', () => new THREE.SphereGeometry(0.2, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2)),
        toolMaterial(kit, 'finisher-saucer-dome'),
        { outlineScale: 1.06 },
    );
    dome.position.y = 0.05;
    const lights = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-saucer-lights', () => buildSaucerLightsGeometry()),
        toolMaterial(kit, 'finisher-saucer-light'),
    ));
    saucer.add(hull, dome, lights);
    // The tractor beam: an open cone from the saucer's belly to the ground,
    // its height scaled to the saucer's altitude.
    const beam = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('finisher-beam', () => new THREE.CylinderGeometry(0.1, 0.42, 1, 24, 1, true).translate(0, -0.5, 0)),
        kit.getSharedMaterial('finisher-beam', () => markRaw(new THREE.MeshBasicMaterial({
          color: '#c6ff8f', transparent: true, opacity: 0.38, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
        }))),
    ));
    beam.position.y = -0.12;
    saucer.add(beam);
    tool.add(saucer);
    tool.userData = { saucer, lights, beam, home: new THREE.Vector3(0, 0, 4) };
    return tool;
  },
};

export function buildFinisherTool(finisherId, kit) {
  const build = TOOL_BUILDERS[finisherId] || TOOL_BUILDERS.shove;
  return build(kit);
}

// Anvil: drops in from out of frame, hangs there (Road Runner style) while
// the victim looks up, then falls for the last stretch before impact.
const ANVIL_ARRIVE = [520, 640];
const ANVIL_HANG_HEIGHT = 1.9;
const ANVIL_SKY_HEIGHT = 7;

// Tools swung with the bat's swing.
const SWING_TOOLS = ['bat', 'pan', 'golf', 'racket'];

const _wandTip = new THREE.Vector3();
const _batNow = new THREE.Vector3();
const _batNext = new THREE.Vector3();

// A puff that swells from `size` and thins out over `duration` ms, starting
// at since = 0 (hidden before and after).
function posePuff(mesh, since, duration, size, grow) {
  const p = since / duration;
  mesh.visible = p >= 0 && p < 1;
  if (!mesh.visible) {
    return;
  }
  mesh.scale.setScalar(size + (grow * Math.sqrt(p)));
  mesh.material.opacity = 0.95 * (1 - (p * p));
}

// A bat's flight (stage frame): out of the cloud in its own direction and
// up, then a fluttering swoop to the victim's home.
function batPosition(target, seed, t, start, arrive, home, T) {
  const angle = (seed / BATS) * Math.PI * 2;
  const burstEnd = T.impact + 300;
  const spread = { x: Math.cos(angle) * 0.55, y: 0.75 + (0.18 * (seed % 3)), z: Math.sin(angle) * 0.55 };
  const burst = easeOut(phase(t, [start, burstEnd]));
  const fly = easeInOut(phase(t, [burstEnd, arrive]));
  const x = (spread.x * burst) + ((home.x - spread.x) * fly);
  const z = (spread.z * burst) + ((home.z - spread.z) * fly);
  const y = 0.4 + ((spread.y - 0.4) * burst) + ((home.y + 0.5 - spread.y) * fly) + (Math.sin(Math.PI * fly) * 1.2);
  // Each bat flutters on its own little loop.
  const flutter = Math.sin((t * 0.012) + seed) * 0.15 * (1 - fly);
  return target.set(x + flutter, y + (Math.cos((t * 0.017) + (seed * 2)) * 0.08), z - flutter);
}

// Poses the tool at time `t` (actionTime, ms) on timeline `T`. Mutates `tool`.
export function poseFinisherTool(finisherId, tool, t, T) {
  if (!tool) return;
  const popIn = easeOutBack(phase(t, T.toolIn));
  const popOut = 1 - easeIn(phase(t, T.toolOut));
  const scale = Math.max(0.001, Math.min(popIn, popOut));
  tool.scale.setScalar(scale);

  const windup = easeInOut(phase(t, T.windup));
  const strike = easeIn(phase(t, [T.windup[1], T.impact]));
  const follow = easeInOut(phase(t, [T.impact, T.toolOut[1]]));
  const squash = impactSquash(t, T);

  if (finisherId === 'trapdoor') {
    // The parts pop in place (the container's origin is the victim).
    tool.scale.setScalar(1);
    const { lever, arm, door, doors } = tool.userData;
    lever.scale.setScalar(scale);
    // The door outlasts the lever: it slams shut once the victim is through
    // (it hangs, then falls), then shrinks away.
    const fallen = T.impact + TRAPDOOR_HANG + TRAPDOOR_FALL;
    const doorOut = 1 - easeIn(phase(t, [fallen + 160, fallen + 320]));
    door.scale.setScalar(Math.max(0.001, Math.min(popIn, doorOut)));
    // Lever: eased back toward the attacker on the windup, yanked all the
    // way over at impact (with a little spring-back); both doors drop open
    // into the pit, swing there, then spring back up shut.
    arm.rotation.x = (0.5 * windup) - (1.4 * strike) + (0.25 * squash);
    const open = easeOutBack(phase(t, [T.impact, T.impact + 140]));
    const swing = wobble(t - T.impact - 140, 0.22, 0.03, 160);
    const shut = easeIn(phase(t, [fallen + 20, fallen + 140]));
    const angle = ((1.5 * open) + swing) * (1 - shut);
    doors[0].rotation.z = -angle;
    doors[1].rotation.z = angle;
  } else if (SWING_TOOLS.includes(finisherId)) {
    // Rotation about Y sweeps the bat (+X at 0): cocked back behind the
    // attacker, whipped through the victim at impact (pointing at it from the
    // flank, moving along +Z), then a wrap-around follow-through.
    tool.rotation.y = 1.7 + (0.45 * windup) - (3.15 * strike) - (1.0 * follow);
    // Raised on the windup, level through the strike.
    tool.rotation.z = (0.55 * windup) - (0.55 * strike);
    // Smear: stretched along its length mid-swing, squat on contact.
    const smear = Math.sin(Math.PI * phase(t, [T.windup[1], T.impact]));
    tool.userData.bat.scale.set(1 + (0.2 * smear) - (0.1 * squash), 1 + (0.15 * squash), 1 + (0.15 * squash));
  } else if (finisherId === 'hammer') {
    // Rotation about the yawed X: 0 = handle level (head down on the
    // victim), negative raises it up and back. Hoisted overhead, cocked
    // further back on the windup, slammed down, a little rebound, held on the
    // pancake, lifted.
    const rebound = phase(t, [T.impact, T.impact + 160]);
    const lift = easeInOut(phase(t, [T.impact + 280, T.toolOut[1]]));
    tool.rotation.x = -1.9 - (0.7 * windup) + (2.6 * strike)
        - (0.14 * Math.sin(rebound * Math.PI)) - (0.9 * lift);
    // The head squashes flat against the victim (its axis is local Y).
    tool.userData.head.scale.set(1 + (0.18 * squash), 1 - (0.3 * squash), 1 + (0.18 * squash));
  } else if (finisherId === 'anvil') {
    // The parts pop separately (the container's origin is the victim).
    tool.scale.setScalar(1);
    const { shadow, anvil } = tool.userData;
    const arrive = phase(t, ANVIL_ARRIVE);
    const fall = easeIn(phase(t, [T.windup[1], T.impact]));
    // The shadow grows as it arrives overhead, then sharpens as it falls.
    shadow.scale.setScalar(Math.max(0.001, Math.min(popOut, 0.2 + (0.4 * phase(t, [T.toolIn[0], ANVIL_ARRIVE[1]])) + (0.45 * fall))));
    // Out of sight until it drops in; hangs (a nervous sway) in frame; falls
    // on top of the pancake; bounces once and squashes on landing.
    const restY = PANCAKE_HEIGHT * 1.03;
    const hangY = ANVIL_SKY_HEIGHT + ((ANVIL_HANG_HEIGHT - ANVIL_SKY_HEIGHT) * easeOutBack(arrive));
    const bounce = Math.sin(Math.PI * phase(t, [T.impact + 40, T.impact + 220]));
    anvil.scale.set(1 + (0.14 * squash), 1 - (0.25 * squash), 1 + (0.14 * squash));
    if (t < ANVIL_ARRIVE[0]) anvil.scale.setScalar(0.001);
    else if (popOut < 1) anvil.scale.multiplyScalar(Math.max(0.001, popOut));
    anvil.position.y = hangY + ((restY - hangY) * fall) + (0.07 * bounce);
    const hanging = arrive >= 1 && t < T.windup[1];
    anvil.rotation.z = hanging ? 0.06 * Math.sin(t * 0.012) : 0.2 * (1 - arrive) * (1 - fall);
  } else if (finisherId === 'glove') {
    const { box, hinge, arm, coil, glove, reach } = tool.userData;
    // The box rattles through the windup, the lid bursts open and the glove
    // shoots out (overshooting) to land exactly at impact, squashes against
    // the victim, then boings.
    box.rotation.z = 0.07 * Math.sin(t * 0.06) * windup * (1 - strike);
    hinge.rotation.x = -2.1 * easeOutBack(phase(t, [T.windup[1], T.windup[1] + 90]));
    const shoot = easeOutBack(phase(t, [T.windup[1], T.impact]));
    const boing = wobble(t - T.impact, 0.14, 0.035, 220);
    const extension = Math.max(0.02, reach * ((shoot * (1 - (0.35 * follow))) + boing));
    arm.visible = t >= T.windup[1];
    // The coil runs up to the back of the cuff.
    coil.scale.set(1, 1, Math.max(0.02, extension - GLOVE_RADIUS - 0.05));
    glove.position.z = extension;
    glove.scale.set(1 + (0.22 * squash), 1 + (0.22 * squash), 1 - (0.38 * squash));
  } else if (finisherId === 'cannon') {
    const { body, barrel, tube, spark, smoke, ball } = tool.userData;
    // The fuse fizzes and the barrel trembles harder as it burns down; BOOM
    // (just before impact): the barrel bulges, the cannon recoils back
    // kicking up, a smoke puff swells and fades, and the ball streaks into
    // the victim, squashes on it and bounces off to the ground.
    const fire = T.impact - CANNON_FIRE_LEAD;
    const burning = t >= T.toolIn[1] && t < fire;
    const fuse = phase(t, [T.toolIn[1], fire]);
    spark.scale.setScalar(burning ? 0.7 + (0.4 * Math.abs(Math.sin(t * 0.05))) : 0.001);
    const tremble = burning ? 0.025 * fuse * fuse * Math.sin(t * 0.11) : 0;
    const kick = phase(t, [fire, fire + 420]);
    const recoil = kick > 0 ? Math.sin(Math.min(1, kick * 3) * Math.PI / 2) * (1 - easeInOut(kick)) : 0;
    body.position.z = -0.28 * recoil;
    barrel.rotation.x = CANNON_PITCH - (0.35 * recoil) + tremble;
    const bang = t < fire ? 0 : 1 - easeInOut(phase(t, [fire, fire + 150]));
    tube.scale.set(1 + (0.22 * bang), 1 + (0.22 * bang), 1 - (0.12 * bang));
    const puff = phase(t, [fire, fire + 520]);
    smoke.scale.setScalar(puff > 0 && puff < 1 ? 0.3 + (1.3 * Math.sqrt(puff)) : 0.001);
    smoke.material.opacity = 0.9 * (1 - puff);

    ball.visible = t >= fire;
    if (t < T.impact) {
      const fly = phase(t, [fire, T.impact]);
      ball.position.set(0, CANNON_MUZZLE.y + ((CANNONBALL_HIT.y - CANNON_MUZZLE.y) * fly), CANNON_MUZZLE.z + ((CANNONBALL_HIT.z - CANNON_MUZZLE.z) * fly));
      // Stretched along its flight.
      ball.scale.set(0.85, 0.85, 1.4);
    } else {
      const bounce = phase(t, [T.impact, T.impact + 420]);
      ball.position.set(
          0,
          CANNONBALL_HIT.y + ((CANNONBALL_RADIUS - CANNONBALL_HIT.y) * bounce) + (0.22 * Math.sin(Math.PI * bounce)),
          CANNONBALL_HIT.z - (0.4 * bounce),
      );
      ball.scale.set(1 + (0.3 * squash), 1 + (0.3 * squash), 1 - (0.45 * squash));
    }
  } else if (finisherId === 'magician') {
    // Only the wand pops in and out; sparkles and the poof live in the stage.
    tool.scale.setScalar(1);
    const { wand, sparkles, poof } = tool.userData;
    wand.scale.setScalar(scale);
    // Raised and circled on the windup (the tip draws little loops), flicked
    // at the victim on the strike, then lowered.
    const loop = windup * (1 - strike);
    wand.rotation.x = (-0.9 * windup) + (1.05 * strike) - (0.15 * follow) + (0.2 * Math.sin(t * 0.026) * loop);
    wand.rotation.y = Math.atan2(-WAND_GRIP.x, -WAND_GRIP.z) + (0.25 * Math.cos(t * 0.026) * loop);
    const tip = _wandTip.set(0, 0, WAND_LENGTH).applyEuler(wand.rotation).multiplyScalar(scale).add(WAND_GRIP);
    // Sparkles twinkle round the tip through the windup, then spiral onto
    // the victim, landing on the impact.
    sparkles.forEach((sparkle, i) => {
      const fly = phase(t, [T.windup[1] - 140 + (i * 35), T.impact]);
      const angle = (t * 0.012) + (i * (Math.PI * 2 / SPARKLES));
      const radius = 0.08 + (0.1 * fly * (1 - fly));
      sparkle.visible = t >= T.windup[0] && t < T.impact;
      sparkle.position.set(
          tip.x + ((0 - tip.x) * fly) + (Math.cos(angle) * radius),
          tip.y + ((0.5 - tip.y) * fly) + (Math.sin(angle) * radius),
          tip.z + ((0 - tip.z) * fly),
      );
      sparkle.rotation.y = t * 0.02;
      sparkle.scale.setScalar(0.6 + (0.4 * Math.abs(Math.sin((t * 0.02) + i))));
    });
    // POOF: a cloud that swallows the victim (it's a rabbit by the time the
    // cloud thins out), then fades.
    posePuff(poof, t - T.impact, 400, 1.9, 0.9);
  } else if (finisherId === 'vampire') {
    tool.scale.setScalar(1);
    const { bomb, spark, smoke, bats, home } = tool.userData;
    // Held up (fuse fizzing) through the windup, lobbed onto the victim's
    // feet, gone in the smoke at impact.
    const lob = phase(t, [T.windup[1], T.impact]);
    bomb.visible = t < T.impact;
    bomb.scale.setScalar(scale);
    bomb.position.set(
        BOMB_FROM.x * (1 - lob),
        BOMB_FROM.y + ((BOMB_RADIUS - BOMB_FROM.y) * lob) + (Math.sin(Math.PI * lob) * 0.45) + (0.03 * windup * (1 - lob) * Math.sin(t * 0.03)),
        BOMB_FROM.z * (1 - lob),
    );
    bomb.rotation.z = -lob * 6;
    spark.scale.setScalar(0.5 + (0.35 * Math.abs(Math.sin(t * 0.05))));
    posePuff(smoke, t - T.impact, 700, 2.1, 1.1);
    // Bats burst out of the cloud, swirl up, then flutter off to the
    // victim's home, arriving (and shrinking away) on its touchdown.
    const arrive = T.impact + launchDelay(finisherId) + T.flight;
    bats.forEach((bat) => {
      const { wings, seed } = bat.userData;
      const start = T.impact + 40 + (seed * 22);
      bat.visible = t >= start && t < arrive;
      if (!bat.visible) {
        return;
      }
      batPosition(_batNow, seed, t, start, arrive, home, T);
      batPosition(_batNext, seed, t + 16, start, arrive, home, T);
      bat.position.copy(_batNow);
      bat.rotation.y = Math.atan2(_batNext.x - _batNow.x, _batNext.z - _batNow.z);
      bat.scale.setScalar(BAT_SIZE * Math.min(1, phase(t, [start, start + 120]) * 1.2, (arrive - t) / 120));
      // The wings are a shallow V: flipping its height flaps them.
      wings.scale.y = Math.cos((t * 0.07) + (seed * 1.7)) * 1.3;
    });
  } else if (finisherId === 'ufo') {
    tool.scale.setScalar(1);
    const { saucer, lights, beam, home } = tool.userData;
    const rise = T.impact + launchDelay(finisherId);
    const land = rise + T.flight;
    // Swoops down out of the sky to hover over the victim; beam on at the
    // impact; once the victim is inside, flies (banking) to its home; beams
    // it down; zips off up and away.
    const arrive = easeOutBack(phase(t, [T.toolIn[0], T.windup[0] + 200]));
    const travel = easeInOut(phase(t, [rise, land - UFO_DESCEND]));
    const leave = easeIn(phase(t, [land + 120, land + 520]));
    const bob = 0.05 * Math.sin(t * 0.008);
    saucer.position.set(
        (-2.5 * (1 - arrive)) + (home.x * travel) + (2 * leave),
        UFO_HOVER + (5 * (1 - arrive)) + bob + (Math.sin(Math.PI * travel) * 0.8) + (6 * leave),
        home.z * travel,
    );
    saucer.visible = t >= T.toolIn[0] && leave < 1;
    saucer.rotation.z = (0.35 * (1 - arrive)) + (0.06 * Math.sin(t * 0.006)) - (0.25 * Math.sin(Math.PI * travel));
    lights.rotation.y = t * 0.006;
    // Beam: up on the windup's end, held while lifting, off for the trip,
    // on again over home while the victim is set down.
    const up = phase(t, [T.windup[1] - 120, T.impact]) * (1 - phase(t, [rise - 40, rise + 60]));
    const down = phase(t, [land - UFO_DESCEND - 100, land - UFO_DESCEND]) * (1 - phase(t, [land + 40, land + 140]));
    const width = Math.max(up, down);
    beam.visible = width > 0;
    const shimmer = width * (0.9 + (0.1 * Math.sin(t * 0.05)));
    beam.scale.set(shimmer, Math.max(0.01, saucer.position.y - 0.12 - (home.y * travel)), shimmer);
  } else if (finisherId === 'bowling') {
    // Anticipation: the ball revs in place (wheelspin) and creeps back, then
    // dashes at the victim (stretched along its path), squashes on the hit,
    // and rolls on out of frame.
    const dash = phase(t, [T.windup[1], T.impact]);
    const travel = (-0.1 * windup * (1 - dash)) + (dash * dash) + (0.55 * follow);
    tool.position.x = BOWLING_FROM.x + (BOWLING_PATH.x * travel);
    tool.position.z = BOWLING_FROM.z + (BOWLING_PATH.z * travel);
    const stretch = Math.sin(Math.PI * dash) * 0.35;
    tool.scale.set(scale * (1 + (0.12 * squash)), scale * (1 + (0.12 * squash)), scale * (1 + stretch - (0.28 * squash)));
    const ball = tool.userData.ball;
    ball.rotation.x = ((travel * 3) / 0.26) + (windup * (1 - dash) * 16);
    ball.position.y = windup > 0 && dash === 0 ? 0.015 * Math.abs(Math.sin(t * 0.07)) : 0;
  }
}

// The rabbit a magician's victim turns into. App.vue hangs it on the victim's
// pawn group and swaps it in while the victim is a rabbit.
export function buildRabbit(kit) {
  const rabbit = kit.createOutlinedMesh(
      kit.getSharedGeometry('finisher-rabbit', () => buildRabbitGeometry()),
      toolMaterial(kit, 'finisher-rabbit'),
      { castShadow: true },
  );
  rabbit.add(kit.createBakedOutline(kit.getSharedGeometry('finisher-rabbit-outline', () => buildRabbitGeometry(0.01))));
  rabbit.add(markRaw(new THREE.Mesh(
      kit.getSharedGeometry('finisher-rabbit-pink', () => buildRabbitDetailGeometry()),
      toolMaterial(kit, 'finisher-rabbit-pink'),
  )));
  rabbit.add(markRaw(new THREE.Mesh(
      kit.getSharedGeometry('finisher-rabbit-eyes', () => buildRabbitEyesGeometry()),
      toolMaterial(kit, 'finisher-rabbit-eye'),
  )));
  return rabbit;
}

// ── Attacker ────────────────────────────────────────────────────────────
// Offset along the hit direction: shove is a full lunge, the rest lean into
// the blow (barely, when the tool does the work by itself).
export function attackerLunge(finisherId, t, T) {
  const amount = { shove: 1, trapdoor: 0.08, anvil: 0.05, glove: 0.1, cannon: 0.1, magician: 0.12, vampire: 0.25, ufo: 0.03 }[finisherId] ?? 0.3;
  const back = easeInOut(phase(t, T.windup));
  const forward = easeIn(phase(t, [T.windup[1], T.impact]));
  const settle = easeInOut(phase(t, [T.impact, T.impact + 400]));
  return amount * ((-0.14 * back) + (0.5 * forward) - (0.36 * settle));
}

// Height scale: crouches into the windup, springs tall into the blow,
// wobbles back, then squashes for and lands its takeover hop. (Width follows
// volume-preservingly in App.vue.)
export function attackerStretch(finisherId, t, T) {
  const depth = finisherId === 'shove' ? 1 : 0.6;
  const crouch = -0.16 * easeInOut(phase(t, T.windup));
  const spring = easeIn(phase(t, [T.windup[1], T.impact]));
  if (t < T.impact) {
    return 1 + (depth * (crouch + ((0.12 - crouch) * spring)));
  }
  const settle = phase(t, [T.impact, T.impact + 450]);
  const after = 0.12 * Math.cos(settle * Math.PI * 3) * (1 - settle);
  const [hopStart, hopEnd] = takeoverWindow(finisherId, T);
  const hop = t - hopStart;
  const takeoff = hop > -90 && hop < 0 ? -0.12 * Math.sin(Math.PI * ((hop + 90) / 90)) : 0;
  const land = wobble(t - hopEnd, -0.14, 0.03, 90);
  return 1 + (depth * after) + takeoff + land;
}

// The attacker waits beside the victim's square (STAGE_GAP back, where its
// move landed) and, once the victim is on its way home, hops onto the
// square it captured — the victory hop. Window in actionTime ms.
function takeoverWindow(finisherId, T) {
  const clear = finisherId === 'trapdoor'
    ? TRAPDOOR_HANG + TRAPDOOR_FALL + 140 // after the doors shut
    : launchDelay(finisherId) + 140;
  return [T.impact + clear, T.impact + clear + 300];
}

// 0 → 1: how far it has hopped from beside the square onto it.
export function attackerTakeover(finisherId, t, T) {
  return easeInOut(phase(t, takeoverWindow(finisherId, T)));
}

export function attackerHop(finisherId, t, T) {
  return 0.22 * Math.sin(Math.PI * phase(t, takeoverWindow(finisherId, T)));
}

// ── Victim ──────────────────────────────────────────────────────────────
// The "uh-oh": a jitter (world units) along the side axis that builds
// through the windup and stops dead at the blow.
export function victimTremble(t, T) {
  if (t < T.scoot || t >= T.impact) return 0;
  const build = phase(t, [T.scoot, T.windup[1]]);
  return 0.025 * build * Math.sin(t * 0.09);
}

// Tilt (radians about the side axis; + leans the head toward the attacker)
// reacting to what's coming: looking up at the anvil/hammer, shrinking away
// from the glove, the cannon and the swung tools. Released by impact. `at` is actionTime.
export function victimLean(finisherId, t, T) {
  if (t >= T.impact) return 0;
  const release = 1 - easeIn(phase(t, [T.windup[1], T.impact]));
  if (finisherId === 'anvil') {
    // Looks up as the anvil arrives, holds through the hang.
    return -0.4 * easeOutBack(phase(t, [ANVIL_ARRIVE[0] + 60, ANVIL_ARRIVE[1] + 120])) * release;
  }
  const lean = {
    hammer: -0.3, glove: -0.22, cannon: -0.18, magician: -0.12, vampire: -0.15, ufo: -0.25, bat: -0.16, pan: -0.16, golf: -0.16, racket: -0.16, shove: -0.12, bowling: -0.12,
  }[finisherId] || 0;
  return lean * easeInOut(phase(t, T.windup)) * release;
}

// Spin (radians) along the flight: fast off the hit, slowing into the
// landing so it touches down upright and still.
export function victimSpin(p, lite) {
  const turns = lite ? 1 : 2;
  return turns * Math.PI * 2 * (1 - Math.pow(1 - p, 2));
}

// Height scale through the hit (squashed flat on the impact frame, held
// through the hit-stop), the flight (stretched off the launch, relaxing by
// the apex) and the landing (squash on touchdown, springy settle).
export function victimStretch(t, at, timing, finisherId) {
  if (t < timing.impact) return 1;
  if (finisherId === 'trapdoor') return trapdoorStretch(at, timing);
  if (finisherId === 'hammer' || finisherId === 'anvil') return pancakeStretch(t, at, timing, finisherId);
  if (TRANSFORMS[finisherId]) return transformStretch(at, timing, finisherId);
  if (t < timing.impact + timing.hitStop) return 0.68;
  const flight = (at - timing.impact) / timing.flight;
  if (flight < 1) {
    return 1 + (0.28 * Math.max(0, 1 - (flight * 2.2)));
  }
  const land = clamp01((at - timing.impact - timing.flight) / timing.landing);
  return 1 - (0.32 * Math.cos(land * Math.PI * 2.5) * Math.pow(1 - land, 1.6));
}

// Little secondary hop after touchdown (world units above home). `flightAt`
// is actionTime minus any launch delay.
export function victimLandingHop(flightAt, timing) {
  const land = (flightAt - timing.impact - timing.flight) / timing.landing;
  if (land <= 0.25 || land >= 1) return 0;
  return 0.16 * Math.sin(((land - 0.25) / 0.75) * Math.PI);
}

// Overlapping action on a pawn's Prop: radians to tilt it about the side
// axis (pivoting on the head) — it whips on the hit or launch, flops on
// landing, all damped. `role` is 'victim' or 'attacker'.
export function propWobble(role, finisherId, t, at, T) {
  if (role === 'attacker') {
    if (finisherId === null) return 0;
    const sinceHit = at - T.impact;
    const sinceHop = at - takeoverWindow(finisherId, T)[1];
    return wobble(sinceHit, -0.22, 0.03, 220) + wobble(sinceHop, 0.18, 0.035, 160);
  }
  // The victim's Prop holds still on the impact frame (the hit-stop), then
  // whips back as it's launched and flops when it lands.
  const launch = finisherId === 'trapdoor' ? T.impact + TRAPDOOR_HANG : T.impact + launchDelay(finisherId);
  const sinceLaunch = at - launch;
  const sinceLand = at - landingTime(finisherId, T);
  const lookDown = finisherId === 'trapdoor' ? wobble(at - T.impact, -0.12, 0.03, 200) : 0;
  return wobble(sinceLaunch, 0.5, 0.028, 260) + wobble(sinceLand, -0.4, 0.032, 200) + lookDown;
}

// Landing dust: scale and opacity of the puff ring at a landing victim's
// home, `since` ms after touchdown (null = not yet / done).
export const DUST_DURATION = 380;

export function buildDustPuff(kit) {
  return markRaw(new THREE.Mesh(
      kit.getSharedGeometry('finisher-dust', () => buildDustGeometry()),
      puffMaterial(kit, 'finisher-dust', '#e8dcc0'),
  ));
}

export function poseDustPuff(mesh, since) {
  if (since < 0 || since >= DUST_DURATION) {
    mesh.visible = false;
    return;
  }
  const p = since / DUST_DURATION;
  const spread = 0.8 + (1.2 * Math.sqrt(p));
  mesh.visible = true;
  mesh.scale.set(spread, 1 - (0.4 * p), spread);
  mesh.material.opacity = 0.85 * (1 - p);
}

// ── Trapdoor ────────────────────────────────────────────────────────────
// Instead of flying home, the victim hangs in the air over the open pit
// (cartoon physics: it looks down first), drops through, and springs back up
// out of its home field.
const TRAPDOOR_HANG = FINISHER_LAUNCH_DELAY.trapdoor;
const TRAPDOOR_FALL = 360; // ms spent falling, after the hang
const TRAPDOOR_RISE = [520, 850]; // after the hang: pops up out of home
export const TRAPDOOR_DEPTH = 1.2; // world units, below which it's hidden
// Tilt peering down into the pit: bowed away from the attacker, over the hole.
const TRAPDOOR_PEER = -0.3;

// { atHome, drop, lookDown }: where the victim is (stand spot or home), how
// far below its standing height, and its tilt peering into the pit. `at` is
// actionTime.
export function trapdoorVictim(at, timing) {
  const hang = at - timing.impact;
  if (hang < TRAPDOOR_HANG) {
    return { atHome: false, drop: 0, lookDown: TRAPDOOR_PEER * easeOutBack(clamp01(hang / 180)) };
  }
  const d = hang - TRAPDOOR_HANG;
  if (d < TRAPDOOR_FALL) {
    return { atHome: false, drop: TRAPDOOR_DEPTH * easeIn(clamp01(d / TRAPDOOR_FALL)), lookDown: TRAPDOOR_PEER };
  }
  const rise = phase(d, TRAPDOOR_RISE);
  return { atHome: true, drop: TRAPDOOR_DEPTH * (1 - easeOutBack(rise)), lookDown: 0 };
}

function trapdoorStretch(at, timing) {
  const d = at - timing.impact - TRAPDOOR_HANG;
  // A held breath over the pit: a slight shrink.
  if (d < 0) return 1 - (0.06 * clamp01((d + TRAPDOOR_HANG) / 180));
  if (d < TRAPDOOR_FALL) return 1 + (0.25 * clamp01(d / TRAPDOOR_FALL));
  if (d < timing.flight) return 1.25 - (0.25 * phase(d, TRAPDOOR_RISE));
  const land = clamp01((d - timing.flight) / timing.landing);
  return 1 - (0.2 * Math.cos(land * Math.PI * 2.5) * Math.pow(1 - land, 1.6));
}

// ── Hammer / anvil ──────────────────────────────────────────────────────
// Flattened into a pancake (a quick jelly wobble as it settles), held for
// the launch delay, then it pops back into shape and the usual flight and
// landing run on the delayed clock.
export const PANCAKE_HEIGHT = 0.17;

function pancakeStretch(t, at, timing, finisherId) {
  const flat = at - timing.impact;
  const delay = launchDelay(finisherId);
  if (flat < delay) {
    const settle = clamp01(flat / 220);
    return PANCAKE_HEIGHT + (0.05 * Math.sin(settle * Math.PI * 3) * (1 - settle));
  }
  return victimStretch(t, at - delay, { ...timing, hitStop: 0 }, null);
}

// ── Transformations (magician, vampire) ─────────────────────────────────
// From the impact until it lands home, the victim is something else: a
// rabbit that sits twitching, then hops home; or nothing at all while its
// bats fly there. It turns back into a pawn on touchdown (in a poof).
const TRANSFORMS = { magician: 'rabbit', vampire: 'gone', ufo: 'gone' };

// 'pawn', 'rabbit' or 'gone' (hidden: bats, or inside the UFO) at
// actionTime `at`.
export function victimForm(finisherId, at, T) {
  const form = TRANSFORMS[finisherId];
  if (!form || at < T.impact || at >= landingTime(finisherId, T)) return 'pawn';
  if (finisherId === 'ufo') {
    // Visible while the beam lifts it up and sets it down.
    const inside = at >= T.impact + launchDelay(finisherId) && at < landingTime(finisherId, T) - UFO_DESCEND;
    return inside ? form : 'pawn';
  }
  return form;
}

// Rabbit hops home (height above the straight path, p = 0..1 of the flight).
export const RABBIT_HOPS = 4;
export function rabbitHop(p) {
  return Math.abs(Math.sin(Math.PI * p * RABBIT_HOPS)) * 0.45;
}

function transformStretch(at, timing, finisherId) {
  const delay = launchDelay(finisherId);
  if (at < landingTime(finisherId, timing)) {
    // The rabbit's nose-twitch bounce while it sits.
    return finisherId === 'magician' && at - timing.impact < delay ? 1 + (0.05 * Math.sin((at - timing.impact) * 0.06)) : 1;
  }
  return victimStretch(at, at - delay, { ...timing, hitStop: 0 }, null);
}

// The poof a transformed victim turns back into a pawn in (at its home).
export const POOF_DURATION = 450;

export function buildPoof(kit, finisherId) {
  const color = finisherId === 'vampire' ? '#7a5a9c' : '#fbe8ff';
  return markRaw(new THREE.Mesh(
      kit.getSharedGeometry('finisher-puff', () => buildPuffGeometry()),
      puffMaterial(kit, `finisher-poof-${finisherId}`, color),
  ));
}

export function posePoof(mesh, since) {
  posePuff(mesh, since, POOF_DURATION, 1.4, 0.8);
}

// The UFO's victim while the beam has it: { lift (world units up), shrink
// (scale), spin (yaw radians) } — or null outside the beam (on the ground,
// or inside the saucer).
export function ufoVictim(at, T) {
  const rise = T.impact + launchDelay('ufo');
  const land = landingTime('ufo', T);
  if (at >= T.impact && at < rise) {
    const p = easeInOut(phase(at, [T.impact + 60, rise]));
    return { lift: UFO_LIFT * p, shrink: 1 - (0.65 * p * p), spin: p * 5 };
  }
  if (at >= land - UFO_DESCEND && at < land) {
    const p = phase(at, [land - UFO_DESCEND, land]);
    return { lift: UFO_LIFT * (1 - easeIn(p)), shrink: 0.35 + (0.65 * easeOut(p)), spin: (1 - p) * 5 };
  }
  return null;
}
