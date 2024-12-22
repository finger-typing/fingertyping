import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  viewportFit: "cover",
};

// Metadata for SEO and social media sharing
export const metadata: Metadata = {
  metadataBase: new URL('https://www.fingertyping.com'),
  title: {
    default: "Finger Typing - #1 Free Online Typing Practice & Speed Test",
    template: "%s | FingerTyping"
  },
  description:
    "Master touch typing with FingerTyping - The best free online typing practice and speed test platform. Improve your typing speed and accuracy with our secure, ad-free lessons. Perfect for beginners and advanced typists.",
  keywords: [
    "finger typing",
    "finger type",
    "typing practice",
    "typing test",
    "typing speed test",
    "touch typing",
    "typing tutor",
    "learn typing",
    "typing games",
    "typing lessons",
    "improve typing speed",
    "keyboard practice",
    "online typing",
    "free typing practice",
    "typing exercises"
  ],
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
    type: 'website',
    title: 'Finger Typing - #1 Free Online Typing Practice & Speed Test',
    description: 'Master touch typing with FingerTyping - The best free online typing practice and speed test platform.',
    images: ['/og-image.png'],
    url: "https://www.fingertyping.com",
    siteName: "FingerTyping",
    locale: "en_US",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finger Typing - #1 Free Online Typing Practice & Speed Test',
    description: 'Master touch typing with FingerTyping - The best free online typing practice and speed test platform.',
    images: ['/og-image.png'],
    creator: "@fingertyping",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.fingertyping.com',
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
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
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FingerTyping",
              "applicationCategory": "EducationalApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free online typing practice platform to improve typing speed and accuracy",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript",
              "url": "https://www.fingertyping.com"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <AppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
