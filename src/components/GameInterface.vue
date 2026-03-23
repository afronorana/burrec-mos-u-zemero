<template>
  <div class="game-interface-wrapper">
    <section class="hud-panel nes-container is-dark with-title is-rounded">
      <p class="title">Game Status</p>
      <p>Round {{ store.currentRound }}</p>
      <p>
        Turn:
        <span v-if="currentPlayer" :style="{ color: currentPlayer.color }">
          {{ currentPlayer.name }}
        </span>
        <span v-else>Waiting</span>
      </p>
      <p>Last roll: {{ store.lastRolledDice }}</p>
      <p class="hud-status">{{ statusMessage }}</p>

      <outline-appearance-select
        label="Outline Style"
        select-id="outline-style-hud"
      ></outline-appearance-select>

      <render-quality-slider
        label="Render Quality"
        slider-id="render-quality-hud"
      ></render-quality-slider>

      <div class="hud-buttons">
        <button
          class="nes-btn is-primary is-full-width"
          :disabled="!canRoll"
          @click="rollDice"
        >
          Roll Dice
        </button>

        <button
          v-for="pawn in movablePawns"
          :key="pawn.id"
          class="nes-btn is-success is-full-width"
          @click="movePawn(pawn)"
        >
          Move Pawn {{ pawn.startingPlace }}
        </button>

        <button class="nes-btn is-warning is-full-width" @click="goToSetup">
          New Game
        </button>
      </div>

      <p class="hud-hint">Press Space to roll the dice.</p>
    </section>

    <div class="player-grid">
      <div
        v-for="player in store.players"
        :key="player.turn"
        class="player-name nes-container is-dark is-rounded"
        :class="{ 'is-active-player': player.isPlaying }"
        :style="{ color: player.color }"
      >
        <p>{{ player.name }}</p>
        <p class="player-meta">{{ formatPlayerState(player) }}</p>
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
  components: {
    OutlineAppearanceSelect,
    RenderQualitySlider,
  },
  data() {
    return {
      store: ApplicationStore,
    };
  },
  computed: {
    currentPlayer() {
      return this.store.players[this.store.currentPlayerId] || null;
    },
    movablePawns() {
      if (!this.currentPlayer || !this.store.gamePlayStatus.isMoving) {
        return [];
      }

      return this.currentPlayer.pawns.filter((pawn) => pawn.isActive);
    },
    canRoll() {
      return this.store.gamePlayStatus.isRolling && this.isHumanTurn;
    },
    isHumanTurn() {
      return Boolean(this.currentPlayer && !this.currentPlayer.isComputer);
    },
    statusMessage() {
      if (!this.currentPlayer) {
        return 'Preparing the board.';
      }

      if (!this.isHumanTurn) {
        return `${this.currentPlayer.name} is taking a turn.`;
      }

      if (this.store.gamePlayStatus.isMoving) {
        return 'Select a highlighted pawn or click it on the board.';
      }

      if (this.store.gamePlayStatus.isRolling) {
        return 'Roll the dice from the button, the board, or Space.';
      }

      return 'Waiting for the next turn.';
    },
  },
  methods: {
    rollDice() {
      EventBus.fire(EventKeys.rollDice);
    },
    movePawn(pawn) {
      if (!pawn.isActive) {
        return;
      }

      pawn.move();
    },
    goToSetup() {
      this.store.currentScreen = 'add-players';
    },
    formatPlayerState(player) {
      return player.pawns.map((pawn) => {
        if (pawn.position === 0) {
          return 'Home';
        }

        if (pawn.position > 40) {
          return `Goal ${pawn.position - 40}`;
        }

        return `Tile ${pawn.globalPosition + 1}`;
      }).join(' | ');
    },
  },
};
</script>
