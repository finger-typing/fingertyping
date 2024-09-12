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
  const [language, setLanguage] = useState<string>("English");
  const [inputValue, setInputValue] = useState<string>("");
  const [randomText, setRandomText] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initializeGame = useCallback(() => {
    const currentWordList = wordLists[language] || wordLists["English"];
    setRandomText(generateRandomWords(1000, currentWordList));
    setInputValue("");
    setStartTime(null);
    setTimeElapsed(0);
    setTimeRemaining(60);
    setHasStarted(false);
    setIsComplete(false);
    setCurrentWordIndex(0);
    inputRef.current?.blur();
  }, [language]);

  useEffect(() => {
    initializeGame();
  }, [language, initializeGame]);

  useEffect(() => {
    if (containerRef.current && inputRef.current) {
      inputRef.current.style.width = `${containerRef.current.offsetWidth}px`;
    }
  }, [randomText]);

  const startGame = () => {
    setHasStarted(true);
    setInputValue("");
    setStartTime(Date.now());
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!startTime) setStartTime(Date.now());

    const typedWords = value.split(" ");
    if (typedWords.length > currentWordIndex + 1) {
      setCurrentWordIndex(typedWords.length - 1);
    }

    if (value === randomText) {
      setIsComplete(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasStarted && !isComplete && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasStarted, isComplete, timeRemaining]);

  const calculateWPM = (): string => {
    const wordsTyped = inputValue.trim().split(" ").length;
    const minutesElapsed = timeElapsed / 60;
    return (wordsTyped / minutesElapsed || 0).toFixed(2);
  };

  const calculateAccuracy = (): string => {
    const correctChars = inputValue
      .split("")
      .filter((char, i) => char === randomText[i]).length;
    return (
      (correctChars / Math.min(inputValue.length, randomText.length)) *
      100
    ).toFixed(2);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="w-full max-w-3xl px-4 mt-8">
        <div ref={containerRef}>
          <WordDisplay
            randomText={randomText}
            inputValue={inputValue}
            currentWordIndex={currentWordIndex}
            darkMode={darkMode}
          />
        </div>

        <InputField
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          hasStarted={hasStarted}
          isComplete={isComplete}
          darkMode={darkMode}
          inputRef={inputRef}
        />

        <GameControls
          startGame={startGame}
          initializeGame={initializeGame}
          hasStarted={hasStarted}
          timeRemaining={timeRemaining}
          darkMode={darkMode}
        />

        <Results
          isComplete={isComplete}
          timeElapsed={timeElapsed}
          calculateWPM={calculateWPM}
          calculateAccuracy={calculateAccuracy}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default TypingPractice;
