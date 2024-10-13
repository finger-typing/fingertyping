import Link from 'next/link';
import { FaArrowLeft, FaBookOpen } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Typing Websites ",
    slug: "top-10-typing-website",
    excerpt:
      "Improving your typing skills can significantly boost your productivity and efficiency in today's digital world. Here's a list of the top 10 typing websites that can help you enhance your typing speed and accuracy.",
    category: "Resources",
  },
  {
    id: 2,
    title: "The Art of Finger Typing",
    slug: "art-of-finger-typing",
    excerpt:
      "Discover the secrets to efficient and accurate typing without looking at the keyboard.",
    category: "Techniques",
  },
  {
    id: 3,
    title: "Importance of Daily Typing Practice",
    slug: "importance-Of-Daily-Typing-Practice",
    excerpt:
      "Daily typing practice is essential for improving your speed and accuracy. Learn how to make the most of your practice sessions.",
    category: "Tips",
  },
  {
    id: 4,
    title: "The importance of clean interface",
    slug: "importance-of-clean-interface",
    excerpt:
      "A clean interface is crucial for effective typing practice. Discover how it can enhance your focus and improve your overall performance.",
    category: "User Experience",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <FaArrowLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-5xl font-extrabold mb-4 text-center text-gray-800">
            Finger Typing Blog
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Enhance your typing skills with our expert tips and resources
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <FaBookOpen className="text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="text-blue-600 font-semibold inline-flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
