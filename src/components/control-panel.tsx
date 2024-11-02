interface ControlPanelProps {
  frameIndex: number;
  totalFrames: number;
  pointCount: number;
  isPlaying: boolean;
  onPrevFrame: () => void;
  onNextFrame: () => void;
  onTogglePlayback: () => void;
}

function ControlPanel({
  frameIndex,
  totalFrames,
  pointCount,
  isPlaying,
  onPrevFrame,
  onNextFrame,
  onTogglePlayback
}: ControlPanelProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: "15px",
          borderRadius: "8px",
          color: "white",
          fontFamily: "Arial, sans-serif",
          backdropFilter: "blur(4px)"
        }}
      >
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          Frame: {frameIndex + 1} / {totalFrames}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center"
          }}
        >
          <button
            onClick={onPrevFrame}
            style={{
              padding: "5px 10px",
              background: "#444",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer"
            }}
            aria-label="Previous Frame"
          >
            ←
          </button>
          <button
            onClick={onTogglePlayback}
            style={{
              padding: "5px 15px",
              background: "#444",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
              width: "60px"
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={onNextFrame}
            style={{
              padding: "5px 10px",
              background: "#444",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer"
            }}
            aria-label="Next Frame"
          >
            →
          </button>
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.8em",
            textAlign: "center"
          }}
        >
          Points: {pointCount}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
