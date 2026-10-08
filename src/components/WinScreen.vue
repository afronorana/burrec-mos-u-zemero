<template>
  <div class="win-overlay" v-if="store.winner">
    <!-- Full-screen confetti burst (same dotlottie asset as Shtet Qytet),
         played once when the winner appears; pointer-events stay off so the
         button underneath keeps working. The player is an async component so
         its JS+wasm never touch the initial page load. -->
    <div v-if="showConfetti" class="win-confetti-overlay" aria-hidden="true">
      <confetti-player class="win-confetti-lottie" autoplay :loop="false" :src="confettiSrc" />
    </div>

    <app-panel class="menu-card win-card">
      <p class="win-icon">
        <trophy-icon :size="48" class="lucide-trophy" />
      </p>
      <h2 class="panel-title" v-html="t('win.wins', { name: `<span class='win-winner-name' style='color: ${store.winner.color}'>${escapeHtml(store.winner.name)}</span>` })"></h2>
      <p class="panel-desc">{{ store.winner.self ? t('win.congrats') : t('win.betterLuck') }}</p>

      <!-- End-of-game board: winner first, then by pawns brought home. -->
      <div v-if="rows.length" class="win-stats">
        <table class="win-table">
          <thead>
            <tr>
              <th class="win-col-player">{{ t('win.player') }}</th>
              <th :title="t('win.finishedHint')">{{ t('win.finished') }}</th>
              <th :title="t('win.capturesHint')">{{ t('win.captures') }}</th>
              <th :title="t('win.capturedHint')">{{ t('win.captured') }}</th>
              <th :title="t('win.sixesHint')">{{ t('win.sixes') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.seat" :class="{ 'win-row--winner': row.winner, 'win-row--self': row.self }">
              <td class="win-col-player">
                <span class="win-player">
                  <span class="win-dot" :style="{ background: row.color }"></span>
                  <span class="win-name">{{ row.name }}</span>
                  <trophy-icon v-if="row.winner" :size="14" class="win-row-trophy" />
                </span>
              </td>
              <td>{{ row.finished }}/4</td>
              <td>{{ row.captures }}</td>
              <td>{{ row.captured }}</td>
              <td>{{ row.sixes }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="summary" class="win-summary">{{ summary }}</p>
      </div>

      <div class="win-actions">
        <app-button v-if="store.online.matchId" class="menu-btn-full" :loading="replaying" :disabled="replaying" @click="playAgain">
          {{ t('win.playAgain') }}
        </app-button>
        <p v-if="replayFailed" class="win-error">{{ t('win.playAgainFailed') }}</p>
        <app-button red class="menu-btn-full" @click="backToMenu">
          {{ t('win.backToMenu') }}
        </app-button>
      </div>
    </app-panel>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';
import { Trophy } from '@lucide/vue';
import confettiSrc from '../assets/lottie/Confetti.lottie?url';

const CONFETTI_DURATION_MS = 10000;
const PLAY_AGAIN_TIMEOUT_MS = 4000;

// The dotlottie player (JS + 1.5MB wasm) is only needed the moment a game
// ends — load it lazily so it stays out of the startup bundle. The wasm is
// served from our own bundle (no CDN fetch).
const ConfettiPlayer = defineAsyncComponent(async () => {
  const [player, wasmUrl] = await Promise.all([
    import('@lottiefiles/dotlottie-vue'),
    import('../assets/wasm/dotlottie-player.wasm?url'),
  ]);
  player.setWasmUrl(wasmUrl.default);
  return player.DotLottieVue;
});

export default {
  components: { TrophyIcon: Trophy, ConfettiPlayer },
  data() {
    return {
      store: ApplicationStore,
      confettiSrc,
      showConfetti: false,
      confettiTimeout: null,
      replaying: false,
      replayFailed: false,
    };
  },
  computed: {
    // One row per seat from the GAME_OVER stats (players are markRaw, so
    // this re-reads store.players whenever gameOver/winner change).
    rows() {
      const over = this.store.online.gameOver;
      if (!over || !over.stats) {
        return [];
      }
      const winnerSeat = this.store.winner ? this.store.winner.seat : over.winnerSeat;
      return this.store.players
        .map((player) => {
          const seat = player.turn - 1;
          const stats = over.stats[seat] || {};
          return {
            seat,
            name: player.name,
            color: player.color,
            self: player.controller === 'local',
            winner: seat === winnerSeat,
            finished: stats.finished || 0,
            captures: stats.captures || 0,
            captured: stats.captured || 0,
            sixes: stats.sixes || 0,
          };
        })
        .sort((a, b) => (b.winner - a.winner) || (b.finished - a.finished) || (b.captures - a.captures));
    },
    // "Game time 12:34 · 18 rounds"
    summary() {
      const over = this.store.online.gameOver;
      if (!over) {
        return '';
      }
      const total = Math.round((over.durationMs || 0) / 1000);
      const time = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
      return t('win.summary', { time, rounds: over.rounds || 0 });
    },
  },
  watch: {
    'store.winner'(winner) {
      if (winner) {
        this.playConfetti();
      } else {
        this.stopConfetti();
      }
      this.replaying = false;
      this.replayFailed = false;
    },
  },
  mounted() {
    if (this.store.winner) {
      this.playConfetti();
    }
  },
  beforeUnmount() {
    this.stopConfetti();
    clearTimeout(this.replayTimeout);
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
    escapeHtml(text) {
      return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    // Same room, same players, same Game mode: the server reopens the lobby
    // and LOBBY_STATE moves everyone there (MatchController.applyLobbyState).
    playAgain() {
      this.replaying = true;
      this.replayFailed = false;
      MatchController.requestPlayAgain();
      clearTimeout(this.replayTimeout);
      this.replayTimeout = setTimeout(() => {
        if (this.store.winner) {
          this.replaying = false;
          this.replayFailed = true;
        }
      }, PLAY_AGAIN_TIMEOUT_MS);
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
  width: min(460px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  box-sizing: border-box;
}

/* The seat color on the orange card (yellow especially) needs an outline. */
.win-card :deep(.win-winner-name) {
  text-shadow:
    -1px -1px 0 var(--agu-color-base, #263f2a), 1px -1px 0 var(--agu-color-base, #263f2a),
    -1px 1px 0 var(--agu-color-base, #263f2a), 1px 1px 0 var(--agu-color-base, #263f2a),
    0 2px 0 var(--agu-color-base, #263f2a);
}

.win-stats {
  margin: 14px 0 4px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 10px;
}

.win-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  color: var(--agu-color-base, #263f2a);
}

.win-table th {
  padding: 4px 4px 6px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 2px solid rgba(38, 63, 42, 0.2);
}

.win-table td {
  padding: 6px 4px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid rgba(38, 63, 42, 0.1);
}

.win-table tr:last-child td {
  border-bottom: none;
}

.win-table .win-col-player {
  text-align: left;
}

.win-player {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.win-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
}

.win-dot {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--agu-color-base, #263f2a);
}

.win-row--winner td {
  background: rgba(253, 194, 91, 0.55);
}

.win-row--self .win-name {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.win-row-trophy {
  flex-shrink: 0;
  color: var(--agu-color-orange-dark, #ee9448);
}

.win-summary {
  margin: 8px 0 0;
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0.8;
}

.win-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
}

.win-actions .menu-btn-full {
  margin: 0;
}

.win-error {
  margin: 0;
  font-size: 0.75rem;
  color: var(--agu-color-red, #e9576f);
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
