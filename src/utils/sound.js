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

// ── Finisher sounds ─────────────────────────────────────────────────────
let noiseBuffer = null;
const getNoiseBuffer = (ctx) => {
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
};

const tone = (ctx, { type = 'sine', from, to, duration, volume, delay = 0 }) => {
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
};

const noise = (ctx, { filter = 'lowpass', frequency, duration, volume, delay = 0 }) => {
  const start = ctx.currentTime + delay;
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);
  const biquad = ctx.createBiquadFilter();
  biquad.type = filter;
  biquad.frequency.setValueAtTime(frequency, start);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(biquad).connect(gain).connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
};

const FINISHER_IMPACTS = {
  shove: (ctx) => {
    tone(ctx, { from: 180, to: 60, duration: 0.18, volume: 0.35 });
  },
  kick: (ctx) => {
    tone(ctx, { from: 220, to: 55, duration: 0.16, volume: 0.4 });
    noise(ctx, { frequency: 1400, duration: 0.07, volume: 0.25 });
  },
  bat: (ctx) => {
    // The "crack": bright noise snap over a hollow wooden knock.
    noise(ctx, { filter: 'highpass', frequency: 2500, duration: 0.06, volume: 0.4 });
    tone(ctx, { type: 'triangle', from: 900, to: 420, duration: 0.09, volume: 0.25 });
  },
  bowling: (ctx) => {
    // Pin-strike clatter: a few staggered knocks.
    [0, 0.04, 0.09, 0.13].forEach((delay, i) => {
      tone(ctx, { type: 'triangle', from: 700 - i * 90, to: 260, duration: 0.08, volume: 0.22, delay });
    });
    noise(ctx, { filter: 'bandpass', frequency: 1800, duration: 0.25, volume: 0.2 });
  },
};

// Played at a Finisher's impact; unknown ids fall back to the shove thud.
export const playFinisherImpact = (finisherId) => {
  if (!ApplicationStore.settings.soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;
  (FINISHER_IMPACTS[finisherId] || FINISHER_IMPACTS.shove)(ctx);
  // Cartoon "wheee" as the victim flies home.
  tone(ctx, { from: 320, to: 1100, duration: 0.45, volume: 0.08, delay: 0.1 });
};

// Bowling-ball rumble while it rolls in.
export const playFinisherWindup = (finisherId) => {
  if (!ApplicationStore.settings.soundEnabled || finisherId !== 'bowling') return;
  const ctx = getContext();
  if (!ctx) return;
  noise(ctx, { frequency: 220, duration: 0.75, volume: 0.3 });
};
