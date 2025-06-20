import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
'use client';
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El post solicitado no existe',
    };
  }
  return {
    title: post.title,
    description: post.description || 'Leer más sobre este tema en el blog',
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block">
        ← Volver al blog
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{post.date}</p>
        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
}
