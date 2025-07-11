import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Sun from "./components/Sun.jsx";
import Mercury from "./components/Mercury.jsx";
import Venus from "./components/Venus.jsx";
import Earth from "./components/Earth.jsx";
import Moon from "./components/Moon.jsx";
import Mars from "./components/Mars.jsx";
import Jupiter from "./components/Jupiter.jsx";
import Saturn from "./components/Saturn.jsx";
import Uranus from "./components/Uranus.jsx";
import Neptune from "./components/Neptune.jsx";
import StarField from "./components/StarField.jsx";
import SpaceTimeFabric from "./components/SpaceTimeFabric.jsx";

import { PLANET_DATA, APP_CONFIG } from "./utils/planetData.js";

function App() {
  const earthGroupRef = useRef();
  const venusGroupRef = useRef();

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, APP_CONFIG.initalCameraPosition],
          fov: 75,
          near: 0.1,
          far: APP_CONFIG.farClippingPlane,
        }}
        style={{ width: "100vw", height: "100vh", background: "black" }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={2} />

        <SpaceTimeFabric />

        <group rotation={[0, 0, (-7.25 * Math.PI) / 180]} position={[0, 0, 0]}>
          <Sun size={PLANET_DATA.sun.size} />
        </group>

        <Mercury
          size={PLANET_DATA.mercury.size}
          distance={PLANET_DATA.mercury.distance}
        />

        <group
          ref={venusGroupRef}
          rotation={[0, 0, (-177.3 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.venus.distance]}
        >
          <Venus
            size={PLANET_DATA.venus.size}
            distance={PLANET_DATA.venus.distance}
            groupRef={venusGroupRef}
          />
        </group>

        <group
          ref={earthGroupRef}
          rotation={[0, 0, (-23.4 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.earth.distance]}
        >
          <Earth
            size={PLANET_DATA.earth.size}
            distance={PLANET_DATA.earth.distance}
            groupRef={earthGroupRef}
          />
        </group>

        <group
          rotation={[0, 0, (6.687 * Math.PI) / 180]}
          position={[
            PLANET_DATA.moon.distance[0],
            PLANET_DATA.moon.distance[1],
            PLANET_DATA.earth.distance,
          ]}
        >
          <Moon size={PLANET_DATA.moon.size} />
        </group>

        <group
          rotation={[0, 0, (-25.2 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.mars.distance]}
        >
          <Mars size={PLANET_DATA.mars.size} />
        </group>

        <group
          rotation={[0, 0, (-3.1 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.jupiter.distance]}
        >
          <Jupiter size={PLANET_DATA.jupiter.size} />
        </group>

        <group
          rotation={[0, 0, (-26.7 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.saturn.distance]}
        >
          <Saturn size={PLANET_DATA.saturn.size} />
        </group>

        <group
          rotation={[0, 0, (97.8 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.uranus.distance]}
        >
          <Uranus size={PLANET_DATA.uranus.size} />
        </group>

        <group
          rotation={[0, 0, (-28.3 * Math.PI) / 180]}
          position={[0, 0, PLANET_DATA.neptune.distance]}
        >
          <Neptune size={PLANET_DATA.neptune.size} />
        </group>

        <StarField />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={APP_CONFIG.dampingFactor}
          zoomSpeed={APP_CONFIG.zoomSpeed}
          rotateSpeed={APP_CONFIG.rotateSpeed}
        />
      </Canvas>
    </>
  );
}

export default App;
