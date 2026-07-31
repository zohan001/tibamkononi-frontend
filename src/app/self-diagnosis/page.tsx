'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SelfDiagnosisRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/triage');
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm text-muted-foreground">Loading AI self-diagnosis…</p>
    </main>
  );
}
