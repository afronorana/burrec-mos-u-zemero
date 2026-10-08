<template>
  <!-- In-game HUD, three zones (desktop / phone upright / phone sideways
       differ only in CSS):
       - top bar: menu, room code (or connection state), sound, Style, chat
       - players: everyone in turn order — a rail on the left, a strip of
         four under the top bar on upright phones
       - turn bar: bottom, in the active player's color — Roll / pick a
         pawn on our turn, "<name>'s turn" otherwise -->
  <!-- Hidden under the in-game Wardrobe: its preview is drawn into the
       canvas beneath the DOM, so HUD pieces would float over the stage. -->
  <div
    class="hud"
    :class="{ 'hud--behind': store.wardrobe.inGame }"
    :style="{ '--turn-color': activePlayer ? activePlayer.color : '#ffffff' }"
  >
    <div class="hud-topbar">
      <app-button orange class="hud-icon-btn" :title="t('hud.menu')" @click="toggleSettings">
        <menu-icon :size="20" />
      </app-button>

      <div class="hud-topbar-center">
        <span v-if="connectionMessage" class="hud-status-pill hud-status-pill--alert">{{ connectionMessage }}</span>
        <button
          v-else-if="store.online.joinCode"
          type="button"
          class="hud-status-pill"
          :title="t('hud.copyCode')"
          @click="copyCode"
        >
          <span class="hud-status-label">{{ t('online.roomCodeLabel') }}</span>
          <span class="hud-status-code">{{ codeCopied ? t('hud.copied') : store.online.joinCode }}</span>
        </button>
        <!-- Non-classic Game modes stay visible: they change how you win. -->
        <span
          v-if="store.online.gameMode && store.online.gameMode !== 'classic'"
          class="hud-status-pill hud-status-pill--mode"
          :title="t(`modes.${store.online.gameMode}Info`)"
        >{{ t(`modes.${store.online.gameMode}`) }}</span>
        <span v-if="store.demoMode" class="hud-status-pill hud-status-pill--demo">DEMO 1-6</span>
      </div>

      <div class="hud-topbar-actions">
        <app-button orange class="hud-icon-btn" :title="t('hud.sound')" @click="toggleSound">
          <component :is="store.settings.soundEnabled ? 'VolumeIcon' : 'VolumeOffIcon'" :size="20" />
        </app-button>
        <!-- One restyle per game (in-game Wardrobe); for a Guest it's the
             register pitch — the Wardrobe offers sign-up right there. -->
        <app-button
          v-if="canRestyle"
          blue
          class="hud-icon-btn"
          :title="t('cosmetics.styleButton')"
          @click="openWardrobe"
        >
          <shirt-icon :size="20" />
        </app-button>
        <chat-drawer embedded />
      </div>
    </div>

    <!-- Players in turn order. Tapping another human opens Block/Report. -->
    <div class="hud-players">
      <div
        v-for="(player, index) in orderedPlayers"
        :key="player.turn"
        class="hud-player"
        :class="[
          `hud-player--slot-${index}`,
          {
            'hud-player--active': player === activePlayer,
            'hud-player--self': isSelf(player),
            'hud-player--offline': seatOf(player)?.connected === false,
            'hud-player--bot': seatOf(player)?.bot,
          },
        ]"
        :style="{ '--chip-color': player.color }"
        @click="openSeatActions(player)"
      >
        <span class="hud-player-avatar">
          <bot-icon v-if="seatOf(player)?.bot" :size="16" />
          <template v-else>{{ initialOf(player) }}</template>
        </span>
        <span class="hud-player-body">
          <span class="hud-player-name">
            {{ player.name }}<span v-if="isSelf(player)" class="hud-player-you">{{ t('hud.you') }}</span>
          </span>
          <span v-if="seatOf(player)?.connected === false" class="hud-player-sub">{{ t('hud.reconnecting') }}</span>
          <span v-else class="hud-player-pips" :aria-label="progressLabel(player)">
            <span
              v-for="(state, pip) in progressOf(player)"
              :key="pip"
              class="hud-pip"
              :class="`hud-pip--${state}`"
            ></span>
          </span>
        </span>

        <!-- Turn timer: a CSS scaleX drain (compositor-only, no JS clock),
             re-keyed per turn. v-timer-drain offsets it by the time already
             elapsed, so a refresh/remount resumes mid-way. -->
        <div
          v-if="player === activePlayer && store.turnTimer.running"
          :key="store.turnTimer.startedAt"
          class="hud-player-timer"
          :class="{ 'hud-player-timer--low': timerLow }"
        >
          <div v-timer-drain="store.turnTimer" class="hud-player-timer-fill"></div>
        </div>

        <transition name="speech-fade">
          <div v-if="speechBubbles[player.turn]" class="hud-speech-bubble">
            {{ speechBubbles[player.turn] }}
          </div>
        </transition>
      </div>
    </div>

    <!-- Only when there's something for us to do: roll, or choose between
         pawns (a single option plays itself), or — for a drop-in without a
         seat — pick a color. Whose turn it is otherwise is shown by the
         highlighted player chip and the pit rim's color. -->
    <transition name="turnbar-pop">
      <div v-if="turnPrompt()" :key="turnPrompt()" class="hud-turnbar" :class="{ 'hud-turnbar--mine': turnPrompt() !== 'seat' }">
        <template v-if="turnPrompt() === 'seat'">
          <span class="hud-turnbar-text">{{ t('online.chooseColorPrompt') }}</span>
        </template>
        <template v-else>
          <span class="hud-turnbar-dot"></span>
          <span class="hud-turnbar-text">
            {{ t('hud.yourTurn') }}
            <span v-if="turnPrompt() === 'pick'" class="hud-turnbar-sub">{{ t('hud.pickPawn') }}</span>
          </span>
          <app-button v-if="turnPrompt() === 'roll'" orange class="hud-roll-btn" @click="roll">
            <dices-icon :size="20" class="hud-roll-icon" />{{ t('hud.roll') }}
          </app-button>
          <div
            v-if="store.turnTimer.running"
            :key="store.turnTimer.startedAt"
            class="hud-turnbar-timer"
            :class="{ 'hud-player-timer--low': timerLow }"
          >
            <div v-timer-drain="store.turnTimer" class="hud-player-timer-fill"></div>
          </div>
        </template>
      </div>
    </transition>

    <!-- Menu: preferences apply at once; Leave sits apart at the bottom. -->
    <div
      v-if="settingsOpen"
      class="global-settings-modal-backdrop"
      @click.self="settingsOpen = false"
    >
      <app-panel class="global-settings-card">
        <h3 class="panel-title" style="margin-bottom: 16px;">{{ t('hud.menu') }}</h3>

        <div class="form-row">
          <label class="select-label">{{ t('language') }}</label>
          <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('settings.sound') }}</label>
          <app-tabs v-model="soundSetting" :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.finishers') }}</label>
          <app-tabs
            v-model="finishersSetting"
            :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]"
          />
        </div>

        <div class="menu-row" style="margin-top: 8px;">
          <app-button red @click="askLeave">{{ t('online.leaveGame') }}</app-button>
          <app-button @click="settingsOpen = false">{{ t('online.close') }}</app-button>
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
  </div>
</template>

<script>
import ChatDrawer from './ChatDrawer.vue';
import { openPlayerActions } from '../utils/authPrompt';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';
import { playTick } from '../utils/sound';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import { Bot, Dices, Menu, Shirt, Volume2, VolumeX } from '@lucide/vue';

// Pawn position model (Pawn.js): 0 home, 1-40 main track, 41+ target lane.
const TRACK_END = 40;
const PIP_ORDER = { done: 0, track: 1, home: 2 };

export default {
  components: {
    ChatDrawer,
    BotIcon: Bot,
    DicesIcon: Dices,
    MenuIcon: Menu,
    ShirtIcon: Shirt,
    VolumeIcon: Volume2,
    VolumeOffIcon: VolumeX,
  },
  data() {
    return {
      store: ApplicationStore,
      settingsOpen: false,
      confirmLeave: false,
      codeCopied: false,
      speechBubbles: {}, // { [player.turn]: 'message' }
      timerLow: false, // last 10s of the turn: red pulsing bar
    };
  },
  computed: {
    // Turn order is seat order (seats can be non-contiguous online).
    orderedPlayers() {
      return this.store.players.slice().sort((a, b) => a.turn - b.turn);
    },
    // Players (and their pawns) are markRaw — their fields never notify
    // Vue, so turn state keys off the reactive currentPlayerId, and anything
    // reading raw pawn flags is a method (re-run on every render), not a
    // cached computed.
    activePlayer() {
      if (this.store.currentScreen !== 'game-screen') return null;
      return this.store.players[this.store.currentPlayerId] || null;
    },
    isMyTurn() {
      return Boolean(this.activePlayer && this.activePlayer.controller === 'local');
    },
    canRoll() {
      const status = this.store.gamePlayStatus;
      return this.isMyTurn && status.isRolling && !status.isDiceRolling;
    },

    needsSeat() {
      return this.store.online.enabled && this.store.online.mySeat < 0 && !this.store.winner;
    },
    // Seated, game still running, and the one restyle not spent yet.
    canRestyle() {
      const online = this.store.online;
      return online.enabled && online.mySeat >= 0 && !this.store.winner && !online.restyled[online.selfUserId];
    },
    connectionMessage() {
      if (!this.store.online.enabled) return '';
      const state = this.store.online.connectionState;
      if (state === 'reconnecting') return t('online.connecting');
      if (state === 'disconnected') return t('online.disconnected');
      return '';
    },
    // Viewer preference (show other players' Finishers in full or "lite"),
    // not a Cosmetic — those are only edited in the menu wardrobe.
    finishersSetting: {
      get() {
        return this.store.settings.finishersEnabled ? 'on' : 'off';
      },
      set(val) {
        this.store.settings.finishersEnabled = val === 'on';
        window.localStorage.setItem('burrec.settings.finishers', val === 'on' ? '1' : '0');
      },
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
  directives: {
    // Sets the drain's negative delay once, at mount: a CSS animation starts
    // when its element appears, so the offset must be "elapsed as of now".
    // (A reactive :style would go stale on remount, or jump the running
    // animation when re-rendered.) The element is keyed per turn.
    timerDrain: {
      mounted(el, { value: timer }) {
        el.style.setProperty('--timer-duration', `${timer.duration}ms`);
        el.style.setProperty('--timer-elapsed', `${timer.startedAt - performance.now()}ms`);
      },
    },
  },
  watch: {
    // Clock tick once per second through the final 10 seconds of a turn.
    'store.turnTimer.startedAt'() {
      this.scheduleTurnTick();
    },
    'store.turnTimer.running'() {
      this.scheduleTurnTick();
    },
    'store.online.chat.length'(newLength) {
      if (newLength === 0) return;
      const lastMsg = this.store.online.chat[newLength - 1];
      if (!lastMsg) return;

      let player = null;
      if (this.store.online.enabled) {
        const seatObj = (this.store.online.seats || []).find(
          (s) => s && !s.bot && s.userId === lastMsg.senderId
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
    this.scheduleTurnTick();
    // Background tabs throttle timers; resync the red last-10s state (and
    // the tick schedule) on return. The CSS drain itself never drifts.
    this.visibilityHandler = () => {
      if (!document.hidden) this.scheduleTurnTick();
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);
  },
  beforeUnmount() {
    clearTimeout(this.tickTimeout);
    clearTimeout(this.copiedTimeout);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  },
  methods: {
    // Waiting on our pawn choice: the server's legal pawns are lit (isActive)
    // and nothing is in motion. gamePlayStatus.isMoving alone isn't enough —
    // it's cleared the moment we pick, while the move still animates.
    canPick() {
      return this.isMyTurn
        && this.store.gamePlayStatus.isMoving
        && !this.store.online.autoMovePawn
        && this.activePlayer.pawns.some((pawn) => pawn.isActive)
        && !this.activePlayer.pawns.some((pawn) => pawn.isMoving);
    },
    // 'seat' | 'roll' | 'pick' | null — what the turn bar asks of us.
    turnPrompt() {
      if (this.store.winner) return null;
      if (this.needsSeat) return 'seat';
      if (this.canRoll) return 'roll';
      if (this.canPick()) return 'pick';
      return null;
    },
    openWardrobe() {
      this.settingsOpen = false;
      this.store.wardrobe.inGame = true;
    },
    seatOf(player) {
      return (this.store.online.seats || [])[player.turn - 1] || null;
    },
    isSelf(player) {
      return player.controller === 'local';
    },
    initialOf(player) {
      return (player.name || '?').trim().charAt(0).toUpperCase() || '?';
    },
    // One entry per pawn: 'home' | 'track' | 'done' (in the target lane).
    progressOf(player) {
      return player.pawns
        .map((pawn) => (pawn.position === 0 ? 'home' : pawn.position > TRACK_END ? 'done' : 'track'))
        .sort((a, b) => PIP_ORDER[a] - PIP_ORDER[b]);
    },
    progressLabel(player) {
      const counts = { home: 0, track: 0, done: 0 };
      this.progressOf(player).forEach((state) => { counts[state] += 1; });
      return `${counts.done} ${t('hud.finished')}, ${counts.track} ${t('hud.onTrack')}, ${counts.home} ${t('hud.atHome')}`;
    },
    roll() {
      if (this.canRoll) {
        EventBus.fire(EventKeys.rollDice);
      }
    },
    toggleSound() {
      this.soundSetting = this.store.settings.soundEnabled ? 'off' : 'on';
    },
    async copyCode() {
      const code = this.store.online.joinCode;
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        this.codeCopied = true;
        clearTimeout(this.copiedTimeout);
        this.copiedTimeout = setTimeout(() => { this.codeCopied = false; }, 1500);
      } catch (error) {
        // Clipboard blocked (insecure origin / permissions): the code is
        // still on screen to read out.
      }
    },
    // Tap another player's chip: Block / Report them (seat = turn - 1).
    openSeatActions(player) {
      const seat = (this.store.online.seats || [])[player.turn - 1];
      if (seat && !seat.bot) {
        openPlayerActions({ userId: seat.userId, name: seat.displayName || player.name });
      }
    },
    t,
    // Ticks land as the remaining time crosses 10s, 9s, … 1s, and the bar
    // turns red from the first one. `mark` is the next crossing still owed,
    // so a late timer can never tick twice.
    scheduleTurnTick(mark = 10000) {
      clearTimeout(this.tickTimeout);
      const timer = this.store.turnTimer;
      const remaining = timer.duration - (performance.now() - timer.startedAt);
      this.timerLow = timer.running && remaining <= 10000;
      if (!timer.running) return;
      const nextMark = Math.min(mark, (Math.ceil(remaining / 1000) * 1000) - 1000);
      if (nextMark < 1000) return;
      this.tickTimeout = setTimeout(() => {
        playTick();
        this.scheduleTurnTick(nextMark - 1000);
      }, remaining - nextMark);
    },
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
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
/* Layout tokens: every edge-pinned piece clears the notch / home bar. */
.hud {
  --hud-pad: 12px;
  --safe-t: env(safe-area-inset-top, 0px);
  --safe-r: env(safe-area-inset-right, 0px);
  --safe-b: env(safe-area-inset-bottom, 0px);
  --safe-l: env(safe-area-inset-left, 0px);
  --hud-base: var(--agu-color-base, #263f2a);
}

.hud--behind {
  visibility: hidden;
}

/* ── Top bar ─────────────────────────────────────────────── */
.hud-topbar {
  position: absolute;
  top: calc(var(--hud-pad) + var(--safe-t));
  left: calc(var(--hud-pad) + var(--safe-l));
  right: calc(var(--hud-pad) + var(--safe-r));
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 40;
  pointer-events: none;
}

.hud-topbar > :not(.hud-topbar-center),
.hud-topbar-center > * {
  pointer-events: all;
}

.hud-topbar-center {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.hud-topbar-actions {
  display: flex;
  gap: 8px;
}

.hud-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  padding: 7px 14px;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--hud-base);
  background: #ffffff;
  border: 2px solid var(--hud-base);
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.hud-status-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.65;
}

.hud-status-code {
  letter-spacing: 0.14em;
}

.hud-status-pill--alert {
  color: #ffffff;
  background: var(--agu-color-red, #e9576f);
  cursor: default;
}

.hud-status-pill--mode {
  color: #ffffff;
  background: var(--agu-color-slate-blue, #6a5acd);
  cursor: help;
}

.hud-status-pill--demo {
  color: #ffffff;
  background: var(--hud-base);
  cursor: default;
}

/* ── Players: a turn-order rail on the left ──────────────── */
.hud-players {
  position: absolute;
  top: calc(var(--hud-pad) + var(--safe-t) + 60px);
  left: calc(var(--hud-pad) + var(--safe-l));
  width: 210px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.hud-player {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 8px 12px 11px 16px;
  background: #ffffff;
  border: 2px solid var(--hud-base);
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  color: var(--hud-base);
  pointer-events: all;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 180ms ease;
}

/* Seat color stripe down the left edge. */
.hud-player::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  border-radius: 8px 0 0 8px;
  background: var(--chip-color);
}

/* Active ring, pre-drawn and faded (opacity only, never an animated shadow). */
.hud-player::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 10px;
  box-shadow: 0 0 0 4px var(--chip-color);
  opacity: 0;
  transition: opacity 180ms ease;
  pointer-events: none;
}

.hud-player--active {
  transform: translateX(8px);
}

.hud-player--active::after {
  opacity: 1;
}

.hud-player--self {
  background: var(--agu-color-orange, #fdc25b);
}

.hud-player--bot,
.hud-player--self {
  cursor: default;
}

.hud-player--offline .hud-player-avatar,
.hud-player--offline .hud-player-body {
  opacity: 0.45;
}

.hud-player-avatar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--chip-color);
  border: 2px solid var(--hud-base);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
}

.hud-player--bot .hud-player-avatar {
  background: #d9dccf;
  color: var(--hud-base);
  text-shadow: none;
}

.hud-player-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.hud-player-name {
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hud-player-you {
  margin-left: 6px;
  padding: 1px 5px;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  vertical-align: 1px;
  color: #ffffff;
  background: var(--hud-base);
  border-radius: 6px;
}

.hud-player-sub {
  font-size: 0.7rem;
  font-style: italic;
}

/* Four pawns: finished (filled), on the track (tinted), at home (hollow). */
.hud-player-pips {
  display: flex;
  gap: 4px;
}

.hud-pip {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid var(--hud-base);
  box-sizing: border-box;
}

.hud-pip--home {
  background: transparent;
  border-color: rgba(38, 63, 42, 0.35);
}

.hud-pip--track {
  background: color-mix(in srgb, var(--chip-color) 45%, #ffffff);
}

.hud-pip--done {
  background: var(--chip-color);
}

/* ── Turn timer (chip + turn bar share the drain) ────────── */
.hud-player-timer,
.hud-turnbar-timer {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 3px;
  height: 4px;
  border-radius: 2px;
  background: rgba(38, 63, 42, 0.16);
  overflow: hidden;
}

.hud-player-timer-fill {
  position: relative;
  height: 100%;
  background: var(--chip-color, var(--turn-color));
  transform-origin: left center;
  animation: hud-timer-drain var(--timer-duration, 60000ms) linear var(--timer-elapsed, 0ms) forwards;
}

/* Last 10 seconds: a red layer pulsing over the fill. The class is only
   applied then (a pending delayed animation still ticks the main thread),
   and both animations are transform/opacity so they run on the compositor. */
.hud-player-timer--low .hud-player-timer-fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--agu-color-red, #e9576f);
  animation: hud-timer-low 1s ease-in-out infinite;
}

@keyframes hud-timer-drain {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

@keyframes hud-timer-low {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

/* ── Turn bar: bottom center, in the active player's color ── */
.hud-turnbar {
  position: absolute;
  left: 50%;
  bottom: calc(var(--hud-pad) + var(--safe-b));
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: calc(100vw - 24px);
  min-height: 52px;
  padding: 8px 12px 12px 14px;
  background: #ffffff;
  border: 2px solid var(--hud-base);
  border-radius: 14px;
  box-shadow: 0 0 0 4px var(--turn-color), 0 6px 14px rgba(0, 0, 0, 0.25);
  color: var(--hud-base);
  pointer-events: all;
  box-sizing: border-box;
  z-index: 35;
}

.hud-turnbar--mine {
  background: color-mix(in srgb, var(--turn-color) 22%, #ffffff);
}

.hud-turnbar-sub {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0.8;
}

/* The bar appearing is the cue: a quick fade + rise, then it holds still. */
.turnbar-pop-enter-active {
  transition: opacity 200ms ease-out;
}

.turnbar-pop-leave-active {
  transition: opacity 120ms ease-in;
}

.turnbar-pop-enter-from,
.turnbar-pop-leave-to {
  opacity: 0;
}

.hud-turnbar-dot {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--turn-color);
  border: 2px solid var(--hud-base);
}

.hud-turnbar-text {
  flex: 1;
  min-width: 0;
  font-size: 0.95rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hud-roll-icon {
  margin-right: 8px;
}

.hud-roll-btn {
  flex-shrink: 0;
  min-height: 44px;
  padding: 10px 20px;
  margin: 0;
  font-size: 1rem;
}

/* ── Speech bubbles: beside the rail chip, toward the board ─ */
.hud-speech-bubble {
  position: absolute;
  top: 50%;
  left: calc(100% + 14px);
  transform: translateY(-50%);
  width: max-content;
  max-width: 220px;
  padding: 6px 10px;
  background: #ffffff;
  color: #000000;
  border: 2px solid var(--hud-base);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  font-size: 0.8rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
  z-index: 5;
  pointer-events: none;
}

.speech-fade-enter-active,
.speech-fade-leave-active {
  transition: opacity 150ms ease;
}

.speech-fade-enter-from,
.speech-fade-leave-to {
  opacity: 0;
}

/* ── Phones held upright: a strip of four under the top bar ─ */
@media (max-width: 600px) and (orientation: portrait) {
  .hud-players {
    top: calc(var(--hud-pad) + var(--safe-t) + 56px);
    right: calc(var(--hud-pad) + var(--safe-r));
    width: auto;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
  }

  .hud-player {
    gap: 6px;
    padding: 6px 6px 9px 11px;
    border-radius: 9px;
  }

  .hud-player::before {
    width: 5px;
    border-radius: 7px 0 0 7px;
  }

  .hud-player::after {
    border-radius: 9px;
  }

  .hud-player--active {
    transform: translateY(4px);
  }

  /* No room for an avatar in a quarter of the width: the stripe carries
     the color, the name the identity. */
  .hud-player-avatar {
    display: none;
  }

  .hud-player-name {
    font-size: 0.72rem;
  }

  /* Our own chip is already orange-filled; the pill doesn't fit here. */
  .hud-player-you {
    display: none;
  }

  .hud-player-pips {
    gap: 3px;
  }

  .hud-pip {
    width: 6px;
    height: 6px;
    border-width: 1px;
  }

  .hud-player-timer {
    left: 6px;
    right: 6px;
  }

  /* Bubbles drop below the strip, kept inside the screen edges. */
  .hud-speech-bubble {
    top: calc(100% + 10px);
    left: 0;
    transform: none;
    max-width: 60vw;
  }

  .hud-player--slot-2 .hud-speech-bubble,
  .hud-player--slot-3 .hud-speech-bubble {
    left: auto;
    right: 0;
  }

  .hud-turnbar {
    left: calc(var(--hud-pad) + var(--safe-l));
    right: calc(var(--hud-pad) + var(--safe-r));
    transform: none;
    min-width: 0;
    max-width: none;
  }
}

/* ── Phones held sideways: compact rail, turn bar bottom right ─ */
@media (max-height: 500px) and (orientation: landscape) {
  .hud-topbar {
    top: calc(8px + var(--safe-t));
  }

  .hud-players {
    top: calc(8px + var(--safe-t) + 54px);
    width: 160px;
    gap: 6px;
  }

  .hud-player {
    padding: 5px 10px 8px 14px;
    gap: 8px;
  }

  .hud-player-avatar {
    width: 22px;
    height: 22px;
    font-size: 0.7rem;
  }

  .hud-player-name {
    font-size: 0.75rem;
  }

  .hud-player-you {
    display: none;
  }

  /* Narrow and stacked, so it stays in the grass beside the board. */
  .hud-turnbar {
    left: auto;
    right: calc(var(--hud-pad) + var(--safe-r));
    bottom: calc(8px + var(--safe-b));
    transform: none;
    flex-wrap: wrap;
    min-width: 0;
    width: 196px;
    row-gap: 6px;
  }

  .hud-turnbar-text {
    white-space: normal;
    font-size: 0.85rem;
  }

  .hud-roll-btn {
    width: 100%;
  }

  .hud-status-label {
    display: none;
  }
}
</style>
