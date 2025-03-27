import React, { useRef, useEffect } from "react";

interface TypingInterfaceProps {
  currentWord: string;
  isCorrect: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typedWords: string[];
  practiceType?: 'words' | 'letters';
}

export default function TypingInterface({
  currentWord,
  isCorrect,
  input,
  handleInputChange,
  practiceType = 'letters'
}: TypingInterfaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="py-6 text-center">
      <div
        className={`mb-8 ${
          practiceType === 'words' ? 'text-4xl md:text-8xl' : 'text-9xl md:text-[10rem]'
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
          className="w-full rounded-lg border-2 px-6 py-5 text-3xl shadow-md transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:shadow-lg border-gray-300 bg-white text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
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

