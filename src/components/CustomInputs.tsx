import React, { useState } from "react";

// Component props interface
interface CustomInputsProps {
  darkMode: boolean;
  onCustomTextSubmit: (text: string) => void;
  onCustomTimeSubmit: (time: number) => void;
  customTime: number;
  isMobile?: boolean;
}

const CustomInputs: React.FC<CustomInputsProps> = ({
  darkMode,
  onCustomTextSubmit,
  onCustomTimeSubmit,
  customTime,
  isMobile = false,
}) => {
  // State for custom text input
  const [customText, setCustomText] = useState("");
  // State for temporary custom time input
  const [tempCustomTime, setTempCustomTime] = useState(customTime.toString());

  // Handler for custom text submission
  const handleCustomTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim()) {
      onCustomTextSubmit(customText.trim());
      setCustomText("");
    }
  };

  // Handler for custom time submission
  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTime = parseInt(tempCustomTime, 10);
    if (newTime > 0) {
      onCustomTimeSubmit(newTime);
    }
  };

  // Dynamic class for input fields based on dark mode
  const inputClass = `p-2 border ${
    darkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  }`;

  // Dynamic class for buttons
  const buttonClass = (bgColor: string) => `p-2 border ${bgColor} text-white`;

  return (
    <>
      {/* Custom Time Input Form */}
      <form
        onSubmit={handleCustomTimeSubmit}
        className={isMobile ? "flex flex-col-2" : "flex items-center"}
      >
        <input
          type="text"
          name="input_time"
          value={tempCustomTime}
          onChange={(e) => setTempCustomTime(e.target.value)}
          placeholder="Set time(s)"
          className={inputClass + (isMobile ? " w-full " : " w-28")}
        />
        <button
          type="submit"
          className={buttonClass(
            darkMode
              ? "bg-green-600 border-green-700"
              : "bg-green-500 border-green-600"
          )}
        >
          {isMobile ? "Custom Time" : "Custom Time"}
        </button>
      </form>

      {/* Custom Text Input Form */}
      <form
        onSubmit={handleCustomTextSubmit}
        className={isMobile ? "flex flex-col-2 mt-2 " : "flex items-center"}
      >
        <input
          type="text"
          name="input_text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Enter your text"
          className={inputClass + (isMobile ? " w-full" : " w-32")}
        />
        <button
          type="submit"
          className={buttonClass(
            darkMode
              ? "bg-green-600 border-green-800"
              : "bg-green-600 border-green-800"
          )}
        >
          {isMobile ? "Custom Text" : "Custom Text"}
        </button>
      </form>
    </>
  );
};

export default CustomInputs;
