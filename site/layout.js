// Shared shell for the static site pages (the landing page at / and every
// content page): head with canonical/hreflang/OG/JSON-LD, header, footer and
// the inline stylesheet. Pages are plain data in site/pages.js; site/plugin.js
// renders them at build time (and serves them in dev).

export const ORIGIN = 'https://burrec.com';

const STRINGS = {
  en: {
    nav: [['/rules', 'Rules'], ['/modes', 'Game modes'], ['/faq', 'FAQ']],
    play: 'Play free',
    footerPlay: 'Play now',
    footerHeads: ['Play', 'Learn', 'About'],
    footerPlayLinks: [['/play-with-friends', 'With friends'], ['/play-vs-computer', 'Against the Computer'], ['/pass-and-play', 'On one device']],
    footerLearn: [['/rules', 'Rules'], ['/modes', 'Game modes'], ['/faq', 'FAQ'], ['/ludo-around-the-world', 'Names around the world']],
    footerAbout: [['/privacy-policy', 'Privacy Policy'], ['/terms-and-conditions', 'Terms']],
    tagline: 'Free 3D Ludo in your browser.',
    switchLabel: 'Shqip',
    home: 'Home',
  },
  sq: {
    nav: [['/sq/rregullat', 'Rregullat'], ['/modes', 'Mënyrat e lojës'], ['/sq#pyetje', 'Pyetje']],
    play: 'Luaj falas',
    footerPlay: 'Luaj tani',
    footerHeads: ['Luaj', 'Mëso', 'Rreth nesh'],
    footerPlayLinks: [['/play-with-friends', 'Me shokët (EN)'], ['/play-vs-computer', 'Kundër Kompjuterit (EN)'], ['/pass-and-play', 'Në një pajisje (EN)']],
    footerLearn: [['/sq/rregullat', 'Rregullat'], ['/modes', 'Mënyrat e lojës (EN)'], ['/ludo-around-the-world', 'Emrat nëpër botë (EN)']],
    footerAbout: [['/privacy-policy', 'Privatësia'], ['/terms-and-conditions', 'Kushtet']],
    tagline: 'Burrec mos u zemëro falas në 3D, në shfletues.',
    switchLabel: 'English',
    home: 'Kreu',
  },
};

// Where the game starts: the root page boots the 3D game for ?play
// (src/boot.js); hl presets the game's language.
export function playHref(lang) {
  return lang === 'sq' ? '/?play&hl=sq' : '/?play';
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

const CSS = `
:root{--ink:#263f2a;--muted:#4f5f51;--cream:#fff8ec;--sand:#f8f1e1;--panel:#fff;--green:#71bd26;--green-dark:#4e8f17;--orange:#fdc25b;--orange-dark:#ee9448;--blue:#3a9bdc;--line:#e3d8bf;color-scheme:light}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font:400 17px/1.6 Outfit,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:linear-gradient(180deg,var(--cream),var(--sand))}
a{color:var(--ink)}
img,svg{max-width:100%;height:auto}
.wrap{max-width:1080px;margin:0 auto;padding-inline:16px}
.narrow{max-width:760px}
header.site{position:sticky;top:0;z-index:10;background:rgba(255,248,236,.94);backdrop-filter:blur(6px);border-bottom:2px solid var(--ink)}
header.site .wrap{display:flex;align-items:center;gap:16px;min-height:62px;flex-wrap:wrap;padding-block:6px}
.brand{display:flex;align-items:center;flex:0 0 auto}
.brand img{width:96px;height:auto;display:block}
nav.main{display:flex;gap:4px 18px;flex-wrap:wrap;flex:1 1 auto;font-weight:600}
nav.main a{text-decoration:none;padding:4px 0}
nav.main a:hover{text-decoration:underline}
.lang{font-size:14px;font-weight:600}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font:800 17px/1 Outfit,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.02em;text-decoration:none;color:#fff;background:var(--green);border:2px solid var(--ink);border-radius:12px;box-shadow:inset 0 -5px 0 var(--green-dark),0 3px 0 var(--ink);padding:14px 22px 17px;cursor:pointer}
.btn:hover{filter:brightness(1.05)}
.btn:active{transform:translateY(2px);box-shadow:inset 0 -3px 0 var(--green-dark),0 1px 0 var(--ink)}
.btn:focus-visible,a:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.btn--small{font-size:14px;padding:9px 14px 12px}
.btn--alt{background:var(--orange);color:var(--ink);box-shadow:inset 0 -5px 0 var(--orange-dark),0 3px 0 var(--ink)}
.btn[aria-busy=true]{opacity:.8;cursor:progress}
h1,h2,h3{line-height:1.15;text-wrap:balance;margin:0}
h1{font-size:clamp(2rem,5vw,3.1rem);font-weight:800;letter-spacing:-.01em}
h2{font-size:clamp(1.45rem,3vw,1.9rem);font-weight:800;margin-top:56px}
h3{font-size:1.15rem;font-weight:700}
p,li{max-width:68ch}
.lede{font-size:1.15rem;color:var(--muted);margin:14px 0 0}
.hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-block:44px 16px}
.hero-copy{min-width:0}
.hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;margin-top:24px}
.hero-note{font-size:14px;color:var(--muted);font-weight:600}
.hero-shot{border:3px solid var(--ink);border-radius:18px;box-shadow:0 6px 0 var(--ink);overflow:hidden;background:#8fd0ff;aspect-ratio:16/9}
.hero-shot img{display:block;width:100%;height:100%;object-fit:cover}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:20px}
.card{background:var(--panel);border:2px solid var(--ink);border-radius:14px;box-shadow:0 4px 0 var(--ink);padding:18px 20px;min-width:0}
.card p{margin:8px 0 0;color:var(--muted);font-size:16px}
.card a.more{display:inline-block;margin-top:10px;font-weight:700}
.card .dot{display:inline-block;width:14px;height:14px;border-radius:50%;border:2px solid var(--ink);margin-right:8px;vertical-align:-1px}
.page-head{padding-block:40px 8px}
.crumbs{font-size:14px;color:var(--muted);margin-bottom:10px}
.crumbs a{color:var(--muted)}
.answer{font-size:1.12rem;background:var(--panel);border:2px solid var(--ink);border-left-width:8px;border-left-color:var(--green);border-radius:12px;padding:14px 18px;margin:20px 0 0;max-width:none}
.prose h2{margin-top:44px}
.prose h3{margin-top:28px}
.prose ul,.prose ol{padding-left:22px}
.prose li+li{margin-top:6px}
.figure{display:grid;grid-template-columns:minmax(0,360px) 1fr;gap:24px;align-items:center;margin-top:24px}
.figure figcaption{color:var(--muted);font-size:15px}
.board{display:block;width:100%;max-width:360px}
.table-wrap{overflow-x:auto;margin-top:16px;border:2px solid var(--ink);border-radius:12px;background:var(--panel)}
table{border-collapse:collapse;width:100%;min-width:520px;font-size:16px}
th,td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
tr:last-child td{border-bottom:0}
details{background:var(--panel);border:2px solid var(--ink);border-radius:12px;padding:12px 18px;margin-top:10px}
details summary{font-weight:700;cursor:pointer}
details p{margin:10px 0 2px;color:var(--muted)}
.cta-band{margin-top:56px;background:var(--orange);border:2px solid var(--ink);border-radius:16px;box-shadow:inset 0 -6px 0 var(--orange-dark);padding:24px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
.cta-band p{margin:0;font-weight:700;font-size:1.15rem}
footer.site{margin-top:64px;border-top:2px solid var(--ink);background:var(--panel);padding-block:32px 40px;font-size:15px}
footer.site .cols{display:grid;grid-template-columns:1.3fr repeat(3,1fr);gap:24px}
footer.site h3{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
footer.site ul{list-style:none;margin:0;padding:0}
footer.site li{margin:4px 0}
footer.site .fine{color:var(--muted);margin-top:20px}
@media (max-width:820px){.hero{grid-template-columns:1fr;padding-top:28px}.cards{grid-template-columns:1fr}.figure{grid-template-columns:1fr}footer.site .cols{grid-template-columns:1fr 1fr}}
@media (max-width:520px){nav.main{order:3;flex-basis:100%;font-size:15px}.brand img{width:80px}header.site .btn--small{margin-left:auto}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
`;

function header(lang, alternates) {
  const s = STRINGS[lang];
  const other = lang === 'en' ? 'sq' : 'en';
  const switchHref = (alternates && alternates[other]) || (other === 'sq' ? '/sq' : '/');
  return `<header class="site"><div class="wrap">
<a class="brand" href="${lang === 'sq' ? '/sq' : '/'}" aria-label="Burrec mos u zemëro – ${s.home}"><img src="/logo.png" alt="Burrec mos u zemëro" width="294" height="180"></a>
<nav class="main" aria-label="Main">${s.nav.map(([h, l]) => `<a href="${h}">${esc(l)}</a>`).join('')}<a class="lang" href="${switchHref}" hreflang="${other}" lang="${other}">${s.switchLabel}</a></nav>
<a class="btn btn--small" href="${playHref(lang)}" data-play>${esc(s.play)}</a>
</div></header>`;
}

function footer(lang) {
  const s = STRINGS[lang];
  const list = (links) => `<ul>${links.map(([h, l]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul>`;
  return `<footer class="site"><div class="wrap"><div class="cols">
<div><img src="/logo.png" alt="" width="110" height="67" loading="lazy"><p>${esc(s.tagline)}</p><a class="btn btn--small" href="${playHref(lang)}" data-play>${esc(s.footerPlay)}</a></div>
<div><h3>${s.footerHeads[0]}</h3>${list(s.footerPlayLinks)}</div>
<div><h3>${s.footerHeads[1]}</h3>${list(s.footerLearn)}</div>
<div><h3>${s.footerHeads[2]}</h3>${list(s.footerAbout)}<p>support@burrec.com</p></div>
</div><p class="fine">© 2026 Burrec mos u zemëro</p></div></footer>`;
}

export function ctaBand(lang, text) {
  const s = STRINGS[lang];
  return `<div class="cta-band"><p>${esc(text)}</p><a class="btn" href="${playHref(lang)}" data-play>${esc(s.footerPlay)}</a></div>`;
}

export function breadcrumbs(lang, trail) {
  const s = STRINGS[lang];
  const items = [[lang === 'sq' ? '/sq' : '/', s.home], ...trail];
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([h, l], i) => (i < items.length - 1 ? `<a href="${h}">${esc(l)}</a> › ` : esc(l))).join('')}</nav>`;
}

function breadcrumbLd(lang, trail) {
  const s = STRINGS[lang];
  const items = [[lang === 'sq' ? '/sq' : '/', s.home], ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([h, l], i) => ({ '@type': 'ListItem', position: i + 1, name: l, item: ORIGIN + h })),
  };
}

// Google tag behind Consent Mode v2: analytics stays denied unless the
// visitor accepted cookies in the game's banner (src/utils/consent.js).
const ANALYTICS = `<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    (function () {
      var consent = 'denied';
      try {
        if (window.localStorage.getItem('burrec.cookieConsent') === 'accepted') consent = 'granted';
      } catch (e) {}
      gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: consent });
      gtag('js', new Date());
      gtag('config', 'G-57PQXLXMRV');
    })();
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-57PQXLXMRV"></script>`;

// page: { path, lang, title, description, alternates: {en, sq}, trail,
//   body, jsonld: [], head: '' (extra head html) }
export function renderHead(page) {
  const url = ORIGIN + page.path;
  const alternates = page.alternates || { [page.lang]: page.path };
  const hreflang = Object.entries(alternates).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN + p}">`).join('\n  ')
    + (alternates.en && Object.keys(alternates).length > 1 ? `\n  <link rel="alternate" hreflang="x-default" href="${ORIGIN + alternates.en}">` : '');
  const graph = [...(page.jsonld || [])];
  if (page.trail) graph.push(breadcrumbLd(page.lang, page.trail));
  const ld = graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>` : '';
  const image = page.image || `${ORIGIN}/og-image.jpg`;
  return `<meta charset="UTF-8">
  <meta name="viewport" content="${page.viewport || 'width=device-width, initial-scale=1.0'}">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  ${Object.keys(alternates).length > 1 ? hreflang : ''}
  <meta name="theme-color" content="#71bd26">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Burrec mos u zemëro">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="The Burrec mos u zemëro logo over a 3D game board in a meadow">
  <meta property="og:locale" content="${page.lang === 'sq' ? 'sq_AL' : 'en_US'}">
  <meta property="og:locale:alternate" content="${page.lang === 'sq' ? 'en_US' : 'sq_AL'}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap">
  ${ld}
  ${ANALYTICS}
  ${page.head || ''}
  <style>${CSS.trim()}</style>`;
}

export function renderBody(page) {
  const alternates = page.alternates || { [page.lang]: page.path };
  return `${header(page.lang, alternates)}
<main>${page.body}</main>
${footer(page.lang)}`;
}

export function renderPage(page) {
  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  ${renderHead(page)}
</head>
<body>
${renderBody(page)}
</body>
</html>
`;
}

export { esc, STRINGS };
