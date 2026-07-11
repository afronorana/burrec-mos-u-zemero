const EventKeys = {
  rollDice: 'game.rollDice',
  game: {
    start: 'game.start',
    startOnline: 'game.startOnline',
    won: 'game.won',
  },
  turns: {
    endTurn: 'turns.endTurn',
    repeatTurn: 'turns.repeatTurn',
  },
  pawn: {
    move: 'pawn.move',
    moveComplete: 'pawn.moveComplete',
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
