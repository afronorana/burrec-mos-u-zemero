<template>
  <!-- Sign-in choices shared by the start screen, the Profile sheet and the
       auth modal. Apple first (App Store guideline 4.8: at least as prominent
       as any other third-party sign-in). Each provider keeps its own colours —
       App Review reads a recoloured Sign in with Apple button as a violation;
       Google's branding asks for its logo on white. -->
  <div class="auth-providers">
    <app-button v-if="appleEnabled" class="auth-providers__button auth-providers__button--apple" :disabled="busy" @click="signInApple">
      <span class="auth-providers__inner">
        <provider-mark provider="apple" :size="16" />
        <span>{{ t('auth.continueApple') }}</span>
      </span>
    </app-button>
    <app-button v-if="googleEnabled" class="auth-providers__button auth-providers__button--google" :disabled="busy" @click="signInGoogle">
      <span class="auth-providers__inner">
        <provider-mark provider="google" :size="16" />
        <span>{{ t('auth.continueGoogle') }}</span>
      </span>
    </app-button>
    <app-button v-if="showEmail" blue class="auth-providers__button" :disabled="busy" @click="$emit('email')">
      <span class="auth-providers__inner">
        <provider-mark provider="email" :size="16" />
        <span>{{ t('auth.continueEmail') }}</span>
      </span>
    </app-button>
    <p v-if="error" class="auth-providers__error">{{ t(`errors.${error}`) }}</p>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';
import ProviderMark from './ProviderMark.vue';
import { appleEnabled, appleIdToken, googleEnabled, googleIdToken } from '../utils/socialAuth';
import { t } from '../utils/i18n';

export default {
  components: { ProviderMark },
  props: {
    showEmail: { type: Boolean, default: false },
  },
  emits: ['email', 'done'],
  data() {
    return { appleEnabled, googleEnabled, busy: false, error: null };
  },
  methods: {
    t,
    async finish(action) {
      this.busy = true;
      this.error = null;
      try {
        await action();
        this.$emit('done');
      } catch (error) {
        this.error = error && error.message ? error.message : 'generic';
      } finally {
        this.busy = false;
      }
    },
    signInGoogle() {
      // Opened synchronously inside the click, before any await.
      const token = googleIdToken(ApplicationStore.settings.locale);
      this.finish(async () => NakamaClient.loginSocial('google', await token));
    },
    signInApple() {
      this.finish(async () => NakamaClient.loginSocial('apple', await appleIdToken()));
    },
  },
};
</script>

<style scoped>
.auth-providers {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}
.auth-providers__button :deep(.button__content) {
  width: 100%;
}
/* The kit derives bevels/hover from --agu-btn-bg/--agu-btn-fg; the extra
   .button beats the kit's own scoped .button[data-v-*]. */
.auth-providers__button.button.auth-providers__button--apple {
  --agu-btn-bg: #000000;
  --agu-btn-fg: #ffffff;
}
.auth-providers__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}
.auth-providers__button.button.auth-providers__button--google {
  --agu-btn-bg: #ffffff;
  --agu-btn-fg: var(--agu-color-base, #263f2a);
}
.auth-providers__error {
  margin: 0;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
</style>
