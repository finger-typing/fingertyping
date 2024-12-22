"use client";
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import dynamic from "next/dynamic";
import { disableInspection } from "../utils/disableInspection";
import { wordLists, generateRandomWords } from "../utils/wordLists";
import WordDisplay from "../components/WordDisplay";
import InputField from './lesson/components/InputField';
import GameControls from "../components/GameControls";
import ShareSection from "../components/ShareSection";
import Mainpagefooter from "../components/Mainpagefooter";
import usePerformanceMetrics from "../components/PerformanceMetrics";
import { useApp } from "@/context/AppContext";
import { audioPlayer } from "../utils/audioUtils";

const Results = dynamic(() => import("../components/Results"), {
  ssr: false,
});

const TypingPractice: React.FC = () => {
  const { language, darkMode, customTime, customText } = useApp();

  const [gameState, setGameState] = useState({
    language: language,
    inputValue: "",
    randomText: "",
    startTime: null as number | null,
    timeElapsed: 0,
    timeRemaining: customTime,
    hasStarted: false,
    isComplete: false,
    currentWordIndex: 0,
    isCustomText: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update game state when language changes
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      language: language,
      randomText: generateRandomWords(10000, wordLists[language] || wordLists["English"]),
      inputValue: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
      isCustomText: false,
    }));
  }, [language, customTime]);

  // Handle custom text changes
  useEffect(() => {
    if (customText) {
      setGameState(prev => ({
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
    }
  }, [customText, customTime]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevValue = gameState.inputValue;
    
    // Play sound based on word accuracy
    if (value.length > prevValue.length) {  // Only check when adding characters
      const inputWords = value.split(" ");
      const targetWords = gameState.randomText.split(" ");
      const currentWordIndex = inputWords.length - 1;
      const currentInputWord = inputWords[currentWordIndex] || "";
      const currentTargetWord = targetWords[currentWordIndex] || "";
      
      // Compare up to the length of the input word
      const isCorrectSoFar = currentTargetWord.startsWith(currentInputWord);
      
      if (isCorrectSoFar) {
        audioPlayer.playCorrect();
      } else {
        audioPlayer.playIncorrect();
      }
    }

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

  const initializeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      randomText: prev.isCustomText
        ? prev.randomText
        : generateRandomWords(10000, wordLists[language] || wordLists["English"]),
      inputValue: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
    }));
    inputRef.current?.focus();
  }, [language, customTime]);

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
