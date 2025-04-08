"use client";
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import dynamic from "next/dynamic";
import { disableInspection } from "../utils/disableInspection";
import { wordLists, generateRandomWords } from "../utils/wordLists";
import WordDisplay from "../components/WordDisplay";
import InputField from './lesson/components/InputField';
import GameControls from "../components/GameControls";
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
    typedText: "",
    startTime: null as number | null,
    timeElapsed: 0,
    timeRemaining: customTime,
    hasStarted: false,
    isComplete: false,
    currentWordIndex: 0,
    isCustomText: false,
    isBlankPage: false,
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
      typedText: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
      isCustomText: false,
      isBlankPage: false,
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
        typedText: "",
        startTime: null,
        timeElapsed: 0,
        timeRemaining: customTime,
        hasStarted: false,
        isComplete: false,
        currentWordIndex: 0,
        isBlankPage: false,
      }));
      inputRef.current?.focus();
    }
  }, [customText, customTime]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const prevValue = gameState.inputValue;

    // We'll allow users to move to the next word even if they type a word incorrectly
    // This will be tracked as a wrong word in the metrics

    // Play sound based on character accuracy
    if (value.length > prevValue.length && !gameState.isBlankPage) {  // Only check when adding characters and not in blank page mode
      const inputWords = value.split(" ");
      const targetWords = gameState.randomText.split(" ");
      const currentWordIndex = inputWords.length - 1;
      const currentInputWord = inputWords[currentWordIndex] || "";
      const currentTargetWord = targetWords[currentWordIndex] || "";

      // Check just the last character typed
      const lastCharIndex = currentInputWord.length - 1;
      if (lastCharIndex >= 0 && lastCharIndex < currentTargetWord.length) {
        const isCorrectChar = currentInputWord[lastCharIndex] === currentTargetWord[lastCharIndex];

        if (isCorrectChar) {
          audioPlayer.playCorrect();
        } else {
          audioPlayer.playIncorrect();
        }
      } else if (lastCharIndex >= currentTargetWord.length) {
        // Extra character beyond target word length
        audioPlayer.playIncorrect();
      }
    }

    setGameState((prev) => ({
      ...prev,
      inputValue: value,
      typedText: value,
      hasStarted: true,
      startTime: prev.startTime || Date.now(),
      currentWordIndex: value.split(" ").length - 1,
      isComplete: !prev.isBlankPage && value === prev.randomText,
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

  const toggleBlankPage = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isBlankPage: !prev.isBlankPage,
      inputValue: "",
      typedText: "",
      startTime: null,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
    }));
    inputRef.current?.focus();
  }, []);

  const initializeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      randomText: prev.isCustomText
        ? prev.randomText
        : generateRandomWords(10000, wordLists[language] || wordLists["English"]),
      inputValue: "",
      typedText: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
      isBlankPage: false, // Always go back to normal mode on reset
    }));
    inputRef.current?.focus();
  }, [language, customTime]);

  useEffect(() => {
    disableInspection();
  }, []);

  // Pass the raw input value to the metrics calculator
  // This ensures all characters (including spaces for skipped words) are counted
  const metrics = usePerformanceMetrics({
    inputValue: gameState.inputValue,
    randomText: gameState.isBlankPage ? gameState.typedText : gameState.randomText,
    timeElapsed: gameState.timeElapsed,
  });

  return (
    <div
      className={`flex  flex-col items-center ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900"
      }`}
    >
      <main className="w-full  space-y-1  p-1 ">
        <WordDisplay
          randomText={gameState.isBlankPage ? gameState.typedText : gameState.randomText}
          inputValue={gameState.inputValue}
          currentWordIndex={gameState.currentWordIndex}
          darkMode={darkMode}
          isBlankPage={gameState.isBlankPage}
        />

        <InputField
          inputValue={gameState.inputValue}
          handleInputChange={handleInputChange}
          hasStarted={gameState.hasStarted}
          isComplete={gameState.isComplete}
          darkMode={darkMode}
          inputRef={inputRef}
          placeholder={gameState.isBlankPage ? "Type anything..." : "Start typing to begin......."}
          randomText={gameState.randomText}
        />

        <GameControls
          initializeGame={initializeGame}
          timeRemaining={gameState.timeRemaining}
          darkMode={darkMode}
          isBlankPage={gameState.isBlankPage}
          toggleBlankPage={toggleBlankPage}
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

        <Mainpagefooter darkMode={darkMode} />
      </main>
    </div>
  );
};

export default TypingPractice;
