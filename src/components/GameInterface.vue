<template>
  <div class="hud">
    <!-- Status card: top-left -->
    <div class="hud-status nes-container is-dark is-rounded">
      <div class="hud-player-row">
        <span class="hud-dot" :style="{ background: currentPlayer?.color || '#888' }"></span>
        <span class="hud-player-name">{{ currentPlayer?.name || 'Waiting…' }}</span>
        <span class="hud-round">R{{ store.currentRound }}</span>
      </div>
      <p v-if="statusMessage" class="hud-msg">{{ statusMessage }}</p>
      <p v-if="store.lastRolledDice !== 'Start'" class="hud-last-roll">
        Rolled: <strong>{{ store.lastRolledDice }}</strong>
      </p>
    </div>

    <!-- Settings: top-right -->
    <div class="hud-settings-area">
      <button
        class="nes-btn hud-icon-btn"
        :title="settingsOpen ? 'Close' : 'Settings'"
        @click="settingsOpen = !settingsOpen"
      >
        {{ settingsOpen ? '✕' : '⚙' }}
      </button>
      <transition name="settings-drop">
        <div v-if="settingsOpen" class="hud-settings-panel nes-container is-dark is-rounded">
          <outline-appearance-select label="Outline Style" select-id="outline-style-hud" />
          <render-quality-slider label="Render Quality" slider-id="render-quality-hud" />
          <button class="nes-btn is-warning hud-full-width" @click="goToSetup">New Game</button>
        </div>
      </transition>
    </div>

    <!-- Bottom: actions + player strip -->
    <div class="hud-bottom">
      <div class="hud-actions">
        <div v-if="movablePawns.length" class="hud-move-row">
          <button
            v-for="pawn in movablePawns"
            :key="pawn.id"
            class="nes-btn is-success"
            @click="movePawn(pawn)"
          >
            Pawn {{ pawn.startingPlace }}
          </button>
        </div>

        <button
          v-if="canRoll"
          class="nes-btn is-primary hud-roll-btn"
          @click="rollDice"
        >
          Roll Dice
        </button>
      </div>

      <div class="hud-player-strip">
        <div
          v-for="player in store.players"
          :key="player.turn"
          class="hud-chip nes-container is-dark is-rounded"
          :class="{ 'hud-chip--active': player.isPlaying }"
          :style="player.isPlaying ? { '--chip-color': player.color } : {}"
        >
          <span class="hud-dot hud-dot--sm" :style="{ background: player.color }"></span>
          <div class="hud-chip-text">
            <span class="hud-chip-name">{{ player.name }}</span>
            <span class="hud-chip-meta">{{ formatPlayerState(player) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import EventBus from '../utils/eventhandler';
import EventKeys from '../utils/EventKeys';

export default {
  components: { OutlineAppearanceSelect, RenderQualitySlider },
  data() {
    return {
      store: ApplicationStore,
      settingsOpen: false,
    };
  },
  computed: {
    currentPlayer() {
      return this.store.players[this.store.currentPlayerId] || null;
    },
    movablePawns() {
      if (!this.currentPlayer || !this.store.gamePlayStatus.isMoving) return [];
      return this.currentPlayer.pawns.filter((p) => p.isActive);
    },
    canRoll() {
      return this.store.gamePlayStatus.isRolling && this.isHumanTurn;
    },
    isHumanTurn() {
      return Boolean(this.currentPlayer && !this.currentPlayer.isComputer);
    },
    statusMessage() {
      if (!this.currentPlayer) return 'Setting up the board…';
      if (!this.isHumanTurn) return `${this.currentPlayer.name} is thinking…`;
      if (this.store.gamePlayStatus.isMoving) return 'Pick a pawn to move.';
      if (this.store.gamePlayStatus.isRolling) return 'Roll the dice!';
      return '';
    },
  },
  methods: {
    rollDice() {
      EventBus.fire(EventKeys.rollDice);
    },
    movePawn(pawn) {
      if (pawn.isActive) pawn.move();
    },
    goToSetup() {
      this.settingsOpen = false;
      this.store.currentScreen = 'add-players';
    },
    formatPlayerState(player) {
      return player.pawns.map((pawn) => {
        if (pawn.position === 0) return 'H';
        if (pawn.position > 40) return 'G';
        return String(pawn.globalPosition + 1);
      }).join('·');
    },
  },
};
</script>
