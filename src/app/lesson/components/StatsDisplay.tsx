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
    <div className="mb-2 grid grid-cols-2 gap-2 md:grid-cols-4">
      <div className="rounded bg-gray-100 p-2 shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 font-bold text-gray-600 dark:text-gray-300">LPM</h3>
        <p className="text-xl text-gray-800 dark:text-white md:text-2xl">
          {wpm}
        </p>
      </div>
      <div className="rounded bg-gray-100 p-2 shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 font-bold text-gray-600 dark:text-gray-300">
          Time
        </h3>
        <p className="text-xl text-gray-800 dark:text-white md:text-2xl">
          {formatTime(time)}s
        </p>
      </div>
      <div className="rounded bg-gray-100 p-2 shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 font-bold text-gray-600 dark:text-gray-300">
          Score
        </h3>
        <p className="text-xl text-gray-800 dark:text-white md:text-2xl">
          {score}
        </p>
      </div>
      <div className="rounded bg-gray-100 p-2 shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 flex flex-col items-center justify-center">
        <h3 className="mb-1 font-bold text-gray-600 dark:text-gray-300">
          Lesson
        </h3>
        <p className="text-sm text-gray-800 dark:text-white md:text-base">
          {currentLesson}
        </p>
      </div>
    </div>
  );
}