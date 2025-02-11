import React, { useState } from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaRedditAlien,
  FaWhatsapp,
  FaFacebookMessenger,
  FaCopy,
  FaCheck,
} from "react-icons/fa6";

// Enhanced social sharing configuration
interface SocialPlatform {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  shareUrl: (url: string) => string;
}

interface ShareSectionProps {
  url?: string;
  title?: string;
  darkMode?: boolean;
  platforms?: string[];
}

const ShareSection: React.FC<ShareSectionProps> = ({
  url = "https://fingertyping.com",
  title = "Check out this amazing tool!",
  darkMode = false,
  platforms = [
    "twitter",
    "facebook",
    "linkedin",
    "telegram",
    "reddit",
    "whatsapp",
    "messenger",
  ],
}) => {
  const [copied, setCopied] = useState(false);

  // Comprehensive social platforms configuration
  const socialPlatforms: SocialPlatform[] = [
    {
      id: "twitter",
      icon: FaXTwitter,
      label: "X (Twitter)",
      color: "bg-black hover:bg-gray-900",
      shareUrl: (url) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      id: "facebook",
      icon: FaFacebookF,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      shareUrl: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      id: "linkedin",
      icon: FaLinkedinIn,
      label: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
      shareUrl: (url) =>
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
      id: "telegram",
      icon: FaTelegram,
      label: "Telegram",
      color: "bg-blue-500 hover:bg-blue-600",
      shareUrl: (url) =>
        `https://telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      id: "reddit",
      icon: FaRedditAlien,
      label: "Reddit",
      color: "bg-orange-600 hover:bg-orange-700",
      shareUrl: (url) =>
        `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      shareUrl: (url) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      id: "messenger",
      icon: FaFacebookMessenger,
      label: "Messenger",
      color: "bg-blue-500 hover:bg-blue-600",
      shareUrl: (url) =>
        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`,
    },
  ];

  // Copy to clipboard with improved user feedback
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  // Open share dialog
  const openShareDialog = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      } `}
    >
      <div className="mb-4">
        <h2 className="mb-2 text-2xl font-bold">Share This Tool And Contribute on GitHub</h2>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} `}
        >
          Help us grow! Share this tool with your network.
        </p>
      </div>

      {/* Social Share Icons */}
      <div className="mb-4 flex flex-wrap justify-center gap-3">
        {socialPlatforms
          .filter((platform) => platforms.includes(platform.id))
          .map((platform) => (
            <button
              key={platform.id}
              onClick={() => openShareDialog(platform.shareUrl(url))}
              className={`rounded-full p-3 transition-all duration-300 ${platform.color} text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              title={`Share on ${platform.label}`}
            >
              <platform.icon className="h-6 w-6" />
            </button>
          ))}
      </div>

      {/* Copy URL Button with State Feedback */}
      <button type="button" onClick={copyToClipboard} aria-label={copied ? "Link Copied" : "Copy Share Link"} disabled={copied} className={`flex w-full items-center justify-center rounded-lg px-3 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${ darkMode ? "border border-gray-500 bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600" : "border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300" } ${copied ? "pointer-events-none cursor-default bg-green-500 text-white" : ""} group relative overflow-hidden`} > <div className="flex items-center space-x-2"> {copied ? ( <> <FaCheck className="h-5 w-5 transform transition-transform text-white" /> <span className="font-semibold">Copied!</span> </> ) : ( <> <FaCopy className="h-5 w-5 transition-transform group-hover:scale-110" /> <span>Copy Share Link</span> </> )} </div> </button>
    </div>
  );
};

export default ShareSection;
