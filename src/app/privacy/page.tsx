// app/privacy/page.tsx
import Link from "next/link";

// Privacy component for the privacy policy page
export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Back to Home link */}
      <Link
        href="/"
        className="mb-6 inline-block text-blue-500 hover:underline"
      >
        ← Back to Home
      </Link>

      {/* Privacy Policy content */}
      <h1 className="mb-8 text-center text-4xl font-bold">Privacy Policy</h1>

      {/* Introduction */}
      <p className="mb-6 text-lg leading-relaxed">
        At <span className="font-bold">FingerTyping</span>, we value your
        privacy and are committed to protecting your personal information. This
        Privacy Policy outlines how we collect, use, and safeguard your data.
      </p>

      {/* Information Collection and Use */}
      <h2 className="mb-4 text-2xl font-semibold">
        Information Collect and Use
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        We do not collect any personal information or data on our website.
      </p>

      {/* Cookies */}
      <h2 className="mb-4 text-2xl font-semibold">Cookies</h2>
      <p className="mb-6 text-lg leading-relaxed">
        We do not use cookies on our website.
      </p>

      {/* Data Security */}
      <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
      <p className="mb-6 text-lg leading-relaxed">
        We take data security seriously. We do not collect or sell or share your
        data with third parties.
      </p>

      {/* Closing message */}
      <h2 className="mb-4 flex items-center justify-center text-2xl font-semibold text-yellow-500">
        😊 Happy Typing{" "}
      </h2>
    </div>
  );
}
