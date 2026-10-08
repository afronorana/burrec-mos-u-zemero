<template>
  <div class="menu-center">
    <!-- CONTEXT.md: Table — a Shared table's setup: each color is a player on
         this device or the Computer. The first player is us (our own seat,
         our Cosmetics); the names are remembered for the next game. -->
    <app-panel class="menu-card setup-card">
      <h2 class="panel-title">{{ t('play.shared') }}</h2>
      <p class="setup-hint">{{ t('play.setupHint') }}</p>

      <div class="setup-seats">
        <div
          v-for="(seat, index) in seats"
          :key="index"
          class="setup-seat"
          :class="{ 'setup-seat--player': seat.kind === 'player' }"
          :style="{ '--seat-color': colors[index] }"
        >
          <button
            type="button"
            class="setup-seat-toggle"
            :aria-pressed="seat.kind === 'player'"
            @click="toggle(index)"
          >
            <span class="setup-seat-dot"></span>
            <bot-icon v-if="seat.kind === 'computer'" :size="18" />
            <user-icon v-else :size="18" />
            <span class="setup-seat-kind">{{ seat.kind === 'player' ? t('play.player') : t('play.computer') }}</span>
          </button>
          <input
            v-if="seat.kind === 'player'"
            v-model="seat.name"
            class="setup-seat-name"
            type="text"
            maxlength="12"
            :placeholder="index === ownIndex ? store.online.displayName : t('play.playerName', { n: playerNumber(index) })"
            :aria-label="t('play.player')"
          />
          <span v-if="index === ownIndex" class="setup-seat-you">{{ t('play.you') }}</span>
        </div>
      </div>

      <p v-if="playerCount < 2" class="setup-note">{{ t('play.needTwo') }}</p>

      <app-button class="menu-btn-full setup-start" :disabled="busy || playerCount < 2" @click="start">
        {{ t('play.start') }}
      </app-button>

      <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>

      <div class="menu-row">
        <app-button red :disabled="busy" @click="back">{{ t('back') }}</app-button>
      </div>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { Bot, User } from '@lucide/vue';

const SETUP_KEY = 'burrec.sharedTable';

function defaultSeats() {
  return [
    { kind: 'player', name: '' },
    { kind: 'computer', name: '' },
    { kind: 'player', name: '' },
    { kind: 'computer', name: '' },
  ];
}

function readSeats() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(SETUP_KEY) || 'null');
    if (Array.isArray(saved) && saved.length === 4) {
      return saved.map((seat) => ({
        kind: seat && seat.kind === 'player' ? 'player' : 'computer',
        name: seat && typeof seat.name === 'string' ? seat.name.slice(0, 12) : '',
      }));
    }
  } catch (error) {
    // Unreadable or blocked storage: start fresh.
  }
  return defaultSeats();
}

export default {
  components: { BotIcon: Bot, UserIcon: User },
  data() {
    return {
      store: ApplicationStore,
      colors: PLAYER_COLORS,
      seats: readSeats(),
      busy: false,
    };
  },
  computed: {
    playerCount() {
      return this.seats.filter((seat) => seat.kind === 'player').length;
    },
    // The first player row is ours.
    ownIndex() {
      return this.seats.findIndex((seat) => seat.kind === 'player');
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
  },
  methods: {
    t,
    toggle(index) {
      const seat = this.seats[index];
      seat.kind = seat.kind === 'player' ? 'computer' : 'player';
    },
    // "Player 2" for the second player row, and so on.
    playerNumber(index) {
      return this.seats.slice(0, index + 1).filter((seat) => seat.kind === 'player').length;
    },
    async start() {
      try {
        window.localStorage.setItem(SETUP_KEY, JSON.stringify(this.seats));
      } catch (error) {
        // Not remembered, still playable.
      }
      const seats = this.seats.map((seat, index) => ({
        kind: seat.kind,
        name: seat.kind !== 'player'
          ? ''
          : (seat.name.trim() || (index === this.ownIndex ? this.store.online.displayName : t('play.playerName', { n: this.playerNumber(index) }))),
      }));
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await MatchController.startTable('shared', this.store.online.displayName, seats);
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'connect_failed';
      } finally {
        this.busy = false;
      }
    },
    back() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'play-mode';
    },
  },
};
</script>

<style scoped>
.setup-card {
  width: min(460px, calc(100vw - 32px));
}
.setup-hint {
  margin: 0 0 14px;
  font-size: 0.9rem;
  text-align: center;
  opacity: 0.85;
}
.setup-seats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.setup-seat {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
}
.setup-seat-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  min-width: 148px;
  min-height: 44px;
  padding: 6px 12px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  box-shadow: inset 0 -3px 0 rgba(38, 63, 42, 0.15);
  cursor: pointer;
  opacity: 0.7;
  -webkit-tap-highlight-color: transparent;
}
.setup-seat--player .setup-seat-toggle {
  opacity: 1;
}
.setup-seat-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--seat-color);
  border: 2px solid var(--agu-color-base, #263f2a);
  flex: 0 0 auto;
}
.setup-seat-name {
  flex: 1 1 auto;
  min-width: 0;
  height: 44px;
  padding: 0 12px;
  font: inherit;
  font-size: 1rem;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
}
.setup-seat-you {
  position: absolute;
  right: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--agu-color-base, #263f2a);
  opacity: 0.6;
  pointer-events: none;
}
.setup-note {
  margin: 12px 0 0;
  font-size: 0.85rem;
  text-align: center;
}
.setup-start {
  margin-top: 16px;
  font-size: 1.05rem;
  padding: 14px 24px;
}
.online-error {
  margin-top: 14px;
  font-size: 12px;
  text-align: center;
  color: var(--agu-color-red, #e9576f);
}
</style>
