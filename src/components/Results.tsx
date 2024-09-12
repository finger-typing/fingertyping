import React from "react";

interface ResultsProps {
  isComplete: boolean;
  timeElapsed: number;
  calculateWPM: () => string;
  calculateAccuracy: () => string;
  darkMode: boolean;
}

const Results: React.FC<ResultsProps> = ({
  isComplete,
  timeElapsed,
  calculateWPM,
  calculateAccuracy,
  darkMode,
}) => {
  if (!isComplete) return null;

  return (
    <div
      className={`w-full flex justify-between bg-white shadow-lg rounded-lg p-4 mt-4 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white"
      }`}
    >
      <div
        className={`flex-1 text-center p-4 rounded-lg ${
          darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-md font-semibold">Time</p>
        <p className="text-md font-bold">{timeElapsed} s</p>
      </div>
      <div
        className={`flex-1 text-center p-4 rounded-lg ${
          darkMode ? "bg-gray-700 text-gray-200" : "bg-green-100 text-green-800"
        }`}
      >
        <p className="text-lg font-semibold">WPM</p>
        <p className="text-xl font-bold">{calculateWPM()}</p>
      </div>
      <div
        className={`flex-1 text-center p-4 rounded-lg ${
          darkMode
            ? "bg-gray-700 text-gray-200"
            : "bg-purple-100 text-purple-800"
        }`}
      >
        <p className="text-lg font-semibold">Accuracy</p>
        <p className="text-xl font-bold">{calculateAccuracy()}%</p>
      </div>
    </div>
  );
};

export default Results;
