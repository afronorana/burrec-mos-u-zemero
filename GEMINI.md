# GEMINI.md

This file provides guidance to the Antigravity Agent (AGY) when working with code in this repository.

---

## 🎮 Project Overview

**"Burrec mos u zemero"** — a 3D Ludo-style board game (Albanian take on "Mensch ärgere dich nicht").
* **Tech Stack**: Vue 3 + Three.js for rendering, `cannon-es` for dice physics, `afrons-game-ui` for UI components.
* **Compatibility**: Desktop-only (mobile is blocked by an overlay screen).
* **Testing & Linting**: No pre-configured linters. Nakama server unit tests are run via `pnpm nakama:test`.

---

## 🛠️ Build & Run Commands

Use the following commands to install, run, build, and test the project:

```bash
pnpm install         # Install dependencies using pnpm-lock.yaml
pnpm dev             # Start Vue 3 + Vite dev server (port 3000)
pnpm build           # Build project into docs/ (NOT dist/)
pnpm serve           # Preview the production build locally

pnpm nakama:build    # Bundle the server runtime (nakama/src -> nakama/build/index.js)
pnpm nakama:test     # Run unit tests for game rules (nakama/src/ludo_logic.ts)
pnpm nakama:up       # Spin up local Nakama server & Postgres database (via docker compose)
pnpm nakama:down     # Shut down local Nakama and Postgres containers
node nakama/tests/e2e_match.mjs  # Run end-to-end match testing with two client sessions
```

### Deployment Details
* **GitHub Pages**: Deployed directly from the `docs/` folder. Deploying requires running `pnpm build` and committing the regenerated contents of `docs/`.
* **Vite Configuration**: `vite.config.js` sets `base: '/burrec-mos-u-zemero/'`.
* **Important**: Do not delete `docs/ROADMAP.md` when rebuilding.
* **Environment**: `.env.production` contains the production Nakama host configuration. Changing this requires a full rebuild.

---

## 📂 Code Paths: Live vs. Legacy

Only files reachable from `index.html` → `src/main.js` → `src/App.vue` are part of the active game.

### 🟢 Live Code Files
* **Main UI & Scene**: [App.vue](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/App.vue)
* **Components**: [src/components/](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/components/) (`StartScreen.vue`, `GameInterface.vue`, `OnlineMenu.vue`, `LobbyScreen.vue`, `ChatPanel.vue`, `WinScreen.vue`, `OutlineAppearanceSelect.vue`, `RenderQualitySlider.vue`)
* **Network Controller**: [src/network/](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/network/) (`NakamaClient.js`, `MatchController.js`, `ChatController.js`)
* **Utilities & Models**: [src/utils/](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/) (`ApplicationStore.js`, `Pawn.js`, `Player.js`, `eventhandler.js`, `EventKeys.js`, `i18n.js`, `movementConstants.js`, `outlineAppearance.js`, `playerColors.js`, `renderQuality.js`)
* **Server Runtime**: [nakama/src/](file:///Users/afronorana/Projects/burrec-mos-u-zemero/nakama/src/) (`main.ts`, `match_handler.ts`, `ludo_logic.ts`, `rpc.ts`)
* **Shared Logic**: [shared/protocol.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/shared/protocol.js)

### 🔴 Legacy Code Files (DO NOT Edit/Reference)
* Directories: `src/core/`, `src/mixins/`, `src/store/`
* Files: `src/store/useMainStore.js`, `src/utils/app.js`, `src/utils/components.js`, `src/components/PawnFigure.vue`, `DiceFigure.vue`, `PawnGeometryMaterial.vue`
* Obsolete dependencies: `jquery`, `lodash`, `vuex`, `pinia`, `bootstrap-sass`. Do not import or take styling/logic patterns from these files.

---

## 🏗️ Architecture

The game uses three decoupled layers communicating via a single reactive store and an event bus. **Do not use state management libraries like Pinia or Vuex.**

### 1. State Management
* **Store**: [ApplicationStore.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/ApplicationStore.js) is a plain Vue `reactive()` singleton.
* It maintains the board coordinates (`fields.home/target/path` as `THREE.Vector3` points), turn state (`currentPlayerId`, `currentRound`, `lastRolledDice`), active UI screens (`currentScreen`), and game flow gates (`gamePlayStatus.isRolling/isMoving`).
* **Vue Reactivity Constraint**: Wrap all Three.js and `cannon-es` objects using Vue's `markRaw()` (e.g., via the `vector()` helper in `ApplicationStore`) before attaching them to the store or component data. This is critical for browser performance.

### 2. Core Game Rules
* **Player Model**: [Player.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/Player.js) controls turn cycle logic (three-roll rule for home pawns, repeats on a 6, computer player auto-move on timeouts).
* **Pawn Model**: [Pawn.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/Pawn.js) handles step state sequences on `PAWN_STEP_DURATION_MS` timers, capture resolution, and turn transitions.
* **Positions**: `0` represents home, `1–40` represents the outer main track (`globalPosition = (startingGlobalPosition + position - 1) % 40`), and `41–44` represents the player's target lane. Overshooting target positions (≥ 45) is invalid.

### 3. Rendering & Presentation
* [App.vue](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/App.vue) orchestrates the Three.js viewport, the physics simulation, and game handlers.
* **Toon Rendering**: Outlines are rendered using a flipped-hull outline shell (`attachOutlineShell` / `createOutlinedInstancedSet` marking `userData.isOutlineShell`). Geometries, materials, and textures are cached dynamically using `getShared*` helpers.
* **Dice Physics**: A physical throw with impulse is executed. When the body settles, the upward face is resolved by comparing normal vectors to world-up. If the die is tilted, up to 3 recovery adjustments are executed before snapping it flush and completing the roll.
* **Pawn Animation**: Decoupled from logic. The logical state updates instantly, and `syncPawns` dynamically interpolates the 3D meshes towards their coordinates based on `getPawnWorldState().key`.
* **Interaction**: Raycasting targets items valid in the current turn state. Highlights are rendered in 2D by projecting 3D bounds onto an overlay canvas (`renderHighlights2D`).
* **Events**: Facilitated by [eventhandler.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/eventhandler.js). Define all event namespaces inside [EventKeys.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/utils/EventKeys.js); never use string literals for events.

---

## 🌐 Online Multiplayer (Nakama)

The online multiplayer system runs on a **server-authoritative** architecture using a Nakama TypeScript engine bundle.

* **Protocol & Opcodes**: Defined in [protocol.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/shared/protocol.js). This file must remain identical between client and server.
* **Server Rules**: [ludo_logic.ts](file:///Users/afronorana/Projects/burrec-mos-u-zemero/nakama/src/ludo_logic.ts) replicates the local `Pawn.js` rules. It manages door blocking, collisions, captures, and win logic.
* **Timing & Game Loops**: Managed in `matchLoop` ticks (tick rate 2). It enforces turn timeouts (45 seconds for active, 6 seconds for disconnected players).
* **Client Bridge**: [MatchController.js](file:///Users/afronorana/Projects/burrec-mos-u-zemero/src/network/MatchController.js) intercepts server events and queues them, releasing events sequentially when animations (e.g. dice rolling, pawn steps) are complete.
* **Local vs. Remote Turns**: Interactivity uses `player.controller === 'local'`. Online turns are controlled by server events (`TURN_CHANGE`), never client-side turn rotations.
* **State Synchronization**: On desync, the client sends a `SYNC_REQUEST` and runs `handleNetStateSync` to reconstruct players and positions.
* **Dev Identity**: Device IDs use `sessionStorage` in dev mode to permit multiple instances playing against each other on the same machine.
