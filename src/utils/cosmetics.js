// Cosmetics: the meshes behind a player's Prop and the tools and poses of
// their Finisher (see CONTEXT.md). Ids come from shared/protocol.js; this file
// only knows how they look. Builders take App.vue's helpers (`kit`) so every
// geometry/material goes through the shared caches and gets an outline shell.

import * as THREE from 'three';
import { markRaw } from 'vue';
import { PROP_IDS, FINISHER_IDS } from '../../shared/protocol';

// Picker labels: i18n key + emoji, in catalog order.
export const PROP_OPTIONS = PROP_IDS.map((id) => ({
  id,
  labelKey: `cosmetics.prop_${id}`,
  icon: { none: '🚫', crown: '👑', partyHat: '🥳', flag: '🚩' }[id],
}));

export const FINISHER_OPTIONS = FINISHER_IDS.map((id) => ({
  id,
  labelKey: `cosmetics.finisher_${id}`,
  icon: { shove: '🤜', kick: '🦶', bat: '🏏', bowling: '🎳' }[id],
}));

// Prop materials are per seat (suffix `-${seat}`) so App.applySeatPresence
// can dim a disconnected player's props together with their pawns.
export const PROP_MATERIAL_PREFIXES = ['prop-gold', 'prop-party', 'prop-white', 'prop-pole'];

const PROP_COLORS = {
  'prop-gold': '#f5c542',
  'prop-party': '#ff5fa2',
  'prop-white': '#fff8ec',
  'prop-pole': '#6b4a2f',
};

const propMaterial = (kit, prefix, seat) => kit.createToonMaterial(
    `${prefix}-${seat}`,
    { color: PROP_COLORS[prefix] },
);

// Local to the pawn group: body spans y≈0–0.73, the head (r 0.18) sits at
// y 0.85, so its top is ≈1.03.
const PROP_BUILDERS = {
  none: () => null,

  crown(kit, seat) {
    const group = markRaw(new THREE.Group());
    const gold = propMaterial(kit, 'prop-gold', seat);
    const band = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-crown-band', () => new THREE.CylinderGeometry(0.135, 0.125, 0.085, 14)),
        gold,
        { castShadow: true, outlineScale: 1.08 },
    );
    band.position.y = 1.0;
    group.add(band);

    const spikeGeometry = kit.getSharedGeometry('prop-crown-spike', () => new THREE.ConeGeometry(0.035, 0.085, 6));
    for (let i = 0; i < 5; i += 1) {
      const angle = (i / 5) * Math.PI * 2;
      const spike = kit.createOutlinedMesh(spikeGeometry, gold, { outlineScale: 1.12 });
      spike.position.set(Math.cos(angle) * 0.11, 1.083, Math.sin(angle) * 0.11);
      group.add(spike);
    }
    return group;
  },

  partyHat(kit, seat) {
    const group = markRaw(new THREE.Group());
    const cone = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-party-cone', () => new THREE.ConeGeometry(0.12, 0.34, 16)),
        propMaterial(kit, 'prop-party', seat),
        { castShadow: true, outlineScale: 1.07 },
    );
    cone.position.y = 1.12;
    const pompom = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-party-pompom', () => new THREE.SphereGeometry(0.045, 10, 10)),
        propMaterial(kit, 'prop-white', seat),
        { outlineScale: 1.12 },
    );
    pompom.position.y = 1.3;
    group.add(cone, pompom);
    // A jaunty tilt reads as "party" from any angle.
    group.rotation.z = 0.22;
    group.position.x = 0.2;
    return group;
  },

  flag(kit, seat, bodyMaterial) {
    const group = markRaw(new THREE.Group());
    const pole = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-flag-pole', () => new THREE.CylinderGeometry(0.014, 0.014, 0.62, 8)),
        propMaterial(kit, 'prop-pole', seat),
        { castShadow: true, outlineScale: 1.3 },
    );
    pole.position.set(0.19, 1.02, 0);
    // The cloth reuses the pawn body material: player color, and it dims with
    // the seat for free.
    const cloth = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-flag-cloth', () => new THREE.BoxGeometry(0.24, 0.15, 0.014)),
        bodyMaterial,
        { castShadow: true, outlineScale: 1.08 },
    );
    cloth.position.set(0.32, 1.25, 0);
    group.add(pole, cloth);
    return group;
  },
};

export function buildPropMesh(propId, kit, seat, bodyMaterial) {
  const build = PROP_BUILDERS[propId] || PROP_BUILDERS.none;
  return build(kit, seat, bodyMaterial);
}

// ── Finishers ───────────────────────────────────────────────────────────
// Timeline (ms from start). Impact is where the burst, sound and victim
// launch happen; the camera zooms in over the first phase and eases back at
// the end. The "lite" timeline (Finishers switched off) has no tool, no
// zoom: impact at once, then the flight home.
export const FINISHER_TIMING = {
  zoomIn: 550,
  scoot: 250, // victim hops off the attacker's square
  toolIn: [150, 380], // tool pops in
  windup: [380, 820],
  impact: 960,
  toolOut: [1250, 1480],
  flight: 850,
  cameraBack: [1750, 2450],
  total: 2450,
};

export const LITE_FINISHER_TIMING = {
  impact: 0,
  flight: 850,
  total: 850,
};

const TOOL_COLORS = {
  'finisher-boot': '#7a3e1d',
  'finisher-sock': '#fff8ec',
  'finisher-bat': '#d9a066',
  'finisher-ball': '#2b3a8c',
  'finisher-ball-hole': '#12162e',
};

const toolMaterial = (kit, key) => kit.createToonMaterial(key, { color: TOOL_COLORS[key] });

// Tools are built in a "stage" frame: origin at the (first) victim, +Z the
// hit direction (toward its home), the attacker standing at z = -STAGE_GAP. Each
// tool is wrapped in a pivot group the pose function rotates/moves.
export const STAGE_GAP = 0.6; // victim scoots this far off the attacker's square

const TOOL_BUILDERS = {
  shove: () => null,

  kick(kit) {
    const pivot = markRaw(new THREE.Group());
    const leg = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-leg', () => new THREE.CylinderGeometry(0.06, 0.07, 0.42, 10)),
        toolMaterial(kit, 'finisher-sock'),
        { castShadow: true, outlineScale: 1.1 },
    );
    leg.position.y = -0.21;
    const boot = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-boot', () => new THREE.BoxGeometry(0.17, 0.13, 0.3)),
        toolMaterial(kit, 'finisher-boot'),
        { castShadow: true, outlineScale: 1.08 },
    );
    boot.position.set(0, -0.46, 0.07);
    pivot.add(leg, boot);
    pivot.position.set(0.12, 0.78, -0.5);
    return pivot;
  },

  bat(kit) {
    const pivot = markRaw(new THREE.Group());
    const bat = kit.createOutlinedMesh(
        kit.getSharedGeometry('finisher-bat', () => {
          // Tapered along +X: thin handle at the pivot, fat barrel at the tip.
          const geometry = new THREE.CylinderGeometry(0.07, 0.03, 0.95, 12);
          geometry.rotateZ(Math.PI / 2);
          geometry.translate(0.475, 0, 0);
          return geometry;
        }),
        toolMaterial(kit, 'finisher-bat'),
        { castShadow: true, outlineScale: 1.08 },
    );
    pivot.add(bat);
    pivot.position.set(-0.55, 0.42, -0.45);
    return pivot;
  },

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
    pivot.add(ball);
    pivot.userData.ball = ball;
    pivot.position.set(-3, 0.26, -1.2);
    return pivot;
  },
};

export function buildFinisherTool(finisherId, kit) {
  const build = TOOL_BUILDERS[finisherId] || TOOL_BUILDERS.shove;
  return build(kit);
}

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const phase = (now, [start, end]) => clamp01((now - start) / (end - start));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeIn = (t) => t * t * t;
const easeOutBack = (t) => {
  const c = 1.7;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

// Poses the tool at time `t` (ms). Returns nothing; mutates `tool`.
export function poseFinisherTool(finisherId, tool, t) {
  if (!tool) return;
  const T = FINISHER_TIMING;
  const popIn = easeOutBack(phase(t, T.toolIn));
  const popOut = 1 - easeIn(phase(t, T.toolOut));
  const scale = Math.max(0.001, Math.min(popIn, popOut));
  tool.scale.setScalar(scale);

  const windup = easeInOut(phase(t, T.windup));
  const strike = easeIn(phase(t, [T.windup[1], T.impact]));
  const follow = easeInOut(phase(t, [T.impact, T.toolOut[1]]));

  if (finisherId === 'kick') {
    // Rotation about local X swings the dangling foot: + back, − forward.
    tool.rotation.x = (0.9 * windup) - (1.55 * strike) - (0.35 * follow);
  } else if (finisherId === 'bat') {
    // Rotation about Y sweeps the bat: from pointing back to through the
    // victim at impact, then follow-through.
    tool.rotation.y = 1.0 + (0.6 * windup) - (2.1 * strike) - (0.8 * follow);
    tool.rotation.z = 0.15 * windup;
  } else if (finisherId === 'bowling') {
    // Rolls in diagonally from behind-left (clear of the attacker), through
    // the victim, and on out of frame.
    const approach = clamp01((t - T.toolIn[0]) / (T.impact - T.toolIn[0]));
    const travel = (approach * approach) + (0.55 * follow);
    tool.position.x = -3 + (2.8 * travel);
    tool.position.z = -1.2 + (1.1 * travel);
    tool.rotation.y = Math.atan2(2.8, 1.1);
    const ball = tool.userData.ball;
    if (ball) ball.rotation.x = (travel * 3) / 0.26;
  }
}

// Attacker offset along the hit direction: shove is a full lunge, every other
// Finisher just leans into the blow.
export function attackerLunge(finisherId, t) {
  const T = FINISHER_TIMING;
  const amount = finisherId === 'shove' ? 1 : 0.3;
  const back = easeInOut(phase(t, T.windup));
  const forward = easeIn(phase(t, [T.windup[1], T.impact]));
  const settle = easeInOut(phase(t, [T.impact, T.impact + 400]));
  return amount * ((-0.14 * back) + (0.5 * forward) - (0.36 * settle));
}
