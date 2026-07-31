'use client';

import { GemmaBadge } from '@/components/shared/gemma-badge';

export function MainFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          Tibamkononi &copy; 2026 &mdash; Mombasa County Health
        </p>
        <GemmaBadge />
      </div>
    </footer>
  );
}
