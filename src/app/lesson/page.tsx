"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Sun, Moon, RefreshCcw, Undo2 } from "lucide-react";
import LanguageSelector from "./components/Language-Selector";
import Sidebar from "./components/Sidebar";
import TypingInterface from "./components/Typing-Interface";
import StatsDisplay from "./components/StatsDisplay";
import { useApp } from "@/context/AppContext";
import { audioPlayer } from "@/utils/audioUtils";
import {
  LessonOption,
  Language,
  LessonOptions,
  languageLetters,
} from "./components/Letter-list";

export default function TypingPractice() {
  // Get shared state from AppContext
  const { language: contextLanguage, darkMode: contextDarkMode, setDarkMode } = useApp();

  // State for lesson management
  const [currentLanguage, setCurrentLanguage] = useState<Language>(contextLanguage as Language);
  const [currentLesson, setCurrentLesson] = useState<LessonOption>("Letters(a-z)");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // State for typing interface
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  // State for game statistics
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  // State for sound control
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Ref for timer management
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle dark mode class on HTML element
  useEffect(() => {
    if (contextDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [contextDarkMode]);

  // Effect to handle game timer
  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000,
      );
    }
    return () => clearInterval(timerRef.current!);
  }, [isGameActive]);

  // Effect to calculate WPM (Words Per Minute)
  useEffect(
    () => setWpm(time > 0 ? Math.round((score / time) * 60) : 0),
    [score, time],
  );

  // Effect to reset game when language or lesson changes
  useEffect(() => {
    resetGame();
  }, [currentLanguage, currentLesson]);

  // Effect to sync with context language
  useEffect(() => {
    setCurrentLanguage(contextLanguage as Language);
  }, [contextLanguage]);

  // Get current set of letters based on language and lesson
  const getCurrentLetters = () => {
    if (currentLanguage === "English") {
      return LessonOptions[currentLesson].split("");
    }
    return languageLetters[currentLanguage];
  };

  // Handle sound effects
  const playSound = (isCorrect: boolean) => {
    if (!isSoundEnabled) return;
    if (isCorrect) {
      audioPlayer.playCorrect();
    } else {
      audioPlayer.playIncorrect();
    }
  };

  // Handle input changes and typing logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const allLetters = getCurrentLetters();
    
    // Remove extra spaces when checking length
    const cleanValue = value.replace(/\s+/g, '');
    const targetLength = input.replace(/\s+/g, '').length + 1;

    // Only allow one new character at a time
    if (cleanValue.length !== targetLength) return;

    // Get the last typed character (ignoring spaces)
    const newChar = value.trim().slice(-1);
    const expectedChar = allLetters[currentWordIndex];

    if (newChar === expectedChar) {
      // Correct letter typed
      setInput(cleanValue.split('').join(' ') + ' '); // Add spaces between letters
      setIsCorrect(true);
      playSound(true);
      setScore((prevScore) => prevScore + 1);

      // Move to next letter or loop back to start
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex >= allLetters.length - 1) {
          return 0; // Start over when reaching the end
        }
        return prevIndex + 1;
      });

      // Start the game timer on first correct input
      if (!isGameActive) setIsGameActive(true);
    } else {
      // Wrong letter typed
      playSound(false);
      setIsCorrect(false);
    }
  };

  // Reset game state
  const resetGame = () => {
    setCurrentWordIndex(0); // Start from first letter
    setInput(""); // Clear input field
    setScore(0); // Reset score
    setTime(0); // Reset timer
    setIsGameActive(false); // Stop game
    setWpm(0); // Reset WPM
    setIsCorrect(true); // Reset correctness state
  };

  // Toggle sound on/off
  const toggleSound = () => {
    const isEnabled = audioPlayer.toggleSound();
    setIsSoundEnabled(isEnabled);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar with lesson options */}
        <Sidebar
          lessonOptions={LessonOptions}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          currentLanguage={currentLanguage}
        />

        {/* Main content area */}
        <div className="flex-1 bg-white p-4 dark:bg-gray-900 md:p-8">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
            {/* Header with controls */}
            <div className="mb-2 flex items-center justify-between">
              {/* Sound toggle button */}
              <button
                onClick={toggleSound}
                className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
              >
                {isSoundEnabled ? (
                  <Volume2 className="h-6 w-6 text-gray-800 dark:text-white" />
                ) : (
                  <VolumeX className="h-6 w-6 text-gray-800 dark:text-white" />
                )}
              </button>

              <h1 className="text-xl font-bold text-gray-800 dark:text-white md:text-xl">
                Finger Typing
              </h1>

              {/* Dark mode toggle button */}
              <button
                onClick={() => setDarkMode(!contextDarkMode)}
                className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={contextDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {contextDarkMode ? (
                  <Sun className="h-6 w-6 text-gray-800 dark:text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-800 dark:text-white" />
                )}
              </button>
            </div>

            {/* Typing interface */}
            <TypingInterface
              currentWord={getCurrentLetters()[currentWordIndex]}
              isCorrect={isCorrect}
              input={input}
              handleInputChange={handleInputChange}
              typedWords={[]}
            />

            {/* Statistics display */}
            <StatsDisplay
              wpm={wpm}
              time={time}
              score={score}
              currentLesson={currentLesson}
            />

            {/* Language selector */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              setCurrentLanguage={(language) =>
                setCurrentLanguage(language as Language)
              }
              languageLetters={languageLetters}
            />

            {/* Mobile lesson selector */}
            <div className="mb-4 md:hidden">
              <select
                title="mobile_lesson"
                value={currentLesson}
                onChange={(e) =>
                  setCurrentLesson(e.target.value as LessonOption)
                }
                className="w-full rounded border bg-gray-100 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={currentLanguage !== "English"}
              >
                {Object.keys(LessonOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Control buttons */}
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              {/* Reset button */}
              <button
                onClick={resetGame}
                className="flex items-center justify-center rounded bg-green-500 px-6 py-1 text-white transition duration-200 ease-in-out hover:bg-green-600"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </button>
              {/* Home button */}
              <Link
                href="/"
                className="flex items-center justify-center rounded bg-green-500 px-6 py-1 text-white transition duration-200 ease-in-out hover:bg-green-600"
              >
                <Undo2 className="mr-2 h-4 w-4" /> Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
