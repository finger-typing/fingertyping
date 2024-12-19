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
      const isSmallScreen = window.innerWidth < 768;
      setWordsPerLine(
        isSmallScreen ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE,
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section 5: Text Highlighting Function
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
      const inputWord = inputWords[wordPos] || "";

      const wordClusters = getGraphemeClusters(word);
      const inputClusters = getGraphemeClusters(inputWord);

      const isPastWord = wordPos < currentWordIndex;

      return (
        <React.Fragment key={wordIndex}>
          <span
            className={`relative whitespace-nowrap ${
              isCurrentWord
                ? "rounded-md bg-blue-800 bg-opacity-30 p-[0.2rem]"
                : ""
            }`}
          >
            {wordClusters.map((charCluster, charIndex) => {
              let charClass = darkMode ? "text-gray-300" : "text-gray-700";
              const isCurrentChar =
                isCurrentWord &&
                (inputClusters.length === charIndex ||
                  (inputClusters.length < wordClusters.length &&
                    inputClusters.length === charIndex));

              if (charIndex < inputClusters.length) {
                if (charCluster === inputClusters[charIndex]) {
                  charClass = darkMode ? "text-green-500" : "text-green-500";
                } else {
                  charClass = darkMode ? "text-red-600" : "text-red-600";
                }
              } else if (isPastWord) {
                charClass = darkMode ? "text-red-600" : "text-red-600";
              }

              return (
                <span key={charIndex} className="relative">
                  <span
                    className={`${charClass} transition-colors duration-150`}
                  >
                    {charCluster}
                  </span>
                  {isCurrentChar && (
                    <span
                      className={`cursor-blink absolute bottom-[-2px] left-0 h-[3.5px] w-full rounded-full ${
                        darkMode ? "bg-white" : "bg-black"
                      }`}
                    />
                  )}
                </span>
              );
            })}
            {inputClusters.length > wordClusters.length && isCurrentWord && (
              <span className="relative">
                <span className={darkMode ? "text-red-600" : "text-red-600"}>
                  {inputWord.slice(word.length)}
                </span>
                <span
                  className={`cursor-blink absolute bottom-0 left-0 h-[3.3px] w-full rounded-full ${
                    darkMode ? "bg-white" : "bg-black"
                  }`}
                />
              </span>
            )}
          </span>
          {wordIndex < displayedWords.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  // Section 6: Component Rendering
  return (
    <>
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .cursor-blink {
          animation: blink 1s ease-in-out infinite;
        }
      `}</style>
      <div
        className={`mb-2 w-full rounded-lg p-2 font-medium shadow-lg transition-colors duration-300 sm:p-6 ${
          darkMode
            ? "bg-gray-800 text-gray-200"
            : "border-2 border-gray-300 bg-white text-gray-800"
        }`}
      >
        <div className="overflow-hidden break-normal text-[1.5rem] leading-10 tracking-wide sm:text-xl md:text-[2.1rem] md:leading-[3.2rem]">
          {getHighlightedText(randomText, inputValue)}
        </div>
      </div>
    </>
  );
};

export default WordDisplay;
