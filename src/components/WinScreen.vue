<template>
  <div class="win-overlay" v-if="store.winner">
    <app-panel class="menu-card win-card">
      <p class="win-icon">
        <trophy-icon :size="48" class="lucide-trophy" />
      </p>
      <h2 class="panel-title" v-html="t('win.wins', { name: `<span style='color: ${store.winner.color}'>${store.winner.name}</span>` })"></h2>
      <p class="panel-desc">{{ store.winner.self ? t('win.congrats') : t('win.betterLuck') }}</p>
      <app-button class="menu-btn-full" @click="backToMenu">
        {{ t('win.backToMenu') }}
      </app-button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';
import { Trophy } from '@lucide/vue';

export default {
  components: { TrophyIcon: Trophy },
  data() {
    return {
      store: ApplicationStore,
    };
  },
  methods: {
    t,
    async backToMenu() {
      if (this.store.online.enabled) {
        await MatchController.leaveMatch(); // returns to the online menu
        return;
      }
      this.store.winner = null;
      this.store.currentScreen = 'main-menu';
    },
  },
};
</script>

<style scoped>
.win-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 40;
}

.win-card {
  text-align: center;
}

.win-icon {
  margin: 0 0 10px;
}

.lucide-trophy {
  color: var(--agu-color-orange-dark, #ee9448);
  display: inline-block;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
</style>
