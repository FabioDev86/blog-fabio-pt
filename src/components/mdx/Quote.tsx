import React from 'react';

interface QuoteProps {
  text: string;
  author: string;
  source?: string;
  year?: string;
}

export const Quote: React.FC<QuoteProps> = ({ text, author, source, year }) => {
  return (
    <figure className="relative my-12 md:my-20 p-8 md:p-12 bg-zinc-950/40 border-l-4 border-emerald-500 rounded-r-2xl overflow-hidden group transition-all hover:bg-zinc-950/60 shadow-2xl shadow-emerald-500/5">
      {/* Decorative Quotation Mark Watermark */}
      <div className="absolute top-4 left-4 text-emerald-900/20 select-none pointer-events-none transform -translate-x-2 -translate-y-2 group-hover:text-emerald-500/10 transition-colors duration-700">
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-24 h-24 md:w-32 md:h-32"
        >
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017C22.1216 3 23.017 3.89543 23.017 5V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H5.0166C3.91203 8 3.0166 7.10457 3.0166 6V3H10.0166C11.1212 3 12.0166 3.89543 12.0166 5V15C12.0166 18.3137 9.3303 21 6.0166 21H3.0166Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Main Quote Text */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic font-medium text-white leading-tight md:leading-snug tracking-tight">
          "{text}"
        </blockquote>

        {/* Attribution Block */}
        <figcaption className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-t border-white/[0.05] pt-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-emerald-500 hidden md:block"></span>
            <span className="text-zinc-100 font-black uppercase tracking-[0.25em] text-xs md:text-sm">
              {author}
            </span>
          </div>
          
          {(source || year) && (
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">
              {source && (
                <span className="flex items-center gap-2">
                  <span className="hidden md:block opacity-30 text-[8px]">•</span>
                  {source}
                </span>
              )}
              {year && (
                <span className="flex items-center gap-2">
                  <span className="hidden md:block opacity-30 text-[8px]">•</span>
                  {year}
                </span>
              )}
            </div>
          )}
        </figcaption>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-overlay"></div>
    </figure>
  );
};
