<template>
  <div class="screen-overlay">
    <div v-if="store.currentScreen === 'main-menu'" class="menu-shell">
      <section class="menu-panel nes-container is-dark with-title is-rounded">
        <p class="title">Main Menu</p>
        <p>Welcome to Burrec mos u zemero.</p>
        <p>Start a local game for up to four players. Empty slots become computer players.</p>

        <button @click="switchScreen('add-players')" class="nes-btn is-success is-full-width">
          Start New Game
        </button>
      </section>
    </div>

    <div v-else-if="store.currentScreen === 'add-players'" class="menu-shell">
      <section class="menu-panel nes-container is-dark with-title is-rounded">
        <p class="title">Add Players</p>
        <p>Enter player names. Leave any slot blank to use a computer player.</p>

        <div v-for="(playerName, index) in playerNames" :key="index" class="form-row nes-field">
          <input
            v-model="playerNames[index]"
            type="text"
            class="nes-input is-dark"
            :placeholder="`Player ${index + 1}`"
          >
        </div>

        <outline-appearance-select
          label="Outline Style"
          select-id="outline-style-menu"
        ></outline-appearance-select>

        <render-quality-slider
          label="Render Quality"
          slider-id="render-quality-menu"
        ></render-quality-slider>

        <div class="menu-actions">
          <button @click="startGame" class="nes-btn is-success is-full-width">Ready</button>
          <button @click="switchScreen('main-menu')" class="nes-btn is-warning is-full-width">Back</button>
        </div>
      </section>
    </div>

    <game-interface v-else-if="store.currentScreen === 'game-screen'"></game-interface>
  </div>
</template>
<script>
import GameInterface from './GameInterface.vue';
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';

export default {
  components: {
    GameInterface,
    OutlineAppearanceSelect,
    RenderQualitySlider,
  },
  data() {
    return {
      store: ApplicationStore,
      playerNames: ['', '', '', ''],
    };
  },
  methods: {
    switchScreen(screen) {
      this.store.currentScreen = screen;
    },
    startGame() {
      const normalizedNames = this.playerNames.map((name) => name.trim());
      EventBus.fire(EventKeys.game.start, normalizedNames);
    },
  },
};
</script>
