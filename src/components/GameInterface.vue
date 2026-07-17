<template>
  <div class="hud">
    <!-- Connection trouble is the only global status worth a banner -->
    <div v-if="connectionMessage" class="hud-connection-banner">{{ connectionMessage }}</div>

    <div v-if="store.demoMode" class="hud-demo-badge">DEMO — 1-6 rolls</div>

    <!-- Settings: middle-right trigger, centered modal -->
    <div class="hud-settings-area">
      <app-button
        orange
        class="hud-icon-btn"
        :title="settingsOpen ? 'Close' : 'Settings'"
        @click="toggleSettings"
      >
        <component :is="settingsOpen ? 'XIcon' : 'SettingsIcon'" :size="20" />
      </app-button>
    </div>

    <div v-if="settingsOpen" class="global-settings-modal-backdrop" @click.self="settingsOpen = false">
      <app-panel class="global-settings-card">
        <h3 class="panel-title" style="margin-bottom: 16px;">{{ t('settings.title') }}</h3>

        <div class="form-row">
          <app-input v-model="settingsName" :label="t('online.yourName')" :max-length="12" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('language') }}</label>
          <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('settings.sound') }}</label>
          <app-tabs v-model="soundSetting" :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]" />
        </div>

        <app-button red class="hud-full-width" @click="askLeave">{{ t('online.leaveGame') }}</app-button>

        <div class="menu-row" style="margin-top: 16px;">
          <app-button red @click="settingsOpen = false">{{ t('back') }}</app-button>
          <app-button :disabled="!settingsName.trim()" @click="saveSettings">{{ t('save') }}</app-button>
        </div>
      </app-panel>
    </div>

    <!-- Confirm before leaving a match -->
    <div v-if="confirmLeave" class="global-settings-modal-backdrop" @click.self="confirmLeave = false">
      <app-panel class="global-settings-card" style="text-align: center;">
        <h3 class="panel-title" style="margin-bottom: 12px;">{{ t('online.leaveConfirmTitle') }}</h3>
        <p class="panel-desc">{{ t('online.leaveConfirmBody') }}</p>
        <div class="menu-row" style="margin-top: 20px;">
          <app-button @click="confirmLeave = false">{{ t('online.leaveConfirmNo') }}</app-button>
          <app-button red @click="doLeave">{{ t('online.leaveConfirmYes') }}</app-button>
        </div>
      </app-panel>
    </div>

    <!-- Chat: bottom-right drawer (always enabled) -->
    <chat-drawer />

    <!-- Player seats pinned to the 4 screen corners, mirroring the lobby
         chips (seat = player.turn - 1). -->
    <div class="hud-seats-layer">
      <div
        v-for="player in store.players"
        :key="player.turn"
        class="hud-seat-chip"
        :class="[`hud-seat-chip--corner-${player.turn - 1}`, { 'hud-seat-chip--active': player.isPlaying }]"
        :style="{ '--chip-color': player.color }"
      >
        <!-- Speech bubble popup: below top-corner chips, above bottom ones -->
        <transition name="speech-fade">
          <div
            v-if="speechBubbles[player.turn]"
            class="hud-speech-bubble"
            :class="{ 'hud-speech-bubble--below': player.turn - 1 <= 1 }"
          >
            {{ speechBubbles[player.turn] }}
          </div>
        </transition>

        <span class="hud-dot hud-dot--sm" :style="{ background: player.color }"></span>
        <span class="hud-seat-chip-name">{{ player.name }}</span>

        <!-- Turn timer: drains over 60s on the active player's chip -->
        <div
          v-if="player.isPlaying && store.turnTimer.running"
          class="hud-seat-chip-timer"
          :class="{ 'hud-seat-chip-timer--low': turnSecondsLeft !== null && turnSecondsLeft <= 10 }"
        >
          <div class="hud-seat-chip-timer-fill" :style="{ width: `${turnTimerFraction * 100}%` }"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ChatDrawer from './ChatDrawer.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';
import { playTick } from '../utils/sound';
import { Settings, X } from '@lucide/vue';

export default {
  components: {
    ChatDrawer,
    SettingsIcon: Settings,
    XIcon: X,
  },
  data() {
    return {
      store: ApplicationStore,
      settingsOpen: false,
      confirmLeave: false,
      settingsName: '',
      speechBubbles: {}, // { [player.turn]: 'message' }
      timerNow: performance.now(),
      timerInterval: null,
    };
  },
  computed: {
    connectionMessage() {
      if (!this.store.online.enabled) return '';
      const state = this.store.online.connectionState;
      if (state === 'reconnecting') return t('online.connecting');
      if (state === 'disconnected') return t('online.disconnected');
      return '';
    },
    turnTimerFraction() {
      const timer = this.store.turnTimer;
      if (!timer.running) return 1;
      return Math.max(0, 1 - ((this.timerNow - timer.startedAt) / timer.duration));
    },
    turnSecondsLeft() {
      const timer = this.store.turnTimer;
      if (!timer.running) return null;
      return Math.max(0, Math.ceil((timer.duration - (this.timerNow - timer.startedAt)) / 1000));
    },
    soundSetting: {
      get() {
        return this.store.settings.soundEnabled ? 'on' : 'off';
      },
      set(val) {
        this.store.settings.soundEnabled = val === 'on';
        window.localStorage.setItem('burrec.settings.sound', val === 'on' ? '1' : '0');
      },
    },
  },
  watch: {
    // Clock tick once per second through the final 10 seconds of a turn.
    turnSecondsLeft(val, oldVal) {
      if (
        val !== null && oldVal !== null &&
        val < oldVal && val <= 10 && val >= 1
      ) {
        playTick();
      }
    },
    'store.online.chat.length'(newLength) {
      if (newLength === 0) return;
      const lastMsg = this.store.online.chat[newLength - 1];
      if (!lastMsg) return;

      let player = null;
      if (this.store.online.enabled) {
        const seatObj = (this.store.online.seats || []).find(
          (s) => s && s.userId === lastMsg.senderId
        );
        if (!seatObj) return;
        const playerIndex = this.store.online.seatToPlayerIndex[seatObj.seat];
        player = this.store.players[playerIndex];
      } else {
        player = this.store.players.find(p => p && p.name === lastMsg.username);
      }
      if (!player) return;

      this.speechBubbles = {
        ...this.speechBubbles,
        [player.turn]: lastMsg.message
      };

      const turn = player.turn;
      const msgText = lastMsg.message;
      setTimeout(() => {
        if (this.speechBubbles[turn] === msgText) {
          const nextBubbles = { ...this.speechBubbles };
          delete nextBubbles[turn];
          this.speechBubbles = nextBubbles;
        }
      }, 4000);
    },
  },
  mounted() {
    // Coarse clock for the turn-timer bar — the store only holds startedAt.
    this.timerInterval = setInterval(() => {
      this.timerNow = performance.now();
    }, 100);
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
  methods: {
    t,
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    toggleSettings() {
      if (!this.settingsOpen) {
        this.settingsName = this.store.online.displayName || '';
      }
      this.settingsOpen = !this.settingsOpen;
    },
    saveSettings() {
      const name = this.settingsName.trim().slice(0, 12);
      if (name) {
        // Online names are seat data owned by the server; this just updates the
        // remembered display name for the next match.
        this.store.online.displayName = name;
        window.localStorage.setItem('burrec.online.displayName', name);
      }
      this.settingsOpen = false;
    },
    askLeave() {
      this.settingsOpen = false;
      this.confirmLeave = true;
    },
    doLeave() {
      this.confirmLeave = false;
      MatchController.leaveMatch();
    },
  },
};
</script>

<style scoped>
.hud-connection-banner {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px;
  background: var(--agu-color-red, #e9576f);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
  pointer-events: none;
}

/* Testing shortcut indicator (typing TEST toggles store.demoMode). Sits
   below the connection banner slot so the two never overlap. */
.hud-demo-badge {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 10px;
  background: var(--agu-color-base, #263f2a);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  border-radius: 8px;
  opacity: 0.85;
  pointer-events: none;
}

/* ── Corner seat chips (same look as the lobby's) ────────── */
.hud-seats-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hud-seat-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  max-width: 220px;
  min-height: 44px;
  padding: 8px 14px 12px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
  font-size: 12px;
  color: var(--agu-color-base, #263f2a);
  pointer-events: all;
  box-sizing: border-box;
}

.hud-seat-chip--active {
  border-color: var(--chip-color, #263f2a);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18), 0 0 0 3px var(--chip-color, rgba(255, 255, 255, 0.25));
  /* "Playing now" reads bigger — scaled from its own corner so it grows
     into the screen, not off it. */
  transform: scale(1.22);
}

.hud-seat-chip {
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.hud-seat-chip--corner-0 { top: 16px; left: 16px; transform-origin: top left; }
.hud-seat-chip--corner-1 { top: 16px; right: 16px; transform-origin: top right; }
.hud-seat-chip--corner-2 { bottom: 16px; right: 16px; transform-origin: bottom right; }
.hud-seat-chip--corner-3 { bottom: 16px; left: 16px; transform-origin: bottom left; }

.hud-seat-chip-name {
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Turn timer bar (bottom edge of the active chip) ─────── */
.hud-seat-chip-timer {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 4px;
  height: 5px;
  border-radius: 3px;
  background: rgba(38, 63, 42, 0.16);
  overflow: hidden;
}

.hud-seat-chip-timer-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--chip-color, #4cf2ca);
  transition: width 120ms linear;
}

.hud-seat-chip-timer--low .hud-seat-chip-timer-fill {
  background: var(--agu-color-red, #e9576f);
  animation: hud-timer-pulse 1s ease-in-out infinite;
}

@keyframes hud-timer-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.hud-speech-bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  color: #000000;
  padding: 6px 10px;
  border-radius: 8px;
  border: 2px solid var(--agu-color-base, #263f2a);
  font-size: 0.58rem;
  white-space: nowrap;
  z-index: 100;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hud-speech-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #ffffff;
}

.hud-speech-bubble::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(2px);
  border: 6px solid transparent;
  border-top-color: var(--agu-color-base, #263f2a);
  z-index: -1;
}

/* Top-corner chips flip the bubble underneath, arrows pointing up. */
.hud-speech-bubble--below {
  bottom: auto;
  top: calc(100% + 8px);
}

.hud-speech-bubble--below::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: #ffffff;
}

.hud-speech-bubble--below::before {
  top: auto;
  bottom: 100%;
  transform: translateX(-50%) translateY(-2px);
  border-top-color: transparent;
  border-bottom-color: var(--agu-color-base, #263f2a);
}

.speech-fade-enter-active,
.speech-fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.speech-fade-enter-from,
.speech-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}

</style>
