import { useRef } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import { APP_CONFIG } from "../utils/planetData.js";

export default function Sun({ size }) {
  const starRef = useRef();
  const starTexture = useLoader(TextureLoader, "/assets/sun_surface.jpg");

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.00037;
    }
  });

  return (
    <>
      <mesh ref={starRef}>
        <icosahedronGeometry args={[size, 16]} />
        <meshStandardMaterial map={starTexture} />
        {APP_CONFIG.displayLabel && <PlanetLabel title="Sun" />}
      </mesh>
    </>
  );
}
