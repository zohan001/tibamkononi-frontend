'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HospitalPortalRedirect() {
  const router = useRouter();
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    let dest = '/register';
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        const role = user.role?.toLowerCase();
        if (role === 'county_admin' || role === 'admin') {
          dest = '/county';
        } else if (user.hospital_slug) {
          dest = `/${user.hospital_slug}`;
        } else {
          dest = '/register';
        }
      } catch {
        dest = '/register';
      }
    }
    setTarget(dest);
  }, []);

  useEffect(() => {
    if (target) router.replace(target);
  }, [target, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <p className="text-sm text-muted-foreground">Opening hospital portal…</p>
    </main>
  );
}
