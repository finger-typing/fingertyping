import React, { useEffect, useState } from "react";

interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

export const WORDS_PER_LINE_SMALL = 25; // For small screens
export const WORDS_PER_LINE_LARGE = 70; // For medium and large screens
export const LINES_TO_SHOW = 1;

const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  const [wordsPerLine, setWordsPerLine] = useState(WORDS_PER_LINE_LARGE);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768; // Adjust breakpoint as needed
      setWordsPerLine(
        isSmallScreen ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE
      );
    };

    // Set the initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getHighlightedText = (text: string, input: string) => {
    const textWords = text.split(" ");
    const inputWords = input.split(" ");
    const startIndex =
      Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;
    const endIndex = startIndex + wordsPerLine * LINES_TO_SHOW;
    const displayedWords = textWords.slice(startIndex, endIndex);

    return displayedWords.map((word, wordIndex) => {
      const wordPos = startIndex + wordIndex;
      const isCurrentWord = wordPos === currentWordIndex;
      let wordClass = darkMode ? "text-gray-400" : "text-gray-600";
      const bgClass = isCurrentWord
        ? darkMode
          ? "bg-gray-700"
          : "bg-gray-200"
        : "";

      if (wordPos < inputWords.length) {
        if (inputWords[wordPos] === word) {
          wordClass = darkMode ? "text-green-400" : "text-green-600"; // Correct word
        } else if (wordPos < currentWordIndex) {
          wordClass = darkMode ? "text-red-400" : "text-red-600"; // Incorrect word
        }
      }

      return (
        <React.Fragment key={wordIndex}>
          <span className={`${wordClass} ${bgClass}`}>{word}</span>
          {wordIndex < displayedWords.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={`w-full shadow-lg rounded-lg p-2 sm:p-3 mb-2 font-medium ${
        darkMode ? "bg-gray-800" : "bg-white border-2 border-gray-300"
      }`}
    >
      <div className="text-lg sm:text-lg md:text-2xl leading-relaxed whitespace-pre-wrap">
        {getHighlightedText(randomText, inputValue)}
      </div>
    </div>
  );
};

export default WordDisplay;
