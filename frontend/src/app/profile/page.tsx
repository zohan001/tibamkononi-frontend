'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/use-auth';

interface ProfileUser {
  role?: string;
  full_name?: string;
  email?: string;
  hospital_slug?: string;
  hospital_name?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const logout = useLogout();
  const [user, setUser] = useState<ProfileUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <UserIcon className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">My Profile</h1>
              <p className="mt-2 text-blue-100">Manage your account details</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto p-6 -mt-8 space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                {(user?.full_name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.full_name || 'Guest'}</h2>
                <p className="text-sm text-muted-foreground">{user?.email || 'Not signed in'}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium capitalize">{user?.role || '—'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hospital</span>
                <span className="font-medium">{user?.hospital_name || user?.hospital_slug || '—'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account</span>
                <span className="inline-flex items-center gap-1 font-medium text-green-600">
                  <ShieldCheck className="h-4 w-4" /> Active
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {user?.hospital_slug && (
                <Button variant="outline" onClick={() => router.push(`/${user.hospital_slug}`)}>
                  Open Hospital Portal
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
