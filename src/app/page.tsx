"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import Link from "next/link";
import { wordLists, generateRandomWords } from "../utils/wordLists";
import Navbar from "../components/Navbar";
import WordDisplay from "../components/WordDisplay";
import InputField from "../components/InputField";
import GameControls from "../components/GameControls";
import dynamic from "next/dynamic";
import { Fingerprint } from "lucide-react";
import { disableInspection } from "../utils/disableInspection";

const Results = dynamic(() => import("../components/Results"), {
  ssr: false,
});

import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaRedditAlien,
  FaShareNodes ,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa6";

const TypingPractice: React.FC = () => {
  // State to manage the game's various properties
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

  // State for dark mode and custom time settings
  const [darkMode, setDarkMode] = useState(true);
  const [customTime, setCustomTime] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to initialize or reset the game
  const initializeGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      randomText: prev.isCustomText
        ? prev.randomText
        : generateRandomWords(
            10000,
            wordLists[prev.language] || wordLists["English"],
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

  // Effect to initialize game when language changes
  useEffect(() => {
    initializeGame();
  }, [gameState.language, initializeGame]);

  // Handler for custom text submission
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

  // Handler for custom time submission
  const handleCustomTimeSubmit = (newTime: number) => {
    setCustomTime(newTime);
    setGameState((prev) => ({
      ...prev,
      timeRemaining: newTime,
    }));
  };

  // Handler for input changes during typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameState((prev) => ({
      ...prev,
      inputValue: value,
      hasStarted: true,
      startTime: prev.startTime || Date.now(),
      currentWordIndex: Math.max(
        value.split(" ").length - 1,
        prev.currentWordIndex,
      ),
      isComplete: value === prev.randomText,
    }));
  };

  // Effect to manage game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      gameState.hasStarted &&
      !gameState.isComplete &&
      gameState.timeRemaining > 0
    ) {
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

  // Effect to disable inspection (for security purposes)
  useEffect(() => {
    disableInspection();
  }, []);

  // Function to calculate Words Per Minute (WPM)
  const calculateWPM = (): string => {
    const inputWords = gameState.inputValue.trim().split(/\s+/); // User's typed words
    const referenceWords = gameState.randomText.trim().split(/\s+/); // Words from the original text

    // Calculate the number of correctly typed words up to the length of user's input
    let correctWords = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === referenceWords[i]) {
        correctWords++;
      }
    }

    // If time elapsed is zero, return "0.00" to prevent division by zero
    if (gameState.timeElapsed === 0) return "0.00";

    // Calculate WPM based on correct words only: (correctWords / timeElapsed in seconds) * 60
    const wpm = correctWords / (gameState.timeElapsed / 60); // Convert timeElapsed to minutes

    // Convert the result to a string with 2 decimal places using toFixed
    return wpm.toFixed(2);
  };

  // Function to calculate typing accuracy
  const calculateAccuracy = (): string => {
    const inputWords = gameState.inputValue.trim().split(/\s+/).filter(Boolean);
    const randomWords = gameState.randomText
      .trim()
      .split(/\s+/)
      .slice(0, inputWords.length);
    if (inputWords.length === 0) return "0.00";
    const correctWords = inputWords.filter(
      (word, i) => word === randomWords[i],
    ).length;
    return ((correctWords / inputWords.length) * 100).toFixed(2);
  };

  // Function to count correct and wrong words
  const correctAndWrongWords = () => {
    // Split input and reference words while trimming and filtering out extra spaces
    const inputWords = gameState.inputValue.trim().split(/\s+/).filter(Boolean);
    const referenceWords = gameState.randomText.trim().split(/\s+/);
    // Initialize counters for correct and wrong words
    let correctWords = 0;
    let wrongWords = 0;
    // Iterate over the input words and compare with the reference words
    inputWords.forEach((word, index) => {
      // Check if the word matches the corresponding reference word
      if (word === referenceWords[index]) {
        correctWords++;
      } else {
        wrongWords++;
      }
    });
    // If the user has typed more words than the reference text, consider the extra as wrong
    if (inputWords.length > referenceWords.length) {
      wrongWords += inputWords.length - referenceWords.length;
    }
    return { correctWords, wrongWords };
  };

  // Function to count correct and wrong keystrokes
  const keystrokes = () => {
    const inputWords = gameState.inputValue.trim().split(" ");
    const referenceWords = gameState.randomText.trim().split(" ");

    let correctKeystrokes = 0;
    let wrongKeystrokes = 0;

    for (let i = 0; i < inputWords.length; i++) {
      const inputWord = inputWords[i];
      const referenceWord = referenceWords[i] || "";

      // Check all words except the last one
      if (i < inputWords.length - 1) {
        if (inputWord !== "") {
          for (let j = 0; j < inputWord.length; j++) {
            if (j < referenceWord.length) {
              if (inputWord[j] === referenceWord[j]) {
                correctKeystrokes++;
              } else {
                wrongKeystrokes++;
              }
            } else {
              wrongKeystrokes++;
            }
          }
          if (inputWord.length < referenceWord.length) {
            wrongKeystrokes += referenceWord.length - inputWord.length;
          }
        }
      } else {
        // For the last word, only count typed characters
        if (inputWord !== "") {
          for (let j = 0; j < inputWord.length; j++) {
            if (j < referenceWord.length) {
              if (inputWord[j] === referenceWord[j]) {
                correctKeystrokes++;
              } else {
                wrongKeystrokes++;
              }
            } else {
              wrongKeystrokes++;
            }
          }
        }
      }
    }

    const backspaceCount =
      gameState.inputValue.length - inputWords.join("").length;
    correctKeystrokes += backspaceCount;

    return { correctKeystrokes, wrongKeystrokes };
  };

  // Function to copy website URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("https://fingertyping.com");
      alert("Website URL copied to clipboard!");
    } catch (err) {
      alert("Failed to copy: " + err);
    }
  };

  // Array of links for the footer
  const links = [
    { href: "/lesson", text: "Learn to Type", external: false },
    { href: "/about", text: "About Us", external: false },
    { href: "/blog", text: "Blog", external: false },
    { href: "/privacy", text: "Privacy Policy", external: false },
    { href: "/terms", text: "Terms and Conditions", external: false },
    { href: "/contact", text: "Contact Us", external: false },
  ];

  return (
    <div
      className={`flex min-h-screen flex-col items-center ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900"
      }`}
    >
      {/* Navbar component */}
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

      <main className="mt-4 w-full max-w-4xl px-4 space-y-5">
        {/* WordDisplay component to show the text to type */}
        <WordDisplay
          randomText={gameState.randomText}
          inputValue={gameState.inputValue}
          currentWordIndex={gameState.currentWordIndex}
          darkMode={darkMode}
        />

        {/* InputField component for user typing */}
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

        {/* GameControls component for game control buttons */}
        <GameControls
          initializeGame={initializeGame}
          hasStarted={gameState.hasStarted}
          timeRemaining={gameState.timeRemaining}
          darkMode={darkMode}
        />

        {/* Results component to display typing results */}
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

        {/* Share This Tool Section */}
        <section
          className={`mt-10 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 ${
            darkMode 
              ? "bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 ring-1 ring-gray-700/50" 
              : "bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 ring-1 ring-gray-200/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2
                className={`text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-indigo-400 via-fuchsia-400 to-indigo-400" 
                    : "from-indigo-600 via-fuchsia-600 to-indigo-600"
                }`}
              >
                Share FingerTyping
              </h2>
              <p className={`mt-2 text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Help others improve their typing skills by sharing!
              </p>
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-md">
              {[
                {
                  icon: FaXTwitter,
                  label: "X",
                  bg: "from-gray-800 to-gray-700",
                  link: `https://twitter.com/intent/tweet?url=${encodeURIComponent("https://fingertyping.com")}&text=${encodeURIComponent("Improve your typing with FingerTyping.com! 🚀⌨️")}`,
                },
                {
                  icon: FaFacebookF,
                  label: "Facebook",
                  bg: "from-blue-500 to-blue-700",
                  link: `https://www.facebook.com/sharer/sharer.php?u=https://fingertyping.com`,
                },
                {
                  icon: FaLinkedinIn,
                  label: "LinkedIn",
                  bg: "from-blue-600 to-blue-800",
                  link: `https://www.linkedin.com/shareArticle?mini=true&url=https://fingertyping.com&title=FingerTyping.com`,
                },
                {
                  icon: FaTelegram,
                  label: "Telegram",
                  bg: "from-blue-400 to-blue-600",
                  link: `https://telegram.me/share/url?url=https://fingertyping.com`,
                },
                {
                  icon: FaRedditAlien,
                  label: "Reddit",
                  bg: "from-orange-500 to-orange-700",
                  link: `https://www.reddit.com/submit?url=https://fingertyping.com`,
                },
                {
                  icon: FaWhatsapp,
                  label: "WhatsApp",
                  bg: "from-green-400 to-green-600",
                  link: `https://api.whatsapp.com/send?text=https://fingertyping.com`,
                },
                {
                  icon: FaFacebookMessenger,
                  label: "Messenger",
                  bg: "from-blue-400 to-blue-600",
                  link: `https://www.facebook.com/dialog/send?link=${encodeURIComponent("https://fingertyping.com")}&app_id=291494419107518&redirect_uri=${encodeURIComponent("https://fingertyping.com")}`,
                },
                {
                  icon: FaShareNodes,
                  label: "Copy URL",
                  bg: "from-indigo-400 to-indigo-600",
                  onClick: copyToClipboard,
                },
              ].map((item, index) => (
                item.onClick ? (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`group flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.bg} text-white transition-all duration-300 hover:scale-105 hover:shadow-md`}
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4 mb-1 transition-transform group-hover:scale-130" />
                    <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
                  </button>
                ) : (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.bg} text-white transition-all duration-300 hover:scale-105 hover:shadow-md`}
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4 mb-1 transition-transform group-hover:scale-110" />
                    <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
                  </a>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Updated footer Strategies Section */}
        <footer
          className={`mt-16 rounded-2xl shadow-xl transition-all duration-300 ${
            darkMode
              ? "bg-gray-800/80 backdrop-blur-sm ring-1 ring-gray-700"
              : "bg-gradient-to-r from-indigo-50 to-blue-50 ring-1 ring-gray-200"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start">
                  <Fingerprint
                    className={`mr-3 h-8 w-8 transition-colors duration-300 ${
                      darkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  />
                  <h2
                    className={`text-3xl font-bold tracking-tight ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    FingerTyping
                  </h2>
                </div>
                <p
                  className={`mt-2 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Secure, Simple and Ads-Free
                </p>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 md:justify-end">
                {links.map((link) => (
                  <React.Fragment key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                          darkMode
                            ? "text-indigo-300 hover:text-indigo-200"
                            : "text-indigo-700 hover:text-indigo-900"
                        } hover:underline`}
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span
                          className={`cursor-pointer text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                            darkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-800"
                          } hover:underline`}
                        >
                          {link.text}
                        </span>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default TypingPractice;
