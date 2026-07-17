<template>
  <div class="screen-overlay">
    <transition name="screen-fade" mode="out-in">
      <!-- Intro: name + big Play Now only. Create/Join live on the quickplay/friends screen. -->
      <div v-if="store.currentScreen === 'main-menu'" key="main-menu" class="menu-center">
        <app-panel class="menu-card intro-card">
          <h1 class="game-title">{{ t('title') }}</h1>

          <app-input
            v-model="username"
            :label="t('online.yourName')"
            :max-length="12"
            @keyup.enter="onEnter"
          />

          <template v-if="pendingResume">
            <p class="intro-resume-note">{{ t('online.resumeBody') }}</p>
            <app-button class="menu-btn-full intro-play-btn" :disabled="!hasName || busy" @click="continuePending">
              {{ t('online.resume') }}
            </app-button>
          </template>
          <template v-else>
            <app-button class="menu-btn-full intro-play-btn" :disabled="!hasName || busy" @click="playNow">
              {{ t('online.playNow') }}
            </app-button>
          </template>

          <div class="intro-account">
            <button v-if="isSignedIn" type="button" class="intro-account-link" @click="openAccount">
              👤 {{ accountLabel }}
            </button>
            <button v-else type="button" class="intro-account-link" @click="openSignIn">
              {{ t('auth.signInCta') }}
            </button>
          </div>

          <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>
        </app-panel>
      </div>

      <create-room-screen v-else-if="store.currentScreen === 'create-room'" key="create-room" />
      <join-room-screen v-else-if="store.currentScreen === 'join-room'" key="join-room" />
      <lobby-screen v-else-if="store.currentScreen === 'lobby'" key="lobby" />
    </transition>

    <game-interface v-if="store.currentScreen === 'game-screen'" />

    <!-- Settings gear: menu screens only (the lobby carries its own). -->
    <app-button
      v-if="isMenuScreen"
      orange
      class="hud-icon-btn global-settings-trigger"
      :title="t('graphics')"
      @click="openSettings"
    >
      <settings-icon :size="20" />
    </app-button>

    <!-- Account / sign-in modal (menu account row, #verify= / #reset= links) -->
    <auth-modal v-if="store.online.authOpen" />

    <!-- Global settings modal (openable from any menu / the lobby gear) -->
    <div v-if="store.settingsOpen" class="global-settings-modal-backdrop" @click.self="store.settingsOpen = false">
      <app-panel class="global-settings-card">
        <h3 class="panel-title" style="margin-bottom: 16px;">{{ t('settings.title') }}</h3>

        <div class="form-row">
          <app-input v-model="settingsName" :label="t('online.yourName')" :max-length="12" />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('language') }}</label>
          <app-tabs
            v-model="store.settings.locale"
            :options="[{ value: 'en', label: 'English' }, { value: 'sq', label: 'Shqip' }]"
            @update:modelValue="saveLocale"
          />
        </div>

        <div class="form-row">
          <label class="select-label">{{ t('settings.sound') }}</label>
          <app-tabs
            v-model="soundSetting"
            :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]"
          />
        </div>

        <outline-appearance-select :label="t('outlineStyle')" select-id="outline-style-menu" />
        <render-quality-slider :label="t('renderQuality')" slider-id="render-quality-menu" />

        <div class="menu-row" style="margin-top: 20px;">
          <app-button red @click="store.settingsOpen = false">{{ t('back') }}</app-button>
          <app-button :disabled="!settingsName.trim()" @click="saveSettings">{{ t('save') }}</app-button>
        </div>
      </app-panel>
    </div>

    <!-- "You recently left a game — continue?" (root URL reopened) -->
    <div v-if="store.online.resumePrompt && !store.online.resuming" class="resume-modal-backdrop">
      <app-panel class="menu-card resume-card">
        <h3 class="panel-title" style="margin-bottom: 12px;">{{ t('online.resumeTitle') }}</h3>
        <p class="panel-desc">{{ t('online.resumeBody') }}</p>
        <div class="menu-row" style="margin-top: 20px;">
          <app-button red @click="dismissResume">{{ t('online.resumeDismiss') }}</app-button>
          <app-button @click="continueResume">{{ t('online.resume') }}</app-button>
        </div>
      </app-panel>
    </div>

    <!-- Rejoining a match after a reload -->
    <div v-if="store.online.resuming" class="resume-modal-backdrop">
      <app-panel class="menu-card resume-card">
        <p class="panel-desc" style="margin: 0;">{{ t('online.resuming') }}</p>
      </app-panel>
    </div>
  </div>
</template>

<script>
import GameInterface from './GameInterface.vue';
import CreateRoomScreen from './CreateRoomScreen.vue';
import JoinRoomScreen from './JoinRoomScreen.vue';
import LobbyScreen from './LobbyScreen.vue';
import AuthModal from './AuthModal.vue';
import OutlineAppearanceSelect from './OutlineAppearanceSelect.vue';
import RenderQualitySlider from './RenderQualitySlider.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { clearMatchSession } from '../utils/matchSession';
import { t } from '../utils/i18n';
import { Settings } from '@lucide/vue';

export default {
  components: {
    GameInterface,
    CreateRoomScreen,
    JoinRoomScreen,
    LobbyScreen,
    AuthModal,
    OutlineAppearanceSelect,
    RenderQualitySlider,
    SettingsIcon: Settings,
  },
  data() {
    return {
      store: ApplicationStore,
      username: ApplicationStore.online.displayName || '',
      settingsName: '',
      busy: false,
    };
  },
  computed: {
    hasName() {
      return this.username.trim().length > 0;
    },
    pendingResume() {
      return this.store.online.pendingResume;
    },
    isMenuScreen() {
      return ['main-menu', 'create-room', 'join-room'].includes(this.store.currentScreen);
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
    isSignedIn() {
      return this.store.online.account.method !== 'guest';
    },
    accountLabel() {
      const account = this.store.online.account;
      return account.email || t(`auth.method_${account.method}`);
    },
    soundSetting: {
      get() {
        return this.store.settings.soundEnabled ? 'on' : 'off';
      },
      set(val) {
        this.store.settings.soundEnabled = val === 'on';
        window.localStorage.setItem('burrec.settings.sound', val === 'on' ? '1' : '0');
      },
    },
  },
  watch: {
    // The lobby's gear just flips store.settingsOpen; seed the name field here
    // so it's correct no matter which screen opened the modal.
    'store.settingsOpen'(open) {
      if (open) {
        this.settingsName = this.store.online.displayName || this.username || '';
      }
    },
  },
  mounted() {
    // Email links land here as #verify=<token> / #reset=<token>. Consume the
    // hash before App.vue's resume-on-load reads it for #m= match records.
    const hash = window.location.hash || '';
    const verify = hash.match(/^#verify=([A-Za-z0-9]+)$/);
    const reset = hash.match(/^#reset=([A-Za-z0-9]+)$/);
    if (verify || reset) {
      const online = this.store.online;
      online.verifyToken = verify ? verify[1] : null;
      online.resetToken = reset ? reset[1] : null;
      online.authView = verify ? 'verify' : 'reset';
      online.authOpen = true;
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  },
  methods: {
    t,
    saveLocale(val) {
      window.localStorage.setItem('burrec.settings.locale', val);
    },
    // Persist the intro name into the store so the create/join screens see it.
    commitName() {
      const name = this.username.trim().slice(0, 12);
      this.store.online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
      return name;
    },
    async run(action) {
      this.busy = true;
      this.store.online.lastError = null;
      try {
        await action();
      } catch (error) {
        const message = error?.message ? error.message : 'connect_failed';
        if (message === 'auth_session_expired') {
          // The stored account session died — reopen the sign-in modal
          // instead of silently downgrading to a guest identity.
          this.openSignIn();
        }
        this.store.online.lastError = message;
      } finally {
        this.busy = false;
      }
    },
    openSignIn() {
      this.store.online.authView = 'login';
      this.store.online.authOpen = true;
    },
    openAccount() {
      this.store.online.authView = 'account';
      this.store.online.authOpen = true;
    },
    onEnter() {
      if (!this.hasName) return;
      if (this.pendingResume) this.continuePending();
      else this.playNow();
    },
    playNow() {
      const name = this.commitName();
      this.run(() => MatchController.quickMatch(name));
    },
    continuePending() {
      this.commitName();
      const pending = this.store.online.pendingResume;
      this.store.online.pendingResume = null;
      if (!pending) return;
      MatchController.resumeSession({ matchId: pending.matchId, joinCode: pending.code });
    },
    openSettings() {
      this.settingsName = this.store.online.displayName || this.username || '';
      this.store.settingsOpen = true;
    },
    saveSettings() {
      const name = this.settingsName.trim().slice(0, 12);
      if (name) {
        this.username = name;
        this.store.online.displayName = name;
        window.localStorage.setItem('burrec.online.displayName', name);
      }
      this.store.settingsOpen = false;
    },
    continueResume() {
      const record = this.store.online.resumePrompt;
      this.store.online.resumePrompt = null;
      if (!record) return;
      MatchController.resumeSession({
        matchId: record.matchId,
        mode: record.mode,
        joinCode: record.joinCode,
      });
    },
    dismissResume() {
      this.store.online.resumePrompt = null;
      clearMatchSession();
    },
  },
};
</script>

<style scoped>
.intro-card {
  text-align: center;
}
.intro-play-btn {
  margin-top: 18px;
  font-size: 1.15rem;
  padding: 16px 24px;
}
.intro-resume-note {
  margin: 16px 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  opacity: 0.8;
}
.intro-account {
  margin-top: 16px;
}
.intro-account-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 0.8rem;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.75;
}
.intro-account-link:hover {
  opacity: 1;
}
.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
.resume-modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 60;
  padding: 16px;
}
.resume-card {
  text-align: center;
  max-width: 360px;
}
</style>
