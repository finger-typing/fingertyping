import React, { useRef, useEffect } from "react";

interface TypingInterfaceProps {
  currentWord: string;
  isCorrect: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typedWords: string[];
  practiceType?: 'words' | 'letters';
  resetCounter?: number;
}

export default function TypingInterface({
  currentWord,
  isCorrect,
  input,
  handleInputChange,
  practiceType = 'letters',
  resetCounter = 0
}: TypingInterfaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input field when component mounts or when input changes to empty
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [input]);

  // Separate useEffect specifically for handling reset button clicks
  useEffect(() => {
    if (resetCounter > 0 && inputRef.current) {
      // Small timeout to ensure focus happens after state updates
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [resetCounter]);

  return (
    <div className="py-4 md:py-6 text-center">
      <div
        className={`mb-4 md:mb-8 ${
          practiceType === 'words'
            ? 'text-3xl sm:text-4xl md:text-8xl'
            : 'text-6xl sm:text-7xl md:text-9xl lg:text-[10rem]'
        } font-bold ${
          isCorrect ? "text-green-500" : "text-red-500"
        } transition-colors duration-200`}
      >
        {currentWord}
      </div>
      <div className="relative mx-auto max-w-3xl">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full rounded-lg border-2 px-4 py-3 md:px-6 md:py-5 text-xl md:text-3xl shadow-md transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:shadow-lg border-gray-300 bg-white text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
          placeholder={practiceType === 'words' ? "Type the word..." : "Type here..."}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          aria-label="Typing input field"
        />
      </div>
    </div>
  );
}

