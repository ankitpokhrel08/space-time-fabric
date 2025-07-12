import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SpaceTimeFabric from "./components/SpaceTimeFabric.jsx";
import StarField from "./components/StarField.jsx";
import CelestialBody from "./components/CelestialBody.jsx";
import ObjectCluster from "./components/ObjectCluster.jsx";

import { APP_CONFIG } from "./utils/constants.js";

function App() {
  return (
    <>
      <Canvas
        camera={{
          position: APP_CONFIG.initalCameraPosition,
          fov: 75,
          near: 0.1,
          far: APP_CONFIG.farClippingPlane,
        }}
        style={{ width: "100vw", height: "100vh", background: "black" }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={2} />
        {/* <SpaceTimeFabric /> */}

        <ObjectCluster />

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

{
  /* <StarField /> */
}

{
  /* <CelestialBody title="sun" />
        <CelestialBody title="mercury" />
        <CelestialBody title="venus" />
        <CelestialBody title="earth" />
        <CelestialBody title="moon" />
        <CelestialBody title="mars" />
        <CelestialBody title="jupiter" />
        <CelestialBody title="saturn" />
        <CelestialBody title="uranus" />
        <CelestialBody title="neptune" /> */
}
