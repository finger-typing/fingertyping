"use client";
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import dynamic from "next/dynamic";
import { disableInspection } from "../utils/disableInspection";
import { wordLists, generateRandomWords } from "../utils/wordLists";
import Navbar from "../components/Navbar";
import WordDisplay from "../components/WordDisplay";
import InputField from "../components/InputField";
import GameControls from "../components/GameControls";
import ShareSection from "../components/ShareSection";
import Mainpagefooter from "../components/Mainpagefooter";
import usePerformanceMetrics from "../components/PerformanceMetrics";

const Results = dynamic(() => import("../components/Results"), {
  ssr: false,
});

const TypingPractice: React.FC = () => {
  const [gameState, setGameState] = useState({
    language: "English",
    inputValue: "",
    randomText: "",
    startTime: null as number | null,
    timeElapsed: 0,
    timeRemaining: 60,
    hasStarted: false,
    isComplete: false,
    currentWordIndex: 0,
    isCustomText: false,
  });

  const [darkMode, setDarkMode] = useState(true);
  const [customTime, setCustomTime] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  const initializeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      randomText: prev.isCustomText
        ? prev.randomText
        : generateRandomWords(10000, wordLists[prev.language] || wordLists["English"]),
      inputValue: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
    }));
    inputRef.current?.focus();
  }, [customTime]);

  useEffect(() => {
    initializeGame();
  }, [gameState.language, initializeGame]);

  const handleCustomTextSubmit = (customText: string) => {
    setGameState((prev) => ({
      ...prev,
      randomText: customText,
      isCustomText: true,
      inputValue: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
    }));
    inputRef.current?.focus();
  };

  const handleCustomTimeSubmit = (newTime: number) => {
    setCustomTime(newTime);
    setGameState((prev) => ({
      ...prev,
      timeRemaining: newTime,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameState((prev) => ({
      ...prev,
      inputValue: value,
      hasStarted: true,
      startTime: prev.startTime || Date.now(),
      currentWordIndex: Math.max(value.split(" ").length - 1, prev.currentWordIndex),
      isComplete: value === prev.randomText,
    }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.hasStarted && !gameState.isComplete && gameState.timeRemaining > 0) {
      interval = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
          timeRemaining: prev.timeRemaining - 1,
          isComplete: prev.timeRemaining - 1 <= 0,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.hasStarted, gameState.isComplete, gameState.timeRemaining]);

  useEffect(() => {
    disableInspection();
  }, []);

  const metrics = usePerformanceMetrics({
    inputValue: gameState.inputValue,
    randomText: gameState.randomText,
    timeElapsed: gameState.timeElapsed,
  });

  return (
    <div
      className={`flex min-h-screen flex-col items-center ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900"
      }`}
    >
      <Navbar
        language={gameState.language}
        setLanguage={(lang) => setGameState((prev) => ({ ...prev, language: lang }))}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCustomTextSubmit={handleCustomTextSubmit}
        onCustomTimeSubmit={handleCustomTimeSubmit}
        customTime={customTime}
      />

      <main className="mt-4 w-full max-w-4xl px-4 space-y-5">
        <WordDisplay
          randomText={gameState.randomText}
          inputValue={gameState.inputValue}
          currentWordIndex={gameState.currentWordIndex}
          darkMode={darkMode}
        />

        <InputField
          inputValue={gameState.inputValue}
          handleInputChange={handleInputChange}
          hasStarted={gameState.hasStarted}
          isComplete={gameState.isComplete}
          darkMode={darkMode}
          inputRef={inputRef}
          placeholder="Start typing to begin the game..."
          randomText={gameState.randomText}
        />

        <GameControls
          initializeGame={initializeGame}
          hasStarted={gameState.hasStarted}
          timeRemaining={gameState.timeRemaining}
          darkMode={darkMode}
        />

        {gameState.isComplete && (
          <Results
            isComplete={gameState.isComplete}
            timeElapsed={gameState.timeElapsed}
            calculateWPM={() => metrics.wpm}
            calculateAccuracy={() => metrics.accuracy}
            correctAndWrongWords={metrics.wordStats}
            keystrokes={metrics.keystrokeStats}
            darkMode={darkMode}
          />
        )}

        <ShareSection darkMode={darkMode} />

        <Mainpagefooter darkMode={darkMode} />
      </main>
    </div>
  );
};

export default TypingPractice;
