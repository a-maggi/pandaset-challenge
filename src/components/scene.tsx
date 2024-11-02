import { useEffect, useState } from "react";
import Points from "./points";
import Cuboids from "./cuboids";
import { fetchFrameData } from "../utils/fetcher";
import { SceneData } from "../types";
import { Grid } from "@react-three/drei";

function Scene() {
  const [sceneData, setSceneData] = useState<SceneData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFrameData(0);
      setSceneData(data);
    };
    loadData();
  }, []);

  if (!sceneData) return null;

  return (
    <>
      <Grid
        args={[200, 200]}
        cellColor="#6f6f6f"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#6f6f6f"
        position={[0, 0, 0]}
      />
      <Points points={sceneData.points} />
      <Cuboids cuboids={sceneData.cuboids} />
    </>
  );
}

export default Scene;
