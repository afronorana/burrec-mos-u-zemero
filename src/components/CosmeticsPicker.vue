<template>
  <div class="cosmetics-picker">
    <div class="form-row">
      <label class="select-label">{{ t('cosmetics.prop') }}</label>
      <div class="cosmetics-chips">
        <button
          v-for="option in propOptions"
          :key="option.id"
          type="button"
          class="cosmetics-chip"
          :class="{ 'cosmetics-chip--active': store.settings.cosmetics.prop === option.id }"
          @click="setProp(option.id)"
        >
          <span class="cosmetics-chip-icon">{{ option.icon }}</span>
          <span>{{ t(option.labelKey) }}</span>
        </button>
      </div>
    </div>

    <div class="form-row">
      <label class="select-label">{{ t('cosmetics.finisher') }}</label>
      <div class="cosmetics-chips">
        <div
          v-for="option in finisherOptions"
          :key="option.id"
          class="cosmetics-chip cosmetics-chip--with-preview"
          :class="{ 'cosmetics-chip--active': store.settings.cosmetics.finisher === option.id }"
        >
          <button type="button" class="cosmetics-chip-main" @click="setFinisher(option.id)">
            <span class="cosmetics-chip-icon">{{ option.icon }}</span>
            <span>{{ t(option.labelKey) }}</span>
          </button>
          <button
            type="button"
            class="cosmetics-chip-preview"
            :title="t('cosmetics.preview')"
            :disabled="Boolean(store.finisherPreview)"
            @click="preview(option.id)"
          >▶</button>
        </div>
      </div>
    </div>

    <div v-if="showToggle" class="form-row">
      <label class="select-label">{{ t('cosmetics.finishers') }}</label>
      <app-tabs
        v-model="finishersSetting"
        :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]"
      />
    </div>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { PROP_OPTIONS, FINISHER_OPTIONS } from '../utils/cosmetics';
import { t } from '../utils/i18n';

// Prop + Finisher picker (settings modals and the lobby). Choices apply at
// once: saved per device and, inside a match, sent to the server so everyone
// sees them.
export default {
  props: {
    // The lobby's quick picker leaves the on/off switch to the settings modal.
    showToggle: { type: Boolean, default: true },
  },
  data() {
    return {
      store: ApplicationStore,
      propOptions: PROP_OPTIONS,
      finisherOptions: FINISHER_OPTIONS,
    };
  },
  computed: {
    finishersSetting: {
      get() {
        return this.store.settings.finishersEnabled ? 'on' : 'off';
      },
      set(val) {
        this.store.settings.finishersEnabled = val === 'on';
        window.localStorage.setItem('burrec.settings.finishers', val === 'on' ? '1' : '0');
      },
    },
  },
  methods: {
    t,
    setProp(id) {
      this.store.settings.cosmetics.prop = id;
      window.localStorage.setItem('burrec.settings.prop', id);
      MatchController.sendCosmetics();
    },
    setFinisher(id) {
      this.store.settings.cosmetics.finisher = id;
      window.localStorage.setItem('burrec.settings.finisher', id);
      MatchController.sendCosmetics();
    },
    preview(id) {
      if (!this.store.finisherPreview) {
        this.store.finisherPreview = id;
      }
    },
  },
};
</script>

<style scoped>
.cosmetics-chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.cosmetics-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 4px 8px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
  cursor: pointer;
  text-align: left;
}

.cosmetics-chip--active {
  background: #fdc25b;
  box-shadow: 0 0 0 2px #ff7700 inset;
}

.cosmetics-chip--with-preview {
  padding: 0;
  gap: 0;
  cursor: default;
}

.cosmetics-chip-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  min-height: 32px;
  padding: 4px 8px;
  background: none;
  border: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.cosmetics-chip-preview {
  align-self: stretch;
  width: 32px;
  flex: none;
  background: rgba(38, 63, 42, 0.08);
  border: 0;
  border-left: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 0 6px 6px 0;
  font-size: 0.7rem;
  color: inherit;
  cursor: pointer;
}

.cosmetics-chip-preview:disabled {
  opacity: 0.4;
  cursor: default;
}

.cosmetics-chip-icon {
  font-size: 1rem;
  line-height: 1;
}
</style>
