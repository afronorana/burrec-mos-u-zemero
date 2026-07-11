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
          :class="{ 'chat-message--own': message.senderId === selfId }"
        >
          <span class="chat-sender">{{ getSenderName(message) }}</span>
          <span class="chat-text">{{ message.message }}</span>
        </div>
      </div>
    </app-scrollable>

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
      <app-input
        v-model="draft"
        label=""
        :required="false"
        :placeholder="t('online.chatPlaceholder')"
        maxlength="200"
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
import { t } from '../utils/i18n';
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
        const scroller = this.$refs.scrollable;
        if (scroller && scroller.viewportEl) {
          scroller.viewportEl.scrollTop = scroller.viewportEl.scrollHeight;
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

.chat-messages-scroll {
  flex: 1;
  min-height: 120px;
  max-height: 200px;
  background: rgba(0, 0, 0, 0.35);
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
  align-items: center;
  gap: 8px;
}

.chat-input {
  flex: 1;
  min-width: 0;
}

.chat-input :deep(.input-wrapper) {
  margin-top: 0;
}

.chat-send-btn {
  width: 42px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
