<template>
  <div class="menu-center home-center">
    <div class="home-stack">
      <!-- The Welcome bonus paid on this sign-in (CONTEXT.md), shown once. -->
      <app-panel v-if="store.online.store.welcome" class="menu-card home-welcome">
        <p class="home-welcome-text">{{ t('online.welcomeBonus', { n: store.online.store.welcome }) }}</p>
        <div class="menu-row">
          <app-button small blue @click="dismissWelcome">{{ t('close') }}</app-button>
          <app-button small @click="openWardrobe">{{ t('online.welcomeWardrobe') }}</app-button>
        </div>
      </app-panel>

      <!-- Quickplay: Play now opens the chooser (online Game modes, or a
           Table on this device). -->
      <app-panel class="menu-card">
        <h2 class="panel-title">{{ t('online.quickPlayTitle') }}</h2>

        <app-button
          class="menu-btn-full home-play-btn"
          :disabled="busy || !hasName"
          @click="goPlay"
        >
          {{ t('online.playNow') }}
        </app-button>
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
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import { t } from '../utils/i18n';
import NakamaClient from '../network/NakamaClient';

export default {
  data() {
    return {
      store: ApplicationStore,
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
  mounted() {
    // Opening Home counts today's Streak day (and loads the 🔥 button).
    if (this.hasName) {
      NakamaClient.refreshProgress(this.store.online.displayName);
    }
  },
  methods: {
    t,
    dismissWelcome() {
      this.store.online.store.welcome = 0;
    },
    openWardrobe() {
      this.store.online.store.welcome = 0;
      this.store.currentScreen = 'wardrobe';
    },
    goPlay() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'play-mode';
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
.home-welcome-text {
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
}

.home-center {
  align-items: flex-start;
  overflow-y: auto;
  /* Clear the top-right Settings/Profile buttons. */
  padding-top: calc(76px + env(safe-area-inset-top, 0px));
  padding-bottom: 24px;
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
