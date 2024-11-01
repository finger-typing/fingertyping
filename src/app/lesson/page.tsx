"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Sun, Moon, RefreshCcw, Undo2 } from "lucide-react";
import LanguageSelector from "./components/Language-Selector";
import Sidebar from "./components/Sidebar";
import TypingInterface from "./components/Typing-Interface";
import StatsDisplay from "./components/StatsDisplay";
import {
  LessonOption,
  Language,
  LessonOptions,
  languageLetters,
} from "./components/Letter-list";

export default function TypingPractice() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [currentLesson, setCurrentLesson] =
    useState<LessonOption>("Letters(a-z)");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const [wpm, setWpm] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000,
      );
    }
    return () => clearInterval(timerRef.current!);
  }, [isGameActive]);

  useEffect(
    () => setWpm(time > 0 ? Math.round((score / time) * 60) : 0),
    [score, time],
  );

  useEffect(() => {
    resetGame();
  }, [currentLanguage, currentLesson]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const getCurrentLetters = () => {
    if (currentLanguage === "English") {
      return LessonOptions[currentLesson].split("");
    }
    return languageLetters[currentLanguage];
  };

  const playSound = (isCorrect: boolean) => {
    if (!isSoundEnabled) return;
    const audioRef = isCorrect ? correctAudioRef : incorrectAudioRef;
    audioRef.current
      ?.play()
      .catch((error) => console.error("Error playing sound:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentWord = getCurrentLetters()[currentWordIndex];

    if (!isGameActive) setIsGameActive(true);

    if (value === currentWord) {
      setScore((prevScore) => prevScore + 1);
      setTypedWords((prev) => [...prev, currentWord]);
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % getCurrentLetters().length,
      );
      setInput("");
      setIsCorrect(true);
      playSound(true);
    } else {
      const newIsCorrect = value === currentWord.slice(0, value.length);
      setIsCorrect(newIsCorrect);
      setInput(value);
      if (!newIsCorrect) {
        playSound(false);
      }
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setTypedWords([]);
    setInput("");
    setScore(0);
    setTime(0);
    setIsGameActive(false);
    setWpm(0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          lessonOptions={LessonOptions}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          currentLanguage={currentLanguage}
        />

        <div className="flex-1 bg-white p-4 dark:bg-gray-900 md:p-8">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800">
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
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

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6 text-gray-800 dark:text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-800 dark:text-white" />
                )}
              </button>
            </div>

            <TypingInterface
              currentWord={getCurrentLetters()[currentWordIndex]}
              isCorrect={isCorrect}
              input={input}
              handleInputChange={handleInputChange}
              typedWords={typedWords}
            />

            <StatsDisplay
              wpm={wpm}
              time={time}
              score={score}
              currentLesson={currentLesson}
            />

            <LanguageSelector
              currentLanguage={currentLanguage}
              setCurrentLanguage={(language) =>
                setCurrentLanguage(language as Language)
              }
              languageLetters={languageLetters}
            />

            <div className="mb-4 md:hidden">
              <select
                title="mobile_lesson"
                value={currentLesson}
                onChange={(e) =>
                  setCurrentLesson(e.target.value as LessonOption)
                } // Casting to LessonOption
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

            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <button
                onClick={resetGame}
                className="flex items-center justify-center rounded bg-green-500 px-6 py-1 text-white transition duration-200 ease-in-out hover:bg-green-600"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </button>
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

      <audio ref={correctAudioRef} src="/correct.mp3" />
      <audio ref={incorrectAudioRef} src="/incorrect.mp3" />
    </div>
  );
}
