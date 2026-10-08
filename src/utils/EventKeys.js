const EventKeys = {
  rollDice: 'game.rollDice',
  game: {
    start: 'game.start',
    startOnline: 'game.startOnline',
    won: 'game.won',
    celebrate: 'game.celebrate', // { playerIndex } — the winner's pawns jump before the board shows
  },
  turns: {
    endTurn: 'turns.endTurn',
    repeatTurn: 'turns.repeatTurn',
  },
  pawn: {
    move: 'pawn.move',
    moveComplete: 'pawn.moveComplete',
    captured: 'pawn.captured',
    autoMove: 'pawn.autoMove', // { pawnId } — our only option, played for us
  },
  finisher: {
    done: 'finisher.done',
  },
  net: {
    diceResult: 'net.diceResult',
    diceResolved: 'net.diceResolved',
    turnChange: 'net.turnChange',
    stateSync: 'net.stateSync',
    lobbyUpdated: 'net.lobbyUpdated',
  },
};

export default EventKeys;
