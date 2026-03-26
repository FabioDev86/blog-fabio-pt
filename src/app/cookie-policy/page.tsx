import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy — Fabio PT',
  description: 'Detailed information about how and why we use cookies.',
};

export default function CookiePolicyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-20 border-b border-zinc-900 pb-16">
        <div className="flex mb-8">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
            Cookie Transparency
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
          Cookie <br /> Policy
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
          <span>Last updated: March 2026</span>
          <span className="hidden md:block text-zinc-800">•</span>
          <span>EU Directive 2009/136/EC Compliant</span>
        </div>
      </header>

      <div className="space-y-16 text-zinc-400 leading-relaxed max-w-3xl">
        
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            01. Digital Footprint
          </h2>
          <p>
            This policy outlines our use of cookies—small text files designed to enhance your athletic experience on the platform. 
            We distinguish between essential operational trackers and optional analytics tools.
          </p>
        </section>

        <section className="space-y-12">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            02. Category Breakdown
          </h2>
          
          <div className="space-y-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-100">Essential Tracking</h3>
              </div>
              <p className="text-sm text-zinc-500 mb-6">These trackers are strictly necessary for the technical performance and security of the platform. Authentication and session persistence fall into this category.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 border border-zinc-800/50 rounded-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Clerk Auth</p>
                  <p className="text-xs font-bold text-zinc-400">__session, __client_uat</p>
                </div>
                <div className="p-4 bg-black/40 border border-zinc-800/50 rounded-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Consent Storage</p>
                  <p className="text-xs font-bold text-zinc-400">fb-pt-consent-v1 (localStorage)</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/10 border border-zinc-800/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 opacity-50">
                <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Optional Analytics</h3>
              </div>
              <p className="text-sm text-zinc-600">Currently, we do not utilize any third-party analytics cookies. Should we integrate Vercel Analytics, they will remain disabled until explicit opt-in via our consent manager.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6 pb-20">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            03. Managing Preferences
          </h2>
          <p>
            You can reset your digital footprint at any time by clearing your browser cache or re-opening our consent modal. 
            All preferences are stored locally on your machine and are never transmitted to our backend servers without prior authorization.
          </p>
          <div className="pt-12 border-t border-zinc-900">
             <Link href="/privacy-policy" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              ← Back to Privacy Overview
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
