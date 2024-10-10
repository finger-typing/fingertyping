import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Finger Typing - Secure and Fast",
  description: "Secure and ads-free typing on FingerTyping. In Finger Typing With your 10 fast finger, improve your typing speed and accuracy with our comprehensive typing lessons and tests.",
  keywords: ["typing practice","typeing","fast typing", "typing","offline typeing app","finger typing", "10 fast fingers", "touch typing", "typing speed", "typing lessons", "typing tests", "improve typing", "keyboard skills", "secure typing app", "open source typing", "privacy-focused typing", "ad-free typing practice", "faster typing", "typing website", "typing practice app", "typing exercises", "typing games", "typing software", "keyboard training", "typing tutor", "speed typing", "typing test online", "fast typing techniques", "improve typing accuracy", "beginner typing lessons", "advanced typing courses", "typing competition", "touch typing practice", "typing drills", "typing improvement tips", "online typing challenges", "typing performance", "mobile typing practice", "typing accuracy tests", "high-speed typing"],
  authors: [{ name: "FingerTyping Team" }],
  creator: "FingerTyping",
  publisher: "FingerTyping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Finger Typing - Secure, Fast, and Private Typing Practice",
    description: "Secure and ads-free typing on FingerTyping. In Finger Typing With your 10 fast finger, improve your typing speed and accuracy with our comprehensive typing lessons and tests.",
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",
    images: [
      {
        url: "https://www.fingertyping.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "FingerTyping - Improve Your Typing Skills",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FingerTyping - Secure, Fast, and Private Typing Practice",
    description: "Secure and ads-free typing on FingerTyping. In Finger Typing With your 10 fast finger, improve your typing speed and accuracy with our comprehensive typing lessons and tests.",
    images: [
      {
        url: "https://www.fingertyping.com/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "FingerTyping - Improve Your Typing Skills",
      },
    ],
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
  alternates: {
    canonical: "https://www.fingertyping.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
              description: "Secure and ads-free typing on FingerTyping. In Finger Typing With your 10 fast finger, improve your typing speed and accuracy with our comprehensive typing lessons and tests.",
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