import * as THREE from "three";

export default function Orbit({ orbitalRadius, fabricPosition }) {
  const orbitPoints = [];
  const segments = 1200;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = Math.cos(theta) * orbitalRadius;
    const z = Math.sin(theta) * orbitalRadius;
    orbitPoints.push(new THREE.Vector3(x, fabricPosition - 0.01, z));
  }
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const lineDistances = new Float32Array(orbitPoints.length);
  let distance = 0;
  for (let i = 1; i < orbitPoints.length; i++) {
    distance += orbitPoints[i - 1].distanceTo(orbitPoints[i]);
    lineDistances[i] = distance;
  }

  orbitGeometry.setAttribute(
    "lineDistance",
    new THREE.BufferAttribute(lineDistances, 1)
  );

  return (
    <line geometry={orbitGeometry}>
      <lineDashedMaterial color="#ffffff" dashSize={3} gapSize={4} />
    </line>
  );
}
