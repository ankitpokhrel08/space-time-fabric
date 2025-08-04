export default function TestObject({ texture, radius, position }) {
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
