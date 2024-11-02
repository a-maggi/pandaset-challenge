import { Point3D } from "../types";
import { getHeightColor } from "../utils/colors";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

function Points({ points }: { points: Point3D[] }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const pointTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d")!;

    context.beginPath();
    context.arc(32, 32, 32, 0, 2 * Math.PI);
    context.fillStyle = "#ffffff";
    context.fill();

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => {
    if (!geometryRef.current) return;

    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);

    points.forEach((point, i) => {
      const [x, y, z] = point;
      const i3 = i * 3;

      // Set positions
      positions[i3] = x;
      positions[i3 + 1] = z;
      positions[i3 + 2] = -y;

      // Get color directly from z coordinate
      const [r, g, b] = getHeightColor(z);
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    });

    geometryRef.current.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometryRef.current.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.attributes.color.needsUpdate = true;
  }, [points]);

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.1}
        vertexColors
        sizeAttenuation
        transparent={true}
        map={pointTexture}
        depthWrite={false}
      />
    </points>
  );
}

export default Points;
