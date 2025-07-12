import { useRef, useEffect } from "react";
import * as THREE from "three";

import { APP_CONFIG } from "../utils/constants.js";

const MASS_DISTORTION_SCALE = APP_CONFIG.massDistortionScale;
const SOFTENING = APP_CONFIG.softening;
const MAX_DISTORTION_DEPTH = APP_CONFIG.maxDistortionDepth;

export default function SpaceTimeFabric({
  planetPosition = new THREE.Vector3(0, 0, 0),
  planetMass = 0,
  resolution = 100,
  width = APP_CONFIG.fabricSize,
  height = APP_CONFIG.fabricSize,
}) {
  const meshRef = useRef();

  useEffect(() => {
    const fabricMesh = meshRef.current;

    if (!fabricMesh) {
      return;
    }

    const geometry = fabricMesh.geometry;
    const positions = geometry.attributes.position;

    let maxDistortionAtCenter = 0;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const dx = x - planetPosition.x;
      const dy = y - planetPosition.y;
      const distanceSquared = dx * dx + dy * dy;

      let distortion =
        (-planetMass * MASS_DISTORTION_SCALE) / (distanceSquared + SOFTENING);

      distortion = Math.max(distortion, MAX_DISTORTION_DEPTH);

      if (distanceSquared < 0.2) {
        maxDistortionAtCenter = Math.min(maxDistortionAtCenter, distortion);
      }

      positions.setZ(i, distortion);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [planetPosition, planetMass]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[width, height, resolution, resolution]} />
      <meshStandardMaterial
        color="green"
        wireframe={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
