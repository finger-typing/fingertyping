import { ChangeEvent, RefObject } from 'react';

export interface InputFieldProps {
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasStarted: boolean;
  isComplete: boolean;
  darkMode: boolean;
  inputRef: RefObject<HTMLInputElement>;
  placeholder: string;
  randomText: string;
}

const InputField: React.FC<InputFieldProps> = ({
  inputValue,
  handleInputChange,
  hasStarted,
  isComplete,
  darkMode,
  inputRef,
  placeholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  randomText: _randomText
}) => {
  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      disabled={isComplete}
      ref={inputRef}
      placeholder={placeholder}
      className={`w-full h-16 md:h-20 p-4 md:p-8 rounded-lg text-xl md:text-3xl font-medium transition-all duration-200 ${
        darkMode
          ? 'bg-gray-800 text-white'
          : 'bg-white text-gray-800'
      } placeholder:text-gray-400 placeholder:text-lg md:placeholder:text-xl ${
        !hasStarted
          ? 'border-2 border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none'
          : isComplete
            ? 'border-2 border-green-500'
            : 'border-2 border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none'
      }`}
      aria-label="Type the text"
      data-testid="typing-input"
      autoComplete="off"

    />
  );
};

export default InputField;
