"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  RotateCcw,
  Clock,
  Trophy,
  Settings,
} from "lucide-react";

const languageLetters = {
  English: "abcdefghijklmnopqrstuvwxyz".split(""),
};

type Language = keyof typeof languageLetters;

const TypingPractice = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
    }
    return () => clearInterval(timerRef.current!);
  }, [isGameActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(
    () => setWpm(time > 0 ? Math.round((score / time) * 60) : 0),
    [score, time]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const currentWord =
      languageLetters[currentLanguage][currentWordIndex].toLowerCase();

    if (!isGameActive) setIsGameActive(true);

    if (value.endsWith(currentWord)) {
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % languageLetters[currentLanguage].length
      );
      setInput(value + " ");
      setIsCorrect(true);
    } else {
      setIsCorrect(value === currentWord.slice(0, value.length));
      setInput(value);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setInput("");
    setScore(0);
    setTime(0);
    setIsGameActive(false);
    setWpm(0);
    inputRef.current?.focus();
  };

  const filteredLanguages = Object.keys(languageLetters).filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">
          FingerTyping
        </h1>

        <div
          className={`text-center text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold mb-4 sm:mb-8 transition-all duration-300 ease-in-out ${
            isCorrect ? "text-green-600" : "text-red-600"
          } drop-shadow-2xl`}
        >
          {languageLetters[currentLanguage][currentWordIndex].toUpperCase()}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Start typing to begin"
          className={`w-full text-xl sm:text-2xl p-3 sm:p-4 rounded-lg bg-gray-700 text-center focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out ${
            isCorrect
              ? "focus:ring-green-500 border-green-400"
              : "focus:ring-red-400 border-red-400"
          }`}
        />
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="col-span-2 sm:col-span-1">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="w-full flex items-center justify-between space-x-1 p-2 sm:p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300"
              >
                <span className="font-semibold">{currentLanguage}</span>
                <ChevronDown size={20} />
              </button>
              {showLanguages && (
                <div className="absolute top-full left-0 mt-2 border rounded-lg shadow-lg z-10 bg-gray-700 w-full">
                  <div className="p-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search language"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-2 py-2 rounded-md bg-gray-600 text-gray-200 placeholder-gray-400"
                      />
                      <Search
                        size={16}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-20">
                    {filteredLanguages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setCurrentLanguage(lang as Language);
                          setShowLanguages(false);
                          resetGame();
                          setSearchTerm("");
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-600 hover:rounded-lg transition-all duration-300"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <StatCard
            icon={<Clock size={24} />}
            label="Time"
            value={formatTime(time)}
          />
          <StatCard
            icon={<Trophy size={24} />}
            label="Score"
            value={score.toString()}
          />
          <StatCard
            icon={<Settings size={24} />}
            label="LPM"
            value={wpm.toString()}
          />
        </div>

        <div className="mt-6 sm:mt-8 flex justify-between items-center">
          <button
            onClick={resetGame}
            className="text-yellow-400 hover:text-yellow-300 inline-flex items-center font-semibold text-lg sm:text-xl transition-colors duration-300"
          >
            <RotateCcw size={20} className="mr-2" />
            Reset
          </button>
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 inline-block font-semibold text-lg sm:text-xl transition-colors duration-300"
          >
            ← Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-gray-700 rounded-lg p-2 sm:p-2 text-center">
    <div className="flex justify-center mb-1 sm:mb-1">{icon}</div>
    <div className="text-sm sm:text-md  font-semibold text-gray-400">
      {label}
    </div>
    <div className="text-lg sm:text-2xl font-bold">{value}</div>
  </div>
);

export default TypingPractice;
