<template>
  <div class="menu-center">
    <app-panel class="menu-card">
      <h2 class="panel-title">{{ t('online.joinRoomTitle') }}</h2>

      <div class="form-row">
        <label class="select-label">{{ t('online.lobbyCode') }}</label>
        <app-game-code
          v-model="joinCode"
          :length="4"
          letters-only
          :label="t('online.lobbyCode')"
          class="join-code-input"
          @keyup.enter="join"
        />
      </div>

      <app-button
        class="menu-btn-full join-btn"
        :disabled="busy || joinCode.length !== 4 || !hasName"
        @click="join"
      >
        {{ t('online.join') }}
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
      joinCode: '',
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
    async join() {
      if (this.joinCode.length !== 4 || !this.hasName) return;
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await MatchController.joinByCode(this.joinCode, this.store.online.displayName);
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'not_found';
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
.join-code-input {
  --agu-code-cell-size: 48px;
  --agu-code-gap: 8px;
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
.join-btn {
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
