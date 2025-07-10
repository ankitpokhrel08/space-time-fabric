import * as THREE from "three";
//Creates a 3D starfield using randomly distributed points on a spherical shell.
export default function getStarfield({ numStars = 500 } = {}) {
  /*Generates a random point on the surface of a sphere.
  The point lies between radius 25 and 50 units from the origin.
  */
  function randomSpherePoint() {
    // Place stars much farther away: range [200, 300]
    const radius = Math.random() * 100 + 200;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u; // full circle in radians
    const phi = Math.acos(2 * v - 1); // uniformly distribute over sphere
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      position: new THREE.Vector3(x, y, z),
      colorHue: 0.6, //blue hue
      distance: radius,
    };
  }

  // Arrays to hold buffer data
  const vertexPositions = []; // star positions (x, y, z)
  const vertexColors = []; // star colors (r, g, b)

  for (let i = 0; i < numStars; i++) {
    const star = randomSpherePoint();
    const { position, colorHue } = star;

    // Set star position
    vertexPositions.push(position.x, position.y, position.z);

    // Set star color using HSL for slight variation in lightness
    const color = new THREE.Color().setHSL(colorHue, 0.2, Math.random());
    vertexColors.push(color.r, color.g, color.b);
  }

  // Create geometry and attach position and color buffers
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertexPositions, 3)
  );
  starGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(vertexColors, 3)
  );

  // Star appearance using circular texture
  const starMaterial = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load("./textures/circle.png"),
  });

  // Create and return Points object containing all stars
  return new THREE.Points(starGeometry, starMaterial);
}
