# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Burrec mos u zemero" — a 3D Ludo-style board game (Albanian take on "Mensch ärgere dich nicht"). Vue 3 + Three.js for rendering, cannon-es for dice physics, nes.css for retro UI. Desktop-only (mobile is blocked by an overlay). No tests or linter are configured.

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

Deployment is GitHub Pages serving the `docs/` folder from the branch (no CI workflow — a deploy means running `pnpm build` and committing the regenerated `docs/`). `vite.config.js` sets `base: '/burrec-mos-u-zemero/'` accordingly. `docs/ROADMAP.md` (planned features) also lives in that folder — don't delete it when rebuilding. `.env.production` (Nakama host/key) is baked into the build — changing the game server requires a rebuild. The Nakama server deploys separately to a docker host behind Caddy TLS: see `nakama/DEPLOY.md`.

## Live code path vs legacy code

Only files reachable from `index.html → src/main.js → src/App.vue` are live:

- `src/App.vue`
- `src/components/`: `StartScreen.vue`, `GameInterface.vue`, `OnlineMenu.vue`, `LobbyScreen.vue`, `ChatPanel.vue`, `WinScreen.vue`, `OutlineAppearanceSelect.vue`, `RenderQualitySlider.vue`
- `src/network/`: `NakamaClient.js`, `MatchController.js`, `ChatController.js`
- `src/utils/`: `ApplicationStore.js`, `Pawn.js`, `Player.js`, `eventhandler.js`, `EventKeys.js`, `movementConstants.js`, `outlineAppearance.js`, `playerColors.js`, `renderQuality.js`
- `src/styles/`
- `shared/protocol.js` (opcodes — imported by both the client and the Nakama server bundle)
- `nakama/src/` (server runtime: `main.ts`, `match_handler.ts`, `ludo_logic.ts`, `rpc.ts`)

Everything else is a dead earlier implementation (vue-gl `vgl-*` templates, jQuery/Vuex/Pinia bootstrap): `src/core/`, `src/mixins/`, `src/store/useMainStore.js`, `src/utils/app.js`, `src/utils/components.js`, `src/components/PawnFigure.vue`, `DiceFigure.vue`, `PawnGeometryMaterial.vue`. Same for the `jquery`, `lodash`, `vuex`, `pinia`, `bootstrap-sass` dependencies. Don't extend the legacy files or take patterns from them.

## Architecture

Three layers communicate through a shared reactive singleton and an event bus — there is no Pinia/Vuex in the live path.

**State: `utils/ApplicationStore.js`** — a plain Vue `reactive()` object imported directly by everything. Holds board geometry (`fields.home/target/path` as THREE.Vector3 grid coordinates), `players`, turn bookkeeping (`currentPlayerId`, `currentRound`, `lastRolledDice`), UI screen (`currentScreen`: `main-menu` → `add-players` → `game-screen`), graphics `settings`, and `gamePlayStatus.isRolling/isMoving` which gate all interaction.

**Game rules: `utils/Player.js` and `utils/Pawn.js`** — plain classes that mutate ApplicationStore directly. `Player` owns turn flow after a dice result (three-roll rule when all pawns are home, six repeats the turn, computer players auto-roll/auto-move on timeouts). `Pawn` owns movement: it builds a list of step states and applies them on `PAWN_STEP_DURATION_MS` timers (`runMoveSequence`), then handles captures (`removeOpponentPawns`) and fires the end/repeat-turn event. Position model: `position` 0 = home, 1–40 = main path (`globalPosition = (startingGlobalPosition + position - 1) % 40`, players start at offsets 0/10/20/30), 41–44 = the player's target lane; moves that would overshoot ≥ 45 are unavailable.

**Rendering + orchestration: `App.vue` (~2100 lines, deliberately monolithic)** — owns the Three.js scene, the cannon-es physics world, and the game-flow handlers (`startGame`, `changePlayersTurn`, `repeatPlayersTurn`, `rollDice`). Key subsystems:

- *Toon look*: every mesh gets an inverted-hull outline shell (`attachOutlineShell` / `createOutlinedInstancedSet`, `userData.isOutlineShell`). Geometries, materials, and textures are cached in `sharedGeometries/Materials/Textures` via `getShared*` — reuse those helpers instead of constructing Three objects inline.
- *Dice*: physics-based. `startDiceRoll` throws the body with a random impulse inside a walled tray; `stepPhysicsWorld` watches for settling, detects the up face by dotting face normals with world-up, nudges tilted dice (max 3 recovery attempts), then snaps face-up and calls `completeDiceRoll` → `Player.rollDice`.
- *Pawn animation is one-way*: game logic changes `Pawn` state instantly (per-step timers); the render loop's `syncPawns` reads `pawn.getCoordinates()` each frame and tweens meshes toward it, keyed on a logical position string (`getPawnWorldState().key`).
- *Interaction*: raycasting only targets objects valid for the current phase (`getInteractiveHit` checks `isRolling`/`isMoving` + `isHumanTurn`). Highlights are not 3D — a 2D overlay canvas projects object outline points to screen space, takes the convex hull, and strokes it (`renderHighlights2D`).

**Events: `utils/eventhandler.js` + `utils/EventKeys.js`** — a tiny EventTarget wrapper. UI components fire `game.start` / `game.rollDice`; Pawn/Player fire `turns.endTurn` / `turns.repeatTurn`; App.vue subscribes in `addEventListeners`. Add new keys to `EventKeys.js`, never string literals.

**Vue reactivity discipline**: all Three.js/cannon-es objects are wrapped in `markRaw()` before being stored on component data or in ApplicationStore (see the `vector()` helper in ApplicationStore). Keeping them out of Vue's proxy system is essential for performance — follow this for any new scene objects.

**Graphics settings** (`utils/outlineAppearance.js`, `utils/renderQuality.js`) are preset tables; App.vue watchers on `store.settings.*` re-apply them live (`applyOutlineAppearance`, `applyRenderQuality`).

A blank name in the player setup screen creates a computer player (`createPlayers` passes controller `'ai'` for empty names).

## Online multiplayer (Nakama)

Online games are **server-authoritative**: a Nakama TypeScript runtime module (`nakama/`, bundled by rollup to ES5 for goja) owns dice RNG, move validation, captures, turn order and win detection. The client replays server events through the existing animation path.

- **Protocol**: `shared/protocol.js` defines the opcodes and is imported by both sides — never let client and server drift; extend this file only.
- **Server**: `nakama/src/ludo_logic.ts` is a pure, node-testable port of `Pawn.js` rules (keep them in exact parity — door blocking, own-pawn collisions via seat-relative `position`, overshoot ≥ 45, captures only on the main track). `match_handler.ts` runs lobby → playing → finished; **all timing lives in matchLoop ticks** (tick rate 2, goja has no setTimeout): turn timeouts (45s, 6s for disconnected), empty-match termination (60s). Private lobbies use 5-char codes resolved purely via match-label queries (`+label.code:X +label.open:1`) — note the label index lags `matchCreate` by ~1s (client retries once).
- **Client bridge**: `src/network/MatchController.js` maps opcodes ↔ EventBus/ApplicationStore. MOVE_APPLIED/TURN_CHANGE/GAME_OVER go through a FIFO that pauses while dice physics (`store.online.diceInFlight`) or a pawn animation (`pawn.moveComplete` event) is in flight.
- **Player.controller**: `'local' | 'ai' | 'remote'` replaces the old isComputer boolean (getter kept). All interactivity checks use `controller === 'local'`.
- **Dice online**: the physical roll is cosmetic. `App.rollDice` starts physics immediately (latency hiding); `finishDiceSettle` never feeds the physical face to game logic online — `tryResolveOnlineDice` waits for the server value, `snapDiceToValue` tweens the correct face up, then `completeDiceRoll(serverValue)` runs the presentation-only `Player.applyServerDiceResult`.
- **Turns online**: `Pawn.endOfMove` fires only `pawn.moveComplete`; turn flow comes exclusively from TURN_CHANGE → `App.setTurnBySeat` (seats can be non-contiguous — never use `changePlayersTurn`'s array rotation online; `store.online.seatToPlayerIndex` maps seat → players index, while `Player.turn - 1` stays the seat for colors/board offsets).
- **Recovery**: any REJECTED or desync path sends SYNC_REQUEST; `handleNetStateSync` rebuilds players and teleports pawns from the snapshot.
- **Dev identity**: deviceId lives in sessionStorage in dev (per-tab, so two tabs can play each other) and localStorage in prod.
- Session tokens: `token_expiry_sec` is raised to 7200 in `local.yml` (Nakama's 60s default kills sockets mid-game).
