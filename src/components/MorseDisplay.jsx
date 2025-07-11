import React from "react";

const MorseDisplay = ({ morse }) => {
  return (
    <div>
      <h3>Morse Code</h3>
      <textarea
        value={morse}
        readOnly
        style={{ width: "100%", height: "100px", fontFamily: "monospace" }}
      />
    </div>
  );
};

export default MorseDisplay;