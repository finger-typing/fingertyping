import React, { useState, useCallback, useEffect } from "react";

interface CustomInputsProps {
  darkMode: boolean;
  onCustomTextSubmit: (text: string) => void;
  onCustomTimeSubmit: (time: number) => void;
  customTime: number;
  isMobile?: boolean;
}

const formatTimeToMinSec = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const validateTimeInput = (input: string): boolean => {
  if (input.includes(":")) {
    const [minutes, seconds] = input.split(":").map(Number);
    return (
      !isNaN(minutes) &&
      !isNaN(seconds) &&
      seconds < 60 &&
      minutes >= 0 &&
      seconds >= 0 &&
      minutes * 60 + seconds <= 3600
    );
  }
  const seconds = Number(input);
  return !isNaN(seconds) && seconds > 0 && seconds <= 3600;
};

const parseTimeInput = (input: string): number => {
  if (input.includes(":")) {
    const [minutes, seconds] = input.split(":").map(Number);
    return minutes * 60 + seconds;
  }
  return Number(input);
};

export const CustomInputs: React.FC<CustomInputsProps> = ({
  darkMode,
  onCustomTextSubmit,
  onCustomTimeSubmit,
  customTime,
  isMobile = false,
}) => {
  const [customText, setCustomText] = useState("");
  const [tempCustomTime, setTempCustomTime] = useState(
    formatTimeToMinSec(customTime)
  );
  const [timeError, setTimeError] = useState<string>("");

  useEffect(() => {
    setTempCustomTime(formatTimeToMinSec(customTime));
  }, [customTime]);

  const handleCustomTextSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedText = customText.trim();
      if (trimmedText) {
        onCustomTextSubmit(trimmedText);
        setCustomText("");
      }
    },
    [customText, onCustomTextSubmit]
  );

  const handleCustomTimeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTimeError("");

      if (!validateTimeInput(tempCustomTime)) {
        setTimeError("Please enter valid time (M:S or seconds)");
        return;
      }

      const totalSeconds = parseTimeInput(tempCustomTime);
      onCustomTimeSubmit(totalSeconds);
    },
    [tempCustomTime, onCustomTimeSubmit]
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^[\d:]*$/.test(value)) {
        setTempCustomTime(value);
        setTimeError("");
      }
    },
    []
  );

  const inputClassName = `
    rounded-lg px-2.5 py-1.5 text-sm
    w-full min-w-[70px]
    border
    focus:outline-none focus:ring-2
    ${darkMode 
      ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/50' 
      : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-green-500 focus:ring-green-500/50'
    }
    transition-all duration-200 ease-in-out
    placeholder:text-gray-500
  `;

  const buttonClassName = `
    rounded-lg px-3 py-1.5 text-sm font-medium
    min-w-[60px] whitespace-nowrap
    ${isMobile ? 'flex-shrink-0 w-[85px] text-xs' : ''} 
    transition-all duration-200
    hover:scale-105 active:scale-95
    shadow-sm hover:shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
    ${
      darkMode
        ? "bg-teal-500/10 hover:bg-teal-500/20 text-white border border-teal-500"
        : "bg-teal-50 hover:bg-teal-100/80 text-teal-700 border border-teal-400"
    }
  `;

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center space-x-2"
      }`}
      role="group"
      aria-label="Custom game settings"
    >
      <form
        onSubmit={handleCustomTimeSubmit}
        className={`flex items-center ${
          isMobile ? "w-full space-x-3" : "space-x-2"
        }`}
      >
        <div className="relative flex flex-col flex-1">
          <input
            type="text"
            id="custom-time"
            value={tempCustomTime}
            onChange={handleTimeChange}
            placeholder="MM:SS"
            aria-label="Custom time in minutes:seconds"
            aria-describedby={timeError ? "time-error" : undefined}
            className={`${inputClassName} ${
              isMobile ? "w-full max-w-none py-2.5 text-sm" : "max-w-[100px]"
            } ${
              timeError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {timeError && (
            <span
              id="time-error"
              className="absolute -bottom-5 left-0 text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-md whitespace-nowrap"
              role="alert"
            >
              {timeError}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`${buttonClassName} ${isMobile ? "py-2" : ""}`}
          disabled={!!timeError}
        >
          Set Time
        </button>
      </form>

      <form
        onSubmit={handleCustomTextSubmit}
        className={`flex items-center ${
          isMobile ? "w-full space-x-3" : "space-x-2"
        }`}
      >
        <input
          type="text"
          id="custom-text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Enter text"
          aria-label="Custom text input"
          className={`${inputClassName} ${
            isMobile ? "w-full max-w-none py-2.5 text-sm" : "max-w-[150px]"
          }`}
        />
        <button
          type="submit"
          className={`${buttonClassName} ${isMobile ? "py-2" : ""}`}
        >
          Set Text
        </button>
      </form>
    </div>
  );
};

export default CustomInputs;
