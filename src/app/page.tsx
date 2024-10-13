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
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaRedditAlien,
  FaShareAlt,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa";

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
        prev.currentWordIndex
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
      (word, i) => word === randomWords[i]
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
    { href: "/learn", text: "Learn to Type", external: false },
    { href: "/about", text: "About Us", external: false },
    { href: "/blog", text: "Blog", external: false },
    { href: "/privacy", text: "Privacy Policy", external: false },
    { href: "/terms", text: "Terms and Conditions", external: false },
    { href: "/contact", text: "Contact Us", external: false },
  ];

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
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

      <main className="w-full max-w-3xl px-4 mt-4">
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
          className={`mt-10 p-6 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Share This Tool
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            If you really like this website, help us to improve by sharing with
            your friends and family!
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {[
              {
                icon: FaTwitter,
                bg: "bg-blue-500",
                hover: "hover:bg-blue-700",
                link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  "https://fingertyping.com"
                )}&text=${encodeURIComponent(
                  "Secure and ads-free typing practice with FingerTyping.com! 🚀⌨️"
                )}`,
              },
              {
                icon: FaFacebookF,
                bg: "bg-blue-600",
                hover: "hover:bg-blue-700",
                link: `https://www.facebook.com/sharer/sharer.php?u=https://fingertyping.com`,
              },
              {
                icon: FaLinkedinIn,
                bg: "bg-blue-600",
                hover: "hover:bg-blue-800",
                link: `https://www.linkedin.com/shareArticle?mini=true&url=https://fingertyping.com&title=FingerTyping.com`,
              },
              {
                icon: FaTelegramPlane,
                bg: "bg-blue-500",
                hover: "hover:bg-blue-600",
                link: `https://telegram.me/share/url?url=https://fingertyping.com`,
              },
              {
                icon: FaRedditAlien,
                bg: "bg-orange-600",
                hover: "hover:bg-orange-700",
                link: `https://www.reddit.com/submit?url=https://fingertyping.com`,
              },
              {
                icon: FaWhatsapp,
                bg: "bg-green-500",
                hover: "hover:bg-green-600",
                link: `https://api.whatsapp.com/send?text=https://fingertyping.com`,
              },
              {
                icon: FaFacebookMessenger,
                bg: "bg-blue-500",
                hover: "hover:bg-blue-600",
                link: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
                  "https://fingertyping.com"
                )}&app_id=291494419107518&redirect_uri=${encodeURIComponent(
                  "https://fingertyping.com"
                )}`,
              },
            ].map((item, index) => (
              <a
                title="social media share"
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition duration-300 ${item.bg} ${item.hover} text-white`}
              >
                <item.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <button
            onClick={copyToClipboard}
            className={`w-full py-2 px-2 font-md text-md rounded-lg transition duration-200 flex items-center justify-center ${
              darkMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            <FaShareAlt className="mr-2" />
            Copy URL to Clipboard
          </button>
        </section>

        {/* Updated Backlink Strategies Section */}
        <footer
          className={`mt-12 rounded-lg shadow-lg ${
            darkMode
              ? "bg-gray-800"
              : "bg-gradient-to-r from-blue-50 to-indigo-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start">
                  <Fingerprint
                    className={`w-8 h-8 mr-2 ${
                      darkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  />
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${
                      darkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    FingerTyping
                  </h2>
                </div>
                <p
                  className={`mt-2 text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Secure, Simple and Ads-Free
                </p>
              </div>
              <nav className="flex flex-wrap justify-center md:justify-end gap-6 mb-6 md:mb-0">
                {links.map((link) => (
                  <React.Fragment key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm sm:text-base font-medium transition-colors duration-300 
                ${
                  darkMode
                    ? "text-indigo-300 hover:text-indigo-100"
                    : "text-indigo-700 hover:text-indigo-900"
                } hover:underline`}
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span
                          className={`text-sm sm:text-base font-medium transition-colors duration-300 cursor-pointer 
                  ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-200"
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