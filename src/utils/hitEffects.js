// Comic-style capture effects ("POW!", "ZAPP!", …) shown when a pawn is sent
// back home. Every SVG dropped into src/assets/hitEffects/ is auto-registered
// here and picked at random per capture — no code change needed for new art.
// Authoring conventions (viewBox, layer classes) are documented in pow.svg;
// the layer animations live in styles/app.scss under "Hit effects".

const modules = import.meta.glob('../assets/hitEffects/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const HIT_EFFECT_SVGS = Object.values(modules);

// Total lifetime of one effect. The CSS keyframes are percentage-based, so
// this single value drives the whole choreography (set as --fx-duration).
export const HIT_EFFECT_DURATION_MS = 950;

export function getRandomHitEffectSvg() {
  return HIT_EFFECT_SVGS[Math.floor(Math.random() * HIT_EFFECT_SVGS.length)];
}
