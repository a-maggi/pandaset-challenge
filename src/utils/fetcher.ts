import type { SceneData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchFrameData(frameNumber: number): Promise<SceneData | null> {
  try {
    const paddedFrame = frameNumber.toString().padStart(2, "0");
    const response = await fetch(`${API_BASE_URL}/frame_${paddedFrame}.json`);
    const data: SceneData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching frame data:", error);
    return null;
  }
}
