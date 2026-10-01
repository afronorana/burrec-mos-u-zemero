// Gobkit "Nature Kit" (CC0, https://gobkit.com/freebies) — the low-poly props
// that dress the meadow around the table. Every .glb is one mesh authored in
// centimeters with its origin on the ground, sharing a single 512px palette
// texture; we load the geometries, bake each file's node transform + the
// cm→m scale into them, and keep one copy of the texture.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const MODEL_URLS = import.meta.glob('../assets/nature/*.glb', {
  query: '?url',
  import: 'default',
  eager: true,
});

const CM_TO_M = 0.01;

function modelUrl(name) {
  const url = MODEL_URLS[`../assets/nature/${name}.glb`];
  if (!url) {
    throw new Error(`Nature kit model missing: ${name}`);
  }
  return url;
}

// Resolves to { geometries: { [name]: BufferGeometry }, texture }.
// The texture is the kit's shared palette; duplicates from the other files
// are disposed.
export async function loadNatureKit(names) {
  const loader = new GLTFLoader();
  const results = await Promise.all(names.map((name) => loader.loadAsync(modelUrl(name))));

  const geometries = {};
  let texture = null;

  results.forEach((gltf, index) => {
    const parts = [];
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((child) => {
      if (!child.isMesh) {
        return;
      }
      parts.push(child.geometry.clone().applyMatrix4(child.matrixWorld));
      const map = child.material?.map;
      if (map && !texture) {
        texture = map;
      } else if (map && map !== texture) {
        map.dispose();
      }
      child.geometry.dispose();
      child.material?.dispose();
    });

    const geometry = parts.length === 1 ? parts[0] : mergeGeometries(parts);
    if (parts.length > 1) {
      parts.forEach((part) => part.dispose());
    }
    geometry.scale(CM_TO_M, CM_TO_M, CM_TO_M);
    geometry.computeBoundingSphere();
    geometries[names[index]] = geometry;
  });

  return { geometries, texture };
}

// Meadow: center (6.2, 5), top surface y = -1.37, radius 18.4. The table
// covers x/z ∈ [-2.1, 12.1] and the menu camera orbits the board center at
// r = 9.5, so everything tall stays outside r ≈ 11.5. The play camera looks
// toward -z, so the backdrop is weighted to that side.
export const MEADOW_CENTER = { x: 6.2, z: 5 };
export const MEADOW_GROUND_Y = -1.37;

// Polar helper: angle in degrees around the meadow center, 0° = +x,
// -90° = -z (behind the board from the player's view).
function polar(angleDeg, radius) {
  const a = THREE.MathUtils.degToRad(angleDeg);
  return {
    x: MEADOW_CENTER.x + (Math.cos(a) * radius),
    z: MEADOW_CENTER.z + (Math.sin(a) * radius),
  };
}

function place(model, angleDeg, radius, scale, yaw = 0, y = MEADOW_GROUND_Y) {
  return { model, ...polar(angleDeg, radius), y, scale, yaw };
}

// Big, always-visible scenery: mountain ring, rolling hills, tree line, clouds.
export const NATURE_BACKDROP = [
  // Mountains sit on the meadow's rim, bases sunk below the edge so the
  // far side (hanging over the void) is hidden behind them.
  place('Mountain001', -112, 20.5, 1.3, 0.4, -2.3),
  place('Mountain002', -78, 21.5, 1.45, 2.2, -2.3),
  place('Mountain003', -44, 20.5, 1.25, 4.1, -2.3),
  place('Mountain002', -150, 20, 1.1, 5.2, -2.3),
  place('Mountain001', -8, 20, 1.05, 1.6, -2.3),
  place('Mountain003', 155, 20, 1.1, 3.0, -2.3),
  place('Mountain001', 30, 20, 1.0, 2.6, -2.3),
  place('MountainFar001', -96, 25, 2.0, 0.2, -2.6),
  place('MountainFar002', -60, 26, 1.9, 1.1, -2.6),
  place('MountainFar003', -132, 25, 1.8, 2.9, -2.6),

  // Rolling hills on the meadow, in front of the mountains.
  place('Hill001', -100, 15.5, 1.3, 0.3),
  place('Hill002', -62, 15.5, 1.2, 1.8),
  place('Hill003', -138, 15, 1.15, 4.4),
  place('Hill002', -22, 15.5, 1.0, 3.1),
  place('Hill001', 170, 15.5, 1.0, 5.0),
  place('Hill003', 20, 15.5, 1.0, 0.9),
  place('Hill001', 125, 15.5, 1.0, 2.0),

  // Tree line.
  place('TreeHigh001', -96, 13.2, 0.55, 0.0),
  place('TreeMed002', -84, 14.6, 0.5, 1.2),
  place('TreeLow002', -105, 12.4, 0.6, 2.4),
  place('TreeHigh003', -70, 12.8, 0.6, 0.7),
  place('TreeMed001', -122, 13.6, 0.55, 3.3),
  place('TreeLow001', -60, 12.0, 0.65, 4.0),
  place('TreeHigh002', -132, 12.4, 0.55, 5.1),
  place('TreeMed003', -48, 14.2, 0.42, 2.0),
  place('TreeLow004', -142, 13.2, 0.6, 0.4),
  place('TreeHigh001', -30, 12.8, 0.6, 1.4),
  place('TreeLow003', -18, 13.6, 0.65, 3.6),
  place('TreeMed002', -160, 12.8, 0.5, 2.8),
  place('TreeHigh002', -4, 13.2, 0.5, 4.6),
  place('TreeLow002', 10, 12.6, 0.6, 0.9),
  place('TreeMed001', -176, 13.6, 0.5, 5.5),
  place('TreeHigh003', 172, 12.4, 0.55, 1.9),
  place('TreeLow001', 158, 13.6, 0.6, 3.1),
  place('TreeMed003', 26, 13.6, 0.4, 4.3),
  place('TreeHigh001', 142, 12.8, 0.5, 2.2),
  place('TreeLow004', 40, 12.4, 0.55, 0.6),
  place('TreeMed002', 128, 13.2, 0.45, 4.9),
  place('TreeHigh002', 55, 13.6, 0.5, 1.7),
  place('TreeLow003', 114, 12.8, 0.55, 3.8),

  // Bushes along the inside of the tree line.
  place('Bush001', -88, 11.6, 0.55, 0.5),
  place('Bush002', -116, 11.2, 0.5, 2.0),
  place('Bush001', -40, 11.4, 0.5, 3.3),
  place('Bush002', -150, 11.2, 0.55, 4.4),
  place('Bush001', 0, 11.4, 0.5, 1.1),
  place('Bush002', 180, 11.4, 0.5, 5.8),
  place('Bush001', 48, 11.6, 0.45, 2.7),
  place('Bush002', 134, 11.6, 0.45, 0.2),

  // Clouds.
  { model: 'Cloud001', x: -9.8, y: 9.6, z: -15.6, scale: 0.7, yaw: 0.2 },
  { model: 'Cloud002', x: 3.8, y: 11.4, z: -18.4, scale: 0.8, yaw: -0.1 },
  { model: 'Cloud003', x: 18.2, y: 10.2, z: -14.8, scale: 0.65, yaw: 0.3 },
  { model: 'Cloud001', x: 16.6, y: 8.6, z: -5.4, scale: 0.5, yaw: 2.9 },
  { model: 'Cloud002', x: -6.4, y: 8.8, z: 2.2, scale: 0.5, yaw: 1.4 },
];

// Small ground clutter, hidden on the lowest render-quality preset.
export const NATURE_DETAILS = [
  place('Rock001', -128, 9.2, 0.35, 0.7),
  place('Rock002', -126, 10.0, 0.22, 2.1),
  place('Rock003', -76, 9.6, 0.3, 2.1),
  place('Rock002', -14, 9.4, 0.32, 4.0),
  place('Rock001', 30, 9.8, 0.28, 5.4),
  place('Rock003', 160, 9.2, 0.3, 1.3),
  place('Rock002', 162, 10.0, 0.18, 3.2),
  place('Reed001', -58, 10.4, 0.2, 0.0),
  place('Reed002', -55, 10.8, 0.2, 1.0),
  place('Reed001', -52, 10.3, 0.17, 2.0),
  place('Reed002', 146, 10.4, 0.2, 0.5),
  place('Reed001', 149, 10.8, 0.18, 1.5),
  ...scatterGrass(46, 0xb0ec),
];

// Grass tufts in a ring between the table and the tree line. Seeded so the
// layout is the same on every load.
function scatterGrass(count, seed) {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state ^ (state >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0;
    return state / 4294967296;
  };
  const models = ['Grass001', 'Grass002', 'Grass003'];
  const tufts = [];
  for (let i = 0; i < count; i += 1) {
    tufts.push(place(
        models[i % models.length],
        (i / count) * 360 + (random() * 6),
        9.4 + (random() * 3.4),
        0.13 + (random() * 0.06),
        random() * Math.PI * 2,
    ));
  }
  return tufts;
}

export const NATURE_MODEL_NAMES = [...new Set(
    [...NATURE_BACKDROP, ...NATURE_DETAILS].map((entry) => entry.model),
)];
