import { useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SpaceTimeFabric from "./components/SpaceTimeFabric.jsx";
import StarField from "./components/StarField.jsx";
import CelestialBody from "./components/CelestialBody.jsx";
import ObjectCluster from "./components/ObjectCluster.jsx";
import SceneContainer from "./components/SceneContainer.jsx";
import SettingsIcon from "./components/SettingsIcon.jsx";
import PlusIcon from "./components/PlusIcon.jsx";

import { APP_CONFIG } from "./utils/constants.js";
import { texture } from "three/tsl";

function App() {
  const [userData, setUserData] = useState([]);
  const [initData, setInitData] = useState([]);
  const [toggleBar, setToggleBar] = useState(false);
  const [objNum, setObjNum] = useState([]);
  const [customData, setCustomData] = useState(true);

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
    setInitData([
      {
        id: 1,
        name: "Star",
        mass: 1000000,
        radius: 50,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },
      {
        id: 2,
        name: "Planet 1",
        mass: 1,
        radius: 10,
        position: new THREE.Vector3(250, 0, 0),
        velocity: new THREE.Vector3(0, 0, 63.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: earthTexture,
      },
      {
        id: 3,
        name: "Planet 2",
        mass: 0.3,
        radius: 8,
        position: new THREE.Vector3(600, 0, 0),
        velocity: new THREE.Vector3(0, 0, 25.8),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: marsTexture,
      },
    ]);
  }

  function handleTwoBodyData() {
    setInitData([
      {
        id: 1,
        name: "Star",
        mass: 1000000,
        radius: 50,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },
      {
        id: 2,
        name: "Planet",
        mass: 1,
        radius: 10,
        position: new THREE.Vector3(250, 0, 0),
        velocity: new THREE.Vector3(0, 0, 63.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: mercuryTexture,
      },
    ]);
  }

  function handleSolarSystem() {
    setInitData([
      {
        id: 1,
        name: "Sun",
        mass: 1000000,
        radius: 30,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },
      {
        id: 2,
        name: "Mercury",
        mass: 0.3,
        radius: 4,
        position: new THREE.Vector3(120, 0, 0),
        velocity: new THREE.Vector3(0, 0, 91.3),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: mercuryTexture,
      },
      {
        id: 3,
        name: "Venus",
        mass: 0.8,
        radius: 6,
        position: new THREE.Vector3(180, 0, 0),
        velocity: new THREE.Vector3(0, 0, 74.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: venusTexture,
      },
      {
        id: 4,
        name: "Earth",
        mass: 1.0,
        radius: 6.5,
        position: new THREE.Vector3(250, 0, 0),
        velocity: new THREE.Vector3(0, 0, 63.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: earthTexture,
      },
      {
        id: 5,
        name: "Mars",
        mass: 0.5,
        radius: 5,
        position: new THREE.Vector3(350, 0, 0),
        velocity: new THREE.Vector3(0, 0, 53.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: marsTexture,
      },
      {
        id: 6,
        name: "Jupiter",
        mass: 15,
        radius: 18,
        position: new THREE.Vector3(500, 0, 0),
        velocity: new THREE.Vector3(0, 0, 44.7),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: jupiterTexture,
      },
      {
        id: 7,
        name: "Saturn",
        mass: 12,
        radius: 16,
        position: new THREE.Vector3(650, 0, 0),
        velocity: new THREE.Vector3(0, 0, 39.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: saturnTexture,
      },
      {
        id: 8,
        name: "Uranus",
        mass: 4,
        radius: 12,
        position: new THREE.Vector3(800, 0, 0),
        velocity: new THREE.Vector3(0, 0, 35.4),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: uranusTexture,
      },
      {
        id: 9,
        name: "Neptune",
        mass: 4.5,
        radius: 12,
        position: new THREE.Vector3(950, 0, 0),
        velocity: new THREE.Vector3(0, 0, 32.5),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: neptuneTexture,
      },
    ]);
  }

  function handleBlackHoleData() {
    setInitData([
      {
        id: 10000,
        name: "Blackhole",
        mass: 10e9,
        radius: 20,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: null,
      },
    ]);
  }

  function handleBinaryStarData() {
    setInitData([
      {
        id: 1,
        name: "Star A",
        mass: 800000,
        radius: 40,
        position: new THREE.Vector3(-80, 0, 0),
        velocity: new THREE.Vector3(0, 0, 35.4),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },

      {
        id: 2,
        name: "Star B",
        mass: 600000,
        radius: 35,
        position: new THREE.Vector3(107, 0, 0),
        velocity: new THREE.Vector3(0, 0, -47.2),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: sunTexture,
      },
      {
        id: 3,
        name: "Planet 1",
        mass: 1,
        radius: 8,
        position: new THREE.Vector3(450, 0, 0),
        velocity: new THREE.Vector3(0, 0, 55.7),
        acceleration: new THREE.Vector3(0, 0, 0),
        texture: earthTexture,
      },
    ]);
  }

  function handleDeleteObj(indexToDelete) {
    setInitData((prevData) => prevData.filter((_, i) => i !== indexToDelete));
    setObjNum((prevData) => prevData.filter((_, i) => i !== indexToDelete));
  }

  function handleInputChange(identifier, value, index) {
    setInitData((prevData) => {
      const newData = [...prevData];

      if (!newData[index]) {
        newData[index] = {
          id: Math.random(),
          mass: 0,
          radius: 0,
          position: new THREE.Vector3(0, 0, 0),
          velocity: new THREE.Vector3(0, 0, 0),
          acceleration: new THREE.Vector3(0, 0, 0),
          texture: null,
        };
      }

      newData[index] = {
        ...newData[index],
        [identifier]: value,
      };

      return newData;
    });
  }

  function resetApp() {
    setUserData([]);
    setInitData([]);
    setObjNum([]);
    setCustomData(true);
  }

  function handlePresetLoad() {
    setCustomData(false);
  }

  return (
    <>
      <nav className={`input-nav ${toggleBar ? "active-nav" : ""}`}>
        <div className="title">
          <h2>Configure Objects</h2>
          <button
            className="settings-btn"
            onClick={() => {
              setToggleBar((prev) => !prev);
              setCustomData(true);
            }}
          >
            <SettingsIcon />
          </button>
        </div>
        <div className={`nav-body ${toggleBar ? "active-body" : ""}`}>
          <div className="adder">
            {customData && (
              <button
                className="add-btn"
                onClick={() => setObjNum((prev) => [...prev, prev.length])}
              >
                <PlusIcon />
                Add Object
              </button>
            )}
            <button className="add-btn" onClick={handlePresetLoad}>
              Presets
            </button>
            <button className="add-btn" onClick={() => setUserData(initData)}>
              Simulate
            </button>
            <button className="add-btn" onClick={resetApp}>
              Reset
            </button>
          </div>

          <div className="mass-container">
            {customData ? (
              objNum.map((objNum, index) => {
                return (
                  <div className="room-form" key={index}>
                    <div className="room-header">
                      <div className="step-indicator">{index + 1}</div>
                      <div className="room-name">
                        <input
                          onChange={(event) =>
                            handleInputChange("name", event.target.value, index)
                          }
                          value={initData[index] ? initData[index].name : ""}
                          type="text"
                          className="text-input"
                          placeholder="Object Name"
                          defaultValue={`Object ${index + 1}`}
                        />
                      </div>
                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() => handleDeleteObj(index)}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="trash-icon"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="room-type">
                      <input
                        value={initData[index] ? initData[index].mass : ""}
                        onChange={(event) =>
                          handleInputChange("mass", event.target.value, index)
                        }
                        type="number"
                        className="dropdown-input"
                        placeholder="Enter mass in terms of 10^24kg"
                      />
                    </div>
                    <div className="room-type">
                      <input
                        value={initData[index] ? initData[index].radius : ""}
                        onChange={(event) =>
                          handleInputChange("radius", event.target.value, index)
                        }
                        type="number"
                        className="dropdown-input"
                        placeholder="Enter radius"
                      />
                    </div>
                    <div className="room-type">
                      <input
                        value={
                          initData[index]
                            ? initData[index].position.toArray().join(",")
                            : ""
                        }
                        onChange={(event) => {
                          const value = event.target.value;
                          const [x, y, z] = value.split(",").map(Number); // Convert to numbers
                          const vector = new THREE.Vector3(
                            x || 0,
                            y || 0,
                            z || 0
                          ); // Fallback to 0 if NaN
                          handleInputChange("position", vector, index);
                        }}
                        type="text"
                        className="dropdown-input"
                        placeholder="Enter initial position: (0,0,0)"
                      />
                    </div>
                    <div className="room-type">
                      <input
                        value={
                          initData[index]
                            ? initData[index].velocity.toArray().join(",")
                            : ""
                        }
                        onChange={(event) => {
                          const value = event.target.value;
                          const [x, y, z] = value.split(",").map(Number); // Convert to numbers
                          const vector = new THREE.Vector3(
                            x || 0,
                            y || 0,
                            z || 0
                          ); // Fallback to 0 if NaN
                          handleInputChange("velocity", vector, index);
                        }}
                        type="text"
                        className="dropdown-input"
                        placeholder="Enter initial velocity: (0,0,0)"
                      />
                    </div>
                    <div className="room-type">
                      <input
                        value={
                          initData[index]
                            ? initData[index].acceleration.toArray().join(",")
                            : ""
                        }
                        onChange={(event) => {
                          const value = event.target.value;
                          const [x, y, z] = value.split(",").map(Number);
                          const vector = new THREE.Vector3(
                            x || 0,
                            y || 0,
                            z || 0
                          );
                          handleInputChange("acceleration", vector, index);
                        }}
                        type="text"
                        className="dropdown-input"
                        placeholder="Enter initial acceleration: (0,0,0)"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <button
                  className="preset-btn"
                  onClick={() => {
                    handleTwoBodyData();
                    setObjNum([0, 1]);
                    setCustomData(true);
                  }}
                >
                  2 body
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    handleThreeBodyData();
                    setObjNum([0, 1, 2]);
                    setCustomData(true);
                  }}
                >
                  3 body
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    handleSolarSystem();
                    setObjNum([0, 1, 2, 3, 4, 5, 6, 7, 8]);
                    setCustomData(true);
                  }}
                >
                  Solar system
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    handleBlackHoleData();
                    setObjNum([0]);
                    setCustomData(true);
                  }}
                >
                  Black hole
                </button>
                <button
                  className="preset-btn"
                  onClick={() => {
                    handleBinaryStarData();
                    setObjNum([0, 1, 2]);
                    setCustomData(true);
                  }}
                >
                  Binary star system
                </button>
              </>
            )}
          </div>

          {/* <button onClick={handleTwoBodyData}>2 body</button>
          <button onClick={handleThreeBodyData}>3 body</button>
          <button onClick={handleSolarSystem}>Solar system</button>
          <button onClick={handleBlackHoleData}>Black hole</button>
          <button onClick={handleBinaryStarData}>Binary star system</button> */}
        </div>
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
