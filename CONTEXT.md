# Burrec mos u zemero

A 3D online take on "Mensch ärgere dich nicht" (Ludo): up to four players race their pawns around a shared track into their own target lane.

## Language

### Rules

**Capture**:
The rule event in which a pawn lands on an opponent's pawn on the main track and sends it back home.
_Avoid_: kill, hit, knock out

### Game modes

**Game mode**:
The rules variant a game is played by, fixed for its **Table**: **Classic** (all four pawns into the finish), **Quick** (every seat starts with one pawn on its start field; the first pawn into the finish wins) or **First capture** (the first **Capture** wins). Quick play only matches **Open tables** of the same Game mode. Says nothing about who plays; that is the **Table**.
_Avoid_: variant, ruleset, game type

**Table**:
Who plays a game and whether anyone else can join it. An **Open table** takes anyone (Quick play, a room code); a **Solo table** is one human against three **Bots**; a **Shared table** is several humans taking turns on one device, any seats left over played by **Bots**. Solo and Shared tables are never joinable and are Classic for now.
_Avoid_: room type, offline mode, pass and play (as a term; "Around the table" is only the label players see)

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
A player without a verified identity: either no login at all (device only), or an email login whose address is not yet verified. A Guest plays, watches others' **Cosmetics**, reads chat and earns **Points**, but wears only the default **Finisher** and no **Prop**, cannot send chat messages, spend **Points** or own **Entitlements**.
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
How an item in the **Cosmetics** catalog can be obtained: **free** (every **Member** has it), **earned** (bought with **Points**), **premium** (only through an **Entitlement**), or **special** (seasonal, e.g. Halloween or Christmas: claimable at no cost by any **Member** during its window, which grants a lasting **Entitlement**; unobtainable once the window closes).
_Avoid_: rarity, level

**Entitlement**:
A **Member**'s lasting right to wear a specific premium or special **Cosmetics** item. Granted by the server, never by the client; outlives the item's **Price tier** window.
_Avoid_: purchase, unlock, inventory

**Buy**:
A **Member** spending **Points** on an earned item, which grants the **Entitlement**.
_Avoid_: unlock, purchase (reserved for real money), redeem

**Claim**:
A **Member** taking a special item at no cost while its window is open, which grants the **Entitlement**. Deliberate: wearing or previewing an item never claims it.
_Avoid_: redeem, collect, unlock

### Progression

**Points**:
A player's spendable balance, earned by playing (finishing a game, each pawn into the finish lane, each **Capture**, a win), by **Referrals**, and later by ads and payments. Spent on items in the **Cosmetics** catalog. Earned as a **Guest** too, but spendable only by a **Member**.
_Avoid_: coins, credits, XP, score

**Welcome bonus**:
The **Points** a player receives on becoming a **Member**: enough to buy one **Prop**.
_Avoid_: signup bonus, starter pack

**Referral**:
A **Member** who joined through another player's referral link and has since started a game. Earns **Points** for both players.
_Avoid_: invite (a room invite is a different thing), affiliate

**Streak**:
The number of consecutive UTC days on which a player has opened the game. Each day of it pays **Points**, collected by a deliberate tap, with a larger bonus every seventh day that grows with each completed week. Guests have one too.
_Avoid_: login bonus, daily reward (as the term), chain

**Streak freeze**:
A protection that covers one missed day so the **Streak** survives it instead of starting over.
_Avoid_: shield, save, skip

**Title**:
A name earned by reaching a play milestone (games played, **Captures**, wins, …), shown under the player's name. A player earns many but shows at most one, chosen in their profile.
_Avoid_: award, badge, achievement, rank

## Relationships

- Each pawn has exactly one **Prop** (possibly none); a player has one **Finisher** shared by all four pawns — together, their **Cosmetics**
- Every **Capture** plays the capturing player's **Finisher**, never the captured player's
- A single move may **Capture** several pawns; they share one **Finisher**
- A seat's **Cosmetics** stay with the seat when its owner disconnects, even while it is an **Abandoned seat**
- **Cosmetics** are chosen in the Wardrobe (main menu) only and are locked once a match has started
- A **Guest** may preview every item in the Wardrobe but wears only the default **Finisher** and no **Prop**
- **Titles** are never bought; they come only from play, and appear in each viewer's own language
- **Points** are paid out only to a player still holding their seat when the game ends; Open tables pay in full, Solo tables at a reduced, daily-capped rate, Shared tables nothing
- Each completed week of a **Streak** earns one **Streak freeze** (at most one held); a missed day uses it automatically, a missed day without one starts the **Streak** over from its first week
- Becoming a **Member** keeps the **Points** earned as a **Guest** and adds the **Welcome bonus**
- A **Member** may wear an item if its **Price tier** is free or they hold an **Entitlement** for it — a special item needs a **Claim** even while its window is open
- Every item in the Wardrobe is previewable by everyone; tier only decides what can be worn
- Every game is played with four seats: each is a human's, an **Abandoned seat**, or a **Bot**
- A human taking a seat replaces its **Bot**, before or during the game (mid-game, with its pawns as they stand); a human leaving a seat before the game starts hands it back to a **Bot**
- A **Solo table** or **Shared table** never has an **Abandoned seat**: when its device drops, the game waits for it instead of playing on, and ends if it doesn't return
- At a **Shared table** every human seat belongs to the one device's player; only that player's own seat wears their **Cosmetics**, the others play as **Guests** would
- Chat, **Reports** and **Blocks** exist only at **Open tables**
- A **Bot** wears no **Prop**, but its **Captures** play a **Finisher** from the whole catalog, the same one for every Bot of a given colour for the whole match; it never chats and cannot be **Reported** or **Blocked**
- Every **Report** implies a **Block**; a **Block** never implies a **Report**
- A **Block** and a **Shadowban** both touch chat only; neither removes anyone from a match or from matchmaking
- Deleting a **Member** removes their **Entitlements** and **Blocks**, but **Reports** against them remain

## Flagged ambiguities

- "block" was used for an **Admin** action — resolved: players **Block**; **Admins** act through their own tools, never a "block".

- "kill" was used for **Capture** — resolved: the rule event is **Capture**; its presentation is the **Finisher**.
