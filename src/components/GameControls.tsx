import React from "react";
import { Clock, RotateCcw } from "lucide-react";
import Button from "./Button";

// Define the props interface for the GameControls component
interface GameControlsProps {
  initializeGame: () => void;
  hasStarted: boolean;
  timeRemaining: number;
  darkMode: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  initializeGame,
  timeRemaining,
  darkMode,
}) => {
  // Common classes for styling
  const commonClasses = `
    flex items-center justify-center space-x-2 px-4 py-3 rounded-md
    ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}
    shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
    transform hover:scale-105 focus:outline-none focus:ring-2
    ${darkMode ? 'focus:ring-green-400 hover:bg-gray-600' : 'focus:ring-green-600 hover:bg-gray-100'}
  `;

  return (
    <div 
      className={`
        w-full flex flex-col lg:flex-row justify-between items-center
        mb-4 p-3 rounded-lg shadow-lg transition-all duration-300
        ${darkMode ? 'bg-gray-700/70' : 'bg-gray-200/70'}
        backdrop-filter backdrop-blur-lg
      `}
    >
      <div className="w-full grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:justify-between lg:items-center">
        {/* Left spacer for large screens */}
        <div className="hidden lg:block lg:flex-1"></div>

        {/* Time display */}
        <div className={`${commonClasses} text-center lg:flex-1`}>
          <Clock className={`${darkMode ? "text-green-400" : "text-green-600"} animate-pulse`} size={25} />
          <p
            className="text-lg sm:text-xl lg:text-2xl font-bold font-mono"
            aria-live="polite"
          >
            Time:{timeRemaining}s
          </p>
        </div>

        {/* Reset Button */}
        <Button
          onClick={initializeGame}
          className={`${commonClasses} font-semibold lg:flex-1`}
        >
          <RotateCcw size={20} className="animate-spin-slow" />
          <span className="text-md sm:text-md lg:text-lg">Reset</span>
        </Button>

        {/* Right spacer for large screens */}
        <div className="hidden lg:block lg:flex-1"></div>
      </div>
    </div>
  );
};

export default GameControls;