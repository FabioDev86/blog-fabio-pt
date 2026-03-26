import Link from 'next/link';

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-3xl font-black uppercase tracking-tighter text-white hover:text-emerald-500 transition-colors"
        >
          FABIO <span className="text-emerald-500">PT</span>
        </Link>
        
        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            About
          </Link>
          <Link 
            href="/admin/queue" 
            className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-5 py-2.5 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
          >
            Admin
          </Link>
        </nav>
        
      </div>
    </header>
  );
}
