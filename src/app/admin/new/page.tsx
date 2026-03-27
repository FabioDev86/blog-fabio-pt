'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/actions/admin';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    mdxContent: `
# New Article Title

This is where you write your story. Remember to use our custom components for impact:

<Quote 
  text="Focus on the journey, not the destination." 
  author="Fabio Bauleo" 
/>

## Training Routine

<WorkoutCard
  title="Boxing Fundamentals"
  duration="45 mins"
  difficulty="Intermediate"
  exercises="
    Shadow Boxing | 3 | 3:00 | 6 | 60s ;
    Heary Bag Work | 5 | 3:00 | 8 | 60s ; 
    Speed Bag | 2 | 2:00 | 7 | 60s
  "
/>
    `.trim()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!form.title || !form.slug || !form.mdxContent) {
        throw new Error("Title, slug and content are required.");
      }

      await createPost({
        ...form,
        status: 'pending_review'
      });

      router.push('/admin/queue');
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded border border-emerald-500/20">
                Author Mode
              </span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Create New Post</h1>
          </div>
          
          <div className="flex gap-4">
             <Link 
              href="/admin/queue"
              className="px-6 py-3 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 hover:text-black transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl">
            Error: {error}
          </div>
        )}

        {/* Editor Form */}
        <div className="space-y-8">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Article Title</label>
              <input 
                type="text"
                placeholder="The Future of Athletic Performance"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all"
                value={form.title}
                onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">URL Slug</label>
              <input 
                type="text"
                placeholder="future-of-performance"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-700 font-mono text-sm focus:border-emerald-500/50 outline-none transition-all"
                value={form.slug}
                onChange={e => setForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              />
            </div>
          </div>

          {/* Excerpt Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Article Excerpt (Summary)</label>
            <textarea 
              rows={3}
              placeholder="Provide a brief, punchy summary of the article for the blog feed..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-100 placeholder:text-zinc-700 focus:border-emerald-500/50 outline-none transition-all resize-none"
              value={form.excerpt}
              onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
            />
          </div>

          {/* Content Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1 px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">MDX Content</label>
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic">Full MDX Support Enabled</span>
            </div>
            <textarea 
              rows={25}
              className="w-full bg-zinc-900/30 border border-zinc-800 rounded-2xl px-6 py-6 text-zinc-300 placeholder:text-zinc-800 font-mono text-sm leading-relaxed focus:border-emerald-500/30 outline-none transition-all resize-none"
              value={form.mdxContent}
              onChange={e => setForm(prev => ({ ...prev, mdxContent: e.target.value }))}
            />
          </div>

        </div>

        {/* Footer Guidance */}
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            © 2026 Fabio Bauleo · Administrative Content Portal
          </p>
        </div>

      </div>
    </div>
  );
}
