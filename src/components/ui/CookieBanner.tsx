'use client';
import { useState, useEffect, useCallback } from 'react';
import { useConsent } from '@/hooks/useConsent';

type Tab = 'info' | 'settings';

export function CookieBanner() {
  const { isLoaded, hasConsented, consent, acceptAll, rejectNonEssential, updateCategory, saveConsent } = useConsent();
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<Tab>('info');
  // Local settings state (only applied on "Save Settings")
  const [localAnalytics, setLocalAnalytics] = useState(false);
  const [localMarketing, setLocalMarketing] = useState(false);

  useEffect(() => {
    if (isLoaded && !hasConsented) {
      setVisible(true);
    }
  }, [isLoaded, hasConsented]);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setVisible(false);
  }, [acceptAll]);

  const handleReject = useCallback(() => {
    rejectNonEssential();
    setVisible(false);
  }, [rejectNonEssential]);

  const handleSaveSettings = useCallback(() => {
    saveConsent({ necessary: true, analytics: localAnalytics, marketing: localMarketing });
    setVisible(false);
  }, [saveConsent, localAnalytics, localMarketing]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-white/[0.05]">
          <button
            onClick={() => setTab('info')}
            className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${tab === 'info' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Cookie Notice
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${tab === 'settings' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Settings
          </button>
        </div>

        <div className="p-6">
          {tab === 'info' ? (
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">🍪 Privacy First</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We use essential cookies to keep things running. With your consent, we may also use analytics and marketing tools.
                  You can adjust your preferences at any time. Read our{' '}
                  <a href="/cookie-policy" className="text-white underline underline-offset-2 hover:text-emerald-400 transition-colors">Cookie Policy</a>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleReject}
                  className="px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-400 border border-white/[0.08] rounded-xl hover:bg-white/[0.05] hover:text-white transition-all"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-3 text-xs font-black uppercase tracking-widest bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Necessary (always on) */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <div>
                  <p className="text-sm font-bold text-zinc-200 uppercase tracking-tight">Necessary</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Authentication, session management. Always active.</p>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1 opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <div>
                  <p className="text-sm font-bold text-zinc-200 uppercase tracking-tight">Analytics</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Understand how visitors interact with content.</p>
                </div>
                <button
                  onClick={() => setLocalAnalytics(v => !v)}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-all ${localAnalytics ? 'bg-emerald-500 justify-end' : 'bg-white/10 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-bold text-zinc-200 uppercase tracking-tight">Marketing</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Personalized content and campaign tracking.</p>
                </div>
                <button
                  onClick={() => setLocalMarketing(v => !v)}
                  className={`w-10 h-6 rounded-full flex items-center px-1 transition-all ${localMarketing ? 'bg-emerald-500 justify-end' : 'bg-white/10 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReject}
                  className="flex-1 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-400 border border-white/[0.08] rounded-xl hover:bg-white/[0.05] hover:text-white transition-all"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-5 py-3 text-xs font-black uppercase tracking-widest bg-white text-black rounded-xl hover:bg-zinc-200 transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
