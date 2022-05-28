import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 
 * 1. Scene => Is like a container that holds objects
 * 2. Camera => Needed in order to view a scene
 * 3. Renderer => A way to make the magic happen
 */

const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

/**
 * Geometry | the {x,y,z} points that makeup a shape
 */
// const geometry = new THREE.TorusKnotGeometry( 10, 3, 50, 16 );
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

/**
 * Material | the wrapping paper for an object
 */
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
/**
 * Mesh | Geometry + Material
 */
const torus = new THREE.Mesh( geometry, material );
scene.add(torus);

/**
 * Light Source
 */
const pointLight = new THREE.PointLight(0xfffff);
pointLight.position.set(5, 5, 5);

/**
 * Ambient light source
 */
const ambientLight = new THREE.AmbientLight(0xfffff);
scene.add(pointLight, ambientLight);

/**
 * Light source helpers
 */
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

/**
 * 3d Controls | Listens to dom evens on mouse and update camera position accordingly
 */
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  /**
   * make the stars first
   */
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xfffff });
  const star = new THREE.Mesh( geometry, material );
  // fill map with random floating stars
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  // set the stars in place
  star.position.set(x, y, z);
  scene.add(star);
}
// Fill array with stars
Array(200).fill().forEach(addStar);

/**
 * Add space background to window
 */
const spaceTexture = new THREE.TextureLoader().load('space-2.jpg');
scene.background = spaceTexture;


/**
 * AVATAR
 */
 const adamTexture = new THREE.TextureLoader().load('adam-2.jpg');

 const adam = new THREE.Mesh(
   new THREE.BoxGeometry(3,3,3),
   new THREE.MeshBasicMaterial( { map: adamTexture } )
 );

 scene.add(adam);


/**
 * MOON
 */
const moonTexture = new THREE.TextureLoader().load('mooon-2.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 25;
moon.position.setX(-8);

adam.position.z = -5;
adam.position.x = 2;

/**
 * 
 * FUNCTIONS
 */


// Move the camera
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  adam.rotation.y += 0.01;
  adam.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

// Animate objects
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.0005;

  // controls.update();

  renderer.render( scene, camera );
}

animate()