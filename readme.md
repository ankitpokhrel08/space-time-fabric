# Space-Time Fabric 🌌

An interactive 3D visualization of Einstein's spacetime fabric concept, demonstrating how massive celestial bodies warp the fabric of spacetime. Built with React, Three.js, and React Three Fiber.
<img width="1317" height="787" alt="2_bodies" src="https://github.com/user-attachments/assets/15fd226d-9228-48e1-9996-a1611ef372de" />


**📚 Academic Project**: This project was developed as part of the Computer Graphics course for 5th Semester Computer Engineering.

## ✨ Features

- **Interactive 3D Solar System**: Explore our solar system with realistic planetary textures and orbits
- **Spacetime Fabric Visualization**: Watch how massive objects like the Sun and planets bend the fabric of spacetime
- **Real-time Physics**: Gravitational effects and orbital mechanics simulation
- **Custom Object Placement**: Add your own celestial bodies and observe their gravitational influence
- **Responsive Controls**: Orbit, zoom, and pan around the 3D space
- **Realistic Planet Textures**: High-quality surface textures for all celestial bodies

## 🚀 Technologies

- **React 19** - Frontend framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Vite** - Build tool and development server

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <url>
cd space-time-fabric
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

- **Mouse Controls**:
  - Left click and drag to rotate the view
  - Right click and drag to pan
  - Scroll to zoom in/out
- **Add Objects**: Use the plus icon to add custom celestial bodies
- **Settings**: Access visualization settings through the settings panel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SpaceTimeFabric.jsx    # Main spacetime grid visualization
│   ├── CelestialBody.jsx      # Individual planet/star components
│   ├── StarField.jsx          # Background star field
│   └── ...
├── hooks/
│   └── useFixedstep.jsx       # Physics timestep hook
└── utils/
    └── constants.js           # Planet data and physics constants
```

## 🌟 Physics Concepts Demonstrated

- **General Relativity**: Visualization of how mass curves spacetime
- **Gravitational Wells**: See how different masses create varying degrees of spacetime curvature
- **Orbital Mechanics**: Realistic planetary orbits and rotations
- **Scale Relationships**: Proportional sizes and distances (scaled for visibility)
