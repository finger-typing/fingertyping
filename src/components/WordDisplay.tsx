import React, { useEffect, useState, useMemo, memo } from "react";

// Types
interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
  isBlankPage?: boolean;
  onNeedMore?: () => void;
}

interface CharacterProps {
  charCluster: string;
  inputCluster?: string;
  isCurrentChar: boolean;
  darkMode: boolean;
}

// Constants
export const WORDS_PER_LINE_SMALL = 15;
export const WORDS_PER_LINE_LARGE = 35;
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
const Character = memo(({ charCluster, inputCluster, isCurrentChar, darkMode }: CharacterProps) => {
  const getCharacterClass = () => {
    if (!inputCluster) return darkMode ? "text-gray-300" : "text-gray-700";
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
          className={`absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full ${
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
  isBlankPage,
  onNeedMore
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

  const { displayedWords, startIndex, needsMoreWords } = useMemo(() => {
    const textWords = randomText.split(" ");

    // Calculate visible lines based on current word
    const currentLine = Math.floor(currentWordIndex / wordsPerLine);

    // Always show from beginning to current line plus a few lines after
    // This ensures all typed words remain visible
    const startIndex = 0;
    const linesToShowAfter = 3; // Show a few lines after current position
    const endLine = currentLine + linesToShowAfter;
    const endIndex = Math.min((endLine + 1) * wordsPerLine, textWords.length);

    // Request more words when approaching the end
    const needsMoreWords = endIndex + wordsPerLine >= textWords.length;

    return {
      displayedWords: textWords.slice(startIndex, endIndex),
      startIndex,
      needsMoreWords
    };
  }, [randomText, currentWordIndex, wordsPerLine]);

  // Request more words when approaching the end
  useEffect(() => {
    if (needsMoreWords && onNeedMore) {
      onNeedMore();
    }
  }, [needsMoreWords, onNeedMore]);

  useEffect(() => {
    const container = document.querySelector('.word-display-container') as HTMLElement | null;
    if (!container) return;

    if (isBlankPage) {
      // In blank page mode, scroll to the bottom to show latest text
      const blankPageContent = document.querySelector('.blank-page-content') as HTMLElement | null;
      if (blankPageContent) {
        const scrollHeight = blankPageContent.scrollHeight;
        blankPageContent.scrollTo({
          top: scrollHeight,
          behavior: 'smooth'
        });
      }
    } else {
      // In normal mode, keep current word in the middle
      const currentWord = document.querySelector('.current-word') as HTMLElement | null;
      if (currentWord) {
        const containerHeight = container.clientHeight;
        const currentWordTop = currentWord.offsetTop;
        const targetPosition = Math.max(0, currentWordTop - containerHeight / 2);
        container.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentWordIndex, isBlankPage, inputValue]);

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

    // Find the position of the cursor within the word
    // This helps us place the cursor at the exact character that needs correction
    // and properly handle backtracking to previous words
    const findCursorPosition = () => {
      return inputClusters.length;
    };

    const cursorPosition = isCurrentWord ? findCursorPosition() : -1;

    return (
      <React.Fragment key={wordIndex}>
        <span
          className={`relative inline-flex items-center mx-0.5 ${
            isCurrentWord ? "current-word relative" : "px-0.5"
          }`}
        >
          {wordClusters.map((charCluster, charIndex) => (
            <Character
              key={charIndex}
              charCluster={charCluster}
              inputCluster={inputClusters[charIndex]}
              isCurrentChar={isCurrentWord && charIndex === cursorPosition}
              darkMode={darkMode}
            />
          ))}
          {inputClusters.length > wordClusters.length && (
            <span className="relative">
              <span className="text-red-500">
                {inputWord.slice(word.length)}
              </span>
              {isCurrentWord && cursorPosition >= wordClusters.length && (
                <span
                  className={`absolute bottom-0 left-0 h-[1px] w-full rounded-full ${
                    darkMode ? "bg-white" : "bg-gray-900"
                  } animate-cursor`}
                />
              )}
            </span>
          )}
        </span>
        {wordIndex < displayedWords.length - 1 && (
          <span className="relative">
            {" "}
            {isCurrentWord && cursorPosition === wordClusters.length && (
              <span
                className={`absolute bottom-[-3px] md-bottom-[-10px] left-0 h-[3px] w-full rounded-full ${
                  darkMode ? "bg-white" : "bg-gray-900"
                } animate-cursor`}
              />
            )}
          </span>
        )}
      </React.Fragment>
    );
  };

  return (
    <div
      className={`mx-auto h-[30vh] md:h-full overflow-y-auto rounded-md p-0.5 font-medium shadow-md sm:p-1 ${
        darkMode
          ? "bg-gray-800/50 text-gray-200 shadow-gray-900/20"
          : "border border-gray-200 bg-white text-gray-800 shadow-gray-200/50"
      }`}
    >
      <div
        className="leading-1 word-display-container h-full overflow-y-auto overflow-x-hidden break-words px-1 text-2xl tracking-normal sm:text-3xl md:text-[2.7rem] md:leading-[1.5]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: darkMode ? "#9ca3af #4b5563" : "#d1d5db #f3f4f6",
        }}
      >
        {isBlankPage ? (
          <div className="flex h-full w-full flex-col p-1">
            <div className="blank-page-content text-left  mx-auto overflow-y-auto overflow-x-hidden whitespace-normal break-words">
              {randomText.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    {word}
                  </span>{" "}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          displayedWords.map((word, index) =>
            renderWord(word, index, startIndex),
          )
        )}
        <style jsx>{`
          .word-display-container::-webkit-scrollbar,
          .blank-page-content::-webkit-scrollbar {
            width: 4px;
          }
          .word-display-container::-webkit-scrollbar-track,
          .blank-page-content::-webkit-scrollbar-track {
            background: ${darkMode ? "#4b5563" : "#f3f4f6"};
            border-radius: 10px;
          }
          .word-display-container::-webkit-scrollbar-thumb,
          .blank-page-content::-webkit-scrollbar-thumb {
            background-color: ${darkMode
              ? "rgba(156, 163, 175, 0.5)"
              : "rgba(209, 213, 219, 0.5)"};
            border-radius: 10px;
            border: 1px solid ${darkMode ? "#4b5563" : "#f3f4f6"};
            backdrop-filter: blur(5px);
          }
          .current-word::after {
            content: '';
            position: absolute;
            left: -1px;
            right: -1px;
            top: 50%;
            transform: translateY(-50%);
            height: 60%;
            background-color: ${darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.15)"};
            border-radius: 2px;
            z-index: -1;
          }

          .blank-page-content {
            width: 100%;
            max-width: 80rem; /* This is equivalent to max-w-7xl in Tailwind */
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WordDisplay;
