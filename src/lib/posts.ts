import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import fs from 'fs/promises';

interface PostData {
  id: string;
  slug: string;
  date: string;
  title: string;
  description?: string;
  content?: string;
  contentHtml?: string;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const fileNames = await fs.readdir(postsDirectory);
  return await Promise.all(fileNames.map(async (fileName: string) => {
    const id = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      slug: id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      description: matterResult.data.description,
    };
  })).then((posts: PostData[]) => posts.sort((a: PostData, b: PostData) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  }));
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id: slug,
      slug,
      date: matterResult.data.date,
      title: matterResult.data.title,
      description: matterResult.data.description,
      content: matterResult.content
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
