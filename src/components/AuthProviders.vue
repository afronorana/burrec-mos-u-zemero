<template>
  <!-- Sign-in choices shared by the start screen, the Profile sheet and the
       auth modal. Apple first (App Store guideline 4.8: at least as prominent
       as any other third-party sign-in); Google can only be its own rendered
       button. Each provider keeps its own colours — App Review reads a
       recoloured Sign in with Apple button as a violation. -->
  <div class="auth-providers">
    <app-button v-if="appleEnabled" class="auth-providers__button auth-providers__button--apple" :disabled="busy" @click="signInApple">
      <span class="auth-providers__inner">
        <provider-mark provider="apple" :size="16" />
        <span>{{ t('auth.continueApple') }}</span>
      </span>
    </app-button>
    <div v-if="googleEnabled" ref="googleBtn" class="auth-providers__google"></div>
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
import { appleEnabled, appleIdToken, googleEnabled, mountGoogleButton } from '../utils/socialAuth';
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
  mounted() {
    if (this.googleEnabled) {
      const width = Math.min(320, Math.max(200, this.$el.clientWidth || 280));
      mountGoogleButton(this.$refs.googleBtn, (idToken) => this.finish(() => NakamaClient.loginSocial('google', idToken)), width, ApplicationStore.settings.locale)
        .catch(() => {
          // Script blocked/offline: the other choices still work.
        });
    }
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
.auth-providers__google {
  display: flex;
  justify-content: center;
  min-height: 44px;
}
.auth-providers__error {
  margin: 0;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
</style>
