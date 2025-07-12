import { Html } from "@react-three/drei";

export default function PlanetLabel({ title }) {
  return (
    <Html position={[0, 10, 0]} center distanceFactor={1000} occlude={false}>
      <div
        style={{
          color: "white",
          fontSize: "14px",
          background: "rgba(255, 0, 0, 0.6)",
          padding: "2px 4px",
          borderRadius: "4px",
          textTransform: "capitalize",
        }}
      >
        {title}
      </div>
    </Html>
  );
}
