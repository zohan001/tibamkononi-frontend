'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, KeyRound, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <KeyRound className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Forgot Password</h1>
              <p className="mt-3 text-orange-100 text-lg">
                We&apos;ll help you reset your password.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto p-6 -mt-8 space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            {!submitted ? (
              <>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Reset Your Password</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the email address associated with your account and we&apos;ll send you a
                    link to reset your password.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fp-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="fp-email"
                      type="email"
                      placeholder="you@hospital.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading || !email.trim()}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Check Your Email</h2>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to{' '}
                    <strong>{email}</strong>. Please check your inbox and follow the
                    instructions.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </p>
                <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                  Try a different email
                </Button>
              </div>
            )}
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
