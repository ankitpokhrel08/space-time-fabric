import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";

export default function CelestialObject({
  object,
  onPointerDown,
  isDragging,
  showLabel = true,
}) {
  const mesh = useRef();

  // Animate position
  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.set(
        object.position.x,
        object.position.y,
        object.position.z
      );
    }
  });

  return (
    <group>
      <Sphere
        ref={mesh}
        args={[object.radius, 32, 32]}
        onPointerDown={onPointerDown}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={object.color}
          emissive={object.color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      {/* Glow */}
      <Sphere args={[object.radius * 1.2, 32, 32]}>
        <meshBasicMaterial color={object.color} transparent opacity={0.15} />
      </Sphere>
      {/* Label */}
      {showLabel && (
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div
            style={{
              color: "#fff",
              background: "#222a",
              borderRadius: 8,
              padding: "2px 8px",
              fontSize: 14,
              marginTop: -10,
              border: `1px solid ${object.color}`,
              fontWeight: 600,
            }}
          >
            {object.label}
          </div>
        </Html>
      )}
    </group>
  );
}
