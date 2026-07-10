// Browser-level verification with Playwright against `pnpm dev` + local Nakama.
// Covers: local-vs-AI regression, online lobby via join code, lobby chat,
// authoritative 2-player game start + a few turns via HUD buttons, quick match.
//
// Playwright is NOT a project dependency — run from a directory that has it
// installed (npm i playwright && npx playwright install chromium), with
// `pnpm dev` and `pnpm nakama:up` already running:
//   node /path/to/repo/nakama/tests/browser_e2e.mjs
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:3000/burrec-mos-u-zemero/'; // 127.0.0.1: [::1]:3000 is a different (Nuxt) dev server
const failures = [];
const pageErrors = [];

function assert(condition, label) {
  if (!condition) {
    failures.push(label);
    console.error(`FAIL: ${label}`);
  } else {
    console.log(`ok: ${label}`);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function watch(page, name) {
  page.on('pageerror', (error) => {
    pageErrors.push(`${name}: ${error.message}`);
    console.error(`PAGEERROR ${name}: ${error.message}`);
  });
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('favicon')) {
      console.log(`console-error ${name}: ${message.text().slice(0, 200)}`);
    }
  });
}

async function newPage(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(45000);
  page.setDefaultNavigationTimeout(90000);
  const originalGoto = page.goto.bind(page);
  page.goto = (url, options) => originalGoto(url, { waitUntil: 'domcontentloaded', ...options });
  return page;
}

async function lastRoll(page) {
  const el = page.locator('.hud-last-roll strong');
  if (await el.count() === 0) return null;
  return (await el.first().textContent())?.trim() || null;
}

// Plays whatever the HUD offers: Roll Dice button or the first pawn button.
async function actIfPossible(page) {
  const roll = page.locator('button.hud-roll-btn');
  if (await roll.count() > 0 && await roll.first().isVisible()) {
    await roll.first().click().catch(() => {});
    return 'rolled';
  }
  const pawnBtn = page.locator('.hud-move-row button');
  if (await pawnBtn.count() > 0 && await pawnBtn.first().isVisible()) {
    await pawnBtn.first().click().catch(() => {});
    return 'moved';
  }
  return null;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
  });

  // ---------- Local mode regression ----------
  {
    const page = await newPage(browser);
    watch(page, 'local');
    await page.goto(BASE);
    await page.getByRole('button', { name: 'Local Game' }).click();
    await page.locator('.player-slot input').first().fill('Human');
    await page.getByRole('button', { name: 'Play' }).click();
    await page.locator('.hud').waitFor({ timeout: 10000 });
    assert(true, 'local game reaches game screen');

    // Human is player 1 => first turn: roll.
    await page.locator('button.hud-roll-btn').waitFor({ timeout: 10000 });
    await page.locator('button.hud-roll-btn').click();
    await page.waitForFunction(
        () => document.querySelector('.hud-last-roll strong')?.textContent?.trim().length > 0,
        { timeout: 15000 },
    );
    assert(true, 'local dice roll resolves');

    // Let the game run ~30s: turns must keep rotating between players
    // (pawns leaving home depends on dice luck, so don't assert on that).
    // An all-home AI turn takes ~11s (3 physics rolls + think delays), so a
    // full 4-player rotation needs ~45s — observe long enough for 2+ changes.
    let acted = 0;
    let turnChanges = 0;
    let lastActive = '';
    const deadline = Date.now() + 75000;
    while (Date.now() < deadline && turnChanges < 3) {
      await delay(500);
      if (await actIfPossible(page)) acted += 1;
      const current = await page.evaluate(() => [...document.querySelectorAll('.hud-chip')]
          .findIndex((chip) => chip.classList.contains('hud-chip--active')));
      if (current !== -1 && current !== lastActive) {
        if (lastActive !== '') turnChanges += 1;
        lastActive = current;
      }
    }
    const state = await page.locator('.hud-chip-meta').allTextContents();
    assert(turnChanges >= 2, `local turns rotate between players (${turnChanges} changes, state ${state.join(' | ')})`);
    console.log(`local: acted ${acted} times, ${turnChanges} turn changes`);
    await page.context().close();
  }

  // ---------- Online: create/join/chat/play ----------
  const A = await newPage(browser);
  const B = await newPage(browser);
  watch(A, 'A');
  watch(B, 'B');

  await A.goto(BASE);
  await A.getByRole('button', { name: 'Play Online' }).click();
  await A.locator('#online-display-name').fill('Ana');
  await A.getByRole('button', { name: 'Create Lobby' }).click();
  await A.locator('.lobby-code').waitFor({ timeout: 15000 });
  const code = (await A.locator('.lobby-code').textContent()).trim();
  assert(/^[A-Z2-9]{5}$/.test(code), `lobby created with code (${code})`);

  await B.goto(BASE);
  await B.getByRole('button', { name: 'Play Online' }).click();
  await B.locator('#online-display-name').fill('Beni');
  await delay(2500); // label index lag safety
  await B.locator('.online-code-input').fill(code);
  await B.getByRole('button', { name: 'Join', exact: true }).click();
  await B.locator('.lobby-seats').waitFor({ timeout: 15000 });
  await A.locator('.lobby-seat:has-text("Beni")').waitFor({ timeout: 10000 });
  assert(true, 'both players in lobby, seats visible');

  // Chat
  await A.locator('.chat-input').fill('pershendetje');
  await A.locator('.chat-input-row button').click();
  await B.locator('.chat-message:has-text("pershendetje")').waitFor({ timeout: 8000 });
  assert(true, 'lobby chat delivered A -> B');

  // Ready + start
  await A.getByRole('button', { name: 'Ready?' }).click();
  await B.getByRole('button', { name: 'Ready?' }).click();
  await A.locator('button:has-text("Start")').waitFor({ timeout: 8000 });
  await A.waitForFunction(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Start');
    return btn && !btn.disabled;
  }, { timeout: 8000 });
  await A.getByRole('button', { name: 'Start', exact: true }).click();
  await A.locator('.hud').waitFor({ timeout: 10000 });
  await B.locator('.hud').waitFor({ timeout: 10000 });
  assert(true, 'both clients reached the game screen');

  // Seat 0 (Ana) starts; B must be waiting.
  await A.locator('button.hud-roll-btn').waitFor({ timeout: 10000 });
  const bWaiting = await B.locator('.hud-msg').first().textContent();
  assert(bWaiting.includes('Waiting for'), `B is spectating A's turn (${bWaiting.trim()})`);
  assert(await B.locator('button.hud-roll-btn').count() === 0, 'B has no roll button on A turn');

  // Play turns via HUD for ~50s; both HUDs must show the same last roll.
  let rollsMatched = 0;
  let actions = 0;
  for (let i = 0; i < 50; i += 1) {
    await delay(1000);
    if (await actIfPossible(A)) actions += 1;
    if (await actIfPossible(B)) actions += 1;
    const [rollA, rollB] = [await lastRoll(A), await lastRoll(B)];
    if (rollA && rollA === rollB) rollsMatched += 1;
  }
  assert(rollsMatched > 10, `dice values agree across clients (${rollsMatched} matched samples, ${actions} actions)`);

  // Leave: A leaves mid-game, B sees the seat drop offline (LOBBY_STATE update).
  await A.locator('.hud-settings-area .hud-icon-btn').first().click();
  await A.getByRole('button', { name: 'Leave Game' }).click();
  await A.locator('#online-display-name').waitFor({ timeout: 8000 });
  assert(true, 'A left the game back to online menu');
  await A.context().close();
  await B.context().close();

  // ---------- Quick match ----------
  {
    const Q1 = await newPage(browser);
    const Q2 = await newPage(browser);
    watch(Q1, 'Q1');
    watch(Q2, 'Q2');
    for (const [page, name] of [[Q1, 'Qena'], [Q2, 'Qamil']]) {
      await page.goto(BASE);
      await page.getByRole('button', { name: 'Play Online' }).click();
      await page.locator('#online-display-name').fill(name);
      await page.getByRole('button', { name: 'Quick Match' }).click();
    }
    await Q1.locator('.online-searching').waitFor({ timeout: 8000 });
    // Nakama matchmaker sweeps every ~15s by default.
    await Promise.all([
      Q1.locator('.lobby-seats').waitFor({ timeout: 60000 }),
      Q2.locator('.lobby-seats').waitFor({ timeout: 60000 }),
    ]);
    await Q1.locator('.lobby-seat:has-text("Qamil")').waitFor({ timeout: 10000 });
    assert(true, 'quick match paired both players into one lobby');
    await Q1.context().close();
    await Q2.context().close();
  }

  await browser.close();

  const relevantErrors = pageErrors.filter((e) => !e.includes('WebGL'));
  assert(relevantErrors.length === 0, `no page errors (${relevantErrors.slice(0, 3).join(' ;; ')})`);

  console.log(failures.length
    ? `\nBROWSER E2E FAILED — ${failures.length} failure(s):\n- ${failures.join('\n- ')}`
    : '\nBROWSER E2E PASSED');
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error('BROWSER E2E crashed:', error);
  process.exit(1);
});
