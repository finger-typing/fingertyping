import React, { useEffect, useState } from "react";

// Section 1: Interface and Constants
interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

export const WORDS_PER_LINE_SMALL = 25;
export const WORDS_PER_LINE_LARGE = 40;
export const LINES_TO_SHOW = 1;

// Section 2: Utility Function
const getGraphemeClusters = (text: string) => {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return Array.from(segmenter.segment(text), (segment) => segment.segment);
};

// Section 3: Main Component
const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  // Section 4: State and Effect
  const [wordsPerLine, setWordsPerLine] = useState(WORDS_PER_LINE_LARGE);

  useEffect(() => {
    const handleResize = () => {
      setWordsPerLine(window.innerWidth < 768 ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderWord = (word: string, wordPos: number, inputWord: string) => {
    const wordClusters = getGraphemeClusters(word);
    const inputClusters = getGraphemeClusters(inputWord);
    const isCurrentWord = wordPos === currentWordIndex;
    const isPastWord = wordPos < currentWordIndex;

    return (
      <span
        className={`relative ${
          isCurrentWord ? "rounded-md bg-blue-800 bg-opacity-30 p-[0.5rem]" : ""
        }`}
      >
        {wordClusters.map((charCluster, charIndex) => {
          const charClass = 
            charIndex < inputClusters.length
              ? charCluster === inputClusters[charIndex]
                ? "text-green-500"
                : "text-red-600"
              : isPastWord
              ? "text-red-600"
              : darkMode
              ? "text-gray-300"
              : "text-gray-700";

          return (
            <span key={charIndex} className="relative">
              <span className={`${charClass} transition-colors duration-150`}>
                {charCluster}
              </span>
              {isCurrentWord && charIndex === inputClusters.length && (
                <span
                  className={`absolute bottom-[-2px] left-0 h-[3px] w-full animate-cursor-blink rounded-full ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                />
              )}
            </span>
          );
        })}
        {inputClusters.length > wordClusters.length && (
          <span className="text-red-600">
            {inputWord.slice(word.length)}
          </span>
        )}
      </span>
    );
  };

  const getDisplayedWords = () => {
    const textWords = randomText.split(" ");
    const inputWords = inputValue.split(" ");
    const startIndex = Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;
    const endIndex = startIndex + wordsPerLine * LINES_TO_SHOW;
    
    return textWords.slice(startIndex, endIndex).map((word, index) => {
      const wordPos = startIndex + index;
      const inputWord = inputWords[wordPos] || "";
      
      return (
        <React.Fragment key={index}>
          {renderWord(word, wordPos, inputWord)}
          {index < textWords.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  // Section 6: Component Rendering
  return (
    <div
      className={`mb-2 w-full rounded-lg p-2 font-medium shadow-lg transition-colors duration-300 sm:p-6 ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "border-2 border-gray-300 bg-white text-gray-800"
      }`}
    >
      <div className="text-[1.5rem] leading-10 tracking-wide sm:text-xl md:text-[2.1rem] md:leading-[3.2rem]">
        {getDisplayedWords()}
      </div>
    </div>
  );
};

export default WordDisplay;
