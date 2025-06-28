import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars as DreiStars } from "@react-three/drei";
import { useState } from "react";
import "./App.css";
import CelestialManager from "./CelestialManager.jsx";
import SpaceTimeFabric from "./SpaceTimeFabric.jsx";

function App() {
  const [objects, setObjects] = useState([
    {
      id: "default",
      label: "Black Hole",
      color: "#111",
      mass: 10,
      radius: 3.5,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
  ]);

  return (
    <>
      <h1
        style={{
          color: "#fff",
          textShadow: "0 0 16px #3b82f6, 0 0 32px #fff",
          fontWeight: 700,
          fontSize: "2.5rem",
          letterSpacing: "0.05em",
          marginBottom: "0.5em",
        }}
      >
        Space-Time Fabric Simulator
      </h1>

      <div id="canvas-container">
        <Canvas camera={{ position: [0, 35, 70], fov: 60 }} shadows>
          {/* Starry universe background */}
          <DreiStars radius={120} depth={80} count={4000} factor={2} fade />
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[20, 40, 20]}
            intensity={1.5}
            castShadow
          />
          <pointLight
            position={[-30, -30, -30]}
            intensity={0.7}
            color="#00bfff"
          />
          <OrbitControls enablePan enableZoom enableRotate />

          {/* Main simulation components */}
          <SpaceTimeFabric objects={objects} />
          <CelestialManager objects={objects} onObjectsChange={setObjects} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
