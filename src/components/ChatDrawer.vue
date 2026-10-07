<template>
  <div class="chat-drawer" :class="{ 'chat-drawer--embedded': embedded }">
    <app-button orange class="hud-icon-btn chat-drawer-toggle" :title="chatOpen ? 'Close chat' : 'Chat'" @click="chatOpen = !chatOpen">
      <component :is="chatOpen ? 'XIcon' : 'MessageSquareIcon'" :size="20" />
      <!-- Re-keyed per message, so each arrival replays the pop. -->
      <span v-if="unreadCount > 0 && !chatOpen" :key="unreadCount" class="chat-drawer-unread">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
    </app-button>
    <!-- A sheet, never a box on the board: from the right on wide screens
         and phones held sideways, from the bottom on phones held upright.
         Opening it pauses nothing — the game keeps going behind it. -->
    <transition name="chat-sheet">
      <app-panel v-if="chatOpen" class="chat-sheet">
        <div class="chat-sheet-head">
          <span class="chat-sheet-title">{{ t('online.chatTitle') }}</span>
          <button type="button" class="chat-sheet-close" :aria-label="t('online.close')" @click="chatOpen = false">
            <x-icon :size="18" />
          </button>
        </div>
        <chat-panel
          :messages="visibleMessages"
          :self-id="selfId"
          scroll-max-height="var(--chat-scroll-max, 200px)"
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
import { t } from '../utils/i18n';
import { MessageSquare, X } from '@lucide/vue';

// Upright phones get the bottom sheet, which would hide the turn bar's Roll
// button — there the sheet steps aside when our turn starts.
const PORTRAIT_PHONE = '(max-width: 600px) and (orientation: portrait)';

export default {
  components: { ChatPanel, MessageSquareIcon: MessageSquare, XIcon: X },
  props: {
    // Rendered inside the HUD top bar (in-game) instead of floating on its
    // own (lobby).
    embedded: {
      type: Boolean,
      default: false,
    },
  },
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
    // Blocked senders' messages are dropped on arrival; this also hides the
    // ones that arrived before the Block.
    visibleMessages() {
      const blocked = this.store.online.blockedIds;
      return blocked.length
        ? this.store.online.chat.filter((message) => !blocked.includes(message.senderId))
        : this.store.online.chat;
    },
    selfId() {
      return this.isOnlineMatch ? this.store.online.selfUserId : 'local-self';
    },
    isMyRollTurn() {
      const player = this.store.players[this.store.currentPlayerId];
      return Boolean(player && player.controller === 'local' && this.store.gamePlayStatus.isRolling);
    },
  },
  watch: {
    // Counts what this player can actually see (Blocked senders excluded).
    'visibleMessages.length'(newLength, oldLength) {
      if (this.chatOpen || newLength <= oldLength) return;
      const lastMsg = this.visibleMessages[newLength - 1];
      if (lastMsg && lastMsg.senderId !== this.selfId) {
        this.unreadCount += 1;
      }
    },
    chatOpen(val) {
      if (val) {
        this.unreadCount = 0;
      }
    },
    isMyRollTurn(mine) {
      if (mine && this.chatOpen && window.matchMedia(PORTRAIT_PHONE).matches) {
        this.chatOpen = false;
      }
    },
  },
  methods: {
    t,
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
/* Standalone (lobby): the toggle floats bottom-right, above the safe area. */
.chat-drawer {
  position: fixed;
  right: calc(16px + env(safe-area-inset-right, 0px));
  bottom: calc(76px + env(safe-area-inset-bottom, 0px));
  z-index: 30;
  pointer-events: all;
}

@media (max-width: 768px) {
  .chat-drawer {
    top: calc(72px + env(safe-area-inset-top, 0px));
    right: calc(12px + env(safe-area-inset-right, 0px));
    bottom: auto;
  }
}

/* In the HUD top bar: just a button in the row. */
.chat-drawer--embedded {
  position: relative;
  inset: auto;
  z-index: auto;
}

.chat-drawer-toggle {
  position: relative;
}

/* Side sheet (default): full height under the top bar, right edge. */
.chat-sheet {
  --chat-scroll-max: calc(100dvh - 260px);
  position: fixed;
  top: calc(76px + env(safe-area-inset-top, 0px));
  right: calc(12px + env(safe-area-inset-right, 0px));
  width: min(340px, 44vw);
  max-height: calc(100dvh - 92px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
  margin: 0;
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  z-index: 45;
  box-sizing: border-box;
}

/* Phones held sideways: the sheet hugs the right edge, top to bottom. */
@media (max-height: 500px) and (orientation: landscape) {
  .chat-sheet {
    --chat-scroll-max: calc(100dvh - 150px);
    top: calc(8px + env(safe-area-inset-top, 0px));
    max-height: calc(100dvh - 16px);
    width: min(320px, 42vw);
  }
}

/* Phones held upright: a bottom sheet over the lower board. */
@media (max-width: 600px) and (orientation: portrait) {
  .chat-sheet {
    --chat-scroll-max: calc(48dvh - 130px);
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    max-height: 52dvh;
    padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    border-radius: 16px 16px 0 0;
    border-bottom-width: 0;
    box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.25);
  }
}

.chat-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.chat-sheet-title {
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.chat-sheet-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.chat-sheet-enter-active,
.chat-sheet-leave-active {
  transition: opacity 180ms ease, transform 180ms ease-out;
}

.chat-sheet-enter-from,
.chat-sheet-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

@media (max-width: 600px) and (orientation: portrait) {
  .chat-sheet-enter-from,
  .chat-sheet-leave-to {
    transform: translateY(40%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-sheet-enter-from,
  .chat-sheet-leave-to {
    transform: none;
  }
}

.chat-drawer-unread {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: var(--agu-color-red, #e9576f);
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: bold;
  border-radius: 9px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--agu-color-base, #263f2a);
  animation: chat-unread-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* A new message: the badge springs in with an overshoot and a small wobble,
   then sits still (transform only — no repaint, no WebGL render). */
@keyframes chat-unread-pop {
  0% { transform: scale(0.2) rotate(-25deg); }
  55% { transform: scale(1.35) rotate(10deg); }
  75% { transform: scale(0.9) rotate(-5deg); }
  100% { transform: scale(1) rotate(0); }
}

@media (prefers-reduced-motion: reduce) {
  .chat-drawer-unread {
    animation: none;
  }
}
</style>
