"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { wordLists, generateRandomWords } from "../utils/wordLists";
import Navbar from "../components/Navbar";
import WordDisplay from "../components/WordDisplay";
import InputField from "../components/InputField";
import GameControls from "../components/GameControls";
import Results from "../components/Results";

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

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [customTime, setCustomTime] = useState<number>(60);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      randomText: prev.isCustomText
        ? prev.randomText
        : generateRandomWords(
            10000,
            wordLists[prev.language] || wordLists["English"]
          ),
      inputValue: "",
      startTime: null,
      timeElapsed: 0,
      timeRemaining: customTime,
      hasStarted: false,
      isComplete: false,
      currentWordIndex: 0,
    }));
    inputRef.current?.blur();
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
  };

  const handleCustomTimeSubmit = (newTime: number) => {
    setCustomTime(newTime);
    setGameState((prev) => ({
      ...prev,
      timeRemaining: newTime,
    }));
  };

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      hasStarted: true,
      inputValue: "",
      startTime: Date.now(),
    }));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameState((prev) => {
      const newState = {
        ...prev,
        inputValue: value,
        startTime: prev.startTime || Date.now(),
        currentWordIndex: Math.max(
          value.split(" ").length - 1,
          prev.currentWordIndex
        ),
        isComplete: value === prev.randomText,
      };
      return newState;
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      gameState.hasStarted &&
      !gameState.isComplete &&
      gameState.timeRemaining > 0
    ) {
      interval = setInterval(() => {
        setGameState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1;
          return {
            ...prev,
            timeElapsed: prev.timeElapsed + 1,
            timeRemaining: newTimeRemaining,
            isComplete: newTimeRemaining <= 0,
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.hasStarted, gameState.isComplete, gameState.timeRemaining]);

  const calculateWPM = (): string => {
    const wordsTyped = gameState.inputValue.trim().split(/\s+/).length;
    const minutesElapsed = gameState.timeElapsed / 60;
    return (wordsTyped / minutesElapsed || 0).toFixed(2);
  };

  const calculateAccuracy = (): string => {
    const inputChars = gameState.inputValue.split("");
    const correctChars = inputChars.filter(
      (char, i) => char === gameState.randomText[i]
    ).length;
    return ((correctChars / Math.max(inputChars.length, 1)) * 100).toFixed(2);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar
        language={gameState.language}
        setLanguage={(lang) =>
          setGameState((prev) => ({ ...prev, language: lang }))
        }
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCustomTextSubmit={handleCustomTextSubmit}
        onCustomTimeSubmit={handleCustomTimeSubmit}
        customTime={customTime}
      />

      <div className="w-full max-w-3xl px-4 mt-8">
        <div ref={containerRef}>
          <WordDisplay
            randomText={gameState.randomText}
            inputValue={gameState.inputValue}
            currentWordIndex={gameState.currentWordIndex}
            darkMode={darkMode}
          />
        </div>

        {!gameState.isComplete && (
          <InputField
            inputValue={gameState.inputValue}
            handleInputChange={handleInputChange}
            hasStarted={gameState.hasStarted}
            isComplete={gameState.isComplete}
            darkMode={darkMode}
            inputRef={inputRef}
          />
        )}

        {!gameState.isComplete && (
          <GameControls
            startGame={startGame}
            initializeGame={initializeGame}
            hasStarted={gameState.hasStarted}
            timeRemaining={gameState.timeRemaining}
            darkMode={darkMode}
          />
        )}

        {gameState.isComplete && (
          <Results
            isComplete={gameState.isComplete}
            timeElapsed={gameState.timeElapsed}
            calculateWPM={calculateWPM}
            calculateAccuracy={calculateAccuracy}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default TypingPractice;
