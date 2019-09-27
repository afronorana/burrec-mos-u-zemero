
// Set scene
window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera(20,
    window.innerWidth / window.innerHeight, 0.1, 100);
window.renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Camera
camera.position.y = 15;
camera.position.x = -15;
camera.position.z = -15;

camera.lookAt(5.5, 0, 5.5);


// Lighting
let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

let light1 = new THREE.PointLight(0xFFFFFF, 1, 20);
light1.position.set(10, 10, 10);
light1.castShadow = true;
scene.add(light1);

var pointLightHelper = new THREE.PointLightHelper(light1, 1);
scene.add(pointLightHelper);


// Mouse interaction

var body = document.getElementsByTagName('body')[0];
window.setCursor = function(cursor) {
  if (body.style.cursor !== cursor)
    body.style.cursor = cursor;
};


// Mouse events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}






var bases = [
  new THREE.Vector3(0.5, 0.5, 1),
  new THREE.Vector3(5.5, 0, 1.5),
  new THREE.Vector3(5.5, 0, 2.5),
  new THREE.Vector3(5.5, 0, 2.5),
]


//create the shape
let boardGeometry = new THREE.BoxGeometry(11, 0.1, 11);
let boardMaterial = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
});
window.board = new THREE.Mesh(boardGeometry, boardMaterial);
board.position.x = board.position.z = 5.5;
board.position.y = -0.05;

scene.add(board);
let cubeHeight = 1;
let cubeGeometry = new THREE.BoxGeometry(.3, cubeHeight, .3);

// create a material, colour or image texture
let material1 = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
});
let material2 = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
});
let material3 = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF,
});


window.cube1 = new THREE.Mesh(cubeGeometry, material1);
let cube2 = new THREE.Mesh(cubeGeometry, material2);
let cube3 = new THREE.Mesh(cubeGeometry, material3);
let cube4 = new THREE.Mesh(cubeGeometry, material1);

cube1.name = 'cube';
cube2.name = 'cube';
cube3.name = 'cube';
cube4.name = 'cube';

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);

cube1.position.set(bases[0].x,bases[0].y,bases[0].z);
cube2.position.set(bases[1].x,bases[0].y,bases[0].z);
cube3.position.set(bases[1].x,bases[0].y,bases[0].z);
cube4.position.set(bases[1].x,bases[0].y,bases[0].z);



let lastHoveredObject = null;
// draw Scene
let render = function() {
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    setCursor('pointer');
    if (intersects[0].object !== lastHoveredObject) {
      if (lastHoveredObject) {
        lastHoveredObject.material.color.setHex(lastHoveredObject.currentHex);
      }
      lastHoveredObject = intersects[0].object;
      lastHoveredObject.currentHex = lastHoveredObject.material.color.getHex();
      lastHoveredObject.material.color.setHex(0xffff00);
    }
  } else {
    setCursor('default');
    if (lastHoveredObject) {
      lastHoveredObject.material.color.setHex(lastHoveredObject.currentHex);
    }
    lastHoveredObject = null;
  }
  renderer.render(scene, camera);
};


var bouncing = false;
var bouncingObject = null;

var bounce = function(_bouncingObject){
  bouncingObject = _bouncingObject;
  bouncing = true;
};

let i = 0;

//game logic
let update = function() {

  if (bouncing && bouncingObject){
    if (i < 10) {
      bouncingObject.translateOnAxis(new THREE.Vector3(0, 0.05, 0.05), 1);
      i++;
    } else if (i<20) {
      bouncingObject.translateOnAxis(new THREE.Vector3(0, -0.05, 0.05), 1);
      i++;
    }
    else {
      bouncingObject = null;
      bouncing = false;
      i=0;
    }
  }

};

window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('click', function() {
  if (!lastHoveredObject || lastHoveredObject.name !== 'cube') return;
    bounce(lastHoveredObject);

}, false);

// run game loop
let GameLoop = function() {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

GameLoop();


