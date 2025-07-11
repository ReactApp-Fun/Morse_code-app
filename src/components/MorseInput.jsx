import React, { useState, useEffect, useRef } from "react";

const MorseInput = ({ onMorseInput, onCurrentMorseChange, disabled }) => {
  const [mouseDownTime, setMouseDownTime] = useState(null);
  const [currentMorse, setCurrentMorse] = useState("");
  const [dashThreshold, setDashThreshold] = useState(200);
  const audioContextRef = useRef(null);

  // Khởi tạo AudioContext khi component mount
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Resume AudioContext khi có tương tác
  const resumeAudioContext = async () => {
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume().catch((err) => {
        console.error("Lỗi resume AudioContext:", err);
      });
    }
  };

  // Hàm tạo âm thanh beep
  const playBeep = async (duration) => {
    await resumeAudioContext();
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
    oscillator.connect(audioContextRef.current.destination);
    oscillator.start();
    await new Promise((resolve) => setTimeout(() => {
      oscillator.stop();
      resolve();
    }, duration));
  };

  const handleMouseDown = () => {
    setMouseDownTime(Date.now());
  };

  const handleMouseUp = () => {
    if (mouseDownTime) {
      const duration = Date.now() - mouseDownTime;
      const isDash = duration > dashThreshold;
      const morse = isDash ? "-" : ".";

      // Phát âm thanh
      playBeep(isDash ? 180 : 60).catch((err) => {
        console.error("Lỗi phát âm thanh:", err);
      });

      // Cập nhật tổ hợp Morse
      const newMorse = currentMorse + morse;
      setCurrentMorse(newMorse);
      onCurrentMorseChange(newMorse);

      setMouseDownTime(null);
    }
  };

  useEffect(() => {
    if (currentMorse) {
      const timer = setTimeout(() => {
        onMorseInput(currentMorse);
        setCurrentMorse("");
        onCurrentMorseChange("");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentMorse, onMorseInput, onCurrentMorseChange]);

  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const roundedValue = Math.round(value / 100) * 100;
    if (roundedValue >= 100 && roundedValue <= 1000) {
      setDashThreshold(roundedValue);
    }
  };

  return (
    <div >
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: disabled ? "not-allowed" : "pointer",
          backgroundColor: disabled ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Press for Dot (Hold for dash)
      </button>
      <div style={{ marginTop: "10px" }}>
        <label>
          Time to hold for a Dash (ms):
          <input
            type="number"
            value={dashThreshold}
            onChange={handleThresholdChange}
            min="100"
            max="1000"
            step="100"
            style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
          />
        </label>
      </div>
    </div>
  );
};

export default MorseInput;