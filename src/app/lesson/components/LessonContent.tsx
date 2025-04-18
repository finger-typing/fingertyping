"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RefreshCcw, Undo2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";
import TypingInterface from "./Typing-Interface";
import StatsDisplay from "./StatsDisplay";
import { useApp } from "@/context/AppContext";
import { audioPlayer } from "@/utils/audioUtils";
import {
  EnglishLessonOptions,
  BanglaLessonOptions,
  HindiLessonOptions,
  UrduLessonOptions,
  type AllLessonOptions,
  type EnglishLessonOption,
  type BanglaLessonOption,
  type HindiLessonOption,
  type UrduLessonOption
} from "./lesson-options";
import { type Language, languageLetters } from "./lesson-options/LanguageLetters";

export default function LessonContent() {
  const searchParams = useSearchParams();
  const practiceType = (searchParams.get("type") || "letters") as
    | "letters"
    | "words";
  const wordList = searchParams.get("wordList") || "";

  const { language: contextLanguage, darkMode: contextDarkMode } = useApp();

  // State for lesson management
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    contextLanguage as Language,
  );
  const [currentLesson, setCurrentLesson] =
    useState<AllLessonOptions>("Letters(a-z)");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isSoundEnabled] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Effects
  useEffect(() => {
    if (contextDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [contextDarkMode]);

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
    setCurrentLanguage(contextLanguage as Language);
  }, [contextLanguage]);

  // Helper functions
  const getCurrentContent = () => {
    if (practiceType === "words" && wordList) {
      return wordList.split(",");
    }

    // Handle different language lesson options
    if (currentLanguage === "English") {
      if (Object.keys(EnglishLessonOptions).includes(currentLesson as string)) {
        return EnglishLessonOptions[currentLesson as EnglishLessonOption].split("");
      }
    } else if (currentLanguage === "Bangla") {
      if (Object.keys(BanglaLessonOptions).includes(currentLesson as string)) {
        return BanglaLessonOptions[currentLesson as BanglaLessonOption].split("");
      }
    } else if (currentLanguage === "Hindi") {
      if (Object.keys(HindiLessonOptions).includes(currentLesson as string)) {
        return HindiLessonOptions[currentLesson as HindiLessonOption].split("");
      }
    } else if (currentLanguage === "Urdu") {
      if (Object.keys(UrduLessonOptions).includes(currentLesson as string)) {
        return UrduLessonOptions[currentLesson as UrduLessonOption].split("");
      }
    }

    // Default to all letters for the current language if no specific lesson is selected
    return languageLetters[currentLanguage];
  };

  const playSound = (isCorrect: boolean) => {
    if (!isSoundEnabled) return;
    if (isCorrect) {
      audioPlayer.playCorrect();
    } else {
      audioPlayer.playIncorrect();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const content = getCurrentContent();

    if (practiceType === "words") {
      const cleanValue = value.trim();
      const expectedWord = content[currentWordIndex];

      if (cleanValue === expectedWord) {
        setInput("");
        setIsCorrect(true);
        playSound(true);
        setScore((prevScore) => prevScore + 1);
        setTypedWords((prev) => [...prev, cleanValue]);

        setCurrentWordIndex((prevIndex) => {
          if (prevIndex >= content.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });

        if (!isGameActive) setIsGameActive(true);
      } else {
        setInput(value);
        setIsCorrect(
          cleanValue === expectedWord.substring(0, cleanValue.length),
        );
      }
    } else {
      const cleanValue = value.replace(/\s+/g, "");
      const targetLength = input.replace(/\s+/g, "").length + 1;

      if (cleanValue.length !== targetLength) return;

      const newChar = value.trim().slice(-1);
      const expectedChar = content[currentWordIndex];

      if (newChar === expectedChar) {
        setInput(cleanValue.split("").join(" ") + " ");
        setIsCorrect(true);
        playSound(true);
        setScore((prevScore) => prevScore + 1);

        setCurrentWordIndex((prevIndex) => {
          if (prevIndex >= content.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });

        if (!isGameActive) setIsGameActive(true);
      } else {
        playSound(false);
        setIsCorrect(false);
      }
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setInput("");
    setScore(0);
    setTime(0);
    setIsGameActive(false);
    setWpm(0);
    setIsCorrect(true);
    setTypedWords([]);

    // Increment reset counter to trigger focus in TypingInterface
    setResetCounter((prev) => prev + 1);
  };

  return (
    <div className="h-[calc(100vh-3rem)] overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex h-full flex-col md:flex-row">
        <div className="md:w-64 md:min-w-[250px]">
          <Sidebar
            currentLesson={currentLesson}
            setCurrentLesson={setCurrentLesson}
            currentLanguage={currentLanguage}
          />
        </div>

        <div className="h-full flex-1 overflow-hidden">
          <div className="h-full w-full overflow-y-auto">
            <div className="mx-auto flex h-full max-w-6xl flex-col rounded-sm bg-white p-2 dark:bg-gray-900">
              <div className="mb-2 border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-500 dark:bg-gray-800">
                <TypingInterface
                  currentWord={getCurrentContent()[currentWordIndex]}
                  isCorrect={isCorrect}
                  input={input}
                  handleInputChange={handleInputChange}
                  practiceType={practiceType}
                  typedWords={typedWords}
                  resetCounter={resetCounter}
                />
              </div>

              <div className="mb-2 border border-gray-300 p-2 dark:border-gray-600">
                <StatsDisplay
                  wpm={wpm}
                  time={time}
                  score={score}
                  currentLesson={currentLesson}
                />
              </div>

              <div className="mt-2 block md:hidden">
                <select
                  title="mobile_lesson"
                  value={currentLesson}
                  onChange={(e) =>
                    setCurrentLesson(e.target.value as AllLessonOptions)
                  }
                  className="w-full border border-gray-300 bg-white p-2 text-gray-900 transition-all duration-200 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {currentLanguage === "English" &&
                    Object.keys(EnglishLessonOptions).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  }
                  {currentLanguage === "Bangla" &&
                    Object.keys(BanglaLessonOptions).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  }
                  {currentLanguage === "Hindi" &&
                    Object.keys(HindiLessonOptions).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  }
                  {currentLanguage === "Urdu" &&
                    Object.keys(UrduLessonOptions).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  }
                  {currentLanguage !== "English" &&
                   currentLanguage !== "Bangla" &&
                   currentLanguage !== "Hindi" &&
                   currentLanguage !== "Urdu" &&
                    <option value="default">
                      All {currentLanguage} Letters
                    </option>
                  }
                </select>
              </div>

              <div className="mb-2 mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={resetGame}
                  className="flex items-center justify-center border border-gray-300 px-2 py-2 text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-500 hover:text-gray-900 hover:shadow-sm dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:text-white"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </button>
                <Link
                  href="/"
                  className="flex items-center justify-center border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-500 hover:text-gray-900 hover:shadow-sm dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-400 dark:hover:text-white"
                >
                  <Undo2 className="mr-2 h-4 w-4" /> Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
