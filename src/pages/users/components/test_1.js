import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// TODO: 
// sprawdzic czy da sie zrobic export mesha do .glb
// symulator komputera kwantowego
// ssl w delfi, czemu nie dziala i inne takie rzeczy
//
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new THREE.CubeTextureLoader();
const gradientTexture = loader.load([
  "https://via.placeholder.com/512/4c6ef5/000000?text=Top", // px
  "https://via.placeholder.com/512/74c0fc/000000?text=Bottom", // nx
  "https://via.placeholder.com/512/a5d8ff/000000?text=Left", // py
  "https://via.placeholder.com/512/74c0fc/000000?text=Right", // ny
  "https://via.placeholder.com/512/dbe4ff/000000?text=Front", // pz
  "https://via.placeholder.com/512/ccd3ff/000000?text=Back", // nz
]);
scene.background = gradientTexture;

// Glass pane geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 0.1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x88ccee,
  opacity: 0.5,
  transparent: true,
  roughness: 0.1,
  metalness: 0.5,
  reflectivity: 0.9,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});
const glassPane = new THREE.Mesh(geometry, material);
scene.add(glassPane);

// Lights
const light1 = new THREE.PointLight(0xffffff, 1, 100);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.AmbientLight(0x404040); // Soft light
scene.add(light2);

// Controls
const controls = {
  width: 1,
  height: 1,
  depth: 0.1,
  cornerRadius: 0,
  updateGeometry: function () {
    const roundedGeometry = new THREE.BoxGeometry(
      controls.width,
      controls.height,
      controls.depth,
    );
    glassPane.geometry.dispose();
    glassPane.geometry = roundedGeometry;
  },
};

const gui = new dat.GUI();
gui.add(controls, "width", 0.5, 3, 0.1).onChange(controls.updateGeometry);
gui.add(controls, "height", 0.5, 3, 0.1).onChange(controls.updateGeometry);
gui.add(controls, "depth", 0.01, 0.5, 0.01).onChange(controls.updateGeometry);

const orbitControls = new OrbitControls(camera, renderer.domElement);
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
