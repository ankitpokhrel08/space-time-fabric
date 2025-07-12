import { useMemo } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

import { APP_CONFIG } from "../utils/constants.js";

export default function StarField({ numStars = 5000 }) {
  const starTexture = useLoader(TextureLoader, "/assets/star.png");

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(numStars * 3);
    const colors = new Float32Array(numStars * 3);

    for (let i = 0; i < numStars; i++) {
      // Random sphere point
      const radius =
        Math.random() * APP_CONFIG.starFieldDistance +
        APP_CONFIG.starFieldDistance;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const distanceFromOrigin = Math.sqrt(x * x + y * y + z * z);
      if (distanceFromOrigin < APP_CONFIG.starFieldDistance) {
        i--;
        continue;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random color
      const color = new THREE.Color().setHSL(0.6, 0.2, Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [numStars]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={numStars}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={numStars}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={5} vertexColors map={starTexture} transparent />
    </points>
  );
}
