'use client';

import { useState } from 'react';
import { Mail, Lock, LogIn, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <LogIn className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Welcome Back</h1>
              <p className="mt-3 text-blue-100 text-lg">
                Sign in to access the Tibamkononi Healthcare Platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto p-6 -mt-8 space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to continue
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@hospital.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(v === true)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href="/auth/register" className="font-medium text-blue-600 hover:underline">
                Register here
              </a>
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-800">Demo Credentials</h4>
                <div className="space-y-1 text-xs text-blue-700">
                  <p><strong>Admin:</strong> admin@tibamkononi.co.ke / admin123</p>
                  <p><strong>Doctor:</strong> doctor@tibamkononi.co.ke / doctor123</p>
                  <p><strong>Nurse:</strong> nurse@tibamkononi.co.ke / nurse123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
