import ApplicationStore from './ApplicationStore';

const translations = {
  en: {
    title: 'Burrec Mos u Zemero',
    subTitle: 'Board game • up to 4 players',
    localGame: 'Local Game',
    playOnline: 'Play Online',
    players: 'Players',
    playersDesc: 'Leave a slot blank to use a computer player.',
    playerPlaceholder: 'Player {num}',
    graphics: 'Graphics',
    outlineStyle: 'Outline Style',
    renderQuality: 'Render Quality',
    back: 'Back',
    play: 'Play',
    save: 'Save',
    language: 'Language',
    environment: 'Environment',
    settings: {
      title: 'Settings',
      sound: 'Sound',
      soundOn: 'On',
      soundOff: 'Off',
    },
    login: {
      title: 'Welcome to Burrec',
      desc: 'Enter your display name to start playing.',
      proceed: 'Enter Game',
    },
    local: {
      setupPrompt: 'Click empty pawn bases in 3D to claim colors.',
      emptyBase: 'Empty base (click to join)',
    },
    env: {
      day: 'Day',
      night: 'Night',
      dusk: 'Dusk',
      dawn: 'Dawn',
    },
    online: {
      playOnline: 'Play Online',
      searching: 'Searching for players…',
      cancel: 'Cancel',
      yourName: 'Your name',
      displayName: 'Display name',
      quickMatch: 'Quick Match',
      playNow: 'Play now',
      createRoom: 'Create Room',
      joinRoom: 'Join Room',
      createRoomTitle: 'Create a room',
      joinRoomTitle: 'Join a room',
      roomType: 'Room type',
      public: 'Public',
      private: 'Private',
      publicHint: 'Anyone can find and join it via Quick Match.',
      privateHint: 'Only people with the code can join.',
      leaveConfirmTitle: 'Leave the game?',
      leaveConfirmBody: 'You will be removed from this match.',
      leaveConfirmYes: 'Leave',
      leaveConfirmNo: 'Stay',
      lobbyCode: 'Lobby Code',
      join: 'Join',
      lobby: 'Lobby',
      code: 'Code',
      copy: 'Copy',
      copied: '✓',
      ready: 'Ready',
      waiting: 'Waiting',
      readyCheck: 'Ready?',
      readyDone: 'Ready ✓',
      chooseColorPrompt: 'Choose a color on the board',
      freeSlot: 'Free slot',
      clickToJoin: 'Click to join',
      start: 'Start',
      leaveLobby: 'Leave Lobby',
      newGame: 'New Game',
      leaveGame: 'Leave Game',
      connecting: 'Reconnecting…',
      disconnected: 'Connection lost.',
      resuming: 'Rejoining your game…',
      resumeTitle: 'Continue your game?',
      resumeBody: 'You recently left a game that is still going. Do you want to continue?',
      resume: 'Continue',
      resumeDismiss: 'Not now',
      chatPlaceholder: 'Say something…',
      send: 'Send',
      emptyChat: 'No messages yet.',
    },
    game: {
      waiting: 'Waiting…',
      rolled: 'Rolled: {val}',
      pawn: 'Pawn {num}',
      rollDice: 'Roll Dice',
      setupBoard: 'Setting up the board…',
      waitingForPlayer: 'Waiting for {name}…',
      playerThinking: '{name} is thinking…',
      pickPawn: 'Pick a pawn to move.',
      rollDicePrompt: 'Roll the dice!',
    },
    win: {
      wins: '{name} wins!',
      congrats: 'Congratulations!',
      betterLuck: 'Better luck next time.',
      backToMenu: 'Back to Menu',
    },
    quality: {
      low: 'Low',
      balanced: 'Balanced',
      high: 'High',
    },
    errors: {
      not_found: 'No open lobby with that code.',
      invalid_code: 'That code is not valid.',
      match_full: 'That lobby is already full.',
      match_started: 'That game has already started.',
      already_joined: 'You are already in that lobby.',
      join_failed: 'Could not join the match.',
      connect_failed: 'Could not reach the game server.',
      reconnect_failed: 'Lost connection to the game server.',
      match_gone: 'That game is no longer available.',
      generic: 'Something went wrong. Try again.',
    }
  },
  sq: {
    title: 'Burrec Mos u Zemero',
    subTitle: 'Lojë tavoline • deri në 4 lojtarë',
    localGame: 'Lojë Lokale',
    playOnline: 'Luaj Online',
    players: 'Lojtarët',
    playersDesc: 'Lini një hapësirë bosh për të përdorur lojtar kompjuterik.',
    playerPlaceholder: 'Lojtari {num}',
    graphics: 'Grafika',
    outlineStyle: 'Stili i Konturit',
    renderQuality: 'Cilësia e Renderimit',
    back: 'Mbrapa',
    play: 'Luaj',
    save: 'Ruaj',
    language: 'Gjuha',
    environment: 'Mjedisi',
    settings: {
      title: 'Cilësimet',
      sound: 'Zëri',
      soundOn: 'Ndezur',
      soundOff: 'Fikur',
    },
    login: {
      title: 'Mirësevini në Burrec',
      desc: 'Vendosni emrin tuaj për të filluar lojën.',
      proceed: 'Hyr në Lojë',
    },
    local: {
      setupPrompt: 'Kliko mbi bazat e zbrazëta në 3D për të marrë ngjyrën.',
      emptyBase: 'Bazë e zbrazët (kliko për të hyrë)',
    },
    env: {
      day: 'Ditë',
      night: 'Natë',
      dusk: 'Muzg',
      dawn: 'Agim',
    },
    online: {
      playOnline: 'Luaj Online',
      searching: 'Duke kërkuar për lojtarë…',
      cancel: 'Anulo',
      yourName: 'Emri juaj',
      displayName: 'Emri për shfaqje',
      quickMatch: 'Ndeshje e Shpejtë',
      playNow: 'Luaj Tani',
      createRoom: 'Krijo Dhomë',
      joinRoom: 'Hyr në Dhomë',
      createRoomTitle: 'Krijo një dhomë',
      joinRoomTitle: 'Hyr në një dhomë',
      roomType: 'Lloji i dhomës',
      public: 'Publike',
      private: 'Private',
      publicHint: 'Kushdo mund ta gjejë dhe të hyjë me Ndeshje të Shpejtë.',
      privateHint: 'Vetëm ata me kodin mund të hyjnë.',
      leaveConfirmTitle: 'Dilni nga loja?',
      leaveConfirmBody: 'Do të hiqeni nga kjo ndeshje.',
      leaveConfirmYes: 'Dil',
      leaveConfirmNo: 'Qëndro',
      lobbyCode: 'Kodi i Lobit',
      join: 'Hyr',
      lobby: 'Lobi',
      code: 'Kodi',
      copy: 'Kopjo',
      copied: '✓',
      ready: 'Gati',
      waiting: 'Duke pritur',
      readyCheck: 'Gati?',
      readyDone: 'Gati ✓',
      chooseColorPrompt: 'Zgjidh një ngjyrë në fushë',
      freeSlot: 'Vend i lirë',
      clickToJoin: 'Kliko për të hyrë',
      start: 'Fillo',
      leaveLobby: 'Dil nga Lobi',
      newGame: 'Lojë e Re',
      leaveGame: 'Dil nga Loja',
      connecting: 'Duke u rilidhur…',
      disconnected: 'Lidhja humbi.',
      resuming: 'Duke u rikthyer në lojë…',
      resumeTitle: 'Vazhdo lojën?',
      resumeBody: 'Së fundmi dole nga një lojë që ende vazhdon. Dëshiron të vazhdosh?',
      resume: 'Vazhdo',
      resumeDismiss: 'Jo tani',
      chatPlaceholder: 'Thuaj diçka…',
      send: 'Dërgo',
      emptyChat: 'Nuk ka mesazhe ende.',
    },
    game: {
      waiting: 'Duke pritur…',
      rolled: 'Doli: {val}',
      pawn: 'Pioni {num}',
      rollDice: 'Hidhe Zarin',
      setupBoard: 'Duke përgatitur fushën…',
      waitingForPlayer: 'Duke pritur për {name}…',
      playerThinking: '{name} është duke menduar…',
      pickPawn: 'Zgjidh një pion për të lëvizur.',
      rollDicePrompt: 'Hidhe zarin!',
    },
    win: {
      wins: '{name} fiton!',
      congrats: 'Urime!',
      betterLuck: 'Fat herën tjetër.',
      backToMenu: 'Kthehu te Menuja',
    },
    quality: {
      low: 'E ulët',
      balanced: 'E balancuar',
      high: 'E lartë',
    },
    errors: {
      not_found: 'Nuk u gjet asnjë lobi me atë kod.',
      invalid_code: 'Ky kod nuk është i vlefshëm.',
      match_full: 'Ky lobi është i plotësuar.',
      match_started: 'Kjo lojë ka filluar tashmë.',
      already_joined: 'Jeni bashkuar tashmë me këtë lobi.',
      join_failed: 'Dështoi bashkimi me lojën.',
      connect_failed: 'Nuk mund të lidhej me serverin e lojës.',
      reconnect_failed: 'Humbi lidhja me serverin e lojës.',
      match_gone: 'Kjo lojë nuk është më e disponueshme.',
      generic: 'Diçka shkoi keq. Provo përsëri.',
    }
  }
};

export function t(key, params = {}) {
  const locale = ApplicationStore.settings.locale || 'en';
  const dict = translations[locale] || translations.en;
  
  const keys = key.split('.');
  let val = dict;
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      val = null;
      break;
    }
  }

  if (val === null || val === undefined) {
    let fallbackVal = translations.en;
    for (const k of keys) {
      if (fallbackVal && typeof fallbackVal === 'object' && k in fallbackVal) {
        fallbackVal = fallbackVal[k];
      } else {
        fallbackVal = null;
        break;
      }
    }
    val = fallbackVal;
  }

  if (typeof val !== 'string') {
    return key;
  }

  let formatted = val;
  for (const [pk, pv] of Object.entries(params)) {
    formatted = formatted.replace(new RegExp(`\\{${pk}\\}`, 'g'), pv);
  }

  return formatted;
}
