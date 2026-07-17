<template>
  <div class="menu-center home-center">
    <div class="home-stack">
      <!-- Quickplay -->
      <app-panel class="menu-card">
        <h2 class="panel-title">{{ t('online.quickPlayTitle') }}</h2>

        <app-button
          class="menu-btn-full home-play-btn"
          :disabled="busy || !hasName"
          @click="quickPlay"
        >
          {{ t('online.playNow') }}
        </app-button>

        <button type="button" class="home-info-link" @click="infoOpen = true">
          ⓘ {{ t('online.quickPlayInfoLink') }}
        </button>
      </app-panel>

      <!-- Play with friends -->
      <app-panel class="menu-card">
        <h2 class="panel-title">{{ t('online.playWithFriends') }}</h2>

        <app-button class="menu-btn-full" :disabled="busy || !hasName" @click="goCreate">
          {{ t('online.createRoom') }}
        </app-button>

        <div class="home-or">{{ t('online.or') }}</div>

        <app-button blue class="menu-btn-full" :disabled="busy || !hasName" @click="goJoin">
          {{ t('online.joinRoom') }}
        </app-button>
      </app-panel>

      <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>

      <div class="menu-row home-back-row">
        <app-button red :disabled="busy" @click="back">{{ t('back') }}</app-button>
      </div>
    </div>

    <app-modal
      v-model="infoOpen"
      :title="t('online.quickPlayInfoLink')"
      :confirm-text="t('online.close')"
    >
      <p class="home-info-body">{{ t('online.quickPlayInfoBody') }}</p>
    </app-modal>
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
      busy: false,
      infoOpen: false,
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
    async quickPlay() {
      const name = this.store.online.displayName;
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await MatchController.quickMatch(name);
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'connect_failed';
      } finally {
        this.busy = false;
      }
    },
    goCreate() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'create-room';
    },
    goJoin() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'join-room';
    },
    back() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'main-menu';
    },
  },
};
</script>

<style scoped>
.home-center {
  align-items: flex-start;
  overflow-y: auto;
}
.home-stack {
  width: min(460px, 92vw);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: all;
}
.home-play-btn {
  font-size: 1.15rem;
  padding: 16px 24px;
}
.home-info-link {
  display: block;
  width: 100%;
  margin-top: 12px;
  background: none;
  border: none;
  padding: 4px 0;
  font: inherit;
  font-size: 0.85rem;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.75;
  text-align: center;
}
.home-info-link:hover {
  opacity: 1;
}
.home-info-body {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}
.home-or {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
  margin: 10px 0;
}
.home-back-row {
  margin-top: 4px;
}
.online-error {
  margin: 0;
  font-size: 12px;
  text-align: center;
  color: var(--agu-color-red, #e9576f);
}
</style>
