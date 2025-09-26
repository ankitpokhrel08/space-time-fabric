export default function TestObject({ texture = null, radius, position,mass }) {
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 16]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color={mass>=10e9?"#000000":"#ffffff"} />
        )}
      </mesh>
    </group>
  );
}
