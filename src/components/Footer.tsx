import React from "react";

import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaRedditAlien,
} from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  const socialLinks = [
    {
      icon: FaTwitter,
      href: `https://twitter.com/share?url=https://fingertyping.com&text=Check out this awesome typing tool!`,
    },
    {
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=https://fingertyping.com`,
    },
    {
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=https://fingertyping.com&title=FingerTyping.com&summary=Improve your typing skills!`,
    },
    {
      icon: FaTelegramPlane,
      href: `https://telegram.me/share/url?url=https://fingertyping.com&text=Check out this awesome typing tool!`,
    },
    {
      icon: FaRedditAlien,
      href: `https://www.reddit.com/submit?url=https://fingertyping.com&title=Check out this awesome typing tool!`,
    },
    {
      icon: BsMessenger,
      href: `https://www.facebook.com/dialog/send?link=https://fingertyping.com`,
    },
  ];

  return (
    <footer className="w-full py-8 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} FingerTyping
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
