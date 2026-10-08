// Entry point of index.html. The landing page (plain HTML rendered by
// site/plugin.js) needs no JavaScript; the 3D game — three.js, physics, the
// Nakama client — is only downloaded when someone presses Play, or right away
// when the inline head script marked the page `.play` (invite/match/email
// links, ?play, returning players).

const GAME_VIEWPORT = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

let starting = null;

function startGame() {
  if (starting) return starting;
  starting = import('./main.js').then(({ mountGame }) => {
    // ?play / ?hl did their job; keep refreshes and shared URLs clean.
    const url = new URL(window.location.href);
    if (url.searchParams.has('play') || url.searchParams.has('hl')) {
      url.searchParams.delete('play');
      url.searchParams.delete('hl');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    // The landing's element styles (h1, p, body…) would leak into the game UI.
    document.getElementById('landing')?.remove();
    document.getElementById('site-css')?.remove();
    document.querySelector('meta[name="viewport"]')?.setAttribute('content', GAME_VIEWPORT);
    document.documentElement.classList.add('play');
    mountGame();
  });
  return starting;
}

if (document.documentElement.classList.contains('play')) {
  startGame();
} else {
  document.addEventListener('click', (event) => {
    const link = event.target.closest && event.target.closest('a[data-play]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    link.setAttribute('aria-busy', 'true');
    link.textContent = 'Loading…';
    startGame().catch(() => {
      // A failed chunk load (deploy mid-visit, flaky network): a full page
      // load of the same link boots the game from scratch.
      window.location.href = link.href;
    });
  });
}
