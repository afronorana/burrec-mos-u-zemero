export const OUTLINE_APPEARANCE_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'classic', label: 'Classic' },
  { value: 'bold', label: 'Bold' },
];

const OUTLINE_APPEARANCE_PRESETS = {
  off: {
    visible: false,
    lineOpacity: 0,
    lineScale: 1,
  },
  subtle: {
    visible: true,
    lineOpacity: 0.42,
    lineScale: 0.985,
  },
  classic: {
    visible: true,
    lineOpacity: 0.78,
    lineScale: 1,
  },
  bold: {
    visible: true,
    lineOpacity: 1,
    lineScale: 1.02,
  },
};

export function getOutlineAppearancePreset(value) {
  return OUTLINE_APPEARANCE_PRESETS[value] || OUTLINE_APPEARANCE_PRESETS.classic;
}
