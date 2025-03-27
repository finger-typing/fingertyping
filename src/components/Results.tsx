import React, { useState } from "react";
import {
  FaFacebook,
  FaXTwitter,
  FaReddit,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";

// Define the props interface for the Results component
interface ResultsProps {
  isComplete: boolean; // Indicates if the results should be displayed
  timeElapsed: number; // Time taken for the task
  calculateWPM: () => string; // Function to calculate words per minute
  calculateAccuracy: () => string; // Function to calculate accuracy percentage
  correctAndWrongWords: { correctWords: number; wrongWords: number }; // Object containing correct and wrong word counts
  keystrokes: { correctKeystrokes: number; wrongKeystrokes: number }; // Object containing correct and wrong keystroke counts
  darkMode: boolean; // Flag for dark mode styling
}

// Results component definition
const Results: React.FC<ResultsProps> = ({
  isComplete,
  timeElapsed,
  calculateWPM,
  calculateAccuracy,
  correctAndWrongWords,
  keystrokes,
  darkMode,
}) => {
  // State for copy feedback
  const [copied, setCopied] = useState(false);

  // If the task is not complete, do not render the results
  if (!isComplete) return null;

  // Function to generate sharing text
  const generateShareText = () => {
    return `🎯 Check out my typing results at Finger Typing!

⚡ Speed: ${calculateWPM()} WPM
✨ Accuracy: ${calculateAccuracy()}%
⌚ Time: ${timeElapsed}s

📊 Stats:
✅ Correct Words: ${correctAndWrongWords.correctWords}
❌ Wrong Words: ${correctAndWrongWords.wrongWords}
⌨️ Keystrokes: ${keystrokes.correctKeystrokes} correct letters, ${keystrokes.wrongKeystrokes} wrong letters

Try it yourself at https://fingertyping.com 🚀`;
  };

  // Function to copy text to clipboard
  const copyToClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Function to handle social sharing
  const handleShare = (platform: 'facebook' | 'twitter' | 'reddit' | 'linkedin' | 'telegram' | 'whatsapp' | 'messenger') => {
    const url = 'https://fingertyping.com';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        // Basic Facebook share
        shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I typed ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy! 🚀`)}`;
        break;
      case 'twitter':
        // Twitter with hashtags
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just achieved ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on @FingerTyping! 🎯`)}&url=${encodeURIComponent(url)}&hashtags=typing,speedtyping,typingtest`;
        break;
      case 'reddit':
        // Reddit with more details
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`[Achievement] ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on FingerTyping!`)}`;
        break;
      case 'linkedin':
        // LinkedIn with professional tone
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`Improved my typing skills to ${calculateWPM()} WPM`)}`;
        break;
      case 'telegram':
        // Telegram with full details
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out my typing speed: ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy! 🎯`)}`;
        break;
      case 'whatsapp':
        // WhatsApp with friendly message
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! I just achieved ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on FingerTyping! Try to beat my score: ${url} 🎮`)}`;
        break;
      
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div
      className={`mt-4 flex w-full flex-wrap gap-2 p-2 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white"
      }`}
    >
      {/* Display Time, WPM, and Accuracy */}
      <div className="flex w-full flex-wrap gap-2 md:gap-4">
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm font-semibold">Time</p>
          <p className="text-lg font-bold text-green-500">{timeElapsed}s</p>
        </div>
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          <p className="text-sm font-semibold">WPM</p>
          <p className="text-lg font-bold text-green-500">{calculateWPM()}</p>
        </div>
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          <p className="text-sm font-semibold">Accuracy</p>
          <p className="text-lg font-bold text-green-500">
            {calculateAccuracy()}%
          </p>
        </div>
      </div>

      {/* Display Correct and Wrong Words */}
      <div className="mt-2 flex w-full flex-wrap gap-2">
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode ? "bg-gray-700 text-gray-200" : "bg-blue-100 text-blue-800"
          }`}
        >
          <p className="text-sm font-semibold">Correct Words</p>
          <p className="text-lg font-bold text-green-500">
            {correctAndWrongWords.correctWords}
          </p>
        </div>
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode ? "bg-gray-700 text-gray-200" : "bg-red-100 text-red-800"
          }`}
        >
          <p className="text-sm font-semibold">Wrong Words</p>
          <p className="text-lg font-bold text-red-500">
            {correctAndWrongWords.wrongWords}
          </p>
        </div>
      </div>

      {/* Display Correct and Wrong Keystrokes */}
      <div className="mt-2 flex w-full flex-wrap gap-2">
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          <p className="text-sm font-semibold">Correct Keystrokes</p>
          <p className="text-lg font-bold text-green-500">
            {keystrokes.correctKeystrokes}
          </p>
        </div>
        <div
          className={`flex-1 rounded-lg p-2 text-center ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <p className="text-sm font-semibold">Wrong Keystrokes</p>
          <p className="text-lg font-bold text-red-500">
            {keystrokes.wrongKeystrokes}
          </p>
        </div>
      </div>

      {/* Share Results Section */}
      <div className="mt-4 w-full rounded-lg bg-opacity-50 p-4">
        <p
          className={`mb-3 text-center text-base font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}
        >
          Share Your Results On Social Media
        </p>
        {/* Copy to Clipboard Button - Minimal Improved Version */}
        <div className="mb-4 flex w-full flex-col items-center gap-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-medium transition-all ${
              copied
                ? darkMode
                  ? "border-green-500 text-green-500"
                  : "border-green-500 text-green-500"
                : darkMode
                  ? "border-gray-500 text-gray-200 hover:border-gray-400"
                  : "border-gray-300 text-gray-800 hover:border-gray-500"
            }`}
            aria-label="Copy results to clipboard"
            disabled={copied}
          >
            {copied ? (
              <>
                <span className="text-lg">✓</span>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span className="text-lg">📋</span>
                <span>Copy Results</span>
              </>
            )}
          </button>
        </div>

        {/* Social Share Buttons */}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleShare("facebook")}
            className="rounded-full bg-[#1877F2] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={24} />
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="rounded-full bg-black p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on X (Twitter)"
          >
            <FaXTwitter size={24} />
          </button>
          <button
            onClick={() => handleShare("reddit")}
            className="rounded-full bg-[#FF4500] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on Reddit"
          >
            <FaReddit size={24} />
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="rounded-full bg-[#0A66C2] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={24} />
          </button>
          <button
            onClick={() => handleShare("telegram")}
            className="rounded-full bg-[#0088cc] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on Telegram"
          >
            <FaTelegram size={24} />
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="rounded-full bg-[#25D366] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp size={24} />
          </button>
          <button
            onClick={() => handleShare("messenger")}
            className="rounded-full bg-[#00B2FF] p-3 text-white transition-all hover:scale-110 hover:shadow-lg"
            aria-label="Share on Messenger"
          >
            <FaFacebookMessenger size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;

