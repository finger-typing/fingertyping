import React, { useEffect, useState } from "react";

// Define the interface
interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

export const WORDS_PER_LINE_SMALL = 25; // For small screens
export const WORDS_PER_LINE_LARGE = 60; // For medium and large screens
export const LINES_TO_SHOW = 1;

// Utility function to split text into grapheme clusters
const getGraphemeClusters = (text: string) => {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  return Array.from(segmenter.segment(text), segment => segment.segment);
};

const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  const [wordsPerLine, setWordsPerLine] = useState(WORDS_PER_LINE_LARGE);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setWordsPerLine(isSmallScreen ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getHighlightedText = (text: string, input: string) => {
    const textWords = text.split(" ");
    const inputWords = input.split(" ");
    const startIndex = Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;
    const endIndex = startIndex + wordsPerLine * LINES_TO_SHOW;
    const displayedWords = textWords.slice(startIndex, endIndex);

    return displayedWords.map((word, wordIndex) => {
      const wordPos = startIndex + wordIndex;
      const isCurrentWord = wordPos === currentWordIndex;
      const inputWord = inputWords[wordPos] || "";

      // Split the word and inputWord into grapheme clusters
      const wordClusters = getGraphemeClusters(word);
      const inputClusters = getGraphemeClusters(inputWord);

      return (
        <React.Fragment key={wordIndex}>
          <span
            className={`relative ${
              isCurrentWord ? "bg-opacity-25 bg-blue-500 rounded" : ""
            }`}
          >
            {wordClusters.map((charCluster, charIndex) => {
              let charClass = darkMode ? "text-gray-300" : "text-gray-700";

              if (charIndex < inputClusters.length) {
                // Compare the full grapheme clusters (not just individual characters)
                charClass =
                  charCluster === inputClusters[charIndex]
                    ? darkMode
                      ? "text-green-600"
                      : "text-green-600" // Correct cluster
                    : darkMode
                    ? "text-red-600"
                    : "text-red-600"; // Incorrect cluster
              }

              return (
                <span
                  key={charIndex}
                  className={`${charClass} transition-colors duration-150`}
                >
                  {charCluster}
                </span>
              );
            })}
          </span>
          {wordIndex < displayedWords.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={`w-full shadow-lg rounded-lg p-2 sm:p-6 mb-4 font-medium transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white border-2 border-gray-300 text-gray-800"
      }`}
    >
      <div className="text-xl sm:text-2xl md:text-[1.8rem] md:leading-10  leading-relaxed tracking-wide">
        {getHighlightedText(randomText, inputValue)}
      </div>
    </div>
  );
};

export default WordDisplay;
