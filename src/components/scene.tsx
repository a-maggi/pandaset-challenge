import { useEffect, useState } from "react";
import Points from "./points";
import Cuboids from "./cuboids";
import ControlPanel from "./control-panel";
import { fetchFrameData } from "../utils/fetcher";
import { SceneData } from "../types";

function Scene() {
  const [allFramesData, setAllFramesData] = useState<SceneData[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

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
    if (!allFramesData.length || !isPlaying) return;

    const intervalId = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 50);
    }, 100);

    return () => clearInterval(intervalId);
  }, [allFramesData, isPlaying]);

  const handlePrevFrame = () => {
    setFrameIndex((prev) => (prev - 1 + 50) % 50);
  };

  const handleNextFrame = () => {
    setFrameIndex((prev) => (prev + 1) % 50);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading || !allFramesData.length) return null;

  return (
    <>
      <ControlPanel
        frameIndex={frameIndex}
        totalFrames={50}
        pointCount={allFramesData[frameIndex].points.length}
        isPlaying={isPlaying}
        onPrevFrame={handlePrevFrame}
        onNextFrame={handleNextFrame}
        onTogglePlayback={togglePlayback}
      />
      <Points points={allFramesData[frameIndex].points} />
      <Cuboids cuboids={allFramesData[frameIndex].cuboids} />
    </>
  );
}

export default Scene;
