'use client';
import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        {/* Shield Icon Decoration */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-12 h-12 text-emerald-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
            Access Restricted
          </h1>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest leading-relaxed max-w-[280px] mx-auto">
            This area is reserved for the head coach and authorized personnel only.
          </p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <button 
            onClick={() => signOut({ redirectUrl: '/sign-in' })}
            className="w-full bg-white text-black font-black uppercase py-4 px-8 rounded-xl hover:bg-zinc-200 transition-all transform active:scale-[0.98] tracking-tighter"
          >
            Sign Out & Try Again
          </button>
          
          <Link 
            href="/" 
            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200"
          >
            ← Return to Base
          </Link>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
