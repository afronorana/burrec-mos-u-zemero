// Persists "which online match am I in" so a page reload or tab reopen can put
// the player straight back. Two layers, deliberately:
//
//   1. URL hash (#m=<matchId>&c=<CODE>) — reflects the CURRENT match so a plain
//      refresh of the open tab restores it and the link is shareable.
//   2. identityStorage record — survives a full tab close (in prod, where
//      identity is localStorage) and drives the "continue this game?" prompt
//      when the player reopens the bare root URL.
//
// The record lives in identityStorage (sessionStorage in dev, localStorage in
// prod) on purpose: the seat can only be reclaimed by the identity stored in
// that same bucket, so the two must have the same lifetime.

import { identityStorage } from '../network/NakamaClient';

const RECORD_KEY = 'burrec.online.activeMatch';

// ---- identityStorage record (survives tab close in prod) ----

export function saveActiveMatch(record) {
  if (!record || !record.matchId) {
    return;
  }
  try {
    identityStorage.setItem(RECORD_KEY, JSON.stringify({
      matchId: record.matchId,
      mode: record.mode || null,
      joinCode: record.joinCode || null,
      ts: Date.now(),
    }));
  } catch (error) {
    // Private-mode / quota — non-fatal, resume just won't be offered.
  }
}

export function loadActiveMatch() {
  try {
    const raw = identityStorage.getItem(RECORD_KEY);
    if (!raw) {
      return null;
    }
    const record = JSON.parse(raw);
    return record && record.matchId ? record : null;
  } catch (error) {
    return null;
  }
}

export function clearActiveMatch() {
  try {
    identityStorage.removeItem(RECORD_KEY);
  } catch (error) {
    // Ignore.
  }
}

// ---- URL hash (shareable, survives refresh of the open tab) ----

export function writeMatchUrl(record) {
  if (typeof window === 'undefined' || !record || !record.matchId) {
    return;
  }
  const params = new URLSearchParams();
  params.set('m', record.matchId);
  if (record.joinCode) {
    params.set('c', record.joinCode);
  }
  const hash = `#${params.toString()}`;
  if (window.location.hash !== hash) {
    // Replace, not push: the match hash is state, not a navigable step.
    window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
  }
}

export function readMatchUrl() {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) {
    return null;
  }
  const params = new URLSearchParams(raw);
  const matchId = params.get('m');
  const code = params.get('c');
  if (!matchId && !code) {
    return null;
  }
  return { matchId: matchId || null, code: code || null };
}

export function clearMatchUrl() {
  if (typeof window === 'undefined' || !window.location.hash) {
    return;
  }
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Wipe every trace of the active match (explicit leave / game over).
export function clearMatchSession() {
  clearActiveMatch();
  clearMatchUrl();
}
