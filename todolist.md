# To-do list

Working list of UI/UX fixes. Check items off as they're completed — this may span multiple sessions.

## First screen (start screen)

- [x] Remove the text "Board game • up to 4 players"
- [x] Only show the username and the "Play now" button

## Second screen (after "Play now")

Two panels:

- [x] First panel: titled "Quickplay panel" — has a "Play now" button and a "How does quickplay work" link/button that opens a popup
- [x] Second panel: titled "Play with friends" — has create room and join room. Check the **shtetqytet** sibling project to see what each of these currently offers before implementing.

## Game screen

- [x] "Choose a color on the board" should be its own instruction panel
- [x] When a non-admin player chooses a slot, the instruction text should switch to: "Waiting for {ADMIN_NAME} to start the game"
- [x] Comment out the Settings button for now
- [x] "Leave lobby" should be a small button top-left, to the right of the top-left player name (desktop)
- [x] Chat should move to the top-right corner on mobile, and stay bottom-right on desktop
- [x] Users can chat on game before they chose a color. At the moment they can but their name is not shown, jsut an id. We know the name, just not the color.
- [x] When the game ends, copy the lottie confetti animation from sibling project shtet qytet.
- [x] remove outline options and render quality from the settings.
- [x] when the room is created in a specific environment, all users should see that environment. Environment is PER game.
- [x] Chat panel has too much space under the input and between input and messages area
- [x] everytime chat is opened, it scrolls to top. scroll needs to be at the bottom when opened


## 3D board objects

- [x] Once a user picks their base/color, the indicating circles should be removed/frozen (no longer animating) at that point
- [x] Dice is going inside of the ground. 
- [x] When a pawn is clickable, it is moving up, thats not needed now that it has an indicator around it

## Matchmaking

- [x] If a match is ongoing and has a free slot, another user should be able to join it
- [x] If a player leaves the game (closes the tab, leaves the game via UI etc) make their pawns semi transparent. When they come back, the pawns get fully visible. If a new player joins, they can take the existing pawns in the state they are.

## In-game room code display

- [x] Show the room code in small letters at the top of the screen for the whole game (not just in the lobby)

## Admin screen

- [x] Create an admin screen to see how many games were played and user names. And other states like that. (burrec.com/#admin — needs ADMIN_KEY in the server runtime env; dev key is `dev-admin` in nakama/local.yml)
