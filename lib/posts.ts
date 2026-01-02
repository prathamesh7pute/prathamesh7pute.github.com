import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function getAllPosts(): Post[] {
  return fs.readdirSync(postsDir).map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fileContents = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(fileContents);
    return { slug, ...data } as Post;
  });
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  return { slug, content, data };
}
