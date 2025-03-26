import Link from "next/link";
import Head from "next/head";
import {
  FaCheckCircle,
  FaUserShield,
  FaGlobe,
  FaCog,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      <Head>
        <title>About Finger Typing </title>
        <meta
          name="description"
          content="Learn about Finger Typing, a open source, typing website for free, privacy-focused platform."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FingerTyping",
              "description": "Open source , Free multilingual typing practice platform",
              "url": "https://fingertyping.com",
              "sameAs": [
                "https://twitter.com/fingertyping",
                "https://www.facebook.com/fingertyping",
                "https://www.linkedin.com/company/fingertyping"
              ]
            }
          `}
        </script>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/"
              className="inline-block text-indigo-400 transition duration-300 hover:text-indigo-300"
            >
              ← Back to Home
            </Link>
          </nav>

          <h1 className="mb-16 text-center text-5xl font-extrabold text-white">
            About FingerTyping
          </h1>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-white">
              Our Mission
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-300">
              At{" "}
              <span className="font-semibold text-indigo-400 mr-1">
                FingerTyping
              </span>
              We want to make a typing website which is complete free ,open
              source, and secure, no data are taken from users. Also main
              important is easy to use. Thats why we are making this website.
              Out GitHub repository is we are revolutionizing typing practice.
              Our goal is to make high-quality, multilingual typing training
              accessible to everyone, completely free of charge. Check our,
              <Link href="https://github.com/finger-typing/fingertyping" className="mx-2 text-indigo-400 hover:underline">
                  Github repository
              </Link>
              contribute as you wish.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-white">
              What Sets Us Apart
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  icon: <FaCheckCircle className="text-green-400" aria-hidden="true" />,
                  title: "100% Free",
                  description:
                    "All features available to everyone, no hidden fees or premium tiers.",
                },
                {
                  icon: <FaUserShield className="text-blue-400" aria-hidden="true" />,
                  title: "Privacy-Focused",
                  description:
                    "We don't track personal information or typing data. Your practice stays private.",
                },
                {
                  icon: <FaGlobe className="text-purple-400" aria-hidden="true" />,
                  title: "Multilingual",
                  description:
                    "Practice typing in over 150 languages, from common to rare scripts.",
                },
                {
                  icon: <FaCog className="text-orange-400" aria-hidden="true" />,
                  title: "Customizable",
                  description:
                    "Set your own time limits, choose custom texts, and tailor your learning experience.",
                },
                {
                  icon: <FaChartLine className="text-red-400" aria-hidden="true" />,
                  title: "Progress Tracking",
                  description:
                    "Monitor your improvement with detailed statistics and performance insights.",
                },
                {
                  icon: <FaComments className="text-yellow-400" aria-hidden="true" />,
                  title: "Community-Driven",
                  description:
                    "Easy feedback system to shape our platform and connect with fellow typists.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
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

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-white">
              Privacy and Security
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-300">
              At FingerTyping, your privacy is our top priority. We have
              designed our platform with security at its core:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-3 text-xl text-gray-300">
              <li>No account required to access full functionality</li>
              <li>No cookies or tracking technologies used</li>
              <li>No collection or storage of personal information</li>
              <li>Transparent privacy policy with no hidden clauses</li>
            </ul>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-white">
              Our Vision for the Future
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-300">
              At FingerTyping, we are constantly innovating to provide the best
              typing practice experience. Our future plans include:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-3 text-xl text-gray-300">
              <li>
                Expanding our language offerings to cover even more scripts and
                dialects
              </li>
              <li>Developing AI-powered personalized learning paths</li>
              <li>
                Creating collaborative typing challenges for classrooms and
                workplaces
              </li>
              <li>
                Integrating voice-to-text features for comprehensive
                communication training
              </li>
              <li>Launching mobile apps for on-the-go practice</li>
            </ul>
            <p className="text-xl leading-relaxed text-gray-300">
              We are committed to evolving with technology and user needs,
              always keeping our core values of accessibility, privacy, and
              quality at the forefront.
            </p>
          </section>

          <footer className="mt-16 text-center text-gray-400">
            <p className="mb-2 text-2xl font-bold text-indigo-400">
              Happy Typing!
            </p>
            <p className="mb-4">
              From all of us at FingerTyping, we wish you swift keys and
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
    </>
  );
}
