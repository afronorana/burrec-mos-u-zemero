# Burrec mos u zemero

A 3D online take on "Mensch ärgere dich nicht" (Ludo): up to four players race their pawns around a shared track into their own target lane.

## Language

### Rules

**Capture**:
The rule event in which a pawn lands on an opponent's pawn on the main track and sends it back home.
_Avoid_: kill, hit, knock out

### Cosmetics

**Cosmetics**:
A player's chosen **Prop** and **Finisher** together; purely presentational, never affects rules.
_Avoid_: skin, loadout

**Prop**:
A cosmetic item (crown, party hat, a country flag, …) worn by all four of a player's pawns; one per player.
_Avoid_: hat, accessory, item

**Finisher**:
The presentation of a **Capture** — a short camera-zoomed animation (trapdoor, baseball bat, frying pan, golf club, tennis racket, bowling ball, wooden hammer, falling anvil, spring glove, cannon, magic wand, vampire bats, UFO abduction, …) chosen by the capturing player and shown to everyone in the match.
_Avoid_: kill animation, capture animation

## Relationships

- A player has exactly one **Prop** (possibly none) and one **Finisher** — together, their **Cosmetics**
- Every **Capture** plays the capturing player's **Finisher**, never the captured player's
- A single move may **Capture** several pawns; they share one **Finisher**
- A seat's **Cosmetics** stay with the seat when its owner disconnects, even while the AI plays it
- **Cosmetics** are chosen in the Wardrobe (main menu) only and are locked once a match has started

## Flagged ambiguities

- "kill" was used for **Capture** — resolved: the rule event is **Capture**; its presentation is the **Finisher**.
