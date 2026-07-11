<template>
  <div class="menu-side-left">
    <app-panel class="menu-card menu-card--lobby">
      <h2 class="panel-title">{{ t('online.lobby') }}</h2>

      <div v-if="store.online.mode === 'private' && store.online.joinCode" class="lobby-code-row">
        <span class="lobby-code-label">{{ t('online.code') }}</span>
        <span class="lobby-code">{{ store.online.joinCode }}</span>
        <app-button small slate-blue class="lobby-copy-btn" @click="copyCode" :title="copied ? t('online.copied') : t('online.copy')">
          <component :is="copied ? 'CheckIcon' : 'CopyIcon'" :size="14" />
        </app-button>
      </div>

      <div class="lobby-seats">
        <div v-for="index in 4" :key="index" class="lobby-seat">
          <span class="player-dot" :style="{ background: playerColors[index - 1] }"></span>
          <template v-if="seatAt(index - 1)">
            <span class="lobby-seat-name">
              {{ seatAt(index - 1).displayName }}
              <span v-if="seatAt(index - 1).userId === store.online.selfUserId" class="lobby-tag">({{ t('online.ready').toLowerCase() }})</span>
              <span v-if="seatAt(index - 1).userId === store.online.hostUserId" class="lobby-tag">(host)</span>
              <span v-if="!seatAt(index - 1).connected" class="lobby-tag lobby-tag--offline">(offline)</span>
            </span>
            <span class="lobby-ready" :class="{ 'lobby-ready--yes': seatAt(index - 1).ready }">
              {{ seatAt(index - 1).ready ? t('online.ready') : t('online.waiting') }}
            </span>
          </template>
          <span v-else class="lobby-seat-name lobby-seat-name--empty">{{ t('online.waiting') }}</span>
        </div>
      </div>

      <div class="menu-row">
        <app-button :green="myReady" :slate-blue="!myReady" @click="toggleReady">
          {{ myReady ? t('online.readyDone') : t('online.readyCheck') }}
        </app-button>
        <app-button
          v-if="isHost"
          green
          :disabled="!canStart"
          @click="startGame"
        >
          {{ t('online.start') }}
        </app-button>
      </div>

      <chat-panel
        class="lobby-chat"
        :messages="store.online.chat"
        :self-id="store.online.selfUserId"
        @send="sendChat"
      />

      <div class="menu-row">
        <app-button red class="menu-btn-full" @click="leave">{{ t('online.leaveLobby') }}</app-button>
      </div>
    </app-panel>
  </div>
</template>

<script>
import ChatPanel from './ChatPanel.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import ChatController from '../network/ChatController';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { Copy, Check } from '@lucide/vue';

export default {
  components: { ChatPanel, CopyIcon: Copy, CheckIcon: Check },
  data() {
    return {
      store: ApplicationStore,
      playerColors: PLAYER_COLORS,
      copied: false,
    };
  },
  computed: {
    mySeatObject() {
      return (this.store.online.seats || []).find(
          (seat) => seat && seat.userId === this.store.online.selfUserId,
      ) || null;
    },
    myReady() {
      return Boolean(this.mySeatObject?.ready);
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
    toggleReady() {
      MatchController.sendReady(!this.myReady);
    },
    startGame() {
      MatchController.sendStart();
    },
    sendChat(text) {
      ChatController.send(text);
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
.menu-card--lobby {
  width: min(440px, 92vw);
}

.lobby-code-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.lobby-code-label {
  font-size: 11px;
  opacity: 0.7;
}

.lobby-code {
  font-size: 18px;
  letter-spacing: 4px;
  color: #f7d51d;
}

.lobby-copy-btn {
  margin-left: auto;
}

.lobby-seats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.lobby-seat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.lobby-seat-name--empty {
  opacity: 0.45;
}

.lobby-tag {
  font-size: 10px;
  opacity: 0.7;
}

.lobby-tag--offline {
  color: var(--agu-color-red, #e9576f);
}

.lobby-ready {
  margin-left: auto;
  font-size: 10px;
  opacity: 0.7;
}

.lobby-ready--yes {
  color: var(--agu-color-green, #71bd26);
  opacity: 1;
}

.lobby-chat {
  margin: 14px 0;
}
</style>
