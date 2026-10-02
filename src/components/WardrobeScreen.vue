<template>
  <div class="wardrobe">
    <app-panel class="wardrobe-options">
      <h2 class="panel-title">{{ t('cosmetics.title') }}</h2>

      <div class="wardrobe-scroll">
        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.prop') }}</label>
          <div class="wardrobe-chips">
            <button
              v-for="option in propOptions"
              :key="option.id"
              type="button"
              class="wardrobe-chip"
              :class="{ 'wardrobe-chip--active': draft.prop === option.id }"
              @click="draft.prop = option.id"
            >
              {{ t(option.labelKey) }}
            </button>
          </div>
        </div>

        <div v-if="draft.prop === 'flag'" class="form-row">
          <label class="select-label">{{ t('cosmetics.flag') }} — {{ selectedFlagName }}</label>
          <input
            v-model="flagQuery"
            type="search"
            class="wardrobe-flag-search"
            :placeholder="t('cosmetics.searchFlags')"
          />
          <div ref="flagList" class="wardrobe-flags">
            <button
              v-for="flag in filteredFlags"
              :key="flag.code"
              type="button"
              class="wardrobe-flag"
              :class="{ 'wardrobe-flag--active': draft.flag === flag.code }"
              :data-code="flag.code"
              @click="draft.flag = flag.code"
            >
              <img :src="flagUrl(flag.code)" alt="" loading="lazy" width="28" height="21" />
              <span>{{ flag.name }}</span>
            </button>
            <p v-if="!filteredFlags.length" class="wardrobe-empty">{{ t('cosmetics.noFlags') }}</p>
          </div>
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.finisher') }}</label>
          <div class="wardrobe-chips">
            <button
              v-for="option in finisherOptions"
              :key="option.id"
              type="button"
              class="wardrobe-chip"
              :class="{ 'wardrobe-chip--active': draft.finisher === option.id }"
              @click="pickFinisher(option.id)"
            >
              {{ t(option.labelKey) }}
            </button>
          </div>
        </div>
      </div>

      <div class="menu-row wardrobe-actions">
        <app-button red @click="close">{{ t('back') }}</app-button>
        <app-button @click="save">{{ t('save') }}</app-button>
      </div>
    </app-panel>

    <!-- Transparent window: App.vue renders the preview stage into this
         rect (store.wardrobe.rect), the dark backdrop included. -->
    <div
      ref="stage"
      class="wardrobe-stage"
      @pointerdown="startDrag"
      @pointermove="drag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    >
      <button
        type="button"
        class="wardrobe-replay"
        :disabled="Boolean(store.wardrobe.play)"
        @pointerdown.stop
        @click="play"
      >
        <svg class="wardrobe-replay-icon" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0 L10 6 L0 12 Z" /></svg>
        {{ t(finisherLabelKey) }}
      </button>
      <span class="wardrobe-hint">{{ t('cosmetics.dragHint') }}</span>
    </div>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import { PROP_OPTIONS, FINISHER_OPTIONS, flagOptions, flagName, flagUrl } from '../utils/cosmetics';
import { sanitizeCosmetics } from '../../shared/protocol';
import { t } from '../utils/i18n';

// Menu-only Cosmetics editor. Edits a draft (store.wardrobe.draft) that the
// preview pawn wears live; Save commits it to settings + localStorage, Back
// discards it. Cosmetics travel with the next match join and are locked
// for the rest of that match.
export default {
  data() {
    return {
      store: ApplicationStore,
      draft: { ...ApplicationStore.settings.cosmetics },
      propOptions: PROP_OPTIONS,
      finisherOptions: FINISHER_OPTIONS,
      flagQuery: '',
      dragX: null,
      playNonce: 0,
    };
  },
  computed: {
    allFlags() {
      return flagOptions(this.store.settings.locale);
    },
    filteredFlags() {
      const query = normalize(this.flagQuery.trim());
      if (!query) {
        return this.allFlags;
      }
      return this.allFlags.filter((flag) => normalize(flag.name).includes(query) || flag.code === query);
    },
    selectedFlagName() {
      return flagName(this.draft.flag, this.store.settings.locale);
    },
    finisherLabelKey() {
      return `cosmetics.finisher_${this.draft.finisher}`;
    },
  },
  watch: {
    'draft.prop'(prop) {
      if (prop === 'flag') {
        this.$nextTick(() => this.scrollActiveFlagIntoView());
      }
    },
  },
  created() {
    // Same object the template edits, so the preview follows every click.
    this.store.wardrobe.draft = this.draft;
    this.store.wardrobe.yaw = 0;
  },
  mounted() {
    // Track the window's rect every frame: it moves with transitions,
    // scrolling and resizes, none of which a ResizeObserver fully covers.
    const track = () => {
      this.rectFrame = requestAnimationFrame(track);
      this.syncRect();
    };
    track();
    if (this.draft.prop === 'flag') {
      this.scrollActiveFlagIntoView();
    }
  },
  beforeUnmount() {
    cancelAnimationFrame(this.rectFrame);
    const wardrobe = this.store.wardrobe;
    wardrobe.draft = null;
    wardrobe.rect = null;
    wardrobe.play = null;
    wardrobe.dragging = false;
  },
  methods: {
    t,
    flagUrl,
    syncRect() {
      const el = this.$refs.stage;
      if (!el) {
        return;
      }
      const box = el.getBoundingClientRect();
      const left = Math.round(box.left + el.clientLeft);
      const top = Math.round(box.top + el.clientTop);
      const width = el.clientWidth;
      const height = el.clientHeight;
      const rect = this.store.wardrobe.rect;
      if (!rect || rect.left !== left || rect.top !== top || rect.width !== width || rect.height !== height) {
        this.store.wardrobe.rect = { left, top, width, height };
      }
    },
    scrollActiveFlagIntoView() {
      const list = this.$refs.flagList;
      const active = list?.querySelector(`[data-code="${this.draft.flag}"]`);
      if (list && active) {
        list.scrollTop = active.offsetTop - list.offsetTop - (list.clientHeight / 2) + (active.clientHeight / 2);
      }
    },
    pickFinisher(id) {
      this.draft.finisher = id;
      this.play();
    },
    play() {
      this.playNonce += 1;
      this.store.wardrobe.play = { id: this.draft.finisher, nonce: this.playNonce };
    },
    startDrag(event) {
      this.dragX = event.clientX;
      this.store.wardrobe.dragging = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    drag(event) {
      if (this.dragX === null) {
        return;
      }
      this.store.wardrobe.yaw += (event.clientX - this.dragX) * 0.012;
      this.dragX = event.clientX;
    },
    endDrag() {
      this.dragX = null;
      this.store.wardrobe.dragging = false;
    },
    save() {
      const picked = sanitizeCosmetics(this.draft);
      Object.assign(this.store.settings.cosmetics, picked);
      window.localStorage.setItem('burrec.settings.prop', picked.prop);
      window.localStorage.setItem('burrec.settings.finisher', picked.finisher);
      window.localStorage.setItem('burrec.settings.flag', picked.flag);
      this.close();
    },
    close() {
      this.store.currentScreen = 'main-menu';
    },
  },
};

// Case- and accent-insensitive search ("shqiperi" finds "Shqipëri").
function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
</script>

<style scoped>
.wardrobe {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(300px, 400px) minmax(0, 1fr);
  gap: 16px;
  padding: 16px;
  pointer-events: none;
}

.wardrobe-options {
  display: flex;
  flex-direction: column;
  min-height: 0;
  pointer-events: all;
}

.wardrobe-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px;
}

.wardrobe-actions {
  margin-top: 12px;
}

.wardrobe-chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.wardrobe-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 4px 10px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
  cursor: pointer;
  text-align: left;
}

.wardrobe-chip--active {
  background: #fdc25b;
  box-shadow: 0 0 0 2px #ff7700 inset;
}

.wardrobe-replay-icon {
  width: 0.7em;
  height: 0.8em;
  margin-right: 4px;
  vertical-align: -0.05em;
  fill: currentColor;
}

.wardrobe-flag-search {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 6px;
  padding: 8px 10px;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  font: inherit;
  font-size: 0.85rem;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
}

.wardrobe-flags {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  max-height: 228px;
  overflow-y: auto;
  padding: 2px;
  border: 2px solid rgba(38, 63, 42, 0.2);
  border-radius: 8px;
}

.wardrobe-flag {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 5px 6px;
  background: none;
  border: 2px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--agu-color-base, #263f2a);
  cursor: pointer;
  text-align: left;
}

.wardrobe-flag span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wardrobe-flag img {
  flex: none;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
}

.wardrobe-flag--active {
  background: #fdc25b;
  border-color: #ff7700;
}

.wardrobe-empty {
  grid-column: 1 / -1;
  margin: 8px;
  font-size: 0.8rem;
  opacity: 0.7;
}

.wardrobe-stage {
  position: relative;
  min-height: 0;
  border: 4px solid var(--agu-color-base, #263f2a);
  border-radius: 6px;
  pointer-events: all;
  touch-action: none;
  cursor: grab;
}

.wardrobe-stage:active {
  cursor: grabbing;
}

.wardrobe-replay {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
}

.wardrobe-replay:disabled {
  opacity: 0.45;
  cursor: default;
}

.wardrobe-hint {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
}

/* Phones / portrait: options on top, preview below. */
@media (max-width: 760px), (orientation: portrait) {
  .wardrobe {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(220px, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .wardrobe-options {
    max-height: 56vh;
  }

  .wardrobe-flags {
    max-height: 160px;
  }
}
</style>
