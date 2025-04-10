"use client";

import React from "react";
import {
  EnglishLessonOptions,
  BanglaLessonOptions,
  HindiLessonOptions,
  UrduLessonOptions,
  type AllLessonOptions,
} from "./lesson-options";

interface SidebarProps {
  currentLesson: AllLessonOptions;
  setCurrentLesson: (lesson: AllLessonOptions) => void;
  currentLanguage: string;
}

export default function Sidebar({
  setCurrentLesson,
  currentLanguage,
}: SidebarProps) {
  // Determine which options to display based on the current language
  const getOptionsToDisplay = () => {
    if (currentLanguage === "English") {
      return Object.keys(EnglishLessonOptions) as AllLessonOptions[];
    } else if (currentLanguage === "Bangla") {
      return Object.keys(BanglaLessonOptions) as AllLessonOptions[];
    } else if (currentLanguage === "Hindi") {
      return Object.keys(HindiLessonOptions) as AllLessonOptions[];
    } else if (currentLanguage === "Urdu") {
      return Object.keys(UrduLessonOptions) as AllLessonOptions[];
    }
    return [] as AllLessonOptions[];
  };

  // Check if the option is valid for the current language
  const isOptionValidForLanguage = (option: string): boolean => {
    if (currentLanguage === "English") {
      return Object.keys(EnglishLessonOptions).includes(option);
    } else if (currentLanguage === "Bangla") {
      return Object.keys(BanglaLessonOptions).includes(option);
    } else if (currentLanguage === "Hindi") {
      return Object.keys(HindiLessonOptions).includes(option);
    } else if (currentLanguage === "Urdu") {
      return Object.keys(UrduLessonOptions).includes(option);
    }
    return false;
  };

  return (
    <aside className="hidden h-[calc(100vh-3rem)] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 p-4 shadow-lg dark:from-gray-800 dark:to-gray-900 md:block md:w-64">
      <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Lessons
      </h2>

      <div className="h-[calc(100%-4rem)] overflow-hidden">
        <div className="custom-scrollbar h-full overflow-y-auto px-1">
          <div className="space-y-3">
            {getOptionsToDisplay().map((option) => (
              <button
                key={option}
                onClick={() => setCurrentLesson(option)}
                className={`group relative w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3.5 text-left text-base font-medium backdrop-blur-sm transition-all duration-200 ${
                  !isOptionValidForLanguage(option)
                    ? "cursor-not-allowed opacity-50"
                    : "hover:border-indigo-500 hover:bg-white hover:shadow-md hover:shadow-indigo-100/20 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-indigo-400 dark:hover:bg-gray-800 dark:hover:shadow-indigo-900/20"
                } text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white`}
                disabled={!isOptionValidForLanguage(option)}
              >
                <span className="flex items-center justify-between">
                  <span className="line-clamp-1 text-base md:text-sm">
                    {option}
                  </span>
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
      </div>
    </aside>
  );
}
