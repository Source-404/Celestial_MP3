import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("./textures/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(0.5, 14, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0xdddddd);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Text

const loader = new THREE.FontLoader();

loader.load("./fonts/RUBRIKA_Regular.json", function (font) {
  const geometry = new THREE.TextGeometry("FEEL YOUR MUSIC", {
    font: font,
    size: 4,
    height: 2,
  });

  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({ color: 0xad4000 }), //front
    // new THREE.MeshPhongMaterial({ color: 0x5c2301 }), //side
  ]);

  textMesh.castShadow = true;
  textMesh.position.z = -20;
  textMesh.position.x = -15;
  textMesh.position.y = 7;

  scene.add(textMesh);
});

// Buttons
const controlObj = new THREE.Object3D();

function addButtons() {
  const geometry1 = new THREE.BoxGeometry(0.1, 0.1, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
  const playBtn = new THREE.Mesh(geometry1, material);
  playBtn.position.set(1, 0.2, 0.05);

  const geometry2 = new THREE.BoxGeometry(0.1, 0.1, 0.5);
  const volUp = new THREE.Mesh(geometry2, material);
  volUp.position.set(-1, 0.2, 0.05);

  const geometry3 = new THREE.BoxGeometry(1, 0.5, 0.05);
  const displayBtn = new THREE.Mesh(geometry3, material);
  displayBtn.position.set(0, -1, 0);

  scene.add(controlObj);
  controlObj.add(playBtn);
  controlObj.add(volUp);
  controlObj.add(displayBtn);
}

//addButtons();

// Assests

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(3000).fill().forEach(addStar);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//Light 2

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 4;

scene.add(pointLight2);

// const light1 = gui.addFolder("Light1");

// light1.add(pointLight2.position, "x").min(-6).max(6).step(0.02);
// light1.add(pointLight2.position, "y").min(-3).max(3).step(0.02);
// light1.add(pointLight2.position, "z").min(-3).max(3).step(0.02);
// light1.add(pointLight2, "intensity").min(0).max(10).step(0.02);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

//Light 3

const pointLight3 = new THREE.PointLight(0x87ff, 2);
pointLight3.position.set(1.72, -1.64, -1.6);
pointLight3.intensity = 4;

scene.add(pointLight3);

// const light2 = gui.addFolder("Light2");

// light2.add(pointLight3.position, "x").min(-6).max(6).step(0.02);
// light2.add(pointLight3.position, "y").min(-3).max(3).step(0.02);
// light2.add(pointLight3.position, "z").min(-3).max(3).step(0.02);
// light2.add(pointLight3, "intensity").min(0).max(10).step(0.02);

// const light2Color = {
//   color: 0xff0000,
// };

// light2.addColor(light2Color, "color").onChange(() => {
//   pointLight3.color.set(light2Color.color);
// });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2);

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls

const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

const onMouseMove = (event) => {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
};

document.addEventListener("mousemove", onMouseMove);

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  // controlObj.rotation.y = 0.05 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  // sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
