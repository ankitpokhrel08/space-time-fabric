import { useRef, useEffect } from "react";
import * as THREE from "three";

import { APP_CONFIG } from "../utils/constants.js";

export default function SpaceTimeFabric({ objectData = [] }) {
  const meshRef = useRef();

  const resolution = 100;
  const width = APP_CONFIG.fabricSize;
  const height = APP_CONFIG.fabricSize;

  useEffect(() => {
    const fabricMesh = meshRef.current;

    if (!fabricMesh) {
      return;
    }

    const geometry = fabricMesh.geometry;
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      positions.setZ(i, 0);
    }

    for (const { position, radius, mass } of objectData) {
      let maxDistortion = -(radius * 1.25);
      let influenceRadius = radius * 2.5;

      if (mass >= 10e9) {
        maxDistortion = -1200;
      }

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        const dx = x - position.x;
        const dy = -y - position.z;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < influenceRadius) {
          const t = distance / influenceRadius;
          const falloff = Math.cos(t * Math.PI) * 0.5 + 0.5;
          const distortion = maxDistortion * falloff;

          const currentZ = positions.getZ(i);

          positions.setZ(i, currentZ + distortion);
        }
      }
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [objectData]);

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
