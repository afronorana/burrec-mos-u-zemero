<template>
  <div class="menu-center">
    <app-panel class="menu-card">
      <h2 class="panel-title">{{ t('online.createRoomTitle') }}</h2>

      <div class="form-row">
        <label class="select-label">{{ t('online.roomType') }}</label>
        <app-tabs
          v-model="visibility"
          :options="[
            { value: 'public', label: t('online.public') },
            { value: 'private', label: t('online.private') },
          ]"
        />
        <p class="create-hint">
          {{ visibility === 'public' ? t('online.publicHint') : t('online.privateHint') }}
        </p>
      </div>

      <div class="form-row">
        <label class="select-label">{{ t('environment') }}</label>
        <app-tabs
          v-model="store.settings.environment"
          :options="[
            { value: 'day', label: t('env.day') },
            { value: 'night', label: t('env.night') },
            { value: 'dusk', label: t('env.dusk') },
            { value: 'dawn', label: t('env.dawn') },
          ]"
          @update:modelValue="saveEnvironment"
        />
      </div>

      <app-button class="menu-btn-full create-btn" :disabled="busy || !hasName" @click="create">
        {{ t('online.createRoom') }}
      </app-button>

      <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>

      <div class="menu-row">
        <app-button red :disabled="busy" @click="back">{{ t('back') }}</app-button>
      </div>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';

export default {
  data() {
    return {
      store: ApplicationStore,
      visibility: 'public',
      busy: false,
    };
  },
  computed: {
    hasName() {
      return (this.store.online.displayName || '').trim().length > 0;
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
  },
  methods: {
    t,
    saveEnvironment(val) {
      window.localStorage.setItem('burrec.settings.environment', val);
    },
    async create() {
      const name = this.store.online.displayName;
      this.busy = true;
      this.store.online.lastError = null;
      try {
        if (this.visibility === 'private') {
          await MatchController.createPrivate(name);
        } else {
          await MatchController.createPublic(name);
        }
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'connect_failed';
      } finally {
        this.busy = false;
      }
    },
    back() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'home';
    },
  },
};
</script>

<style scoped>
.create-hint {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 1.4;
  opacity: 0.7;
}
.create-btn {
  margin-top: 20px;
  font-size: 1.05rem;
  padding: 14px 24px;
}
.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
</style>
