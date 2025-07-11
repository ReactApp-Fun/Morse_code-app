import React from "react";

const TextDisplay = ({ text }) => {
  return (
    <div>
      <h3>Text</h3>
      <textarea
        value={text}
        readOnly
        style={{ width: "100%", height: "100px" }}
      />
    </div>
  );
};

export default TextDisplay;