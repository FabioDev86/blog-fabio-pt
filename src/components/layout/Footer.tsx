export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.05] bg-[#050505] px-6 py-12">
      <div className="mx-auto max-w-5xl flex flex-col items-center justify-center text-center">
        
        {/* Social Links */}
        <div className="flex gap-8 mb-10 w-full justify-center">
          <a href="#" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">YouTube</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">Instagram</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors">TikTok</a>
        </div>
        
        {/* Disclaimer & Copyright */}
        <div className="max-w-3xl space-y-6">
          <p className="text-xs text-zinc-600 font-medium leading-relaxed">
            <strong className="text-zinc-500 font-bold uppercase tracking-wider block mb-2">Medical Disclaimer</strong> 
            The content provided on this blog is for informational and educational purposes only and is not intended as medical advice, or as a substitute for the medical advice of a physician. Always consult your doctor before starting any new fitness regimen, high-intensity cardio routine, or dietary program.
          </p>
          <p className="text-[10px] font-black tracking-widest text-zinc-700 uppercase">
            © {new Date().getFullYear()} Fabio PT. All Rights Reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}
