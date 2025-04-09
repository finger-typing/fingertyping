// Letter-list.tsx
// This file is now just a re-export of the lesson options from the new structure

// Re-export everything from the lesson-options directory
export * from './lesson-options';

// Re-export the language letters for backward compatibility
export { languageLetters, type Language } from './lesson-options/LanguageLetters';
