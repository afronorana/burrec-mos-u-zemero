// Sharing out of the game: room invites and the end-of-game card. Every share
// carries a burrec.com link (plain, no UTM: player-to-player links should look
// clean), so chats show a preview card instead of a bare code.
//
// Phones get the system share sheet; desktops copy to the clipboard, where a
// share sheet is an odd detour. Resolves 'shared' | 'copied' | 'downloaded' |
// 'cancelled' | 'failed'.

import { t } from './i18n';

function siteUrl() {
  // origin + path keeps the GitHub Pages subpath working too.
  return window.location.origin + window.location.pathname;
}

function prefersShareSheet() {
  return typeof navigator.share === 'function'
    && window.matchMedia
    && window.matchMedia('(pointer: coarse)').matches;
}

// #c=CODE is read by matchSession.readMatchUrl on load: a visitor without a
// name gets the invite on the start screen, anyone else joins straight away.
export function roomInviteUrl(code) {
  return `${siteUrl()}#c=${encodeURIComponent(code)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch (error) {
    return 'failed'; // insecure origin / permission: the code is on screen
  }
}

export async function shareRoomInvite(code) {
  if (!code) return 'failed';
  const url = roomInviteUrl(code);
  const text = t('online.inviteText', { code });
  if (prefersShareSheet()) {
    try {
      await navigator.share({ title: t('title'), text, url });
      return 'shared';
    } catch (error) {
      if (error && error.name === 'AbortError') return 'cancelled';
      // Fall through to the clipboard.
    }
  }
  return copyText(`${text} ${url}`);
}

// Share an image (the win card) with a caption. Desktops, and phones that
// can't share files, download it instead so it can still be posted by hand.
export async function shareImage(blob, filename, text) {
  const url = siteUrl();
  const file = new File([blob], filename, { type: blob.type });
  if (prefersShareSheet() && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text: `${text} ${url}` });
      return 'shared';
    } catch (error) {
      if (error && error.name === 'AbortError') return 'cancelled';
    }
  }
  try {
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    return 'downloaded';
  } catch (error) {
    return 'failed';
  }
}
