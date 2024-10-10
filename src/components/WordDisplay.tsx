import React, { useEffect, useState } from "react";

// Section 1: Interface and Constants
// Define the interface for the component props
interface WordDisplayProps {
  randomText: string;    // The text to be displayed and typed
  inputValue: string;    // The current input from the user
  currentWordIndex: number;  // The index of the current word being typed
  darkMode: boolean;     // Whether dark mode is enabled
}

// Constants for word display configuration
export const WORDS_PER_LINE_SMALL = 25; // For small screens
export const WORDS_PER_LINE_LARGE = 60; // For medium and large screens
export const LINES_TO_SHOW = 1;         // Number of lines to display at once

// Section 2: Utility Function
// Utility function to split text into grapheme clusters (for handling complex Unicode characters)
const getGraphemeClusters = (text: string) => {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  return Array.from(segmenter.segment(text), segment => segment.segment);
};

// Section 3: Main Component
// Main WordDisplay component
const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  // Section 4: State and Effect
  // State to store the number of words per line
  const [wordsPerLine, setWordsPerLine] = useState(WORDS_PER_LINE_LARGE);

  // Effect to handle screen size changes and adjust words per line
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setWordsPerLine(isSmallScreen ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section 5: Text Highlighting Function
  // Function to highlight and display the text
  const getHighlightedText = (text: string, input: string) => {
    const textWords = text.split(" ");
    const inputWords = input.split(" ");
    // Calculate the range of words to display
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
              isCurrentWord ? "bg-opacity-30 bg-blue-500 p-1 rounded-md" : ""
            }`}
          >
            {wordClusters.map((charCluster, charIndex) => {
              // Determine the color class for each character cluster
              let charClass = darkMode ? "text-gray-300" : "text-gray-700";

              if (charIndex < inputClusters.length) {
                // Compare the full grapheme clusters (not just individual characters)
                charClass =
                  charCluster === inputClusters[charIndex]
                    ? darkMode
                      ? "text-green-500"
                      : "text-green-500" // Correct cluster
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

  // Section 6: Component Rendering
  // Render the component
  return (
    <div
      className={`w-full shadow-lg rounded-lg p-2 sm:p-6 mb-4 font-medium transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white border-2 border-gray-300 text-gray-800"
      }`}
    >
      <div className="text-xl sm:text-2xl md:text-[1.9rem] md:leading-10  leading-relaxed tracking-wide">
        {getHighlightedText(randomText, inputValue)}
      </div>
    </div>
  );
};

export default WordDisplay;
