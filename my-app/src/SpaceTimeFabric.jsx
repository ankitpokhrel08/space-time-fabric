import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html, Grid } from "@react-three/drei";

export default function SpaceTimeFabric({ objects, onMeshClick, selecting }) {
  const mesh = useRef();
  const { camera, gl } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (mesh.current) {
      const position = mesh.current.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);

        // Base wavy effect
        let z = Math.sin(x * 2 + time * 1.5) * Math.cos(y * 2 + time) * 0.5;

        // Depression from all objects
        if (objects && objects.length) {
          for (const obj of objects) {
            const dx = x - obj.position.x;
            const dy = y - obj.position.y;
            const distSq = dx * dx + dy * dy + 0.1;
            z += -obj.mass * 2 * Math.exp(-distSq / (2 + obj.mass * 0.5));
          }
        }

        position.setZ(i, z);
      }
      position.needsUpdate = true;
      mesh.current.geometry.computeVertexNormals();
    }
  });

  function handlePointerDown(e) {
    if (!onMeshClick) return;
    e.stopPropagation();
    const point = e.point;
    onMeshClick({ x: point.x, y: point.y, z: point.z });
  }

  function handlePointerOver(e) {
    if (selecting) setHovered(true);
  }

  function handlePointerOut(e) {
    setHovered(false);
  }

  return (
    <group>
      {/* Optional: Add a grid helper for orientation */}
      <Grid
        args={[60, 60]}
        sectionColor="#222"
        cellColor="#333"
        fadeDistance={30}
        fadeStrength={1}
      />
      <mesh
        ref={mesh}
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[60, 60, 300, 300]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.7}
          roughness={0.3}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cursor pointer effect when hovering */}
      {hovered && selecting && (
        <Html>
          <style>{`canvas { cursor: pointer !important; }`}</style>
        </Html>
      )}
    </group>
  );
}
