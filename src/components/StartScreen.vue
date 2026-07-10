<template>
  <div class="screen-overlay">
    <transition name="screen-fade" mode="out-in">
      <div v-if="store.currentScreen === 'main-menu'" key="main-menu" class="menu-center">
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

      <div v-else-if="store.currentScreen === 'add-players'" key="add-players" class="menu-center">
        <app-panel class="menu-card">
          <h2 class="panel-title">{{ t('players') }}</h2>
          <p class="panel-desc">{{ t('playersDesc') }}</p>

          <div class="player-slots">
            <div v-for="(_, i) in playerNames" :key="i" class="player-slot">
              <span class="player-dot" :style="{ background: playerColors[i] }"></span>
              <div class="player-slot-field">
                <app-input
                  v-model="playerNames[i]"
                  :label="t('playerPlaceholder', { num: i + 1 })"
                />
              </div>
            </div>
          </div>

          <app-panel :title="t('graphics')" foldable default-collapsed class="settings-panel-fold">
            <div class="form-row">
              <label class="select-label">{{ t('language') }}</label>
              <app-tabs v-model="store.settings.locale" :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]" @update:modelValue="saveLocale" />
            </div>
            <outline-appearance-select :label="t('outlineStyle')" select-id="outline-style-menu" />
            <render-quality-slider :label="t('renderQuality')" slider-id="render-quality-menu" />
          </app-panel>

          <div class="menu-row">
            <app-button slate-blue @click="switchScreen('main-menu')">{{ t('back') }}</app-button>
            <app-button green @click="startGame">{{ t('play') }}</app-button>
          </div>
        </app-panel>
      </div>
    </transition>

    <game-interface v-if="store.currentScreen === 'game-screen'" />
  </div>
</template>

<script>
import GameInterface from './GameInterface.vue';
import OnlineMenu from './OnlineMenu.vue';
import LobbyScreen from './LobbyScreen.vue';
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';
import { PLAYER_COLORS } from '../utils/playerColors';
import { t } from '../utils/i18n';

export default {
  components: { GameInterface, OnlineMenu, LobbyScreen, OutlineAppearanceSelect, RenderQualitySlider },
  data() {
    return {
      store: ApplicationStore,
      playerNames: ['', '', '', ''],
      playerColors: PLAYER_COLORS,
    };
  },
  methods: {
    t,
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    switchScreen(screen) {
      this.store.currentScreen = screen;
    },
    startGame() {
      EventBus.fire(EventKeys.game.start, this.playerNames.map((n) => n.trim()));
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
