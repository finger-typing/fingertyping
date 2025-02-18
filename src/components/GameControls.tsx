import React from "react";
import { Clock, RotateCcw } from "lucide-react";
import Button from "./Button";

interface GameControlsProps {
  initializeGame: () => void;
  timeRemaining: number;
  darkMode: boolean;
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
}) => {
  const buttonClasses = `
    flex items-center justify-center gap-2 px-4 py-3 rounded-md
    ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}
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
      className={`
        mb-2 flex w-full flex-col items-center justify-between 
        rounded-lg p-3 shadow-lg lg:flex-row
        ${darkMode ? "bg-gray-600/20" : "bg-white"}
        backdrop-blur-lg backdrop-filter
        transition-colors duration-200
      `}
      role="group"
      aria-label="Game controls"
    >
      <div className="grid w-full grid-cols-2 gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="hidden lg:block lg:flex-1" aria-hidden="true" />

        <div
          className={`${buttonClasses} text-center lg:flex-1`}
          role="timer"
          aria-label={`Time remaining: ${formatTimeDisplay(timeRemaining)}`}
        >
          <Clock
            className={`${
              darkMode ? "text-red-500" : "text-red-500"
            }`}
            size={30}
          
          />
          <p className="text-md font-mono font-bold sm:text-lg lg:text-xl">
            {formatTimeDisplay(timeRemaining)}s
          </p>
        </div>

        <Button
          onClick={initializeGame}
          className={`${buttonClasses} font-semibold lg:flex-1`}
          aria-label="Reset game"
        >
          <RotateCcw
            size={28}
            className="animate-spin-slow"
            aria-hidden="true"
          />
          <span className="text-md font-mono font-bold sm:text-lg lg:text-xl">
            Reset
          </span>
        </Button>

        <div className="hidden lg:block lg:flex-1" aria-hidden="true" />
      </div>
    </div>
  );
};

export default GameControls;
