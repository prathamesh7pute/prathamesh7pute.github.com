import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import CodeBlock from '@/app/components/CodeBlock';
import PageLayout from '@/app/components/PageLayout';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = getPostBySlug(slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article',
      publishedTime: data.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    },
  };
}

interface MDXPreProps {
  children?: React.ReactNode;
}

const components = {
  pre: ({ children }: MDXPreProps) => {
    // Extract the code element and its props from children
    const codeElement = children as React.ReactElement;
    if (
      codeElement &&
      typeof codeElement === 'object' &&
      'props' in codeElement &&
      codeElement.props
    ) {
      const { className, children: codeChildren } = codeElement.props as {
        className?: string;
        children?: string;
      };
      const language = className?.replace(/language-/, '') || 'text';
      return <CodeBlock language={language}>{codeChildren}</CodeBlock>;
    }
    // Fallback for non-code pre blocks
    return <pre>{children}</pre>;
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, data } = getPostBySlug(slug);

  return (
    <PageLayout>
      <article>
        <h1>{data.title}</h1>
        <MDXRemote source={content} components={components} />
      </article>
    </PageLayout>
  );
}
