import React, { ChangeEvent, RefObject, useCallback } from "react";
import { audioPlayer } from "../utils/audioUtils";

interface InputFieldProps {
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasStarted: boolean;
  isComplete: boolean;
  darkMode: boolean;
  inputRef: RefObject<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  randomText: string;
}

const InputField: React.FC<InputFieldProps> = ({
  inputValue,
  handleInputChange,
  isComplete,
  darkMode,
  inputRef,
  placeholder = "Start typing here...",
  type = "text",
  randomText,
}) => {
  const handleKeyInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const prevLength = inputValue.length;

      // Check if it's not a deletion
      if (newValue.length > prevLength) {
        const currentWords = randomText.split(" ");
        const typedWords = newValue.split(" ");
        const currentWordIndex = typedWords.length - 1;

        // Get the current word being typed
        const currentTargetWord = currentWords[currentWordIndex] || "";
        const currentTypedWord = typedWords[currentWordIndex] || "";

        // Play sound based on whether the typed word matches the target word so far
        const isTypedWordCorrect =
          currentTargetWord.startsWith(currentTypedWord);

        // Check if we've typed more characters than the target word
        const isExtraCharacters =
          currentTypedWord.length > currentTargetWord.length;

        if (isExtraCharacters || !isTypedWordCorrect) {
          audioPlayer.playIncorrect();
        } else {
          audioPlayer.playCorrect();
        }
      }

      // Call the original handler
      handleInputChange(e);
    },
    [inputValue, randomText, handleInputChange],
  );

  return (
    <div className="mb-2 w-full">
      <input
        ref={inputRef}
        name="input_words_unique"
        value={inputValue}
        onChange={handleKeyInput}
        placeholder={placeholder}
        type={type}
        className={`w-full rounded-lg border-2 px-2 py-5 text-lg shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 ${
          darkMode
            ? "border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400"
            : "border-gray-400 bg-white text-gray-900 placeholder-gray-500"
        }`}
        disabled={isComplete}
        aria-label="Typing input field"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
      />
    </div>
  );
};

export default InputField;
