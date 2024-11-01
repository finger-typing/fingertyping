import Link from "next/link";

interface BlogPostProps {
  title: string;
  introduction: string;
  children: React.ReactNode;
}

export default function BlogPost({
  title,
  introduction,
  children,
}: BlogPostProps) {
  return (
    <div className="container mx-auto bg-gray-900 px-6 py-12">
      <Link
        href="/blog"
        className="mb-6 inline-block text-blue-400 transition-colors duration-200 hover:text-blue-300"
      >
        ← Back to Blog
      </Link>

      <article className="prose prose-invert lg:prose-xl mx-auto">
        <h1 className="mb-6 text-4xl font-extrabold text-gray-100">{title}</h1>

        <p className="mb-8 text-lg text-gray-300">{introduction}</p>

        {children}
      </article>
    </div>
  );
}
