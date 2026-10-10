# Build plan — Points, locked Cosmetics, Streak, Titles, Referrals

Design settled 2026-10-09 (grilling session). Terms: `CONTEXT.md` (Points, Buy, earned tier, Welcome bonus, Streak, Streak freeze, Referral, Title). Why a currency and no grandfathering: `adr/0003`.

Every slice below ships on its own, in this order. Points go live **before** anything locks, so players already hold a balance when locks land.

## Foundations (used by every slice)

- **Balance = Nakama wallet** (`nk.walletUpdate(userId, { points: n }, { source, ... }, true)`). The wallet ledger already records "every change with a source", the user's own `getAccount` returns it, it refuses to go below zero (so a Buy can't overspend) and it's deleted with the account. Sources: `game | welcome | streak | referral | buy | admin` (later `ad | purchase`).
- **Progress object**: user-owned storage `progress/state`, owner-readable, server-write-only (same permissions as `entitlements/items`):
  `{ counters: { games, wins, captures, pawnsHome, sixes, captured, referrals, modeWins: {classic, quick, firstCapture} }, titles: [ids], shownTitle, streak: { day, week, lastDay, freeze, pending, longest }, solo: { day, points }, welcomeAt, referrer, referralPaid }`.
  Writes use the storage `version` (optimistic lock) with one retry, because the match handler and RPCs can write the same object.
- **Pure rules module `nakama/src/progress_logic.ts`**, tested with node like `ludo_logic`: `gamePoints(seatStats, table, won)`, `applySoloCap`, `streakAdvance(streak, todayUtc)`, `streakReward(day, week)`, `newTitles(counters, owned)`. The thresholds and tables (`POINTS`, `STREAK_REWARDS`, `TITLES`) live in `shared/protocol.js` so the client can show them; title *names* live in `src/utils/i18n.js` (en + sq).
- **`progress_state` RPC** → `{ points, streak, titles, shownTitle, owned, now }`. The client calls it when it reaches Home. It also does two once-only checks: it records today's Streak day and grants the Welcome bonus to a Member who hasn't had it. That second check covers Google/Apple Members and existing Members (no migration script). `store_state` merges into it.

## Slice 0 — Halloween specials (ship by 2026-10-23) — DONE (uncommitted)

- `ITEM_TIERS`: `prop:pumpkin` and `prop:ghost` → `{ tier: 'special', from: '2026-10-24', until: '2026-11-03' }`. The Claim flow already exists, so this is one line each plus a server deploy.
- `santaHat` gets its December window in a later deploy.

## Slice 1 — Earning Points from games — DONE (uncommitted)

- `match_handler.ts`, at game over (next to `recordGameFinished`): for each seat with a human owner (not a Bot, not a companion), work out `gamePoints` and pay it into the wallet. This also counts an Abandoned seat, since its owner still holds it; a Leave already turned the seat into a Bot, so leaving forfeits. Rules: Open tables pay in full, Solo tables pay half with the 50/UTC-day cap (`solo` field), Shared tables pay nothing.
- Add the per-seat `earned: { total, finished, pawns, captures, win, capped }` to `gameOverPayload` (and to the finished STATE_SYNC).
- WinScreen: "+N Points" with that breakdown; for a Guest add "Register to spend them".
- Tests: unit tests for `gamePoints` and the cap; `e2e_progress.mjs` checks that a Solo game finished with dev dice pays half and stops at the cap, and that Leave pays nothing.

## Slice 2 — Locks, Buy, Welcome bonus, Guest Finisher, Bot Finishers — DONE (uncommitted)

- `shared/protocol.js`:
  - Add the `earned` tier (`{ tier: 'earned', price }`) and list every locked item with its band. Free = crown, partyHat, sunglasses, flag / shove, pan, bat, hammer.

    | Band | Props | Finishers |
    |---|---|---|
    | Cheap (150 / 300) | topHat, catEars, rabbitEars, mustache, clownNose, scarf, bandana | golf, racket, glove |
    | Mid (300 / 600) | qeleshe, wizardHat, armyHelmet, vampireEars | bowling, anvil, cannon |
    | Show piece (500 / 1000) | dinoSpikes, chicken, alienAntennae, halo, devilHorns | trapdoor, magician, vampire, ufo |

    The existing `canWear`/`wearableCosmetics` then enforce locks with no other change.
  - `guestCosmetics().finisher = DEFAULT_FINISHER`.
- `match_handler.ts`:
  - A companion's capture plays `DEFAULT_FINISHER` instead of `NO_FINISHER`.
  - `botFinisher()` → `state.botFinishers[seat]`, drawn from all 14 in `startGame` and whenever a seat becomes a Bot (`vacateSeat`, `handlePlayAgain`).
- `store.ts`: `buy_item` RPC (Members only, earned tier only, not already owned). It takes the price from the wallet (`source: 'buy'`), then grants the Entitlement (`source: 'buy'`). If the grant fails, it refunds.
- Welcome bonus: 150, once (`welcomeAt`), paid out by `progress_state` and by `verify_email`.
- Wardrobe: balance in the header; each earned item shows its price and Buy, or Owned. Guests see "Register to spend". Save stays disabled while an unowned item is picked (existing behaviour).
- Client defaults: a Member's saved `settings.cosmetics` holding a locked item already falls back through `wearableCosmetics` on the server. Also reset it locally on `store_state`, so the Wardrobe doesn't show a look the player isn't wearing.
- Update the docs: CLAUDE.md "Store" + "Bots" + "Guest vs Member" paragraphs, and `site/pages.js` if it says all cosmetics are free.
- Tests: `e2e_store.mjs` (buy, no money, already owned, Guest refused); `e2e_auth.mjs` (a Guest now captures with `shove`).

## Slice 3 — Streak — DONE (uncommitted)

- `streakAdvance` (pure), called by `progress_state`:
  - Same UTC day → no change.
  - Next day → `day+1`, plus a reward added to `pending`.
  - One day missed with `freeze` → freeze used, no reward, keep the count.
  - Otherwise → start over at day 1, week 1.
  - Finishing day 7 → `week+1` (week stays at 4 at most for rewards), earn a freeze (hold at most 1), update `longest`.
  - Rewards for days 1–6 are 10/10/15/15/20/20; day 7 pays 100/150/200/250.
- `collect_streak` RPC pays everything in `pending` into the wallet (`source: 'streak'`). Guests can collect too; the Points just can't be spent yet.
- Home: a 🔥 N button in the corner (with a dot when something is waiting) that opens `StreakPanel.vue`: 7 day chips (day 7 bigger), Collect, a snowflake when a freeze is held, the longest streak, and "Register to spend" for Guests. Transform/opacity animations only.
- Tests: table-driven unit tests for `streakAdvance` (missed day, freeze, two missed days, week rollover, week-4 top).

## Slice 4 — Titles — DONE (uncommitted)

- Count `counters` at game over, using the same games that pay Points (Open + Solo). The data is in `state.stats` plus `pawnsFinished`, and modeWins comes from `state.gameMode`. Referrals and `longest` come from their own slices.
- Titles (ids in `TITLES`, each with a counter and threshold):
  - games finished: 1 / 10 / 50 / 100 / 500
  - wins: 1 / 10 / 50 / 200
  - captures: 10 / 100 / 500
  - pawns home: 100 / 1000
  - sixes: 100
  - captured: 100
  - referrals: 1 / 10
  - a win in every mode
  - longest streak: 7 / 30 / 100
- `newTitles` runs at game over and on Streak/Referral updates. New ids go in `earned.newTitles` for the WinScreen.
- `set_title` RPC (an owned id, or none). At join, the server reads `shownTitle` and broadcasts `titles` (userId → id) in LOBBY_STATE/STATE_SYNC, just like `cosmetics`. Bots and companions never get one.
- UI: a second line on the lobby chip and the HUD seat chip (cut short on phones), the WinScreen stats board, and a picker in ProfileSheet. Each viewer translates the id into their own locale.

## Slice 5 — Referrals — DONE (uncommitted)

- Links `#r=<code>` (the code = the user's id, hashed for short display, or a stored random 6-char code; a shareable link lives in ProfileSheet). `matchSession` keeps it in localStorage until the player registers.
- After becoming a Member, the client calls `set_referrer` once. The server accepts it only if `referrer` is empty, the referrer isn't yourself, and your account is less than 7 days old. That last check stops existing players from adding a referrer after the fact.
- Payout in `startGame` (any Table): for each seated human with a `referrer` and no `referralPaid` who is a Member, pay 100 to the referrer and 50 to them, and add 1 to the referrer's `counters.referrals`. Stop paying once the referrer reaches 20.

## Slice 6 — Admin — DONE (uncommitted)

- `admin_adjust_points` RPC (amount, reason) → a wallet change with `source: 'admin'`, plus the `user_meta` history like other Admin actions. AdminScreen user detail shows the balance, the latest ledger entries and an adjust form.

## Open risks

- Writes to the progress object come from the match loop and RPCs at the same time. The version check plus a retry covers it, but keep each write small and in one place.
- An Abandoned seat at game over is paid (it still holds the seat). Change this in `gamePoints` if it turns out to be abused.
- Locking removes looks Members currently wear (adr/0003). Say so in the Wardrobe the first time ("Items changed: you got 150 Points to spend").
