import { useState, useEffect } from "react";
import * as THREE from "three";

import TestObject from "./TestObject.jsx";
import { GRAVITATIONAL_CONSTANT } from "../utils/constants.js";
import { useFixedstep } from "../hooks/useFixedstep";

export default function ObjectCluster({ getObjectsData, payload }) {
  const [objects, setObjects] = useState(payload);

  useEffect(() => {
    if (payload && payload.length > 0) {
      setObjects(payload);
    }
  }, [payload]);

  useEffect(() => {
    getObjectsData(objects);
  }, [objects]);

  const computeAcceleration = (position, others) => {
    let acc = new THREE.Vector3();
    others.forEach((other) => {
      const direction = other.position.clone().sub(position);
      const distSq = direction.lengthSq();
      if (distSq > 0.0001) {
        const forceDir = direction.normalize();
        const accelMag = (GRAVITATIONAL_CONSTANT * other.mass) / distSq;
        acc.add(forceDir.multiplyScalar(accelMag));
      }
    });
    return acc;
  };

  const rk4Integrate = (obj, others, dt) => {
    const pos0 = obj.position.clone();
    const vel0 = obj.velocity.clone();
    const acc0 = computeAcceleration(pos0, others);

    const k1v = acc0.clone().multiplyScalar(dt);
    const k1p = vel0.clone().multiplyScalar(dt);

    const k2pPos = pos0.clone().add(k1p.clone().multiplyScalar(0.5));
    const k2vVel = vel0.clone().add(k1v.clone().multiplyScalar(0.5));
    const k2v = computeAcceleration(k2pPos, others).multiplyScalar(dt);
    const k2p = k2vVel.clone().multiplyScalar(dt);

    const k3pPos = pos0.clone().add(k2p.clone().multiplyScalar(0.5));
    const k3vVel = vel0.clone().add(k2v.clone().multiplyScalar(0.5));
    const k3v = computeAcceleration(k3pPos, others).multiplyScalar(dt);
    const k3p = k3vVel.clone().multiplyScalar(dt);

    const k4pPos = pos0.clone().add(k3p);
    const k4vVel = vel0.clone().add(k3v);
    const k4v = computeAcceleration(k4pPos, others).multiplyScalar(dt);
    const k4p = k4vVel.clone().multiplyScalar(dt);

    const newPosition = pos0
      .clone()
      .add(k1p.clone().multiplyScalar(1 / 6))
      .add(k2p.clone().multiplyScalar(1 / 3))
      .add(k3p.clone().multiplyScalar(1 / 3))
      .add(k4p.clone().multiplyScalar(1 / 6));

    const newVelocity = vel0
      .clone()
      .add(k1v.clone().multiplyScalar(1 / 6))
      .add(k2v.clone().multiplyScalar(1 / 3))
      .add(k3v.clone().multiplyScalar(1 / 3))
      .add(k4v.clone().multiplyScalar(1 / 6));

    return {
      ...obj,
      position: newPosition,
      velocity: newVelocity,
      acceleration: computeAcceleration(newPosition, others),
    };
  };

  useFixedstep((fixedDelta) => {
    setObjects((prevObjects) => {
      return prevObjects.map((obj, i) =>
        rk4Integrate(
          obj,
          prevObjects.filter((_, j) => j !== i),
          fixedDelta
        )
      );
    });
  }, 1 / 60);

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
