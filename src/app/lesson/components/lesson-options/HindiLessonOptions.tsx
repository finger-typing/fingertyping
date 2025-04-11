// HindiLessonOptions.ts
// This file contains Hindi-specific lesson options

// 1. Define allowed Hindi lesson option keys
export type HindiLessonOption =
  | "स्वर" // Vowels
  | "व्यंजन" // All consonants
  | "व्यंजन क-ङ" // Group: क to ङ
  | "व्यंजन च-ञ" // Group: च to ञ
  | "व्यंजन ट-ण" // Group: ट to ण
  | "व्यंजन त-न" // Group: त to न
  | "व्यंजन प-म" // Group: प to म
  | "व्यंजन य-ह" // Group: य to ह
  | "संयुक्त अक्षर" // Conjunct letters
  | "मात्राएँ"; // Matras (vowel signs)

// 2. Define the actual characters for each option
export const HindiLessonOptions: Record<HindiLessonOption, string> = {
  स्वर: "अआइईउऊऋएऐओऔ", // Vowels
  व्यंजन: "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह", // All consonants

  // Consonant sub-groups
  "व्यंजन क-ङ": "कखगघङ",
  "व्यंजन च-ञ": "चछजझञ",
  "व्यंजन ट-ण": "टठडढण",
  "व्यंजन त-न": "तथदधन",
  "व्यंजन प-म": "पफबभम",
  "व्यंजन य-ह": "यरलवशषसह",
  
  // Special groups
  "संयुक्त अक्षर": "क्षत्रज्ञश्रद्वद्धक्कक्तस्तम्बन्धप्रस्थ", // Conjunct letters
  "मात्राएँ": "ा ि ी ु ू े ै ो ौ ं ः ँ", // Matras (vowel signs)
};
