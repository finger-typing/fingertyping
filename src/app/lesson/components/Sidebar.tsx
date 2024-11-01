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
    <div className="hidden bg-gray-100 p-4 dark:bg-gray-800 md:block md:w-64">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
        Lessons
      </h2>

      <div className="max-h-[80vh] overflow-y-auto">
        {(Object.keys(lessonOptions) as LessonOption[]).map((option) => (
          <button
            key={option}
            onClick={() => setCurrentLesson(option)}
            className={`mb-2 w-full rounded px-4 py-2 text-left text-gray-800 transition duration-200 ease-in-out hover:bg-gray-200 dark:text-white dark:hover:bg-gray-500 ${
              currentLanguage !== "English"
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={currentLanguage !== "English"}
          >
            {option}
          </button>
        ))}
      </div>

      <h1 className="mt-2 text-center text-sm font-bold text-gray-800 dark:text-white">
        Finger Typing
      </h1>
    </div>
  );
}
