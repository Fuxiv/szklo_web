//@ts-ignore
import * as THREE from "three";
//@ts-ignore
import { Reflector } from "three/addons/objects/Reflector.js";
//@ts-ignore
import { Refractor } from "three/addons/objects/Refractor.js";
//@ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//@ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//@ts-ignore
import { WaterRefractionShader } from "three/addons/shaders/WaterRefractionShader.js";
import { useEffect, useRef } from "react";
// e.row.data.TP_W
export var glassPane: any;
export var ramkaP: any;
export var ramkaD: any;
export var ramkaL: any;
export var ramkaG: any;
function ThreeTest() {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 450);
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
    //    const mirrorGeometry = new THREE.PlaneGeometry(3, 3);
    //    const mirror = new Reflector(mirrorGeometry, {
    //      clipBias: 0.003,
    //      textureWidth: window.innerWidth * window.devicePixelRatio,
    //      textureHeight: window.innerHeight * window.devicePixelRatio,
    //      color: 0x777777,
    //      opacity: 0.1
    //    });
    //    mirror.position.set(0, -0.5, 0); // Slightly below the glass pane
    //    scene.add(mirror);

    //    const refractorGeometry = new THREE.PlaneGeometry(90, 90);
    //
    //    const refractor = new Refractor(refractorGeometry, {
    //      color: 0xcbcbcb,
    //      textureWidth: 1024,
    //      textureHeight: 1024,
    //      shader: WaterRefractionShader,
    //    });
    //    refractor.position.z = 1;
    //    //brakuje mu jeszcze tekstury
    //    scene.add(refractor);
    // Glass pane geometry and material
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xE4FFF0,
      opacity: 0.2,
      transparent: true,
      roughness: 0.1,
      metalness: 0.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    glassPane = new THREE.Mesh(geometry, material);
    scene.add(glassPane);

    let ramkaGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    let ramkaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa0a0a0
    })
    ramkaP = new THREE.Mesh(ramkaGeometry, ramkaMaterial);
    ramkaP.scale.z = 3;
    scene.add(ramkaP);

    ramkaGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    ramkaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa0a0a0
    })
    ramkaD = new THREE.Mesh(ramkaGeometry, ramkaMaterial);
    ramkaD.scale.z = 3;
    scene.add(ramkaD);

    ramkaGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    ramkaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa0a0a0
    })
    ramkaL = new THREE.Mesh(ramkaGeometry, ramkaMaterial);
    ramkaL.scale.z = 3;
    scene.add(ramkaL);

    ramkaGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    ramkaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa0a0a0
    })
    ramkaG = new THREE.Mesh(ramkaGeometry, ramkaMaterial);
    ramkaG.scale.z = 3;
    scene.add(ramkaG);
    // Lights
    const light1 = new THREE.PointLight(0xffffff, 100, 0);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0x404040); // Soft light
    scene.add(light2);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    //    Controls
    //    const controls = {
    //      width: 1,
    //      height: 1,
    //      depth: 0.1,
    //      cornerRadius: 0,
    //      updateGeometry: function () {
    //        const roundedGeometry = new THREE.BoxGeometry(
    //          controls.width,
    //          controls.height,
    //          controls.depth,
    //        );
    //        glassPane.geometry.dispose();
    //        glassPane.geometry = roundedGeometry;
    //      },
    //    };
    //
    //    const gui = new dat.GUI();
    //    gui.add(controls, "width", 0.5, 3, 0.1).onChange(controls.updateGeometry);
    //    gui.add(controls, "height", 0.5, 3, 0.1).onChange(controls.updateGeometry);
    //    gui
    //      .add(controls, "depth", 0.01, 0.5, 0.01)
    //      .onChange(controls.updateGeometry);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return (
    <div style={{ width: "100%", height: "300px" }} ref={refContainer}></div>
  );
}
export default ThreeTest;

// TODO:
// sprawdzic czy da sie zrobic export mesha do .glb
// symulator komputera kwantowego
//
//const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera(
//  75,
//  window.innerWidth / window.innerHeight,
//  0.1,
//  1000,
//);
//camera.position.z = 5;
//
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);
//const loader = new THREE.CubeTextureLoader();
//const gradientTexture = loader.load([
//  "https://via.placeholder.com/512/4c6ef5/000000?text=Top", // px
//  "https://via.placeholder.com/512/74c0fc/000000?text=Bottom", // nx
//  "https://via.placeholder.com/512/a5d8ff/000000?text=Left", // py
//  "https://via.placeholder.com/512/74c0fc/000000?text=Right", // ny
//  "https://via.placeholder.com/512/dbe4ff/000000?text=Front", // pz
//  "https://via.placeholder.com/512/ccd3ff/000000?text=Back", // nz
//]);
//scene.background = gradientTexture;
//
//// Glass pane geometry and material
//const geometry = new THREE.BoxGeometry(1, 1, 0.1);
//const material = new THREE.MeshPhysicalMaterial({
//  color: 0x88ccee,
//  opacity: 0.5,
//  transparent: true,
//  roughness: 0.1,
//  metalness: 0.5,
//  reflectivity: 0.9,
//  clearcoat: 1.0,
//  clearcoatRoughness: 0.1,
//});
//const glassPane = new THREE.Mesh(geometry, material);
//scene.add(glassPane);
//
//// Lights
//const light1 = new THREE.PointLight(0xffffff, 1, 100);
//light1.position.set(5, 5, 5);
//scene.add(light1);
//
//const light2 = new THREE.AmbientLight(0x404040); // Soft light
//scene.add(light2);
//
//// Controls
//const controls = {
//  width: 1,
//  height: 1,
//  depth: 0.1,
//  cornerRadius: 0,
//  updateGeometry: function () {
//    const roundedGeometry = new THREE.BoxGeometry(
//      controls.width,
//      controls.height,
//      controls.depth,
//    );
//    glassPane.geometry.dispose();
//    glassPane.geometry = roundedGeometry;
//  },
//};
//
//const gui = new dat.GUI();
//gui.add(controls, "width", 0.5, 3, 0.1).onChange(controls.updateGeometry);
//gui.add(controls, "height", 0.5, 3, 0.1).onChange(controls.updateGeometry);
//gui.add(controls, "depth", 0.01, 0.5, 0.01).onChange(controls.updateGeometry);
//
//const orbitControls = new OrbitControls(camera, renderer.domElement);
//// Animation loop
//function animate() {
//  requestAnimationFrame(animate);
//  renderer.render(scene, camera);
//}
//
//animate();
//
//// Handle resizing
//window.addEventListener("resize", () => {
//  camera.aspect = window.innerWidth / window.innerHeight;
//  camera.updateProjectionMatrix();
//  renderer.setSize(window.innerWidth, window.innerHeight);
//});
