import { kv } from '@vercel/kv';
import { approvePost, deletePost } from '@/lib/actions/admin';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

// Force dynamic since it's an admin dashboard reading real-time from KV without caching
export const dynamic = 'force-dynamic';

export default async function AdminQueuePage() {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as any)?.role;
  if (role !== 'admin') {
    redirect('/');
  }

  // 1. Fetch all known post slugs from the sorted set or standard set
  const slugs = await kv.smembers('posts:index');
  
  // 2. Fetch all post metadata in parallel
  const postPromises = slugs.map(slug => kv.get<any>(`post:${slug}`));
  const posts = await Promise.all(postPromises);
  
  // 3. Filter into groups
  const pendingPosts = posts.filter(p => p !== null && p.status === 'pending_review');
  const publishedPosts = posts.filter(p => p !== null && p.status === 'published')
    .sort((a, b) => {
      const dateA = new Date(a.metadata?.generatedAt || 0).getTime();
      const dateB = new Date(b.metadata?.generatedAt || 0).getTime();
      return dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-zinc-100 font-sans">
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* PENDING SECTION */}
        <section>
          <header className="mb-10 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                Review <span className="text-amber-500">Queue</span>
              </h1>
              <p className="text-zinc-500 mt-2 font-medium">Agentic submissions awaiting your manual approval.</p>
            </div>
            
            <a 
              href="/admin/new"
              className="px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 hover:text-black transition-all active:scale-95 shadow-lg shadow-white/5 flex items-center gap-2 group"
            >
              <span className="text-emerald-600 font-bold group-hover:text-black">＋</span>
              Create New Post
            </a>
          </header>

          {pendingPosts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-zinc-800/60 bg-zinc-900/10 p-16 text-center shadow-inner">
              <p className="text-lg font-bold text-zinc-500">No pending posts in the queue.</p>
              <p className="text-sm text-zinc-600 mt-2">You're all caught up! The Agent is resting.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {pendingPosts.map((post) => (
                <div key={post.slug} className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full bg-amber-900/30 px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-amber-500 border border-amber-500/20 shadow-sm">
                        Pending Review
                      </span>
                      <span className="text-[0.7rem] font-mono font-medium text-zinc-600 uppercase">
                        ID: {post.id?.substring(0, 8) || 'N/A'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">{post.title}</h2>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags?.map((tag: string) => {
                        const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
                        return (
                          <span key={tag} className="text-[0.65rem] font-bold tracking-widest uppercase text-zinc-500 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800 shadow-sm">
                            {cleanTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex w-full sm:w-auto flex-col gap-3 sm:ml-6 sm:border-l sm:border-zinc-800 sm:pl-6">
                    {/* Edit & Preview Button */}
                    <a href={`/admin/edit/${post.slug}`} className="w-full text-center rounded-lg bg-indigo-500/10 px-6 py-2.5 text-sm font-bold tracking-wide text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300 transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm shadow-indigo-500/5">
                      Edit & Preview
                    </a>
                    
                    {/* Approve Form Action inline */}
                    <form action={async () => {
                      'use server';
                      await approvePost(post.slug);
                    }}>
                      <button className="w-full rounded-lg bg-lime-500/10 px-6 py-2.5 text-sm font-bold tracking-wide text-lime-400 border border-lime-500/20 hover:bg-lime-500/20 hover:border-lime-500/40 hover:text-lime-300 transition-all focus:ring-2 focus:ring-lime-500 focus:outline-none shadow-sm shadow-lime-500/5">
                        Quick Approve
                      </button>
                    </form>
                    
                    {/* Reject Form Action inline */}
                    <form action={async () => {
                      'use server';
                      await deletePost(post.slug);
                    }}>
                      <button className="w-full rounded-lg bg-red-500/5 px-6 py-2.5 text-sm font-bold tracking-wide text-red-500 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PUBLISHED SECTION */}
        <section>
          <header className="mb-10 border-b border-zinc-900 pb-6">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
              Live <span className="text-emerald-500">Posts</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-medium">Manage and refine posts currently visible on the public blog.</p>
          </header>

          {publishedPosts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-zinc-800/60 bg-zinc-900/10 p-16 text-center shadow-inner">
              <p className="text-lg font-bold text-zinc-500">No published posts yet.</p>
              <p className="text-sm text-zinc-600 mt-2">Approve some content to build out your platform.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {publishedPosts.map((post) => (
                <div key={post.slug} className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl border border-emerald-900/30 bg-[#070707] p-6 shadow-xl transition-all hover:border-emerald-800/50 hover:bg-[#0a0a0a]">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full bg-emerald-900/30 px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-emerald-500 border border-emerald-500/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Published / Live
                      </span>
                      <span className="text-[0.7rem] font-mono font-medium text-zinc-600 uppercase">
                        ID: {post.id?.substring(0, 8) || 'N/A'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{post.title}</h2>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  </div>
                  
                  <div className="flex w-full sm:w-auto flex-col gap-3 sm:ml-6 sm:border-l sm:border-zinc-800 sm:pl-6">
                    {/* Live Editor Button */}
                    <a href={`/admin/edit/${post.slug}`} className="w-full text-center rounded-lg bg-indigo-500/10 px-6 py-2.5 text-sm font-bold tracking-wide text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-300 transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm shadow-indigo-500/5">
                      Live Editor
                    </a>
                    
                    {/* Delete Post Form */}
                    <form action={async () => {
                      'use server';
                      await deletePost(post.slug);
                    }}>
                      <button className="w-full rounded-lg bg-red-500/5 px-6 py-2.5 text-sm font-bold tracking-wide text-red-500 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none">
                        Delete Post
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
