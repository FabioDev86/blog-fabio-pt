'use client';
import { useState, useEffect, useCallback } from 'react';

export type ConsentCategories = {
  necessary: true; // Always true, non-configurable
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'fb-pt-consent-v1';

const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function useConsent() {
  const [consent, setConsent] = useState<ConsentCategories | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        setConsent(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = useCallback((categories: ConsentCategories) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(categories));
    } catch {
      // Ignore storage errors (private mode, etc.)
    }
    setConsent(categories);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }, [saveConsent]);

  const updateCategory = useCallback((category: keyof Omit<ConsentCategories, 'necessary'>, value: boolean) => {
    setConsent(prev => {
      const updated = { ...(prev ?? DEFAULT_CONSENT), [category]: value };
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(updated));
      } catch { /* noop */ }
      return updated;
    });
  }, []);

  const hasConsented = consent !== null;

  return { consent, isLoaded, hasConsented, acceptAll, rejectNonEssential, updateCategory, saveConsent };
}
