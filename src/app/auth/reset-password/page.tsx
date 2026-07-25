'use client';

import { useState, useMemo } from 'react';
import { Lock, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-green-500' };
  return { score, label: 'Very Strong', color: 'bg-emerald-600' };
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const match = password.length > 0 && password === confirm;

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <ShieldCheck className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Reset Password</h1>
              <p className="mt-3 text-emerald-100 text-lg">
                Create a new secure password for your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto p-6 -mt-8 space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">New Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter your new password below. Make sure it&apos;s strong and unique.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-1.5 flex-1 rounded-full transition-colors',
                            i < strength.score ? strength.color : 'bg-muted'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: <span className="font-medium">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="pl-10 pr-10"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirm.length > 0 && !match && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
                {confirm.length > 0 && match && (
                  <p className="text-xs text-green-600">Passwords match</p>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!match || strength.score < 2}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          <a
            href="/auth/login"
            className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Login
          </a>
        </p>
      </div>
    </main>
  );
}
