'use client';

import { Building2, Sparkles, ShieldCheck, CheckCircle2, AlertCircle, LogIn } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { RegistrationForm } from '@/components/hospital/registration-form';
import { useRegisterHospital } from '@/hooks/use-hospitals';

interface RegistrationResult {
  slug: string;
  name: string;
  email: string;
  password: string;
}

export default function RegisterHospitalPage() {
  const registerMutation = useRegisterHospital();

  const handleSubmit = (data: {
    hospitalName: string;
    administrator: string;
    email: string;
    phone: string;
    address: string;
    county: string;
    description: string;
    password: string;
  }) => {
    registerMutation.mutate({
      name: data.hospitalName,
      type: 'Private',
      county: data.county || 'Mombasa',
      physicalAddress: data.address,
      contactPhone: data.phone,
      email: data.email,
      description: data.description,
      administrator: {
        name: data.administrator,
        email: data.email,
        phone: data.phone,
      },
      password: data.password,
      adminRole: 'hospital_admin',
    });
  };

  const result = registerMutation.data as RegistrationResult | undefined;

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white/20 p-5">
              <Building2 className="h-12 w-12"/>
            </div>
            <div>
              <h1 className="text-5xl font-bold">
                Register Your Hospital
              </h1>
              <p className="mt-3 text-cyan-100 text-lg">
                Join the Tibamkononi Healthcare Network and connect with Mombasa County&apos;s digital health ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-8 text-center">
              <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-4"/>
              <h3 className="text-xl font-bold">
                AI Powered
              </h3>
              <p className="mt-3 text-slate-500">
                Gemma AI assists hospitals with triage,
                inventory prediction and emergency support.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8 text-center">
              <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-4"/>
              <h3 className="text-xl font-bold">
                Secure Platform
              </h3>
              <p className="mt-3 text-slate-500">
                Secure authentication,
                protected patient records
                and county oversight.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="h-10 w-10 text-purple-600 mx-auto mb-4"/>
              <h3 className="text-xl font-bold">
                Connected Hospitals
              </h3>
              <p className="mt-3 text-slate-500">
                Share resources, receive alerts
                and collaborate with other
                healthcare facilities.
              </p>
            </CardContent>
          </Card>
        </div>

        {registerMutation.isError && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0"/>
            <div>
              <strong>Registration failed.</strong>{' '}
              {registerMutation.error?.message || 'Please check your details and try again.'}
            </div>
          </div>
        )}

        {registerMutation.isSuccess && result ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-10 text-center space-y-5">
              <div className="text-6xl">
                <CheckCircle2 className="mx-auto text-green-600 h-16 w-16"/>
              </div>
              <h2 className="text-3xl font-bold text-green-700">
                Application Submitted
              </h2>
              <p className="text-green-600 max-w-2xl mx-auto leading-8">
                <strong>{result.name}</strong> has been submitted for county approval.
                An administrator account has been created — keep these credentials safe:
              </p>
              <div className="mx-auto max-w-md rounded-xl bg-white p-6 text-left shadow-sm">
                <div className="flex justify-between border-b pb-2 mb-2 text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-mono font-medium">{result.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Password</span>
                  <span className="font-mono font-medium">{result.password}</span>
                </div>
              </div>
              <p className="text-sm text-green-600">
                Once the County Health Administration approves your hospital, sign in with
                these credentials to access your hospital dashboard.
              </p>
              <Button render={<Link href="/auth/login"/>}>
                <LogIn className="mr-2 h-4 w-4"/>
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8">
              <RegistrationForm onSubmit={handleSubmit} submitting={registerMutation.isPending}/>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">
                Registration Progress
              </h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Application</span>
                    <span>100%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-full rounded-full bg-green-500"/>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>County Review</span>
                    <span>Pending</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200"/>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Approval</span>
                    <span>Pending</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">
                What Happens Next
              </h2>
              <ol className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">1</span>
                  County Health Administration reviews your application.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">2</span>
                  Once approved, your hospital appears in the live county network.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">3</span>
                  Sign in with your administrator email + password to open your hospital dashboard.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">
                Gemma AI Assistant
              </h2>
              <div className="rounded-xl bg-blue-50 p-5 leading-7">
                Welcome to Tibamkononi.
                Once your hospital is approved, you&apos;ll gain access to:
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>AI Clinical Insights</li>
                  <li>Emergency Coordination</li>
                  <li>Inventory Forecasting</li>
                  <li>Bed Management</li>
                  <li>County Analytics Dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
