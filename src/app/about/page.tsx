import Link from 'next/link';
import Head from 'next/head';
import { FaCheckCircle, FaUserShield, FaGlobe, FaCog, FaChartLine, FaComments, FaKeyboard, FaLightbulb, FaRocket, FaBook, FaHandshake, FaLaptop, FaMedal } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>About Finger Typing </title>
        <meta name="description" content="Learn about FingerTyping, the free, privacy-focused platform for improving your typing skills in over 150 languages. Discover our features, mission, and community." />
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
      <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 transition duration-300 inline-block">
              ← Back to Home
            </Link>
          </nav>
          
          <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-16">About FingerTyping</h1>
          
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              At <span className="font-semibold text-indigo-600">FingerTyping</span>, we are revolutionizing typing practice. Our goal is to make high-quality, multilingual typing training accessible to everyone, completely free of charge.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              With support for over <span className="font-semibold">150 languages</span> and a commitment to user privacy, FingerTyping is your trusted platform for improving typing speed and accuracy. Check out our <Link href="/languages" className="text-indigo-600 hover:underline">supported languages</Link>.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe that in today is digital age, proficient typing is more than just a skill, it is a necessity. Our mission is to empower individuals worldwide to communicate efficiently and effectively through the power of touch typing. Learn more about the <Link href="/blog/importance-of-daily-typing-practice" className="text-indigo-600 hover:underline">importance of daily typing practice</Link>.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: <FaCheckCircle className="text-green-500" aria-hidden="true" />, title: "100% Free", description: "All features available to everyone, no hidden fees or premium tiers." },
                { icon: <FaUserShield className="text-blue-500" aria-hidden="true" />, title: "Privacy-Focused", description: "We don't track personal information or typing data. Your practice stays private." },
                { icon: <FaGlobe className="text-purple-500" aria-hidden="true" />, title: "Multilingual", description: "Practice typing in over 150 languages, from common to rare scripts." },
                { icon: <FaCog className="text-orange-500" aria-hidden="true" />, title: "Customizable", description: "Set your own time limits, choose custom texts, and tailor your learning experience." },
                { icon: <FaChartLine className="text-red-500" aria-hidden="true" />, title: "Progress Tracking", description: "Monitor your improvement with detailed statistics and performance insights." },
                { icon: <FaComments className="text-yellow-500" aria-hidden="true" />, title: "Community-Driven", description: "Easy feedback system to shape our platform and connect with fellow typists." },
                { icon: <FaKeyboard className="text-indigo-500" aria-hidden="true" />, title: "Multiple Layouts", description: "Support for various keyboard layouts including QWERTY, AZERTY, and Dvorak." },
                { icon: <FaLightbulb className="text-pink-500" aria-hidden="true" />, title: "Adaptive Learning", description: "Our system adjusts to your skill level, providing appropriate challenges." },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy and Security</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              At FingerTyping, your privacy is our top priority. We have designed our platform with security at its core:
            </p>
            <ul className="list-disc list-inside space-y-3 text-xl text-gray-700 mb-6">
              <li>No account required to access full functionality</li>
              <li>No cookies or tracking technologies used</li>
              <li>No collection or storage of personal information</li>
              <li>Transparent privacy policy with no hidden clauses</li>
              <li>All typing data is processed locally in your browser</li>
              <li>No third-party analytics or advertising scripts</li>
              <li>Regular security audits to ensure data protection</li>
            </ul>
            <p className="text-xl text-gray-700 leading-relaxed">
              Practice with confidence, knowing your typing sessions are completely private and secure. We believe that improving your skills should not come at the cost of your personal data.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Comprehensive Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Typing Lessons</h3>
                <p className="text-lg text-gray-700 mb-4">
                  From beginner to advanced, our structured lessons cater to all skill levels. Learn proper finger placement, improve accuracy, and increase your typing speed gradually.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Custom Practice Texts</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Choose from our vast library of texts or input your own. Practice with content that interests you, from literature excerpts to technical documents.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Real-time Feedback</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Get instant feedback on your typing performance. Identify areas for improvement and track your progress over time with detailed analytics.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Typing Games</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Make learning fun with our collection of typing games. Challenge yourself and others while improving your skills in an engaging way.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Customizable Practice Sessions</h3>
                <p className="text-lg text-gray-700 mb-4">
                  Tailor your practice sessions to your needs. Set time limits, choose specific focus areas, and create personalized drills to target your weaknesses.
                </p>
              </div>
              
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The FingerTyping Community</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Join a vibrant community of typing enthusiasts from around the world. Share tips, participate in challenges, and celebrate milestones together.
            </p>
            <div className="flex flex-wrap items-center justify-center space-x-8 mb-8">
              {/* <div className="text-center mb-4">
                <FaUsers className="text-5xl text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">1M+</p>
                <p className="text-lg text-gray-700">Active Users</p>
              </div> */}
              <div className="text-center mb-4">
                <FaGlobe className="text-5xl text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">100+</p>
                <p className="text-lg text-gray-700">Languages</p>
              </div>
              <div className="text-center mb-4">
                <FaRocket className="text-5xl text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">50%</p>
                <p className="text-lg text-gray-700">Avg. Speed Increase</p>
              </div>
              <div className="text-center mb-4">
                <FaMedal className="text-5xl text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-lg text-gray-700">Daily Challenges Completed</p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Typing Skills Matter</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              In today is digital world, proficient typing is more crucial than ever. Here is why developing your typing skills with FingerTyping can make a significant difference:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                  <FaLaptop className="inline-block mr-2" />
                  Increased Productivity
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Faster typing means more efficient work. Save time on daily tasks and focus on what really matters.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                  <FaBook className="inline-block mr-2" />
                  Enhanced Learning
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Improved typing skills can boost your ability to take notes, conduct research, and engage in online learning.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                  <FaHandshake className="inline-block mr-2" />
                  Better Communication
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Express yourself more effectively in emails, chats, and online forums with improved typing speed and accuracy.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                  <FaRocket className="inline-block mr-2" />
                  Career Advancement
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Many careers require strong typing skills. Stand out in the job market with your proficiency.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision for the Future</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              At FingerTyping, we are constantly innovating to provide the best typing practice experience. Our future plans include:
            </p>
            <ul className="list-disc list-inside space-y-3 text-xl text-gray-700 mb-6">
              <li>Expanding our language offerings to cover even more scripts and dialects</li>
              <li>Developing AI-powered personalized learning paths</li>
              <li>Creating collaborative typing challenges for classrooms and workplaces</li>
              <li>Integrating voice-to-text features for comprehensive communication training</li>
              <li>Launching mobile apps for on-the-go practice</li>
            </ul>
            <p className="text-xl text-gray-700 leading-relaxed">
              We are committed to evolving with technology and user needs, always keeping our core values of accessibility, privacy, and quality at the forefront.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Start Your Typing Journey</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Whether you are a beginner looking to master the basics or an expert aiming to break speed records, FingerTyping adapts to your skill level. Join thousands of users experiencing the benefits of regular, privacy-focused typing practice. Check out our <Link href="/lessons" className="text-indigo-600 hover:underline">typing lessons</Link> or jump into a <Link href="/" className="text-indigo-600 hover:underline">practice session</Link>.
            </p>
            <div className="text-center">
              <Link href="/learn" className="inline-block bg-indigo-600 text-white text-xl font-semibold py-4 px-8 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl">
                Start Typing Now
              </Link>
            </div>
          </section>

          <footer className="text-center text-gray-600 mt-16">
            <p className="text-2xl font-bold text-indigo-600 mb-2">Happy Typing!</p>
            <p className="mb-4">From all of us at FingerTyping, we wish you swift keys and accurate strokes.</p>
            <nav className="mb-4">
              <Link href="/privacy" className="text-indigo-600 hover:underline mr-4">Privacy Policy</Link>
              <Link href="/terms" className="text-indigo-600 hover:underline mr-4">Terms of Service</Link>
              <Link href="/contact" className="text-indigo-600 hover:underline">Contact Us</Link>
            </nav>
          
          </footer>
        </div>
      </main>
    </>
  );
}