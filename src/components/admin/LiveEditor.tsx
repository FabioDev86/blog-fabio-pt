'use client';

import React, { useState, useTransition, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { syncPreviewContent, updatePost } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

interface LiveEditorProps {
  post: {
    slug: string;
    title: string;
    mdxContent: string;
    status: string;
  };
}

export function LiveEditor({ post }: LiveEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.mdxContent);
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  
  // Track preview version to force iframe reload
  const [previewVersion, setPreviewVersion] = useState(0);

  // Debounced content ensures we don't spam the server
  const debouncedContent = useDebounce(content, 400);

  // Sync content to KV shadow record when debounced content changes
  useEffect(() => {
    startTransition(async () => {
      try {
        await syncPreviewContent(post.slug, debouncedContent);
        // Increment version to reload the iframe
        setPreviewVersion(v => v + 1);
      } catch (err) {
        console.error("Content sync failed", err);
      }
    });
  }, [debouncedContent, post.slug]);

  // Handle Save Action
  const handleSave = async (publish: boolean) => {
    setIsSaving(true);
    try {
      await updatePost(post.slug, {
        title,
        mdxContent: content,
        status: publish ? 'published' : 'pending_review'
      });
      router.push('/admin/queue');
    } catch (err) {
      console.error("Failed to save post", err);
      alert("Failed to save post");
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-10">
        <div className="flex-1 mr-4">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-xl font-black text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
            placeholder="Post Title..."
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2 flex items-center gap-2">
            {isPending ? (
              <><span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> Syncing...</>
            ) : (
              <><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Live</>
            )}
          </span>
          <button 
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-bold text-zinc-300 hover:bg-zinc-700 transition disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Publish Content"}
          </button>
        </div>
      </div>

      {/* Split Screen Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor (Left) */}
        <div className="w-1/2 flex flex-col border-r border-zinc-900 bg-[#0a0a0a]">
          <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/50 text-[10px] uppercase tracking-widest font-black text-zinc-500">
            Raw MDX Editor
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-transparent p-6 text-zinc-300 font-mono text-sm leading-relaxed resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Live Preview (Right) - Using Iframe to avoid Webpack/RSC serialization issues */}
        <div className="w-1/2 flex flex-col bg-[#050505] relative">
          <div className="sticky top-0 px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/50 text-[10px] uppercase tracking-widest font-black text-zinc-500 z-10 backdrop-blur-md flex justify-between">
            <span>Shadow Preview Mode</span>
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
              Secure Sandbox
            </span>
          </div>
          <div className={`flex-1 overflow-hidden transition-opacity duration-300 ${isPending ? 'opacity-60 grayscale-[20%]' : 'opacity-100'}`}>
            <iframe 
              src={`/admin/preview/${post.slug}?v=${previewVersion}`}
              className="w-full h-full border-none"
              title="MDX Live Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
