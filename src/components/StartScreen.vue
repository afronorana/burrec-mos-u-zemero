<template>
  <div class="screen-overlay">
    <transition name="screen-fade" mode="out-in">
      <div v-if="store.currentScreen === 'main-menu'" key="main-menu" class="menu-center">
        <div class="menu-card nes-container is-dark is-rounded">
          <h1 class="game-title">Burrec Mos<br>u Zemero</h1>
          <p class="game-sub">Local board game &middot; up to 4 players</p>
          <button class="nes-btn is-success menu-btn-full" @click="switchScreen('add-players')">
            Start Game
          </button>
        </div>
      </div>

      <div v-else-if="store.currentScreen === 'add-players'" key="add-players" class="menu-center">
        <div class="menu-card nes-container is-dark is-rounded">
          <h2 class="panel-title">Players</h2>
          <p class="panel-desc">Leave a slot blank to use a computer player.</p>

          <div class="player-slots">
            <div v-for="(_, i) in playerNames" :key="i" class="player-slot">
              <span class="player-dot" :style="{ background: playerColors[i] }"></span>
              <div class="player-slot-field">
                <input
                  v-model="playerNames[i]"
                  type="text"
                  class="nes-input is-dark"
                  :placeholder="`Player ${i + 1}`"
                >
              </div>
            </div>
          </div>

          <details class="settings-drawer">
            <summary class="settings-summary">Graphics</summary>
            <div class="settings-body">
              <outline-appearance-select label="Outline Style" select-id="outline-style-menu" />
              <render-quality-slider label="Render Quality" slider-id="render-quality-menu" />
            </div>
          </details>

          <div class="menu-row">
            <button class="nes-btn" @click="switchScreen('main-menu')">Back</button>
            <button class="nes-btn is-success" @click="startGame">Play</button>
          </div>
        </div>
      </div>
    </transition>

    <game-interface v-if="store.currentScreen === 'game-screen'" />
  </div>
</template>

<script>
import GameInterface from './GameInterface.vue';
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';

const PLAYER_COLORS = ['#CE0000', '#F7D708', '#009ECE', '#9CCF31'];

export default {
  components: { GameInterface, OutlineAppearanceSelect, RenderQualitySlider },
  data() {
    return {
      store: ApplicationStore,
      playerNames: ['', '', '', ''],
      playerColors: PLAYER_COLORS,
    };
  },
  methods: {
    switchScreen(screen) {
      this.store.currentScreen = screen;
    },
    startGame() {
      EventBus.fire(EventKeys.game.start, this.playerNames.map((n) => n.trim()));
    },
  },
};
</script>
