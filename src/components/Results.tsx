import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  FaFacebook,
  FaXTwitter,
  FaReddit,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


// Define the props interface for the Results component
interface ResultsProps {
  isComplete: boolean; // Indicates if the results should be displayed
  timeElapsed: number; // Time taken for the task
  calculateWPM: () => string; // Function to calculate words per minute
  calculateAccuracy: () => string; // Function to calculate accuracy percentage
  correctAndWrongWords: { correctWords: number; wrongWords: number }; // Object containing correct and wrong word counts
  keystrokes: { correctKeystrokes: number; wrongKeystrokes: number }; // Object containing correct and wrong keystroke counts
  darkMode: boolean; // Flag for dark mode styling
  // Optional typing history data for charts
  typingHistory?: {
    wpm: number[];
    accuracy: number[];
    timestamps: string[];
  };
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
  // State for copy and screenshot feedback
  const [copied, setCopied] = useState(false);
  const [screenshotTaken, setScreenshotTaken] = useState(false);

  // Ref for the chart container
  const chartRef = useRef<HTMLDivElement>(null);

  // Get values for metrics
  const wpmValue = parseFloat(calculateWPM());
  const accuracyValue = parseFloat(calculateAccuracy());
  const timeValue = timeElapsed;
  const correctWordsValue = correctAndWrongWords.correctWords;
  const wrongWordsValue = correctAndWrongWords.wrongWords;
  const correctKeystrokesValue = keystrokes.correctKeystrokes;
  const wrongKeystrokesValue = keystrokes.wrongKeystrokes;

  // Format current date and time for display
  const formatCurrentDateTime = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    const dateStr = now.toLocaleDateString(undefined, dateOptions);
    const timeStr = now.toLocaleTimeString(undefined, timeOptions);

    return `${dateStr} at ${timeStr}`;
  };

  // Get formatted date and time
  const currentDateTime = formatCurrentDateTime();

  // Define chart data for all metrics in a single chart
  const allMetricsChartData = {
    labels: [
      `WPM : ${wpmValue.toFixed(2)}`,
      `Accuracy : ${accuracyValue.toFixed(2)}%`,
      `Time : ${timeValue}s`,
      `Correct Words : ${correctWordsValue}`,
      `Wrong Words : ${wrongWordsValue}`,
      `Correct Keys : ${correctKeystrokesValue}`,
      `Wrong Keys : ${wrongKeystrokesValue}`,
    ],
    datasets: [
      {
        data: [
          wpmValue,
          accuracyValue,
          timeValue,
          correctWordsValue,
          wrongWordsValue,
          correctKeystrokesValue,
          wrongKeystrokesValue,
        ],
        backgroundColor: [
          darkMode ? "rgba(34, 197, 94, 0.85)" : "rgba(22, 163, 74, 0.85)", // WPM - Green
          darkMode ? "rgba(168, 85, 247, 0.85)" : "rgba(126, 34, 206, 0.85)", // Accuracy - Purple
          darkMode ? "rgba(59, 130, 246, 0.85)" : "rgba(37, 99, 235, 0.85)", // Time - Blue
          darkMode ? "rgba(34, 197, 94, 0.85)" : "rgba(22, 163, 74, 0.85)", // Correct Words - Teal
          darkMode ? "rgba(239, 68, 68, 0.85)" : "rgba(220, 38, 38, 0.85)", // Wrong Words - Red
          darkMode ? "rgba(34, 197, 94, 0.85)" : "rgba(22, 163, 74, 0.85)", // Correct Keystrokes - Dark Green
          darkMode ? "rgba(239, 68, 68, 0.85)" : "rgba(220, 38, 38, 0.85)", // Wrong Keystrokes - Amber
        ],
        borderColor: [
          darkMode ? "rgb(34, 197, 94)" : "rgb(22, 163, 74)", // WPM
          darkMode ? "rgb(168, 85, 247)" : "rgb(126, 34, 206)", // Accuracy
          darkMode ? "rgb(59, 130, 246)" : "rgb(37, 99, 235)", // Time
          darkMode ? "rgb(34, 197, 94)" : "rgb(22, 163, 74)", // Correct Words
          darkMode ? "rgb(239, 68, 68)" : "rgb(220, 38, 38)", // Wrong Words
          darkMode ? "rgb(34, 197, 94)" : "rgb(22, 163, 74)", // Correct Keystrokes
          darkMode ? "rgb(239, 68, 68)" : "rgb(220, 38, 38)", // Wrong Keystrokes
        ],
        borderWidth: 2,
        borderRadius: 6,
        // Responsive bar sizing - increased for better visibility
        barThickness: 35,
        maxBarThickness: 40,
        barPercentage: 0.95,
        categoryPercentage: 0.95,
      },
    ],
  };

  // Function to get font size based on screen width
  const getFontSize = () => {
    if (typeof window !== 'undefined') {
      // Larger font sizes for better readability
      return window.matchMedia('(min-width: 768px)').matches ? 18 : 14;
    }
    return 14; // Default for SSR
  };


  // Set chart options based on dark mode
  // Use ChartOptions type for proper typing
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 25, // Increased padding at the bottom to ensure x-axis labels are visible
        right: 2,
        left: 2,
        top: 2,
      }
    },
    indexAxis: 'y' as const, // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        border: {
          display: true,
          width: 1,
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 16, // Increased font size for better visibility
            weight: 'bold',
            lineHeight: 1.5, // Increased line height for better spacing
          },
          stepSize: 5,
          padding: 20, // Increased padding to ensure x-axis labels like 5, 10, 15 are visible
          // Ensure labels are inside the chart area
          maxRotation: 0,
          minRotation: 0,
          includeBounds: true,
          // Force display of specific values (0, 5, 10, 15, etc.)
          callback: function(tickValue: string | number) {
            // Only show multiples of 5
            const value = Number(tickValue);
            return value % 5 === 0 ? value.toString() : '';
          },
        },
        // Add padding to the chart to ensure labels are visible
        afterFit: (context: { paddingBottom: number }) => {
          context.paddingBottom = 30; // Increased padding to ensure x-axis labels are fully visible
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          width: 1,
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
          font: {
            weight: 'bold' as const,
            // Responsive font size based on media query class
            size: getFontSize(),
            lineHeight: 1.4,
          },
          padding: 12,
          // Ensure labels fit on mobile
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          // Add color to y-axis labels based on their corresponding bar colors
          callback: function(_value: string | number, index: number): string {
            // Return the original label with enhanced styling
            return allMetricsChartData.labels[index] as string;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Hide legend since we're including values in the labels
      },
      tooltip: {
        // Minimal border-only tooltip styling
        borderColor: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
        borderWidth: 1,
        displayColors: false,
        position: 'nearest',
        callbacks: {
          // Customize tooltip title - extract just the metric name without the value
          title: function(tooltipItems: TooltipItem<'bar'>[]): string {
            const index = tooltipItems[0].dataIndex;
            const fullLabel = allMetricsChartData.labels[index] as string;
            const metricName = fullLabel.split(' - ')[0];
            return metricName;
          },
          // Customize tooltip label - don't show the value
          label: function(): string {
            return '';
          },
          // Remove the default tooltip label
          afterLabel: function(): string {
            return '';
          }
        },
      },
    },
  };

  // If the task is not complete, do not render the results
  if (!isComplete) return null;

  // Function to generate sharing text
  const generateShareText = () => {
    return `🎯 Check my typing results at Finger Typing!

⚡ Speed: ${calculateWPM()} WPM
✨ Accuracy: ${calculateAccuracy()}%
⌚ Time: ${timeElapsed}s

📊 Others Stats:
✅ Correct Words: ${correctAndWrongWords.correctWords}
❌ Wrong Words: ${correctAndWrongWords.wrongWords}
✅ Correct Letters: ${keystrokes.correctKeystrokes}
❌ Wrong Letters: ${keystrokes.wrongKeystrokes}

📅 ${currentDateTime}

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

  // Function to take screenshot of the chart
  const takeScreenshot = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: darkMode ? '#374151' : '#f9fafb', // Match the chart background
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true
      });

      // Get the image data URL with the standard MIME type
      const imageDataUrl = canvas.toDataURL('image/png');

      // 1. Create a download link for downloading the image
      const link = document.createElement('a');
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '-');
      link.download = `fingertyping-results-${dateStr}-${timeStr}.png`;
      link.href = imageDataUrl;
      link.click();

      // 2. Try to copy the image to clipboard using a more compatible approach
      try {
        // For browsers that support the newer clipboard API
        if (navigator.clipboard) {
          try {
            // First try to copy the image data URL as text
            // This is more widely supported across browsers
            await navigator.clipboard.writeText(imageDataUrl);
            console.log('Image data URL copied to clipboard');
          } catch (textErr) {
            console.warn('Text clipboard failed:', textErr);

            // If text copying fails, try the blob approach as fallback
            try {
              canvas.toBlob(async (blob) => {
                if (blob) {
                  try {
                    // Use the standard MIME type
                    const clipboardItem = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([clipboardItem]);
                    console.log('Image copied to clipboard using Clipboard API');
                  } catch (clipErr) {
                    console.warn('Clipboard API failed:', clipErr);
                  }
                }
              }, 'image/png');
            } catch (blobErr) {
              console.warn('Blob creation failed:', blobErr);
            }
          }
        } else {
          // Fallback for older browsers
          console.warn('Clipboard API not supported in this browser');
        }
      } catch (clipboardErr) {
        // If all clipboard methods fail, just log it but don't interrupt the flow
        console.warn('Could not copy to clipboard:', clipboardErr);
      }

      // Show success feedback
      setScreenshotTaken(true);
      setTimeout(() => setScreenshotTaken(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to take screenshot: ', err);
    }
  };

  // Function to handle social sharing
  const handleShare = (platform: 'facebook' | 'twitter' | 'reddit' | 'linkedin' | 'telegram' | 'whatsapp' | 'messenger') => {
    const url = 'https://fingertyping.com';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        // Basic Facebook share
        shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I typed ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on ${currentDateTime}! 🚀`)}`;
        break;
      case 'twitter':
        // Twitter with hashtags
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just achieved ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on @FingerTyping on ${currentDateTime}! 🎯`)}&url=${encodeURIComponent(url)}&hashtags=typing,speedtyping,typingtest`;
        break;
      case 'reddit':
        // Reddit with more details
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`[Achievement] ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on FingerTyping on ${currentDateTime}!`)}`;
        break;
      case 'linkedin':
        // LinkedIn with professional tone
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`Improved my typing skills to ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on ${currentDateTime}`)}`;
        break;
      case 'telegram':
        // Telegram with full details
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out my typing speed: ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on ${currentDateTime}! 🎯`)}`;
        break;
      case 'whatsapp':
        // WhatsApp with friendly message
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! I just achieved ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on FingerTyping on ${currentDateTime}! Try to beat my score: ${url} 🎮`)}`;
        break;
      default:
        // Default case
        shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I typed ${calculateWPM()} WPM with ${calculateAccuracy()}% accuracy on ${currentDateTime}! 🚀`)}`;
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
      {/* Charts Section */}
      <div className="w-full">
        <div className="mb-1">
          {/* All Metrics Chart */}
          <div
            ref={chartRef}
            className={`rounded-lg py-6 pb-10 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
            style={{ height: 'auto', minHeight: '400px', maxHeight: '550px', maxWidth: '100%', overflow: 'visible' }}
          >
            <h3 className={`mb-1 md:mb-1 text-center text-sm md:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              Finger Typing Results
            </h3>
            <p className={`text-center text-md md:text-md mt-2 ${darkMode ? "text-green-500" : "text-green-500"}`}>
              {currentDateTime}
            </p>
            <Bar data={allMetricsChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Share Results Section */}
      <div className="mt-1 w-full rounded-lg bg-opacity-50 p-4">
        <p
          className={`mb-3 text-center text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}
        >
          Share Your Results On Social Media
        </p>
        {/* Copy to Clipboard Button - Minimal Improved Version */}
        <div className="mb-4 flex w-full flex-row items-center justify-center gap-3">
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

          <button
            onClick={takeScreenshot}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-medium transition-all ${
              screenshotTaken
                ? darkMode
                  ? "border-green-500 text-green-500"
                  : "border-green-500 text-green-500"
                : darkMode
                  ? "border-gray-500 text-gray-200 hover:border-gray-400"
                  : "border-gray-300 text-gray-800 hover:border-gray-500"
            }`}
            aria-label="Take screenshot of results and copy to clipboard"
            disabled={screenshotTaken}
          >
            {screenshotTaken ? (
              <>
                <span className="text-lg">✓</span>
                <span>Saved!</span>
              </>
            ) : (
              <>
                <span className="text-lg">📸</span>
                <span>Screenshot</span>
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

        </div>
      </div>
    </div>
  );
};

export default Results;
