// Cosmetics: the picker catalog and the meshes behind a player's Prop (see
// CONTEXT.md; the Finisher's tools and timeline are in finishers.js). Ids
// come from shared/protocol.js; this file only knows how they look. Builders take App.vue's helpers (`kit`) so every
// geometry/material goes through the shared caches and gets an outline shell.

import * as THREE from 'three';
import { markRaw } from 'vue';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { PROP_IDS, FINISHER_IDS, FLAG_CODES, DEFAULT_FLAG } from '../../shared/protocol';

// Picker labels (i18n keys), in catalog order.
export const PROP_OPTIONS = PROP_IDS.map((id) => ({ id, labelKey: `cosmetics.prop_${id}` }));

export const FINISHER_OPTIONS = FINISHER_IDS.map((id) => ({ id, labelKey: `cosmetics.finisher_${id}` }));

// ── Flags ──────────────────────────────────────────────────────────────
// The `flag` Prop waves one country flag (ids in shared/protocol.js, SVGs in
// public/flags/, from the MIT-licensed flag-icons set).
export const flagUrl = (code) => `${import.meta.env.BASE_URL}flags/${code}.svg`;

// Not ISO regions, so Intl.DisplayNames can't name them.
const FLAG_NAME_OVERRIDES = {
  'gb-eng': { en: 'England', sq: 'Anglia' },
  'gb-sct': { en: 'Scotland', sq: 'Skocia' },
  'gb-wls': { en: 'Wales', sq: 'Uells' },
  'gb-nir': { en: 'Northern Ireland', sq: 'Irlanda e Veriut' },
};

const regionNamesByLocale = {};

export function flagName(code, locale) {
  const override = FLAG_NAME_OVERRIDES[code];
  if (override) {
    return override[locale] || override.en;
  }
  try {
    if (!regionNamesByLocale[locale]) {
      regionNamesByLocale[locale] = new Intl.DisplayNames([locale, 'en'], { type: 'region' });
    }
    return regionNamesByLocale[locale].of(code.toUpperCase()) || code.toUpperCase();
  } catch (error) {
    return code.toUpperCase();
  }
}

// Picker order: Albania and Kosovo first, the rest alphabetical by name.
const PINNED_FLAGS = [DEFAULT_FLAG, 'xk'];

export function flagOptions(locale) {
  const collator = new Intl.Collator(locale);
  const rest = FLAG_CODES
      .filter((code) => !PINNED_FLAGS.includes(code))
      .map((code) => ({ code, name: flagName(code, locale) }))
      .sort((a, b) => collator.compare(a.name, b.name));
  return PINNED_FLAGS.map((code) => ({ code, name: flagName(code, locale) })).concat(rest);
}

// The SVG rasterized once into a 4:3 canvas texture; white until it loads,
// then onLoad (App.vue's requestRender) shows it.
function createFlagTexture(code, onLoad) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    texture.needsUpdate = true;
    onLoad();
  };
  image.src = flagUrl(code);
  return texture;
}

const FLAG_CLOTH = { width: 0.4, height: 0.3, depth: 0.012 };
// Where the carried pole rests (pawn-group local y).
const FLAG_SHOULDER_Y = 0.66;

// A thin slab hanging off +X from the pole (x = 0), with a static ripple
// that grows away from the pole. Static on purpose: a waving flag would
// force continuous rendering for the whole match. `pad` grows it all round
// for the baked outline shell, which follows the same ripple.
function buildFlagClothGeometry(pad = 0) {
  const { width, height, depth } = FLAG_CLOTH;
  const geometry = new THREE.BoxGeometry(width + (pad * 2), height + (pad * 2), depth + (pad * 2.2), 16, 1, 1);
  geometry.translate((width / 2), 0, 0);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const t = Math.max(0, position.getX(i) / width);
    position.setZ(i, position.getZ(i) + (0.035 * t * Math.sin(t * Math.PI * 2.2)));
    position.setY(i, position.getY(i) - (0.025 * t * t));
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Merged prop geometries take a `pad` that grows every part for their baked
// outline shell (a uniform scale would push spikes/brims off-center).
function buildCrownGeometry(pad = 0) {
  const parts = [new THREE.CylinderGeometry(0.135 + pad, 0.125 + pad, 0.085 + (pad * 2), 16)];
  for (let i = 0; i < 5; i += 1) {
    const angle = (i / 5) * Math.PI * 2;
    const x = Math.cos(angle) * 0.11;
    const z = Math.sin(angle) * 0.11;
    parts.push(new THREE.ConeGeometry(0.038 + pad, 0.1 + (pad * 2), 6).translate(x, 0.09, z));
    parts.push(new THREE.SphereGeometry(0.019 + pad, 8, 6).translate(x, 0.145, z));
  }
  return mergeGeometries(parts);
}

// Five gems set into the band, between the spikes.
function buildCrownGemsGeometry() {
  const parts = [];
  for (let i = 0; i < 5; i += 1) {
    const angle = ((i + 0.5) / 5) * Math.PI * 2;
    parts.push(new THREE.OctahedronGeometry(0.024).scale(1, 1.3, 0.6)
        .rotateY(-angle + (Math.PI / 2)).translate(Math.cos(angle) * 0.132, 0, Math.sin(angle) * 0.132));
  }
  return mergeGeometries(parts);
}

// Rings at 30% and 60% up the party cone (local to the cone's center).
function buildPartyStripesGeometry() {
  const height = 0.34;
  return mergeGeometries([0.3, 0.6].map((u) => {
    const radius = (0.12 * (1 - u)) + 0.003;
    return new THREE.TorusGeometry(radius, 0.011, 6, 18).rotateX(Math.PI / 2).translate(0, (u - 0.5) * height, 0);
  }));
}

// Brim + crown, origin at the brim.
function buildTopHatGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.CylinderGeometry(0.22 + pad, 0.22 + pad, 0.022 + (pad * 2), 22),
    new THREE.CylinderGeometry(0.135 + pad, 0.122 + pad, 0.27 + (pad * 2), 18).translate(0, 0.135, 0),
    new THREE.CylinderGeometry(0.135 + pad, 0.135 + pad, 0.01, 18).translate(0, 0.27 + pad, 0),
  ]);
}

// A lathed dome: straight-ish felt sides, softly rounded top.
function buildQelesheGeometry(pad = 0) {
  const profile = [[0.188, 0], [0.186, 0.08], [0.178, 0.14], [0.15, 0.185], [0.1, 0.207], [0.05, 0.215], [0, 0.217]]
      .map(([x, y]) => new THREE.Vector2(x + (x ? pad : 0), y + (y ? pad : -pad)));
  profile.unshift(new THREE.Vector2(0, -pad));
  return new THREE.LatheGeometry(profile, 22);
}

// ── Face and costume props ──────────────────────────────────────────────
// The pawn's face is its local +Z (App.vue turns board pawns toward the
// camera). Head: center y 0.85, radius 0.18. Body: a cone from r 0.28 at
// y -0.025 up to r 0.08 at y 0.725.
const HEAD_Y = 0.85;
const HEAD_RADIUS = 0.18;

// Santa hat: a red cone whose tip droops to one side (bent vertices), on a
// white fur band; origin at the band.
function buildSantaConeGeometry(pad = 0) {
  const height = 0.38;
  const geometry = new THREE.ConeGeometry(0.15 + pad, height + (pad * 2), 16, 8).translate(0, height / 2, 0);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const t = Math.max(0, position.getY(i) / height);
    position.setX(i, position.getX(i) + (0.17 * t * t));
    position.setY(i, position.getY(i) - (0.08 * t * t * t));
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Rabbit ears: two tall flattened ovals, splayed, on top of the head.
const EAR_SPLAY = 0.22;
function buildEarsGeometry(pad = 0, inner = false) {
  return mergeGeometries([-1, 1].map((side) => {
    const ear = inner
      ? new THREE.SphereGeometry(0.1, 14, 10).scale(0.26, 1.25, 0.12).translate(0, 0, 0.022)
      : new THREE.SphereGeometry(0.1 + pad, 14, 10).scale(0.42, 1.6, 0.24);
    return ear.translate(0, 0.15, 0).rotateZ(-side * EAR_SPLAY).translate(side * 0.075, 0.98, 0);
  }));
}

// Sunglasses: two lenses, a bridge and the arms, one dark mesh.
function buildSunglassesGeometry(pad = 0) {
  const p2 = pad * 2;
  return mergeGeometries([
    ...[-1, 1].map((side) => new THREE.CylinderGeometry(0.055 + pad, 0.055 + pad, 0.022 + p2, 18)
        .rotateX(Math.PI / 2).scale(1.2, 0.82, 1).rotateY(side * 0.3).translate(side * 0.072, 0.885, 0.168)),
    new THREE.BoxGeometry(0.05 + p2, 0.014 + p2, 0.014 + p2).translate(0, 0.9, 0.183),
    ...[-1, 1].map((side) => new THREE.BoxGeometry(0.014 + p2, 0.014 + p2, 0.15 + p2).translate(side * 0.178, 0.9, 0.08)),
  ].map((geometry) => geometry.toNonIndexed()));
}

// A white glint across each lens (no outline).
function buildGlintGeometry() {
  return mergeGeometries([-1, 1].map((side) => new THREE.BoxGeometry(0.05, 0.011, 0.004)
      .rotateZ(0.6).translate((side * 0.072) - 0.012, 0.9, 0.186)));
}

// Mustache: two curling lobes under the nose.
function buildMustacheGeometry(pad = 0) {
  return mergeGeometries([-1, 1].flatMap((side) => [
    new THREE.SphereGeometry(0.045 + pad, 12, 8).scale(1.5, 0.62, 0.7).rotateZ(side * 0.32).translate(side * 0.052, 0.79, 0.168),
    new THREE.SphereGeometry(0.022 + pad, 10, 8).translate(side * 0.11, 0.812, 0.142),
  ]));
}

// Scarf: a thick ring around the neck and one tail hanging down the front.
const SCARF_SLOPE = Math.atan2(0.2, 0.75); // the body cone's lean
function buildScarfGeometry(pad = 0) {
  const p2 = pad * 2;
  return mergeGeometries([
    new THREE.TorusGeometry(0.115, 0.048 + pad, 10, 22).rotateX(Math.PI / 2).translate(0, 0.685, 0),
    new THREE.BoxGeometry(0.085 + p2, 0.26 + p2, 0.03 + p2).translate(0, -0.13, 0)
        .rotateX(-SCARF_SLOPE).rotateZ(0.12).translate(0.05, 0.67, 0.13),
  ].map((geometry) => geometry.toNonIndexed()));
}

// White stripes near the tail's end.
function buildScarfStripesGeometry() {
  return mergeGeometries([0.17, 0.215].map((drop) => new THREE.BoxGeometry(0.089, 0.018, 0.034)
      .translate(0, -drop, 0).rotateX(-SCARF_SLOPE).rotateZ(0.12).translate(0.05, 0.67, 0.13)));
}

// Pumpkin: a ribbed, slightly squat orange ball over the head, origin at the
// head center.
const PUMPKIN_RADIUS = 0.205;
const PUMPKIN_SQUASH = 0.88;
function buildPumpkinGeometry(pad = 0) {
  const geometry = new THREE.SphereGeometry(PUMPKIN_RADIUS + pad, 32, 18);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const rib = 1 - (0.08 * (1 - Math.abs(Math.cos(4 * Math.atan2(z, x)))));
    position.setXYZ(i, x * rib, position.getY(i) * PUMPKIN_SQUASH, z * rib);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Lays flat face features (built in the XY plane) onto the front of an
// ellipsoid around the origin: radius `r`, height `r * squash`.
function wrapOntoFront(geometry, r, squash, lift) {
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i) / r;
    const y = position.getY(i) / (r * squash);
    position.setZ(i, (r * Math.sqrt(Math.max(0, 1 - (x * x) - (y * y)))) + lift);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Carved triangle eyes and a jagged grin, relative to the head center.
function buildPumpkinFaceGeometry() {
  const eye = (side) => new THREE.Shape([
    new THREE.Vector2(side * 0.035, 0.055), new THREE.Vector2(side * 0.11, 0.0), new THREE.Vector2(side * 0.03, -0.005),
  ]);
  const mouth = new THREE.Shape();
  const teeth = [[-0.12, -0.04], [-0.08, -0.07], [-0.05, -0.055], [-0.02, -0.08], [0.02, -0.06], [0.05, -0.08],
    [0.08, -0.055], [0.12, -0.04], [0.07, -0.11], [0, -0.125], [-0.07, -0.11]];
  mouth.moveTo(...teeth[0]);
  teeth.slice(1).forEach((point) => mouth.lineTo(...point));
  const shapes = new THREE.ShapeGeometry([eye(-1), eye(1), mouth], 1);
  return wrapOntoFront(shapes, PUMPKIN_RADIUS, PUMPKIN_SQUASH, 0.006);
}

// Ghost sheet: a lathed sheet over the head and shoulders, flaring to a
// wavy hem at mid-body (so the seat's color still shows below it).
// Bottom to top, so the lathe's faces point outward.
const GHOST_PROFILE = [[0.255, 0.33], [0.225, 0.42], [0.2, 0.52], [0.185, 0.64], [0.19, 0.74], [0.205, 0.86], [0.195, 0.96],
  [0.15, 1.025], [0.08, 1.058], [0, 1.065]];
function buildGhostGeometry(pad = 0) {
  const profile = GHOST_PROFILE.map(([x, y]) => new THREE.Vector2(x + (x ? pad : 0), y + pad));
  const geometry = new THREE.LatheGeometry(profile, 32);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const y = position.getY(i);
    if (y < 0.45) {
      const angle = Math.atan2(position.getZ(i), position.getX(i));
      position.setY(i, y + (0.035 * Math.sin(angle * 7) * ((0.45 - y) / 0.12)));
    }
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Two black oval eyes and a little "o" mouth on the sheet's front.
function buildGhostFaceGeometry() {
  const eye = (side) => new THREE.CircleGeometry(0.03, 14).scale(0.8, 1.25, 1).translate(side * 0.065, 0.035, 0);
  const geometry = mergeGeometries([eye(-1), eye(1), new THREE.CircleGeometry(0.022, 12).scale(0.9, 1.2, 1).translate(0, -0.06, 0)]);
  return wrapOntoFront(geometry, 0.205, 1, 0.006).translate(0, 0.86, 0);
}

// Cat: two triangular ears (pink inside) and whiskers either side of a
// little pink nose.
function buildCatEarsGeometry(pad = 0, inner = false) {
  return mergeGeometries([-1, 1].map((side) => {
    const ear = inner
      ? new THREE.ConeGeometry(0.058, 0.13, 3).scale(1, 1, 0.3).translate(0, 0.058, 0.022)
      : new THREE.ConeGeometry(0.095 + pad, 0.19 + (pad * 2), 3).scale(1, 1, 0.45).translate(0, 0.075, 0);
    return ear.rotateZ(-side * 0.38).translate(side * 0.1, 0.99, -0.01);
  }).map((geometry) => geometry.toNonIndexed()));
}

function buildWhiskersGeometry() {
  const parts = [];
  [-1, 1].forEach((side) => {
    [-1, 0, 1].forEach((k) => {
      parts.push(new THREE.CylinderGeometry(0.0045, 0.0045, 0.16, 5).rotateZ(Math.PI / 2)
          .rotateZ(side * k * 0.16).rotateY(side * 0.45).translate(side * 0.135, 0.815 + (k * 0.018), 0.14));
    });
  });
  return mergeGeometries(parts);
}

// Chicken: a beak pointing forward, plus the red comb (three bumps along the
// top of the head) and the wattle under the beak, as one red mesh.
function buildBeakGeometry(pad = 0) {
  return mergeGeometries([
    new THREE.ConeGeometry(0.06 + pad, 0.14 + (pad * 2), 10).rotateX(Math.PI / 2).scale(1, 0.75, 1).translate(0, 0.84, 0.22),
    new THREE.ConeGeometry(0.042 + pad, 0.08 + (pad * 2), 10).rotateX(Math.PI / 2).scale(1, 0.6, 1).translate(0, 0.808, 0.2),
  ]);
}

function buildCombGeometry(pad = 0) {
  return mergeGeometries([
    ...[[0.07, 1.025, 0.04], [0.0, 1.055, 0.05], [-0.07, 1.03, 0.042]].map(([z, y, r]) => (
      new THREE.SphereGeometry(r + pad, 12, 10).scale(0.45, 1, 1).translate(0, y, z)
    )),
    new THREE.SphereGeometry(0.03 + pad, 10, 8).scale(0.7, 1.3, 0.6).translate(0, 0.762, 0.17),
  ]);
}

// Wizard hat: a wide brim and a tall cone whose tip flops back; stars are
// placed with the same bend so they stay on its surface.
const WIZARD_HEIGHT = 0.46;
const WIZARD_RADIUS = 0.16;
const wizardBend = (height) => {
  const t = Math.max(0, height / WIZARD_HEIGHT);
  return { z: -0.16 * t * t * t, y: -0.05 * t * t * t };
};

function buildWizardHatGeometry(pad = 0) {
  const cone = new THREE.ConeGeometry(WIZARD_RADIUS + pad, WIZARD_HEIGHT + (pad * 2), 18, 10).translate(0, WIZARD_HEIGHT / 2, 0);
  const position = cone.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const bend = wizardBend(position.getY(i));
    position.setZ(i, position.getZ(i) + bend.z);
    position.setY(i, position.getY(i) + bend.y);
  }
  cone.computeVertexNormals();
  return mergeGeometries([
    new THREE.CylinderGeometry(0.27 + pad, 0.27 + pad, 0.02 + (pad * 2), 26),
    cone,
  ].map((geometry) => geometry.toNonIndexed()));
}

function buildWizardStarsGeometry() {
  const star = () => {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2;
      const radius = i % 2 ? 0.014 : 0.034;
      shape[i ? 'lineTo' : 'moveTo'](Math.sin(angle) * radius, Math.cos(angle) * radius);
    }
    return new THREE.ExtrudeGeometry(shape, { depth: 0.008, bevelEnabled: false });
  };
  // [height up the cone, angle around it (0 = front)]
  return mergeGeometries([[0.08, 0.15], [0.17, -0.75], [0.22, 0.85], [0.31, 0.05]].map(([h, angle]) => {
    const radius = (WIZARD_RADIUS * (1 - (h / WIZARD_HEIGHT))) + 0.002;
    const bend = wizardBend(h);
    return star().rotateY(angle).translate(Math.sin(angle) * radius, h + bend.y, (Math.cos(angle) * radius) + bend.z);
  }));
}

// Vampire: long pointed ears out to the sides, and two little fangs.
function buildVampireEarsGeometry(pad = 0) {
  return mergeGeometries([-1, 1].map((side) => new THREE.ConeGeometry(0.05 + pad, 0.2 + (pad * 2), 8)
      .scale(1, 1, 0.4).translate(0, 0.08, 0).rotateZ(-side * 1.05).rotateY(side * 0.25)
      .translate(side * 0.16, 0.87, -0.02)));
}

function buildFangsGeometry() {
  return mergeGeometries([-1, 1].map((side) => new THREE.ConeGeometry(0.014, 0.04, 6).rotateX(Math.PI)
      .translate(side * 0.03, 0.775, 0.168)));
}

// Alien antennae: two springy stalks with glowing bobbles.
function buildAntennaeGeometry(pad = 0) {
  return mergeGeometries([-1, 1].flatMap((side) => {
    const tilt = side * 0.38;
    const top = new THREE.Vector3(0, 0.24, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), -tilt);
    return [
      new THREE.CylinderGeometry(0.012 + pad, 0.016 + pad, 0.24, 6).translate(0, 0.12, 0).rotateZ(-tilt).translate(side * 0.07, 0.99, 0),
      new THREE.SphereGeometry(0.045 + pad, 12, 10).translate(top.x + (side * 0.07), top.y + 0.99, 0),
    ];
  }).map((geometry) => geometry.toNonIndexed()));
}

// Dinosaur spikes: a row of flat triangular plates over the head and down
// the body (built along local -Z), each standing out along the surface
// normal.
function buildDinoSpikesGeometry(pad = 0) {
  const up = new THREE.Vector3(0, 1, 0);
  const parts = [];
  const add = (position, normal, size) => {
    const spike = new THREE.ConeGeometry((0.075 * size) + pad, (0.18 * size) + (pad * 2), 4).scale(0.32, 1, 1)
        .translate(0, 0.065 * size, 0);
    spike.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, normal));
    parts.push(spike.translate(position.x, position.y, position.z).toNonIndexed());
  };
  // Over the head, from the crown round to the nape.
  [[0.2, 0.9], [0.8, 1], [1.4, 0.95]].forEach(([angle, size]) => {
    const normal = new THREE.Vector3(0, Math.cos(angle), -Math.sin(angle));
    add(normal.clone().multiplyScalar(HEAD_RADIUS - 0.01).add(new THREE.Vector3(0, HEAD_Y, 0)), normal, size);
  });
  // Down the body's back: its radius grows from 0.08 (y 0.725) to 0.28.
  const lean = Math.atan2(0.2, 0.75);
  const bodyNormal = new THREE.Vector3(0, Math.sin(lean), -Math.cos(lean));
  [[0.58, 0.85], [0.42, 0.75], [0.26, 0.62]].forEach(([y, size]) => {
    const radius = 0.08 + (0.2 * ((0.725 - y) / 0.75));
    add(new THREE.Vector3(0, y, -radius + 0.01), bodyNormal, size);
  });
  return mergeGeometries(parts);
}

// Prop materials are per seat (suffix `-${seat}`) so App.applySeatPresence
// can dim a disconnected player's props together with their pawns.
// (The flag cloth's key also carries the country: `prop-flag-${code}-${seat}`.)
export const PROP_MATERIAL_PREFIXES = [
  'prop-gold', 'prop-party', 'prop-white', 'prop-pole', 'prop-gem', 'prop-black', 'prop-red', 'prop-pink', 'prop-shades',
  'prop-glint', 'prop-nose', 'prop-mustache', 'prop-scarf', 'prop-pumpkin', 'prop-stem', 'prop-carve', 'prop-ghost',
  'prop-cat', 'prop-whisker', 'prop-beak', 'prop-wizard', 'prop-star', 'prop-vampire', 'prop-alien', 'prop-dino',
];

export const flagMaterialKey = (code, seat) => `prop-flag-${code}-${seat}`;

const PROP_COLORS = {
  'prop-gold': '#f5c542',
  'prop-party': '#ff5fa2',
  'prop-white': '#fff8ec',
  'prop-pole': '#6b4a2f',
  'prop-gem': '#2fa8e0',
  'prop-black': '#26232c',
  'prop-red': '#c8102e',
  'prop-pink': '#ffaec4',
  'prop-shades': '#17151c',
  'prop-glint': '#ffffff',
  'prop-nose': '#ff4040',
  'prop-mustache': '#3b2418',
  'prop-scarf': '#2f8f5b',
  'prop-pumpkin': '#f28a1c',
  'prop-stem': '#4f7a2c',
  'prop-carve': '#2a1305',
  'prop-ghost': '#f4f4f8',
  'prop-cat': '#3d3a45',
  'prop-whisker': '#1c1a21',
  'prop-beak': '#f6a623',
  'prop-wizard': '#3b3f9e',
  'prop-star': '#ffd23f',
  'prop-vampire': '#d9cbe6',
  'prop-alien': '#7ee04a',
  'prop-dino': '#45b26b',
};

const propMaterial = (kit, prefix, seat) => kit.createToonMaterial(
    `${prefix}-${seat}`,
    { color: PROP_COLORS[prefix] },
);

// Local to the pawn group: body spans y≈0–0.73, the head (r 0.18) sits at
// y 0.85, so its top is ≈1.03.
const PROP_BUILDERS = {
  none: () => null,

  // One gold mesh (band + spikes + ball tips, merged) with a baked outline,
  // plus one merged mesh for the gems: 3 draws instead of one per spike.
  crown(kit, seat) {
    const gold = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-crown', () => buildCrownGeometry()),
        propMaterial(kit, 'prop-gold', seat),
        { castShadow: true },
    );
    gold.add(kit.createBakedOutline(kit.getSharedGeometry('prop-crown-outline', () => buildCrownGeometry(0.009))));
    const gems = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-crown-gems', () => buildCrownGemsGeometry()),
        propMaterial(kit, 'prop-gem', seat),
    ));
    gold.add(gems);
    gold.position.y = 1.0;
    return gold;
  },

  partyHat(kit, seat) {
    const group = markRaw(new THREE.Group());
    const cone = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-party-cone', () => new THREE.ConeGeometry(0.12, 0.34, 16)),
        propMaterial(kit, 'prop-party', seat),
        { castShadow: true, outlineScale: 1.07 },
    );
    cone.position.y = 1.12;
    // Two white stripes hugging the cone (no outline: they'd read as noise).
    const stripes = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-party-stripes', () => buildPartyStripesGeometry()),
        propMaterial(kit, 'prop-white', seat),
    ));
    cone.add(stripes);
    const pompom = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-party-pompom', () => new THREE.SphereGeometry(0.05, 10, 10)),
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

  topHat(kit, seat) {
    const hat = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-top-hat', () => buildTopHatGeometry()),
        propMaterial(kit, 'prop-black', seat),
        { castShadow: true },
    );
    hat.add(kit.createBakedOutline(kit.getSharedGeometry('prop-top-hat-outline', () => buildTopHatGeometry(0.009))));
    const band = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-top-hat-band', () => new THREE.CylinderGeometry(0.128, 0.13, 0.045, 18)),
        propMaterial(kit, 'prop-red', seat),
    ));
    band.position.y = 0.045;
    hat.add(band);
    hat.position.set(0.02, 0.985, 0);
    hat.rotation.z = -0.12;
    return hat;
  },

  // The Albanian qeleshe: a white felt skullcap, worn high and a touch back.
  qeleshe(kit, seat) {
    const cap = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-qeleshe', () => buildQelesheGeometry()),
        propMaterial(kit, 'prop-white', seat),
        { castShadow: true },
    );
    cap.add(kit.createBakedOutline(kit.getSharedGeometry('prop-qeleshe-outline', () => buildQelesheGeometry(0.009))));
    cap.position.y = 0.9;
    cap.rotation.x = -0.12;
    return cap;
  },

  santaHat(kit, seat) {
    const group = markRaw(new THREE.Group());
    const cone = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-santa-cone', () => buildSantaConeGeometry()),
        propMaterial(kit, 'prop-red', seat),
        { castShadow: true },
    );
    cone.add(kit.createBakedOutline(kit.getSharedGeometry('prop-santa-cone-outline', () => buildSantaConeGeometry(0.009))));
    const band = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-santa-band', () => new THREE.TorusGeometry(0.155, 0.045, 10, 22).rotateX(Math.PI / 2)),
        propMaterial(kit, 'prop-white', seat),
        { outlineScale: 1.06 },
    );
    const pompom = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-party-pompom', () => new THREE.SphereGeometry(0.05, 10, 10)),
        propMaterial(kit, 'prop-white', seat),
        { outlineScale: 1.12 },
    );
    pompom.position.set(0.17, 0.3, 0);
    group.add(cone, band, pompom);
    group.position.y = 0.97;
    group.rotation.x = -0.1;
    return group;
  },

  rabbitEars(kit, seat) {
    const ears = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-ears', () => buildEarsGeometry()),
        propMaterial(kit, 'prop-white', seat),
        { castShadow: true },
    );
    ears.add(kit.createBakedOutline(kit.getSharedGeometry('prop-ears-outline', () => buildEarsGeometry(0.009))));
    ears.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-ears-inner', () => buildEarsGeometry(0, true)),
        propMaterial(kit, 'prop-pink', seat),
    )));
    return ears;
  },

  sunglasses(kit, seat) {
    const shades = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-sunglasses', () => buildSunglassesGeometry()),
        propMaterial(kit, 'prop-shades', seat),
    );
    shades.add(kit.createBakedOutline(kit.getSharedGeometry('prop-sunglasses-outline', () => buildSunglassesGeometry(0.007))));
    shades.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-sunglasses-glint', () => buildGlintGeometry()),
        propMaterial(kit, 'prop-glint', seat),
    )));
    return shades;
  },

  clownNose(kit, seat) {
    const nose = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-clown-nose', () => new THREE.SphereGeometry(0.066, 16, 12)),
        propMaterial(kit, 'prop-nose', seat),
        { outlineScale: 1.12 },
    );
    // A shine so it still pops on a red pawn.
    const shine = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-clown-nose-shine', () => new THREE.SphereGeometry(0.016, 8, 6).scale(1.3, 1, 0.5)),
        propMaterial(kit, 'prop-glint', seat),
    ));
    shine.position.set(-0.022, 0.026, 0.055);
    nose.add(shine);
    nose.position.set(0, 0.845, HEAD_RADIUS + 0.025);
    return nose;
  },

  mustache(kit, seat) {
    const mustache = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-mustache', () => buildMustacheGeometry()),
        propMaterial(kit, 'prop-mustache', seat),
    );
    mustache.add(kit.createBakedOutline(kit.getSharedGeometry('prop-mustache-outline', () => buildMustacheGeometry(0.007))));
    return mustache;
  },

  scarf(kit, seat) {
    const scarf = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-scarf', () => buildScarfGeometry()),
        propMaterial(kit, 'prop-scarf', seat),
        { castShadow: true },
    );
    scarf.add(kit.createBakedOutline(kit.getSharedGeometry('prop-scarf-outline', () => buildScarfGeometry(0.009))));
    scarf.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-scarf-stripes', () => buildScarfStripesGeometry()),
        propMaterial(kit, 'prop-white', seat),
    )));
    return scarf;
  },

  // Over the head: the pawn's own head is hidden inside.
  pumpkin(kit, seat) {
    const pumpkin = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-pumpkin', () => buildPumpkinGeometry()),
        propMaterial(kit, 'prop-pumpkin', seat),
        { castShadow: true },
    );
    pumpkin.add(kit.createBakedOutline(kit.getSharedGeometry('prop-pumpkin-outline', () => buildPumpkinGeometry(0.01))));
    pumpkin.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-pumpkin-face', () => buildPumpkinFaceGeometry()),
        propMaterial(kit, 'prop-carve', seat),
    )));
    const stem = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-pumpkin-stem', () => new THREE.CylinderGeometry(0.022, 0.03, 0.08, 8).translate(0, 0.04, 0)),
        propMaterial(kit, 'prop-stem', seat),
        { outlineScale: 1.15 },
    );
    stem.position.y = (PUMPKIN_RADIUS * PUMPKIN_SQUASH) - 0.01;
    stem.rotation.z = -0.25;
    pumpkin.add(stem);
    pumpkin.position.y = HEAD_Y;
    return pumpkin;
  },

  ghost(kit, seat) {
    const sheet = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-ghost', () => buildGhostGeometry()),
        propMaterial(kit, 'prop-ghost', seat),
        { castShadow: true },
    );
    sheet.add(kit.createBakedOutline(kit.getSharedGeometry('prop-ghost-outline', () => buildGhostGeometry(0.009))));
    sheet.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-ghost-face', () => buildGhostFaceGeometry()),
        propMaterial(kit, 'prop-shades', seat),
    )));
    return sheet;
  },

  catEars(kit, seat) {
    const ears = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-cat-ears', () => buildCatEarsGeometry()),
        propMaterial(kit, 'prop-cat', seat),
        { castShadow: true },
    );
    ears.add(kit.createBakedOutline(kit.getSharedGeometry('prop-cat-ears-outline', () => buildCatEarsGeometry(0.009))));
    ears.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-cat-ears-inner', () => buildCatEarsGeometry(0, true)),
        propMaterial(kit, 'prop-pink', seat),
    )));
    ears.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-whiskers', () => buildWhiskersGeometry()),
        propMaterial(kit, 'prop-whisker', seat),
    )));
    const nose = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-cat-nose', () => new THREE.SphereGeometry(0.022, 10, 8).scale(1.3, 0.8, 0.8)),
        propMaterial(kit, 'prop-pink', seat),
        { outlineScale: 1.2 },
    );
    nose.position.set(0, 0.835, HEAD_RADIUS + 0.004);
    ears.add(nose);
    return ears;
  },

  chicken(kit, seat) {
    const beak = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-beak', () => buildBeakGeometry()),
        propMaterial(kit, 'prop-beak', seat),
    );
    beak.add(kit.createBakedOutline(kit.getSharedGeometry('prop-beak-outline', () => buildBeakGeometry(0.007))));
    const comb = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-comb', () => buildCombGeometry()),
        propMaterial(kit, 'prop-red', seat),
        { castShadow: true },
    );
    comb.add(kit.createBakedOutline(kit.getSharedGeometry('prop-comb-outline', () => buildCombGeometry(0.008))));
    beak.add(comb);
    return beak;
  },

  wizardHat(kit, seat) {
    const hat = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-wizard-hat', () => buildWizardHatGeometry()),
        propMaterial(kit, 'prop-wizard', seat),
        { castShadow: true },
    );
    hat.add(kit.createBakedOutline(kit.getSharedGeometry('prop-wizard-hat-outline', () => buildWizardHatGeometry(0.009))));
    hat.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-wizard-stars', () => buildWizardStarsGeometry()),
        propMaterial(kit, 'prop-star', seat),
    )));
    const band = markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-wizard-band', () => new THREE.CylinderGeometry(0.152, 0.158, 0.04, 18).translate(0, 0.03, 0)),
        propMaterial(kit, 'prop-star', seat),
    ));
    hat.add(band);
    hat.position.y = 0.975;
    hat.rotation.z = 0.08;
    return hat;
  },

  vampireEars(kit, seat) {
    const ears = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-vampire-ears', () => buildVampireEarsGeometry()),
        propMaterial(kit, 'prop-vampire', seat),
        { castShadow: true },
    );
    ears.add(kit.createBakedOutline(kit.getSharedGeometry('prop-vampire-ears-outline', () => buildVampireEarsGeometry(0.008))));
    ears.add(markRaw(new THREE.Mesh(
        kit.getSharedGeometry('prop-fangs', () => buildFangsGeometry()),
        propMaterial(kit, 'prop-white', seat),
    )));
    return ears;
  },

  alienAntennae(kit, seat) {
    const antennae = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-antennae', () => buildAntennaeGeometry()),
        propMaterial(kit, 'prop-alien', seat),
        { castShadow: true },
    );
    antennae.add(kit.createBakedOutline(kit.getSharedGeometry('prop-antennae-outline', () => buildAntennaeGeometry(0.008))));
    return antennae;
  },

  dinoSpikes(kit, seat) {
    const spikes = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-dino-spikes', () => buildDinoSpikesGeometry()),
        propMaterial(kit, 'prop-dino', seat),
        { castShadow: true },
    );
    spikes.add(kit.createBakedOutline(kit.getSharedGeometry('prop-dino-spikes-outline', () => buildDinoSpikesGeometry(0.008))));
    // Pawns face the camera, so a row down the back would never be seen:
    // turned to run down the side, it shows in silhouette.
    spikes.rotation.y = Math.PI / 2;
    return spikes;
  },

  flag(kit, seat, flagCode) {
    const code = FLAG_CODES.includes(flagCode) ? flagCode : DEFAULT_FLAG;
    const group = markRaw(new THREE.Group());
    const pole = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-flag-pole', () => new THREE.CylinderGeometry(0.016, 0.016, 0.86, 8)),
        propMaterial(kit, 'prop-pole', seat),
        // Thicken the line, not the length (it would poke out above the knob).
        { castShadow: true, outlineScale: { x: 1.3, y: 1.01, z: 1.3 } },
    );
    pole.position.set(0.19, 1.15, 0);
    const knob = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-flag-knob', () => new THREE.SphereGeometry(0.03, 10, 8)),
        propMaterial(kit, 'prop-gold', seat),
        { outlineScale: 1.15 },
    );
    knob.position.set(0.19, 1.6, 0);

    const texture = kit.getSharedTexture(`flag-${code}`, () => createFlagTexture(code, kit.requestRender));
    const cloth = kit.createOutlinedMesh(
        kit.getSharedGeometry('prop-flag-cloth', () => buildFlagClothGeometry()),
        kit.createToonMaterial(flagMaterialKey(code, seat), { color: '#ffffff', map: texture }),
        { castShadow: true },
    );
    cloth.add(kit.createBakedOutline(kit.getSharedGeometry('prop-flag-cloth-outline', () => buildFlagClothGeometry(0.008))));
    cloth.position.set(0.2, 1.4, 0);
    group.add(pole, knob, cloth);
    // Carried over the shoulder: a size up, leaning back (away from the
    // face) from where the pole meets the shoulder.
    const shoulder = markRaw(new THREE.Group());
    shoulder.position.set(0.19, FLAG_SHOULDER_Y, 0);
    group.position.set(-0.19, -FLAG_SHOULDER_Y, 0);
    shoulder.add(group);
    shoulder.scale.setScalar(1.25);
    shoulder.rotation.set(-0.42, 0, -0.1);
    return shoulder;
  },
};

export function buildPropMesh(propId, kit, seat, flagCode) {
  const build = PROP_BUILDERS[propId] || PROP_BUILDERS.none;
  return build(kit, seat, flagCode);
}
