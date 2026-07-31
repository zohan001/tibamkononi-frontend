'use client';

import { useLanguageStore } from '@/stores/language-store';

export function useLanguage() {
  const { locale, setLocale } = useLanguageStore();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'sw' : 'en');
  };

  return { locale, setLocale, toggleLanguage, isSwahili: locale === 'sw' };
}
