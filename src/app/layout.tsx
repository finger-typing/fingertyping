import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fingertyping.com"),
  title: {
    default: "Finger Typing - Open Source Typing Application",
    template: "%s | FingerTyping - Enhance Your Typing Skills",
  },
  description:
    "Finger Typing: An Open-Source, Free Typing Application Designed For Simplicity And Features. No ads, No tracking, Just Pure Typing.",
  keywords: [
    "typing practice",
    "typing lessons",
    "typing speed",
    "typing accuracy",
    "open source typing",
    "secure typing",
    "free typing lessons",
    "typing tests",
    "typing exercises",
    "typing games",
    "typing practice software",
    "typing software",
    "finger typing",
    "learn to type",
    "typing tutor",
    "keyboarding skills",
    "touch typing",
    "typing improvement",
    "online typing",
  ],
  authors: [{ name: "Finger Typing Team" }],
  publisher: "Finger Typing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "Finger Typing - Open Source Typing Application",
    description:
          "Finger Typing: An Open-Source, Free Typing Application Designed For Simplicity And Features. No ads, No tracking, Just Pure Typing.",

    locale: "en_US",
    images: ["https://www.fingertyping.com/og-image.png"],
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",

  },
  twitter: {
    card: "summary_large_image",
    title: "Finger Typing - Open Source Typing Application",
    site: "@fingertyping",
    description:
         "Finger Typing: An Open-Source, Free Typing Application Designed For Simplicity And Features. No ads, No tracking, Just Pure Typing.",

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
  alternates: {
    canonical: "https://www.fingertyping.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "FingerTyping",
              applicationCategory: "EducationalApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Finger Typing: An Open-Source, Free Typing Application Designed For Simplicity And Features. No ads, No tracking, Just Pure Typing.",

              operatingSystem: "Any",
              browserRequirements:
                "Requires JavaScript and a modern web browser",
              url: "https://www.fingertyping.com",
              featureList: [
                "Typing lessons for all skill levels",
                "Customizable typing tests",
                "Open source typing website",
                "No ads, no tracking",
                "Real-time performance tracking",
                "Multiple language support",
                "Interactive typing games",
                "Open-source and community-driven",
              ],
              educationalUse: "Typing practice and skill development",
              isAccessibleForFree: true,
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AppProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}