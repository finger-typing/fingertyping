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
export const WORDS_PER_LINE_LARGE = 40;
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
    if (!inputCluster && isPastWord) return darkMode ? "text-red-600" : "text-red-600";
    return charCluster === inputCluster
      ? "text-green-500"
      : "text-red-600";
  };

  return (
    <span className="relative">
      <span className={`${getCharacterClass()} transition-colors duration-150`}>
        {charCluster}
      </span>
      {isCurrentChar && (
        <span
          className={`absolute bottom-[-2px] left-0 h-[3.5px] w-full rounded-full ${
            darkMode ? "bg-white" : "bg-black"
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

  const inputWords = useMemo(() => 
    inputValue.split(" "),
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
            isCurrentWord ? "rounded-md bg-blue-800/30 p-[0.2rem]" : ""
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
              <span className="text-red-600">
                {inputWord.slice(word.length)}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-[3.3px] w-full rounded-full ${
                  darkMode ? "bg-white" : "bg-black"
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
      className={`mb-2 w-full rounded-lg p-2 font-medium shadow-lg transition-colors duration-300 sm:p-6 ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "border-2 border-gray-300 bg-white text-gray-800"
      }`}
    >
      <style jsx global>{`
        @keyframes cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor {
          animation: cursor 1s ease-in-out infinite;
        }
      `}</style>
      <div className="overflow-hidden break-normal text-[1.5rem] leading-10 tracking-wide sm:text-xl md:text-[2.1rem] md:leading-[3.2rem]">
        {displayedWords.map((word, index) => renderWord(word, index, startIndex))}
      </div>
    </div>
  );
};

export default WordDisplay;