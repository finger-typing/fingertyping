import React, { ChangeEvent, RefObject, useCallback } from "react";
import { audioPlayer } from "../utils/audioUtils";

interface InputFieldProps {
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasStarted: boolean;
  isComplete: boolean;
  darkMode: boolean;
  inputRef: RefObject<HTMLInputElement>;
  randomText: string;
}

const InputField: React.FC<InputFieldProps> = ({
  inputValue,
  handleInputChange,
  isComplete,
  darkMode,
  inputRef,
  randomText,
}) => {
  const handleKeyInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (newValue.length > inputValue.length) {
        const [currentTargetWord = "", currentTypedWord = ""] =
          getCurrentWordPair(randomText, newValue);

        const isCorrect = validateInput(currentTargetWord, currentTypedWord);
        playFeedbackSound(isCorrect);
      }

      handleInputChange(e);
    },
    [inputValue, randomText, handleInputChange],
  );

  return (
    <div className="mb-2 w-full">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleKeyInput}
        disabled={isComplete}
        className={getInputClassName(darkMode)}
        {...getInputAttributes()}
      />
    </div>
  );
};

// Utility functions
const getCurrentWordPair = (
  randomText: string,
  inputValue: string,
): [string, string] => {
  const currentWords = randomText.split(" ");
  const typedWords = inputValue.split(" ");
  const currentIndex = typedWords.length - 1;

  return [currentWords[currentIndex] || "", typedWords[currentIndex] || ""];
};

const validateInput = (targetWord: string, typedWord: string): boolean => {
  return (
    targetWord.startsWith(typedWord) && typedWord.length <= targetWord.length
  );
};

const playFeedbackSound = (isCorrect: boolean): void => {
  if (isCorrect) {
    audioPlayer.playCorrect();
  } else {
    audioPlayer.playIncorrect();
  }
};

const getInputClassName = (darkMode: boolean): string => {
  const baseClasses =
    "w-full rounded-lg border-2 px-4 py-4 text-lg shadow-sm " +
    "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500";

  const themeClasses = darkMode
    ? "border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500";

  return `${baseClasses} ${themeClasses}`;
};

const getInputAttributes = () => ({
  name: "typing_input",
  placeholder: "Start typing...",
  type: "text",
  spellCheck: false,
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "none",
  autoFocus: true,
  "aria-label": "Typing input field",
});

export default InputField;
