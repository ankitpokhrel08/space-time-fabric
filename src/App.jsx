import { useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SpaceTimeFabric from "./components/SpaceTimeFabric.jsx";
import StarField from "./components/StarField.jsx";
import CelestialBody from "./components/CelestialBody.jsx";
import ObjectCluster from "./components/ObjectCluster.jsx";
import SceneContainer from "./components/SceneContainer.jsx";

import { APP_CONFIG } from "./utils/constants.js";

function App() {
  const [userData, setUserData] = useState([]);

  const sunTexture = useLoader(THREE.TextureLoader, "/assets/sun_surface.jpg");
  const mercuryTexture = useLoader(
    THREE.TextureLoader,
    "/assets/mercury_surface.jpg"
  );
  const venusTexture = useLoader(
    THREE.TextureLoader,
    "/assets/venus_surface.jpg"
  );
  const earthTexture = useLoader(
    THREE.TextureLoader,
    "/assets/earth_surface_day.jpg"
  );
  const marsTexture = useLoader(
    THREE.TextureLoader,
    "/assets/mars_surface.jpg"
  );
  const jupiterTexture = useLoader(
    THREE.TextureLoader,
    "/assets/jupiter_surface.jpg"
  );
  const saturnTexture = useLoader(
    THREE.TextureLoader,
    "/assets/saturn_surface.jpg"
  );
  const uranusTexture = useLoader(
    THREE.TextureLoader,
    "/assets/uranus_surface.jpg"
  );
  const neptuneTexture = useLoader(
    THREE.TextureLoader,
    "/assets/neptune_surface.jpg"
  );
  const moonTexture = useLoader(
    THREE.TextureLoader,
    "/assets/moon_surface.jpg"
  );

  function handleThreeBodyData() {
    setUserData([
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
        texture: earthTexture,
      },
      {
        id: 3,
        mass: 0.3,
        radius: 8,
        position: new THREE.Vector3(600, 0, 0),
        velocity: new THREE.Vector3(0, 0, 25.8),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: moonTexture,
      },
    ]);
  }

  function handleTwoBodyData() {
    setUserData([
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
        texture: earthTexture,
      },
    ]);
  }

  function handleSolarSystem() {
    setUserData([
      {
        id: 1,
        mass: 1000000,
        radius: 30,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },
      {
        id: 2,
        mass: 0.3,
        radius: 4,
        position: new THREE.Vector3(120, 0, 0),
        velocity: new THREE.Vector3(0, 0, 91.3),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: mercuryTexture,
      },
      {
        id: 3,
        mass: 0.8,
        radius: 6,
        position: new THREE.Vector3(180, 0, 0),
        velocity: new THREE.Vector3(0, 0, 74.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: venusTexture,
      },
      {
        id: 4,
        mass: 1.0,
        radius: 6.5,
        position: new THREE.Vector3(250, 0, 0),
        velocity: new THREE.Vector3(0, 0, 63.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: earthTexture,
      },
      {
        id: 5,
        mass: 0.5,
        radius: 5,
        position: new THREE.Vector3(350, 0, 0),
        velocity: new THREE.Vector3(0, 0, 53.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: marsTexture,
      },
      {
        id: 6,
        mass: 15,
        radius: 18,
        position: new THREE.Vector3(500, 0, 0),
        velocity: new THREE.Vector3(0, 0, 44.7),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: jupiterTexture,
      },
      {
        id: 7,
        mass: 12,
        radius: 16,
        position: new THREE.Vector3(650, 0, 0),
        velocity: new THREE.Vector3(0, 0, 39.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: saturnTexture,
      },
      {
        id: 8,
        mass: 4,
        radius: 12,
        position: new THREE.Vector3(800, 0, 0),
        velocity: new THREE.Vector3(0, 0, 35.4),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: uranusTexture,
      },
      {
        id: 9,
        mass: 4.5,
        radius: 12,
        position: new THREE.Vector3(950, 0, 0),
        velocity: new THREE.Vector3(0, 0, 32.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: neptuneTexture,
      },
    ]);
  }

  return (
    <>
      <nav className="input-nav">
        <button onClick={handleTwoBodyData}>2 body</button>
        <button onClick={handleThreeBodyData}>3 body</button>
        <button onClick={handleSolarSystem}>Solar system</button>
      </nav>
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
        <SceneContainer payload={userData} />
        {/* <CelestialBody title="sun" />
        <CelestialBody title="mercury" />
        <CelestialBody title="venus" />
        <CelestialBody title="earth" />
        <CelestialBody title="moon" />
        <CelestialBody title="mars" />
        <CelestialBody title="jupiter" />
        <CelestialBody title="saturn" />
        <CelestialBody title="uranus" />
        <CelestialBody title="neptune" /> */}

        {/* <StarField /> */}
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
