// EnglishLessonOptions.ts
// This file contains English-specific lesson options

// 1. Define allowed English lesson option keys
export type EnglishLessonOption =
  | "Letters(a-z)"
  | "Home-Row"
  | "Upper-Row"
  | "Lower-Row"
  | "Home-Row Capital"
  | "Upper-Row Capital"
  | "Lower-Row Capital"
  | "Numbers"
  | "Symbols practice"
  | "Random Practice"
  | "Left Hand practice"
  | "Right Hand practice"
  | "Capital Letters"
  | "All characters";

// 2. Define the actual characters for each option
export const EnglishLessonOptions: Record<EnglishLessonOption, string> = {
  "Letters(a-z)": "abcdefghijklmnopqrstuvwxyz",
  "Home-Row": "asdfghjkl;;lkjhgfdsa",
  "Upper-Row": "qwertyuioppoiuytrewq",
  "Lower-Row": "zxcvbnm,.//.,mnbvcxz",
  "Home-Row Capital": "ASDFGHJKL::LKJHGFDSA",
  "Upper-Row Capital": "QWERTYUIOPPOIUYTREWQ",
  "Lower-Row Capital": "ZXCVBNM<>??><MNBVCXZ",
  "Numbers": "12345678900987654321",
  "Symbols practice": "!@#$%^&*()_+-=[]{}|;:,.<>?",
  "Random Practice":
    "3Gwj+{X@[u4@A5|Yp0hIq;8Pr6&m<HCK)^DWlt)ZrM2_.79sk]*!ezJVT1SNnyLx#}FBoQbdOi%cvEfR-?,",
  "Left Hand practice": "qwertasdfgzxcvbbvcxzgfdsatrewq",
  "Right Hand practice": "yuiophjkl;nm,.//.,mn;lkjhpoiuy",
  "Capital Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "All characters":
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?",
};
