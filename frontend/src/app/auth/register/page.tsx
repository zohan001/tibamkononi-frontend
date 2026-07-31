'use client';

import { useState } from 'react';
import { User, Building2, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepIndicator } from '@/components/shared/step-indicator';

const steps = [
  { label: 'Personal Info', icon: User },
  { label: 'Hospital Info', icon: Building2 },
  { label: 'Verify', icon: ShieldCheck },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospital, setHospital] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <ShieldCheck className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Create Account</h1>
              <p className="mt-3 text-cyan-100 text-lg">
                Join the Tibamkononi Healthcare Network today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-lg mx-auto p-6 -mt-8 space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            <StepIndicator steps={steps} currentStep={currentStep} />

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">@</span>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="you@hospital.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={next}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Hospital Information</h2>
                  <p className="text-sm text-muted-foreground">Your workplace details</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="hospital"
                        placeholder="Coast General Hospital"
                        className="pl-10"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      placeholder="e.g. Doctor, Nurse, Admin"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g. General Outpatient, Surgery"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={prev}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={next}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Verify & Submit</h2>
                  <p className="text-sm text-muted-foreground">Review your information</p>
                </div>

                <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{name || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{email || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hospital</span>
                    <span className="font-medium">{hospital || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium">{role || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{department || '—'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={prev}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Registration
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="/auth/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
