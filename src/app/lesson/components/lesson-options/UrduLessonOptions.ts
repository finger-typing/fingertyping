// UrduLessonOptions.ts
// This file contains Urdu-specific lesson options

// 1. Define allowed Urdu lesson option keys
export type UrduLessonOption =
  | "حروف تہجی" // Alphabets
  | "حروف متحرک" // Vowels
  | "حروف ساکن" // Consonants
  | "حروف ا-خ" // Group: ا to خ
  | "حروف د-ض" // Group: د to ض
  | "حروف ط-م" // Group: ط to م
  | "حروف ن-ے" // Group: ن to ے
  | "اعداد" // Numbers
  | "علامات"; // Punctuation marks

// 2. Define the actual characters for each option
export const UrduLessonOptions: Record<UrduLessonOption, string> = {
  "حروف تہجی": "ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ہ ھ ء ی ے", // All alphabets
  "حروف متحرک": "ا و ی ے", // Vowels
  "حروف ساکن": "ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ہ ھ", // Consonants
  
  // Alphabet sub-groups
  "حروف ا-خ": "ا ب پ ت ٹ ث ج چ ح خ",
  "حروف د-ض": "د ڈ ذ ر ڑ ز ژ س ش ص ض",
  "حروف ط-م": "ط ظ ع غ ف ق ک گ ل م",
  "حروف ن-ے": "ن و ہ ھ ء ی ے",
  
  // Special groups
  "اعداد": "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹", // Numbers
  "علامات": "۔ ، ؛ : ؟ ! ۔۔۔ ' \" ( ) [ ] { }", // Punctuation marks
};
