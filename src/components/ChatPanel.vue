<template>
  <div class="chat-panel">
    <app-scrollable
      ref="scrollable"
      max-height="200px"
      class="chat-messages-scroll"
    >
      <div class="chat-messages-list">
        <p v-if="!messages.length" class="chat-empty">{{ t('online.emptyChat') }}</p>
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-message"
          :class="{ 'chat-message--other': isOther(message) }"
          @click="openActions(message)"
        >
          <span
            class="chat-sender-badge"
            :style="{ background: getSenderColor(message), color: getBadgeTextColor(getSenderColor(message)) }"
          >{{ getSenderName(message) }}</span>
          <span class="chat-text">{{ message.message }}</span>
        </div>
      </div>
    </app-scrollable>

    <!-- Guests read only: the input shows disabled and any tap on it opens
         the register prompt (the server rejects Guest messages anyway). -->
    <div v-if="!isMember" class="chat-input-row chat-input-locked">
      <div class="chat-locked-field">🔒 {{ t('online.chatGuestPlaceholder') }}</div>
      <app-button blue class="chat-send-btn" disabled>
        <send-icon :size="18" />
      </app-button>
      <button type="button" class="chat-locked-hit" :aria-label="t('online.chatGuestPlaceholder')" @click="promptRegister('chat')"></button>
    </div>

    <form v-else class="chat-input-row" @submit.prevent="submit" @keyup.enter="submit">
      <app-input
        v-model="draft"
        label=""
        :required="false"
        :placeholder="t('online.chatPlaceholder')"
        :maxlength="maxLength"
        class="chat-input"
      >
        <template #append>
          <app-button blue class="chat-send-btn" :disabled="!draft.trim()" @click="submit">
            <send-icon :size="18" />
          </app-button>
        </template>
      </app-input>
    </form>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { openPlayerActions, promptRegister } from '../utils/authPrompt';
import { Send } from '@lucide/vue';

export default {
  components: { SendIcon: Send },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    selfId: {
      type: String,
      default: null,
    },
  },
  emits: ['send'],
  data() {
    return {
      store: ApplicationStore,
      draft: '',
      maxLength: 200,
    };
  },
  computed: {
    isMember() {
      return this.store.online.account.member;
    },
  },
  watch: {
    // Hard cap regardless of whether the input forwards its maxlength attr.
    draft(val) {
      if (val.length > this.maxLength) {
        this.draft = val.slice(0, this.maxLength);
      }
    },
    'messages.length'() {
      this.scrollToBottom();
    },
  },
  mounted() {
    // The panel mounts fresh every time the drawer opens — start at the
    // latest message, not the top of the history.
    this.scrollToBottom();
  },
  methods: {
    t,
    promptRegister,
    isOther(message) {
      return !!this.store.online.matchId && message.senderId !== this.store.online.selfUserId;
    },
    // Tap another player's message: Block / Report it.
    openActions(message) {
      if (!this.isOther(message)) return;
      openPlayerActions({
        userId: message.senderId,
        name: this.getSenderName(message),
        messageId: message.id,
        messageText: message.message,
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const scroller = this.$refs.scrollable;
        if (scroller && scroller.viewportEl) {
          scroller.viewportEl.scrollTop = scroller.viewportEl.scrollHeight;
        }
      });
    },
    submit() {
      const text = this.draft.trim().slice(0, this.maxLength);
      if (!text) {
        return;
      }
      this.$emit('send', text);
      this.draft = '';
    },
    getSenderName(message) {
      if (!message) return '';
      if (message.senderId === 'local-self' || message.senderId === 'local') {
        return message.username;
      }
      const seats = this.store?.online?.seats || [];
      const seat = seats.find((s) => s && s.userId === message.senderId);
      if (seat) {
        return seat.displayName || seat.username || message.username;
      }
      // No seat yet (color not picked) — the server still knows the display
      // name of everyone in the match and broadcasts it with the lobby state.
      const known = this.store?.online?.displayNames?.[message.senderId];
      return known || message.username;
    },
    getSenderColor(message) {
      const seats = this.store?.online?.seats || [];
      const seat = seats.find((s) => s && s.userId === message.senderId);
      if (seat) {
        return PLAYER_COLORS[seat.seat];
      }
      const name = this.getSenderName(message);
      const player = (this.store.players || []).find((p) => p.name === name);
      return player ? player.color : '#8a8a8a';
    },
    // Yellow/green player colors need dark text on the badge to stay legible.
    getBadgeTextColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return ((0.299 * r) + (0.587 * g) + (0.114 * b)) > 150 ? '#263f2a' : '#ffffff';
    },
  },
};
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
}

.chat-messages-scroll {
  flex: 1;
  min-height: 120px;
  max-height: 200px;
  background: #ffffff;
  border: 1.5px solid rgba(38, 63, 42, 0.25);
  border-radius: 4px;
  padding: 8px;
}

.chat-messages-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chat-empty {
  margin: 0;
  font-size: 13px;
  opacity: 0.6;
  color: var(--agu-color-base, #263f2a);
}

.chat-message {
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
  color: var(--agu-color-base, #263f2a);
}

.chat-sender-badge {
  display: inline-block;
  padding: 0 6px;
  margin-right: 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.6;
  vertical-align: baseline;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-input {
  flex: 1;
  min-width: 0;
}

/* The library input reserves outer margins for label/error space — the
   chat drawer has neither, so drop both. */
.chat-input :deep(.input-wrapper) {
  margin-top: 0;
  margin-bottom: 0;
}

.chat-send-btn {
  width: 42px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.chat-message--other {
  cursor: pointer;
}
.chat-message--other:hover {
  background: rgba(38, 63, 42, 0.06);
}
.chat-input-locked {
  position: relative;
}
.chat-locked-field {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  opacity: 0.75;
}
.chat-locked-hit {
  position: absolute;
  inset: 0;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
