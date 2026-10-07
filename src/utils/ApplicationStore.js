import { markRaw, reactive } from 'vue';
import * as THREE from 'three';
import { sanitizeCosmetics } from '../../shared/protocol';

const vector = (x, y, z) => markRaw(new THREE.Vector3(x, y, z));

// Ring path, hand-tuned in Figma: junction fields sit at the four edge
// midpoints (path 9/19/29/39) and each target lane hangs from "its"
// junction, running straight toward the central dice platform. From a
// start field the run dives inward and arcs around the inner side of the
// player's neighbouring base before reaching the next junction.
const PATH_CENTER = { x: 5, z: 5 };

// Canonical run: yellow's fields 10..19 (start → right-edge junction),
// digitized from the designer's SVG. Other quarters are 90° rotations.
const QUARTER_RUN = [
  [6.468, 0.041], // start field
  [6.370, 0.773],
  [6.410, 1.550],
  [6.559, 2.290],
  [6.943, 2.910],
  [7.520, 3.468],
  [8.270, 3.700],
  [9.028, 3.840],
  [9.730, 3.840],
  [10.099, 5.000], // junction at the edge midpoint
];

const rotate90 = ([x, z]) => [
  PATH_CENTER.x - (z - PATH_CENTER.z),
  PATH_CENTER.z + (x - PATH_CENTER.x),
];

const buildPathFields = () => {
  const fields = [];
  for (let quarter = 0; quarter < 4; quarter += 1) {
    // Quarter 0 is red's run (fields 0..9) = the canonical yellow run
    // rotated -90°; yellow (1) is the canonical itself, and so on.
    const turns = (quarter + 3) % 4;
    QUARTER_RUN.forEach((point) => {
      let p = point;
      for (let r = 0; r < turns; r += 1) {
        p = rotate90(p);
      }
      fields.push(vector(p[0], 0.5, p[1]));
    });
  }
  return fields;
};

// Target lanes run straight from each edge-midpoint junction toward the
// center, stopping short of the dice platform (radii from the SVG).
const TARGET_LANE_RADII = [4.32, 3.473, 2.627, 1.78];

const buildTargetFields = (dirX, dirZ) => TARGET_LANE_RADII.map((radius) => vector(
    PATH_CENTER.x + (dirX * radius),
    0.5,
    PATH_CENTER.z + (dirZ * radius),
));

const ApplicationStore = reactive({
  currentScreen: 'main-menu',
  diceData: {
    interval: [null, null, null],
    allDone: [false, false, false],
    diceCalc: {
      x: 0,
      y: 0,
      z: 0,
    },
    time: 300,
    x: 0,
    y: 0,
    z: 0,
  },
  settings: {
    quality: 2,
    outlineAppearance: 'classic',
    locale: window.localStorage.getItem('burrec.settings.locale') || 'en',
    environment: window.localStorage.getItem('burrec.settings.environment') || 'day',
    soundEnabled: window.localStorage.getItem('burrec.settings.sound') !== '0',
    // This player's Cosmetics (a Prop + flag per pawn, one Finisher), edited
    // only in the menu wardrobe and sent with every match join. Saves from
    // before per-pawn styling (prop/flag keys only) dress all four pawns.
    cosmetics: sanitizeCosmetics({
      prop: window.localStorage.getItem('burrec.settings.prop'),
      finisher: window.localStorage.getItem('burrec.settings.finisher'),
      flag: window.localStorage.getItem('burrec.settings.flag'),
      pawns: window.localStorage.getItem('burrec.settings.pawns'),
    }),
    // Off: captures skip the zoom + tool and just burst and fly home.
    finishersEnabled: window.localStorage.getItem('burrec.settings.finishers') !== '0',
  },
  fields: {
    home: [
      {
        fields: [
          vector(0, 0.5, 0),
          vector(0, 0.5, 1),
          vector(1, 0.5, 0),
          vector(1, 0.5, 1),
        ],
        color: '#CE0000',
      },
      {
        fields: [
          vector(10, 0.5, 0),
          vector(9, 0.5, 0),
          vector(9, 0.5, 1),
          vector(10, 0.5, 1),
        ],
        color: '#F7D708',
      },
      {
        fields: [
          vector(10, 0.5, 10),
          vector(9, 0.5, 9),
          vector(9, 0.5, 10),
          vector(10, 0.5, 9),
        ],
        color: '#009ECE',
      },
      {
        fields: [
          vector(0, 0.5, 10),
          vector(0, 0.5, 9),
          vector(1, 0.5, 9),
          vector(1, 0.5, 10),
        ],
        color: '#9CCF31',
      },
    ],
    target: [
      {
        fields: buildTargetFields(-1, 0),
        color: '#CE0000',
      },
      {
        fields: buildTargetFields(0, -1),
        color: '#F7D708',
      },
      {
        fields: buildTargetFields(1, 0),
        color: '#009ECE',
      },
      {
        fields: buildTargetFields(0, 1),
        color: '#9CCF31',
      },
    ],
    path: buildPathFields(),
  },
  players: [],
  currentPlayerId: -1,
  playingPlayerIndex: null,
  lastRolledDice: 'Start',
  currentRound: 0,
  gamePlayStatus: {
    isRolling: false,
    isMoving: false,
    isDiceRolling: false,
  },
  // { name, color, self } — set in both local and online mode, shown by WinScreen.
  winner: null,
  // Per-turn countdown: restarted on every turn change; the HUD drains a
  // progress bar from it. Local games enforce expiry in App.vue; online the
  // server's own turn timeout is authoritative.
  turnTimer: {
    startedAt: 0,
    duration: 60000,
    running: false,
  },
  online: {
    enabled: false,
    connectionState: 'idle', // idle | connecting | connected | reconnecting | disconnected
    // Remembered across sessions — the login screen prefills from here.
    displayName: window.localStorage.getItem('burrec.online.displayName') || '',
    selfUserId: null,
    matchId: null,
    mode: null, // 'private' | 'public'
    joinCode: null,
    mySeat: -1,
    hostUserId: null,
    seats: [], // (seat|null)[4] as broadcast by the server
    // userId -> displayName for everyone in the match, seated or not — lets
    // chat name people who haven't picked a color yet.
    displayNames: {},
    // The room creator's environment ('day'|'night'|'dusk'|'dawn'); overrides
    // settings.environment for everyone while in the match.
    environment: null,
    // userId -> { prop, finisher } for everyone in the match, seated or not.
    cosmetics: {},
    // userId -> true once that player used their one mid-game restyle
    // (SET_COSMETICS during play; the in-game Wardrobe).
    restyled: {},
    restyleError: null, // REJECTED reason for our last in-game restyle, if any
    seatToPlayerIndex: {}, // seat number -> index into store.players (seats can be non-contiguous)
    // Resume-after-reload plumbing (see utils/matchSession.js):
    resuming: false, // rejoining a match from the URL/record — show the overlay
    resumePrompt: null, // { matchId, mode, joinCode } offered on the root URL ("continue?")
    pendingResume: null, // { matchId, code } deferred until the visitor sets a name
    pendingDice: null, // last DICE_RESULT payload, consumed when the dice settles
    diceInFlight: false, // gates MOVE_APPLIED/TURN_CHANGE replay while dice physics run
    finisherInFlight: false, // same gate while a capture's Finisher plays
    moveFinisher: null, // Finisher stamped on the MOVE_APPLIED being replayed
    chat: [],
    // Store (CONTEXT.md: Entitlement): item keys this Member owns, and the
    // server-minus-local clock offset so special windows follow server time.
    store: {
      owned: [],
      clockOffset: 0,
    },
    // userIds this player Blocked (server-stored, loaded on sign-in); their
    // chat messages and speech bubbles never show (CONTEXT.md: Block).
    blockedIds: [],
    blockedPlayers: [], // [{ id, name }] for the Settings blocked list
    // Player actions sheet (PlayerActions.vue): { userId, name, messageId?,
    // messageText? } for the player tapped in chat or on a seat chip.
    playerActions: null,
    lastError: null,
    // Signed-in account (NakamaClient.refreshAccountStatus): method is
    // 'guest' | 'email' | 'google' | 'apple'; email/emailVerified only apply
    // to email accounts. member: the server's Guest/Member tier (CONTEXT.md)
    // — an unverified email login is still a Guest.
    account: {
      method: 'guest',
      email: null,
      emailVerified: false,
      member: false,
    },
    // Auth modal state (AuthModal.vue): view is
    // 'login' | 'register' | 'account' | 'forgot' | 'reset' | 'verify' | 'delete'.
    authOpen: false,
    authView: 'login',
    // Why a Guest was sent to the modal ('chat' | 'wardrobe' | 'restyle'), shown above
    // the form; null when opened from the menu (utils/authPrompt.js).
    authReason: null,
    // Profile sheet (ProfileSheet.vue), opened from the top-right button.
    profileOpen: false,
    resetToken: null, // token parsed from a #reset= link, consumed by the reset view
    verifyToken: null, // token parsed from a #verify= link, consumed on modal open
  },
  controls: null,
  // Touch/small-screen flag (set by App.vue on scene init): the dice renders
  // bigger and pawns get a larger invisible tap radius.
  isMobile: false,
  // Global settings modal, openable from the intro/create/join/lobby gear.
  settingsOpen: false,
  // Wardrobe screen: the unsaved draft Cosmetics, the preview panel's
  // viewport rect (CSS px, set by WardrobeScreen) that App.vue renders the
  // preview stage into, the drag-rotated yaw, and a Finisher replay request
  // ({ id, nonce } — a new nonce restarts it).
  wardrobe: {
    // Open over the running game (GameInterface "Style" button) rather than
    // as the menu screen — currentScreen stays 'game-screen'.
    inGame: false,
    draft: null,
    previewPawn: 0, // which pawn's Prop the preview pawn wears (0-3)
    rect: null,
    yaw: 0,
    dragging: false,
    play: null,
  },
  // Testing shortcut: typing TEST toggles it, then keys 1-6 roll that exact
  // value. Only effective when the server runs with DEMO_DICE=1 (dev).
  demoMode: false,
});

export default ApplicationStore;
