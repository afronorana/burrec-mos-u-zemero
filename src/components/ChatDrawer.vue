<template>
  <div class="chat-drawer">
    <app-button orange class="hud-icon-btn" :title="chatOpen ? 'Close chat' : 'Chat'" @click="chatOpen = !chatOpen">
      <message-square-icon :size="20" />
      <span v-if="unreadCount > 0" class="chat-drawer-unread">{{ unreadCount }}</span>
    </app-button>
    <transition name="chat-pop">
      <app-panel v-if="chatOpen" class="chat-drawer-panel">
        <chat-panel
          :messages="store.online.chat"
          :self-id="selfId"
          @send="sendChat"
        />
      </app-panel>
    </transition>
  </div>
</template>

<script>
import ChatPanel from './ChatPanel.vue';
import ApplicationStore from '../utils/ApplicationStore';
import ChatController from '../network/ChatController';
import { MessageSquare } from '@lucide/vue';

export default {
  components: { ChatPanel, MessageSquareIcon: MessageSquare },
  data() {
    return {
      store: ApplicationStore,
      chatOpen: false,
      unreadCount: 0,
    };
  },
  computed: {
    // Connected to a Nakama match (lobby or game) — online.enabled alone
    // only turns on once the game starts, which would miss the lobby.
    isOnlineMatch() {
      return Boolean(this.store.online.matchId);
    },
    selfId() {
      return this.isOnlineMatch ? this.store.online.selfUserId : 'local-self';
    },
  },
  watch: {
    'store.online.chat.length'(newLength) {
      if (newLength === 0 || this.chatOpen) return;
      const lastMsg = this.store.online.chat[newLength - 1];
      if (lastMsg && lastMsg.senderId !== this.selfId) {
        this.unreadCount++;
      }
    },
    chatOpen(val) {
      if (val) {
        this.unreadCount = 0;
      }
    },
  },
  methods: {
    sendChat(text) {
      if (this.isOnlineMatch) {
        ChatController.send(text);
        return;
      }

      // Offline: keep local chat in the same queue so bubbles/history work.
      const currentPlayer = this.store.players[this.store.currentPlayerId] || null;
      this.store.online.chat.push({
        id: Math.random().toString(36).substring(2, 9),
        senderId: 'local-self',
        username: currentPlayer?.name || 'Player',
        message: text,
        createTime: Date.now(),
      });
    },
  },
};
</script>

<style scoped>
/* Desktop: bottom-right, lifted above the bottom-right seat chip. */
.chat-drawer {
  position: fixed;
  right: 16px;
  bottom: 76px;
  z-index: 30;
  pointer-events: all;
}

/* The panel opens to the left of the toggle, growing upward from it. */
.chat-drawer-panel {
  position: absolute;
  right: calc(100% + 10px);
  bottom: 0;
  width: min(320px, calc(100vw - 86px));
  padding: 12px;
}

/* Mobile: top-right, just below the top-right seat chip; panel opens down. */
@media (max-width: 768px) {
  .chat-drawer {
    top: 72px;
    right: 12px;
    bottom: auto;
  }

  .chat-drawer-panel {
    bottom: auto;
    top: 0;
  }
}

.chat-pop-enter-active,
.chat-pop-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.chat-pop-enter-from,
.chat-pop-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.chat-drawer-unread {
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
</style>
