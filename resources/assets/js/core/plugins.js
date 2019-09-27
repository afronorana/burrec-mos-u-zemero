window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
window.renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var body = document.getElementsByTagName('body')[0];
window.setCursor = function(cursor) {
  if (body.style.cursor !== cursor)
    body.style.cursor = cursor;
};

// Camera controls
require('three/examples/js/controls/OrbitControls');
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;

let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

let light1 = new THREE.PointLight(0xFFFFFF, 1, 20);
light1.position.set(10, 10, 10);
light1.castShadow = true;
scene.add(light1);

var pointLightHelper = new THREE.PointLightHelper(light1, 1);
scene.add(pointLightHelper);

//create the shape
let geometry = new THREE.BoxGeometry(1, 1, 1);

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

// Mouse events
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

let cube1 = new THREE.Mesh(geometry, material1);
let cube2 = new THREE.Mesh(geometry, material2);
let cube3 = new THREE.Mesh(geometry, material3);

cube1.name = 'cube_1';
cube2.name = 'cube_2';
cube3.name = 'cube_3';

scene.add(cube1);

scene.add(cube2);

scene.add(cube3);
cube1.position.x = 1.1;
cube2.position.x = 2.2;
cube3.position.x = 3.3;

camera.position.z = 3;

// camera.lookAt(1,0,0)
let rotate1 = false
let rotate2 = false
let rotate3 = false
//game logic
let update = function() {
  if (rotate1)
    cube1.rotation.x += 0.01;
  if (rotate2)
    cube2.rotation.y += 0.01;
  if (rotate3)
    cube3.rotation.z += 0.01;
};
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

window.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('click', function() {
  if (!lastHoveredObject) return;

  if (lastHoveredObject.name === 'cube_1') rotate1 = !rotate1;
  if (lastHoveredObject.name === 'cube_2') rotate2 = !rotate2;
  if (lastHoveredObject.name === 'cube_3') rotate3 = !rotate3;

}, false);

// run game loop
let GameLoop = function() {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

GameLoop();

