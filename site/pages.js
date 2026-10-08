// Every static page of burrec.com: the landing pages (/ and /sq) and the
// content pages. Facts about play must match the code: nakama/src/ludo_logic.ts
// (rules), match_handler.ts (3 rolls when all pawns are home, 60 s turn timer
// in rooms, none at Solo / Around-the-table tables), shared/protocol.js (modes).
// Every mode needs an internet connection — never call one "offline".

import { ORIGIN, breadcrumbs, ctaBand, playHref } from './layout.js';
import { boardSvg } from './board.js';

const ALT_HOME = { en: '/', sq: '/sq' };
const ALT_RULES = { en: '/rules', sq: '/sq/rregullat' };

const GAME_LD = {
  '@type': ['VideoGame', 'WebApplication'],
  '@id': `${ORIGIN}/#game`,
  name: 'Burrec mos u zemëro',
  alternateName: ['Burrec mos u zemero', 'Burrec', '3D Ludo online', 'Mensch ärgere dich nicht online'],
  description: 'A free online 3D version of the classic race board game Burrec mos u zemëro (Mensch ärgere dich nicht, a Ludo-style game) for 1 to 4 players, played in the browser.',
  url: `${ORIGIN}/`,
  image: `${ORIGIN}/og-image.jpg`,
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web browser',
  gamePlatform: 'Web browser',
  genre: ['Board game', 'Ludo', 'Family game'],
  playMode: ['SinglePlayer', 'MultiPlayer'],
  numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4 },
  inLanguage: ['en', 'sq'],
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@id': `${ORIGIN}/#org` },
};
const SITE_LD = [
  { '@type': 'Organization', '@id': `${ORIGIN}/#org`, name: 'Burrec mos u zemëro', url: `${ORIGIN}/`, logo: `${ORIGIN}/icon-512.png`, email: 'support@burrec.com' },
  { '@type': 'WebSite', '@id': `${ORIGIN}/#site`, url: `${ORIGIN}/`, name: 'Burrec mos u zemëro', alternateName: ['Burrec mos u zemero', 'Burrec'], inLanguage: ['en', 'sq'], publisher: { '@id': `${ORIGIN}/#org` } },
  GAME_LD,
];

function faqLd(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
  };
}

function faqHtml(items) {
  return items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n');
}

const HERO_IMG = (alt) => `<div class="hero-shot"><img src="/hero-1280.webp" srcset="/hero-640.webp 640w, /hero-1280.webp 1280w" sizes="(max-width: 820px) 100vw, 520px" width="1280" height="720" alt="${alt}" fetchpriority="high"></div>`;

const DOT = (c) => `<span class="dot" style="background:${c}" aria-hidden="true"></span>`;

// ───────────────────────── Landing: English ─────────────────────────

const FAQ_EN = [
  ['Is Burrec mos u zemëro free?', 'Yes. The whole game is free and runs in your browser on a phone, tablet or computer. There is nothing to download.'],
  ['Do I need an account?', 'No. Type a name and play as a guest. A free account (email, Google or Apple) adds chat, pawn Props and Finishers, and keeps your name on every device.'],
  ['How do I play with friends?', 'Create a private room and tap the invite button: your friends get a link (or the 4-letter room code) and join with one tap. Seats nobody takes are played by the Computer, so you can start straight away.'],
  ['Can we play on one phone or tablet?', 'Yes. Choose <b>Around the table</b>: 2 to 4 people take turns on the same device, with no turn timer. It still needs an internet connection.'],
  ['How do I get a pawn out of home?', 'Roll a 6. The pawn moves onto your start field and you roll again. While all four of your pawns are at home, you get up to three rolls per turn to get that 6.'],
  ['What happens when I land on another pawn?', 'It is captured and goes back to its home. Pawns in their finish lane are safe. You can jump over any pawn, so there are no blockades.'],
];

const landingEn = {
  path: '/',
  lang: 'en',
  title: 'Burrec mos u zemëro – Free 3D Ludo Online, No Download',
  ogTitle: 'Burrec mos u zemëro – Free 3D Ludo Online',
  description: 'Play Burrec mos u zemëro (Ludo / Mensch ärgere dich nicht) free in 3D: invite friends with a link, play the Computer, or pass one phone around the table. No download, no sign-up.',
  alternates: ALT_HOME,
  jsonld: [...SITE_LD, faqLd(FAQ_EN)],
  body: `<div class="wrap">
<section class="hero">
  <div class="hero-copy">
    <h1>Play Ludo online – free, in 3D, no download</h1>
    <p class="lede"><b>Burrec mos u zemëro</b> is the classic family race game (Ludo, <i lang="de">Mensch ärgere dich nicht</i>) rebuilt in 3D with real dice physics. Invite friends with a link, take on the Computer, or pass one phone around the table.</p>
    <div class="hero-cta">
      <a class="btn" href="${playHref('en')}" data-play>Play free now</a>
      <span class="hero-note">No download · No sign-up · Phone or computer</span>
    </div>
  </div>
  ${HERO_IMG('The 3D Burrec mos u zemëro board with red, yellow, blue and green fields in a meadow')}
</section>

<h2>Three ways to play</h2>
<div class="cards">
  <div class="card"><h3>${DOT('#CE0000')}With friends</h3><p>Create a private room and send the invite link. Up to four players, from anywhere. Empty seats are played by the Computer.</p><a class="more" href="/play-with-friends">How rooms work →</a></div>
  <div class="card"><h3>${DOT('#F7D708')}Against the Computer</h3><p>You against three Computers, whenever you like. No turn timer, and the game waits if you step away.</p><a class="more" href="/play-vs-computer">Play vs Computer →</a></div>
  <div class="card"><h3>${DOT('#009ECE')}Around the table</h3><p>2 to 4 people share one phone or tablet and pass it on each turn. Made for family nights.</p><a class="more" href="/pass-and-play">Pass and play →</a></div>
</div>

<h2>Three game modes</h2>
<div class="cards">
  <div class="card"><h3>Classic</h3><p>The full game: roll a 6 to leave home and bring all four pawns into your finish lane.</p></div>
  <div class="card"><h3>Quick</h3><p>Everyone starts with one pawn already out. The first pawn to reach its finish lane wins.</p></div>
  <div class="card"><h3>First capture</h3><p>Sudden death: the first player to capture another pawn wins the game.</p></div>
</div>
<p><a href="/modes">Compare the game modes →</a></p>

<h2>How to play in 30 seconds</h2>
<div class="figure">
  ${boardSvg('The Burrec mos u zemëro board: a 40-field track, four colored start fields, finish lanes and home corners')}
  <ol>
    <li>Everyone has four pawns at home. Roll a <b>6</b> to bring one onto your start field, then roll again.</li>
    <li>Move clockwise by the number you roll. Every 6 gives you another roll.</li>
    <li>Land exactly on an opponent's pawn to <b>capture</b> it and send it home.</li>
    <li>After one lap, turn into your own finish lane. You can't overshoot its end.</li>
    <li>The first player with all four pawns in the finish lane wins.</li>
  </ol>
</div>
<p><a href="/rules">Read the full rules →</a></p>

<h2>Made to be played, not installed</h2>
<div class="cards">
  <div class="card"><h3>Real 3D dice</h3><p>The dice tumble with real physics. The server rolls the value, so every roll is fair for everyone at the table.</p></div>
  <div class="card"><h3>Finishers</h3><p>Captures play out as short cinematics: a magic wand, a UFO, a trapdoor and more.</p></div>
  <div class="card"><h3>Dress your pawns</h3><p>Hats and props for each pawn, and the flag of your country waving from your pawn.</p></div>
</div>

<h2 id="faq">Questions</h2>
${faqHtml(FAQ_EN)}
<p><a href="/faq">More questions →</a></p>

${ctaBand('en', 'Ready to roll? It takes ten seconds to start.')}
</div>`,
};

// ───────────────────────── Landing: Albanian ─────────────────────────
// Native-speaker review pending (see the plan checklist).

const FAQ_SQ = [
  ['A është Burrec mos u zemëro falas?', 'Po. E gjithë loja është falas dhe luhet direkt në shfletues, në telefon, tablet ose kompjuter. Nuk ka asgjë për të shkarkuar.'],
  ['A më duhet llogari?', 'Jo. Shkruaj një emër dhe luaj si mysafir. Me një llogari falas (email, Google ose Apple) mund të bisedosh, të veshësh pionët dhe ta ruash emrin në çdo pajisje.'],
  ['Si të luaj me shokët?', 'Krijo një dhomë private dhe shtyp butonin e ftesës: shokët marrin një link (ose kodin me 4 shkronja) dhe hyjnë me një prekje. Vendet e lira i luan Kompjuteri, kështu që mund të filloni menjëherë.'],
  ['A mund të luajmë në një telefon?', 'Po. Zgjidh <b>Rreth tavolinës</b>: 2 deri në 4 veta luajnë me radhë në të njëjtën pajisje, pa kohëmatës. Duhet vetëm lidhje me internetin.'],
  ['Si e nxjerr pionin nga shtëpia?', 'Duhet të hedhësh 6. Pioni del në fushën e nisjes dhe hedh sërish. Kur të katër pionët janë në shtëpi, ke deri në tri hedhje për ta nxjerrë gjashtën.'],
  ['Çfarë ndodh kur bie mbi pionin e tjetrit?', 'E kap dhe ai kthehet në shtëpi. Pionët në rrugën e fundit janë të sigurt. Mund të kërcesh mbi çdo pion.'],
];

const landingSq = {
  path: '/sq',
  lang: 'sq',
  title: 'Burrec mos u zemëro – Luaje falas online në 3D',
  ogTitle: 'Burrec mos u zemëro – Luaje falas online',
  description: 'Burrec mos u zemëro (burrec mos u zemero) falas në 3D: luaj me shokët me një link, kundër Kompjuterit ose rreth tavolinës në një telefon. Pa shkarkim, pa regjistrim.',
  alternates: ALT_HOME,
  jsonld: [...SITE_LD, faqLd(FAQ_SQ)],
  body: `<div class="wrap">
<section class="hero">
  <div class="hero-copy">
    <h1>Burrec mos u zemëro – luaje online, falas</h1>
    <p class="lede">Loja e njohur e familjes, tani në 3D me zare të vërteta. Ftoji shokët me një link, luaj kundër Kompjuterit ose luani të gjithë në një telefon. Pa shkarkim, pa regjistrim – vetëm hidh zarin.</p>
    <div class="hero-cta">
      <a class="btn" href="${playHref('sq')}" data-play>Luaj tani falas</a>
      <span class="hero-note">Pa shkarkim · Pa regjistrim · Telefon ose kompjuter</span>
    </div>
  </div>
  ${HERO_IMG('Fusha 3D e lojës Burrec mos u zemëro me fusha të kuqe, të verdha, blu dhe jeshile në një livadh')}
</section>

<h2>Tri mënyra për të luajtur</h2>
<div class="cards">
  <div class="card"><h3>${DOT('#CE0000')}Me shokët</h3><p>Krijo një dhomë private dhe dërgo linkun e ftesës. Deri në katër lojtarë, nga kudo. Vendet e lira i luan Kompjuteri.</p></div>
  <div class="card"><h3>${DOT('#F7D708')}Kundër Kompjuterit</h3><p>Ti kundër tre Kompjuterëve, kur të duash. Pa kohëmatës, dhe loja të pret nëse largohesh.</p></div>
  <div class="card"><h3>${DOT('#009ECE')}Rreth tavolinës</h3><p>2 deri në 4 veta ndajnë një telefon ose tablet dhe ia kalojnë njëri-tjetrit në çdo radhë. Për mbrëmjet me familjen.</p></div>
</div>

<h2>Tri mënyra loje</h2>
<div class="cards">
  <div class="card"><h3>Klasike</h3><p>Loja e plotë: hidh 6 për të dalë nga shtëpia dhe çoji të katër pionët në fund.</p></div>
  <div class="card"><h3>E shpejtë</h3><p>Secili fillon me një pion jashtë. Fiton pioni i parë që hyn në rrugën e fundit.</p></div>
  <div class="card"><h3>Kapja e parë</h3><p>Vdekje e menjëhershme: fiton i pari që kap një pion tjetër.</p></div>
</div>

<h2>Si luhet, shkurt</h2>
<div class="figure">
  ${boardSvg('Fusha e lojës Burrec mos u zemëro: rruga me 40 fusha, katër fushat e nisjes, rrugët e fundit dhe shtëpitë')}
  <ol>
    <li>Secili ka katër pionë në shtëpi. Hidh <b>6</b> për të nxjerrë një në fushën e nisjes, pastaj hidh sërish.</li>
    <li>Lëviz në drejtim të akrepave të orës sa tregon zari. Çdo 6 të jep një hedhje tjetër.</li>
    <li>Bjer saktësisht mbi pionin e kundërshtarit për ta <b>kapur</b> dhe për ta kthyer në shtëpi.</li>
    <li>Pas një xhiroje, hyr në rrugën tënde të fundit. Nuk mund ta kalosh fundin e saj.</li>
    <li>Fiton i pari që i çon të katër pionët në fund.</li>
  </ol>
</div>
<p><a href="/sq/rregullat">Lexo rregullat e plota →</a></p>

<h2>E bërë për t'u luajtur</h2>
<div class="cards">
  <div class="card"><h3>Zare 3D</h3><p>Zari rrokulliset me fizikë të vërtetë. Vlerën e hedh serveri, kështu që çdo hedhje është e drejtë për të gjithë.</p></div>
  <div class="card"><h3>Animacione kapjeje</h3><p>Kapjet shfaqen si skena të shkurtra: shkop magjik, UFO, kapak që hapet dhe të tjera.</p></div>
  <div class="card"><h3>Vishi pionët</h3><p>Kapele dhe aksesorë për çdo pion, dhe flamuri i vendit tënd që valëvitet mbi pion.</p></div>
</div>

<h2 id="pyetje">Pyetje</h2>
${faqHtml(FAQ_SQ)}

${ctaBand('sq', 'Gati për të hedhur zarin? Fillon për dhjetë sekonda.')}
</div>`,
};

// ───────────────────────── Rules ─────────────────────────

const RULES_FAQ_EN = [
  ['Do you need a 6 to get out?', 'Yes. Only a 6 brings a pawn from home onto your start field, and only if none of your own pawns is standing there.'],
  ['How many times can you roll when all pawns are home?', 'Up to three times per turn, until you roll a 6. Once any pawn is out, you get one roll per turn (plus another for every 6).'],
  ['Can two of your own pawns share a field?', 'No. A move that would land on one of your own pawns is not allowed.'],
  ['Can you jump over pawns?', 'Yes. Pawns never block the way, yours or anyone else\'s.'],
  ['Is there a safe field?', 'Not on the track: a pawn on any track field, start fields included, can be captured. Pawns in a finish lane are safe.'],
  ['Do you get an extra roll for a capture?', 'No. Only a 6 gives an extra roll.'],
  ['Do you have to capture?', 'No. If several pawns can move, you choose which one.'],
  ['Do you need an exact roll to finish?', 'You can\'t move past the end of your finish lane. If a roll would take a pawn too far, that pawn can\'t move this turn.'],
  ['What if no pawn can move?', 'Your turn passes to the next player.'],
];

const rulesEn = {
  path: '/rules',
  lang: 'en',
  title: 'Burrec mos u zemëro Rules (Mensch ärgere dich nicht / Ludo) | Burrec',
  description: 'The complete rules of Burrec mos u zemëro, the Albanian name for Mensch ärgere dich nicht: setup, rolling a 6, captures, the finish lane, and the three-roll rule.',
  alternates: ALT_RULES,
  trail: [['/rules', 'Rules']],
  jsonld: [faqLd(RULES_FAQ_EN)],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/rules', 'Rules']])}<h1>Burrec mos u zemëro rules</h1></div>
<p class="answer"><b>Burrec mos u zemëro</b> is the Albanian name for <i lang="de">Mensch ärgere dich nicht</i>, a race game for 2 to 4 players. Each player moves four pawns once around a 40-field track and into their own finish lane. Roll a 6 to leave home, land on opponents to send them back, and be first to bring all four pawns home.</p>

<h2>The board</h2>
<div class="figure">
  ${boardSvg('The board: a 40-field track around a cross, with a colored start field, a 4-field finish lane and a home corner for each player')}
  <figcaption>The track has 40 fields. Each color has a home corner (4 pawns), a start field on the track, and a 4-field finish lane leading to the center. Pawns move clockwise; the arrow marks red's direction.</figcaption>
</div>

<h2>Setup</h2>
<ul>
  <li>Two to four players. In this game every seat nobody takes is played by the Computer, so a game always has four colors.</li>
  <li>Each player puts four pawns in their home corner.</li>
  <li>Red starts, and turns go clockwise.</li>
</ul>

<h2>Your turn</h2>
<ol>
  <li><b>Roll the dice</b> and move one pawn forward by exactly that many fields.</li>
  <li><b>Leaving home:</b> a 6 lets you bring a pawn from home onto your start field. It can't come out while one of your own pawns is on the start field.</li>
  <li><b>Rolling a 6</b> always gives you another roll after your move.</li>
  <li><b>All pawns at home:</b> you may roll up to three times in that turn to get a 6.</li>
  <li><b>No move possible:</b> the turn passes to the next player.</li>
</ol>

<h2>Moving and capturing</h2>
<ul>
  <li>You can jump over any pawn. There are no blockades.</li>
  <li>You can't land on your own pawn.</li>
  <li>Land exactly on an opponent's pawn on the track and it is <b>captured</b>: it goes back to its home and has to come out with a 6 again.</li>
  <li>There are no safe fields on the track. Pawns in a finish lane can't be captured.</li>
  <li>Capturing is never compulsory, and it doesn't give an extra roll.</li>
</ul>

<h2>The finish lane</h2>
<ul>
  <li>After a full lap, each pawn turns off the track into its own 4-field finish lane.</li>
  <li>You can't move past the end of the lane, so a roll that is too high leaves that pawn where it is.</li>
  <li>You win when all four of your pawns are in the finish lane.</li>
</ul>

<h2>Turn timer and leaving</h2>
<p>In online rooms each turn has a 60-second timer; when it runs out, the game moves for you. Games against the Computer and <a href="/pass-and-play">Around the table</a> games have no timer. If a player leaves a room, a Computer takes over their color with the pawns where they stand, and someone joining later can take that seat.</p>

<h2>Common questions</h2>
${faqHtml(RULES_FAQ_EN)}

<h2>How these rules differ from Ludo</h2>
<p>English Ludo uses a 52-square cross-shaped track with safe squares, and in many house rules a capture or three sixes changes your turn. Burrec mos u zemëro follows the German <i lang="de">Mensch ärgere dich nicht</i> board: a 40-field track, no safe fields, no blockades, and only a 6 earns an extra roll. See <a href="/ludo-around-the-world">the game's names around the world</a>.</p>

<p>Want a faster game? Try the <a href="/modes">Quick and First capture modes</a>.</p>
${ctaBand('en', 'Know the rules? Try them against the Computer.')}
</div>`,
};

const RULES_FAQ_SQ = [
  ['A duhet 6 për të dalë nga shtëpia?', 'Po. Vetëm 6-shja e nxjerr pionin në fushën e nisjes, dhe vetëm nëse aty nuk qëndron një pion yt.'],
  ['Sa herë hedh kur të gjithë pionët janë në shtëpi?', 'Deri në tri herë në radhë, derisa të bjerë 6. Kur ke qoftë edhe një pion jashtë, ke një hedhje në radhë (plus një tjetër për çdo 6).'],
  ['A mund të qëndrojnë dy pionët e mi në të njëjtën fushë?', 'Jo. Lëvizja që do të binte mbi pionin tënd nuk lejohet.'],
  ['A mund të kërcej mbi pionë?', 'Po. Pionët nuk e bllokojnë kurrë rrugën.'],
  ['A ka fusha të sigurta?', 'Jo në rrugë: pioni mund të kapet në çdo fushë, edhe në fushat e nisjes. Pionët në rrugën e fundit janë të sigurt.'],
  ['A merr hedhje shtesë kur kap?', 'Jo. Vetëm 6-shja të jep hedhje shtesë.'],
  ['A jam i detyruar të kap?', 'Jo. Nëse mund të lëvizin disa pionë, zgjedh ti cilin.'],
];

const rulesSq = {
  path: '/sq/rregullat',
  lang: 'sq',
  title: 'Rregullat e lojës Burrec mos u zemëro | Burrec',
  description: 'Rregullat e plota të lojës Burrec mos u zemëro (burrec mos u zemero): si dilet nga shtëpia me 6, kapjet, rruga e fundit dhe rregulli i tri hedhjeve.',
  alternates: ALT_RULES,
  trail: [['/sq/rregullat', 'Rregullat']],
  jsonld: [faqLd(RULES_FAQ_SQ)],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('sq', [['/sq/rregullat', 'Rregullat']])}<h1>Rregullat e lojës Burrec mos u zemëro</h1></div>
<p class="answer"><b>Burrec mos u zemëro</b> (gjermanisht <i lang="de">Mensch ärgere dich nicht</i>) është një lojë gare për 2 deri në 4 lojtarë. Secili lojtar i çon katër pionët një xhiro rreth një rruge me 40 fusha dhe pastaj në rrugën e vet të fundit. Hidh 6 për të dalë nga shtëpia, kap pionët e kundërshtarëve dhe bëhu i pari që i çon të katër pionët në fund.</p>

<h2>Fusha e lojës</h2>
<div class="figure">
  ${boardSvg('Fusha e lojës: rruga me 40 fusha rreth një kryqi, me fushën e nisjes, rrugën e fundit me 4 fusha dhe shtëpinë për secilën ngjyrë')}
  <figcaption>Rruga ka 40 fusha. Çdo ngjyrë ka një shtëpi në qoshe (4 pionë), një fushë nisjeje në rrugë dhe një rrugë të fundit me 4 fusha drejt qendrës. Pionët lëvizin në drejtim të akrepave të orës.</figcaption>
</div>

<h2>Përgatitja</h2>
<ul>
  <li>Dy deri në katër lojtarë. Në këtë lojë, çdo vend të lirë e luan Kompjuteri, kështu që loja ka gjithmonë katër ngjyra.</li>
  <li>Secili lojtar i vendos katër pionët në shtëpinë e vet.</li>
  <li>Fillon e kuqja, dhe radha shkon në drejtim të akrepave të orës.</li>
</ul>

<h2>Radha jote</h2>
<ol>
  <li><b>Hidh zarin</b> dhe lëviz një pion përpara saktësisht aq fusha.</li>
  <li><b>Dalja nga shtëpia:</b> me 6 nxjerr një pion në fushën e nisjes. Nuk mund të dalë nëse aty qëndron një pion yt.</li>
  <li><b>Me 6</b> hedh gjithmonë edhe një herë pas lëvizjes.</li>
  <li><b>Të gjithë pionët në shtëpi:</b> ke deri në tri hedhje në atë radhë për të nxjerrë 6.</li>
  <li><b>Asnjë lëvizje e mundshme:</b> radha kalon te lojtari tjetër.</li>
</ol>

<h2>Lëvizja dhe kapja</h2>
<ul>
  <li>Mund të kërcesh mbi çdo pion. Nuk ka bllokime.</li>
  <li>Nuk mund të bjerë mbi pionin tënd.</li>
  <li>Kur bie saktësisht mbi pionin e kundërshtarit në rrugë, e <b>kap</b>: ai kthehet në shtëpi dhe duhet të dalë sërish me 6.</li>
  <li>Në rrugë nuk ka fusha të sigurta. Pionët në rrugën e fundit nuk kapen.</li>
  <li>Kapja nuk është e detyrueshme dhe nuk të jep hedhje shtesë.</li>
</ul>

<h2>Rruga e fundit</h2>
<ul>
  <li>Pas një xhiroje të plotë, çdo pion hyn në rrugën e vet të fundit me 4 fusha.</li>
  <li>Nuk mund ta kalosh fundin e rrugës, kështu që me një hedhje shumë të madhe ai pion mbetet ku është.</li>
  <li>Fiton kur të katër pionët e tu janë në rrugën e fundit.</li>
</ul>

<h2>Kohëmatësi dhe largimi</h2>
<p>Në dhomat online çdo radhë ka 60 sekonda; kur mbaron koha, loja lëviz për ty. Lojërat kundër Kompjuterit dhe <b>Rreth tavolinës</b> nuk kanë kohëmatës. Nëse një lojtar largohet, ngjyrën e tij e merr Kompjuteri me pionët aty ku janë, dhe dikush që hyn më vonë mund ta zërë atë vend.</p>

<h2>Pyetje të shpeshta</h2>
${faqHtml(RULES_FAQ_SQ)}

<p>Do një lojë më të shpejtë? Provo mënyrat <a href="/modes">E shpejtë dhe Kapja e parë</a> (anglisht).</p>
${ctaBand('sq', 'I di rregullat? Provoji kundër Kompjuterit.')}
</div>`,
};

// ───────────────────────── Ways to play (EN) ─────────────────────────

const friends = {
  path: '/play-with-friends',
  lang: 'en',
  title: 'Play Ludo Online with Friends – Private Room, Free | Burrec',
  description: 'Play Ludo (Burrec mos u zemëro) online with friends: create a private room, send the invite link, and play together in 3D. Free, no download, Computer fills empty seats.',
  trail: [['/play-with-friends', 'Play with friends']],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/play-with-friends', 'Play with friends']])}<h1>Play Ludo online with friends</h1></div>
<p class="answer">Create a private room, send your friends the invite link, and play Burrec mos u zemëro together in 3D from any phone or computer. It's free, there's nothing to install, and any seat nobody takes is played by the Computer.</p>

<h2>Start a private room in three steps</h2>
<ol>
  <li><b>Press Play</b>, type your name and choose <b>Create room</b>. Pick a game mode: Classic, Quick or First capture.</li>
  <li><b>Tap the invite button</b> in the lobby. On a phone it opens your share sheet (WhatsApp, Messenger, SMS…); on a computer it copies the link. The room also has a 4-letter code your friends can type in.</li>
  <li><b>Pick your color</b> and press Start when everyone is in. You don't have to wait for four people: the Computer plays any free color.</li>
</ol>

<h2>What makes it work with friends</h2>
<ul>
  <li><b>Join from anywhere.</b> Friends in another city or country play in the same room.</li>
  <li><b>Drop in mid-game.</b> Someone late can open the link while you play and take over a Computer's color, pawns and all.</li>
  <li><b>Fair dice.</b> The server rolls every dice, so nobody can cheat the roll.</li>
  <li><b>Chat.</b> Registered players can chat in the room. Anyone can block or report a player.</li>
  <li><b>Play again.</b> After a game, Play again reopens the same room with the same people.</li>
</ul>

<h2>Public rooms and Quick Match</h2>
<p>Don't have three friends online right now? <b>Quick Match</b> puts you in an open room with other players, and a public room is one anyone can find. Private rooms are only for people with your link or code.</p>

<h2>Everyone on one device instead?</h2>
<p>If you're sitting together, use <a href="/pass-and-play">Around the table</a>: 2 to 4 players on one phone or tablet, no turn timer.</p>
${ctaBand('en', 'Create a room and send the link.')}
</div>`,
};

const computer = {
  path: '/play-vs-computer',
  lang: 'en',
  title: 'Play Ludo vs Computer – Free 3D Game, No Download | Burrec',
  description: 'Play Ludo (Burrec mos u zemëro) against the Computer for free: you against three Computer players, no turn timer, in 3D in your browser.',
  trail: [['/play-vs-computer', 'Play vs Computer']],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/play-vs-computer', 'Play vs Computer']])}<h1>Play Ludo against the Computer</h1></div>
<p class="answer">Choose <b>Vs Computers</b> and play Burrec mos u zemëro against three Computer players, any time, for free. There is no turn timer, and the Computers wait if you step away.</p>

<h2>How it works</h2>
<ul>
  <li><b>You play red</b>, the Computers play the other three colors.</li>
  <li><b>Take your time.</b> Games against the Computer have no turn timer. If you close the game or lose your connection, the Computers wait for you for up to 10 minutes.</li>
  <li><b>Classic rules.</b> Roll a 6 to leave home, capture by landing on a pawn, bring all four pawns into your finish lane. See the <a href="/rules">full rules</a>.</li>
  <li><b>Practice for real games.</b> It's the easiest way to learn when to leave home, when to chase and when to run.</li>
</ul>

<h2>How the Computer plays</h2>
<p>The Computer plays to win: it captures whenever it can, brings pawns out of home, moves pawns that are in danger, and avoids landing where it can be hit. It still needs the dice on its side, like everyone else. It also shows off: its captures come with the same Finisher cinematics as players' captures.</p>

<h2>Want people instead?</h2>
<p>Invite friends to a <a href="/play-with-friends">private room</a>, or play <a href="/pass-and-play">around the table</a> on one device. Any seat nobody takes is still played by the Computer.</p>
${ctaBand('en', 'You vs three Computers. Your move.')}
</div>`,
};

const passPlay = {
  path: '/pass-and-play',
  lang: 'en',
  title: 'Pass and Play Ludo on One Device – 2 to 4 Players | Burrec',
  description: 'Play Ludo (Burrec mos u zemëro) with 2 to 4 people on one phone or tablet: pass the device on each turn. Free, no turn timer, in 3D.',
  trail: [['/pass-and-play', 'Pass and play']],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/pass-and-play', 'Pass and play']])}<h1>Pass and play: Ludo on one device</h1></div>
<p class="answer">Choose <b>Around the table</b> to play Burrec mos u zemëro with 2 to 4 people on one phone or tablet. Type everyone's name, then pass the device to whoever's turn it is. There's no turn timer, and colors nobody plays are the Computer.</p>

<h2>Set up a table</h2>
<ol>
  <li><b>Press Play</b> and choose <b>Around the table</b>.</li>
  <li><b>Add the players</b>: a name for each person, 2 to 4 in all. Set any color you don't need to Computer.</li>
  <li><b>Start</b> and pass the device. The bar at the bottom shows whose turn it is.</li>
</ol>

<h2>Good to know</h2>
<ul>
  <li><b>No timer.</b> Take as long as you like on each turn.</li>
  <li><b>Internet needed.</b> The dice are rolled on our server, so the device has to be online.</li>
  <li><b>Names are remembered</b> on that device for the next game.</li>
  <li><b>Big screen.</b> A tablet on the table works best, but any phone does.</li>
</ul>

<h2>Playing apart?</h2>
<p>If your family or friends are in different places, <a href="/play-with-friends">create a private room</a> and send them the link instead.</p>
${ctaBand('en', 'Gather around and start a table.')}
</div>`,
};

// ───────────────────────── Modes, FAQ, names ─────────────────────────

const modes = {
  path: '/modes',
  lang: 'en',
  title: 'Game Modes: Classic, Quick and First Capture | Burrec',
  description: 'Burrec mos u zemëro has three game modes: Classic (all four pawns home), Quick (first pawn into the finish wins) and First capture (first capture wins).',
  trail: [['/modes', 'Game modes']],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/modes', 'Game modes']])}<h1>Game modes</h1></div>
<p class="answer">Burrec mos u zemëro has three game modes. <b>Classic</b> is the full game: bring all four pawns home. <b>Quick</b> starts with one pawn out, and the first pawn into its finish lane wins. In <b>First capture</b>, the first player to capture a pawn wins.</p>

<div class="table-wrap"><table>
  <thead><tr><th>Mode</th><th>Start</th><th>How you win</th><th>Good for</th></tr></thead>
  <tbody>
    <tr><td><b>Classic</b></td><td>All pawns at home</td><td>All four pawns in your finish lane</td><td>The real thing, a full game</td></tr>
    <tr><td><b>Quick</b></td><td>One pawn already on your start field</td><td>Your first pawn reaches its finish lane</td><td>A short break</td></tr>
    <tr><td><b>First capture</b></td><td>All pawns at home</td><td>Capture any opponent's pawn</td><td>Sudden-death fun</td></tr>
  </tbody>
</table></div>

<h2>Classic</h2>
<p>The traditional game. Roll a 6 to bring pawns out, race them around the 40-field track, capture opponents to send them back, and bring all four into your finish lane. All the details are in the <a href="/rules">rules</a>.</p>

<h2>Quick</h2>
<p>Everyone starts with one pawn already standing on their start field, so there's no waiting for the first 6. The first pawn to enter its finish lane wins. The usual rules still apply: you can bring more pawns out with a 6, and captures still send pawns home.</p>

<h2>First capture</h2>
<p>Sudden death. Everything is like Classic until somebody lands on an opponent's pawn: that capture wins the game on the spot. It rewards brave moves and punishes leaving pawns within six fields of an opponent.</p>

<h2>Where to pick a mode</h2>
<p>Choose the mode when you start a Quick Match or create a room. Everyone in the room plays that mode, and non-classic modes show a label at the top of the screen. Games against the Computer and <a href="/pass-and-play">Around the table</a> use Classic.</p>
${ctaBand('en', 'Pick a mode and play.')}
</div>`,
};

const FAQ_FULL = [
  ['What is Burrec mos u zemëro?', 'It is the Albanian name for the board game known in German as Mensch ärgere dich nicht ("Man, don\'t get angry"), a cousin of Ludo. burrec.com is a free online 3D version of it.'],
  ['Is it free?', 'Yes. The game is free to play in any modern browser. There is nothing to download.'],
  ['Does it work on phones?', 'Yes. It runs on phones, tablets and computers. On phones it uses a lighter frame rate to save battery.'],
  ['Do I need an account?', 'No. You can play every mode as a guest. A free account (email, Google or Apple) adds chat, pawn Props and Finishers, and keeps your name and looks on every device.'],
  ['How many players?', 'One to four people. Every color nobody plays is the Computer.'],
  ['Can I play offline?', 'No. Every game, including games against the Computer and Around the table, needs an internet connection, because the dice are rolled on our server.'],
  ['How do I invite friends?', 'Create a private room and tap the invite button to share a link, or read out the 4-letter room code. See <a href="/play-with-friends">playing with friends</a>.'],
  ['Can someone join a game that already started?', 'Yes, in rooms with a Computer seat. They open the link and take over that Computer\'s color with its pawns where they stand.'],
  ['What happens if I leave or lose connection?', 'If you leave, a Computer takes over your color. If your connection drops, your seat waits for you to come back, and the game moves for you when your turn timer runs out.'],
  ['Are the dice fair?', 'Yes. The server rolls every die with a random number generator and checks every move; the 3D dice only show the result.'],
  ['What are Finishers and Props?', 'Props are hats and other items your pawns wear, including your country\'s flag. A Finisher is the short cinematic that plays when you capture a pawn. Both are cosmetic and never change the rules.'],
  ['Which languages are there?', 'English and Albanian (shqip). Change the language in Settings.'],
  ['How is this different from Ludo King or other Ludo apps?', 'It follows the Mensch ärgere dich nicht board (40 fields, no safe squares, no blockades), runs in the browser without an install, and has Quick and First capture modes. See the <a href="/rules">rules</a>.'],
  ['How do I report a player?', 'Tap their name in chat or their color chip, then choose Report. Reports go to our moderators; you can also block a player so you no longer see their messages.'],
  ['How do I delete my account?', 'Open Profile and choose Delete account. Your account and its data are removed.'],
  ['How do I contact you?', 'Write to support@burrec.com.'],
];

const faq = {
  path: '/faq',
  lang: 'en',
  title: 'FAQ – Burrec mos u zemëro, Free 3D Ludo Online',
  description: 'Answers about Burrec mos u zemëro: is it free, does it work on phones, how to play with friends, offline play, fair dice, accounts, cosmetics and more.',
  trail: [['/faq', 'FAQ']],
  jsonld: [faqLd(FAQ_FULL)],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/faq', 'FAQ']])}<h1>Frequently asked questions</h1></div>
${FAQ_FULL.map(([q, a]) => `<h2>${q}</h2><p>${a}</p>`).join('\n')}
${ctaBand('en', 'Still curious? The fastest answer is a game.')}
</div>`,
};

const NAMES = [
  ['Albanian', 'Burrec mos u zemëro', 'sq', 'Little man, don\'t get angry'],
  ['German', 'Mensch ärgere Dich nicht', 'de', 'Man, don\'t get annoyed'],
  ['Bosnian, Croatian, Montenegrin', 'Čovječe, ne ljuti se', 'hr', 'Man, don\'t get angry'],
  ['Serbian', 'Не љути се, човече (Ne ljuti se, čoveče)', 'sr', 'Don\'t get angry, man'],
  ['Macedonian', 'Не лути се, човеку', 'mk', 'Don\'t get angry, man'],
  ['Bulgarian', 'Не се сърди, човече', 'bg', 'Don\'t be cross, man'],
  ['Slovenian', 'Človek, ne jezi se', 'sl', 'Man, don\'t get angry'],
  ['Czech', 'Člověče, nezlob se!', 'cs', 'Man, don\'t get angry'],
  ['Slovak', 'Človeče, nehnevaj sa', 'sk', 'Man, don\'t get angry'],
  ['Polish', 'Chińczyk', 'pl', 'The Chinese one'],
  ['Hungarian', 'Ki nevet a végén?', 'hu', 'Who laughs last?'],
  ['Romanian', 'Nu te supăra, frate', 'ro', 'Don\'t get upset, brother'],
  ['Greek', 'Γκρινιάρης', 'el', 'The grumbler'],
  ['Turkish', 'Kızma Birader', 'tr', 'Don\'t get angry, brother'],
  ['Italian', 'Non t\'arrabbiare', 'it', 'Don\'t get angry'],
  ['Dutch', 'Mens erger je niet!', 'nl', 'Man, don\'t get annoyed'],
  ['Swedish', 'Fia', 'sv', ''],
];

const world = {
  path: '/ludo-around-the-world',
  lang: 'en',
  title: 'Ludo Around the World: Burrec mos u zemëro, Mensch ärgere dich nicht and More',
  description: 'One game, many names: Burrec mos u zemëro, Mensch ärgere Dich nicht, Čovječe ne ljuti se, Kızma Birader, Non t\'arrabbiare, Chińczyk and its relatives Ludo, Parcheesi and Sorry!',
  trail: [['/ludo-around-the-world', 'Names around the world']],
  body: `<div class="wrap narrow prose">
<div class="page-head">${breadcrumbs('en', [['/ludo-around-the-world', 'Names around the world']])}<h1>One game, many names</h1></div>
<p class="answer">Burrec mos u zemëro, Mensch ärgere Dich nicht, Čovječe ne ljuti se and Kızma Birader are the same game. It was created in Germany in 1907–1908 by Josef Friedrich Schmidt, based on the English game Ludo, which in turn comes from the Indian game Pachisi. Most countries kept the German joke in the name: "Man, don't get angry".</p>

<h2>The name in different languages</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Language</th><th>Name</th><th>Meaning</th></tr></thead>
  <tbody>
${NAMES.map(([l, n, code, m]) => `    <tr><td>${l}</td><td lang="${code}"><b>${n}</b></td><td>${m ? `“${m}”` : '—'}</td></tr>`).join('\n')}
  </tbody>
</table></div>

<h2>Where the game comes from</h2>
<p><b>Pachisi</b>, a cross-and-circle race game, has been played in India for centuries. A simplified version was patented in England in 1896 as <b>Ludo</b>. Around 1907–1908, Josef Friedrich Schmidt in Munich made his own version and called it <i lang="de">Mensch ärgere Dich nicht</i>; it was first published in 1910, mass-produced from 1914, and has sold some 70 million copies. From Germany it spread across Central and Eastern Europe and the Balkans, mostly keeping its name in translation, which is how it became <b>Burrec mos u zemëro</b> in Albanian.</p>

<h2>Close relatives</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Game</th><th>Where</th><th>Main differences</th></tr></thead>
  <tbody>
    <tr><td><b>Mensch ärgere Dich nicht</b> / Burrec mos u zemëro</td><td>Germany, Central Europe, Balkans</td><td>40-field track, no safe fields, no blockades, a 6 to come out</td></tr>
    <tr><td><b>Ludo</b></td><td>UK, India, Africa, worldwide apps</td><td>52-square cross track, safe squares, often a bonus roll for captures</td></tr>
    <tr><td><b>Parcheesi / Parchís</b></td><td>USA / Spain</td><td>Two dice, safe spaces, blockades with two pawns</td></tr>
    <tr><td><b>Sorry!</b></td><td>USA, UK</td><td>Cards instead of dice, slides and swaps</td></tr>
    <tr><td><b>Pachisi</b></td><td>India</td><td>The ancestor: cowrie shells instead of dice, a cross-shaped board</td></tr>
  </tbody>
</table></div>

<p>Burrec mos u zemëro on this site follows the German board and rules. Read them on the <a href="/rules">rules page</a> (or <a href="/sq/rregullat" hreflang="sq">in Albanian</a>).</p>
${ctaBand('en', 'Whatever you call it at home, play it here.')}
</div>`,
};

export const LANDING_EN = landingEn;
export const PAGES = [landingSq, rulesEn, rulesSq, friends, computer, passPlay, modes, faq, world];
export const ALL_PAGES = [landingEn, ...PAGES];
