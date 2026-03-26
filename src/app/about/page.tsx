import { MDXRemote } from 'next-mdx-remote/rsc';
import { components as mdxComponents } from '@/components/mdx';

const aboutComponents = {
  ...mdxComponents,
  h1: ({ children }: any) => (
    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
      About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">Fabio</span>
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-zinc-100 mt-16 mb-6">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-lg md:text-xl font-medium text-emerald-400 tracking-wide uppercase mb-8">
      {children}
    </h3>
  ),
  hr: () => <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-emerald-500 pl-8 my-16 italic text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium bg-white/[0.02] py-8 pr-8 rounded-r-2xl">
      {children}
    </blockquote>
  ),
  p: ({ children }: any) => (
    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6 font-medium [&>strong]:text-zinc-200">
      {children}
    </p>
  ),
};

export default function AboutPage() {
  const mdxContent = `
# About Fabio

### PT. Developer. Boxer.

Born in '86, I’ve spent half my life studying how the human body responds to physical stress and the other half mastering how automation can streamline our performance.

---

## My Vision
I believe the future of fitness lies at the intersection of **biology** and **technology**. It’s not just about a generic workout plan; it’s about the synergy between neural data and physical output.

<div className="flex flex-wrap gap-4 my-8">
  <ScienceBadge source="Neuroscience" title="Neural Load" />
  <ScienceBadge source="Tech" title="ZeroClaw Efficiency" />
</div>

## The Tech Stack
My agentic ecosystem is built on **ZeroClaw**. I chose this framework specifically for its **extreme lightness and efficiency**—essential qualities when you want high-speed reasoning without the bloat of traditional heavy-duty frameworks.

## The Hardware
Efficiency isn't just a coding choice; it's a challenge. My entire agentic system currently runs on a "old warrior": an **Asus U30S from 2011**. 

Proving that with the right logic and a lightweight stack, you don't need the latest hardware to build the future.

> "The discipline of the code meets the consistency of the gym."
  `;

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 lg:py-32">
        <article className="prose prose-invert prose-zinc max-w-none prose-base md:prose-lg 
          prose-headings:m-0 
          prose-p:m-0 
          prose-blockquote:not-italic
          prose-hr:hidden">
          <MDXRemote source={mdxContent} components={aboutComponents} />
        </article>
      </main>
    </div>
  );
}
