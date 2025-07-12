export default function TestObject({ texture, radius, position }) {
  //   const boundarySize = APP_CONFIG.fabricSize / 2;

  //   useFrame((state, delta) => {
  //     setMotionParameters((prevParamter) => {
  //       const newPosition = prevParamter.position
  //         .clone()
  //         .add(prevParamter.velocity.clone().multiplyScalar(delta))
  //         .add(
  //           prevParamter.acceleration.clone().multiplyScalar(0.5 * delta * delta)
  //         );

  //       let newVelocity = prevParamter.velocity
  //         .clone()
  //         .add(prevParamter.acceleration.clone().multiplyScalar(delta));

  //       if (newPosition.x >= boundarySize - physicalProperties.radius) {
  //         newPosition.x = boundarySize - physicalProperties.radius;
  //         newVelocity.x = -newVelocity.x;
  //       } else if (newPosition.x <= -boundarySize + physicalProperties.radius) {
  //         newPosition.x = -boundarySize + physicalProperties.radius;
  //         newVelocity.x = -newVelocity.x;
  //       }

  //       if (newPosition.y >= boundarySize - physicalProperties.radius) {
  //         newPosition.y = boundarySize - physicalProperties.radius;
  //         newVelocity.y = -newVelocity.y;
  //       } else if (newPosition.y <= -boundarySize + physicalProperties.radius) {
  //         newPosition.y = -boundarySize + physicalProperties.radius;
  //         newVelocity.y = -newVelocity.y;
  //       }

  //       if (newPosition.z >= boundarySize - physicalProperties.radius) {
  //         newPosition.z = boundarySize - physicalProperties.radius;
  //         newVelocity.z = -newVelocity.z;
  //       } else if (newPosition.z <= -boundarySize + physicalProperties.radius) {
  //         newPosition.z = -boundarySize + physicalProperties.radius;
  //         newVelocity.z = -newVelocity.z;
  //       }

  //       return {
  //         position: newPosition,
  //         velocity: newVelocity,
  //         acceleration: prevParamter.acceleration,
  //       };
  //     });
  //   });

  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
