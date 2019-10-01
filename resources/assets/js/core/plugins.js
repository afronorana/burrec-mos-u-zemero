// Set scene
// window.scene = new THREE.Scene();
// window.camera = new THREE.PerspectiveCamera(20,
//     window.innerWidth / window.innerHeight, 0.1, 100);
// window.renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Controls
// require('three/examples/js/controls/OrbitControls');
//
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// console.log ( controls );

// Camera
// camera.position.x = -15;
// camera.position.y = 15;
// camera.position.z = -15;
// camera.lookAt(5, 0, 5);
//
// window.addEventListener('resize', function() {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

// Mouse interaction
var body = document.getElementsByTagName('body')[0];
window.setCursor = function(cursor) {
  if (body.style.cursor !== cursor)
    body.style.cursor = cursor;
};

//
// // Lighting
// let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
// let lights = [
//   new THREE.PointLight(0xFFFFFF, 1, 20),
//   new THREE.PointLight(0xFFFFFF, 1, 20),
//   new THREE.PointLight(0xFFFFFF, 1, 20),
//   new THREE.PointLight(0xFFFFFF, 1, 20),
// ];
// lights[0].position.set(-2, 10, -2);
// lights[1].position.set(-2, 10, 13);
// lights[2].position.set(13, 10, -2);
// lights[3].position.set(13, 10, 13);
// // light1.castShadow = true;
// scene.add(ambientLight);
// scene.add(lights[0]);
// scene.add(lights[1]);
// scene.add(lights[2]);
// scene.add(lights[3]);
//
// var pointLightHelpers = [
//   new THREE.PointLightHelper(lights[0], 1),
//   new THREE.PointLightHelper(lights[1], 1),
//   new THREE.PointLightHelper(lights[2], 1),
//   new THREE.PointLightHelper(lights[3], 1),
// ];
// scene.add(pointLightHelpers[0]);
// scene.add(pointLightHelpers[1]);
// scene.add(pointLightHelpers[2]);
// scene.add(pointLightHelpers[3]);
//
// /**
//  *  Create objects
//  **/
// let fields = [
//   new THREE.Vector3(4, 0.5, 0),
//   new THREE.Vector3(4, 0.5, 1),
//   new THREE.Vector3(4, 0.5, 2),
//   new THREE.Vector3(4, 0.5, 3),
//   new THREE.Vector3(4, 0.5, 4),
//   new THREE.Vector3(3, 0.5, 4),
//   new THREE.Vector3(2, 0.5, 4),
//   new THREE.Vector3(1, 0.5, 4),
//   new THREE.Vector3(0, 0.5, 4),
//   new THREE.Vector3(0, 0.5, 5),
//   new THREE.Vector3(0, 0.5, 6),
//   new THREE.Vector3(1, 0.5, 6),
//   new THREE.Vector3(2, 0.5, 6),
//   new THREE.Vector3(3, 0.5, 6),
//   new THREE.Vector3(4, 0.5, 6),
//   new THREE.Vector3(4, 0.5, 7),
//   new THREE.Vector3(4, 0.5, 8),
//   new THREE.Vector3(4, 0.5, 9),
//   new THREE.Vector3(4, 0.5, 10),
//   new THREE.Vector3(5, 0.5, 10),
//   new THREE.Vector3(6, 0.5, 10),
//   new THREE.Vector3(6, 0.5, 9),
//   new THREE.Vector3(6, 0.5, 8),
//   new THREE.Vector3(6, 0.5, 7),
//   new THREE.Vector3(6, 0.5, 6),
//   new THREE.Vector3(7, 0.5, 6),
//   new THREE.Vector3(8, 0.5, 6),
//   new THREE.Vector3(9, 0.5, 6),
//   new THREE.Vector3(10, 0.5, 6),
//   new THREE.Vector3(10, 0.5, 5),
//   new THREE.Vector3(10, 0.5, 4),
//   new THREE.Vector3(9, 0.5, 4),
//   new THREE.Vector3(8, 0.5, 4),
//   new THREE.Vector3(7, 0.5, 4),
//   new THREE.Vector3(6, 0.5, 4),
//   new THREE.Vector3(6, 0.5, 3),
//   new THREE.Vector3(6, 0.5, 2),
//   new THREE.Vector3(6, 0.5, 1),
//   new THREE.Vector3(6, 0.5, 0),
//   new THREE.Vector3(5, 0.5, 0)
// ];
//
// // Board
// let boardGeometry = new THREE.BoxGeometry(11, 0.1, 11);
// let boardMaterials = [
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
//   new THREE.MeshLambertMaterial({
//     map: new THREE.TextureLoader().load('resources/board.png'),
//     side: THREE.DoubleSide,
//   }),
// ];

// let boardMaterial = new THREE.MeshFaceMaterial(boardMaterials);
// window.board = new THREE.Mesh(boardGeometry, boardMaterial);
// board.position.x = board.position.z = 5;
// board.position.y = -0.05;
// scene.add(board);

// class Pawn {
//   constructor(_startingPlace, _color, _globalPosition = 0) {
//     //old
//     this.position = 0;
//     this.globalPosition = _globalPosition;
//     this.startingGlobalPosition = _globalPosition;
//     this.color = _color;
//     this.isActive = false;
//     this.startingPlace = _startingPlace;
//     this.isInTargetField = false;
//     this.isSkipping = false;
//     // 3d
//     this.height = 1;
//     this.geometry = new THREE.BoxGeometry(.3, 1, .3);
//     this.material = new THREE.MeshLambertMaterial({color: _color});
//     this.mesh = new THREE.Mesh(this.geometry, this.material);
//     this.mesh.position.copy(fields[_globalPosition]);
//     this.mesh.name = 'cube';
//     // this.mesh.renderOrder = 1 // like z-index
//   }
//
//   moveTo(_position) {
//     this.mesh.position.copy(fields[_position]);
//     this.globalPosition++;
//   }
// }
//
// window.piunat = [];
//
// // EventBus.listen('game.start', function() {
// //   let i = 0;
// //   ApplicationStore.players.forEach(function(player) {
// //     player.pawns.forEach(function(pawn) {
// //       console.log ( 'player', player );
// //       console.log(i);
// //       piunat.push(new Pawn(pawn.startingPlace, pawn.color, pawn.global));
// //       console.log(piunat);
// //       scene.add(piunat[i].mesh);
// //       i++;
// //     });
// //   });
// //
// // });
//
// // scene.add(piunat[0].mesh);
// // scene.add(piunat[1].mesh);
// // scene.add(piunat[2].mesh);
// // scene.add(piunat[3].mesh);
//
// let lastHoveredObject = null;
//


// // draw Scene
let render = function() {

};
//
// //game logic
// let update = function() {
//
// };
//
// window.addEventListener('mousemove', onMouseMove, false);
//
// window.addEventListener('click', function() {
//   if (!lastHoveredObject || lastHoveredObject.name !== 'cube') return;
//
//   piunat.forEach(function(piun) {
//     if (piun.mesh.uuid === lastHoveredObject.uuid) {
//       piun.moveTo(piun.globalPosition + 1);
//     }
//   });
//
// }, false);
//
// // run game loop
// let GameLoop = function() {
//   requestAnimationFrame(GameLoop);
//   update();
//   render();
// };
//
// GameLoop();
//
//
