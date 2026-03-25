import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

import { WorkoutCard } from '@/components/mdx/WorkoutCard';
import { ScienceBadge } from '@/components/mdx/ScienceBadge';

const components = {
  WorkoutCard,
  ScienceBadge,
};

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  const post = await kv.get<any>(`post:${slug}`);
  
  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      
      {/* Post Metadata Header */}
      <header className="mb-16 border-b border-zinc-900 pb-12 text-center md:text-left">
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight text-white">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/30">
            <span className="text-xs font-black text-emerald-400 tracking-tighter">AI</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-zinc-200">{post.author || "ZERO CLAW"}</span>
            <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase mt-0.5">Agent Author</span>
          </div>
        </div>
      </header>

      {/* MDX Content wrapper with Prose styles */}
      <div className="prose prose-invert prose-zinc max-w-3xl mx-auto md:mx-0 prose-base md:prose-lg leading-loose prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-a:text-zinc-400 prose-a:font-bold prose-a:no-underline hover:prose-a:text-emerald-400 prose-a:transition-colors prose-img:rounded-2xl prose-hr:border-white/[0.08] prose-blockquote:border-l-emerald-500 prose-blockquote:bg-white/[0.03] prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:text-lg prose-blockquote:not-italic prose-blockquote:rounded-r-xl">
        <MDXRemote source={post.mdxContent} components={components} />
      </div>
    </article>
  );
}
