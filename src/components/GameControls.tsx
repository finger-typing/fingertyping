import React from "react";
import { Clock, RotateCcw, File } from "lucide-react";
import Button from "./Button";

interface GameControlsProps {
  initializeGame: () => void;
  timeRemaining: number;
  darkMode: boolean;
  isBlankPage: boolean;
  toggleBlankPage?: () => void;
}

const formatTimeDisplay = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const GameControls: React.FC<GameControlsProps> = ({
  initializeGame,
  timeRemaining,
  darkMode,
  isBlankPage,
  toggleBlankPage,
}) => {
  const baseStyles = `
    flex items-center justify-center gap-2 py-2
    font-medium tracking-wider uppercase
    shadow-lg transition-all duration-300 ease-in-out
    transform hover:-translate-y-1 focus:outline-none focus:ring-2
    border
  `;

  const buttonStyles = `
    ${baseStyles}
    px-4
    text-xs
    ${
      darkMode
        ? "text-gray-200 hover:bg-gray-700 focus:ring-purple-500/50 border-gray-700"
        : "text-gray-800 hover:bg-gray-50 focus:ring-purple-600/50 border-gray-200"
    }
  `;

  const blankPageButtonStyles = `
    ${baseStyles}
    px-4
    text-sm
    ${
      darkMode
        ? "text-white hover:bg-gray-700 focus:ring-blue-500/50 border-gray-700"
        : "text-gray-800 hover:bg-gray-50 focus:ring-blue-600/50 border-gray-200"
    }
  `;

  const timerStyles = `
    ${baseStyles}
    px-8
    ${
      darkMode
        ? "text-gray-100 border-gray-700/50"
        : "text-gray-800 border-gray-200"
    }
    cursor-default text-3xl
  `;

  return (
    <div
      className={`mb-2 flex w-full flex-col items-center justify-between rounded-xl py-1 ${darkMode ? "bg-gray-900/30" : "bg-gradient-to-br from-white to-gray-50"} border shadow-xl ${darkMode ? "border-gray-800/50" : "border-gray-100"} backdrop-blur-sm`}
      role="group"
      aria-label="Game controls"
    >
      {/* Mobile View: 1 line, 3 columns */}
      <div className="flex w-full flex-row items-stretch justify-between gap-0 sm:flex-row">
        <Button
          onClick={toggleBlankPage ?? (() => {})}
          className={`${isBlankPage ? blankPageButtonStyles : buttonStyles} flex-1 rounded-none sm:rounded-l-xl`}
          ariaLabel="Toggle blank page mode"
          disabled={!toggleBlankPage}
        >
          <File size={24} className="stroke-[1.5]" />
          <span className="hidden sm:inline">Blank Mode</span>
        </Button>

        <div
          className={`${timerStyles} flex-1 sm:flex-[1.5] sm:rounded-none`}
          role="timer"
          aria-live="polite"
          aria-label={`Time remaining: ${formatTimeDisplay(timeRemaining)}`}
        >
          <Clock
            size={22}
            className={`stroke-[1.5] ${
              timeRemaining <= 10
                ? "animate-pulse text-red-500"
                : darkMode
                  ? "text-green-400"
                  : "text-green-600"
            }`}
          />
          <span className="font-mono">{formatTimeDisplay(timeRemaining)}</span>
        </div>

        <Button
          onClick={initializeGame}
          className={`${buttonStyles} flex-1 rounded-none sm:rounded-r-xl`}
          ariaLabel="Reset game"
        >
          <RotateCcw size={24} className="stroke-[1.5]" />
          <span className="hidden sm:inline">Reset Game</span>
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
