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
camera.position.set(0, 40, 40); // Higher viewpoint to see the whole fabric
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
  width = 80, // Made wider to accommodate all planets
  height = 80,
  resolution = 120, // Increased for smoother distortion
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

// Scale factors for more dramatic visual effect
const RADIUS_SCALE = 0.0001; // Base scale for km to scene units
const SUN_SCALE_FACTOR = 0.3; // Make sun smaller than actual scale
const PLANET_SCALE_FACTOR = 3; // Make planets larger than actual scale
const MASS_DISTORTION_SCALE = 5e-26; // Increased for more visible dips

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

// Orbital parameters for each planet (AU and years, scaled)
const AU = 149597870.7; // km
const ORBIT_SCALE = 0.00000015; // Reduced scale to keep planets closer in view
const LOG_DISTANCE_SCALE = true; // Use logarithmic scaling for distances
const ORBITAL_DATA = {
  Mercury: { a: 0.39, period: 0.24 },
  Venus: { a: 0.72, period: 0.62 },
  Earth: { a: 1.0, period: 1.0 },
  Mars: { a: 1.52, period: 1.88 },
  Jupiter: { a: 5.2, period: 11.86 },
  Saturn: { a: 9.58, period: 29.46 },
  Uranus: { a: 19.18, period: 84.01 },
  Neptune: { a: 30.07, period: 164.8 },
};

// Store planet meshes and their orbital state
const planetObjects = {};

function addPlanetWithOrbit(name) {
  const data = planetDetails[name];
  if (!data) return;

  // Apply visual scaling factors
  let scaledRadius;
  if (name === "Sun") {
    scaledRadius = data.radius_km * RADIUS_SCALE * SUN_SCALE_FACTOR;
  } else {
    scaledRadius = data.radius_km * RADIUS_SCALE * PLANET_SCALE_FACTOR;
  }

  const geometry = new THREE.IcosahedronGeometry(scaledRadius, 6);
  const texture = new THREE.TextureLoader().load(`./textures/${data.texture}`);
  let material;
  if (name === "Sun") {
    material = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color(1, 0.8, 0.2),
      emissiveIntensity: 1.5,
    });
  } else {
    material = new THREE.MeshStandardMaterial({ map: texture });
  }
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  scene.add(mesh);
  if (name === "Sun") {
    mesh.position.set(0, 0, 0);
    const sunLight = new THREE.PointLight(0xfff7b2, 2, 500);
    sunLight.position.copy(mesh.position);
    scene.add(sunLight);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lensflare/lensflare0.png"
      ),
      color: 0xffe066,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(scaledRadius * 6, scaledRadius * 6, 1);
    sprite.position.copy(mesh.position);
    scene.add(sprite);
  }
  planetObjects[name] = {
    mesh,
    angle: Math.random() * Math.PI * 2, // random start
  };
}

// Add Sun and all planets
addPlanetWithOrbit("Sun");
Object.keys(ORBITAL_DATA).forEach((name) => addPlanetWithOrbit(name));

//managing the lighting settings
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(ambientLight);
scene.add(directionalLight);

// Remove old addPlanetFromRealData and planet placement code

function updatePlanetPositionsAndFabric(time) {
  // Reset mesh first
  const geometry = spaceTimeFabric.geometry;
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    positions.setZ(i, 0);
  }

  // Move planets in orbits
  Object.entries(ORBITAL_DATA).forEach(([name, orbit]) => {
    const obj = planetObjects[name];
    if (!obj) return;

    // Calculate orbit distance with optional logarithmic scaling
    let a;
    if (LOG_DISTANCE_SCALE) {
      // Use log scale to compress outer planets
      a = (1 + Math.log(orbit.a)) * AU * ORBIT_SCALE;
    } else {
      a = orbit.a * AU * ORBIT_SCALE;
    }

    const period = orbit.period;
    const angle = ((time / period) % 1) * Math.PI * 2 + obj.angle;

    // Update planet position
    obj.mesh.position.x = Math.cos(angle) * a;
    obj.mesh.position.y = Math.sin(angle) * a;

    // Distort fabric at this planet's position
    const mass = planetDetails[name]?.mass_kg || 0;
    const maxDip = distortFabricWithPlanet(
      spaceTimeFabric,
      obj.mesh.position,
      mass
    );

    // Place planet directly on the fabric
    obj.mesh.position.z = maxDip;
  });

  // Sun stays at center
  if (planetObjects.Sun) {
    planetObjects.Sun.mesh.position.set(0, 0, 0);
    const sunMass = planetDetails.Sun?.mass_kg || 0;
    const maxDip = distortFabricWithPlanet(
      spaceTimeFabric,
      planetObjects.Sun.mesh.position,
      sunMass
    );
    planetObjects.Sun.mesh.position.z = maxDip;
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

function animate() {
  requestAnimationFrame(animate);
  const elapsed = performance.now() * 0.00002; // Slow down the animation
  updatePlanetPositionsAndFabric(elapsed);
  renderer.render(scene, camera);
  controls.update();
}
animate();
