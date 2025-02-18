// app/terms/page.tsx
import Link from "next/link";
export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/"
        className="mb-6 inline-block text-blue-500 hover:underline"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-8 text-center text-4xl font-bold">
        Terms and Conditions
      </h1>
      <p className="mb-6 text-lg leading-relaxed">
        Welcome to <span className="font-bold">FingerTyping</span>. By using our
        website and services, you agree to the following terms and conditions.
      </p>
      <h2 className="mb-4 text-2xl font-semibold">Usage of the Platform</h2>
      <p className="mb-6 text-lg leading-relaxed">
        You agree to use our platform for lawful purposes only. Any misuse,
        including but not limited to hacking, distributing malware, or using our
        platform for illegal activities, is strictly prohibited.
      </p>
      <h2 className="mb-4 text-2xl font-semibold">Intellectual Property</h2>
      <p className="mb-6 text-lg leading-relaxed">
        All content provided on FingerTyping, including but not limited to text,
        graphics, logos, and software, is the property of FingerTyping or its
        content suppliers and is protected by copyright laws.
      </p>
      <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
      <p className="mb-6 text-lg leading-relaxed">
        FingerTyping is not liable for any damages that may result from the use
        or inability to use our platform. We provide the platform as-is without
        any guarantees.
      </p>
      <h2 className="mb-4 text-2xl font-semibold">Changes to Terms</h2>
      <p className="text-lg leading-relaxed">
        We reserve the right to update these terms at any time. Any changes will
        be posted on this page. It is your responsibility to review these terms
        periodically.
      </p>
      <h2 className="mt-8 flex items-center justify-center text-2xl font-semibold text-yellow-500">
        😊 Happy Typing{" "}
      </h2>
    </div>
  );
}
