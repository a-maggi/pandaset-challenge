import { useEffect, useState } from "react";
import Points from "./points";
import Cuboids from "./cuboids";
import { fetchFrameData } from "../utils/fetcher";
import { SceneData } from "../types";

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
      <Points points={sceneData.points} />
      <Cuboids cuboids={sceneData.cuboids} />
    </>
  );
}

export default Scene;
