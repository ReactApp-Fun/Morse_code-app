import React from "react";

const ControlButtons = ({
  onClear,
  onBackspace,
  onToggleMode,
  onPlayMorse,
  onStopMorse,
  wpm,
  onWpmChange,
  isMorseToText,
  isPlaying,
}) => {
  return (
    <div style={{ margin: "0 0 10px 0" }}>
      <button
        onClick={onClear}
        style={{ marginRight: "10px", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px" }}
      >
        Clear
      </button>
      <button
        onClick={onBackspace}
        style={{ marginRight: "10px", padding: "10px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "5px" }}
      >
        Backspace
      </button>
      <button
        onClick={onToggleMode}
        style={{ marginRight: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        {isMorseToText ? "Convert Text → Morse" : "Convert Morse → Text"}
      </button>
      {isPlaying ? (
        <button
          onClick={onStopMorse}
          style={{ marginRight: "10px", padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}
        >
          Stop
        </button>
      ) : (
        <button
          onClick={onPlayMorse}
          style={{ marginRight: "10px", padding: "10px", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: "5px" }}
        >
          Play Morse
        </button>
      )}
      <label>
        Speed (WPM):
        <input
          type="number"
          value={wpm}
          onChange={onWpmChange}
          min="5"
          max="40"
          step="5"
          style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
        />
      </label>
    </div>
  );
};

export default ControlButtons;