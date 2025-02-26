import React, { useEffect, useState, useMemo, memo } from "react";

// Types
interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

interface CharacterProps {
  charCluster: string;
  inputCluster?: string;
  isCurrentChar: boolean;
  isPastWord: boolean;
  darkMode: boolean;
}

// Constants
export const WORDS_PER_LINE_SMALL = 20;
export const WORDS_PER_LINE_LARGE = 34;
export const LINES_TO_SHOW = 1;

// Utility functions
const getGraphemeClusters = (text: string): string[] => {
  try {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  } catch (error) {
    console.error("Error segmenting text:", error);
    return text.split("");
  }
};

// Memoized components
const Character = memo(({ charCluster, inputCluster, isCurrentChar, isPastWord, darkMode }: CharacterProps) => {
  const getCharacterClass = () => {
    if (!inputCluster && !isPastWord) return darkMode ? "text-gray-300" : "text-gray-700";
    if (!inputCluster && isPastWord) return darkMode ? "text-red-500" : "text-red-600";
    return charCluster === inputCluster
      ? "text-green-500"
      : "text-red-500";
  };

  return (
    <span className="relative inline-block">
      <span className={`${getCharacterClass()} transition-colors duration-150 ease-in-out`}>
        {charCluster}
      </span>
      {isCurrentChar && (
        <span
          className={`absolute bottom-[-2px] left-0 h-[3px] w-full rounded-full ${
            darkMode ? "bg-white" : "bg-gray-900"
          } animate-cursor`}
        />
      )}
    </span>
  );
});

Character.displayName = "Character";

// Main component
const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  const [wordsPerLine, setWordsPerLine] = useState(WORDS_PER_LINE_LARGE);

  useEffect(() => {
    const handleResize = () => {
      setWordsPerLine(window.innerWidth < 768 ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedWords = useMemo(() => {
    const textWords = randomText.split(" ");
    const startIndex = Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;
    const endIndex = startIndex + wordsPerLine * LINES_TO_SHOW;
    return textWords.slice(startIndex, endIndex);
  }, [randomText, currentWordIndex, wordsPerLine]);

  const inputWords = useMemo(
    () => inputValue.split(" "),
    [inputValue]
  );

  const renderWord = (word: string, wordIndex: number, startIndex: number) => {
    const wordPos = startIndex + wordIndex;
    const isCurrentWord = wordPos === currentWordIndex;
    const inputWord = inputWords[wordPos] || "";

    const wordClusters = getGraphemeClusters(word);
    const inputClusters = getGraphemeClusters(inputWord);

    return (
      <React.Fragment key={wordIndex}>
        <span
          className={`relative whitespace-nowrap ${
            isCurrentWord ? "rounded-md bg-blue-800/20 px-2 py-0.5" : ""
          }`}
        >
          {wordClusters.map((charCluster, charIndex) => (
            <Character
              key={charIndex}
              charCluster={charCluster}
              inputCluster={inputClusters[charIndex]}
              isCurrentChar={
                isCurrentWord &&
                (inputClusters.length === charIndex ||
                  (inputClusters.length < wordClusters.length &&
                    inputClusters.length === charIndex))
              }
              isPastWord={wordPos < currentWordIndex}
              darkMode={darkMode}
            />
          ))}
          {inputClusters.length > wordClusters.length && isCurrentWord && (
            <span className="relative">
              <span className="text-red-500">
                {inputWord.slice(word.length)}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full rounded-full ${
                  darkMode ? "bg-white" : "bg-gray-900"
                } animate-cursor`}
              />
            </span>
          )}
        </span>
        {wordIndex < displayedWords.length - 1 && " "}
      </React.Fragment>
    );
  };

  const startIndex = Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;

  return (
    <div
      className={`w-full rounded-xl p-3 mb-0.5 font-medium shadow-lg transition-all duration-300 ease-in-out sm:p-6 ${
        darkMode
          ? "bg-gray-800/50 text-gray-200 shadow-gray-900/20"
          : "border border-gray-200 bg-white text-gray-800 shadow-gray-200/50"
      }`}
    >
      <div className="overflow-hidden break-normal text-[1.5rem] leading-relaxed tracking-wide sm:text-xl md:text-[2.1rem] md:leading-[2.8rem]">
        {displayedWords.map((word, index) => renderWord(word, index, startIndex))}
      </div>
    </div>
  );
};

export default WordDisplay;