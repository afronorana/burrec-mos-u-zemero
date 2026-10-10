<template>
  <div class="menu-center play-center">
    <!-- Play now: pick a Game mode online, or a Table on this device
         (CONTEXT.md: Game mode, Table). One tap starts; the last pick is
         ringed. (Comment inside the root: a second root node breaks the
         screen transition.) -->
    <div class="play-stack">
      <h2 class="play-title">{{ t('play.title') }}</h2>

      <div class="play-panels">
        <app-panel class="menu-card play-card">
          <h3 class="panel-title">{{ t('play.online') }}</h3>
          <app-button
            v-for="mode in modes"
            :key="mode"
            class="menu-btn-full play-option"
            :class="{ 'play-option--last': lastPlay === `online:${mode}` }"
            :disabled="busy || !hasName"
            @click="playOnline(mode)"
          >
            {{ t(`modes.${mode}`) }}
          </app-button>
          <button type="button" class="play-info-link" @click="info = 'online'">
            ⓘ {{ t('play.onlineInfoLink') }}
          </button>
        </app-panel>

        <app-panel class="menu-card play-card">
          <h3 class="panel-title">{{ t('play.device') }}</h3>
          <app-button
            blue
            class="menu-btn-full play-option"
            :class="{ 'play-option--last': lastPlay === 'solo' }"
            :disabled="busy || !hasName"
            @click="playSolo"
          >
            {{ t('play.solo') }}
          </app-button>
          <app-button
            blue
            class="menu-btn-full play-option"
            :class="{ 'play-option--last': lastPlay === 'shared' }"
            :disabled="busy || !hasName"
            @click="openShared"
          >
            {{ t('play.shared') }}
          </app-button>
          <!-- Dev builds only: a Solo table with every pawn clustered near
               seat 0's, plus the 1-6 dice picker — for testing animations. -->
          <app-button
            v-if="isDev"
            class="menu-btn-full play-option"
            :disabled="busy || !hasName"
            @click="playDev"
          >
            Dev table
          </app-button>
          <button type="button" class="play-info-link" @click="info = 'device'">
            ⓘ {{ t('play.deviceInfoLink') }}
          </button>
        </app-panel>
      </div>

      <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>

      <div class="menu-row">
        <app-button red :disabled="busy" @click="back">{{ t('back') }}</app-button>
      </div>
    </div>

    <app-modal
      :model-value="info !== null"
      :title="info === 'device' ? t('play.device') : t('play.online')"
      :confirm-text="t('online.close')"
      @update:model-value="(open) => { if (!open) info = null; }"
    >
      <template v-if="info === 'online'">
        <p class="play-info-lead">{{ t('play.onlineInfoLead') }}</p>
        <dl class="play-info-list">
          <template v-for="mode in modes" :key="mode">
            <dt>{{ t(`modes.${mode}`) }}</dt>
            <dd>{{ t(`modes.${mode}Info`) }}</dd>
          </template>
        </dl>
      </template>
      <template v-else-if="info === 'device'">
        <p class="play-info-lead">{{ t('play.deviceInfoLead') }}</p>
        <dl class="play-info-list">
          <dt>{{ t('play.solo') }}</dt>
          <dd>{{ t('play.soloInfo') }}</dd>
          <dt>{{ t('play.shared') }}</dt>
          <dd>{{ t('play.sharedInfo') }}</dd>
        </dl>
      </template>
    </app-modal>
  </div>
</template>

<script>
import { GAME_MODES } from '../../shared/protocol';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { t } from '../utils/i18n';

const LAST_PLAY_KEY = 'burrec.settings.lastPlay';

function readLastPlay() {
  try {
    return window.localStorage.getItem(LAST_PLAY_KEY) || `online:${ApplicationStore.settings.gameMode || 'classic'}`;
  } catch (error) {
    return 'online:classic';
  }
}

export default {
  data() {
    return {
      store: ApplicationStore,
      modes: GAME_MODES,
      busy: false,
      info: null, // 'online' | 'device' | null — the ⓘ explanation open
      lastPlay: readLastPlay(),
      isDev: import.meta.env.DEV,
    };
  },
  computed: {
    hasName() {
      return (this.store.online.displayName || '').trim().length > 0;
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
  },
  methods: {
    t,
    remember(pick) {
      this.lastPlay = pick;
      try {
        window.localStorage.setItem(LAST_PLAY_KEY, pick);
      } catch (error) {
        // Private mode: just not remembered.
      }
    },
    async run(start) {
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await start();
      } catch (error) {
        this.store.online.lastError = error?.message ? error.message : 'connect_failed';
      } finally {
        this.busy = false;
      }
    },
    // CONTEXT.md: Game mode — remembered for the next game (Create room too).
    playOnline(mode) {
      this.remember(`online:${mode}`);
      this.store.settings.gameMode = mode;
      window.localStorage.setItem('burrec.settings.gameMode', mode);
      this.run(() => MatchController.quickMatch(this.store.online.displayName));
    },
    playSolo() {
      this.remember('solo');
      this.run(() => MatchController.startTable('solo', this.store.online.displayName));
    },
    playDev() {
      this.store.demoMode = true;
      this.run(() => MatchController.startTable('solo', this.store.online.displayName, undefined, { dev: true }));
    },
    openShared() {
      this.remember('shared');
      this.store.online.lastError = null;
      this.store.currentScreen = 'shared-setup';
    },
    back() {
      this.store.online.lastError = null;
      this.store.currentScreen = 'home';
    },
  },
};
</script>

<style scoped>
.play-center {
  align-items: flex-start;
  overflow-y: auto;
  /* Clear the top-right Settings/Profile buttons. */
  padding-top: calc(76px + env(safe-area-inset-top, 0px));
  padding-bottom: 24px;
}
.play-stack {
  width: min(720px, calc(100vw - 32px));
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: all;
}
.play-title {
  margin: 0;
  text-align: center;
  color: #ffffff;
  font-size: 1.3rem;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
}
.play-panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 600px) {
  .play-panels {
    grid-template-columns: minmax(0, 1fr);
  }
}
.play-card {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.play-option {
  font-size: 1.05rem;
  padding: 14px 20px;
}
/* The last pick: a ring, not a color change (colors mean online/device). */
.play-option--last {
  outline: 3px solid #ffffff;
  outline-offset: 2px;
}
.play-info-link {
  display: block;
  width: 100%;
  margin-top: 2px;
  background: none;
  border: none;
  padding: 4px 0;
  font: inherit;
  font-size: 0.85rem;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.75;
  text-align: center;
}
.play-info-link:hover {
  opacity: 1;
}
.play-info-lead {
  margin: 0 0 12px;
  font-size: 0.95rem;
  line-height: 1.6;
}
.play-info-list {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}
.play-info-list dt {
  font-weight: 800;
  margin-top: 10px;
}
.play-info-list dd {
  margin: 2px 0 0;
}
.online-error {
  margin: 0;
  font-size: 12px;
  text-align: center;
  color: var(--agu-color-red, #e9576f);
}
</style>
