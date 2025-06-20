'use client';

import { useEffect, useState } from 'react';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface PostData {
  id: string;
  slug: string;
  date: string;
  title: string;
  description?: string;
  content?: string;
  contentHtml?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    getSortedPostsData().then((data: PostData[]) => setPosts(data));
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                  Leer más →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
