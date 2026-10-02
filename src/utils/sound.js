import ApplicationStore from './ApplicationStore';

// Tiny WebAudio synth — no audio assets to ship. Every effect checks the
// sound setting at call time, so the settings toggle mutes instantly.
let audioContext = null;
let suspendTimer = null;
// Longest effect (bowling windup) is ~0.75s; give it ample tail.
const SUSPEND_AFTER_IDLE_MS = 2000;

// Every effect goes through here, so it also arms the idle suspend: a running
// AudioContext keeps the OS audio device and the audio render thread awake
// (real battery drain) even when nothing is playing.
const getContext = () => {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new Ctor();
  }

  // Fresh contexts start suspended until a user gesture, and we suspend
  // between effects — resume lazily. Sounds scheduled at currentTime while
  // suspended play as soon as it resumes.
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  clearTimeout(suspendTimer);
  suspendTimer = setTimeout(() => {
    if (audioContext.state === 'running') {
      audioContext.suspend();
    }
  }, SUSPEND_AFTER_IDLE_MS);

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
  trapdoor: (ctx) => {
    // Hinge clank; a beat of silence over the pit; then a falling whistle
    // into a muffled thud below.
    tone(ctx, { type: 'square', from: 320, to: 140, duration: 0.07, volume: 0.15 });
    noise(ctx, { filter: 'bandpass', frequency: 900, duration: 0.08, volume: 0.25 });
    tone(ctx, { from: 1300, to: 240, duration: 0.38, volume: 0.1, delay: 0.49 });
    tone(ctx, { from: 120, to: 45, duration: 0.2, volume: 0.35, delay: 0.86 });
  },
  bat: (ctx) => {
    // The "crack": bright noise snap over a hollow wooden knock.
    noise(ctx, { filter: 'highpass', frequency: 2500, duration: 0.06, volume: 0.4 });
    tone(ctx, { type: 'triangle', from: 900, to: 420, duration: 0.09, volume: 0.25 });
  },
  hammer: (ctx) => {
    // A heavy hollow wooden BONK.
    tone(ctx, { type: 'triangle', from: 170, to: 48, duration: 0.24, volume: 0.45 });
    noise(ctx, { frequency: 450, duration: 0.18, volume: 0.35 });
    tone(ctx, { type: 'triangle', from: 520, to: 300, duration: 0.06, volume: 0.15 });
  },
  anvil: (ctx) => {
    // CLANG: a metallic hit with a long ring over a heavy thud.
    tone(ctx, { type: 'square', from: 260, to: 120, duration: 0.12, volume: 0.22 });
    tone(ctx, { type: 'triangle', from: 1180, to: 1120, duration: 0.6, volume: 0.12 });
    noise(ctx, { frequency: 300, duration: 0.22, volume: 0.4 });
  },
  glove: (ctx) => {
    // Punch thud plus a springy BOING.
    noise(ctx, { frequency: 900, duration: 0.06, volume: 0.3 });
    tone(ctx, { from: 140, to: 520, duration: 0.25, volume: 0.28 });
  },
  pan: (ctx) => {
    // BONNG: a metallic smack with a long, slightly wavering ring.
    noise(ctx, { filter: 'bandpass', frequency: 1500, duration: 0.05, volume: 0.35 });
    tone(ctx, { type: 'triangle', from: 640, to: 610, duration: 0.7, volume: 0.2 });
    tone(ctx, { from: 1290, to: 1240, duration: 0.45, volume: 0.08 });
  },
  golf: (ctx) => {
    // A crisp "tink" off the clubface.
    noise(ctx, { filter: 'highpass', frequency: 4000, duration: 0.04, volume: 0.3 });
    tone(ctx, { type: 'triangle', from: 1900, to: 1500, duration: 0.12, volume: 0.18 });
  },
  racket: (ctx) => {
    // THWOCK: a hollow pop with a twang of the strings.
    tone(ctx, { type: 'triangle', from: 420, to: 180, duration: 0.08, volume: 0.32 });
    noise(ctx, { filter: 'bandpass', frequency: 1200, duration: 0.05, volume: 0.25 });
    tone(ctx, { type: 'square', from: 260, to: 240, duration: 0.18, volume: 0.05 });
  },
  cannon: (ctx) => {
    // The cannonball's heavy thump (the BOOM was the windup's).
    tone(ctx, { from: 150, to: 50, duration: 0.2, volume: 0.45 });
    noise(ctx, { frequency: 600, duration: 0.14, volume: 0.35 });
  },
  magician: (ctx) => {
    // A sparkly chime into a soft POOF.
    [1568, 2093, 2637].forEach((frequency, i) => {
      tone(ctx, { type: 'triangle', from: frequency, to: frequency, duration: 0.25, volume: 0.07, delay: i * 0.04 });
    });
    noise(ctx, { frequency: 1200, duration: 0.3, volume: 0.25 });
  },
  vampire: (ctx) => {
    // A muffled smoke-bomb pop, then the bats' squeaks.
    noise(ctx, { frequency: 400, duration: 0.35, volume: 0.45 });
    [0.12, 0.2, 0.26, 0.37, 0.45].forEach((delay, i) => {
      tone(ctx, { from: 3200 + (i * 250), to: 2400, duration: 0.05, volume: 0.05, delay });
    });
  },
  ufo: (ctx) => {
    // The tractor beam's rising "vworp".
    tone(ctx, { from: 260, to: 900, duration: 0.55, volume: 0.14 });
    tone(ctx, { type: 'triangle', from: 390, to: 1350, duration: 0.55, volume: 0.06 });
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
  if (finisherId === 'hammer' || finisherId === 'anvil') {
    // The pancake pops back into shape, then flies home.
    tone(ctx, { type: 'triangle', from: 240, to: 700, duration: 0.12, volume: 0.12, delay: 0.5 });
    tone(ctx, { from: 320, to: 1100, duration: 0.45, volume: 0.08, delay: 0.6 });
    return;
  }
  if (finisherId === 'magician' || finisherId === 'vampire') {
    // The poof back into a pawn at home.
    noise(ctx, { frequency: 1000, duration: 0.25, volume: 0.22, delay: finisherId === 'magician' ? 1.56 : 1.22 });
    return;
  }
  if (finisherId === 'ufo') {
    // Beamed down at home, then the saucer zips off.
    tone(ctx, { from: 900, to: 260, duration: 0.3, volume: 0.12, delay: 1.24 });
    tone(ctx, { from: 500, to: 2200, duration: 0.4, volume: 0.08, delay: 1.65 });
    return;
  }
  if (finisherId === 'trapdoor') {
    // "Boing" as the victim springs back up out of its home field.
    tone(ctx, { type: 'triangle', from: 180, to: 620, duration: 0.22, volume: 0.12, delay: 1.01 });
    return;
  }
  // Cartoon "wheee" as the victim flies home.
  tone(ctx, { from: 320, to: 1100, duration: 0.45, volume: 0.08, delay: 0.1 });
};

const FINISHER_WINDUPS = {
  // Bowling-ball rumble while it rolls in.
  bowling: (ctx) => noise(ctx, { frequency: 220, duration: 0.75, volume: 0.3 }),
  // Whoosh of the mallet coming down (the strike starts ~0.67s after this).
  hammer: (ctx) => noise(ctx, { filter: 'bandpass', frequency: 700, duration: 0.16, volume: 0.3, delay: 0.64 }),
  // A short whistle as the anvil drops into frame (~0.37s after this), then
  // the long one as it falls from the hang (~0.75s).
  anvil: (ctx) => {
    tone(ctx, { from: 1700, to: 1100, duration: 0.12, volume: 0.07, delay: 0.37 });
    tone(ctx, { from: 1600, to: 380, duration: 0.18, volume: 0.1, delay: 0.75 });
  },
  // A jack-in-the-box crank tune, rising.
  glove: (ctx) => {
    [660, 740, 830, 990].forEach((frequency, i) => {
      tone(ctx, { type: 'triangle', from: frequency, to: frequency, duration: 0.08, volume: 0.1, delay: 0.25 + (i * 0.1) });
    });
  },
  // The fuse fizzing once the cannon's in place, then the BOOM as it fires
  // (~1.03s after this, just before the ball hits).
  cannon: (ctx) => {
    noise(ctx, { filter: 'highpass', frequency: 4000, duration: 0.8, volume: 0.18, delay: 0.23 });
    tone(ctx, { from: 110, to: 30, duration: 0.6, volume: 0.55, delay: 1.03 });
    noise(ctx, { frequency: 500, duration: 0.6, volume: 0.5, delay: 1.03 });
  },
  // Twinkles as the wand loops through the air.
  magician: (ctx) => {
    [1319, 1568, 1760, 2093, 2349].forEach((frequency, i) => {
      tone(ctx, { type: 'triangle', from: frequency, to: frequency, duration: 0.07, volume: 0.06, delay: 0.25 + (i * 0.09) });
    });
  },
  // The bomb's fuse fizzing while it's held up.
  vampire: (ctx) => noise(ctx, { filter: 'highpass', frequency: 4000, duration: 0.5, volume: 0.15, delay: 0.2 }),
  // The saucer's wobbly hum as it swoops in.
  ufo: (ctx) => {
    [0, 0.12, 0.24, 0.36].forEach((delay, i) => {
      tone(ctx, { from: 700 - (i * 60), to: 520 - (i * 60), duration: 0.12, volume: 0.07, delay });
    });
  },
  // Lever ratchet: a few clicks as it's hauled back.
  trapdoor: (ctx) => {
    [0.25, 0.36, 0.47, 0.58].forEach((delay) => {
      noise(ctx, { filter: 'highpass', frequency: 3000, duration: 0.025, volume: 0.22, delay });
    });
  },
};

export const playFinisherWindup = (finisherId) => {
  const windup = FINISHER_WINDUPS[finisherId];
  if (!ApplicationStore.settings.soundEnabled || !windup) return;
  const ctx = getContext();
  if (!ctx) return;
  windup(ctx);
};
