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

    <!-- Settings: top-right -->
    <div class="hud-settings-area">
      <app-button
        slate-blue
        class="hud-icon-btn"
        :title="settingsOpen ? 'Close' : 'Settings'"
        @click="settingsOpen = !settingsOpen"
      >
        <component :is="settingsOpen ? 'XIcon' : 'SettingsIcon'" :size="20" />
      </app-button>
      <transition name="settings-drop">
        <app-panel v-if="settingsOpen" class="hud-settings-panel">
          <div class="form-row">
            <label class="select-label">{{ t('language') }}</label>
            <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
          </div>
          <outline-appearance-select :label="t('outlineStyle')" select-id="outline-style-hud" />
          <render-quality-slider :label="t('renderQuality')" slider-id="render-quality-hud" />
          <app-button v-if="!store.online.enabled" orange class="hud-full-width" @click="goToSetup">{{ t('online.newGame') }}</app-button>
          <app-button v-else red class="hud-full-width" @click="leaveOnlineGame">{{ t('online.leaveGame') }}</app-button>
        </app-panel>
      </transition>
    </div>

    <!-- Chat: bottom-right drawer (always enabled) -->
    <div class="hud-chat-area">
      <transition name="settings-drop">
        <app-panel v-if="chatOpen" class="hud-chat-panel">
          <chat-panel
            :messages="store.online.chat"
            :self-id="store.online.enabled ? store.online.selfUserId : 'local-self'"
            @send="sendChat"
          />
        </app-panel>
      </transition>
      <app-button slate-blue class="hud-icon-btn" :title="chatOpen ? 'Close chat' : 'Chat'" @click="chatOpen = !chatOpen">
        <message-square-icon :size="20" />
        <span v-if="unreadCount > 0" class="hud-unread-badge">{{ unreadCount }}</span>
      </app-button>
    </div>

    <!-- Bottom: actions + player strip -->
    <div class="hud-bottom">
      <div class="hud-actions">
        <div v-if="movablePawns.length" class="hud-move-row">
          <app-button
            v-for="pawn in movablePawns"
            :key="pawn.id"
            green
            @click="movePawn(pawn)"
          >
            {{ t('game.pawn', { num: pawn.startingPlace }) }}
          </app-button>
        </div>

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

      <div class="hud-player-strip">
        <app-panel
          v-for="player in store.players"
          :key="player.turn"
          class="hud-chip"
          :class="{ 'hud-chip--active': player.isPlaying }"
          :style="player.isPlaying ? { '--chip-color': player.color, '--agu-panel-bg': player.color, '--agu-panel-shadow': 'rgba(0,0,0,0.15)' } : {}"
        >
          <!-- Speech bubble popup -->
          <transition name="speech-fade">
            <div v-if="speechBubbles[player.turn]" class="hud-speech-bubble">
              {{ speechBubbles[player.turn] }}
            </div>
          </transition>

          <span class="hud-dot hud-dot--sm" :style="{ background: player.color }"></span>
          <div class="hud-chip-text">
            <span class="hud-chip-name">{{ player.name }}</span>
            <span class="hud-chip-meta">{{ formatPlayerState(player) }}</span>
          </div>
        </app-panel>
      </div>
    </div>
  </div>
</template>

<script>
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ChatPanel from './ChatPanel.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import MatchController from '../network/MatchController';
import ChatController from '../network/ChatController';
import { t } from '../utils/i18n';
import { Settings, X, MessageSquare } from '@lucide/vue';

export default {
  components: {
    OutlineAppearanceSelect,
    RenderQualitySlider,
    ChatPanel,
    SettingsIcon: Settings,
    XIcon: X,
    MessageSquareIcon: MessageSquare
  },
  data() {
    return {
      store: ApplicationStore,
      settingsOpen: false,
      chatOpen: false,
      unreadCount: 0,
      speechBubbles: {}, // { [player.turn]: 'message' }
      animatedRollValue: 1,
      diceAnimInterval: null,
    };
  },
  computed: {
    currentPlayer() {
      return this.store.players[this.store.currentPlayerId] || null;
    },
    movablePawns() {
      if (!this.currentPlayer || !this.store.gamePlayStatus.isMoving) return [];
      return this.currentPlayer.pawns.filter((p) => p.isActive);
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
  },
  watch: {
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

      if (this.store.online.enabled) {
        const seatObj = (this.store.online.seats || []).find(
          (s) => s && s.userId === lastMsg.senderId
        );
        if (!seatObj) return;

        const playerIndex = this.store.online.seatToPlayerIndex[seatObj.seat];
        const player = this.store.players[playerIndex];
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

        if (!this.chatOpen && lastMsg.senderId !== this.store.online.selfUserId) {
          this.unreadCount++;
        }
      } else {
        // Local mode chat bubble and unread triggers
        const player = this.store.players.find(p => p && p.name === lastMsg.username);
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

        if (!this.chatOpen) {
          this.unreadCount++;
        }
      }
    },
    chatOpen(val) {
      if (val) {
        this.unreadCount = 0;
      }
    }
  },
  beforeUnmount() {
    this.stopDiceAnim();
  },
  methods: {
    t,
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    rollDice() {
      EventBus.fire(EventKeys.rollDice);
    },
    movePawn(pawn) {
      if (!pawn.isActive) return;

      if (this.store.online.enabled) {
        this.currentPlayer?.pawns.forEach((ownPawn) => {
          ownPawn.isActive = false;
        });
        this.store.gamePlayStatus.isMoving = false;
        MatchController.requestMove(pawn.startingPlace - 1);
        return;
      }

      pawn.move();
    },
    sendChat(text) {
      if (this.store.online.enabled) {
        ChatController.send(text);
      } else {
        // Push directly to matching chat queue for offline game logging
        this.store.online.chat.push({
          id: Math.random().toString(36).substring(2, 9),
          senderId: 'local-self',
          username: this.currentPlayer?.name || 'Player',
          message: text,
          createTime: Date.now(),
        });
      }
    },
    leaveOnlineGame() {
      this.settingsOpen = false;
      MatchController.leaveMatch();
    },
    goToSetup() {
      this.settingsOpen = false;
      this.store.currentScreen = 'add-players';
    },
    formatPlayerState(player) {
      return player.pawns.map((pawn) => {
        if (pawn.position === 0) return 'H';
        if (pawn.position > 40) return 'G';
        return String(pawn.globalPosition + 1);
      }).join('·');
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

.hud-chat-area {
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 30;
  pointer-events: all;
}

.hud-chat-panel {
  width: min(320px, 86vw);
  padding: 12px;
}

.hud-chip.panel {
  padding: 8px 12px;
  margin-bottom: 0;
  position: relative;
}

.hud-unread-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: var(--agu-color-red, #e9576f);
  color: #ffffff;
  font-size: 0.5rem;
  font-weight: bold;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--agu-color-base, #263f2a);
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
