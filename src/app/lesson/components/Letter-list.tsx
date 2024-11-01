// types/typing-config.ts
export type LessonOption =
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

export const LessonOptions: Record<LessonOption, string> = {
  "Letters(a-z)": "abcdefghijklmnopqrstuvwxyz",
  "Home-Row": "asdfghjkl;;lkjhgfdsa",
  "Home-Row Capital": "ASDFGHJKL::LKJHGFDSA",
  "Upper-Row": "qwertyuioppoiuytrewq",
  "Upper-Row Capital": "QWERTYUIOPPOIUYTREWQ",
  "Lower-Row": "zxcvbnm,.//.,mnbvcxz",
  "Lower-Row Capital": "ZXCVBNM<>??><MNBVCXZ",
  Numbers: "12345678900987654321",
  "Symbols practice": "!@#$%^&*()_+-=[]{}|;:,.<>?",
  "Random Practice":
    "3Gwj+{X@[u4@A5|Yp0hIq;8Pr6&m<HCK)^DWlt)ZrM2_.79sk]*!ezJVT1SNnyLx#}FBoQbdOi%cvEfR-?,",
  "Left Hand practice": "qwertasdfgzxcvbbvcxzgfdsatrewq",
  "Right Hand practice": "yuiophjkl;nm,.//.,mn;lkjhpoiuy",
  "Capital Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "All characters":
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export const languageLetters = {
  English: "abcdefghijklmnopqrstuvwxyz".split(""),
  // You can add more languages here in the future
};

export type Language = keyof typeof languageLetters;
