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

  // Common input classes
  const inputClass = `
    rounded-lg text-sm
    ${darkMode 
      ? "bg-slate-800/80 text-slate-100 border-slate-700/30" 
      : "bg-white text-slate-800 border-slate-200/80"
    }
    border
    focus:ring-1 focus:ring-sky-500 focus:border-sky-500/50
    placeholder:text-slate-400
    shadow-sm
    transition-all duration-200
  `;

  // Common button styles with colors
  const buttonClass = (bgColor: string) => `
    rounded-lg text-sm font-medium
    transition-all duration-200
    hover:scale-105 active:scale-95
    shadow-sm hover:shadow-md
    ${bgColor}
  `;

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2 w-full' : 'flex-row items-center justify-center space-x-2'}`}>
      {/* Custom Time Input Form */}
      <form
        onSubmit={handleCustomTimeSubmit}
        className={`flex items-center ${isMobile ? 'w-full space-x-2' : 'space-x-2'}`}
      >
        <input
          type="text"
          name="input_time"
          value={tempCustomTime}
          onChange={(e) => setTempCustomTime(e.target.value)}
          placeholder="Time (s)"
          className={`${inputClass} px-2.5 py-1.5 w-full min-w-[70px] max-w-[100px]`}
        />
        <button
          type="submit"
          className={`${buttonClass(
            darkMode
              ? "bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 border border-sky-500/20"
              : "bg-sky-50 hover:bg-sky-100/80 text-sky-700 border border-sky-400/20"
          )} px-3 py-1.5 min-w-[60px] whitespace-nowrap`}
        >
          Time
        </button>
      </form>

      {/* Custom Text Input Form */}
      <form
        onSubmit={handleCustomTextSubmit}
        className={`flex items-center ${isMobile ? 'w-full space-x-2' : 'space-x-2'}`}
      >
        <input
          type="text"
          name="input_text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Custom text"
          className={`${inputClass} px-2.5 py-1.5 w-full min-w-[70px] max-w-[100px]`}
        />
        <button
          type="submit"
          className={`${buttonClass(
            darkMode
              ? "bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/20"
              : "bg-fuchsia-50 hover:bg-fuchsia-100/80 text-fuchsia-700 border border-fuchsia-400/20"
          )} px-3 py-1.5 min-w-[60px] whitespace-nowrap`}
        >
          Text
        </button>
      </form>
    </div>
  );
};

export default CustomInputs;
