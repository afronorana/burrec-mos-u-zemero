<template>
  <div class="lobby-layer">
    <app-panel class="lobby-card">
      <h2 class="panel-title">{{ t('online.lobby') }}</h2>

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

      <p v-if="!mySeatObject" class="lobby-tip">
        {{ t('online.chooseColorPrompt') }}
      </p>

      <div class="menu-row lobby-actions">
        <app-button
          v-if="isHost"
          green
          :disabled="!canStart"
          @click="startGame"
        >
          {{ t('online.start') }}
        </app-button>
        <app-button red @click="leave">{{ t('online.leaveLobby') }}</app-button>
      </div>
    </app-panel>

    <!-- Seats: pinned to the 4 screen corners on desktop, 2x2 grid at the
         bottom on small screens. Free slots double as claim buttons. -->
    <div class="lobby-seats-layer">
      <button
        v-for="index in seatDisplayOrder"
        :key="index"
        type="button"
        class="lobby-seat-chip"
        :class="[`lobby-seat-chip--corner-${index}`, seatAt(index) ? 'lobby-seat-chip--taken' : 'lobby-seat-chip--free']"
        @click="claimSeat(index)"
      >
        <span class="player-dot" :style="{ background: playerColors[index] }"></span>
        <template v-if="seatAt(index)">
          <span class="lobby-seat-chip-text">
            <span class="lobby-seat-chip-name">{{ seatAt(index).displayName }}</span>
            <span v-if="seatAt(index).userId === store.online.hostUserId || !seatAt(index).connected" class="lobby-seat-chip-meta">
              <span v-if="seatAt(index).userId === store.online.hostUserId" class="lobby-tag">(host)</span>
              <span v-if="!seatAt(index).connected" class="lobby-tag lobby-tag--offline">(offline)</span>
            </span>
          </span>
        </template>
        <template v-else>
          <span class="lobby-seat-chip-text">
            <span class="lobby-seat-chip-name lobby-seat-chip-name--free">{{ t('online.freeSlot') }}</span>
            <span class="lobby-seat-chip-meta">{{ t('online.clickToJoin') }}</span>
          </span>
        </template>
      </button>
    </div>

    <chat-drawer />
  </div>
</template>

<script>
import ChatDrawer from './ChatDrawer.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { Copy, Check } from '@lucide/vue';

export default {
  components: { ChatDrawer, CopyIcon: Copy, CheckIcon: Check },
  data() {
    return {
      store: ApplicationStore,
      playerColors: PLAYER_COLORS,
      copied: false,
      // Mirrors how the bases read from the fixed camera:
      // red top-left, yellow top-right / green bottom-left, blue bottom-right.
      seatDisplayOrder: [0, 1, 3, 2],
    };
  },
  computed: {
    mySeatObject() {
      return (this.store.online.seats || []).find(
          (seat) => seat && seat.userId === this.store.online.selfUserId,
      ) || null;
    },
    isHost() {
      return this.store.online.hostUserId === this.store.online.selfUserId;
    },
    canStart() {
      const seated = (this.store.online.seats || []).filter(Boolean);
      return seated.length >= 2 && seated.every((seat) => seat.ready);
    },
  },
  methods: {
    t,
    seatAt(index) {
      return (this.store.online.seats || [])[index] || null;
    },
    claimSeat(index) {
      if (!this.seatAt(index)) {
        MatchController.requestClaimSeat(index);
      }
    },
    startGame() {
      MatchController.sendStart();
    },
    leave() {
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

.lobby-card {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: min(340px, 92vw);
  pointer-events: all;
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

.lobby-tip {
  margin: 0 0 14px;
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: center;
  color: var(--agu-color-base, #263f2a);
  opacity: 0.75;
}

.lobby-tip::before {
  content: '💡 ';
}

.lobby-actions {
  margin-top: 0;
}

/* ── Seat chips ──────────────────────────────────────────── */
.lobby-seats-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.lobby-seat-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  max-width: 220px;
  min-height: 44px;
  padding: 8px 14px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
  font-family: inherit;
  font-size: 12px;
  text-align: left;
  color: var(--agu-color-base, #263f2a);
  pointer-events: all;
  cursor: default;
  -webkit-tap-highlight-color: transparent;
}

.lobby-seat-chip--free {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.82);
  border-style: dashed;
  animation: lobby-chip-pulse 2s ease-in-out infinite;
}

.lobby-seat-chip--free:hover {
  background: #ffffff;
  animation-play-state: paused;
}

/* Expanding ring, echoing the ground ripples on the 3D bases. */
@keyframes lobby-chip-pulse {
  0% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18), 0 0 0 0 rgba(255, 255, 255, 0.55); }
  70% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18), 0 0 0 9px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18), 0 0 0 0 rgba(255, 255, 255, 0); }
}

.lobby-seat-chip--corner-0 { top: 16px; left: 16px; }
.lobby-seat-chip--corner-1 { top: 16px; right: 16px; }
.lobby-seat-chip--corner-2 { bottom: 16px; right: 16px; }
.lobby-seat-chip--corner-3 { bottom: 16px; left: 16px; }

.lobby-seat-chip-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.lobby-seat-chip-name {
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lobby-seat-chip-name--free {
  opacity: 0.75;
}

.lobby-seat-chip-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  line-height: 1.2;
  opacity: 0.75;
}

.lobby-tag {
  font-size: 0.7rem;
}

.lobby-tag--offline {
  color: var(--agu-color-red, #e9576f);
}

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

  .lobby-card {
    width: min(300px, 94vw);
  }

  .lobby-code {
    --agu-code-cell-size: 38px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lobby-seat-chip--free {
    animation: none;
  }
}
</style>
