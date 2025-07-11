import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTextures } from "../hooks/useTextures";

import PlanetLabel from "./PlanetLabel.jsx";
import { APP_CONFIG } from "../utils/planetData.js";

function FresnelMaterial({ rimHex = 0x0088ff, facingHex = 0x000000 }) {
  const material = useMemo(() => {
    const uniforms = {
      color1: { value: new THREE.Color(rimHex) },
      color2: { value: new THREE.Color(facingHex) },
      fresnelBias: { value: 0.1 },
      fresnelScale: { value: 1.0 },
      fresnelPower: { value: 4.0 },
    };

    const vertexShader = `
      uniform float fresnelBias;
      uniform float fresnelScale;
      uniform float fresnelPower;
      
      varying float vReflectionFactor;
      
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        
        vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
        
        vec3 I = worldPosition.xyz - cameraPosition;
        
        vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      
      varying float vReflectionFactor;
      
      void main() {
        float f = clamp( vReflectionFactor, 0.0, 1.0 );
        gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, [rimHex, facingHex]);

  return <primitive object={material} />;
}

export default function Earth({ size, distance, groupRef }) {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();
  const lightsRef = useRef();

  const { dayTexture, nightTexture, cloudsTexture } = useTextures();
  const [angle, setAngle] = useState(0);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01;
    }
    if (lightsRef.current) {
      lightsRef.current.rotation.y += 0.01;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.012;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      const speed = 0.0002739726;
      const newAngle = angle - speed;
      setAngle(newAngle);

      const x = Math.cos(newAngle) * distance;
      const z = Math.sin(newAngle) * distance;

      groupRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      <mesh ref={earthRef}>
        <icosahedronGeometry args={[size, 16]} />
        <meshStandardMaterial map={dayTexture} />
        {APP_CONFIG.displayLabel && <PlanetLabel title="Earth" />}
      </mesh>

      <mesh ref={lightsRef} scale={1.001}>
        <icosahedronGeometry args={[size, 16]} />
        <meshBasicMaterial
          map={nightTexture}
          transparent={true}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.002}>
        <icosahedronGeometry args={[size, 16]} />
        <meshBasicMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.003}>
        <icosahedronGeometry args={[size, 16]} />
        <FresnelMaterial />
      </mesh>
    </>
  );
}
