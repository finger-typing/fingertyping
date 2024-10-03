"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const words = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const TypingPractice = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameActive]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const currentWord = words[currentWordIndex].toLowerCase();

    // Set input value to the current state
    setInput(value);

    if (!isGameActive) {
      setIsGameActive(true);
    }

    // Check if user typed the entire word correctly
    if (value.endsWith(currentWord)) {
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsCorrect(true);

      // Keep the previously typed words visible
      setInput((prevInput) => prevInput + " ");
    } else {
      // Partial match: check if the current input matches part of the word
      setIsCorrect(value === currentWord.slice(0, value.length));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-6">
          <div
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 transition-all duration-300 ease-in-out ${
              isCorrect ? "text-green-500" : "text-red-500"
            } drop-shadow-2xl`}
          >
            {/* Display the word in uppercase */}
            {words[currentWordIndex].toUpperCase()}
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full text-2xl sm:text-3xl p-3 sm:p-4 border-4 border-gray-700 rounded-lg bg-gray-800 bg-opacity-60 text-gray-200 placeholder-gray-400 text-center focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          placeholder="Start typing to begin"
        />

        <div className="mt-6 flex justify-between item-center">
          <div className="text-lg sm:text-2xl font-semibold text-gray-300">
            Score: <span className="text-gray-100">{score}</span>
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-300">
            Time: <span className="text-gray-100">{formatTime(time)}</span>
          </div>
          <div>
            <Link
              href="/"
              className="text-blue-500 hover:underline mb-6 inline-block text-lg sm:text-2xl font-semibold text-gray-300"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
