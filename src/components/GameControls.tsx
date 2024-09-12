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
  <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4">
    <Button
      onClick={startGame}
      disabled={hasStarted}
      className={`${
        darkMode
          ? "bg-gray-600 text-gray-200 hover:bg-gray-700 font-semibold"
          : "bg-gray-300 text-gray-900 hover:bg-gray-400 font-semibold"
      }`}
    >
      Start
    </Button>
    <p
      className={`text-3xl font-semibold ${
        darkMode ? "text-gray-300" : "text-gray-900"
      }`}
      aria-live="polite"
    >
      Time: {timeRemaining}s
    </p>
    <Button
      onClick={initializeGame}
      className={`${
        darkMode
          ? "bg-gray-600 text-gray-200 hover:bg-gray-700 font-semibold"
          : "bg-gray-300 text-gray-900 hover:bg-gray-400 font-semibold"
      }`}
    >
      Reset
    </Button>
  </div>
);

export default GameControls;
