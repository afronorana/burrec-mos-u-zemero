<template>
  <div class="menu-center">
    <app-panel class="menu-card">
      <h2 class="panel-title">{{ t('online.playOnline') }}</h2>

      <div v-if="store.online.matchmaking" class="online-searching">
        <p class="panel-desc">{{ t('online.searching') }}</p>
        <app-button red class="menu-btn-full" :disabled="busy" @click="cancelSearch">
          {{ t('online.cancel') }}
        </app-button>
      </div>

      <template v-else>
        <app-input
          v-model="displayName"
          :label="t('online.yourName')"
          :max-length="24"
        />

        <div class="online-actions">
          <app-button blue class="menu-btn-full" :disabled="!canSubmit" @click="quickMatch">
            {{ t('online.quickMatch') }}
          </app-button>
          <app-button green class="menu-btn-full" :disabled="!canSubmit" @click="createLobby">
            {{ t('online.createLobby') }}
          </app-button>

          <div class="online-join-block">
            <label class="select-label">{{ t('online.lobbyCode') }}</label>
            <div class="online-join-row">
              <app-game-code
                v-model="joinCode"
                :length="4"
                letters-only
                :label="t('online.lobbyCode')"
                class="online-code-input"
                @keyup.enter="joinLobby"
              />
              <app-button blue class="online-join-btn" :disabled="!canSubmit || joinCode.length !== 4" @click="joinLobby">
                {{ t('online.join') }}
              </app-button>
            </div>
          </div>
        </div>

        <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>

        <div class="menu-row">
          <app-button slate-blue :disabled="busy" @click="goBack">{{ t('back') }}</app-button>
        </div>
      </template>
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
      displayName: window.localStorage.getItem('burrec.online.displayName') || '',
      joinCode: '',
      busy: false,
    };
  },
  computed: {
    canSubmit() {
      return !this.busy && this.displayName.trim().length > 0;
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
  },
  methods: {
    t,
    async run(action) {
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await action();
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'connect_failed';
      } finally {
        this.busy = false;
      }
    },
    quickMatch() {
      this.run(() => MatchController.quickMatch(this.displayName));
    },
    createLobby() {
      this.run(() => MatchController.createPrivate(this.displayName));
    },
    joinLobby() {
      this.run(() => MatchController.joinByCode(this.joinCode, this.displayName));
    },
    async cancelSearch() {
      this.busy = true;
      try {
        await MatchController.cancelQuickMatch();
      } finally {
        this.busy = false;
      }
    },
    goBack() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'main-menu';
    },
  },
};
</script>

<style scoped>
.online-actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
}

.online-join-block .select-label {
  margin-bottom: 8px;
}

.online-join-row {
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.online-code-input {
  --agu-code-cell-size: 44px;
  --agu-code-gap: 6px;
}

.online-join-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}

.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}

.online-searching {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
