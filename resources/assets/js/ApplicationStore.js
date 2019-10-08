
window.ApplicationStore = {
  x: 0,
  y: 0,
  z: 0,



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
    quality: 12,
  },
  fields: {
    home: [
      {
        fields: [
          new THREE.Vector3(0, 0.5, 0),
          new THREE.Vector3(0, 0.5, 1),
          new THREE.Vector3(1, 0.5, 0),
          new THREE.Vector3(1, 0.5, 1),
        ],
        color: '#CE0000',
      },
      {
        fields: [
          new THREE.Vector3(10, 0.5, 0),
          new THREE.Vector3(9, 0.5, 0),
          new THREE.Vector3(9, 0.5, 1),
          new THREE.Vector3(10, 0.5, 1),
        ],
        color: '#F7D708',

      },
      {
        fields: [
          new THREE.Vector3(10, 0.5, 10),
          new THREE.Vector3(9, 0.5, 9),
          new THREE.Vector3(9, 0.5, 10),
          new THREE.Vector3(10, 0.5, 9),
        ],
        color: '#9CCF31',
      },
      {
        fields: [
          new THREE.Vector3(0, 0.5, 10),
          new THREE.Vector3(0, 0.5, 9),
          new THREE.Vector3(1, 0.5, 9),
          new THREE.Vector3(1, 0.5, 10),
        ],
        color: '#009ECE',

      },
    ],
    target: [
      {
        fields: [
          new THREE.Vector3(1, 0.5, 5), new THREE.Vector3(2, 0.5, 5),
          new THREE.Vector3(3, 0.5, 5), new THREE.Vector3(4, 0.5, 5),
        ],
        color: '#CE0000',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 1), new THREE.Vector3(5, 0.5, 2),
          new THREE.Vector3(5, 0.5, 3), new THREE.Vector3(5, 0.5, 4),
        ],
        color: '#F7D708',
      },
      {
        fields: [
          new THREE.Vector3(9, 0.5, 5), new THREE.Vector3(8, 0.5, 5),
          new THREE.Vector3(7, 0.5, 5), new THREE.Vector3(6, 0.5, 5),
        ],
        color: '#9CCF31',
      },
      {
        fields: [
          new THREE.Vector3(5, 0.5, 9), new THREE.Vector3(5, 0.5, 8),
          new THREE.Vector3(5, 0.5, 7), new THREE.Vector3(5, 0.5, 6),
        ],
        color: '#009ECE',
      },
    ],
    path: [
      new THREE.Vector3(0, 0.5, 4), // 0
      new THREE.Vector3(1, 0.5, 4), // 1
      new THREE.Vector3(2, 0.5, 4),
      new THREE.Vector3(3, 0.5, 4),
      new THREE.Vector3(4, 0.5, 4),
      new THREE.Vector3(4, 0.5, 3),
      new THREE.Vector3(4, 0.5, 2),
      new THREE.Vector3(4, 0.5, 1),
      new THREE.Vector3(4, 0.5, 0),
      new THREE.Vector3(5, 0.5, 0),
      new THREE.Vector3(6, 0.5, 0),
      new THREE.Vector3(6, 0.5, 1),
      new THREE.Vector3(6, 0.5, 2),
      new THREE.Vector3(6, 0.5, 3),
      new THREE.Vector3(6, 0.5, 4),
      new THREE.Vector3(7, 0.5, 4),
      new THREE.Vector3(8, 0.5, 4),
      new THREE.Vector3(9, 0.5, 4),
      new THREE.Vector3(10, 0.5, 4),
      new THREE.Vector3(10, 0.5, 5),
      new THREE.Vector3(10, 0.5, 6),
      new THREE.Vector3(9, 0.5, 6),
      new THREE.Vector3(8, 0.5, 6),
      new THREE.Vector3(7, 0.5, 6),
      new THREE.Vector3(6, 0.5, 6),
      new THREE.Vector3(6, 0.5, 7),
      new THREE.Vector3(6, 0.5, 8),
      new THREE.Vector3(6, 0.5, 9),
      new THREE.Vector3(6, 0.5, 10),
      new THREE.Vector3(5, 0.5, 10),
      new THREE.Vector3(4, 0.5, 10),
      new THREE.Vector3(4, 0.5, 9),
      new THREE.Vector3(4, 0.5, 8),
      new THREE.Vector3(4, 0.5, 7),
      new THREE.Vector3(4, 0.5, 6),
      new THREE.Vector3(3, 0.5, 6),
      new THREE.Vector3(2, 0.5, 6),
      new THREE.Vector3(1, 0.5, 6),
      new THREE.Vector3(0, 0.5, 6),
      new THREE.Vector3(0, 0.5, 5),

    ],
  },
  players: [],
  currentPlayerId: -1,

  lastRolledDice: 'Start',

  currentRound: 0,
  gamePlayStatus: {
    isRolling: false,
    isMoving: false,
  },
  controls: null,
};
