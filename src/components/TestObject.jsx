export default function TestObject({ texture = null, radius, position }) {
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 16]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="#ffffff" />
        )}
      </mesh>
    </group>
  );
}
