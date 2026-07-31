'use client';

import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
}

export function LoadingState({ className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[60vh] flex-col items-center justify-center gap-4',
        className
      )}
    >
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
