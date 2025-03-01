import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export async function initEarth() {
  const container = document.getElementById("container");

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 0, 13);
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  const textureLoader = new THREE.TextureLoader();

  const earthAlbedo = textureLoader.load("assets/albedo.jpg");
  const earthBump = textureLoader.load("assets/bump.jpg");
  const oceanTexture = textureLoader.load("assets/ocean.png");

  const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthAlbedo,
    bumpMap: earthBump,
    bumpScale: 0.05,
    specularMap: oceanTexture,
    specular: new THREE.Color(0x3333ff),
  });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earthMesh);

  const cloudsTexture = textureLoader.load("assets/clouds.png");
  const cloudGeometry = new THREE.SphereGeometry(5.02, 64, 64);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(cloudMesh);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.earthScene = scene;
  window.earthCamera = camera;
  window.earthRenderer = renderer;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
