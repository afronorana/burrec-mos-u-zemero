// Vite plugin for the static site: renders the landing page into index.html
// (<!--site:head--> / <!--site:body-->), emits every other page as
// <path>/index.html plus sitemap.xml at build time, and serves them in dev.
// Content lives in site/pages.js; changes there need a dev-server restart.

import { renderBody, renderHead, renderPage, ORIGIN } from './layout.js';
import { LANDING_EN, PAGES, ALL_PAGES } from './pages.js';

// Runs before anything renders: skip the landing page and boot the game
// straight away for invite/match links (#c=, #m=), email links (#verify=,
// #reset=), #admin, ?play, and returning players (they have a name).
// ?hl=en|sq presets the game's language. src/boot.js does the rest.
const LANDING_HEAD = `<script>
    (function () {
      var q = new URLSearchParams(location.search);
      var play = location.hash.length > 1 || q.has('play');
      try {
        var hl = q.get('hl');
        if (hl === 'en' || hl === 'sq') localStorage.setItem('burrec.settings.locale', hl);
        if (!play && localStorage.getItem('burrec.online.displayName')) play = true;
      } catch (e) {}
      if (play) document.documentElement.className += ' play';
    })();
  </script>
  <style>.play #landing{display:none}</style>`;

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...ALL_PAGES.map((page) => ({ path: page.path, alternates: page.alternates })),
    { path: '/privacy-policy' },
    { path: '/terms-and-conditions' },
  ];
  const body = urls.map(({ path, alternates }) => {
    const links = alternates && Object.keys(alternates).length > 1
      ? Object.entries(alternates).map(([l, p]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN + p}"/>`).join('')
        + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN + alternates.en}"/>`
      : '';
    return `  <url>\n    <loc>${ORIGIN + path}</loc>\n    <lastmod>${today}</lastmod>${links}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

export default function sitePages() {
  return {
    name: 'burrec-site-pages',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // The landing stylesheet gets an id so src/boot.js can drop it before
        // the game mounts (its element rules would leak into the game UI).
        const head = renderHead({ ...LANDING_EN, head: LANDING_HEAD }).replace('<style>', '<style id="site-css">');
        return html
          .replace('<!--site:head-->', head)
          .replace('<!--site:body-->', `<div id="landing">\n${renderBody(LANDING_EN)}\n</div>`);
      },
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || '').split(/[?#]/)[0].replace(/\/$/, '');
        if (path === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemap());
          return;
        }
        const page = PAGES.find((p) => p.path === path);
        if (!page) {
          next();
          return;
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(renderPage(page));
      });
    },

    generateBundle() {
      PAGES.forEach((page) => {
        this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}/index.html`, source: renderPage(page) });
      });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
  };
}
