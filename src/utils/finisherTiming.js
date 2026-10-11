// Finisher timelines (see finishers.js for what each phase drives). Kept
// free of three.js/vue imports: tests/finisher_timing.test.mjs checks every
// total against the server's Bot pacing (shared/protocol.js ANIMATION_MS).

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
