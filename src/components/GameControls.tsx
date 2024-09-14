import React from "react";
import Button from "./Button";

interface GameControlsProps {
  startGame: () => void;
  initializeGame: () => void;
  hasStarted: boolean;
  timeRemaining: number;
  darkMode: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  startGame,
  initializeGame,
  hasStarted,
  timeRemaining,
  darkMode,
}) => (
  <div className="w-full flex flex-row justify-between items-center mb-4">
    {/* Left (Start Button) */}
    <div className="flex justify-start">
      <Button
        onClick={startGame}
        disabled={hasStarted}
        className={`${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-600 font-semibold border border-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg p-2"
            : "bg-gray-200 text-black-900 hover:bg-gray-300 font-semibold border border-black shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg p-2"
        }`}
      >
        Start
      </Button>
    </div>

    {/* Center (Time) */}
    <div className="flex justify-center">
      <p
        className={`text-2xl font-semibold ${
          darkMode ? "text-gray-300" : "text-gray-900"
        }`}
        aria-live="polite"
      >
        Time: {timeRemaining}s
      </p>
    </div>

    {/* Right (Reset Button) */}
    <div className="flex justify-end">
      <Button
        onClick={initializeGame}
        className={`${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-600 font-semibold border border-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg p-2"
            : "bg-gray-200 text-black-900 hover:bg-gray-300 font-semibold border border-black shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg p-2"
        }`}
      >
        Reset
      </Button>
    </div>
  </div>
);

export default GameControls;
