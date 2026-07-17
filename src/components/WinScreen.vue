<template>
  <div class="win-overlay" v-if="store.winner">
    <!-- Full-screen confetti burst (same dotlottie asset as Shtet Qytet),
         played once when the winner appears; pointer-events stay off so the
         button underneath keeps working. -->
    <div v-if="showConfetti" class="win-confetti-overlay" aria-hidden="true">
      <dot-lottie-vue class="win-confetti-lottie" autoplay :loop="false" :src="confettiSrc" />
    </div>

    <app-panel class="menu-card win-card">
      <p class="win-icon">
        <trophy-icon :size="48" class="lucide-trophy" />
      </p>
      <h2 class="panel-title" v-html="t('win.wins', { name: `<span style='color: ${store.winner.color}'>${store.winner.name}</span>` })"></h2>
      <p class="panel-desc">{{ store.winner.self ? t('win.congrats') : t('win.betterLuck') }}</p>
      <app-button class="menu-btn-full" @click="backToMenu">
        {{ t('win.backToMenu') }}
      </app-button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';
import { Trophy } from '@lucide/vue';
import { DotLottieVue, setWasmUrl } from '@lottiefiles/dotlottie-vue';
import confettiSrc from '../assets/lottie/Confetti.lottie?url';
import dotLottieWasmUrl from '../assets/wasm/dotlottie-player.wasm?url';

const CONFETTI_DURATION_MS = 10000;

// Serve the dotlottie player wasm from our own bundle — no CDN fetch.
setWasmUrl(dotLottieWasmUrl);

export default {
  components: { TrophyIcon: Trophy, DotLottieVue },
  data() {
    return {
      store: ApplicationStore,
      confettiSrc,
      showConfetti: false,
      confettiTimeout: null,
    };
  },
  watch: {
    'store.winner'(winner) {
      if (winner) {
        this.playConfetti();
      } else {
        this.stopConfetti();
      }
    },
  },
  mounted() {
    if (this.store.winner) {
      this.playConfetti();
    }
  },
  beforeUnmount() {
    this.stopConfetti();
  },
  methods: {
    t,
    playConfetti() {
      this.showConfetti = true;
      if (this.confettiTimeout) {
        clearTimeout(this.confettiTimeout);
      }
      this.confettiTimeout = setTimeout(() => {
        this.showConfetti = false;
        this.confettiTimeout = null;
      }, CONFETTI_DURATION_MS);
    },
    stopConfetti() {
      this.showConfetti = false;
      if (this.confettiTimeout) {
        clearTimeout(this.confettiTimeout);
        this.confettiTimeout = null;
      }
    },
    async backToMenu() {
      if (this.store.online.enabled) {
        await MatchController.leaveMatch(); // returns to the online menu
        return;
      }
      this.store.winner = null;
      this.store.currentScreen = 'main-menu';
    },
  },
};
</script>

<style scoped>
.win-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 40;
}

.win-confetti-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.win-confetti-lottie {
  width: 100%;
  height: 100%;
}

.win-card {
  text-align: center;
}

.win-icon {
  margin: 0 0 10px;
}

.lucide-trophy {
  color: var(--agu-color-orange-dark, #ee9448);
  display: inline-block;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
</style>
