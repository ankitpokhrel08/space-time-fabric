import { useRef, useState } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import { APP_CONFIG } from "../utils/planetData.js";

export default function Venus({ size, distance, groupRef }) {
  const venusRef = useRef();
  const cloudsRef = useRef();
  const [angle, setAngle] = useState(0);

  const dayTexture = useLoader(TextureLoader, "/assets/venus_surface.jpg");
  const cloudsTexture = useLoader(
    TextureLoader,
    "/assets/venus_atmosphere.jpg"
  );

  useFrame((state, delta) => {
    if (venusRef.current) {
      venusRef.current.rotation.y -= 0.000041;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= 0.000081;
    }
    if (groupRef.current) {
      const speed = 0.00044503782;
      const newAngle = angle - speed;
      setAngle(newAngle);

      const x = Math.cos(newAngle) * distance;
      const z = Math.sin(newAngle) * distance;

      groupRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      <mesh ref={venusRef}>
        <icosahedronGeometry args={[size, 16]} />
        <meshStandardMaterial map={dayTexture} />
        {APP_CONFIG.displayLabel && <PlanetLabel title="Venus" />}
      </mesh>

      <mesh ref={cloudsRef} scale={1.003}>
        <icosahedronGeometry args={[size, 16]} />
        <meshBasicMaterial map={cloudsTexture} />
      </mesh>
    </>
  );
}
