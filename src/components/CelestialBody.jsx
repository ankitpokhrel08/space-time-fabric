import { useState, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import PlanetLabel from "./PlanetLabel.jsx";
import Orbit from "./Orbit.jsx";
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

  const bodyTextures = useLoader(THREE.TextureLoader, texturePaths);

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
    <>
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

        {title === "venus" && (
          <mesh ref={secondaryRef} scale={1.003}>
            <icosahedronGeometry args={[bodyData.radius, 16]} />
            <meshBasicMaterial map={bodyTextures[1]} />
          </mesh>
        )}

        {/* {title === "saturn" && (
          <mesh ref={secondaryRef} rotation-x={-Math.PI / 2}>
            <ringGeometry
              args={[
                bodyData.radius * 1.1,
                bodyData.radius * 2.74835886214,
                50,
              ]}
            />
            <meshStandardMaterial
              map={bodyTextures[1]}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        )} */}

        {title === "earth" && (
          <>
            <mesh ref={lightsRef} scale={1.001}>
              <icosahedronGeometry args={[bodyData.radius, 16]} />
              <meshBasicMaterial
                map={bodyTextures[2]}
                transparent={true}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh ref={secondaryRef} scale={1.002}>
              <icosahedronGeometry args={[bodyData.radius, 16]} />
              <meshBasicMaterial
                map={bodyTextures[1]}
                transparent={true}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh ref={atmosphereRef} scale={1.003}>
              <icosahedronGeometry args={[bodyData.radius, 16]} />
              <FresnelMaterial />
            </mesh>
          </>
        )}
      </group>
      <Orbit
        orbitalRadius={bodyData.orbitalRadius}
        fabricPosition={bodyData.fabricPosition}
      />
    </>
  );
}
