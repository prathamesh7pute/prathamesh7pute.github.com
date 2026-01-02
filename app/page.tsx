import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Metadata } from 'next';
import PageLayout from './components/PageLayout';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Read my latest thoughts on Agentic AI, web development and cloud-native infrastructure.',
  openGraph: {
    title: 'Blog | Prathamesh Satpute',
    description:
      'Read my latest thoughts on Agentic AI, web development and cloud-native infrastructure.',
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      {posts.map((post) => (
        <div key={post.slug} className="mb-12">
          <h2 className="text-2xl font-semibold underline decoration-4 underline-offset-8 mb-3">
            <Link
              href={`/blog/${post.slug}`}
              className="no-underline hover:opacity-80"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {post.description}
          </p>
        </div>
      ))}
    </PageLayout>
  );
}
