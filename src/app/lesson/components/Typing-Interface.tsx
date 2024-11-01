import React, { useRef } from "react";

interface TypingInterfaceProps {
  currentWord: string;
  isCorrect: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typedWords: string[];
}

export default function TypingInterface(
  {
    currentWord,
    isCorrect,
    input,
    handleInputChange,
    typedWords,
  }: TypingInterfaceProps = {
    currentWord: "",
    isCorrect: true,
    input: "",
    handleInputChange: () => {},
    typedWords: [],
  },
) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-6 text-center">
      <div
        className={`mb-4 text-8xl font-bold md:text-9xl ${
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
          placeholder="Type here..."
        />
        <div className="mt-2 overflow-x-auto whitespace-nowrap p-2 text-lg text-gray-500 dark:text-gray-400">
          {typedWords.join(" ")}
        </div>
      </div>
    </div>
  );
}
