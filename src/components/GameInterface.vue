<template>
  <div class="hud">
    <!-- Status card: top-left -->
    <app-panel class="hud-status">
      <div class="hud-player-row">
        <span class="hud-dot" :style="{ background: currentPlayer?.color || '#888' }"></span>
        <span class="hud-player-name">{{ currentPlayer?.name || t('game.waiting') }}</span>
        <span class="hud-round">R{{ store.currentRound }}</span>
      </div>
      <p v-if="statusMessage" class="hud-msg">{{ statusMessage }}</p>
      <p v-if="store.lastRolledDice !== 'Start'" class="hud-last-roll">
        {{ t('game.rolled', { val: store.lastRolledDice }) }}
      </p>
      <p v-if="connectionMessage" class="hud-msg hud-connection">{{ connectionMessage }}</p>
    </app-panel>

    <!-- Settings: middle-right trigger, centered modal -->
    <div class="hud-settings-area">
      <app-button
        slate-blue
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
          <app-input v-model="settingsName" :label="t('online.yourName')" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('language') }}</label>
          <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('settings.sound') }}</label>
          <app-tabs v-model="soundSetting" :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]" />
        </div>

        <app-button v-if="!store.online.enabled" orange class="hud-full-width" @click="goToSetup">{{ t('online.newGame') }}</app-button>
        <app-button v-else red class="hud-full-width" @click="leaveOnlineGame">{{ t('online.leaveGame') }}</app-button>

        <div class="menu-row" style="margin-top: 16px;">
          <app-button slate-blue @click="settingsOpen = false">{{ t('back') }}</app-button>
          <app-button green :disabled="!settingsName.trim()" @click="saveSettings">{{ t('save') }}</app-button>
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

    <!-- Bottom: actions -->
    <div class="hud-bottom">
      <div class="hud-actions">
        <!-- Big UI Dice Roll Area -->
        <div class="hud-main-dice-container">
          <!-- Active Dice Button (clickable when it's our turn to roll) -->
          <button
            v-if="canRoll"
            class="hud-main-dice hud-main-dice--playable"
            @click="rollDice"
            :title="t('game.rollDice')"
          >
            <span class="hud-main-dice-prompt">{{ t('game.rollDice') }}</span>
            <div class="dice-box dice-box--playable">
              <div v-for="n in 9" :key="n" class="dice-dot-cell">
                <span v-if="shouldShowDot(animatedRollValue, n)" class="dice-dot"></span>
              </div>
            </div>
          </button>

          <!-- Rolling State -->
          <div
            v-else-if="isDiceRolling"
            class="hud-main-dice hud-main-dice--rolling"
          >
            <span class="hud-main-dice-prompt">{{ t('game.waiting') }}</span>
            <div class="dice-box dice-box--rolling">
              <div v-for="n in 9" :key="n" class="dice-dot-cell">
                <span v-if="shouldShowDot(animatedRollValue, n)" class="dice-dot"></span>
              </div>
            </div>
          </div>

          <!-- Last Roll Result Display (visible when not rolling and a value exists) -->
          <div
            v-else-if="store.lastRolledDice && store.lastRolledDice !== 'Start'"
            class="hud-main-dice hud-main-dice--result"
          >
            <span class="hud-main-dice-prompt">{{ t('game.rolled', { val: '' }).replace(': ', '').trim() }}</span>
            <div class="dice-box" :class="`dice-box--val-${store.lastRolledDice}`">
              <div v-for="n in 9" :key="n" class="dice-dot-cell">
                <span v-if="shouldShowDot(store.lastRolledDice, n)" class="dice-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ChatDrawer from './ChatDrawer.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
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
      settingsName: '',
      speechBubbles: {}, // { [player.turn]: 'message' }
      animatedRollValue: 1,
      diceAnimInterval: null,
      timerNow: performance.now(),
      timerInterval: null,
    };
  },
  computed: {
    currentPlayer() {
      return this.store.players[this.store.currentPlayerId] || null;
    },
    canRoll() {
      return this.store.gamePlayStatus.isRolling && this.isHumanTurn;
    },
    isHumanTurn() {
      return Boolean(this.currentPlayer && this.currentPlayer.controller === 'local');
    },
    isDiceRolling() {
      return Boolean(this.store.gamePlayStatus.isDiceRolling || this.store.online.diceInFlight);
    },
    statusMessage() {
      if (!this.currentPlayer) return t('game.setupBoard');
      if (!this.isHumanTurn) {
        return this.currentPlayer.controller === 'remote'
          ? t('game.waitingForPlayer', { name: this.currentPlayer.name })
          : t('game.playerThinking', { name: this.currentPlayer.name });
      }
      if (this.store.gamePlayStatus.isMoving) return t('game.pickPawn');
      if (this.store.gamePlayStatus.isRolling) return t('game.rollDicePrompt');
      return '';
    },
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
    isDiceRolling(val) {
      if (val) {
        this.startDiceAnim();
      } else {
        this.stopDiceAnim();
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
    this.stopDiceAnim();
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
      const name = this.settingsName.trim();
      if (name) {
        this.store.online.displayName = name;
        window.localStorage.setItem('burrec.online.displayName', name);
        // Live-rename the local human in offline games; online names are
        // seat data owned by the server.
        if (!this.store.online.enabled) {
          const localPlayer = this.store.players.find((player) => player.controller === 'local');
          if (localPlayer) {
            localPlayer.name = name;
          }
          if (this.store.localSetupActive[0] && this.store.localSetupTypes[0] === 'local') {
            this.store.localSetupNames[0] = name;
          }
        }
      }
      this.settingsOpen = false;
    },
    rollDice() {
      EventBus.fire(EventKeys.rollDice);
    },
    leaveOnlineGame() {
      this.settingsOpen = false;
      MatchController.leaveMatch();
    },
    goToSetup() {
      this.settingsOpen = false;
      this.store.currentScreen = 'add-players';
    },
    shouldShowDot(value, cellIndex) {
      const val = Number(value);
      if (isNaN(val)) return false;
      if (val === 1) return cellIndex === 5;
      if (val === 2) return cellIndex === 1 || cellIndex === 9;
      if (val === 3) return cellIndex === 1 || cellIndex === 5 || cellIndex === 9;
      if (val === 4) return cellIndex === 1 || cellIndex === 3 || cellIndex === 7 || cellIndex === 9;
      if (val === 5) return cellIndex === 1 || cellIndex === 3 || cellIndex === 5 || cellIndex === 7 || cellIndex === 9;
      if (val === 6) return cellIndex === 1 || cellIndex === 3 || cellIndex === 4 || cellIndex === 6 || cellIndex === 7 || cellIndex === 9;
      return false;
    },
    startDiceAnim() {
      if (this.diceAnimInterval) return;
      this.diceAnimInterval = setInterval(() => {
        this.animatedRollValue = Math.floor(Math.random() * 6) + 1;
      }, 80);
    },
    stopDiceAnim() {
      if (this.diceAnimInterval) {
        clearInterval(this.diceAnimInterval);
        this.diceAnimInterval = null;
      }
    },
  },
};
</script>

<style scoped>
.hud-connection {
  color: var(--agu-color-red, #e9576f);
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
}

.hud-seat-chip--corner-0 { top: 16px; left: 16px; }
.hud-seat-chip--corner-1 { top: 16px; right: 16px; }
.hud-seat-chip--corner-2 { bottom: 16px; right: 16px; }
.hud-seat-chip--corner-3 { bottom: 16px; left: 16px; }

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

/* ── UI Dice Roll CSS ────────────────────────────────────── */
.hud-main-dice-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  pointer-events: all;
}

.hud-main-dice {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  outline: none;
  transition: transform 150ms ease;
  pointer-events: all;
}

.hud-main-dice--playable {
  cursor: pointer;
}

.hud-main-dice--playable:hover {
  transform: scale(1.1);
}

.hud-main-dice--playable:active {
  transform: scale(0.95);
}

.hud-main-dice-prompt {
  font-size: 0.52rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 1.5px solid var(--agu-color-base, #263f2a);
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hud-main-dice--playable .hud-main-dice-prompt {
  animation: pulse-border-dice 1.5s infinite;
  background: var(--agu-color-green-pastel, #4cf2ca);
}

@keyframes pulse-border-dice {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 242, 202, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 6px rgba(76, 242, 202, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 242, 202, 0);
  }
}

.dice-box--rolling {
  animation: dice-shake-anim 0.15s infinite;
}

@keyframes dice-shake-anim {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(0px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(2px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(2px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.dice-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 66px;
  height: 66px;
  background: #ffffff;
  border: 3px solid var(--agu-color-base, #263f2a);
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  box-shadow: inset 0 -4px 0 #d9d9d9, 0 4px 10px rgba(0,0,0,0.15);
  transition: background-color 200ms ease;
}

.dice-box--playable {
  background: #ffffeb;
}

.dice-dot-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dice-dot {
  width: 10px;
  height: 10px;
  background: var(--agu-color-base, #263f2a);
  border-radius: 50%;
}
</style>
