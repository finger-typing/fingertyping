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
  randomText: string; // Add this prop to compare with input
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

      // Only check the last character if it's not a deletion
      if (newValue.length > prevLength) {
        const lastCharIndex = newValue.length - 1;
        const isCorrect = newValue[lastCharIndex] === randomText[lastCharIndex];

        // Play the appropriate sound
        if (isCorrect) {
          audioPlayer.playCorrect();
        } else {
          audioPlayer.playIncorrect();
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
