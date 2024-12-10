

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
    const inputWords = inputValue.trim().split(/\s+/);
    const referenceWords = randomText.trim().split(/\s+/);

    let correctWords = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === referenceWords[i]) {
        correctWords++;
      }
    }

    if (timeElapsed === 0) return "0.00";
    const wpm = correctWords / (timeElapsed / 60);
    return wpm.toFixed(2);
  };

  const calculateAccuracy = (): string => {
    const inputWords = inputValue.trim().split(/\s+/).filter(Boolean);
    const randomWords = randomText.trim().split(/\s+/).slice(0, inputWords.length);
    if (inputWords.length === 0) return "0.00";
    const correctWords = inputWords.filter(
      (word, i) => word === randomWords[i],
    ).length;
    return ((correctWords / inputWords.length) * 100).toFixed(2);
  };

  const correctAndWrongWords = () => {
    const inputWords = inputValue.trim().split(/\s+/).filter(Boolean);
    const referenceWords = randomText.trim().split(/\s+/);
    let correctWords = 0;
    let wrongWords = 0;

    inputWords.forEach((word, index) => {
      if (word === referenceWords[index]) {
        correctWords++;
      } else {
        wrongWords++;
      }
    });

    if (inputWords.length > referenceWords.length) {
      wrongWords += inputWords.length - referenceWords.length;
    }
    return { correctWords, wrongWords };
  };

  const keystrokes = () => {
    const inputWords = inputValue.trim().split(" ");
    const referenceWords = randomText.trim().split(" ");

    let correctKeystrokes = 0;
    let wrongKeystrokes = 0;

    for (let i = 0; i < inputWords.length; i++) {
      const inputWord = inputWords[i];
      const referenceWord = referenceWords[i] || "";

      if (i < inputWords.length - 1) {
        if (inputWord !== "") {
          for (let j = 0; j < inputWord.length; j++) {
            if (j < referenceWord.length) {
              if (inputWord[j] === referenceWord[j]) {
                correctKeystrokes++;
              } else {
                wrongKeystrokes++;
              }
            } else {
              wrongKeystrokes++;
            }
          }
          if (inputWord.length < referenceWord.length) {
            wrongKeystrokes += referenceWord.length - inputWord.length;
          }
        }
      } else {
        if (inputWord !== "") {
          for (let j = 0; j < inputWord.length; j++) {
            if (j < referenceWord.length) {
              if (inputWord[j] === referenceWord[j]) {
                correctKeystrokes++;
              } else {
                wrongKeystrokes++;
              }
            } else {
              wrongKeystrokes++;
            }
          }
        }
      }
    }

    const backspaceCount = inputValue.length - inputWords.join("").length;
    correctKeystrokes += backspaceCount;

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
