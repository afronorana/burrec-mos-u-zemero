<template>
  <!-- CONTEXT.md: Game mode. One button per mode, each with its own short
       rules box underneath, so the choice is made knowing what it means. -->
  <div class="mode-picker" role="radiogroup" :aria-label="t('modes.title')">
    <div v-for="mode in modes" :key="mode" class="mode-option">
      <button
        type="button"
        role="radio"
        class="mode-button"
        :class="{ 'mode-button--active': modelValue === mode }"
        :aria-checked="modelValue === mode"
        @click="pick(mode)"
      >
        <span class="mode-check">{{ modelValue === mode ? '✓' : '' }}</span>
        {{ t(`modes.${mode}`) }}
      </button>
      <p class="mode-info">{{ t(`modes.${mode}Info`) }}</p>
    </div>
  </div>
</template>

<script>
import { GAME_MODES } from '../../shared/protocol';
import { t } from '../utils/i18n';

export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return { modes: GAME_MODES };
  },
  methods: {
    t,
    pick(mode) {
      this.$emit('update:modelValue', mode);
    },
  },
};
</script>

<style scoped>
.mode-picker {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.mode-option {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.mode-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 44px;
  padding: 6px 8px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  box-shadow: inset 0 -3px 0 rgba(38, 63, 42, 0.15);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.mode-button--active {
  background: var(--agu-color-green, #71bd26);
  color: #ffffff;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
}

.mode-check {
  font-size: 0.8rem;
}

.mode-info {
  flex: 1;
  margin: 0;
  padding: 7px 8px;
  font-size: 0.72rem;
  line-height: 1.35;
  color: var(--agu-color-base, #263f2a);
  background: rgba(255, 255, 255, 0.55);
  border-radius: 6px;
}

/* Narrow screens: one mode per row, button beside its rules. */
@media (max-width: 420px) {
  .mode-picker {
    grid-template-columns: 1fr;
  }

  .mode-option {
    display: grid;
    grid-template-columns: 112px 1fr;
    align-items: stretch;
    gap: 8px;
  }
}
</style>
