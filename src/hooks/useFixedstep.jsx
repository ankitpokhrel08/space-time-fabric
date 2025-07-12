import { useFrame } from "@react-three/fiber";

export function useFixedstep(simulateFunction, fixedTimeStep = 1 / 60) {
  let accumulator = 0;

  useFrame((state, delta) => {
    accumulator += delta;

    while (accumulator >= fixedTimeStep) {
      simulateFunction(fixedTimeStep);
      accumulator -= fixedTimeStep;
    }
  });
}
