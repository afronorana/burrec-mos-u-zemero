export const RENDER_QUALITY_MIN = 1;
export const RENDER_QUALITY_MAX = 3;

const RENDER_QUALITY_PRESETS = {
  1: {
    label: 'Low',
    pixelRatioScale: 0.65,
    maxPixelRatio: 1.0,
    shadowsEnabled: false,
    shadowMapSize: 0,
    outlinesEnabled: false,
    decorationsEnabled: false,
  },
  2: {
    label: 'Balanced',
    pixelRatioScale: 0.92,
    maxPixelRatio: 1.5,
    shadowsEnabled: true,
    shadowMapSize: 768,
    outlinesEnabled: true,
    decorationsEnabled: true,
  },
  3: {
    label: 'High',
    pixelRatioScale: 1.08,
    maxPixelRatio: 2,
    shadowsEnabled: true,
    shadowMapSize: 1024,
    outlinesEnabled: true,
    decorationsEnabled: true,
  },
};

export function normalizeRenderQuality(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 2;
  }

  return Math.min(
      RENDER_QUALITY_MAX,
      Math.max(RENDER_QUALITY_MIN, Math.round(numericValue)),
  );
}

export function getRenderQualityPreset(value) {
  return RENDER_QUALITY_PRESETS[normalizeRenderQuality(value)] || RENDER_QUALITY_PRESETS[2];
}
