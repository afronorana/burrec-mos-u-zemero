# Burrec mos u zemero

A 3D online take on "Mensch ärgere dich nicht" (Ludo): up to four players race their pawns around a shared track into their own target lane.

## Language

### Rules

**Capture**:
The rule event in which a pawn lands on an opponent's pawn on the main track and sends it back home.
_Avoid_: kill, hit, knock out

### Game modes

**Game mode**:
The rules variant a room is played in, chosen by whoever creates it (or looks for a Quick play game) and fixed for that room: **Classic** (all four pawns into the finish), **Quick** (every seat starts with one pawn on its start field; two pawns in the finish win) or **First capture** (the first **Capture** wins). Quick play only matches rooms of the same Game mode.
_Avoid_: variant, ruleset, game type

### Seats

**Bot**:
A seat with no human owner, played by the server. Every seat no human holds is a Bot, from the moment a room opens, so a game can start at any time, even with a single human. Shown to players as "Computer".
_Avoid_: AI, computer player, opaque player

**Abandoned seat**:
A human's seat whose owner disconnected mid-game. The server plays it on autopilot until the owner returns or a newcomer takes it over; it is never a **Bot**.
_Avoid_: AI seat, bot (for this sense)

### Cosmetics

**Cosmetics**:
A player's chosen **Props** (one per pawn) and **Finisher** together; purely presentational, never affects rules.
_Avoid_: skin, loadout

**Prop**:
A cosmetic item (crown, party hat, bandana, halo, a country flag, …) worn by one pawn. Each of a player's four pawns wears its own Prop (possibly the same one, possibly none).
_Avoid_: hat, accessory, item

**Finisher**:
The presentation of a **Capture** — a short camera-zoomed animation (trapdoor, baseball bat, frying pan, golf club, tennis racket, bowling ball, wooden hammer, falling anvil, spring glove, cannon, magic wand, vampire bats, UFO abduction, …) chosen by the capturing player and shown to everyone in the match.
_Avoid_: kill animation, capture animation

### Identity

**Guest**:
A player without a verified identity: either no login at all (device only), or an email login whose address is not yet verified. A Guest plays, watches others' **Cosmetics** and reads chat, but cannot wear **Cosmetics**, send chat messages or own **Entitlements**.
_Avoid_: anonymous, visitor

**Member**:
A player whose identity is verified: a verified email, or a Google or Apple login. Becoming a Member upgrades the Guest's existing identity in place, so name and history carry over.
_Avoid_: registered user, account (as a tier)

**Admin**:
A **Member** named in the operator's admin list. Reviews **Reports** and applies **Shadowbans** and **Bans**.
_Avoid_: moderator, operator (as a role)

### Moderation

**Report**:
A player flags another player to the **Admins**, with the offending item (a chat message or a display name) copied as evidence. Goes to a queue that a human resolves or dismisses. Filing a Report also **Blocks** the target.
_Avoid_: flag, complaint

**Block**:
One player decides that another player's chat messages will no longer reach them. Player-initiated, immediate, no **Admin** involved, not mutual, and the blocked player is never told. Never removes anyone from a match.
_Avoid_: mute, ignore, ban (for this sense)

**Shadowban**:
An **Admin** makes a player's chat messages reach only that player. The player is not told, keeps playing normally, and their display name and **Reports** are unaffected. Narrower than a **Ban**; the opposite direction from a **Block**, because it affects everyone's view of the player rather than one viewer's.
_Avoid_: mute (ambiguous with **Block**)

**Ban**:
An **Admin** stops a player from playing at all, until an **Admin** lifts it. For abuse a **Shadowban** cannot reach, such as an offensive display name. Banning a **Guest** only stops that device's identity.
_Avoid_: block, kick

### Store

**Price tier**:
How an item in the **Cosmetics** catalog can be obtained: **free** (every **Member** has it), **premium** (only through an **Entitlement**), or **special** (seasonal, e.g. Halloween or Christmas: claimable at no cost by any **Member** during its window, which grants a lasting **Entitlement**; unobtainable once the window closes).
_Avoid_: rarity, level

**Entitlement**:
A **Member**'s lasting right to wear a specific premium or special **Cosmetics** item. Granted by the server, never by the client; outlives the item's **Price tier** window.
_Avoid_: purchase, unlock, inventory

**Claim**:
A **Member** taking a special item at no cost while its window is open, which grants the **Entitlement**. Deliberate: wearing or previewing an item never claims it.
_Avoid_: redeem, collect, unlock

## Relationships

- Each pawn has exactly one **Prop** (possibly none); a player has one **Finisher** shared by all four pawns — together, their **Cosmetics**
- Every **Capture** plays the capturing player's **Finisher**, never the captured player's
- A single move may **Capture** several pawns; they share one **Finisher**
- A seat's **Cosmetics** stay with the seat when its owner disconnects, even while it is an **Abandoned seat**
- **Cosmetics** are chosen in the Wardrobe (main menu) only and are locked once a match has started
- A **Guest** may preview every item in the Wardrobe but wears none; in a match a Guest's **Capture** plays the lite presentation, never a **Finisher**
- A **Member** may wear an item if its **Price tier** is free or they hold an **Entitlement** for it — a special item needs a **Claim** even while its window is open
- Every item in the Wardrobe is previewable by everyone; tier only decides what can be worn
- Every game is played with four seats: each is a human's, an **Abandoned seat**, or a **Bot**
- A human taking a seat replaces its **Bot**, before or during the game (mid-game, with its pawns as they stand); a human leaving a seat before the game starts hands it back to a **Bot**
- A **Bot** wears no **Cosmetics**, so its **Capture** plays the lite presentation; it never chats and cannot be **Reported** or **Blocked**
- Every **Report** implies a **Block**; a **Block** never implies a **Report**
- A **Block** and a **Shadowban** both touch chat only; neither removes anyone from a match or from matchmaking
- Deleting a **Member** removes their **Entitlements** and **Blocks**, but **Reports** against them remain

## Flagged ambiguities

- "block" was used for an **Admin** action — resolved: players **Block**; **Admins** act through their own tools, never a "block".

- "kill" was used for **Capture** — resolved: the rule event is **Capture**; its presentation is the **Finisher**.
