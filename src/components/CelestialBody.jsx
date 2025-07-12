import { useState, useRef } from "react";
import { TextureLoader, AdditiveBlending } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import FresnelMaterial from "./FresnelMaterial.jsx";

import { PLANET_DATA, APP_CONFIG } from "../utils/constants.js";

export default function CelestialBody({ title }) {
  const [angle, setAngle] = useState(0);
  const groupRef = useRef();
  const mainBodyRef = useRef();
  const secondaryRef = useRef();
  const lightsRef = useRef();
  const atmosphereRef = useRef();

  const bodyData = PLANET_DATA[title];

  const texturePaths = bodyData.textures.map(
    (eachTexture) => `/assets/${eachTexture}`
  );

  const bodyTextures = useLoader(TextureLoader, texturePaths);

  useFrame((state, delta) => {
    if (mainBodyRef.current) {
      mainBodyRef.current.rotation.y += bodyData.rotationSpeed;
    }
    if (secondaryRef.current) {
      secondaryRef.current.rotation.y += bodyData.secondaryRotationSpeed;
    }
    if (lightsRef.current) {
      lightsRef.current.rotation.y += bodyData.rotationSpeed;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += bodyData.rotationSpeed;
    }
    if (groupRef.current) {
      const speed = bodyData.revolutionSpeed;
      const newAngle = angle - speed;
      setAngle(newAngle);

      const xPosition = Math.cos(newAngle) * bodyData.orbitalRadius;
      const zPosition = Math.sin(newAngle) * bodyData.orbitalRadius;

      groupRef.current.position.set(
        xPosition,
        bodyData.fabricPosition,
        zPosition
      );
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0, 0, (bodyData.axialTilt * Math.PI) / 180]}
      position={bodyData.cartesianPosition}
    >
      <mesh ref={mainBodyRef}>
        <icosahedronGeometry args={[bodyData.radius, 16]} />
        <meshStandardMaterial map={bodyTextures[0]} />
        {APP_CONFIG.displayLabel && <PlanetLabel title={title} />}
      </mesh>

      {/* <mesh ref={secondaryRef} scale={1.002}>
        <icosahedronGeometry args={[bodyData.radius, 16]} />
        <meshBasicMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.3}
          blending={AdditiveBlending}
        />
      </mesh> */}

      {bodyData.textures.length === 3 ? (
        <>
          <mesh ref={lightsRef} scale={1.001}>
            <icosahedronGeometry args={[bodyData.radius, 16]} />
            <meshBasicMaterial
              map={bodyTextures[2]}
              transparent={true}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh ref={atmosphereRef} scale={1.003}>
            <icosahedronGeometry args={[bodyData.radius, 16]} />
            <FresnelMaterial />
          </mesh>
        </>
      ) : (
        ""
      )}
    </group>
  );
}
