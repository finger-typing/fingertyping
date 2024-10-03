import Link from 'next/link';

const blogPosts = [
  { id: 1, title: 'The Art of Finger Typing', slug: 'art-of-finger-typing', excerpt: 'Discover the secrets to efficient and accurate typing without looking at the keyboard.' },
  { id: 2, title: 'Imporving of daily Typing', slug: 'importanceOfDailyTypingPracticePage', excerpt: 'Daily Typing is essential for improving your typing speed and accuracy. Learn how to make the most of your practice sessions.' },
  {id: 3, title: "Importance of clean interface for typing practice", slug: 'improveTypingPosturePage', excerpt: 'Clean interface is essential for improving your typing speed and accuracy. Learn how to make the most of your practice sessions.' },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center">FingerTypeing Blog</h1>
        <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
      
    </div>
  );
}