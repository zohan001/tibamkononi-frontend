'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GemmaBadgeProps {
  className?: string;
}

export function GemmaBadge({ className }: GemmaBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600/10 to-purple-600/10 px-2.5 py-1 text-xs font-medium text-violet-700 dark:from-violet-400/10 dark:to-purple-400/10 dark:text-violet-400',
        className
      )}
    >
      <Sparkles className="h-3 w-3" />
      Powered by Gemma 4
    </span>
  );
}
