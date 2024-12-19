import React, { useRef } from "react";

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

  return (
    <div className="mb-6 text-center">
      <div
        className={`mb-4 ${
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
          className={`w-full rounded border-2 p-2 text-center text-xl focus:outline-none md:p-4 md:text-3xl ${
            isCorrect ? "border-green-500" : "border-red-500"
          } bg-white text-gray-800 dark:bg-gray-700 dark:text-white`}
          placeholder={practiceType === 'words' ? "Type the word..." : "Type here..."}
          autoFocus
        />
      </div>
    </div>
  );
}
