import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const metadata: Metadata = {
  title: "FABIO PT - Boxing & Fitness",
  description: "Advanced Agentic Blog Platform for Athletic Performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body 
          className="antialiased bg-[#050505] text-zinc-100 flex flex-col min-h-screen selection:bg-emerald-500/30 selection:text-white"
          style={{ backgroundColor: '#050505', color: '#fafafa' }}
        >
          <Navbar />
          <div className="flex-grow pt-24">
            {children}
          </div>
          <Footer />
          {/* GDPR Cookie Banner — Client Component, renders only on client after hydration */}
          <CookieBanner />
        </body>
      </html>
    </ClerkProvider>
  );
}
