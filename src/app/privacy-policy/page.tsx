import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Fabio PT',
  description: 'How we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <header className="mb-20 border-b border-zinc-900 pb-16">
        <div className="flex mb-8">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
            Legal Compliance
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
          Privacy <br /> Policy
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
          <span>Last updated: March 2026</span>
          <span className="hidden md:block text-zinc-800">•</span>
          <span>GDPR Regulation 2016/679 Compliant</span>
        </div>
      </header>

      <div className="space-y-16 text-zinc-400 leading-relaxed max-w-3xl">
        
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            01. Data Governance
          </h2>
          <p>
            Fabio PT ("we", "our", or "the platform") is committed to protecting the privacy of our athletic community. 
            We operate on a "Privacy by Design" principle, ensuring that only the data strictly required for the performance or security of the site is processed.
          </p>
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Controller Contact</p>
            <p className="text-sm font-bold text-zinc-300">Fabio Bauleo - fabio.bauleo.developer@gmail.com</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            02. Technical Inventory
          </h2>
          <p>
            We classify our data processing into three distinct categories. Non-essential processing is strictly opt-in.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4 text-center">Essential</p>
              <ul className="text-xs space-y-2 font-medium">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Clerk</span> <span className="text-zinc-500">Auth</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Vercel</span> <span className="text-zinc-500">Hosting</span></li>
                <li className="flex justify-between pb-2"><span>Upstash</span> <span className="text-zinc-500">Cache</span></li>
              </ul>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 text-center">Analytics</p>
              <ul className="text-xs space-y-2 font-medium uppercase tracking-tight text-center">
                <li className="text-zinc-600">No active tracking without explicit consent</li>
              </ul>
            </div>
             <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 text-center">Marketing</p>
              <ul className="text-xs space-y-2 font-medium uppercase tracking-tight text-center">
                <li className="text-zinc-600">No active pixels or advertising trackers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            03. Third-Party Infrastructure
          </h2>
          <div className="overflow-hidden border border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800">
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500">Service</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500">Purpose</th>
                  <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-zinc-300">Clerk.dev</td>
                  <td className="px-6 py-4">Auth/Session</td>
                  <td className="px-6 py-4 text-zinc-500">USA (SCCs)</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-zinc-300">Vercel</td>
                  <td className="px-6 py-4">Edge Serverless</td>
                  <td className="px-6 py-4 text-zinc-500">Global (SCCs)</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-zinc-300">Upstash</td>
                  <td className="px-6 py-4">Redis Storage</td>
                  <td className="px-6 py-4 text-zinc-500">USA (SCCs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 pb-20">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
            04. User Rights (GDPR Art. 15-22)
          </h2>
          <p>
            You retain full control over your digital footprint. You have the right to access, rectify, or request the erasure of your data at any time. 
            For exercises concerning cookies, please refer to our <Link href="/cookie-policy" className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors">Cookie Policy</Link>.
          </p>
          <div className="pt-12 border-t border-zinc-900">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              Legal Disclaimer: This document is provided for informational purposes as part of our commitment to transparency.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
