import { useMemo } from "react";
import { Points as ThreePoints, PointMaterial } from "@react-three/drei";
import { getHeightColor } from "../utils/colors";
import { Point3D } from "../types";
import { CanvasTexture } from "three";

function Points({ points }: { points: Point3D[] }) {
  const positions = useMemo(() => {
    return new Float32Array(points.flatMap(([x, y, z]) => [x, z, -y]));
  }, [points]);

  const colors = useMemo(() => {
    // Sort heights to calculate percentiles
    const heights = points.map((p) => p[2]).sort((a, b) => a - b);
    const lowerIndex = Math.floor(heights.length * 0.05); // 5th percentile
    const upperIndex = Math.floor(heights.length * 0.95); // 95th percentile

    const minHeight = heights[lowerIndex];
    const maxHeight = heights[upperIndex];
    const heightRange = maxHeight - minHeight;

    return new Float32Array(
      points.flatMap((p) => {
        // Clamp and normalize height to 0-1 range
        const clampedHeight = Math.min(Math.max(p[2], minHeight), maxHeight);
        const normalizedHeight = (clampedHeight - minHeight) / heightRange;
        const color = getHeightColor(normalizedHeight);
        return color;
      })
    );
  }, [points]);

  const pointTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d")!;

    // Draw circle
    context.beginPath();
    context.arc(32, 32, 30, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <ThreePoints positions={positions} colors={colors} limit={10000} range={10000}>
      <PointMaterial
        vertexColors
        size={0.1}
        transparent={false}
        depthTest={true}
        alphaTest={0.1}
        toneMapped={false}
        map={pointTexture}
      />
    </ThreePoints>
  );
}

export default Points;
