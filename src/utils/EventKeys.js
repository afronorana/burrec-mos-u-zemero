const EventKeys = {
  rollDice: 'game.rollDice',
  game: {
    startOnline: 'game.startOnline',
    celebrate: 'game.celebrate', // { seat } — the winner's pawns jump before the board shows
  },
  pawn: {
    captured: 'pawn.captured',
    autoMove: 'pawn.autoMove', // { pawnId } — our only option, played for us
  },
  net: {
    diceResult: 'net.diceResult',
    turnChange: 'net.turnChange',
    stateSync: 'net.stateSync',
    lobbyUpdated: 'net.lobbyUpdated',
  },
};

export default EventKeys;
