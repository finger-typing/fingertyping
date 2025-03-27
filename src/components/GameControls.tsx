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
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const GameControls: React.FC<GameControlsProps> = ({
  initializeGame,
  timeRemaining,
  darkMode,
  isBlankPage,
  toggleBlankPage,
}) => {
  const baseStyles = `
    flex items-center justify-center gap-4 py-4
    font-medium tracking-wider uppercase
    shadow-lg transition-all duration-300 ease-in-out
    transform hover:-translate-y-1 focus:outline-none focus:ring-2
    border
  `;

  const buttonStyles = `
    ${baseStyles}
    px-6
    text-sm
    ${
      darkMode
        ? "text-gray-200 hover:bg-gray-700 focus:ring-purple-500/50 border-gray-700"
        : "text-gray-800 hover:bg-gray-50 focus:ring-purple-600/50 border-gray-200"
    }
  `;

  const blankPageButtonStyles = `
    ${baseStyles}
    px-6
    text-base
    ${
      darkMode
        ? "text-white hover:bg-gray-700 focus:ring-blue-500/50 border-gray-700"
        : "text-gray-800 hover:bg-gray-50 focus:ring-blue-600/50 border-gray-200"
    }
  `;

  const timerStyles = `
    ${baseStyles}
    px-10
    ${
      darkMode
        ? "text-gray-100 border-gray-700/50"
        : "text-gray-800 border-gray-200"
    }
    cursor-default text-3xl
  `;

  return (
    <div
      className={`mb-4 flex w-full flex-col items-center justify-between rounded-2xl py-4 ${darkMode ? "bg-gray-900/30" : "bg-gradient-to-br from-white to-gray-50"} border shadow-xl ${darkMode ? "border-gray-800/50" : "border-gray-100"} backdrop-blur-sm`}
      role="group"
      aria-label="Game controls"
    >
      <div className="flex w-full flex-col items-stretch justify-between gap-0 sm:flex-row">
        <Button
          onClick={toggleBlankPage ?? (() => {})}
          className={`${isBlankPage ? blankPageButtonStyles : buttonStyles} flex-1 rounded-l-xl sm:rounded-r-none`}
          aria-label="Toggle blank page mode"
          disabled={!toggleBlankPage}
        >
          <File size={28} className="stroke-[1.5]" />
          <span>Blank Mode</span>
        </Button>

        <div
          className={`${timerStyles} flex-[1.5] sm:rounded-none`}
          role="timer"
          aria-live="polite"
          aria-label={`Time remaining: ${formatTimeDisplay(timeRemaining)}`}
        >
          <Clock
            size={25}
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
          className={`${buttonStyles} flex-1 rounded-r-xl sm:rounded-l-none`}
          aria-label="Reset game"
        >
          <RotateCcw size={28} className="stroke-[1.5]" />
          <span>Reset Game</span>
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
