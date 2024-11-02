import { useEffect, useState } from "react";
import Points from "./points";
import Cuboids from "./cuboids";
import { fetchFrameData } from "../utils/fetcher";
import { SceneData } from "../types";

function Scene() {
  const [allFramesData, setAllFramesData] = useState<SceneData[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch all 50 frames at once
        const promises = Array.from({ length: 50 }, (_, i) => fetchFrameData(i));
        const allData = await Promise.all(promises);
        setAllFramesData(allData.filter((data): data is SceneData => data !== null));
      } catch (error) {
        console.error("Error loading frame data:", error);
      }
      setIsLoading(false);
    };

    loadAllData();
  }, []); // Only run once on mount

  useEffect(() => {
    if (!allFramesData.length) return;

    const intervalId = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 50);
    }, 100);

    return () => clearInterval(intervalId);
  }, [allFramesData]); // Start animation after data is loaded

  if (isLoading || !allFramesData.length) return null;

  return (
    <>
      <Points points={allFramesData[frameIndex].points} />
      <Cuboids cuboids={allFramesData[frameIndex].cuboids} />
    </>
  );
}

export default Scene;
