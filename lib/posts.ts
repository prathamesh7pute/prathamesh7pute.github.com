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

function parsePostMetadata(slug: string, data: Record<string, unknown>): Post {
  const { title, description, date } = data;

  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof date !== 'string' ||
    Number.isNaN(Date.parse(date))
  ) {
    throw new Error(`Invalid frontmatter in posts/${slug}.mdx`);
  }

  return { slug, title, description, date };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fileContents = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data } = matter(fileContents);
      return parsePostMetadata(slug, data);
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  return { slug, content, data: parsePostMetadata(slug, data) };
}
