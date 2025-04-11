// BanglaLessonOptions.ts
// This file contains Bangla-specific lesson options

// 1. Define allowed Bangla lesson option keys
export type BanglaLessonOption =
  | "স্বরবর্ণ" // Vowels
  | "ব্যঞ্জনবর্ণ" // All consonants
  | "ব্যঞ্জনবর্ণ ক-ঙ" // Group: ক to ঙ
  | "ব্যঞ্জনবর্ণ চ-ঞ" // Group: চ to ঞ
  | "ব্যঞ্জনবর্ণ ট-ণ" // Group: ট to ণ
  | "ব্যঞ্জনবর্ণ ত-ন" // Group: ত to ন
  | "ব্যঞ্জনবর্ণ প-ম" // Group: প to ম
  | "ব্যঞ্জনবর্ণ য-হ" // Group: য to হ
  | "ব্যঞ্জনবর্ণ র-শ" // Group: র to শ
  | "ব্যঞ্জনবর্ণ ড়-ঁ"; // Group: ড় to ঁ (includes special symbols)

// 2. Define the actual characters for each option
export const BanglaLessonOptions: Record<BanglaLessonOption, string> = {
  স্বরবর্ণ: "অআইঈউঊঋএঐওঔ", // Vowels
  ব্যঞ্জনবর্ণ: "কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ংঃঁ", // All consonants + special

  // Consonant sub-groups
  "ব্যঞ্জনবর্ণ ক-ঙ": "কখগঘঙ",
  "ব্যঞ্জনবর্ণ চ-ঞ": "চছজঝঞ",
  "ব্যঞ্জনবর্ণ ট-ণ": "টঠডঢণ",
  "ব্যঞ্জনবর্ণ ত-ন": "তথদধন",
  "ব্যঞ্জনবর্ণ প-ম": "পফবভম",
  "ব্যঞ্জনবর্ণ য-হ": "যরলশষসহ",
  "ব্যঞ্জনবর্ণ র-শ": "রলশ",
  "ব্যঞ্জনবর্ণ ড়-ঁ": "ড়ঢ়য়ংঃঁ", // Special chars group
};
