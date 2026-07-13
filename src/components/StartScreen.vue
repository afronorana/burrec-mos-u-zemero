<template>
  <div class="screen-overlay">
    <transition name="screen-fade" mode="out-in">
      <!-- Login / Name Screen on Startup -->
      <div v-if="store.currentScreen === 'login-screen'" key="login-screen" class="menu-center">
        <app-panel class="menu-card">
          <h2 class="panel-title">{{ t('login.title') }}</h2>
          <p class="panel-desc">{{ t('login.desc') }}</p>
          
          <div class="form-row">
            <app-input
              v-model="loginName"
              :label="t('online.yourName')"
              @keyup.enter="confirmLogin"
            />
          </div>

          <div class="menu-row">
            <app-button green class="menu-btn-full" :disabled="!loginName.trim()" @click="confirmLogin">
              {{ t('login.proceed') }}
            </app-button>
          </div>
        </app-panel>
      </div>

      <div v-else-if="store.currentScreen === 'main-menu'" key="main-menu" class="menu-center">
        <app-panel class="menu-card">
          <h1 class="game-title">{{ t('title') }}</h1>
          <p class="game-sub">{{ t('subTitle') }}</p>
          <app-button green class="menu-btn-full" @click="switchScreen('add-players')">
            {{ t('localGame') }}
          </app-button>
          <app-button blue class="menu-btn-full menu-btn-stacked" @click="switchScreen('online-menu')">
            {{ t('playOnline') }}
          </app-button>
        </app-panel>
      </div>

      <online-menu v-else-if="store.currentScreen === 'online-menu'" key="online-menu" />

      <lobby-screen v-else-if="store.currentScreen === 'lobby'" key="lobby" />

      <!-- Local Setup Screen (left-docked, 3D bases clickable) -->
      <div v-else-if="store.currentScreen === 'add-players'" key="add-players" class="menu-side-left">
        <app-panel class="menu-card">
          <h2 class="panel-title">{{ t('players') }}</h2>
          <p class="panel-desc" style="font-size: 0.8rem; margin-bottom: 12px; line-height: 1.4;">
            {{ t('local.setupPrompt') }}
          </p>

          <div class="player-slots">
            <div v-for="(_, i) in 4" :key="i" class="player-slot" :class="{ 'player-slot--inactive': !store.localSetupActive[i] }">
              <span class="player-dot" :style="{ background: playerColors[i] }"></span>
              <div class="player-slot-field" v-if="store.localSetupActive[i]">
                <app-input
                  v-model="store.localSetupNames[i]"
                  :label="store.localSetupTypes[i] === 'ai' ? `Robot ${i + 1} (AI)` : `Lojtari ${i + 1}`"
                />
              </div>
              <span v-else class="player-slot-empty-label" style="opacity: 0.55; font-size: 0.85rem;">{{ t('local.emptyBase') }}</span>
            </div>
          </div>

          <app-panel :title="t('graphics')" foldable default-collapsed class="settings-panel-fold" style="margin-top: 14px;">
            <div class="form-row">
              <label class="select-label">{{ t('language') }}</label>
              <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
            </div>
            <div class="form-row">
              <label class="select-label">{{ t('environment') }}</label>
              <app-tabs v-model="store.settings.environment" :options="[{ value: 'day', label: t('env.day') }, { value: 'night', label: t('env.night') }, { value: 'dusk', label: t('env.dusk') }, { value: 'dawn', label: t('env.dawn') }]" @update:modelValue="saveEnvironment" />
            </div>
            <outline-appearance-select :label="t('outlineStyle')" select-id="outline-style-menu" />
            <render-quality-slider :label="t('renderQuality')" slider-id="render-quality-menu" />
          </app-panel>

          <div class="menu-row" style="margin-top: 16px;">
            <app-button slate-blue @click="switchScreen('main-menu')">{{ t('back') }}</app-button>
            <app-button green :disabled="activePlayersCount < 2" @click="startGame">{{ t('play') }}</app-button>
          </div>
        </app-panel>
      </div>
    </transition>

    <game-interface v-if="store.currentScreen === 'game-screen'" />

    <!-- Global Settings Button (game screen has its own settings drawer) -->
    <app-button
      v-if="store.currentScreen !== 'game-screen'"
      slate-blue
      class="hud-icon-btn global-settings-trigger"
      :title="t('graphics')"
      @click="openGlobalSettings"
    >
      <settings-icon :size="20" />
    </app-button>

    <!-- Global Settings Modal -->
    <div v-if="showGlobalSettings" class="global-settings-modal-backdrop" @click.self="showGlobalSettings = false">
      <app-panel class="global-settings-card">
        <h3 class="panel-title" style="margin-bottom: 16px;">{{ t('graphics') }}</h3>
        
        <div class="form-row">
          <label class="select-label">{{ t('online.yourName') }}</label>
          <app-input v-model="globalName" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('language') }}</label>
          <app-tabs
            v-model="store.settings.locale"
            :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]"
            @update:modelValue="saveLocale"
          />
        </div>

        <div class="menu-row" style="margin-top: 20px;">
          <app-button slate-blue @click="showGlobalSettings = false">{{ t('back') }}</app-button>
          <app-button green :disabled="!globalName.trim()" @click="confirmGlobalSettings">{{ t('play') }}</app-button>
        </div>
      </app-panel>
    </div>
  </div>
</template>

<script>
import GameInterface from './GameInterface.vue';
import OnlineMenu from './OnlineMenu.vue';
import LobbyScreen from './LobbyScreen.vue';
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';
import { Settings } from '@lucide/vue';

export default {
  components: { GameInterface, OnlineMenu, LobbyScreen, OutlineAppearanceSelect, RenderQualitySlider, SettingsIcon: Settings },
  data() {
    return {
      store: ApplicationStore,
      loginName: ApplicationStore.online.displayName || '',
      playerColors: PLAYER_COLORS,
      showGlobalSettings: false,
      globalName: '',
    };
  },
  computed: {
    activePlayersCount() {
      return this.store.localSetupActive.filter(Boolean).length;
    },
  },
  methods: {
    t,
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    saveEnvironment(val) {
      window.localStorage.setItem('burrec.settings.environment', val);
    },
    switchScreen(screen) {
      this.store.currentScreen = screen;
    },
    confirmLogin() {
      const name = this.loginName.trim();
      if (!name) return;
      this.store.online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
      this.store.currentScreen = 'main-menu';
    },
    startGame() {
      EventBus.fire(EventKeys.game.start);
    },
    openGlobalSettings() {
      this.globalName = this.store.online.displayName || '';
      this.showGlobalSettings = true;
    },
    confirmGlobalSettings() {
      const name = this.globalName.trim();
      if (!name) return;
      this.store.online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
      
      if (this.store.localSetupActive && this.store.localSetupActive[0] && this.store.localSetupTypes[0] === 'local') {
        this.store.localSetupNames[0] = name;
      }

      const mySeatObject = (this.store.online.seats || []).find(
        (s) => s && s.userId === this.store.online.selfUserId
      );
      if (this.store.currentScreen === 'lobby' && mySeatObject) {
        MatchController.requestClaimSeat(mySeatObject.seat);
      }
      
      this.showGlobalSettings = false;
    },
  },
};
</script>

<style scoped>
.menu-btn-stacked {
  margin-top: 12px;
}
.settings-panel-fold {
  margin-top: 20px;
  margin-bottom: 12px;
}
</style>
