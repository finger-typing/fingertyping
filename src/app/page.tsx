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

  const [darkMode, setDarkMode] = useState(true);
  const [customTime, setCustomTime] = useState(60);

  const inputRef = useRef<HTMLInputElement>(null);

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
    setGameState((prev) => {
      const newState = {
        ...prev,
        inputValue: value,
        hasStarted: true,
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
    const wordsTyped = gameState.inputValue
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    if (gameState.timeElapsed === 0) return "0.00";

    const secondsElapsed = gameState.timeElapsed;
    const wpm = (wordsTyped / secondsElapsed) * 60;

    return wpm.toFixed(2);
  };

  const calculateAccuracy = (): string => {
    const inputWords = gameState.inputValue.trim().split(/\s+/).filter(Boolean);
    const randomWords = gameState.randomText
      .trim()
      .split(/\s+/)
      .slice(0, inputWords.length);

    if (inputWords.length === 0) return "0.00";

    const correctWords = inputWords.filter(
      (word, i) => word === randomWords[i]
    ).length;
    const accuracy = (correctWords / inputWords.length) * 100;
    return accuracy.toFixed(2);
  };

  const correctAndWrongWords = () => {
    const inputWords = gameState.inputValue.trim().split(/\s+/).filter(Boolean);
    const randomWords = gameState.randomText
      .trim()
      .split(/\s+/)
      .slice(0, inputWords.length);
    const correctWords = inputWords.filter(
      (word, i) => word === randomWords[i]
    ).length;
    const wrongWords = inputWords.length - correctWords;
    return { correctWords, wrongWords };
  };

  const keystrokes = () => {
    const inputChars = gameState.inputValue.split("");
    const referenceChars = gameState.randomText
      .slice(0, inputChars.length)
      .split("");
    const correctChars = inputChars.filter(
      (char, i) => char === referenceChars[i]
    ).length;
    const wrongChars = inputChars.length - correctChars;
    return { correctKeystrokes: correctChars, wrongKeystrokes: wrongChars };
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

      <div className="w-full max-w-3xl px-4 mt-4">
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
            calculateWPM={calculateWPM}
            calculateAccuracy={calculateAccuracy}
            correctAndWrongWords={correctAndWrongWords()}
            keystrokes={keystrokes()}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default TypingPractice;
