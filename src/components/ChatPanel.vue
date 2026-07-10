<template>
  <div class="chat-panel">
    <div ref="messageList" class="chat-messages">
      <p v-if="!messages.length" class="chat-empty">{{ t('online.emptyChat') }}</p>
      <div
        v-for="message in messages"
        :key="message.id"
        class="chat-message"
        :class="{ 'chat-message--own': message.senderId === selfId }"
      >
        <span class="chat-sender">{{ getSenderName(message) }}</span>
        <span class="chat-text">{{ message.message }}</span>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="chat-presets">
      <app-button
        v-for="preset in presets"
        :key="preset"
        small
        slate-blue
        class="chat-preset-btn"
        @click="sendPreset(preset)"
      >
        {{ preset }}
      </app-button>
    </div>

    <form class="chat-input-row" @submit.prevent="submit" @keyup.enter="submit">
      <input
        v-model="draft"
        type="text"
        class="input chat-input"
        :placeholder="t('online.chatPlaceholder')"
        maxlength="200"
      >
      <app-button blue class="chat-send-btn" :disabled="!draft.trim()" @click="submit">
        {{ t('online.send') }}
      </app-button>
    </form>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import { t } from '../utils/i18n';

export default {
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
    };
  },
  computed: {
    presets() {
      return [
        t('online.presets.gg'),
        t('online.presets.oops'),
        t('online.presets.hurry'),
        t('online.presets.lucky'),
        t('online.presets.nice')
      ];
    }
  },
  watch: {
    'messages.length'() {
      this.$nextTick(() => {
        const list = this.$refs.messageList;
        if (list) {
          list.scrollTop = list.scrollHeight;
        }
      });
    },
  },
  methods: {
    t,
    submit() {
      const text = this.draft.trim();
      if (!text) {
        return;
      }
      this.$emit('send', text);
      this.draft = '';
    },
    sendPreset(preset) {
      this.$emit('send', preset);
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
      return message.username;
    },
  },
};
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.chat-messages {
  flex: 1;
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chat-empty {
  margin: 0;
  font-size: 13px;
  opacity: 0.6;
  color: #ffffff;
}

.chat-message {
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
  color: #ffffff;
}

.chat-message--own .chat-sender {
  color: var(--agu-color-green, #71bd26);
}

.chat-sender {
  color: var(--agu-color-orange, #fdc25b);
  margin-right: 6px;
}

.chat-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chat-preset-btn.button {
  padding: 4px 8px;
  font-size: 0.78rem;
  letter-spacing: 0;
  text-transform: none;
}

.chat-input-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.chat-input {
  flex: 1;
  min-width: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.chat-send-btn {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
