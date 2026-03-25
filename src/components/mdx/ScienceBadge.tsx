'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ScienceBadgeProps {
  source?: string;
  title?: string;
  doi_link?: string;
  evidence_level?: 'High' | 'Moderate' | 'Low';
  abstract?: string;
  children?: React.ReactNode;
}

export function ScienceBadge({ source, title, doi_link, evidence_level = 'Moderate', abstract, children }: ScienceBadgeProps) {
  const displaySource = source || title || 'Scientific Evidence';
  const displayAbstract = abstract || children;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Athletic-Dark coloring scale based on evidence level (Emerald / Amber / Zinc)
  const levelStyles = {
    High: 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50 hover:bg-emerald-900/40 hover:border-emerald-500/50',
    Moderate: 'bg-amber-950/40 text-amber-400 border-amber-900/50 hover:bg-amber-900/40 hover:border-amber-500/50',
    Low: 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600'
  };

  const styleClass = levelStyles[evidence_level] || levelStyles.Low;

  return (
    <span className="relative inline-block align-middle ml-2" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-widest transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm ${styleClass}`}
        aria-expanded={isOpen}
        title="View Scientific Evidence Reference"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        {displaySource}
      </button>

      {isOpen && (
        <div className="absolute bottom-[calc(100%+12px)] left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl shadow-black/80 ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-2">
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-zinc-800 bg-zinc-950"></div>
          
          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-[0.65rem] font-black uppercase tracking-widest text-zinc-500">
                Evidence: <span className={evidence_level === 'High' ? 'text-emerald-400' : evidence_level === 'Moderate' ? 'text-amber-400' : 'text-zinc-400'}>{evidence_level}</span>
              </span>
              {doi_link && (
                <a href={doi_link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300 hover:underline">
                  DOI &rarr;
                </a>
              )}
            </div>
            <div className="text-sm leading-relaxed text-zinc-300 font-medium">
              {displayAbstract}
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
