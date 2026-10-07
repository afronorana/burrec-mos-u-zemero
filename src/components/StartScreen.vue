<template>
  <div class="screen-overlay">
    <transition name="screen-fade" mode="out-in">
      <!-- Intro: name + big Play Now only. Create/Join live on the quickplay/friends screen. -->
      <!-- Start: "Play now" (as a Guest, or as yourself once a Member) and,
           for non-Members, "Register". Choosing email swaps both panels for
           the email form. -->
      <div v-if="store.currentScreen === 'main-menu'" key="main-menu" class="menu-center intro-center">
        <div class="intro-stack">
          <h1 class="game-title intro-title">{{ t('title') }}</h1>

          <auth-modal v-if="emailStep" inline initial-view="login" @close="emailStep = false" />

          <template v-else>
            <app-panel class="menu-card intro-card">
              <h2 class="panel-title">{{ t('intro.playNowTitle') }}</h2>
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
              <app-button v-else class="menu-btn-full intro-play-btn" :disabled="!hasName || busy" @click="playNow">
                {{ isMember ? t('intro.play') : t('intro.playAsGuest') }}
              </app-button>
              <p v-if="errorMessage" class="online-error">{{ errorMessage }}</p>
            </app-panel>

            <app-panel v-if="!isMember" class="menu-card intro-card">
              <h2 class="panel-title">{{ t('intro.registerTitle') }}</h2>
              <!-- Email account waiting on its verification link -->
              <template v-if="store.online.account.method === 'email'">
                <p class="intro-perks">{{ t('intro.verifyPending', { email: store.online.account.email || '' }) }}</p>
                <app-button blue class="menu-btn-full" @click="openProfile">{{ t('profile.title') }}</app-button>
              </template>
              <template v-else>
                <p class="intro-perks">{{ t('profile.perks') }}</p>
                <auth-providers show-email @email="emailStep = true" />
              </template>
            </app-panel>
          </template>

          <p class="intro-legal">
            <a href="./privacy-policy/" target="_blank" rel="noopener">{{ t('legal.privacy') }}</a>
            ·
            <a href="./terms-and-conditions/" target="_blank" rel="noopener">{{ t('legal.terms') }}</a>
          </p>
        </div>
      </div>

      <home-screen v-else-if="store.currentScreen === 'home'" key="home" />
      <create-room-screen v-else-if="store.currentScreen === 'create-room'" key="create-room" />
      <join-room-screen v-else-if="store.currentScreen === 'join-room'" key="join-room" />
      <lobby-screen v-else-if="store.currentScreen === 'lobby'" key="lobby" />
      <admin-screen v-else-if="store.currentScreen === 'admin'" key="admin" />
      <wardrobe-screen v-else-if="store.currentScreen === 'wardrobe'" key="wardrobe" />
    </transition>

    <game-interface v-if="store.currentScreen === 'game-screen'" />
    <wardrobe-screen v-if="store.currentScreen === 'game-screen' && store.wardrobe.inGame" />

    <!-- Top right on menu screens: Settings + Profile (the lobby carries its
         own gear). The Profile button wears the sign-in provider's mark. -->
    <div v-if="isMenuScreen" class="menu-corner">
      <app-button orange class="hud-icon-btn" :title="t('settings.title')" @click="openSettings">
        <settings-icon :size="20" />
      </app-button>
      <app-button orange class="hud-icon-btn menu-profile-btn" :title="t('profile.title')" @click="openProfile">
        <user-icon :size="20" />
        <span v-if="isSignedIn" class="menu-profile-badge" :class="{ 'menu-profile-badge--pending': !isMember }">
          <provider-mark :provider="store.online.account.method" :size="10" />
        </span>
      </app-button>
    </div>

    <profile-sheet v-if="store.online.profileOpen" />
    <cookie-consent />

    <!-- Account / sign-in modal (menu account row, #verify= / #reset= links) -->
    <auth-modal v-if="store.online.authOpen" />

    <!-- Block / Report another player (chat message or seat chip) -->
    <player-actions v-if="store.online.playerActions" />

    <!-- Global settings modal (openable from any menu / the lobby gear) -->
    <div
      v-if="store.settingsOpen"
      class="global-settings-modal-backdrop"
      @click.self="store.settingsOpen = false"
    >
      <app-panel class="global-settings-card">
        <h3 class="panel-title" style="margin-bottom: 16px;">{{ t('settings.title') }}</h3>

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

        <div class="form-row">
          <label class="select-label">{{ t('cosmetics.finishers') }}</label>
          <app-tabs
            v-model="finishersSetting"
            :options="[{ value: 'on', label: t('settings.soundOn') }, { value: 'off', label: t('settings.soundOff') }]"
          />
        </div>

        <!-- Blocked players: findable here, not only where a Block is made
             (App Store guideline 1.2). -->
        <div class="form-row">
          <label class="select-label">{{ t('moderation.blockedTitle') }} ({{ store.online.blockedPlayers.length }})</label>
          <p v-if="!store.online.blockedPlayers.length" class="settings-note">{{ t('moderation.blockedEmpty') }}</p>
          <div v-for="player in store.online.blockedPlayers" :key="player.id" class="settings-blocked-row">
            <span class="settings-blocked-name">{{ player.name || t('moderation.unknownPlayer') }}</span>
            <app-button small @click="unblock(player.id)">{{ t('moderation.unblock') }}</app-button>
          </div>
        </div>

        <p class="settings-legal">
          <a href="./privacy-policy/" target="_blank" rel="noopener">{{ t('legal.privacy') }}</a>
          ·
          <a href="./terms-and-conditions/" target="_blank" rel="noopener">{{ t('legal.terms') }}</a>
        </p>

        <div class="menu-row" style="margin-top: 16px;">
          <app-button @click="store.settingsOpen = false">{{ t('close') }}</app-button>
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
import HomeScreen from './HomeScreen.vue';
import CreateRoomScreen from './CreateRoomScreen.vue';
import JoinRoomScreen from './JoinRoomScreen.vue';
import LobbyScreen from './LobbyScreen.vue';
import AdminScreen from './AdminScreen.vue';
import WardrobeScreen from './WardrobeScreen.vue';
import AuthModal from './AuthModal.vue';
import AuthProviders from './AuthProviders.vue';
import CookieConsent from './CookieConsent.vue';
import ProfileSheet from './ProfileSheet.vue';
import ProviderMark from './ProviderMark.vue';
import NakamaClient from '../network/NakamaClient';
import PlayerActions from './PlayerActions.vue';
import ApplicationStore from '../utils/ApplicationStore';
import MatchController from '../network/MatchController';
import { clearMatchSession } from '../utils/matchSession';
import { t } from '../utils/i18n';
import { Settings, User } from '@lucide/vue';

export default {
  components: {
    GameInterface,
    HomeScreen,
    CreateRoomScreen,
    JoinRoomScreen,
    LobbyScreen,
    AdminScreen,
    WardrobeScreen,
    AuthModal,
    AuthProviders,
    CookieConsent,
    PlayerActions,
    ProfileSheet,
    ProviderMark,
    SettingsIcon: Settings,
    UserIcon: User,
  },
  data() {
    return {
      store: ApplicationStore,
      username: ApplicationStore.online.displayName || '',
      busy: false,
      emailStep: false,
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
      return ['main-menu', 'home', 'create-room', 'join-room'].includes(this.store.currentScreen);
    },
    errorMessage() {
      const error = this.store.online.lastError;
      return error ? t(`errors.${error}`) : '';
    },
    isSignedIn() {
      return this.store.online.account.method !== 'guest';
    },
    isMember() {
      return this.store.online.account.member;
    },
    // Viewer preference (show other players' Finishers in full or "lite"),
    // not a Cosmetic — those are only edited in the menu wardrobe.
    finishersSetting: {
      get() {
        return this.store.settings.finishersEnabled ? 'on' : 'off';
      },
      set(val) {
        this.store.settings.finishersEnabled = val === 'on';
        window.localStorage.setItem('burrec.settings.finishers', val === 'on' ? '1' : '0');
      },
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
    // Signing in from the email step lands back on the panels.
    'store.online.account.method'(method) {
      if (method !== 'guest') this.emailStep = false;
    },
    // The Profile sheet can rename you; keep the start panel's field in step.
    'store.online.displayName'(name) {
      if (name && name !== this.username.trim()) this.username = name;
    },
    // Typing your name is choosing it: Profile and a sign-in from the
    // Register panel (which syncs the display name) see it straight away.
    username(name) {
      if (name.trim()) this.commitName();
    },
  },
  mounted() {
    // Email links land here as #verify=<token> / #reset=<token>. Consume the
    // hash before App.vue's resume-on-load reads it for #m= match records.
    const hash = window.location.hash || '';

    // Hidden admin dashboard: burrec.com/#admin
    if (hash === '#admin') {
      this.store.currentScreen = 'admin';
      return;
    }

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
    openProfile() {
      this.store.online.profileOpen = true;
    },
    unblock(userId) {
      NakamaClient.setBlocked(userId, false).catch(() => {});
    },
    onEnter() {
      if (!this.hasName) return;
      if (this.pendingResume) this.continuePending();
      else this.playNow();
    },
    playNow() {
      this.commitName();
      this.store.online.lastError = null;
      this.store.currentScreen = 'home';
    },
    continuePending() {
      this.commitName();
      const pending = this.store.online.pendingResume;
      this.store.online.pendingResume = null;
      if (!pending) return;
      MatchController.resumeSession({ matchId: pending.matchId, joinCode: pending.code });
    },
    openSettings() {
      this.store.settingsOpen = true;
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
.intro-center {
  align-items: flex-start;
  overflow-y: auto;
  /* Clear the top-right Settings/Profile buttons. */
  padding-top: calc(76px + env(safe-area-inset-top, 0px));
  padding-bottom: 96px;
}
.intro-stack {
  width: min(460px, 92vw);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: all;
}
/* Over the 3D scene, not a panel: white with a dark outline to stay legible. */
.intro-title {
  margin: 0;
  color: #ffffff;
  text-shadow:
    -2px -2px 0 #263f2a, 2px -2px 0 #263f2a, -2px 2px 0 #263f2a, 2px 2px 0 #263f2a,
    0 4px 0 #263f2a;
}
.intro-card {
  text-align: center;
}
.intro-play-btn {
  margin-top: 14px;
  font-size: 1.15rem;
  padding: 16px 24px;
}
.intro-perks {
  margin: -4px 0 14px;
  font-size: 0.8rem;
  line-height: 1.45;
  opacity: 0.8;
}
.intro-legal {
  margin: 0;
  font-size: 0.75rem;
  text-align: center;
}
.intro-legal a {
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
.intro-resume-note {
  margin: 16px 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  opacity: 0.8;
}
.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
/* Settings + Profile, pinned top right on menu screens. */
.menu-corner {
  position: fixed;
  top: calc(16px + env(safe-area-inset-top, 0px));
  right: 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  pointer-events: all;
}
.menu-profile-btn {
  position: relative;
  overflow: visible;
}
.menu-profile-badge {
  position: absolute;
  right: -5px;
  bottom: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: #000000;
  background: #ffffff;
  border: 1.5px solid #263f2a;
  border-radius: 50%;
}
/* Email login still waiting on verification: not a Member yet. */
.menu-profile-badge--pending {
  background: #f4a261;
}
.settings-note {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.7;
}
.settings-blocked-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 0;
}
.settings-blocked-name {
  min-width: 0;
  font-size: 0.85rem;
  overflow-wrap: anywhere;
}
.settings-legal {
  margin: 12px 0 0;
  font-size: 0.75rem;
  text-align: center;
}
.settings-legal a {
  color: inherit;
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
