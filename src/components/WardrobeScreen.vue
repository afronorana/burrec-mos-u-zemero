<template>
  <div class="wardrobe" :class="{ 'wardrobe--in-game': inGame }">
    <app-panel class="wardrobe-options">
      <h2 class="panel-title">{{ t('cosmetics.title') }}</h2>

      <!-- Guests preview everything but wear nothing (CONTEXT.md: Guest). -->
      <div v-if="!isMember" class="wardrobe-guest-banner">
        <span>{{ t('cosmetics.guestBanner') }}</span>
        <app-button small @click="promptRegister(registerReason)">{{ t('cosmetics.registerNow') }}</app-button>
      </div>

      <!-- In a running match: one restyle per game, and the game goes on. -->
      <div v-if="inGame" class="wardrobe-restyle-note" :class="{ 'wardrobe-restyle-note--used': restyleUsed }">
        {{ restyleUsed ? t('cosmetics.restyleUsed') : t('cosmetics.restyleOnce') }}
      </div>
      <p v-if="inGame && store.online.restyleError && !restyleUsed" class="wardrobe-store-error">{{ t('cosmetics.restyleFailed') }}</p>
      <p v-if="inGame && isMyTurn" class="wardrobe-turn-note">{{ t('cosmetics.yourTurn') }}</p>

      <div class="wardrobe-scroll">
        <!-- Props are per pawn: style all four at once or pick one. -->
        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.pawns') }}</label>
          <div class="wardrobe-pawns">
            <button
              type="button"
              class="wardrobe-pawn-tab"
              :class="{ 'wardrobe-pawn-tab--active': selectedPawn === 'all' }"
              @click="selectPawn('all')"
            >
              {{ t('cosmetics.allPawns') }}
            </button>
            <button
              v-for="index in 4"
              :key="index"
              type="button"
              class="wardrobe-pawn-tab"
              :class="{ 'wardrobe-pawn-tab--active': selectedPawn === index - 1 }"
              @click="selectPawn(index - 1)"
            >
              <span class="wardrobe-pawn-dot"></span>{{ index }}
            </button>
          </div>
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.prop') }}</label>
          <div class="wardrobe-chips">
            <button
              v-for="option in propOptions"
              :key="option.id"
              type="button"
              class="wardrobe-chip"
              :class="{ 'wardrobe-chip--active': currentLook.prop === option.id }"
              @click="setLook('prop', option.id)"
            >
              <span class="wardrobe-chip-label">{{ t(option.labelKey) }}</span>
              <span class="wardrobe-tier" :class="`wardrobe-tier--${badge('prop', option.id).kind}`">{{ badge('prop', option.id).text }}</span>
            </button>
          </div>
        </div>

        <div v-if="currentLook.prop === 'flag'" class="form-row">
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
              :class="{ 'wardrobe-flag--active': currentLook.flag === flag.code }"
              :data-code="flag.code"
              @click="setLook('flag', flag.code)"
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
              <span class="wardrobe-chip-label">{{ t(option.labelKey) }}</span>
              <span class="wardrobe-tier" :class="`wardrobe-tier--${badge('finisher', option.id).kind}`">{{ badge('finisher', option.id).text }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- A picked item this Member doesn't own: Claim it (open special) or
           explain why it can't be worn. Guests get the banner above instead. -->
      <div v-if="isMember && lockedPick" class="wardrobe-store-note">
        <span>{{ lockedPick.message }}</span>
        <app-button v-if="lockedPick.claimable" small :loading="claiming" :disabled="claiming" @click="claim(lockedPick)">
          {{ t('store.claim') }}
        </app-button>
      </div>
      <p v-if="claimError" class="wardrobe-store-error">{{ t(`errors.${claimError}`) }}</p>

      <div class="menu-row wardrobe-actions">
        <app-button red @click="close">{{ t('back') }}</app-button>
        <app-button v-if="isMember && inGame" :disabled="!!lockedPick || restyleUsed" @click="wearInGame">{{ t('cosmetics.wearNow') }}</app-button>
        <app-button v-else-if="isMember" :disabled="!!lockedPick" @click="save">{{ t('save') }}</app-button>
        <app-button v-else @click="promptRegister(registerReason)">{{ t('cosmetics.registerToSave') }}</app-button>
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
import { canWear, itemTier, sanitizeCosmetics, specialOpen } from '../../shared/protocol';
import { t } from '../utils/i18n';
import { promptRegister } from '../utils/authPrompt';
import NakamaClient from '../network/NakamaClient';
import MatchController from '../network/MatchController';

// Cosmetics editor. Edits a draft (store.wardrobe.draft) that the preview
// pawn wears live; Save commits it to settings + localStorage, Back discards
// it. Cosmetics travel with the next match join. In a running match it opens
// as an overlay (store.wardrobe.inGame): "Wear it" commits the draft and
// sends the player's one mid-game restyle (SET_COSMETICS); a Guest gets the
// register prompt instead, so they can sign up and restyle on the spot.
export default {
  data() {
    return {
      store: ApplicationStore,
      // Deep copy: the per-pawn looks must not alias the saved ones.
      draft: JSON.parse(JSON.stringify(ApplicationStore.settings.cosmetics)),
      selectedPawn: 'all', // 'all' | 0-3
      propOptions: PROP_OPTIONS,
      finisherOptions: FINISHER_OPTIONS,
      flagQuery: '',
      dragX: null,
      playNonce: 0,
      claiming: false,
      claimError: null,
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
    // The look the chips show: the chosen pawn's, or pawn 1's for "All".
    currentLook() {
      return this.draft.pawns[this.selectedPawn === 'all' ? 0 : this.selectedPawn];
    },
    selectedFlagName() {
      return flagName(this.currentLook.flag, this.store.settings.locale);
    },
    isMember() {
      return this.store.online.account.member;
    },
    owned() {
      return this.store.online.store.owned;
    },
    serverNow() {
      return Date.now() + this.store.online.store.clockOffset;
    },
    // The first picked item the Member can't wear yet, with what to say.
    lockedPick() {
      const picks = this.draft.pawns.map((look) => ['prop', look.prop, 'cosmetics.prop_'])
          .concat([['finisher', this.draft.finisher, 'cosmetics.finisher_']]);
      for (const [kind, id, labelPrefix] of picks) {
        if (canWear(kind, id, this.owned)) continue;
        const entry = itemTier(kind, id);
        const name = t(labelPrefix + id);
        if (entry.tier === 'special' && specialOpen(entry, this.serverNow)) {
          return { kind, id, claimable: true, message: t('store.claimHint', { item: name, date: lastDay(entry.until, this.store.settings.locale) }) };
        }
        return { kind, id, claimable: false, message: t(entry.tier === 'special' ? 'store.closedHint' : 'store.premiumHint', { item: name }) };
      }
      return null;
    },
    inGame() {
      return this.store.wardrobe.inGame;
    },
    registerReason() {
      return this.inGame ? 'restyle' : 'wardrobe';
    },
    restyleUsed() {
      return Boolean(this.store.online.restyled[this.store.online.selfUserId]);
    },
    isMyTurn() {
      return this.store.players.some((player) => player.isPlaying && player.controller === 'local');
    },
    finisherLabelKey() {
      return `cosmetics.finisher_${this.draft.finisher}`;
    },
  },
  watch: {
    'currentLook.prop'(prop) {
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
    // Verifying happens in the mail app / another tab: coming back here
    // should unlock "Wear it" without reopening the account modal.
    this.onFocus = () => {
      const account = this.store.online.account;
      if (account.method !== 'guest' && !account.member) {
        NakamaClient.refreshAccountStatus();
      }
    };
    window.addEventListener('focus', this.onFocus);
    this.onFocus();
    if (this.currentLook.prop === 'flag') {
      this.scrollActiveFlagIntoView();
    }
  },
  beforeUnmount() {
    cancelAnimationFrame(this.rectFrame);
    window.removeEventListener('focus', this.onFocus);
    const wardrobe = this.store.wardrobe;
    wardrobe.draft = null;
    wardrobe.previewPawn = 0;
    wardrobe.rect = null;
    wardrobe.play = null;
    wardrobe.dragging = false;
  },
  methods: {
    t,
    flagUrl,
    promptRegister,
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
      const active = list?.querySelector(`[data-code="${this.currentLook.flag}"]`);
      if (list && active) {
        list.scrollTop = active.offsetTop - list.offsetTop - (list.clientHeight / 2) + (active.clientHeight / 2);
      }
    },
    // Corner badge: Free / Special · until <last day> / Premium (+ owned ✓).
    badge(kind, id) {
      const entry = itemTier(kind, id);
      if (entry.tier === 'free') {
        return { kind: 'free', text: t('store.free') };
      }
      const owned = this.owned.includes(`${kind}:${id}`);
      if (entry.tier === 'special') {
        const text = owned || !specialOpen(entry, this.serverNow)
          ? t('store.special')
          : `${t('store.special')} · ${t('store.until', { date: lastDay(entry.until, this.store.settings.locale) })}`;
        return { kind: owned ? 'owned' : 'special', text: owned ? `${text} ✓` : text };
      }
      return { kind: owned ? 'owned' : 'premium', text: owned ? `${t('store.premium')} ✓` : `🔒 ${t('store.premium')}` };
    },
    async claim(pick) {
      this.claiming = true;
      this.claimError = null;
      try {
        await NakamaClient.claimItem(pick.kind, pick.id);
      } catch (error) {
        this.claimError = error && error.message ? error.message : 'generic';
      } finally {
        this.claiming = false;
      }
    },
    selectPawn(pawn) {
      this.selectedPawn = pawn;
      this.store.wardrobe.previewPawn = pawn === 'all' ? 0 : pawn;
    },
    // A Prop/flag pick dresses the selected pawn, or all four.
    setLook(key, value) {
      const targets = this.selectedPawn === 'all' ? this.draft.pawns : [this.draft.pawns[this.selectedPawn]];
      targets.forEach((look) => {
        look[key] = value;
      });
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
      window.localStorage.setItem('burrec.settings.pawns', JSON.stringify(picked.pawns));
      window.localStorage.setItem('burrec.settings.prop', picked.prop);
      window.localStorage.setItem('burrec.settings.finisher', picked.finisher);
      window.localStorage.setItem('burrec.settings.flag', picked.flag);
      this.close();
    },
    wearInGame() {
      if (this.restyleUsed) {
        return;
      }
      const picked = sanitizeCosmetics(this.draft);
      this.save();
      MatchController.requestRestyle(picked);
    },
    close() {
      if (this.inGame) {
        this.store.wardrobe.inGame = false;
        return;
      }
      this.store.currentScreen = 'main-menu';
    },
  },
};

// A special's `until` is exclusive; show the last day it can be claimed.
function lastDay(until, locale) {
  const day = new Date(Date.parse(`${until}T00:00:00Z`) - 1);
  return day.toLocaleDateString(locale === 'sq' ? 'sq-AL' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

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

/* Over a running match: keep clicks off the board. No dimming — the
   preview is drawn into the canvas beneath, so a dim layer would grey the
   white studio too (the HUD hides itself instead). */
.wardrobe--in-game {
  z-index: 50;
  pointer-events: all;
}

.wardrobe-restyle-note {
  margin-bottom: 12px;
  padding: 8px 10px;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  background: rgba(58, 155, 220, 0.18);
}
.wardrobe-restyle-note--used {
  background: rgba(38, 63, 42, 0.12);
}

.wardrobe-turn-note {
  margin: 0 0 12px;
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
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

.wardrobe-guest-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding: 8px 10px;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  background: rgba(231, 111, 81, 0.15);
}
.wardrobe-guest-banner span {
  flex: 1;
}

.wardrobe-actions {
  margin-top: 12px;
}

.wardrobe-pawns {
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 6px;
}

.wardrobe-pawn-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 36px;
  padding: 4px 6px;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  cursor: pointer;
}

.wardrobe-pawn-tab--active {
  background: #fdc25b;
  box-shadow: 0 0 0 2px #ff7700 inset;
}

.wardrobe-pawn-dot {
  width: 8px;
  height: 12px;
  background: currentColor;
  border-radius: 50% 50% 2px 2px;
  opacity: 0.7;
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

.wardrobe-chip {
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 2px;
}

.wardrobe-chip-label {
  min-width: 0;
}

.wardrobe-tier {
  flex-shrink: 0;
  padding: 1px 5px;
  font-size: 0.6rem;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 999px;
  background: rgba(38, 63, 42, 0.08);
  opacity: 0.75;
}

.wardrobe-tier--special {
  background: #f4a261;
  color: #ffffff;
  opacity: 1;
}

.wardrobe-tier--premium {
  background: #6c5ce7;
  color: #ffffff;
  opacity: 1;
}

.wardrobe-tier--owned {
  background: rgba(42, 157, 143, 0.25);
  opacity: 1;
}

.wardrobe-store-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 8px 10px;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  background: rgba(244, 162, 97, 0.2);
}

.wardrobe-store-note span {
  flex: 1;
}

.wardrobe-store-error {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
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
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
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
  color: rgba(38, 63, 42, 0.55);
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
