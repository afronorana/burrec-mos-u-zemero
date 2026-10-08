<template>
  <div class="lobby-layer">
    <!-- Top-center column: its own instruction panel, then (host only) the
         room code + start controls stacked beneath it. -->
    <div class="lobby-top">
      <!-- The room's Game mode (set by its creator) and what it means. -->
      <div v-if="roomMode" class="lobby-mode">
        <span class="lobby-mode-name">{{ t('modes.title') }}: {{ t(`modes.${roomMode}`) }}</span>
        <span class="lobby-mode-info">{{ t(`modes.${roomMode}Info`) }}</span>
      </div>
      <!-- No instructions: empty bases and the "+" seat chips say "pick a
           color". Seated non-hosts only see who they're waiting on. -->
      <div v-if="waitingOn" class="lobby-waiting" :title="t('online.waitingForAdmin', { name: waitingOn })">
        <hourglass-icon :size="14" />
        <crown-icon :size="14" />
        <span class="lobby-waiting-name">{{ waitingOn }}</span>
      </div>

      <!-- Room code is admin-only; non-hosts never see it. -->
      <app-panel v-if="isHost" class="lobby-card lobby-host-card">
        <div v-if="store.online.mode === 'private' && store.online.joinCode" class="lobby-code-row">
          <app-game-code
            :model-value="store.online.joinCode"
            readonly
            class="lobby-code"
          />
          <app-button small slate-blue class="lobby-copy-btn" @click="copyCode" :title="copied ? t('online.copied') : t('online.copy')">
            <component :is="copied ? 'CheckIcon' : 'CopyIcon'" :size="14" />
          </app-button>
        </div>

        <app-button
          class="lobby-start-btn"
          :disabled="!canStart"
          @click="startGame"
        >
          {{ t('online.start') }}
        </app-button>
      </app-panel>
    </div>

    <!-- Small leave button, pinned top-left to the right of the top-left seat
         chip on desktop (item: "Leave lobby" small, top-left). -->
    <app-button small red class="lobby-leave-btn" @click="askLeave">{{ t('online.leaveLobby') }}</app-button>

    <!-- Settings button commented out for now (kept for easy re-enable).
    <app-button orange class="hud-icon-btn lobby-settings-btn" :title="t('settings.title')" @click="openSettings">
      <settings-icon :size="18" />
    </app-button>
    -->


    <!-- Confirm before leaving the lobby -->
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

    <!-- Seats: pinned to the 4 screen corners on desktop, 2x2 grid at the
         bottom on small screens. Free slots double as claim buttons. -->
    <div class="lobby-seats-layer">
      <!-- A Bot's seat is a free slot: a dashed outline in its color with a
           "+" (breathing until we're seated); once seated, the other free
           colors stay tappable to switch. A person's seat is tinted in its
           color with their initial. -->
      <button
        v-for="index in seatDisplayOrder"
        :key="index"
        type="button"
        class="lobby-seat-chip"
        :class="[
          `lobby-seat-chip--corner-${index}`,
          seatAt(index) ? 'lobby-seat-chip--taken' : 'lobby-seat-chip--free',
          {
            'lobby-seat-chip--offer': !seatAt(index) && !mySeatObject,
            'lobby-seat-chip--mine': seatAt(index) && seatAt(index).userId === store.online.selfUserId,
            'lobby-seat-chip--offline': seatAt(index) && !seatAt(index).connected,
            'lobby-seat-chip--dark-text': index === 1 || index === 3,
          },
        ]"
        :style="{ '--seat-color': playerColors[index] }"
        :title="seatAt(index) ? seatAt(index).displayName : t('online.playColor', { color: t(`online.color_${index}`) })"
        :aria-label="seatAt(index) ? seatAt(index).displayName : t('online.playColor', { color: t(`online.color_${index}`) })"
        @click="claimSeat(index)"
      >
        <template v-if="seatAt(index)">
          <span class="lobby-seat-avatar">{{ initialOf(seatAt(index)) }}</span>
          <span class="lobby-seat-chip-name">{{ seatAt(index).displayName }}</span>
          <crown-icon v-if="seatAt(index).userId === store.online.hostUserId" :size="16" class="lobby-seat-crown" />
        </template>
        <plus-icon v-else :size="26" :stroke-width="3" class="lobby-seat-plus" />
      </button>
    </div>

    <chat-drawer />
  </div>
</template>

<script>
import ChatDrawer from './ChatDrawer.vue';
import { openPlayerActions } from '../utils/authPrompt';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { Copy, Check, Settings, Plus, Crown, Hourglass } from '@lucide/vue';

export default {
  components: {
    ChatDrawer,
    CopyIcon: Copy,
    CheckIcon: Check,
    SettingsIcon: Settings,
    PlusIcon: Plus,
    CrownIcon: Crown,
    HourglassIcon: Hourglass,
  },
  data() {
    return {
      store: ApplicationStore,
      playerColors: PLAYER_COLORS,
      copied: false,
      confirmLeave: false,
      // Mirrors how the bases read from the fixed camera:
      // red top-left, yellow top-right / green bottom-left, blue bottom-right.
      seatDisplayOrder: [0, 1, 3, 2],
    };
  },
  computed: {
    roomMode() {
      return this.store.online.gameMode;
    },
    mySeatObject() {
      return (this.store.online.seats || []).find(
          (seat) => seat && seat.userId === this.store.online.selfUserId,
      ) || null;
    },
    isHost() {
      return this.store.online.hostUserId === this.store.online.selfUserId;
    },
    // Bots hold every other seat, so the host can start once seated.
    canStart() {
      return Boolean(this.mySeatObject);
    },
    // Display name of the admin (host), resolved from their seat.
    adminName() {
      const hostSeat = (this.store.online.seats || []).find(
          (seat) => seat && seat.userId === this.store.online.hostUserId,
      );
      return hostSeat ? hostSeat.displayName : '';
    },
    // A seated non-host waits on the host to start: their name, or ''.
    waitingOn() {
      if (!this.mySeatObject || this.isHost) return '';
      return this.adminName;
    },
  },
  methods: {
    t,
    // A human's seat, or null for a Bot's (CONTEXT.md: Bot), which any
    // player may take.
    seatAt(index) {
      const seat = (this.store.online.seats || [])[index];
      return seat && !seat.bot ? seat : null;
    },
    initialOf(seat) {
      return (seat.displayName || '?').trim().charAt(0).toUpperCase() || '?';
    },
    // A Bot's seat: claim it. Someone else's: Block / Report them.
    claimSeat(index) {
      const seat = this.seatAt(index);
      if (!seat) {
        MatchController.requestClaimSeat(index);
      } else {
        openPlayerActions({ userId: seat.userId, name: seat.displayName });
      }
    },
    startGame() {
      MatchController.sendStart();
    },
    openSettings() {
      this.store.settingsOpen = true;
    },
    askLeave() {
      this.confirmLeave = true;
    },
    doLeave() {
      this.confirmLeave = false;
      MatchController.leaveMatch();
    },
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.store.online.joinCode);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1500);
      } catch (error) {
        // Clipboard unavailable — the code is on screen anyway.
      }
    },
  },
};
</script>

<style scoped>
.lobby-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Top-center stack: instruction panel, then the host's code + start card. */
.lobby-top {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: min(340px, 92vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.lobby-card {
  width: 100%;
  pointer-events: all;
}

.lobby-mode {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  text-align: center;
  color: var(--agu-color-base, #263f2a);
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
}

.lobby-mode-name {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.lobby-mode-info {
  font-size: 0.75rem;
  line-height: 1.35;
}

.lobby-waiting {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  color: var(--agu-color-base, #263f2a);
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 999px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  font-size: 0.85rem;
  font-weight: 700;
  pointer-events: all;
}

.lobby-waiting-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lobby-code-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.lobby-code {
  --agu-code-cell-size: 44px;
}

.lobby-start-btn {
  display: block;
  width: 100%;
  margin: 0;
  font-size: 1.1rem;
  padding: 16px 24px;
}

/* Small leave button sitting to the right of the top-left seat chip
   (chip is 16px in + 150px min-width + 10px gap ≈ 176px). */
.lobby-leave-btn {
  position: absolute;
  top: 22px;
  left: 176px;
  pointer-events: all;
  z-index: 5;
}

/* ── Seat chips ──────────────────────────────────────────── */
.lobby-seats-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* A person's seat: a soft tint of the seat color, colored initial. */
.lobby-seat-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  max-width: 220px;
  min-height: 52px;
  padding: 8px 14px 8px 10px;
  background: color-mix(in srgb, var(--seat-color) 22%, #ffffff);
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
  font-family: inherit;
  font-size: 12px;
  text-align: left;
  color: var(--agu-color-base, #263f2a);
  pointer-events: all;
  cursor: default;
  box-sizing: border-box;
  transition: transform 160ms ease;
  -webkit-tap-highlight-color: transparent;
}

.lobby-seat-avatar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--seat-color);
  border: 2px solid var(--agu-color-base, #263f2a);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
}

.lobby-seat-chip--dark-text .lobby-seat-avatar {
  color: var(--agu-color-base, #263f2a);
  text-shadow: none;
}

.lobby-seat-chip-name {
  flex: 1;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lobby-seat-crown {
  flex-shrink: 0;
  color: var(--agu-color-base, #263f2a);
}

.lobby-seat-chip--offline .lobby-seat-avatar,
.lobby-seat-chip--offline .lobby-seat-chip-name {
  opacity: 0.4;
}

/* Our own seat: a thick ring in our color and a touch bigger. */
.lobby-seat-chip--mine {
  border-color: var(--seat-color);
  border-width: 4px;
  padding: 6px 12px 6px 8px;
  transform: scale(1.06);
}

/* A free seat (a Bot's): an empty, dashed slot with a "+" in its color. */
.lobby-seat-chip--free {
  justify-content: center;
  background: rgba(255, 255, 255, 0.92);
  border: 3px dashed var(--seat-color);
  padding: 6px 12px;
  color: var(--seat-color);
  cursor: pointer;
}

.lobby-seat-plus {
  filter: drop-shadow(0 1px 0 rgba(38, 63, 42, 0.45));
}

.lobby-seat-chip--free:hover {
  background: color-mix(in srgb, var(--seat-color) 14%, #ffffff);
}

.lobby-seat-chip--free:active {
  transform: scale(0.97);
}

/* Until we've picked, the free slots breathe (transform only — runs on the
   compositor, no extra canvas renders). */
.lobby-seat-chip--offer {
  animation: lobby-seat-breathe 1.6s ease-in-out infinite;
}

@keyframes lobby-seat-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .lobby-seat-chip--offer {
    animation: none;
  }
}

.lobby-seat-chip--corner-0 { top: 16px; left: 16px; }
.lobby-seat-chip--corner-1 { top: 16px; right: 16px; }
.lobby-seat-chip--corner-2 { bottom: 16px; right: 16px; }
.lobby-seat-chip--corner-3 { bottom: 16px; left: 16px; }

/* ── Small screens: 2x2 grid pinned to the bottom ────────── */
@media (max-width: 768px) {
  .lobby-seats-layer {
    inset: auto 8px 8px 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .lobby-seat-chip {
    position: static;
    min-width: 0;
    max-width: none;
    width: 100%;
  }

  /* Seats are a bottom grid on mobile, so push the top stack below the
     leave button (top-left) and the chat toggle (top-right, ~top:72). */
  .lobby-top {
    top: 120px;
    width: min(300px, 94vw);
  }

  .lobby-leave-btn {
    top: 8px;
    left: 8px;
  }

  .lobby-code {
    --agu-code-cell-size: 38px;
  }
}
</style>
