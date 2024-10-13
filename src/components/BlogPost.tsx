import Link from 'next/link';

interface BlogPostProps {
  title: string;
  introduction: string;
  children: React.ReactNode;
}

export default function BlogPost({ title, introduction, children }: BlogPostProps) {
  return (
    <div className="container mx-auto px-6 py-12 bg-gray-900">
      <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-6 inline-block">
        ← Back to Blog
      </Link>

      <article className="prose prose-invert lg:prose-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6">{title}</h1>

        <p className="text-lg text-gray-300 mb-8">
          {introduction}
        </p>

        {children}
      </article>
    </div>
  );
}
