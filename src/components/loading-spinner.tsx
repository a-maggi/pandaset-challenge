function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1a",
        color: "white",
        gap: "20px",
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "5px solid #333",
          borderBottom: "5px solid #4a9eff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <div
        style={{
          fontSize: "18px",
          letterSpacing: "0.1em"
        }}
      >
        Loading Scene Data...
      </div>
    </div>
  );
}

export default LoadingSpinner;
