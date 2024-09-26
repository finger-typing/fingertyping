import React from "react";
import { WORDS_PER_LINE, LINES_TO_SHOW } from "../utils/wordLists";

interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  const getHighlightedText = (text: string, input: string) => {
    const textWords = text.split(" ");
    const inputWords = input.split(" ");
    const startIndex =
      Math.floor(currentWordIndex / WORDS_PER_LINE) * WORDS_PER_LINE;
    const endIndex = startIndex + WORDS_PER_LINE * LINES_TO_SHOW;
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
      className={`w-full shadow-lg rounded-lg p-4 mb-2 font-medium ${
        darkMode ? "bg-gray-800" : "bg-white border-2 border-gray-300"
      }`}
    >
      <div className="text-2xl leading-relaxed whitespace-pre-wrap">
        {getHighlightedText(randomText, inputValue)}
      </div>
    </div>
  );
};

export default WordDisplay;