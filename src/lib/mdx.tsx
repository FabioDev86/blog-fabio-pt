import { compileMDX } from 'next-mdx-remote/rsc';
import { WorkoutCard } from '@/components/mdx/WorkoutCard';
import { ScienceBadge } from '@/components/mdx/ScienceBadge';
import { connection } from 'next/server';
import { Suspense } from 'react';

// Temporal component that injects the current date/season.
// Uses `await connection()` in Next.js 15+ to opt into dynamic rendering (PPR readiness).
// This component evaluates per-request at the Edge, while the surrounding MDX is cached statically.
async function DynamicTemporalContext({ format = 'default' }: { format?: string }) {
  await connection(); 
  
  const now = new Date();
  let text = '';
  
  if (format === 'month-year') {
    text = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  } else if (format === 'season') {
    const month = now.getMonth();
    // basic northern hemisphere seasons
    if (month >= 2 && month <= 4) text = 'Spring';
    else if (month >= 5 && month <= 7) text = 'Summer';
    else if (month >= 8 && month <= 10) text = 'Autumn';
    else text = 'Winter';
  } else {
    text = now.toLocaleDateString();
  }
  
  return <span className="font-bold text-lime-400">{text}</span>;
}

// Map custom elements to MDX tags, passing props along
const components = {
  WorkoutCard,
  ScienceBadge,
  // usage in MDX: <TemporalContext format="season" />
  TemporalContext: (props: any) => (
    // Suspense boundary enables Partial Prerendering (PPR) for this specific chunk
    <Suspense fallback={<span className="animate-pulse text-zinc-500">loading time-context...</span>}>
      <DynamicTemporalContext {...props} />
    </Suspense>
  ),
};

export async function parseAgentMdx(source: string) {
  // compileMDX evaluates the components on the server without shipping MDX-js to the client
  const { content, frontmatter } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // Plugins like remarkGfm (tables) or rehypeSlug (anchor links) could be added here
      }
    }
  });

  return { content, frontmatter };
}
