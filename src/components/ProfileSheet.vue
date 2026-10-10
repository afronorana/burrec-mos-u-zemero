<template>
  <!-- Profile (top-right button): who you are in the game — name, Wardrobe,
       and the account it is (or is not) attached to. Settings that are not
       about you live in the Settings sheet. -->
  <div class="profile-backdrop" @click.self="close">
    <app-panel class="profile-card">
      <h3 class="panel-title">{{ t('profile.title') }}</h3>

      <div class="profile-identity">
        <span class="profile-avatar" aria-hidden="true">{{ initial }}</span>
        <div class="profile-identity-text">
          <strong class="profile-name">{{ store.online.displayName || t('profile.noName') }}</strong>
          <span class="profile-tagline">{{ tagline }}</span>
        </div>
      </div>

      <div class="form-row profile-name-row">
        <app-input v-model="name" :label="t('online.yourName')" :max-length="12" :required="false" @keyup.enter="saveName" />
        <app-button small :disabled="!nameChanged" @click="saveName">{{ t('save') }}</app-button>
      </div>

      <app-button orange class="profile-btn" @click="openWardrobe">🎩 {{ t('cosmetics.title') }}</app-button>

      <!-- CONTEXT.md: Title — earned by playing; at most one shown. -->
      <span class="profile-label profile-label--titles">{{ t('profile.shownTitle') }}</span>
      <div v-if="ownTitles.length" class="profile-titles">
        <button
          v-for="id in ['', ...ownTitles]"
          :key="id || 'none'"
          type="button"
          class="profile-title-chip"
          :class="{ 'profile-title-chip--active': store.online.store.shownTitle === id }"
          :disabled="busy"
          @click="pickTitle(id)"
        >
          {{ id ? t(`titles.${id}`) : t('profile.noTitle') }}
        </button>
      </div>
      <p v-else class="profile-note">{{ t('profile.noTitlesYet') }}</p>

      <!-- CONTEXT.md: Referral -->
      <span class="profile-label profile-label--titles">{{ t('profile.invite') }}</span>
      <p class="profile-note">{{ t('profile.inviteHint') }}</p>
      <app-button blue class="profile-btn" :loading="inviting" :disabled="inviting" @click="invite">
        {{ inviteNote || t('profile.inviteButton') }}
      </app-button>

      <template v-if="isSignedIn">
        <div class="profile-divider"></div>
        <span class="profile-label">{{ t('profile.linkedTo') }}</span>
        <div class="profile-provider">
          <provider-mark :provider="account.method" :size="18" />
          <span class="profile-provider-text">{{ account.email || t(`auth.method_${account.method}`) }}</span>
        </div>
        <template v-if="account.method === 'email' && !account.emailVerified">
          <p class="profile-note">{{ t('auth.notVerified') }}</p>
          <app-button small class="profile-btn" :loading="busy" :disabled="busy || resent" @click="resendVerification">
            {{ resent ? t('auth.verificationSent') : t('auth.resendVerification') }}
          </app-button>
        </template>

        <div class="profile-divider"></div>
        <app-button orange class="profile-btn" @click="signOut">{{ t('auth.signOut') }}</app-button>
        <button type="button" class="profile-link" @click="openDelete">{{ t('auth.deleteAccount') }}</button>
      </template>

      <template v-else>
        <div class="profile-divider"></div>
        <span class="profile-label">{{ t('profile.registerOrSignIn') }}</span>
        <p class="profile-note">{{ t('profile.perks') }}</p>
        <auth-providers show-email @email="openEmail" @done="close" />
      </template>

      <p v-if="error" class="profile-error">{{ t(`errors.${error}`) }}</p>
      <button type="button" class="profile-close" :aria-label="t('back')" @click="close">×</button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';
import AuthProviders from './AuthProviders.vue';
import ProviderMark from './ProviderMark.vue';
import { clearMatchSession } from '../utils/matchSession';
import { t } from '../utils/i18n';
import { shareReferral } from '../utils/share';

export default {
  components: { AuthProviders, ProviderMark },
  data() {
    return {
      store: ApplicationStore,
      name: ApplicationStore.online.displayName || '',
      busy: false,
      resent: false,
      error: null,
      inviting: false,
      inviteNote: '',
    };
  },
  computed: {
    account() {
      return this.store.online.account;
    },
    isSignedIn() {
      return this.account.method !== 'guest';
    },
    initial() {
      return (this.store.online.displayName || '?').trim().charAt(0).toUpperCase() || '?';
    },
    tagline() {
      if (!this.isSignedIn) return t('profile.guestTagline');
      if (!this.account.member) return t('profile.unverifiedTagline');
      return t('profile.memberTagline');
    },
    ownTitles() {
      return this.store.online.store.titles;
    },
    nameChanged() {
      const name = this.name.trim();
      return !!name && name !== this.store.online.displayName;
    },
  },
  mounted() {
    if (this.isSignedIn) {
      NakamaClient.refreshAccountStatus();
    }
  },
  methods: {
    t,
    close() {
      this.store.online.profileOpen = false;
    },
    saveName() {
      const name = this.name.trim().slice(0, 12);
      if (!name) return;
      this.store.online.displayName = name;
      window.localStorage.setItem('burrec.online.displayName', name);
      this.name = name;
    },
    async invite() {
      this.inviting = true;
      try {
        const result = await shareReferral(await NakamaClient.referralCode());
        if (result === 'copied') this.inviteNote = t('profile.inviteCopied');
        else if (result === 'failed') this.inviteNote = t('errors.generic');
      } catch (error) {
        this.inviteNote = t('errors.generic');
      } finally {
        this.inviting = false;
        clearTimeout(this.inviteTimer);
        this.inviteTimer = setTimeout(() => { this.inviteNote = ''; }, 2500);
      }
    },
    async pickTitle(id) {
      this.busy = true;
      try {
        await NakamaClient.setTitle(id);
      } catch (error) {
        // Nothing to show: the chips still mark what is shown.
      } finally {
        this.busy = false;
      }
    },
    openWardrobe() {
      this.close();
      this.store.currentScreen = 'wardrobe';
    },
    openAuth(view) {
      this.close();
      this.store.online.authReason = null;
      this.store.online.authView = view;
      this.store.online.authOpen = true;
    },
    openEmail() {
      this.openAuth('login');
    },
    openDelete() {
      this.openAuth('delete');
    },
    async resendVerification() {
      this.busy = true;
      this.error = null;
      try {
        const result = await NakamaClient.rpc('resend_verification');
        if (result.error) throw new Error(result.error);
        if (result.devLink) {
          console.info('[auth] dev verify link:', result.devLink);
        }
        this.resent = true;
      } catch (error) {
        this.error = error && error.message ? error.message : 'generic';
      } finally {
        this.busy = false;
      }
    },
    signOut() {
      NakamaClient.logout();
      clearMatchSession();
      this.close();
    },
  },
};
</script>

<style scoped>
.profile-label--titles {
  margin-top: 14px;
}
.profile-titles {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 6px 0 4px;
}
.profile-title-chip {
  padding: 4px 10px;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 999px;
  cursor: pointer;
}
.profile-title-chip--active {
  background: #fdc25b;
  box-shadow: 0 0 0 2px #ff7700 inset;
}
.profile-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1002;
  padding: 16px;
  pointer-events: all;
}
.profile-card {
  position: relative;
  width: 100%;
  max-width: 360px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}
.profile-card .panel-title {
  margin-bottom: 14px;
  text-align: center;
}
.profile-identity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  background: #e76f51;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 50%;
}
.profile-identity-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.profile-name {
  font-size: 1rem;
  overflow-wrap: anywhere;
}
.profile-tagline {
  font-size: 0.75rem;
  opacity: 0.7;
}
.profile-name-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.profile-name-row > :first-child {
  flex: 1;
  min-width: 0;
}
.profile-btn {
  width: 100%;
  margin-top: 8px;
}
.profile-divider {
  height: 0;
  margin: 16px 0 12px;
  border-top: 1.5px dashed rgba(38, 63, 42, 0.25);
}
.profile-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.75;
}
.profile-provider {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: #ffffff;
  border: 1.5px solid rgba(38, 63, 42, 0.25);
  border-radius: 8px;
}
.profile-provider-text {
  font-size: 0.85rem;
  overflow-wrap: anywhere;
}
.profile-note {
  margin: 8px 0;
  font-size: 0.8rem;
  line-height: 1.45;
  opacity: 0.8;
}
.profile-link {
  display: block;
  margin: 12px auto 0;
  padding: 0;
  font: inherit;
  font-size: 0.75rem;
  color: var(--agu-color-red, #e9576f);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}
.profile-error {
  margin-top: 10px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
.profile-close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.4rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
}
</style>
