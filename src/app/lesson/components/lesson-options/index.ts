// Import and re-export all lesson options
import { type EnglishLessonOption, EnglishLessonOptions } from './EnglishLessonOptions';
import { type BanglaLessonOption, BanglaLessonOptions } from './BanglaLessonOptions';
import { type HindiLessonOption, HindiLessonOptions } from './HindiLessonOptions';
import { type UrduLessonOption, UrduLessonOptions } from './UrduLessonOptions';

// Re-export everything
export { EnglishLessonOptions, BanglaLessonOptions, HindiLessonOptions, UrduLessonOptions };
export type { EnglishLessonOption, BanglaLessonOption, HindiLessonOption, UrduLessonOption };

// Combined type for all lesson options
export type AllLessonOptions =
  | EnglishLessonOption
  | BanglaLessonOption
  | HindiLessonOption
  | UrduLessonOption;
