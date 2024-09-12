import React, { ChangeEvent, RefObject } from "react";

interface InputFieldProps {
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasStarted: boolean;
  isComplete: boolean;
  darkMode: boolean;
  inputRef: RefObject<HTMLInputElement>;
  placeholder?: string; // Optional placeholder
  type?: string; // Optional type prop
}

const InputField: React.FC<InputFieldProps> = ({
  inputValue,
  handleInputChange,
  hasStarted,
  isComplete,
  darkMode,
  inputRef,
  placeholder = "Start typing here...", // Default placeholder text
  type = "text", // Default input type
}) => (
  <div className="w-full mb-4">
    <input
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      type={type}
      className={`w-full p-3 border-2 rounded-lg text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        darkMode
          ? "border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400"
          : "border-gray-400 bg-white text-gray-900 placeholder-gray-500"
      }`}
      disabled={!hasStarted || isComplete}
      aria-label="Typing input field"
    />
  </div>
);

export default InputField;
