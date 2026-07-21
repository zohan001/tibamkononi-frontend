'use client';

import { RegistrationForm } from '@/components/hospital/registration-form';

export default function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Register Your Hospital</h1>
        <p className="text-slate-600 mt-2">
          Join the Mombasa County healthcare network. Complete the registration below.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
