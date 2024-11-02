import { Camera, Vector3 } from "three";

interface TooltipPosition {
  position: [number, number, number];
  atBottom: boolean;
}

export function calculateTooltipPosition(
  objectPosition: Vector3,
  objectHeight: number,
  camera: Camera
): TooltipPosition {
  // Create a vector for screen position calculation
  const screenPosition = objectPosition.clone();
  screenPosition.project(camera);

  // Convert Y coordinate to screen space (-1 to 1)
  // If y > 0.2, object is in upper part of screen
  const atBottom = screenPosition.y > 0.2;

  // Calculate offset based on object height
  const verticalOffset = objectHeight + 0.5; // Add some padding

  return {
    position: [
      0, // Keep centered horizontally
      atBottom ? -verticalOffset : verticalOffset, // Move up or down based on position
      0 // Keep centered in depth
    ],
    atBottom
  };
}
