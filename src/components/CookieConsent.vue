<template>
  <transition name="cookie-fade">
    <div v-if="!consent.choice" class="cookie-consent" role="dialog" aria-live="polite" :aria-label="t('cookies.title')">
      <div class="cookie-consent__card">
        <p class="cookie-consent__text">
          {{ t('cookies.message') }}
          <a href="./privacy-policy/" target="_blank" rel="noopener">{{ t('legal.privacy') }}</a>
        </p>
        <div class="cookie-consent__actions">
          <button type="button" class="cookie-consent__reject" @click="setConsent(false)">{{ t('cookies.reject') }}</button>
          <app-button small @click="setConsent(true)">{{ t('cookies.accept') }}</app-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { consent, setConsent } from '../utils/consent';
import { t } from '../utils/i18n';

export default {
  data() {
    return { consent };
  },
  methods: { t, setConsent },
};
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  padding: 12px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  pointer-events: none;
}
.cookie-consent__card {
  pointer-events: all;
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 12px;
  box-shadow: 0 4px 0 0 #1f3322;
  color: var(--agu-color-base, #263f2a);
}
.cookie-consent__text {
  flex: 1;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
}
.cookie-consent__text a {
  color: inherit;
}
.cookie-consent__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.cookie-consent__reject {
  padding: 0;
  font: inherit;
  font-size: 0.75rem;
  color: inherit;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.75;
}
@media (max-width: 480px) {
  .cookie-consent__card {
    flex-direction: column;
    align-items: stretch;
  }
  .cookie-consent__actions {
    justify-content: flex-end;
  }
}
.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
