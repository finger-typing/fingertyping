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
    formatTimeToMinSec(customTime),
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
    [customText, onCustomTextSubmit],
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
    [tempCustomTime, onCustomTimeSubmit],
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^[\d:]*$/.test(value)) {
        setTempCustomTime(value);
        setTimeError("");
      }
    },
    [],
  );

  const inputClassName = `
    rounded-lg px-4 py-1.5 text-sm
    w-full min-w-[70px]
    border-2 backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    transition-all duration-200 ease-in-out
    placeholder:text-gray-400
    ${
      darkMode
        ? "bg-slate-800/40 border-slate-600/30 text-white focus:border-slate-400/50 focus:ring-slate-400/20"
        : "bg-white/50 border-slate-200 text-slate-900 focus:border-slate-300 focus:ring-slate-300/30"
    }
  `;

  const buttonClassName = `
    rounded-lg px-2 py-1 text-sm font-medium
    min-w-[60px]
    transition-all duration-200
    hover:scale-105 active:scale-95
    backdrop-blur-sm
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
    ${
      darkMode
        ? "bg-slate-800/40 hover:bg-slate-700/50 text-white border border-white/20 hover:border-slate-400/50"
        : "bg-white/50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300"
    }
  `;

  return (
    <div
      className={`flex ${
        isMobile
          ? "flex-col space-y-4"
          : "flex-row items-center justify-center space-x-4"
      } w-full max-w-full`} // Added w-full max-w-full
      role="group"
      aria-label="Custom game settings"
    >
      <form
        onSubmit={handleCustomTimeSubmit}
        className={`flex items-center ${
          isMobile ? "w-full flex-col space-y-2" : "space-x-2"
        } `} // Changed to flex-col and space-y-2
      >
        <div className="relative flex w-full flex-1 flex-col">
          {" "}
          {/* Added w-full */}
          <input
            type="text"
            id="custom-time"
            value={tempCustomTime}
            onChange={handleTimeChange}
            placeholder="MM:SS"
            aria-label="Custom time in minutes:seconds"
            aria-describedby={timeError ? "time-error" : undefined}
            className={`${inputClassName} ${
              isMobile ? "py-2 text-sm" : "max-w-[100px]"
            } ${
              timeError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          />
          {timeError && (
            <span
              id="time-error"
              className="absolute -bottom-5 left-0 whitespace-nowrap rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500 dark:bg-red-900/20"
              role="alert"
            >
              {timeError}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`${buttonClassName} ${isMobile ? "w-full py-2" : ""}`} // Added w-full
          disabled={!!timeError}
        >
          Set Time
        </button>
      </form>

      <form
        onSubmit={handleCustomTextSubmit}
        className={`flex items-center ${
          isMobile ? "w-full flex-col space-y-2" : "space-x-2"
        }`} // Changed to flex-col and space-y-2
      >
        <input
          type="text"
          id="custom-text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Enter text"
          aria-label="Custom text input"
          className={`${inputClassName} ${
            isMobile ? "py-2 text-sm" : "max-w-[120px]"
          }`}
        />
        <button
          type="submit"
          className={`${buttonClassName} ${isMobile ? "w-full py-2" : ""}`} // Added w-full
        >
          Set Text
        </button>
      </form>
    </div>
  );
};

export default CustomInputs;
