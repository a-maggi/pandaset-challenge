import Points from "./points";
import Cuboids from "./cuboids";
import { Cuboid, Point3D } from "@/types";

interface SceneProps {
  points: Point3D[];
  cuboids: Cuboid[];
}

function Scene({ points, cuboids }: SceneProps) {
  return (
    <>
      <Points points={points} />
      <Cuboids cuboids={cuboids} />
    </>
  );
}

export default Scene;
