<template>
  <div class="player-actions-backdrop" @click.self="close">
    <app-panel class="player-actions-card">
      <h3 class="panel-title">{{ target.name }}</h3>

      <!-- Menu: Block toggle + Report -->
      <template v-if="view === 'menu'">
        <p v-if="target.messageText" class="player-actions-quote">“{{ target.messageText }}”</p>
        <app-button class="player-actions-btn" :loading="busy" :disabled="busy" @click="toggleBlock">
          {{ isBlocked ? t('moderation.unblock') : t('moderation.block') }}
        </app-button>
        <p class="player-actions-note">{{ isBlocked ? t('moderation.unblockHint') : t('moderation.blockHint') }}</p>
        <app-button red class="player-actions-btn" :disabled="busy" @click="view = 'report'">
          {{ target.messageId ? t('moderation.reportMessage') : t('moderation.reportName') }}
        </app-button>
      </template>

      <!-- Report: reason + optional note -->
      <template v-else-if="view === 'report'">
        <p class="player-actions-note">{{ t('moderation.reportDesc') }}</p>
        <div class="player-actions-reasons">
          <button
            v-for="id in reasons"
            :key="id"
            type="button"
            class="player-actions-reason"
            :class="{ 'player-actions-reason--active': reason === id }"
            @click="reason = id"
          >
            {{ t(`moderation.reason_${id}`) }}
          </button>
        </div>
        <div class="form-row">
          <app-input v-model="note" :label="t('moderation.noteLabel')" :required="reason === 'other'" :max-length="500" />
        </div>
        <app-button red class="player-actions-btn" :loading="busy" :disabled="busy || !canSubmit" @click="submitReport">
          {{ t('moderation.sendReport') }}
        </app-button>
        <button type="button" class="player-actions-link" @click="view = 'menu'">{{ t('back') }}</button>
      </template>

      <!-- Sent -->
      <template v-else>
        <p class="player-actions-success">{{ t('moderation.reportSent') }}</p>
        <app-button class="player-actions-btn" @click="close">{{ t('auth.done') }}</app-button>
      </template>

      <p v-if="error" class="player-actions-error">{{ t(`errors.${error}`) }}</p>
      <button type="button" class="player-actions-close" :aria-label="t('back')" @click="close">×</button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';
import { REPORT_REASONS } from '../../shared/protocol';
import { t } from '../utils/i18n';

// Block / Report sheet for another player, opened from a chat message or a
// seat chip via store.online.playerActions (CONTEXT.md: Block, Report).
export default {
  data() {
    return {
      store: ApplicationStore,
      view: 'menu',
      reasons: REPORT_REASONS,
      reason: '',
      note: '',
      busy: false,
      error: null,
    };
  },
  computed: {
    target() {
      return this.store.online.playerActions;
    },
    isBlocked() {
      return this.store.online.blockedIds.includes(this.target.userId);
    },
    canSubmit() {
      return !!this.reason && (this.reason !== 'other' || !!this.note.trim());
    },
  },
  methods: {
    t,
    close() {
      this.store.online.playerActions = null;
    },
    async run(action) {
      this.busy = true;
      this.error = null;
      try {
        await action();
      } catch (error) {
        this.error = error && error.message ? error.message : 'generic';
      } finally {
        this.busy = false;
      }
    },
    toggleBlock() {
      this.run(() => NakamaClient.setBlocked(this.target.userId, !this.isBlocked));
    },
    submitReport() {
      if (!this.canSubmit) return;
      const target = this.target;
      this.run(async () => {
        await NakamaClient.reportPlayer({
          userId: target.userId,
          kind: target.messageId ? 'chat' : 'name',
          reason: this.reason,
          note: this.note.trim(),
          matchId: this.store.online.matchId || '',
          messageId: target.messageId || '',
          messageText: target.messageText || '',
        });
        this.view = 'sent';
      });
    },
  },
};
</script>

<style scoped>
.player-actions-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 70;
  padding: 16px;
  pointer-events: all;
}
.player-actions-card {
  position: relative;
  width: 100%;
  max-width: 340px;
  text-align: center;
}
.player-actions-card .panel-title {
  margin-bottom: 12px;
  word-break: break-word;
}
.player-actions-quote {
  margin: 0 0 12px;
  padding: 8px 10px;
  font-size: 0.85rem;
  font-style: italic;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
  word-break: break-word;
}
.player-actions-btn {
  width: 100%;
  margin-top: 8px;
}
.player-actions-note {
  font-size: 0.75rem;
  line-height: 1.4;
  opacity: 0.75;
  margin: 6px 0 10px;
}
.player-actions-reasons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 12px;
}
.player-actions-reason {
  padding: 8px 6px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid rgba(38, 63, 42, 0.6);
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
}
.player-actions-reason--active {
  border-color: var(--agu-color-red, #e9576f);
  background: rgba(233, 87, 111, 0.15);
}
.player-actions-link {
  background: none;
  border: none;
  padding: 0;
  margin-top: 12px;
  font: inherit;
  font-size: 0.8rem;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
}
.player-actions-success {
  margin: 8px 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #2a9d8f;
}
.player-actions-error {
  margin-top: 12px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
.player-actions-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.6;
}
</style>
