# To-do list

Working list of UI/UX fixes. Check items off as they're completed — this may span multiple sessions.

## First screen (start screen)

- [x] Remove the text "Board game • up to 4 players"
- [x] Only show the username and the "Play now" button

## Second screen (after "Play now")

Two panels:

- [ ] First panel: titled "Quickplay panel" — has a "Play now" button and a "How does quickplay work" link/button that opens a popup
- [ ] Second panel: titled "Play with friends" — has create room and join room. Check the **shtetqytet** sibling project to see what each of these currently offers before implementing.

## Game screen

- [ ] "Choose a color on the board" should be its own instruction panel
- [ ] When a non-admin player chooses a slot, the instruction text should switch to: "Waiting for {ADMIN_NAME} to start the game"
- [ ] The room code should only be displayed to the admin (during lobby/selection)
- [ ] Comment out the Settings button for now
- [ ] "Leave lobby" should be a small button top-left, to the right of the top-left player name (desktop)
- [ ] Chat should move to the top-right corner on mobile, and stay bottom-right on desktop

## 3D board objects

- [ ] Once a user picks their base/color, the indicating circles should be removed/frozen (no longer animating) at that point

## Matchmaking

- [ ] If a match is ongoing and has a free slot, another user should be able to join it

## In-game room code display

- [ ] Show the room code in small letters at the top of the screen for the whole game (not just in the lobby)

## Admin screen

- [ ] Create an admin screen to see how many games were played and user names
