import React, { ChangeEvent, RefObject } from "react";

// Define the props for the InputField component
interface InputFieldProps {
  inputValue: string; // The current value of the input field
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Function to handle changes in the input field
  hasStarted: boolean; // Indicates if the typing game has started
  isComplete: boolean; // Indicates if the typing game is complete
  darkMode: boolean; // Boolean to toggle dark mode styles
  inputRef: RefObject<HTMLInputElement>; // Ref object for the input element
  placeholder?: string; // Optional placeholder text for the input field
  type?: string; // Optional input type (defaults to "text")
}

// InputField component definition
const InputField: React.FC<InputFieldProps> = ({
  inputValue,
  handleInputChange,
  isComplete,
  darkMode,
  inputRef,
  placeholder = "Start typing here...", // Default placeholder text
  type = "text", // Default input type
}) => (
  <div className="w-full mb-2">
    <input
      ref={inputRef} // Attach the ref to the input element
      name="input_words_unique" // A unique name can help prevent browser autofill
      value={inputValue} // Bind the input value to the component's state
      onChange={handleInputChange} // Handle input changes
      placeholder={placeholder} // Set the placeholder text
      type={type} // Set the input type
      className={`w-full px-2 py-5 border-2 rounded-lg text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        darkMode
          ? "border-gray-600 bg-gray-900 text-gray-200 placeholder-gray-400" // Dark mode styles
          : "border-gray-400 bg-white text-gray-900 placeholder-gray-500" // Light mode styles
      }`}
      disabled={isComplete} // Disable the input if the game is complete
      aria-label="Typing input field" // Accessibility label
      spellCheck={false} // Enable spell checking
      autoComplete="off" // Prevent saving or suggesting previous inputs
      autoCorrect="off" // Turn off autocorrect
      autoCapitalize="none" // Turn off automatic capitalization
    />
  </div>
);

export default InputField;
