import React from "react";

const TextInput = ({ onTextInput, disabled }) => {
  const handleChange = (e) => {
    const text = e.target.value.toUpperCase();
    onTextInput(text);
  };

  return (
    <div>
      <h3>Text to morse</h3>
      <input
        type="text"
        onChange={handleChange}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default TextInput;