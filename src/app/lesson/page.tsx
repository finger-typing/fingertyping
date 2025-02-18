import { Suspense } from "react";
import LessonContent from "./components/LessonContent";

export default function TypingPractice() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LessonContent />
    </Suspense>
  );
}
