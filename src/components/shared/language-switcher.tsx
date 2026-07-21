'use client';

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[3rem] font-medium uppercase tracking-wide"
      aria-label={`Switch language to ${locale === 'en' ? 'Swahili' : 'English'}`}
    >
      {locale === 'en' ? 'SW' : 'EN'}
    </Button>
  );
}
