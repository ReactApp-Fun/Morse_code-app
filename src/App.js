import React, { useState, useRef, useEffect } from "react";
import MorseInput from "./components/MorseInput";
import TextInput from "./components/TextInput";
import MorseDisplay from "./components/MorseDisplay";
import TextDisplay from "./components/TextDisplay";
import ControlButtons from "./components/ControlButtons";
import { textToMorse, morseToText } from "./utils/MorseCode";
import "./App.css";

const App = () => {
  const [morse, setMorse] = useState("");
  const [currentMorse, setCurrentMorse] = useState("");
  const [text, setText] = useState("");
  const [isMorseToText, setIsMorseToText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(20); // Tốc độ mặc định: 20 WPM
  const stopSignal = useRef(false);
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

  const handleMorseInput = (morseChar) => {
    if (isMorseToText) {
      const newMorse = morse ? morse + " " + morseChar : morseChar;
      setMorse(newMorse);
      setText(morseToText(newMorse));
    }
  };

  const handleCurrentMorseChange = (current) => {
    setCurrentMorse(current);
  };

  const handleTextInput = (inputText) => {
    if (!isMorseToText) {
      setText(inputText);
      setMorse(textToMorse(inputText));
      setCurrentMorse("");
    }
  };

  const handleClear = () => {
    setMorse("");
    setCurrentMorse("");
    setText("");
  };

  const handleBackspace = () => {
    if (isMorseToText) {
      const morseWords = morse.trim().split(" ");
      morseWords.pop();
      const newMorse = morseWords.join(" ");
      setMorse(newMorse);
      setText(morseToText(newMorse));
      setCurrentMorse("");
    } else {
      const newText = text.slice(0, -1);
      setText(newText);
      setMorse(textToMorse(newText));
      setCurrentMorse("");
    }
  };

  const handleToggleMode = () => {
    setIsMorseToText(!isMorseToText);
    setMorse("");
    setCurrentMorse("");
    setText("");
  };

  // Xử lý thay đổi WPM
  const handleWpmChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 40) {
      setWpm(value);
    }
  };

  // Hàm dừng phát
  const stopMorse = () => {
    stopSignal.current = true;
    setIsPlaying(false);
  };

  // Hàm tạo âm thanh beep
  const playBeep = async (duration) => {
    if (!audioContextRef.current || stopSignal.current) return;
    await resumeAudioContext(); // Resume AudioContext trước khi phát
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

  // Hàm phát lại âm thanh Morse
  const playMorse = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    stopSignal.current = false;

    await resumeAudioContext(); // Resume AudioContext trước khi phát

    const morseString = morse + (currentMorse ? " " + currentMorse : "");
    const morseChars = morseString.replace(/\s+/g, " ").trim().split(" ");

    // Tính thời gian dựa trên WPM
    const dotDuration = 1200 / wpm; // Thời gian dấu chấm (ms)
    const dashDuration = dotDuration * 3; // Dấu gạch ngang
    const intraCharPause = dotDuration; // Nghỉ giữa ký tự
    const interCharPause = dotDuration * 3; // Nghỉ giữa chữ cái

    for (const char of morseChars) {
      if (stopSignal.current) break;
      for (const symbol of char) {
        if (stopSignal.current) break;
        await playBeep(symbol === "." ? dotDuration : dashDuration);
        await new Promise((resolve) => setTimeout(resolve, intraCharPause));
      }
      await new Promise((resolve) => setTimeout(resolve, interCharPause));
    }

    setIsPlaying(false);
    stopSignal.current = false;
  };

  return (
    <div className="app">
      <h1>Morse App</h1>
      {isMorseToText ? (
        <MorseInput
          onMorseInput={handleMorseInput}
          onCurrentMorseChange={handleCurrentMorseChange}
          disabled={isPlaying}
        />
      ) : (
        <TextInput onTextInput={handleTextInput} disabled={isPlaying} />
      )}
      <MorseDisplay morse={morse + (currentMorse ? " " + currentMorse : "")} />
      {isMorseToText && <TextDisplay text={text} />}
      <ControlButtons
        onClear={handleClear}
        onBackspace={handleBackspace}
        onToggleMode={handleToggleMode}
        onPlayMorse={playMorse}
        onStopMorse={stopMorse}
        wpm={wpm}
        onWpmChange={handleWpmChange}
        isMorseToText={isMorseToText}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default App;