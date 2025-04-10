import React from "react";

interface StatsDisplayProps {
  wpm: number;
  time: number;
  score: number;
  currentLesson: string;
}

export default function StatsDisplay(
  { wpm, time, score, currentLesson }: StatsDisplayProps = {
    wpm: 0,
    time: 0,
    score: 0,
    currentLesson: "",
  },
) {
  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="mb-4 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-gray-100 p-2 sm:p-4 shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-bold text-gray-600 dark:text-gray-300">LPM</h3>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          {wpm}
        </p>
      </div>
      <div className="rounded-lg bg-gray-100 p-2 sm:p-4 shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-bold text-gray-600 dark:text-gray-300">
          Time
        </h3>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          {formatTime(time)}s
        </p>
      </div>
      <div className="rounded-lg bg-gray-100 p-2 sm:p-4 shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-bold text-gray-600 dark:text-gray-300">
          Score
        </h3>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          {score}
        </p>
      </div>
      <div className="rounded-lg bg-gray-100 p-2 sm:p-4 shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-bold text-gray-600 dark:text-gray-300">
          Lesson
        </h3>
        <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white md:text-base truncate max-w-full px-1">
          {currentLesson}
        </p>
      </div>
    </div>
  );
}