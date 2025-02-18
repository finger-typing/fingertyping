'use client'

import React from "react";

// Define the LessonOption type
type LessonOption =
  | "Letters(a-z)"
  | "Home-Row"
  | "Home-Row Capital"
  | "Upper-Row"
  | "Upper-Row Capital"
  | "Lower-Row"
  | "Lower-Row Capital"
  | "Numbers"
  | "Symbols practice"
  | "Random Practice"
  | "Left Hand practice"
  | "Right Hand practice"
  | "Capital Letters"
  | "All characters";

interface SidebarProps {
  lessonOptions: Record<LessonOption, string>;
  currentLesson: LessonOption;
  setCurrentLesson: (lesson: LessonOption) => void;
  currentLanguage: string;
}

export default function Sidebar({
  lessonOptions,
  setCurrentLesson,
  currentLanguage,
}: SidebarProps) {
  return (
    <aside className="hidden h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 shadow-lg dark:from-gray-800 dark:to-gray-900 md:block md:w-64">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Lessons
      </h2>

      <div className="flex h-[calc(100vh-10rem)] flex-col justify-between">
        <div className="custom-scrollbar overflow-y-auto px-1">
          <div className="space-y-3">
            {(Object.keys(lessonOptions) as LessonOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setCurrentLesson(option)}
                className={`group relative w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3.5 text-left text-base font-medium backdrop-blur-sm transition-all duration-200 
                  ${
                    currentLanguage !== "English"
                      ? "cursor-not-allowed opacity-50"
                      : "hover:border-indigo-500 hover:bg-white hover:shadow-md hover:shadow-indigo-100/20 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-indigo-400 dark:hover:bg-gray-800 dark:hover:shadow-indigo-900/20"
                  }
                  text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white`}
                disabled={currentLanguage !== "English"}
              >
                <span className="flex items-center justify-between">
                  <span className="line-clamp-1 text-base md:text-lg">{option}</span>
                  <svg
                    className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-base font-semibold text-gray-800 dark:text-gray-300">
            Finger Typing
          </h1>
        </div>
      </div>
    </aside>
  );
}
