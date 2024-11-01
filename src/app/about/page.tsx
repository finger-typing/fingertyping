import Link from "next/link";
import Head from "next/head";
import {
  FaCheckCircle,
  FaUserShield,
  FaGlobe,
  FaCog,
  FaChartLine,
  FaComments,
  FaKeyboard,
  FaLightbulb,
  FaRocket,
  FaBook,
  FaHandshake,
  FaLaptop,
  FaMedal,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      <Head>
        <title>About Finger Typing </title>
        <meta
          name="description"
          content="Learn about FingerTyping, the free, privacy-focused platform for improving your typing skills in over 150 languages. Discover our features, mission, and community."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FingerTyping",
              "description": "Free multilingual typing practice platform",
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
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/"
              className="inline-block text-indigo-600 transition duration-300 hover:text-indigo-800"
            >
              ← Back to Home
            </Link>
          </nav>

          <h1 className="mb-16 text-center text-5xl font-extrabold text-gray-900">
            About FingerTyping
          </h1>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              At{" "}
              <span className="font-semibold text-indigo-600">
                FingerTyping
              </span>
              , we are revolutionizing typing practice. Our goal is to make
              high-quality, multilingual typing training accessible to everyone,
              completely free of charge.
            </p>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              With support for over{" "}
              <span className="font-semibold">150 languages</span> and a
              commitment to user privacy, FingerTyping is your trusted platform
              for improving typing speed and accuracy. Check out our{" "}
              <Link
                href="/languages"
                className="text-indigo-600 hover:underline"
              >
                supported languages
              </Link>
              .
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              We believe that in today is digital age, proficient typing is more
              than just a skill, it is a necessity. Our mission is to empower
              individuals worldwide to communicate efficiently and effectively
              through the power of touch typing. Learn more about the{" "}
              <Link
                href="/blog/importance-of-daily-typing-practice"
                className="text-indigo-600 hover:underline"
              >
                importance of daily typing practice
              </Link>
              .
            </p>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              What Sets Us Apart
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  icon: (
                    <FaCheckCircle
                      className="text-green-500"
                      aria-hidden="true"
                    />
                  ),
                  title: "100% Free",
                  description:
                    "All features available to everyone, no hidden fees or premium tiers.",
                },
                {
                  icon: (
                    <FaUserShield
                      className="text-blue-500"
                      aria-hidden="true"
                    />
                  ),
                  title: "Privacy-Focused",
                  description:
                    "We don't track personal information or typing data. Your practice stays private.",
                },
                {
                  icon: (
                    <FaGlobe className="text-purple-500" aria-hidden="true" />
                  ),
                  title: "Multilingual",
                  description:
                    "Practice typing in over 150 languages, from common to rare scripts.",
                },
                {
                  icon: (
                    <FaCog className="text-orange-500" aria-hidden="true" />
                  ),
                  title: "Customizable",
                  description:
                    "Set your own time limits, choose custom texts, and tailor your learning experience.",
                },
                {
                  icon: (
                    <FaChartLine className="text-red-500" aria-hidden="true" />
                  ),
                  title: "Progress Tracking",
                  description:
                    "Monitor your improvement with detailed statistics and performance insights.",
                },
                {
                  icon: (
                    <FaComments
                      className="text-yellow-500"
                      aria-hidden="true"
                    />
                  ),
                  title: "Community-Driven",
                  description:
                    "Easy feedback system to shape our platform and connect with fellow typists.",
                },
                {
                  icon: (
                    <FaKeyboard
                      className="text-indigo-500"
                      aria-hidden="true"
                    />
                  ),
                  title: "Multiple Layouts",
                  description:
                    "Support for various keyboard layouts including QWERTY, AZERTY, and Dvorak.",
                },
                {
                  icon: (
                    <FaLightbulb className="text-pink-500" aria-hidden="true" />
                  ),
                  title: "Adaptive Learning",
                  description:
                    "Our system adjusts to your skill level, providing appropriate challenges.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Privacy and Security
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              At FingerTyping, your privacy is our top priority. We have
              designed our platform with security at its core:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-3 text-xl text-gray-700">
              <li>No account required to access full functionality</li>
              <li>No cookies or tracking technologies used</li>
              <li>No collection or storage of personal information</li>
              <li>Transparent privacy policy with no hidden clauses</li>
              <li>All typing data is processed locally in your browser</li>
              <li>No third-party analytics or advertising scripts</li>
              <li>Regular security audits to ensure data protection</li>
            </ul>
            <p className="text-xl leading-relaxed text-gray-700">
              Practice with confidence, knowing your typing sessions are
              completely private and secure. We believe that improving your
              skills should not come at the cost of your personal data.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Our Comprehensive Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  Typing Lessons
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  From beginner to advanced, our structured lessons cater to all
                  skill levels. Learn proper finger placement, improve accuracy,
                  and increase your typing speed gradually.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  Custom Practice Texts
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Choose from our vast library of texts or input your own.
                  Practice with content that interests you, from literature
                  excerpts to technical documents.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  Real-time Feedback
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Get instant feedback on your typing performance. Identify
                  areas for improvement and track your progress over time with
                  detailed analytics.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  Typing Games
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Make learning fun with our collection of typing games.
                  Challenge yourself and others while improving your skills in
                  an engaging way.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  Customizable Practice Sessions
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Tailor your practice sessions to your needs. Set time limits,
                  choose specific focus areas, and create personalized drills to
                  target your weaknesses.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              The FingerTyping Community
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              Join a vibrant community of typing enthusiasts from around the
              world. Share tips, participate in challenges, and celebrate
              milestones together.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center space-x-8">
              {/* <div className="text-center mb-4">
                <FaUsers className="text-5xl text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">1M+</p>
                <p className="text-lg text-gray-700">Active Users</p>
              </div> */}
              <div className="mb-4 text-center">
                <FaGlobe className="mx-auto mb-2 text-5xl text-indigo-600" />
                <p className="text-2xl font-bold text-gray-900">100+</p>
                <p className="text-lg text-gray-700">Languages</p>
              </div>
              <div className="mb-4 text-center">
                <FaRocket className="mx-auto mb-2 text-5xl text-indigo-600" />
                <p className="text-2xl font-bold text-gray-900">50%</p>
                <p className="text-lg text-gray-700">Avg. Speed Increase</p>
              </div>
              <div className="mb-4 text-center">
                <FaMedal className="mx-auto mb-2 text-5xl text-indigo-600" />
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-lg text-gray-700">
                  Daily Challenges Completed
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Why Typing Skills Matter
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              In today is digital world, proficient typing is more crucial than
              ever. Here is why developing your typing skills with FingerTyping
              can make a significant difference:
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  <FaLaptop className="mr-2 inline-block" />
                  Increased Productivity
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Faster typing means more efficient work. Save time on daily
                  tasks and focus on what really matters.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  <FaBook className="mr-2 inline-block" />
                  Enhanced Learning
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Improved typing skills can boost your ability to take notes,
                  conduct research, and engage in online learning.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  <FaHandshake className="mr-2 inline-block" />
                  Better Communication
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Express yourself more effectively in emails, chats, and online
                  forums with improved typing speed and accuracy.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-indigo-600">
                  <FaRocket className="mr-2 inline-block" />
                  Career Advancement
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Many careers require strong typing skills. Stand out in the
                  job market with your proficiency.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Our Vision for the Future
            </h2>
            <p className="mb-6 text-xl leading-relaxed text-gray-700">
              At FingerTyping, we are constantly innovating to provide the best
              typing practice experience. Our future plans include:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-3 text-xl text-gray-700">
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
            <p className="text-xl leading-relaxed text-gray-700">
              We are committed to evolving with technology and user needs,
              always keeping our core values of accessibility, privacy, and
              quality at the forefront.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Start Your Typing Journey
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-gray-700">
              Whether you are a beginner looking to master the basics or an
              expert aiming to break speed records, FingerTyping adapts to your
              skill level. Join thousands of users experiencing the benefits of
              regular, privacy-focused typing practice. Check out our{" "}
              <Link href="/lessons" className="text-indigo-600 hover:underline">
                typing lessons
              </Link>{" "}
              or jump into a{" "}
              <Link href="/" className="text-indigo-600 hover:underline">
                practice session
              </Link>
              .
            </p>
            <div className="text-center">
              <Link
                href="/learn"
                className="inline-block rounded-full bg-indigo-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition duration-300 hover:bg-indigo-700 hover:shadow-xl"
              >
                Start Typing Now
              </Link>
            </div>
          </section>

          <footer className="mt-16 text-center text-gray-600">
            <p className="mb-2 text-2xl font-bold text-indigo-600">
              Happy Typing!
            </p>
            <p className="mb-4">
              From all of us at FingerTyping, we wish you swift keys and
              accurate strokes.
            </p>
            <nav className="mb-4">
              <Link
                href="/privacy"
                className="mr-4 text-indigo-600 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="mr-4 text-indigo-600 hover:underline"
              >
                Terms of Service
              </Link>
              <Link href="/contact" className="text-indigo-600 hover:underline">
                Contact Us
              </Link>
            </nav>
          </footer>
        </div>
      </main>
    </>
  );
}
