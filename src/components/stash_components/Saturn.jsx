import { useRef, useState } from "react";
import { TextureLoader, DoubleSide } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import { APP_CONFIG } from "../utils/planetData.js";

export default function Saturn({ size, distance, groupRef }) {
  const starRef = useRef();
  const ringRef = useRef();
  const starTexture = useLoader(TextureLoader, "/assets/saturn_surface.jpg");
  const ringTexture = useLoader(TextureLoader, "/assets/saturn_ring.png");
  const [angle, setAngle] = useState(0);

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.0225;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.000014;
    }
    if (groupRef.current) {
      const speed = 0.00000929454;
      const newAngle = angle - speed;
      setAngle(newAngle);

      const x = Math.cos(newAngle) * distance;
      const z = Math.sin(newAngle) * distance;

      groupRef.current.position.set(x, 65, z);
    }
  });
  return (
    <>
      <mesh ref={starRef}>
        <icosahedronGeometry args={[size, 16]} />
        <meshStandardMaterial map={starTexture} />
        {APP_CONFIG.displayLabel && <PlanetLabel title="Saturn" />}
      </mesh>

      <mesh ref={ringRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[size * 1.1, size * 2.74835886214, 50]} />
        <meshStandardMaterial map={ringTexture} transparent side={DoubleSide} />
      </mesh>
    </>
  );
}
