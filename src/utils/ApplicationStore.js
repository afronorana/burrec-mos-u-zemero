import { markRaw, reactive } from 'vue';
import * as THREE from 'three';

const vector = (x, y, z) => markRaw(new THREE.Vector3(x, y, z));

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
        fields: [vector(1, 0.5, 5), vector(2, 0.5, 5), vector(3, 0.5, 5), vector(4, 0.5, 5)],
        color: '#CE0000',
      },
      {
        fields: [vector(5, 0.5, 1), vector(5, 0.5, 2), vector(5, 0.5, 3), vector(5, 0.5, 4)],
        color: '#F7D708',
      },
      {
        fields: [vector(9, 0.5, 5), vector(8, 0.5, 5), vector(7, 0.5, 5), vector(6, 0.5, 5)],
        color: '#009ECE',
      },
      {
        fields: [vector(5, 0.5, 9), vector(5, 0.5, 8), vector(5, 0.5, 7), vector(5, 0.5, 6)],
        color: '#9CCF31',
      },
    ],
    path: [
      vector(0, 0.5, 4),
      vector(1, 0.5, 4),
      vector(2, 0.5, 4),
      vector(3, 0.5, 4),
      vector(4, 0.5, 4),
      vector(4, 0.5, 3),
      vector(4, 0.5, 2),
      vector(4, 0.5, 1),
      vector(4, 0.5, 0),
      vector(5, 0.5, 0),
      vector(6, 0.5, 0),
      vector(6, 0.5, 1),
      vector(6, 0.5, 2),
      vector(6, 0.5, 3),
      vector(6, 0.5, 4),
      vector(7, 0.5, 4),
      vector(8, 0.5, 4),
      vector(9, 0.5, 4),
      vector(10, 0.5, 4),
      vector(10, 0.5, 5),
      vector(10, 0.5, 6),
      vector(9, 0.5, 6),
      vector(8, 0.5, 6),
      vector(7, 0.5, 6),
      vector(6, 0.5, 6),
      vector(6, 0.5, 7),
      vector(6, 0.5, 8),
      vector(6, 0.5, 9),
      vector(6, 0.5, 10),
      vector(5, 0.5, 10),
      vector(4, 0.5, 10),
      vector(4, 0.5, 9),
      vector(4, 0.5, 8),
      vector(4, 0.5, 7),
      vector(4, 0.5, 6),
      vector(3, 0.5, 6),
      vector(2, 0.5, 6),
      vector(1, 0.5, 6),
      vector(0, 0.5, 6),
      vector(0, 0.5, 5),
    ],
  },
  players: [],
  currentPlayerId: -1,
  playingPlayerIndex: null,
  lastRolledDice: 'Start',
  currentRound: 0,
  gamePlayStatus: {
    isRolling: false,
    isMoving: false,
  },
  controls: null,
});

export default ApplicationStore;
