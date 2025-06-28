import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import CelestialObject from "./CelestialObject.jsx";
import * as THREE from "three";

// Utility: distance between two objects
function dist(a, b) {
  const dx = a.x - b.x,
    dy = a.y - b.y,
    dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Default celestial palette
const PALETTE = [
  {
    label: "Black Hole",
    color: "#111",
    mass: 10,
    radius: 3.5,
    velocity: [0, 0, 0],
  },
  {
    label: "Planet",
    color: "#3b82f6",
    mass: 2,
    radius: 2,
    velocity: [0, 0, 0],
  },
  {
    label: "Asteroid",
    color: "#fbbf24",
    mass: 0.7,
    radius: 1.2,
    velocity: [0, 0, 0],
  },
];

export default function CelestialManager({ objects, onObjectsChange }) {
  const [dragging, setDragging] = useState(null);
  const { camera, gl, scene } = useThree();

  // Add object from palette
  function handlePaletteDragStart(typeIdx, e) {
    setDragging({
      ...PALETTE[typeIdx],
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      id: Math.random().toString(36).slice(2),
    });
  }

  // Place object on mesh
  function handleCanvasPointerUp(e) {
    if (!dragging) return;
    const [intersection] = e.intersections || [];
    if (intersection) {
      const { point } = intersection;
      onObjectsChange([
        ...objects,
        {
          ...dragging,
          position: { x: point.x, y: point.y, z: point.z },
        },
      ]);
      setDragging(null);
    }
  }

  // Physics: Verlet integration and gravity
  useFrame(() => {
    onObjectsChange((objs) => {
      let next = objs.map((obj, idx) => {
        // Only move if not black hole
        if (obj.mass >= 8) return obj;
        // Gravity from all other objects
        let ax = 0,
          ay = 0,
          az = 0;
        for (let j = 0; j < objs.length; ++j) {
          if (j === idx) continue;
          const other = objs[j];
          const dx = other.position.x - obj.position.x;
          const dy = other.position.y - obj.position.y;
          const dz = other.position.z - obj.position.z;
          const r2 = dx * dx + dy * dy + dz * dz + 0.01;
          const r = Math.sqrt(r2);
          // Newtonian gravity
          const F = other.mass / r2;
          ax += (F * dx) / r;
          ay += (F * dy) / r;
          az += (F * dz) / r;
        }
        // Verlet/simple Euler
        const vx = (obj.velocity?.x ?? 0) + ax * 0.03;
        const vy = (obj.velocity?.y ?? 0) + ay * 0.03;
        const vz = (obj.velocity?.z ?? 0) + az * 0.03;
        let nx = obj.position.x + vx * 0.03;
        let ny = obj.position.y + vy * 0.03;
        let nz = obj.position.z + vz * 0.03;
        // Stay on fabric (z = 0)
        nz = 0;
        return {
          ...obj,
          position: { x: nx, y: ny, z: nz },
          velocity: { x: vx, y: vy, z: vz },
        };
      });

      // Collision: merge or vanish
      const toRemove = new Set();
      for (let i = 0; i < next.length; ++i) {
        for (let j = i + 1; j < next.length; ++j) {
          const a = next[i],
            b = next[j];
          if (dist(a.position, b.position) < a.radius + b.radius) {
            // Merge: keep larger mass, vanish smaller
            if (a.mass >= b.mass) toRemove.add(b.id);
            else toRemove.add(a.id);
          }
        }
      }
      next = next.filter((obj) => !toRemove.has(obj.id));
      return next;
    });
  });

  // Drag preview follows mouse
  function handlePointerMove(e) {
    if (!dragging) return;
    const [intersection] = e.intersections || [];
    if (intersection) {
      const { point } = intersection;
      setDragging((obj) => ({
        ...obj,
        position: { x: point.x, y: point.y, z: point.z },
      }));
    }
  }

  // Remove object on click
  function handleObjectPointerDown(id, e) {
    e.stopPropagation();
    onObjectsChange(objects.filter((o) => o.id !== id));
  }

  // Palette UI
  return (
    <>
      <group>
        {objects.map((obj) => (
          <CelestialObject
            key={obj.id}
            object={obj}
            onPointerDown={(e) => handleObjectPointerDown(obj.id, e)}
          />
        ))}
        {/* Drag preview */}
        {dragging && (
          <CelestialObject object={dragging} isDragging showLabel={false} />
        )}
      </group>
      {/* Palette UI */}
      <Html position={[-28, 32, 0]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#222c",
            padding: 12,
            borderRadius: 12,
            boxShadow: "0 0 16px #000a",
          }}
        >
          <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>
            Celestial Palette
          </div>
          {PALETTE.map((obj, i) => (
            <button
              key={obj.label}
              style={{
                background: obj.color,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.5em 1em",
                fontWeight: 600,
                cursor: "grab",
                fontSize: 16,
                boxShadow: "0 0 8px #000a",
              }}
              onPointerDown={(e) => handlePaletteDragStart(i, e)}
            >
              {obj.label}
            </button>
          ))}
        </div>
      </Html>
      {/* Drag logic */}
      <mesh
        position={[0, 0, 0]}
        visible={false}
        onPointerMove={handlePointerMove}
        onPointerUp={handleCanvasPointerUp}
      >
        <planeGeometry args={[60, 60]} />
      </mesh>
    </>
  );
}
  
