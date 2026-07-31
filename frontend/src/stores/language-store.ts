import { create } from 'zustand';

type Locale = 'en' | 'sw';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}));
