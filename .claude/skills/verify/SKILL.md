---
name: verify
description: Build/launch/drive recipe for verifying Burrec changes end-to-end (dev server, Nakama, Playwright)
---

# Verifying changes in this repo

## Compile check — never build into docs/
`docs/` is the deployed GitHub Pages folder; `pnpm build` empties and regenerates it
(and would delete `docs/ROADMAP.md`). For a compile check use:

```bash
npx vite build --outDir /tmp/burrec-build-check --emptyOutDir
```

## Launch
- `pnpm dev` → http://localhost:3000/burrec-mos-u-zemero/ (mind the base path).
- Online play needs Nakama: `pnpm nakama:up` (+ `pnpm nakama:build` if `nakama/build/index.js` is stale).
  Client env comes from `.env.development` (127.0.0.1:7350, key `burrec-dev-key`).

## Driving it with Playwright
Playwright + chromium are cached on this machine; `npm i playwright` in a scratch dir suffices.
WebGL renders fine headless; screenshot and crop with `sips` to inspect 3D details.

Gotchas that cost time:
- `AppButton` (afrons-game-ui) renders `<a class="button">`, **not** `<button>` —
  use `locator('a.button', { hasText })`, not `getByRole('button')`.
- Two online players: use two browser **contexts** (dev deviceId is per-tab
  sessionStorage, but displayName is localStorage — same context = shared name).
- Login flow: fill `input.input`, click "Enter Game".
- Lobby: **claiming a seat auto-readies** (server CLAIM_SEAT sets `ready: true`);
  clicking your own seat / the "Ready ✓" button **unclaims** it. Don't click
  Ready in tests — go straight to Start once everyone claimed.
- Private-lobby label indexing lags ~1s after create; wait before join-by-code.
- A dice roll takes ~3s of physics; move options need a 6 — loop rolls with a budget.
  For deterministic single-client flows prefer a Local Game (first player is local human).
- afrons-game-ui is consumed via `link:` and resolves to its `dist/` — after editing
  its `src/`, run `pnpm build` in `../afrons-game-ui` or the game won't see the change.
