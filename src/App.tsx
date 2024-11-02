import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import Scene from "./components/scene";
import { fetchFrameData } from "./utils/fetcher";
import { useEffect, useState } from "react";
import { SceneData } from "./types";
import ControlPanel from "./components/control-panel";
import LoadingSpinner from "./components/loading-spinner";

function App() {
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

  const handleFrameChange = (newFrame: number) => {
    setFrameIndex(newFrame);
  };

  if (isLoading || !allFramesData.length) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        <Grid args={[200, 200]} cellColor="#6f6f6f" sectionSize={5} sectionThickness={1} sectionColor="#6f6f6f" />
        <Scene points={allFramesData[frameIndex].points} cuboids={allFramesData[frameIndex].cuboids} />
      </Canvas>

      <ControlPanel
        frameIndex={frameIndex}
        totalFrames={50}
        pointCount={allFramesData[frameIndex].points.length}
        isPlaying={isPlaying}
        onFrameChange={handleFrameChange}
        onTogglePlayback={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
}

export default App;
