import { reactive } from 'vue';

// Cookie consent (privacy policy §1: Google Analytics). index.html sets Google
// Consent Mode v2 defaults from the stored choice before the tag loads; this
// records a new choice and flips analytics_storage live. Ads signals stay
// denied — the game shows no ads.
const STORAGE_KEY = 'burrec.cookieConsent';

function readChoice() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  } catch (error) {
    return null;
  }
}

export const consent = reactive({ choice: readChoice() });

export function setConsent(accepted) {
  const choice = accepted ? 'accepted' : 'rejected';
  consent.choice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch (error) {
    // Storage blocked: the choice holds for this visit only.
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: accepted ? 'granted' : 'denied' });
  }
}
