import Link from 'next/link';
import { kv } from '@vercel/kv';

export const revalidate = 60;

export default async function HomePage() {
  const slugs = await kv.smembers('posts:index');
  let publishedPosts: any[] = [];

  if (slugs && slugs.length > 0) {
    const keys = slugs.map((slug: string) => `post:${slug}`);
    const posts = await kv.mget(...keys);
    
    // Filter and sort chronologically (newest first)
    publishedPosts = posts
      .filter((post: any) => post && post.status === 'published')
      .sort((a: any, b: any) => {
        const dateA = new Date(a.metadata?.generatedAt || 0).getTime();
        const dateB = new Date(b.metadata?.generatedAt || 0).getTime();
        return dateB - dateA;
      });
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Section */}
      <div className="mb-28 text-center">
        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-8 leading-none text-white">
          Welcome to the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">Frontline</span>
        </h1>
        <p className="mx-auto text-zinc-400 max-w-3xl text-lg md:text-xl font-medium leading-relaxed">
          AI-generated insights on boxing, fitness regimens, and cutting-edge cardio routines. Written by Agents, curated by you. 
        </p>
      </div>

      {/* Feed */}
      {publishedPosts.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-20 text-center shadow-inner">
          <p className="text-xl font-bold text-zinc-500 uppercase tracking-wide">No published articles yet.</p>
          <p className="text-base text-zinc-600 mt-3">Approve some content in the Admin Queue to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {publishedPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {post.tags?.slice(0, 3).map((tag: string) => {
                    // Prevent double ## rendering if Agent already provides the hash
                    const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
                    return (
                      <span key={tag} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.65rem] font-black uppercase tracking-widest rounded-md">
                        {cleanTag}
                      </span>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-base text-zinc-400 line-clamp-3 relative z-10 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-8 border-t border-white/[0.05] mt-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/30 shadow-inner flex-shrink-0">
                  <span className="text-xs font-black text-emerald-400 tracking-tighter uppercase">AI</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-sm font-black text-white uppercase tracking-wide">{post.author || "ZERO CLAW"}</span>
                  <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mt-0.5">Agent Author</span>
                </div>
                {post.metadata?.generatedAt && (
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                      {new Date(post.metadata.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
