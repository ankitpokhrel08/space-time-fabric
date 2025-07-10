import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/starfield.js";
import { planetDetails } from "./src/planetDetails.js";


//setting up the renderer window
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true }); //antialiasing smoothens the visual output by belnding edge pixels
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//setting up the camera
const fieldOfView = 75;
const aspect = width / height;
const near = 0.1; //rendering starts at 0.1 units from the camera
//anything near than 0.1 units from the camera is invisible
const far = 1000; //anything farther than 1000 units from the camera wont be rendered
const camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far);
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0);

//creation of a scene
const scene = new THREE.Scene();

//setting up the orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //camera movement slows down gradually after the dragging of mouse stops
controls.dampingFactor = 0.03;

//adding the stars to the scene
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Creating Spacetime Fabric (Rectangular)
function createRectangularSpacetimeFabric({
  width = 60,
  height = 60,
  resolution = 100,
} = {}) {
  // Create a large flat grid
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    resolution,
    resolution
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2; // Rotate to make it lie horizontally
  return mesh;
}

const spaceTimeFabric = createRectangularSpacetimeFabric();
scene.add(spaceTimeFabric);

const RADIUS_SCALE = 0.0001; // km to scene units
const MASS_DISTORTION_SCALE = 1e-26; // tuned for visible dips (kg to distortion units)

function distortFabricWithPlanet(fabricMesh, planetPosition, planetMass) {
  const geometry = fabricMesh.geometry;
  const positions = geometry.attributes.position;

  let maxDistortionAtCenter = 0;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const dx = x - planetPosition.x;
    const dy = y - planetPosition.y;
    const distanceSquared = dx * dx + dy * dy + 0.1; // avoid divide by 0

    const distortion = (-planetMass * MASS_DISTORTION_SCALE) / distanceSquared;

    const currentZ = positions.getZ(i);
    const newZ = currentZ + distortion;
    positions.setZ(i, newZ);

    // Track the deepest dip near planet center
    if (Math.sqrt(distanceSquared) < 0.2) {
      maxDistortionAtCenter = Math.min(maxDistortionAtCenter, newZ);
    }
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();

  return maxDistortionAtCenter;
}

function addPlanetFromRealData(name, position = { x: 0, y: 0, z: 0 }) {
  const data = planetDetails[name];
  if (!data) {
    console.error(`Planet data for ${name} not found.`);
    return;
  }

  const scaledRadius = data.radius_km * RADIUS_SCALE;

  // Create geometry + texture
  const geometry = new THREE.IcosahedronGeometry(scaledRadius, 6);
  const texture = new THREE.TextureLoader().load(`./textures/${data.texture}`);
  const material = new THREE.MeshStandardMaterial({ map: texture });

  const planet = new THREE.Mesh(geometry, material);
  planet.position.set(position.x, position.y, position.z);

  // Distort fabric and raise the planet above the dip
  const maxDip = distortFabricWithPlanet(spaceTimeFabric, planet.position, data.mass_kg);
  const heightAboveDip = scaledRadius * 0.8;
  planet.position.z = maxDip + heightAboveDip;

  scene.add(planet);
}

 addPlanetFromRealData("Sun", { x: 0, y: 0, z: 0 });
 const sunRadius = 696340 * 0.0002; // ≈ 139.27
const earthRadius = 6371 * 0.0002; // ≈ 1.27
const padding = 10; // Just enough space

const distanceFromSun = sunRadius + earthRadius + padding; // ≈ 150.5
//addPlanetFromRealData("Earth", { x: distanceFromSun, y: 0, z: 0 });

 addPlanetFromRealData("Earth", { x: 5, y: 0, z: 0 });
// addPlanetFromRealData("Mars", { x: 6, y: 0, z: 0 });

//managing the lighting settings
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(ambientLight);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
