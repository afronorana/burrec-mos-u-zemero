# Solo and Shared tables run on the server, not on the device

The two "On this device" options — a **Solo table** (one human vs three Bots) and a **Shared table** (several humans passing one device) — are ordinary Nakama matches that are never joinable (`open:0`, kept out of Quick play), not games simulated in the browser. They therefore still need a connection, despite the label. We chose this over a truly offline mode (bundling the pure `ludo_logic.ts` into the client behind a local match driver that feeds `MatchController` the same opcodes) because the server already owns everything a game needs — dice RNG, Bots, Finisher stamping, game-over stats, Play again — and a second driver for turn flow, timing and Bot pacing would have to stay in lockstep with `match_handler.ts` forever.

## Consequences

- No airplane-mode play, including in the future iOS app. If that becomes necessary, the local driver is the way in: `ludo_logic.ts` is already pure and node-testable, so the rules would not be duplicated, only the match loop.
- These tables differ from Open ones only by server-side policy: no turn timeout, a long reconnect grace that pauses the game instead of an Abandoned-seat autopilot, explicit Leave ends the match, no chat.
- A Shared table is the one case where one userId holds several human seats.
