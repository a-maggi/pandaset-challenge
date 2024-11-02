export function getHeightColor(height: number): [number, number, number] {
  if (height < 0.1) {
    return [0.1, 0.1, 0.2];
  }
  const smoothHeight = Math.pow(height, 0.5); // Makes transition more gradual

  const grayComponent = 0.5 * (1 - smoothHeight);
  const blueComponent = 0.5 + smoothHeight;

  return [grayComponent, blueComponent, blueComponent];
}
