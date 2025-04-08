

interface PerformanceMetricsProps {
  inputValue: string;
  randomText: string;
  timeElapsed: number;
}

interface MetricsResult {
  wpm: string;
  accuracy: string;
  wordStats: {
    correctWords: number;
    wrongWords: number;
  };
  keystrokeStats: {
    correctKeystrokes: number;
    wrongKeystrokes: number;
  };
}

export const usePerformanceMetrics = ({
  inputValue,
  randomText,
  timeElapsed,
}: PerformanceMetricsProps): MetricsResult => {
  const calculateWPM = (): string => {
    // Get the word stats from our helper function
    const { correctWords } = correctAndWrongWords();

    if (timeElapsed === 0) return "0.00";
    const wpm = correctWords / (timeElapsed / 60);
    return wpm.toFixed(2);
  };

  const calculateAccuracy = (): string => {
    const { correctWords, wrongWords } = correctAndWrongWords();
    const totalWords = correctWords + wrongWords;

    if (totalWords === 0) return "0.00";
    return ((correctWords / totalWords) * 100).toFixed(2);
  };

  const correctAndWrongWords = (): { correctWords: number; wrongWords: number } => {
    // Get all words including empty strings (which represent skipped words)
    const rawInputWords = inputValue.split(" ");
    const referenceWords = randomText.trim().split(/\s+/);

    let correctWords = 0;
    let wrongWords = 0;

    // Process each word position
    for (let i = 0; i < rawInputWords.length; i++) {
      const inputWord = rawInputWords[i];
      const referenceWord = i < referenceWords.length ? referenceWords[i] : null;

      // Skip empty strings at the end (trailing spaces)
      if (i === rawInputWords.length - 1 && inputWord === "") {
        continue;
      }

      // Empty string means the word was skipped - count as wrong
      if (inputWord === "") {
        wrongWords++;
        continue;
      }

      // A word is correct only if it exactly matches the reference word at the same position
      if (referenceWord && inputWord === referenceWord) {
        correctWords++;
      } else {
        // Count as wrong if it doesn't match or if there's no reference word at this position
        wrongWords++;
      }
    }

    return { correctWords, wrongWords };
  };

  const keystrokes = () => {
    // Split by spaces but keep empty strings to detect skipped words
    const rawInputWords = inputValue.split(" ");
    const referenceWords = randomText.trim().split(" ");

    let correctKeystrokes = 0;
    let wrongKeystrokes = 0;

    // Process each word the user has typed (including empty strings for skipped words)
    for (let i = 0; i < rawInputWords.length; i++) {
      const inputWord = rawInputWords[i];
      // Get the corresponding reference word, or empty string if we're past the end
      const referenceWord = i < referenceWords.length ? referenceWords[i] : "";

      if (inputWord !== "") {
        // Compare each character in the word
        for (let j = 0; j < inputWord.length; j++) {
          if (j < referenceWord.length) {
            // Both input and reference have a character at this position
            if (inputWord[j] === referenceWord[j]) {
              correctKeystrokes++;
            } else {
              wrongKeystrokes++;
            }
          } else {
            // Extra characters in input word (beyond reference word length)
            wrongKeystrokes++;
          }
        }
      }
    }

    // Count spaces as keystrokes (but don't double-count the last space if present)
    const spaceCount = inputValue.split(" ").length - 1;
    correctKeystrokes += spaceCount;

    return { correctKeystrokes, wrongKeystrokes };
  };

  return {
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    wordStats: correctAndWrongWords(),
    keystrokeStats: keystrokes(),
  };
};

export default usePerformanceMetrics;
