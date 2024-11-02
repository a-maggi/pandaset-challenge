import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import Scene from "./components/scene";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        <Grid args={[200, 200]} cellColor="#6f6f6f" sectionSize={5} sectionThickness={1} sectionColor="#6f6f6f" />
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
