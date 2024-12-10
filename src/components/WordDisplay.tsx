import React, { useEffect, useState } from "react";

// Section 1: Interface and Constants
interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

export const WORDS_PER_LINE_SMALL = 25;
export const WORDS_PER_LINE_LARGE = 50;
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
        isSmallScreen ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE
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

      // Check if we've moved past this word
      const isPastWord = wordPos < currentWordIndex;

      return (
        <React.Fragment key={wordIndex}>
          <span
            className={`relative inline-block transition-all duration-300 ease-out ${
              isCurrentWord
                ? "rounded-md bg-gradient-to-r from-blue-400/20 via-indigo-400/30 to-blue-400/10 px-[1rem] py-[0.1rem] shadow-lg"
                : ""
            }`}
          >
            {wordClusters.map((charCluster, charIndex) => {
              let charClass = darkMode ? "text-gray-300" : "text-gray-700";

              if (charIndex < inputClusters.length) {
                if (charCluster === inputClusters[charIndex]) {
                  charClass = darkMode
                    ? "text-green-500 font-bold scale-110 origin-bottom transform transition-all duration-200 ease-out hover:scale-125"
                    : "text-emerald-500 font-bold scale-110 origin-bottom transform transition-all duration-200 ease-out hover:scale-125";
                } else {
                  charClass = darkMode
                    ? "text-red-500 font-bold -translate-y-px transform transition-all duration-200 ease-out"
                    : "text-red-600 font-bold -translate-y-px transform transition-all duration-200 ease-out";
                }
              } else if (isPastWord) {
                charClass = darkMode
                  ? "text-rose-400 font-bold transition-opacity duration-300"
                  : "text-rose-400 font-bold transition-opacity duration-300";
              }

              return (
                <span
                  key={charIndex}
                  className={`${charClass} inline-block`}
                >
                  {charCluster}
                </span>
              );
            })}
            {inputClusters.length > wordClusters.length && (
              <span
                className={`${
                  darkMode ? "text-rose-600" : "text-rose-600"
                } font-bold`}
              >
                {inputWord.slice(word.length)}
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
    <div
      className={`relative mb-1 w-full overflow-hidden rounded-xl p-5 font-medium shadow-xl backdrop-blur-sm transition-all duration-500 sm:p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 text-gray-200 ring-1 ring-gray-700"
          : "bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 text-gray-800 ring-1 ring-gray-200"
      }`}
    >
      <div className="text-[1.5rem] font-bold leading-2 tracking-wide sm:text-2xl md:text-[2rem] md:leading-[3rem]">
        {getHighlightedText(randomText, inputValue)}
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${
          darkMode
            ? "bg-gradient-to-r from-white via-violet-500 to-white"
            : "bg-gradient-to-r from-gray-900 via-blue-500 to-gray-900"
        } opacity-50 backdrop-blur-sm`}
      />
    </div>
  );
};

export default WordDisplay;
