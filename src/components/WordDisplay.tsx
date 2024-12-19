import React, { useEffect, useState } from "react";

interface WordDisplayProps {
  randomText: string;
  inputValue: string;
  currentWordIndex: number;
  darkMode: boolean;
}

export const WORDS_PER_LINE_SMALL = 25;
export const WORDS_PER_LINE_LARGE = 50;
const LINES_TO_SHOW = 1;

// Define type for words per line
type WordsPerLine = typeof WORDS_PER_LINE_SMALL | typeof WORDS_PER_LINE_LARGE;

const WordDisplay: React.FC<WordDisplayProps> = ({
  randomText,
  inputValue,
  currentWordIndex,
  darkMode,
}) => {
  const [wordsPerLine, setWordsPerLine] = useState<WordsPerLine>(WORDS_PER_LINE_LARGE);

  // Handle responsive word count
  useEffect(() => {
    const handleResize = () => {
      setWordsPerLine(
        window.innerWidth < 768 ? WORDS_PER_LINE_SMALL : WORDS_PER_LINE_LARGE
      );
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
      const isPastWord = wordPos < currentWordIndex;

      // Split words into characters for comparison
      const wordChars = Array.from(word);
      const inputChars = Array.from(inputWord);

      return (
        <React.Fragment key={wordIndex}>
          <span
            className={`relative ${
              isCurrentWord ? "rounded-md bg-blue-800 bg-opacity-40 p-[0.2rem]" : ""
            }`}
          >
            {wordChars.map((char, charIndex) => {
              // Determine character color based on typing status
              const charClass = 
                charIndex < inputChars.length
                  ? char === inputChars[charIndex]
                    ? "text-green-500"  // Correct character
                    : "text-red-600"    // Wrong character
                  : isPastWord
                  ? "text-red-600"      // Untyped character in past word
                  : darkMode
                  ? "text-gray-300"     // Untyped character in dark mode
                  : "text-gray-700";    // Untyped character in light mode

              // Add cursor to current character position
              const isCursor = isCurrentWord && charIndex === inputChars.length;
              const cursorClass = isCursor
                ? `before:animate-cursor-blink relative before:absolute before:bottom-[-2px] 
                   before:left-1/2 before:h-[3.3px] before:w-full before:-translate-x-1/2 
                   before:transform ${darkMode ? "before:bg-white" : "before:bg-black"} before:rounded-full
                   before:content-['']`
                : "";

              return (
                <span
                  key={charIndex}
                  className={`${charClass} ${cursorClass} transition-colors duration-150`}
                >
                  {char}
                </span>
              );
            })}
            {inputChars.length > wordChars.length && (
              <span className="text-red-600">
                {inputWord.slice(word.length)}
              </span>
            )}
          </span>
          {wordIndex < displayedWords.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className={`mb-2 w-full rounded-lg p-2 font-medium shadow-lg 
        transition-colors duration-300 sm:p-6 ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "border-2 border-gray-300 bg-white text-gray-800"
      }`}
    >
      <div className="text-[1.5rem] leading-10 tracking-wide sm:text-xl 
        md:text-[2.1rem] md:leading-[3.2rem]">
        {getHighlightedText(randomText, inputValue)}
      </div>
    </div>
  );
};

export default WordDisplay;
