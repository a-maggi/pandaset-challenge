interface ControlPanelProps {
  frameIndex: number;
  totalFrames: number;
  pointCount: number;
  isPlaying: boolean;
  onFrameChange: (frame: number) => void;
  onTogglePlayback: () => void;
}

function ControlPanel({
  frameIndex,
  totalFrames,
  pointCount,
  isPlaying,
  onFrameChange,
  onTogglePlayback
}: ControlPanelProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.7)",
        padding: "15px",
        borderRadius: "8px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        minWidth: "400px",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "10px"
        }}
      >
        <button
          onClick={onTogglePlayback}
          style={{
            width: "40px",
            height: "30px",
            background: "#444",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <input
          type="range"
          min={0}
          max={totalFrames - 1}
          value={frameIndex}
          onChange={(e) => onFrameChange(Number(e.target.value))}
          style={{
            flex: 1,
            height: "4px",
            WebkitAppearance: "none",
            background: "linear-gradient(to right, #4a9eff, #4a9eff)",
            borderRadius: "2px",
            cursor: "pointer"
          }}
        />

        <div style={{ minWidth: "80px", textAlign: "center" }}>
          {frameIndex + 1} / {totalFrames}
        </div>
      </div>

      <div
        style={{
          fontSize: "0.8em",
          textAlign: "center",
          opacity: 0.8
        }}
      >
        Points: {pointCount.toLocaleString()}
      </div>
    </div>
  );
}

export default ControlPanel;
