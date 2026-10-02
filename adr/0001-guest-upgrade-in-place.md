# Guests become Members by linking, not by switching accounts

Every player starts as a Guest on a Nakama device account. Registering (email, Google, Apple) links the new login onto that same Nakama user (`linkEmail` / `linkGoogle` / `linkApple`), so the user id, display name and history carry over. "Sign in" to an existing Member is the only path that switches identity, and it is also the fallback when a link fails because the login already belongs to another user — the Guest identity is then abandoned. We chose this over the sibling project shtet-qytet's approach (a separate auth account plus "adopting" a canonical player id), because that dance exists only because Supabase auth and its player ids are separate systems; Nakama's identity is one user with many linked logins.

ADRs live in `adr/` at the repo root, not `docs/adr/`: `pnpm build` empties `docs/` (the build output) and would delete them.

## Consequences

- A Guest is a Guest by tier, not by account type: an email login stays a Guest until the address is verified (see CONTEXT.md).
- Banning a Guest bans only that device's identity; a fresh install is a fresh Guest.
