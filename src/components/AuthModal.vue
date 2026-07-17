<template>
  <div class="auth-modal-backdrop" @click.self="close">
    <app-panel class="auth-card">
      <!-- Signed-in account view -->
      <template v-if="view === 'account'">
        <h3 class="panel-title">{{ t('auth.accountTitle') }}</h3>
        <p class="auth-account-line">
          <strong>{{ account.email || t(`auth.method_${account.method}`) }}</strong>
        </p>
        <p v-if="account.email && account.emailVerified" class="auth-verified-badge">✓ {{ t('auth.verified') }}</p>
        <template v-else-if="account.email">
          <p class="auth-note">{{ t('auth.notVerified') }}</p>
          <app-button small :loading="busy" :disabled="busy || resent" @click="resendVerification">
            {{ resent ? t('auth.verificationSent') : t('auth.resendVerification') }}
          </app-button>
        </template>
        <div class="menu-row auth-actions">
          <app-button red @click="signOut">{{ t('auth.signOut') }}</app-button>
          <app-button @click="close">{{ t('back') }}</app-button>
        </div>
      </template>

      <!-- Login -->
      <template v-else-if="view === 'login'">
        <h3 class="panel-title">{{ t('auth.loginTitle') }}</h3>
        <p v-if="notice" class="auth-success">{{ notice }}</p>
        <div class="form-row">
          <app-input v-model="email" :label="t('auth.email')" type="email" @keyup.enter="submitLogin" />
        </div>
        <div class="form-row">
          <app-input v-model="password" :label="t('auth.password')" type="password" @keyup.enter="submitLogin" />
        </div>
        <app-button class="auth-submit" :loading="busy" :disabled="busy || !email || !password" @click="submitLogin">
          {{ t('auth.signIn') }}
        </app-button>
        <button type="button" class="auth-link" @click="switchView('forgot')">{{ t('auth.forgot') }}</button>

        <div v-if="hasSocial" class="auth-divider"><span>{{ t('auth.or') }}</span></div>
        <div v-if="googleEnabled" ref="googleBtn" class="auth-google-slot"></div>
        <app-button v-if="appleEnabled" class="auth-apple-btn" :disabled="busy" @click="signInApple">
           {{ t('auth.continueApple') }}
        </app-button>

        <p class="auth-note auth-switch">
          {{ t('auth.noAccount') }}
          <button type="button" class="auth-link" @click="switchView('register')">{{ t('auth.register') }}</button>
        </p>
      </template>

      <!-- Register -->
      <template v-else-if="view === 'register'">
        <h3 class="panel-title">{{ t('auth.registerTitle') }}</h3>
        <div class="form-row">
          <app-input v-model="email" :label="t('auth.email')" type="email" @keyup.enter="submitRegister" />
        </div>
        <div class="form-row">
          <app-input v-model="password" :label="t('auth.password')" type="password" :help-text="t('auth.passwordHint')" @keyup.enter="submitRegister" />
        </div>
        <div class="form-row">
          <app-input v-model="passwordConfirm" :label="t('auth.passwordConfirm')" type="password" @keyup.enter="submitRegister" />
        </div>
        <app-button class="auth-submit" :loading="busy" :disabled="busy || !email || !password" @click="submitRegister">
          {{ t('auth.createAccount') }}
        </app-button>
        <p class="auth-note auth-switch">
          {{ t('auth.haveAccount') }}
          <button type="button" class="auth-link" @click="switchView('login')">{{ t('auth.signIn') }}</button>
        </p>
      </template>

      <!-- Forgot password -->
      <template v-else-if="view === 'forgot'">
        <h3 class="panel-title">{{ t('auth.forgotTitle') }}</h3>
        <template v-if="notice">
          <p class="auth-success">{{ notice }}</p>
          <app-button class="auth-submit" @click="switchView('login')">{{ t('back') }}</app-button>
        </template>
        <template v-else>
          <p class="auth-note">{{ t('auth.forgotDesc') }}</p>
          <div class="form-row">
            <app-input v-model="email" :label="t('auth.email')" type="email" @keyup.enter="submitForgot" />
          </div>
          <app-button class="auth-submit" :loading="busy" :disabled="busy || !email" @click="submitForgot">
            {{ t('auth.sendReset') }}
          </app-button>
          <button type="button" class="auth-link auth-switch" @click="switchView('login')">{{ t('back') }}</button>
        </template>
      </template>

      <!-- Reset password (arrived via #reset= link) -->
      <template v-else-if="view === 'reset'">
        <h3 class="panel-title">{{ t('auth.resetTitle') }}</h3>
        <div class="form-row">
          <app-input v-model="password" :label="t('auth.newPassword')" type="password" :help-text="t('auth.passwordHint')" @keyup.enter="submitReset" />
        </div>
        <div class="form-row">
          <app-input v-model="passwordConfirm" :label="t('auth.passwordConfirm')" type="password" @keyup.enter="submitReset" />
        </div>
        <app-button class="auth-submit" :loading="busy" :disabled="busy || !password" @click="submitReset">
          {{ t('auth.setPassword') }}
        </app-button>
      </template>

      <!-- Verify email (arrived via #verify= link) -->
      <template v-else-if="view === 'verify'">
        <h3 class="panel-title">{{ t('auth.verifyTitle') }}</h3>
        <app-spinner v-if="busy" />
        <p v-else-if="notice" class="auth-success">{{ notice }}</p>
        <app-button v-if="!busy" class="auth-submit" @click="close">{{ t('auth.done') }}</app-button>
      </template>

      <p v-if="error" class="auth-error">{{ t(`errors.${error}`) }}</p>

      <button v-if="view !== 'verify'" type="button" class="auth-close" :aria-label="t('back')" @click="close">×</button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';
import { clearMatchSession } from '../utils/matchSession';
import { t } from '../utils/i18n';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || '';

const loadedScripts = {};
function loadScript(src) {
  if (!loadedScripts[src]) {
    loadedScripts[src] = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = resolve;
      el.onerror = () => reject(new Error('connect_failed'));
      document.head.appendChild(el);
    });
  }
  return loadedScripts[src];
}

export default {
  data() {
    return {
      store: ApplicationStore,
      email: '',
      password: '',
      passwordConfirm: '',
      busy: false,
      error: null,
      notice: '',
      // Notice that must survive the next view switch (the view watcher wipes
      // transient state, so a success message set alongside switchView would
      // be cleared one tick later).
      pendingNotice: '',
      resent: false,
    };
  },
  computed: {
    view() {
      return this.store.online.authView;
    },
    account() {
      return this.store.online.account;
    },
    googleEnabled() {
      return !!GOOGLE_CLIENT_ID;
    },
    appleEnabled() {
      return !!APPLE_CLIENT_ID;
    },
    hasSocial() {
      return this.googleEnabled || this.appleEnabled;
    },
  },
  watch: {
    view() {
      this.error = null;
      this.notice = this.pendingNotice;
      this.pendingNotice = '';
      this.password = '';
      this.passwordConfirm = '';
      this.$nextTick(() => this.mountSocialButtons());
    },
  },
  mounted() {
    if (this.view === 'verify') {
      this.consumeVerifyToken();
    }
    this.mountSocialButtons();
  },
  methods: {
    t,
    close() {
      this.store.online.authOpen = false;
      this.store.online.resetToken = null;
      this.store.online.verifyToken = null;
    },
    switchView(view) {
      this.store.online.authView = view;
    },
    async run(action) {
      this.busy = true;
      this.error = null;
      try {
        await action();
      } catch (error) {
        this.error = error && error.message ? error.message : 'generic';
      } finally {
        this.busy = false;
      }
    },
    submitLogin() {
      if (!this.email || !this.password) return;
      this.run(async () => {
        await NakamaClient.loginEmail(this.email, this.password, { create: false });
        this.close();
      });
    },
    submitRegister() {
      if (!this.email || !this.password) return;
      if (this.password.length < 8) {
        this.error = 'auth_weak_password';
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.error = 'auth_password_mismatch';
        return;
      }
      this.run(async () => {
        await NakamaClient.loginEmail(this.email, this.password, { create: true });
        // Land on the account view so the "verify your email" hint is seen.
        this.switchView('account');
      });
    },
    submitForgot() {
      if (!this.email) return;
      this.run(async () => {
        await NakamaClient.ensureAnySession();
        const result = await NakamaClient.rpc('request_password_reset', { email: this.email });
        if (result.devLink) {
          // EMAIL_DEV_ECHO only: makes the flow testable without a mailbox.
          console.info('[auth] dev reset link:', result.devLink);
        }
        this.notice = t('auth.resetSent');
      });
    },
    submitReset() {
      const token = this.store.online.resetToken;
      if (!token || !this.password) return;
      if (this.password.length < 8) {
        this.error = 'auth_weak_password';
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.error = 'auth_password_mismatch';
        return;
      }
      this.run(async () => {
        await NakamaClient.ensureAnySession();
        const result = await NakamaClient.rpc('reset_password', { token, password: this.password });
        if (result.error) {
          throw new Error(result.error);
        }
        this.store.online.resetToken = null;
        this.email = result.email || this.email;
        this.pendingNotice = t('auth.resetDone');
        this.switchView('login');
      });
    },
    consumeVerifyToken() {
      const token = this.store.online.verifyToken;
      if (!token) {
        this.close();
        return;
      }
      this.run(async () => {
        await NakamaClient.ensureAnySession();
        const result = await NakamaClient.rpc('verify_email', { token });
        if (result.error) {
          throw new Error(result.error);
        }
        this.store.online.verifyToken = null;
        if (this.account.email && this.account.email === result.email) {
          this.account.emailVerified = true;
        }
        this.notice = t('auth.verifyDone', { email: result.email || '' });
      });
    },
    resendVerification() {
      this.run(async () => {
        const result = await NakamaClient.rpc('resend_verification');
        if (result.error) {
          throw new Error(result.error);
        }
        if (result.devLink) {
          console.info('[auth] dev verify link:', result.devLink);
        }
        this.resent = true;
      });
    },
    signOut() {
      NakamaClient.logout();
      clearMatchSession();
      this.close();
    },
    async mountSocialButtons() {
      if (this.view !== 'login') return;
      if (this.googleEnabled) {
        try {
          await loadScript('https://accounts.google.com/gsi/client');
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => this.onGoogleCredential(response.credential),
          });
          if (this.$refs.googleBtn) {
            window.google.accounts.id.renderButton(this.$refs.googleBtn, {
              theme: 'outline',
              size: 'large',
              width: 260,
              text: 'continue_with',
            });
          }
        } catch (error) {
          // Script blocked/offline: the email form still works.
        }
      }
      if (this.appleEnabled) {
        try {
          await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');
          window.AppleID.auth.init({
            clientId: APPLE_CLIENT_ID,
            scope: 'email',
            redirectURI: window.location.origin + window.location.pathname,
            usePopup: true,
          });
        } catch (error) {
          // Same: soft-fail.
        }
      }
    },
    onGoogleCredential(idToken) {
      this.run(async () => {
        await NakamaClient.loginGoogle(idToken);
        this.close();
      });
    },
    signInApple() {
      this.run(async () => {
        const response = await window.AppleID.auth.signIn();
        const idToken = response && response.authorization && response.authorization.id_token;
        if (!idToken) {
          throw new Error('connect_failed');
        }
        await NakamaClient.loginApple(idToken);
        this.close();
      });
    },
  },
};
</script>

<style scoped>
.auth-modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 70;
  padding: 16px;
  /* .screen-overlay is pointer-events: none — re-enable here (same as the
     global settings backdrop) or clicks fall through to the menu behind. */
  pointer-events: all;
}
.auth-card {
  position: relative;
  width: 100%;
  max-width: 340px;
  text-align: center;
}
.auth-card .panel-title {
  margin-bottom: 16px;
}
.auth-submit {
  width: 100%;
  margin-top: 12px;
}
.auth-link {
  background: none;
  border: none;
  padding: 0;
  margin-top: 10px;
  font: inherit;
  font-size: 0.8rem;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
}
.auth-link:hover {
  opacity: 1;
}
.auth-switch {
  margin-top: 14px;
}
.auth-note {
  font-size: 0.8rem;
  line-height: 1.5;
  opacity: 0.8;
  margin: 8px 0;
}
.auth-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 12px;
  font-size: 0.75rem;
  opacity: 0.6;
}
.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-top: 1px solid currentColor;
  opacity: 0.4;
}
.auth-google-slot {
  display: flex;
  justify-content: center;
  min-height: 44px;
}
.auth-apple-btn {
  width: 100%;
  margin-top: 10px;
  background: #000;
  color: #fff;
}
.auth-account-line {
  margin: 4px 0 10px;
  word-break: break-all;
}
.auth-verified-badge {
  color: #2a9d8f;
  font-size: 0.85rem;
  margin: 0 0 8px;
}
.auth-actions {
  margin-top: 20px;
}
.auth-error {
  margin-top: 12px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
.auth-success {
  margin: 8px 0;
  font-size: 0.85rem;
  color: #2a9d8f;
}
.auth-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.6;
}
.auth-close:hover {
  opacity: 1;
}
</style>
