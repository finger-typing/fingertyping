import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FingerTyping - Secure and Fast",
  description: "Secure, ad-free, fast typing practice with 10 fast fingers on FingerTyping. Improve your typing speed and accuracy with our comprehensive typing lessons and tests.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "typing", "typeing", "typing practice", "finger typing", "10 fast fingers", 
    "touch typing", "typing speed", "typing lessons", "typing tests", 
    "improve typing", "keyboard skills", "secure typing app", "open source typing", 
    "privacy-focused typing", "ad-free typing practice", "faster typing", 
    "typeing website", "bangla typeing", "urdu typeing", "hindi typeing", 
    "arabic typeing", "chinese typeing", "typing practice app", "typing exercises", 
    "typing games", "typing software", "keyboard training", "typing tutor", 
    "speed typing", "typing test online", "fast typing techniques", 
    "improve typing accuracy", "beginner typing lessons", "advanced typing courses", 
    "typing competition", "touch typing practice", "typing drills", 
    "typing improvement tips", "online typing challenges", "typing performance", 
    "mobile typing practice", "typing accuracy tests", "high-speed typing"
  ],
  authors: [{ name: "FingerTyping Team" }],
  creator: "FingerTyping",
  publisher: "FingerTyping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FingerTyping - Secure, Fast, and Private Typing Practice",
    description: "A secure, ad-free, typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",
    images: [
      {
        url: "https://www.fingertyping.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FingerTyping - Secure, Fast, and Private Typing Practice",
    description: "A secure, ad-free typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
    images: ["https://www.fingertyping.com/og-image.png"],
    creator: "@fingertyping",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.fingertyping.com" />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FingerTyping",
              url: "https://www.fingertyping.com",
              logo: "https://www.fingertyping.com/logo.png",
              description: "A secure, ads-free typing practice app. With your 10 fast finger complete comprehensive lessons and tests to become a faster typist!",
              sameAs: [
                "https://www.facebook.com/fingertypingofficial",
                "https://t.me/fingertyping",
              ],
            }),
          }}
        />
        {children}
        <Footer darkMode={true} />
      </body>
    </html>
  );
}
