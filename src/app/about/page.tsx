// Professional About page for FingerTyping.com – Company-style, highly informative, polished UI

import Link from "next/link";
import {
  FaCheckCircle,
  FaUserShield,
  FaGlobe,
  FaCog,
  FaChartLine,
  FaKeyboard,
  FaGithub,
  FaMobileAlt,
  FaUserFriends,
  FaLock,
  FaRocket,
  FaAward,
  FaUsers,
  FaHistory,
  FaBullseye,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";

export const metadata = {
  title: "About FingerTyping.com | Free, Open Source, Privacy-First Typing App",
  description:
    "Learn about FingerTyping.com, the leading open source, privacy-first typing platform. Discover our mission, vision, values, team, history, and commitment to free, secure, and accessible typing for all.",
  keywords:
    "finger typing, typing website, free typing app, open source, privacy, no tracking, typing lessons, single word typing, multilingual, best UI, typing practice, fingertyping.com, typing statistics, typing challenge, typing for kids, typing for adults, typing privacy, typing open source, typing platform, company, mission, vision, team, contributors, awards",
  openGraph: {
    title: "About FingerTyping.com | Free, Open Source, Privacy-First Typing App",
    description:
      "FingerTyping.com is a modern, open source, privacy-focused typing platform. Learn about our mission, vision, team, and commitment to free, secure, and accessible typing.",
    url: "https://fingertyping.com/about",
    siteName: "FingerTyping.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FingerTyping.com - Free Open Source Typing App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://fingertyping.com/about",
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-16">
        {/* Company Hero */}
        <section className="mb-20 text-center">
          <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-indigo-400 drop-shadow-lg">
            About <span className="text-white">FingerTyping.com</span>
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-2xl font-light text-gray-200">
            Empowering the world to type freely, securely, and efficiently.
            FingerTyping.com is the leading open source, privacy-first typing
            platform trusted by thousands globally.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/finger-typing/fingertyping"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-7 py-3 text-lg font-bold text-white shadow transition hover:bg-indigo-700"
            >
              <FaGithub className="mr-2" /> View on GitHub
            </a>
            <Link
              href="/lesson"
              className="inline-flex items-center rounded-lg bg-green-500 px-7 py-3 text-lg font-bold text-white shadow transition hover:bg-green-600"
            >
              <FaKeyboard className="mr-2" /> Start Typing Lessons
            </Link>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20 grid gap-10 md:grid-cols-3">
          <div className="rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <FaBullseye className="mx-auto mb-4 text-4xl text-indigo-400" />
            <h2 className="mb-2 text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-gray-300">
              To make high-quality, accessible, and secure typing education
              available to everyone, everywhere—completely free and open source.
            </p>
          </div>
          <div className="rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <FaLightbulb className="mx-auto mb-4 text-4xl text-yellow-300" />
            <h2 className="mb-2 text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-gray-300">
              To be the world’s most trusted and innovative typing platform,
              setting the standard for privacy, inclusivity, and user
              experience.
            </p>
          </div>
          <div className="rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <FaHandshake className="mx-auto mb-4 text-4xl text-green-400" />
            <h2 className="mb-2 text-2xl font-bold text-white">Our Values</h2>
            <ul className="mt-2 list-inside list-disc space-y-2 text-left text-gray-300">
              <li>Openness & Transparency</li>
              <li>Privacy & Security</li>
              <li>Accessibility & Inclusion</li>
              <li>Community Collaboration</li>
              <li>Continuous Innovation</li>
            </ul>
          </div>
        </section>

        {/* Timeline / History */}
        <section className="mb-20">
          <h2 className="mb-8 flex items-center justify-center gap-2 text-center text-3xl font-bold text-white">
            <FaHistory className="text-indigo-400" /> Our Journey
          </h2>
          <ol className="relative ml-4 border-l-4 border-indigo-500">
            <li className="mb-10 ml-6">
              <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 ring-4 ring-gray-900">
                <FaRocket className="text-white" />
              </span>
              <h3 className="text-xl font-semibold text-indigo-300">
                2024 – Project Launched
              </h3>
              <p className="text-gray-300">
                FingerTyping.com was founded to provide a free, privacy-focused
                alternative to commercial typing sites.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-4 ring-gray-900">
                <FaGlobe className="text-white" />
              </span>
              <h3 className="text-xl font-semibold text-green-300">
                2025 – Make Project Open Source
              </h3>
              <p className="text-gray-300">
                Added support for 100+ languages, making typing practice
                accessible worldwide.
              </p>
              <p className="text-gray-300">
                Recognized by open source communities for our commitment to
                privacy and accessibility.
              </p>
            </li>
            
          </ol>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Platform Highlights
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: (
                  <FaCheckCircle
                    className="text-green-400"
                    aria-hidden="true"
                  />
                ),
                title: "Completely Free & Open Source",
                description:
                  "All features are free forever. No subscriptions, no paywalls. 100% open source – contribute or inspect our code anytime.",
              },
              {
                icon: (
                  <FaUserShield className="text-blue-400" aria-hidden="true" />
                ),
                title: "Privacy-First, No Tracking",
                description:
                  "We never track you. No cookies, no analytics, no ads. Your typing data stays on your device.",
              },
              {
                icon: (
                  <FaGlobe className="text-purple-400" aria-hidden="true" />
                ),
                title: "Multilingual Typing",
                description:
                  "Practice typing in 100+ languages, including English, Bangla, Hindi, Urdu, and more. Perfect for polyglots and learners.",
              },
              {
                icon: <FaCog className="text-orange-400" aria-hidden="true" />,
                title: "Customizable Lessons",
                description:
                  "Choose from structured lessons, single word mode, or custom texts. Tailor your practice to your needs.",
              },
              {
                icon: (
                  <FaChartLine className="text-red-400" aria-hidden="true" />
                ),
                title: "Advanced Statistics",
                description:
                  "Track your speed, accuracy, and progress over time. Visualize your improvement with detailed charts.",
              },
              {
                icon: (
                  <FaMobileAlt className="text-pink-400" aria-hidden="true" />
                ),
                title: "Mobile Friendly",
                description:
                  "Enjoy a seamless typing experience on any device – desktop, tablet, or mobile.",
              },
              {
                icon: (
                  <FaUserFriends
                    className="text-yellow-400"
                    aria-hidden="true"
                  />
                ),
                title: "Community Driven",
                description:
                  "Suggest features, report bugs, or contribute code. Our platform evolves with your feedback.",
              },
              {
                icon: <FaLock className="text-gray-400" aria-hidden="true" />,
                title: "No Account Needed",
                description:
                  "Access all features instantly. No sign up, no login, no hassle.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="mt-1 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team / Contributors */}
        <section className="mb-20">
          <h2 className="mb-8 flex items-center justify-center gap-2 text-center text-3xl font-bold text-white">
            <FaUsers className="text-indigo-400" /> Meet Our Contributors
          </h2>
          <div className="mx-auto max-w-3xl rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <p className="mb-4 text-gray-300">
              FingerTyping.com is built and maintained by a passionate global
              community of developers, educators, and typists. We welcome
              contributions of all kinds—code, design, translations, and
              feedback.
            </p>
            <a
              href="https://github.com/finger-typing/fingertyping/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-indigo-500 px-6 py-2 font-bold text-white shadow transition hover:bg-indigo-600"
            >
              <FaGithub className="mr-2" /> View All Contributors
            </a>
          </div>
        </section>

        {/* Press & Recognition */}
        <section className="mb-20">
          <h2 className="mb-8 flex items-center justify-center gap-2 text-center text-3xl font-bold text-white">
            <FaAward className="text-yellow-400" /> Press & Recognition
          </h2>
          <div className="mx-auto max-w-3xl rounded-xl bg-gray-800 p-8 text-center shadow-lg">
            <p className="mb-2 text-gray-300">
              FingerTyping.com has been featured in open source and tech
              communities for its commitment to privacy, accessibility, and open
              collaboration.
            </p>
            <p className="text-sm text-gray-400">
              <em>
                “A model for privacy-first, open source education platforms.”
              </em>{" "}
              — Open Source Weekly
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-indigo-300">
                Is FingerTyping.com really free?
              </h3>
              <p className="text-gray-300">
                Yes! All features are free and always will be. No subscriptions,
                no paywalls.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-300">
                Do I need to create an account?
              </h3>
              <p className="text-gray-300">
                No account or login is required. Just start typing!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-300">
                Is my data safe?
              </h3>
              <p className="text-gray-300">
                Absolutely. We don’t collect, store, or share any personal or
                typing data. Your privacy is our priority.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-300">
                Can I contribute or suggest features?
              </h3>
              <p className="text-gray-300">
                Yes! Visit our{" "}
                <a
                  href="https://github.com/finger-typing/fingertyping"
                  className="text-indigo-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>{" "}
                to contribute or open an issue.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-300">
                What devices are supported?
              </h3>
              <p className="text-gray-300">
                FingerTyping.com works on all modern browsers, desktops,
                tablets, and smartphones.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-indigo-400">
            Ready to Improve Your Typing?
          </h2>
          <Link
            href="/lesson"
            className="inline-flex items-center rounded-lg bg-green-500 px-8 py-4 text-xl font-bold text-white shadow transition hover:bg-green-600"
          >
            <FaRocket className="mr-2" /> Start Practicing Now
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400">
          <p className="mb-2 text-2xl font-bold text-indigo-400">
            Happy Typing!
          </p>
          <p className="mb-4">
            From all of us at FingerTyping.com, we wish you swift keys and
            accurate strokes.
          </p>
          <nav className="mb-4">
            <Link
              href="/privacy"
              className="mr-4 text-indigo-400 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="mr-4 text-indigo-400 hover:underline"
            >
              Terms of Service
            </Link>
            <Link href="/contact" className="text-indigo-400 hover:underline">
              Contact Us
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
