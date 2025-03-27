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
  isPastWord: boolean;
  darkMode: boolean;
}

// Constants
export const WORDS_PER_LINE_SMALL = 15;
export const WORDS_PER_LINE_LARGE = 25;
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
    
    // Show 3 lines before current line and 2 lines after
    const linesToShowBefore = 3;
    const linesToShowAfter = 2;
    
    // Calculate start and end indices
    const startLine = Math.max(0, currentLine - linesToShowBefore);
    const startIndex = startLine * wordsPerLine;
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
      const scrollHeight = container.scrollHeight;
      container.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
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

    return (
      <React.Fragment key={wordIndex}>
        <span
          className={`relative inline-flex items-center mx-0.5 ${
            isCurrentWord ? "rounded bg-blue-800/20 px-1 py-[1px] current-word" : "px-0.5"
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

  return (
    <div
      className={`max-w-5xl mx-auto h-[30vh] sm:h-[60vh] rounded-xl p-0.5 mb-0.5 font-medium shadow-lg transition-all duration-300 ease-in-out overflow-y-auto sm:p-2 ${
        darkMode
          ? "bg-gray-800/50 text-gray-200 shadow-gray-900/20"
          : "border border-gray-200 bg-white text-gray-800 shadow-gray-200/50"
      }`}
    >
      <div
        className="h-full overflow-y-auto break-words text-2xl leading-[1.6] tracking-normal sm:text-3xl md:text-[2.5rem] md:leading-[1.4] p-1 word-display-container"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: darkMode ? '#9ca3af #4b5563' : '#d1d5db #f3f4f6'
        }}
      >
        {isBlankPage ? (
          <div className="h-full p-1 flex flex-col">
            <div className="text-left word-display-container">
              {randomText.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    {word}
                  </span>
                  {" "}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          displayedWords.map((word, index) => renderWord(word, index, startIndex))
        )}
        <style jsx>{`
          .word-display-container::-webkit-scrollbar {
            width: 4px;
          }
          .word-display-container::-webkit-scrollbar-track {
            background: ${darkMode ? '#4b5563' : '#f3f4f6'};
            border-radius: 10px;
          }
          .word-display-container::-webkit-scrollbar-thumb {
            background-color: ${darkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(209, 213, 219, 0.5)'};
            border-radius: 10px;
            border: 1px solid ${darkMode ? '#4b5563' : '#f3f4f6'};
            backdrop-filter: blur(5px);
          }
        `}</style>
      </div>
    </div>
  );
};

export default WordDisplay;
