'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-slate-600 mb-6 max-w-md">{error.message || 'An unexpected error occurred'}</p>
      <Button onClick={reset} variant="outline">Try Again</Button>
    </div>
  );
}
