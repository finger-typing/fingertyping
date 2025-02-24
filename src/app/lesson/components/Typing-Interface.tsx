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
    <div className="mb-2 mt-2 text-center">
      <div
        className={`mb-2 ${
          practiceType === 'words' ? 'text-4xl md:text-5xl' : 'text-8xl md:text-9xl'
        } font-bold ${
          isCorrect ? "text-green-500" : "text-red-500"
        }`}
      >
        {currentWord}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full rounded-lg border-2 px-4 py-4 text-lg shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
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
