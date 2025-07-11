import { useRef, useState } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import { APP_CONFIG } from "../utils/planetData.js";

export default function Mercury({ size, distance }) {
  const starRef = useRef();
  const starTexture = useLoader(TextureLoader, "/assets/mercury_surface.jpg");

  const [angle, setAngle] = useState(0);

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.00017;

      const speed = 0.00113636363;
      const newAngle = angle - speed;
      setAngle(newAngle);

      const x = Math.cos(newAngle) * distance;
      const z = Math.sin(newAngle) * distance;

      starRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      <mesh ref={starRef} position={[0, 0, distance]}>
        <icosahedronGeometry args={[size, 16]} />
        <meshStandardMaterial map={starTexture} />
        {APP_CONFIG.displayLabel && <PlanetLabel title="Mercury" />}
      </mesh>
    </>
  );
}
