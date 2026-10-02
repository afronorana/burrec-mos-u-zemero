import ApplicationStore from './ApplicationStore';

// Send a Guest to the auth modal from a Members-only spot (chat, Wardrobe).
// An email login that only lacks verification lands on the account view
// (resend link) instead of a register form it can't use.
// Block / Report sheet for another player (PlayerActions.vue). Ignores our
// own seat/messages and offline-only senders.
export function openPlayerActions({ userId, name, messageId = null, messageText = null }) {
  const online = ApplicationStore.online;
  if (!userId || userId === online.selfUserId || String(userId).startsWith('local')) {
    return;
  }
  online.playerActions = { userId, name, messageId, messageText };
}

export function promptRegister(reason) {
  const online = ApplicationStore.online;
  online.authReason = reason;
  online.authView = online.account.method === 'email' ? 'account' : 'register';
  online.authOpen = true;
}
