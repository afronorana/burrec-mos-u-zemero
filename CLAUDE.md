# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Burrec mos u zemero" — a 3D Ludo-style board game (Albanian take on "Mensch ärgere dich nicht"). Vue 3 + Three.js for rendering, cannon-es for dice physics, nes.css for retro UI. Playable on desktop and mobile/touch: the old `.mobile-block-overlay` is disabled (`display:none`), and on touch (`store.isMobile`) the HUD shows an explicit Roll button since tapping the small 3D dice-in-pit is fiddly on a phone. No tests or linter are configured.

## Commands

```bash
pnpm install     # uses pnpm (pnpm-lock.yaml)
pnpm dev         # dev server on port 3000
pnpm build       # builds into docs/ (NOT dist/)
pnpm serve       # preview the production build

pnpm nakama:build   # bundle the server runtime (nakama/src -> nakama/build/index.js)
pnpm nakama:test    # unit-test the pure game rules (nakama/src/ludo_logic.ts)
pnpm nakama:up      # start local Nakama+postgres (docker compose, ports 7350/7351)
pnpm nakama:down    # stop it
node nakama/tests/e2e_match.mjs  # two-client end-to-end match test (needs nakama:up + nakama:build)
```

Production is `burrec.com`, served from a DigitalOcean droplet (Caddy TLS + reverse proxy to Nakama; see `nakama/DEPLOY.md`) — `docs/` also still gets committed and can serve as a GitHub Pages mirror, which is why `vite.config.js` uses a relative `base: './'` rather than a repo-path base. `.github/workflows/deploy.yml` deploys automatically on every push to `master` (or manual dispatch): always rebuilds and rsyncs the client, and only rebuilds/ships the Nakama bundle + restarts the server stack when server-relevant files changed (restarting drops all live matches). `docs/ROADMAP.md` (planned features) lives in that folder — `pnpm build` cleans `docs/` before writing, so anything not tracked in git there gets silently deleted on the next build. `.env.production` (Nakama host/key) is committed and baked into the build at build time.

## Live code path vs legacy code

Only files reachable from `index.html → src/main.js → src/App.vue` are live:

- `src/App.vue`
- `src/components/`: `StartScreen.vue`, `HomeScreen.vue`, `GameInterface.vue`, `CreateRoomScreen.vue`, `JoinRoomScreen.vue`, `LobbyScreen.vue`, `ChatPanel.vue`, `ChatDrawer.vue`, `WinScreen.vue`, `AuthModal.vue`, `AdminScreen.vue`, `OutlineAppearanceSelect.vue`, `RenderQualitySlider.vue`
- `src/network/`: `NakamaClient.js`, `MatchController.js`, `ChatController.js`
- `src/utils/`: `ApplicationStore.js`, `Pawn.js`, `Player.js`, `eventhandler.js`, `EventKeys.js`, `movementConstants.js`, `outlineAppearance.js`, `playerColors.js`, `renderQuality.js`
- `src/styles/`
- `shared/protocol.js` (opcodes — imported by both the client and the Nakama server bundle)
- `nakama/src/` (server runtime: `main.ts`, `match_handler.ts`, `ludo_logic.ts`, `rpc.ts`, `auth.ts`, `stats.ts`)

Everything else is a dead earlier implementation (vue-gl `vgl-*` templates, jQuery/Vuex/Pinia bootstrap): `src/core/`, `src/mixins/`, `src/store/useMainStore.js`, `src/utils/app.js`, `src/utils/components.js`, `src/components/PawnFigure.vue`, `DiceFigure.vue`, `PawnGeometryMaterial.vue`. Same for the `jquery`, `lodash`, `vuex`, `pinia`, `bootstrap-sass` dependencies. Don't extend the legacy files or take patterns from them.

## Architecture

Three layers communicate through a shared reactive singleton and an event bus — there is no Pinia/Vuex in the live path.

**State: `utils/ApplicationStore.js`** — a plain Vue `reactive()` object imported directly by everything. Holds board geometry (`fields.home/target/path` as THREE.Vector3 grid coordinates), `players`, turn bookkeeping (`currentPlayerId`, `currentRound`, `lastRolledDice`), UI screen (`currentScreen`: `main-menu` → `create-room`/`join-room` → `lobby` → `game-screen`; the app is online-only), graphics `settings`, and `gamePlayStatus.isRolling/isMoving` which gate all interaction.

**Game rules: `utils/Player.js` and `utils/Pawn.js`** — plain classes that mutate ApplicationStore directly. `Player` owns turn flow after a dice result (three-roll rule when all pawns are home, six repeats the turn, computer players auto-roll/auto-move on timeouts). `Pawn` owns movement: it builds a list of step states and applies them on `PAWN_STEP_DURATION_MS` timers (`runMoveSequence`), then handles captures (`removeOpponentPawns`) and fires the end/repeat-turn event. Position model: `position` 0 = home, 1–40 = main path (`globalPosition = (startingGlobalPosition + position - 1) % 40`, players start at offsets 0/10/20/30), 41–44 = the player's target lane; moves that would overshoot ≥ 45 are unavailable.

**Rendering + orchestration: `App.vue` (~2100 lines, deliberately monolithic)** — owns the Three.js scene, the cannon-es physics world, and the game-flow handlers (`startGame`, `changePlayersTurn`, `repeatPlayersTurn`, `rollDice`). Key subsystems:

- *Toon look*: every mesh gets an inverted-hull outline shell (`attachOutlineShell` / `createOutlinedInstancedSet`, `userData.isOutlineShell`). Geometries, materials, and textures are cached in `sharedGeometries/Materials/Textures` via `getShared*` — reuse those helpers instead of constructing Three objects inline.
- *Dice*: physics-based. `startDiceRoll` throws the body with a random impulse inside a walled tray; `stepPhysicsWorld` watches for settling, detects the up face by dotting face normals with world-up, nudges tilted dice (max 3 recovery attempts), then snaps face-up and calls `completeDiceRoll` → `Player.rollDice`.
- *Pawn animation is one-way*: game logic changes `Pawn` state instantly (per-step timers); the render loop's `syncPawns` reads `pawn.getCoordinates()` each frame and tweens meshes toward it, keyed on a logical position string (`getPawnWorldState().key`).
- *Interaction*: raycasting only targets objects valid for the current phase (`getInteractiveHit` checks `isRolling`/`isMoving` + `isHumanTurn`). Highlights are not 3D — a 2D overlay canvas projects object outline points to screen space, takes the convex hull, and strokes it (`renderHighlights2D`).

**Events: `utils/eventhandler.js` + `utils/EventKeys.js`** — a tiny EventTarget wrapper. UI components fire `game.start` / `game.rollDice`; Pawn/Player fire `turns.endTurn` / `turns.repeatTurn`; App.vue subscribes in `addEventListeners`. Add new keys to `EventKeys.js`, never string literals.

**Vue reactivity discipline**: all Three.js/cannon-es objects are wrapped in `markRaw()` before being stored on component data or in ApplicationStore (see the `vector()` helper in ApplicationStore). Keeping them out of Vue's proxy system is essential for performance — follow this for any new scene objects.

**Graphics settings** (`utils/outlineAppearance.js`, `utils/renderQuality.js`) are preset tables; App.vue watchers on `store.settings.*` re-apply them live (`applyOutlineAppearance`, `applyRenderQuality`).

The app is online-only (server-authoritative Nakama matches); the offline "Local Game" mode and its `add-players`/`localSetup*` setup were removed. AI players (`Player.controller === 'ai'`) still exist server-side for turn timeouts, but there is no local single-device setup screen.

## Online multiplayer (Nakama)

Online games are **server-authoritative**: a Nakama TypeScript runtime module (`nakama/`, bundled by rollup to ES5 for goja) owns dice RNG, move validation, captures, turn order and win detection. The client replays server events through the existing animation path.

- **Protocol**: `shared/protocol.js` defines the opcodes and is imported by both sides — never let client and server drift; extend this file only.
- **Server**: `nakama/src/ludo_logic.ts` is a pure, node-testable port of `Pawn.js` rules (keep them in exact parity — door blocking, own-pawn collisions via seat-relative `position`, overshoot ≥ 45, captures only on the main track). `match_handler.ts` runs lobby → playing → finished; **all timing lives in matchLoop ticks** (tick rate 2, goja has no setTimeout): turn timeouts (45s, 6s for disconnected), empty-match termination (60s). Private lobbies use 5-char codes resolved purely via match-label queries (`+label.code:X +label.open:1`) — note the label index lags `matchCreate` by ~1s (client retries once).
- **Client bridge**: `src/network/MatchController.js` maps opcodes ↔ EventBus/ApplicationStore. MOVE_APPLIED/TURN_CHANGE/GAME_OVER go through a FIFO that pauses while dice physics (`store.online.diceInFlight`) or a pawn animation (`pawn.moveComplete` event) is in flight.
- **Player.controller**: `'local' | 'ai' | 'remote'` replaces the old isComputer boolean (getter kept). All interactivity checks use `controller === 'local'`.
- **Dice online**: the physical roll is cosmetic. `App.rollDice` starts physics immediately (latency hiding); `finishDiceSettle` never feeds the physical face to game logic online — `tryResolveOnlineDice` waits for the server value, `snapDiceToValue` tweens the correct face up, then `completeDiceRoll(serverValue)` runs the presentation-only `Player.applyServerDiceResult`.
- **Turns online**: `Pawn.endOfMove` fires only `pawn.moveComplete`; turn flow comes exclusively from TURN_CHANGE → `App.setTurnBySeat` (seats can be non-contiguous — never use `changePlayersTurn`'s array rotation online; `store.online.seatToPlayerIndex` maps seat → players index, while `Player.turn - 1` stays the seat for colors/board offsets).
- **Recovery**: any REJECTED or desync path sends SYNC_REQUEST; `handleNetStateSync` rebuilds players and teleports pawns from the snapshot.
- **Drop-in joins**: `label.open:1` means "a seat is claimable" — an open lobby OR a running game with a free/abandoned slot. Mid-game joiners arrive unseated (server sends them a STATE_SYNC; client shows the choose-color banner), then CLAIM_SEAT during `playing` either creates a fresh seat (pawns from home) or takes over a disconnected seat as-is; the server broadcasts STATE_SYNC to everyone so clients rebuild rosters. Disconnected seats' pawns are dimmed client-side (`applySeatPresence`, per-seat shared materials at 0.35 opacity).
- **Per-game environment**: the room creator's `settings.environment` rides the create RPCs into matchInit params, is broadcast in LOBBY_STATE/STATE_SYNC, and lands in `store.online.environment`, which overrides the local setting while in a match. `state.displayNames` (userId → name, seated or not) travels the same payloads so chat can name unseated players.
- **Admin stats**: `stats.ts` keeps one system-owned storage object (games started/finished, per-player counts, last 50 games), written from match start/game-over; `admin_stats` RPC is gated by the `ADMIN_KEY` runtime env (unset = disabled; dev key `dev-admin` in local.yml). Client dashboard at `#admin` (AdminScreen.vue).
- **Dev identity**: deviceId lives in sessionStorage in dev (per-tab, so two tabs can play each other) and localStorage in prod.
- Session tokens: `token_expiry_sec` is raised to 7200 in `local.yml` (Nakama's 60s default kills sockets mid-game).
- **Accounts** (optional — guest device auth stays the default): email register/login plus Google/Apple sign-in (`AuthModal.vue`, buttons config-gated on `VITE_GOOGLE_CLIENT_ID`/`VITE_APPLE_CLIENT_ID`; Apple also needs `social.apple.bundle_id` server-side). Nakama sends no email itself: `nakama/src/auth.ts` mints one-time tokens in system-owned storage and posts to Resend's HTTP API (`runtime.env`: RESEND_API_KEY, EMAIL_FROM, PUBLIC_URL; EMAIL_DEV_ECHO=1 in dev returns the links in RPC payloads). Verify/reset links land as `#verify=`/`#reset=` hashes handled by StartScreen. Password reset works via `nk.linkEmail` re-link; the reset/verify RPCs run under any session (guests included) and act on the token's user, never the caller. An expired non-guest session throws `auth_session_expired` instead of silently re-authenticating as a guest device.
