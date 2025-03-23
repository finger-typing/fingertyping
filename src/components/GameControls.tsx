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
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const GameControls: React.FC<GameControlsProps> = ({
  initializeGame,
  timeRemaining,
  darkMode,
  isBlankPage,
  toggleBlankPage,
}) => {
  const buttonClasses = `
    flex items-center justify-center gap-2 px-6 py-3 rounded-md
    ${darkMode ? "bg-gray-700/60 text-white" : "bg-white text-gray-800"}
    shadow-md hover:shadow-lg 
    transform hover:scale-105 focus:outline-none focus:ring-2
    ${
      darkMode
        ? "focus:ring-green-400 hover:bg-gray-600"
        : "focus:ring-green-600 hover:bg-gray-100"
    }
    transition-transform duration-200 ease-in-out
  `;

  return (
    <div
      className={`mb-2 flex w-full flex-col items-center justify-between rounded-lg p-5 lg:flex-row ${darkMode ? "bg-gray-800/40" : "bg-white"} `}
      role="group"
      aria-label="Game controls"
    >
      <div className="grid w-full grid-cols-3 gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
        <Button
          onClick={toggleBlankPage || (() => {})}
          className={`${buttonClasses} ${isBlankPage ? 'bg-blue-600 text-white' : ''} font-semibold lg:flex-1`}
          aria-label="Toggle blank page mode"
        >
          <File size={25} />
          <span className="text-md font-mono font-medium sm:text-lg lg:text-lg">
            Blank
          </span>
        </Button>

        <div
          className={`${buttonClasses} text-center lg:flex-1`}
          role="timer"
          aria-label={`Time remaining: ${formatTimeDisplay(timeRemaining)}`}
        >
          <Clock
            className={`${darkMode ? "text-red-500" : "text-red-500"}`}
            size={25}
          />
          <p className="text-md font-mono font-medium sm:text-lg lg:text-xl">
            {formatTimeDisplay(timeRemaining)}s
          </p>
        </div>

        <Button
          onClick={initializeGame}
          className={`${buttonClasses} font-semibold lg:flex-1`}
          aria-label="Reset game"
        >
          <RotateCcw size={25} />
          <span className="text-md font-mono font-medium sm:text-lg lg:text-lg">
            Reset
          </span>
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
