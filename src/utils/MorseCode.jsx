// Bảng ánh xạ mã Morse
const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": " ",
};

// Chuyển văn bản thành mã Morse
export const textToMorse = (text) => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseCodeMap[char] || "")
    .join(" ");
};

// Chuyển mã Morse thành văn bản
export const morseToText = (morse) => {
  const reverseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([key, value]) => [value, key])
  );
  return morse
    .trim()
    .split(" ")
    .map((code) => reverseMap[code] || "")
    .join("");
};