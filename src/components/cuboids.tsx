import { useState } from "react";
import { Html } from "@react-three/drei";
import { BoxGeometry, Vector3 } from "three";
import { Cuboid } from "../types";
import { calculateTooltipPosition } from "../utils/tooltip";
import { useThree } from "@react-three/fiber";

function Cuboids({ cuboids }: { cuboids: Cuboid[] }) {
  const [hoveredCuboid, setHoveredCuboid] = useState<Cuboid | null>(null);
  const { camera } = useThree();

  return cuboids.map((cuboid) => {
    // This is where we calculate the tooltip position for each cuboid
    const tooltipPosition = calculateTooltipPosition(
      new Vector3(cuboid["position.x"], cuboid["position.z"], -cuboid["position.y"]),
      cuboid["dimensions.z"],
      camera
    );

    return (
      <group
        key={cuboid.uuid}
        position={[
          cuboid["position.x"],
          cuboid["position.z"], // Swap Y and Z to match points
          -cuboid["position.y"]
        ]}
        rotation={[0, cuboid.yaw, 0]}
      >
        {/* Main cuboid mesh */}
        <mesh
          onPointerOver={() => {
            setHoveredCuboid(cuboid);
          }}
          onPointerOut={() => {
            setHoveredCuboid(null);
          }}
        >
          <boxGeometry
            args={[
              cuboid["dimensions.x"],
              cuboid["dimensions.z"], // Swap Y and Z dimensions
              cuboid["dimensions.y"]
            ]}
          />
          <meshStandardMaterial
            color={hoveredCuboid === cuboid ? "#b3e0ff" : "#3399ff"} // Lighter blue on hover
            transparent
            opacity={hoveredCuboid === cuboid ? 0.5 : 0.3} // More opacity on hover
            emissive={hoveredCuboid === cuboid ? "#b3e0ff" : "#3399ff"}
            toneMapped={false}
          />
        </mesh>

        {/* Wireframe edges */}
        <lineSegments>
          <edgesGeometry
            args={[new BoxGeometry(cuboid["dimensions.x"], cuboid["dimensions.z"], cuboid["dimensions.y"])]}
          />
          <lineBasicMaterial color="#000000" />
        </lineSegments>

        {/* Tooltip */}
        <Html
          position={tooltipPosition.position}
          center
          style={{
            transition: "all 0.2s",
            opacity: hoveredCuboid === cuboid ? 1 : 0,
            transform: `scale(${hoveredCuboid === cuboid ? 1 : 0.5})`,
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          <div
            className={`tooltip-container ${tooltipPosition.atBottom ? "tooltip-bottom" : "tooltip-top"} ${
              hoveredCuboid === cuboid ? "tooltip-visible" : "tooltip-hidden"
            }`}
          >
            <div className="tooltip-title">{cuboid.label}</div>
            <div className="tooltip-row">
              <span className="label">Width:</span>
              <span className="value">{cuboid["dimensions.x"].toFixed(2)}m</span>
            </div>
            <div className="tooltip-row">
              <span className="label">Length:</span>
              <span className="value">{cuboid["dimensions.y"].toFixed(2)}m</span>
            </div>
            <div className="tooltip-row">
              <span className="label">Height:</span>
              <span className="value">{cuboid["dimensions.z"].toFixed(2)}m</span>
            </div>
            <div className="tooltip-row">
              <span className="label">Yaw:</span>
              <span className="value">{((cuboid.yaw * 180) / Math.PI).toFixed(1)}°</span>
            </div>
          </div>
        </Html>
      </group>
    );
  });
}

export default Cuboids;