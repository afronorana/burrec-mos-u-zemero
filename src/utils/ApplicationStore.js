import { markRaw, reactive } from 'vue';
import * as THREE from 'three';

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
  currentScreen: 'login-screen',
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
    displayName: '',
    selfUserId: null,
    matchId: null,
    mode: null, // 'private' | 'quick'
    joinCode: null,
    mySeat: -1,
    hostUserId: null,
    seats: [], // (seat|null)[4] as broadcast by the server
    seatToPlayerIndex: {}, // seat number -> index into store.players (seats can be non-contiguous)
    matchmaking: false,
    pendingDice: null, // last DICE_RESULT payload, consumed when the dice settles
    diceInFlight: false, // gates MOVE_APPLIED/TURN_CHANGE replay while dice physics run
    chat: [],
    lastError: null,
  },
  localSetupActive: [false, false, false, false],
  localSetupNames: ['', '', '', ''],
  localSetupTypes: ['local', 'ai', 'ai', 'ai'],
  controls: null,
});

export default ApplicationStore;
