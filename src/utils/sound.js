import ApplicationStore from './ApplicationStore';

// Tiny WebAudio synth — no audio assets to ship. Every effect checks the
// sound setting at call time, so the settings toggle mutes instantly.
let audioContext = null;

const getContext = () => {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new Ctor();
  }

  // Browsers suspend fresh contexts until a user gesture; resume lazily.
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
};

// Short clock-tick blip, used for the last seconds of the turn timer.
export const playTick = () => {
  if (!ApplicationStore.settings.soundEnabled) {
    return;
  }

  const ctx = getContext();
  if (!ctx) {
    return;
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1050, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.055);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};
