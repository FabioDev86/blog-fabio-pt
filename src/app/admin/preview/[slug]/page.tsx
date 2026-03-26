import { kv } from '@vercel/kv';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';

export const dynamic = 'force-dynamic';

export default async function AdminPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as any)?.role;
  
  if (role !== 'admin') {
    redirect('/');
  }

  const { slug } = await params;
  
  // Try to fetch the temporary preview content first
  // Fallback to the actual post if the preview key is missing or expired
  const preview = await kv.get<{ mdxContent: string }>(`preview:${slug}`);
  const post = await kv.get<any>(`post:${slug}`);
  
  const content = preview?.mdxContent || post?.mdxContent;

  if (!content) {
    return (
      <div className="p-8 text-zinc-500 font-mono text-sm">
        Waiting for editor content sync...
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen p-8">
      <div className="prose prose-invert prose-zinc max-w-none prose-base leading-loose prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-a:text-emerald-400 prose-hr:border-white/[0.08] prose-blockquote:border-l-emerald-500 prose-blockquote:bg-white/[0.03] prose-blockquote:px-6">
        <MDXRemote source={content} components={components} />
      </div>
    </div>
  );
}
