import { useState } from "react";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

import TestObject from "./TestObject.jsx";

import { GRAVITATIONAL_CONSTANT } from "../utils/constants.js";

export default function ObjectCluster() {
  const sunTexture = useLoader(THREE.TextureLoader, "/assets/sun_surface.jpg");
  const planetTexture = useLoader(
    THREE.TextureLoader,
    "/assets/earth_surface_day.jpg"
  );

  const [objects, setObjects] = useState([
    {
      id: 1,
      mass: 1000000,
      radius: 50,
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      acceleration: new THREE.Vector3(0, 0, 0),
      texture: sunTexture,
    },
    {
      id: 2,
      mass: 1,
      radius: 10,
      position: new THREE.Vector3(250, 0, 0),
      velocity: new THREE.Vector3(0, 0, 63.2),
      acceleration: new THREE.Vector3(0, 0, 0),
      //   color: "#ecb212",
      texture: planetTexture,
    },
  ]);

  useFrame((state, delta) => {
    setObjects((prevObjects) => {
      const updatedObjects = prevObjects.map((eachObject, identifierIndex) => {
        let resultantAcceleration = new THREE.Vector3(0, 0, 0);

        prevObjects.forEach((otherObject, index) => {
          if (identifierIndex !== index) {
            const resultantVector = otherObject.position
              .clone()
              .sub(eachObject.position);
            const distSq = resultantVector.lengthSq();

            if (distSq > 0.0001) {
              const forceDir = resultantVector.normalize();
              const accelMag =
                (GRAVITATIONAL_CONSTANT * otherObject.mass) / distSq;
              resultantAcceleration.add(forceDir.multiplyScalar(accelMag));
            }
          }
        });

        const newPosition = eachObject.position
          .clone()
          .add(eachObject.velocity.clone().multiplyScalar(delta))
          .add(
            resultantAcceleration.clone().multiplyScalar(0.5 * delta * delta)
          );

        let newVelocity = eachObject.velocity
          .clone()
          .add(resultantAcceleration.clone().multiplyScalar(delta));

        return {
          ...eachObject,
          position: newPosition,
          velocity: newVelocity,
          acceleration: resultantAcceleration,
        };
      });

      return updatedObjects;
    });
  });

  return (
    <>
      {objects.map((eachObject) => (
        <TestObject
          key={eachObject.id}
          texture={eachObject.texture}
          radius={eachObject.radius}
          position={eachObject.position}
        />
      ))}
    </>
  );
}
