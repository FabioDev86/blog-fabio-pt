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
# 🏛️ THE MANIFESTO OF THE FRONTLINE
## Beyond Coaching: The Architecture of the Overman

Welcome to **The Frontline**. This is not a fitness blog, and I am not just a Personal Trainer. What you are witnessing is an experiment in **Integrated Human Evolution**. 

This platform exists at the intersection of three pillars that modern society has spent decades trying to decouple: the raw power of the **Physical Body**, the disciplined rigor of **Classical Philosophy**, and the exponential potential of **Artificial Intelligence**. To understand "The Frontline," you must first understand the philosophy that forged it.

### I. The Physical Pillar: The Altar of the Body

My journey began in the trenches of physical training. As a **Personal Trainer**, I have spent years observing the breakdown of the human form in the modern era. We live in an age of sedentary comfort, where the body is treated as a mere vessel for a distracted mind. 

In January 2026, I took my commitment to physical mastery back to its roots: **Boxing**. 

The ring is the ultimate truth-teller. It doesn't care about your intentions; it only cares about your preparation, your reflexes, and your will to endure. Boxing is the physical manifestation of the "Frontline"—it is the point where internal discipline meets external resistance. This site is designed to reflect that intensity. When you see a \`<WorkoutCard />\` on this platform, it isn't just a list of exercises. It is a calculated protocol for stress adaptation, designed with the same precision I use to write a neural network or a boxing combination.

<Quote 
  text="I tell you: one must still have chaos within oneself to give birth to a dancing star." 
  author="Friedrich Nietzsche" 
  source="Thus Spoke Zarathustra" 
/>

### II. The Philosophical Pillar: The Aristocracy of the Spirit

Why Nietzsche? Why Evola? Why the fascination with Ancient Rome?

In a world of liquid values and vanishing identities, I look toward the "Traditional" and the "Heroic." My favorite authors represent a rebellion against the mediocre. **Friedrich Nietzsche** taught us that man is a transition, a "bridge" toward something greater—the *Übermensch*. **Julius Evola** spoke of "Riding the Tiger," of maintaining internal verticality in an age of dissolution.

**The Frontline** is my attempt to apply these "aristocratic" values to the digital age. 
*   **Ancient Rome** provides the blueprint: *Order, Hierarchy, and Gravitas.*
*   **The Overman** provides the goal: *Constant Self-Overcoming.*

When I code an automation system or optimize a landing page, I am not just performing a technical task. I am exercising the **Will to Power** over the digital medium. I believe that a developer who does not train his body is incomplete, and a pugilist who does not sharpen his mind is a mere brute. This platform is the synthesis of the "Warrior-Philosopher" for the 21st century.

### III. The Technological Pillar: The Agentic Frontier

The most controversial aspect of my work is perhaps the integration of **Artificial Intelligence**. Many fear that AI will replace human effort; I believe it will amplify the *elite* effort.

My fascination with **Arduino** and safety automation was the gateway. It taught me how to protect a physical perimeter with logic. Now, I am extending that logic into the realm of **Agentic AI**. Using frameworks like **ZeroClaw**, I am developing systems that don't just "chat," but "act."

On this site, AI is not a ghostwriter. It is a **Collaborator**. 
My agents are trained to:
1.  **Ingest** high-level scientific data on hypertrophy and biomechanics.
2.  **Verify** claims against the "Frontline" philosophical standards.
3.  **Deploy** content that is technically superior and aesthetically aligned with the "Athletic-Dark" brand.

I use a 2011 Asus laptop to run these frameworks—a reminder that power isn't about having the newest shiny object, but about how you utilize the resources at your disposal. This is **Digital Scarcity Engineering**: extracting maximum performance from every cycle of the CPU and every rep in the gym.

### IV. The Architecture: Built for the Abyss

Technically, **The Frontline** is built on **Next.js 16** and **Tailwind CSS v4**. I chose this stack because it represents the "State of the Art." It is fast, secure, and uncompromising. 

I assisted in every line of code, ensuring that the **HMAC SHA-256** security protocols were as tight as a championship guard. The **Pipe Protocol** we developed for MDX rendering is a testament to our refusal to accept standard limitations. We don't use "off-the-shelf" solutions if they dilute the vision. Every component, from the **ScienceBadge** to the **useConsent** hook, was forged to serve the mission.

### V. Who is Fabio Bauleo?

I am a developer who bleeds in the ring. I am a Personal Trainer who writes Python scripts to automate security. I am a student of the classics who builds on the bleeding edge of the Vercel Edge Network.

My name is **Fabio**, and I am building a future where technology doesn't make us weaker, but serves as the exoskeleton for our highest ambitions. I work at the intersection of the "Iron" and the "Silicon."

### VI. The Call to Action

If you are looking for "get-fit-quick" tips or generic tech tutorials, you are in the wrong place. But if you are interested in:
*   **Advanced Athletic Protocols** backed by data.
*   **Deep-Tech Automation** using agentic frameworks.
*   **Philosophical Reflection** on the nature of strength and identity.

Then you have found your tribe. We are the ones who stand at the Frontline, looking into the abyss and deciding to build a bridge across it.

**The iron never lies. The code never bluffs. The spirit never yields.**

Welcome to the Frontline.

---

**Contact & Collaboration**
Fabio Bauleo — [fabio.bauleo.developer@gmail.com](mailto:fabio.bauleo.developer@gmail.com)
Based in Italy. Operating Globally.
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
