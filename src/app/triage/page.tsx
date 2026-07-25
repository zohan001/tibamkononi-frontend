'use client';

import { useState } from 'react';

import {
  Sparkles,
  Stethoscope,
  HeartPulse,
  ClipboardCheck,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { SymptomInput } from '@/components/triage/symptom-input';
import { TriageResult } from '@/components/triage/triage-result';
import { HospitalRecommendation } from '@/components/triage/hospital-recommendation';

export default function TriagePage() {

  const [submitted, setSubmitted] = useState(false);

  return (

    <main className="min-h-screen bg-slate-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-white/20 p-4">

              <Sparkles className="h-10 w-10"/>

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                AI Health Assessment

              </h1>

              <p className="mt-3 text-blue-100 text-lg">

                Describe your symptoms and let Gemma AI help assess your condition.

              </p>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold">

                  Patient Self-Triage

                </h2>

                <p className="text-slate-500 mt-2">

                  Enter your symptoms below to receive an AI-assisted assessment.

                </p>

              </div>

              <Button onClick={() => setSubmitted(true)}>

                Analyze Symptoms

              </Button>

            </div>

          </CardContent>

        </Card>

        <div className="grid lg:grid-cols-2 gap-8">

          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <Stethoscope className="text-blue-600"/>

                <h2 className="text-2xl font-bold">

                  Symptoms

                </h2>

              </div>

              <SymptomInput/>

            </CardContent>

          </Card>

                    <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <HeartPulse className="text-red-600"/>

                <h2 className="text-2xl font-bold">

                  AI Assessment

                </h2>

              </div>

              <TriageResult/>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <ClipboardCheck className="text-emerald-600"/>

              <h2 className="text-2xl font-bold">

                Recommended Hospital

              </h2>

            </div>

            <HospitalRecommendation/>

          </CardContent>

        </Card>

        {submitted && (

          <>

            <Card className="border-red-200 bg-red-50">

              <CardContent className="p-6">

                <h3 className="font-bold text-red-700 text-xl mb-3">

                  Emergency Warning

                </h3>

                <p className="text-red-600 leading-7">

                  If you are experiencing severe chest pain,
                  difficulty breathing, excessive bleeding,
                  loss of consciousness or seizures,
                  seek emergency medical attention immediately
                  or call emergency services.

                </p>

              </CardContent>

            </Card>

            <div className="grid md:grid-cols-3 gap-6">

              <Card>

                <CardContent className="p-6 text-center">

                  <div className="text-5xl font-bold text-blue-600">

                    87%

                  </div>

                  <p className="mt-3 text-slate-500">

                    AI Confidence

                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="p-6 text-center">

                  <div className="text-5xl font-bold text-orange-600">

                    High

                  </div>

                  <p className="mt-3 text-slate-500">

                    Severity Level

                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="p-6 text-center">

                  <div className="text-5xl font-bold text-green-600">

                    12m

                  </div>

                  <p className="mt-3 text-slate-500">

                    Estimated Wait Time

                  </p>

                </CardContent>

              </Card>

            </div>

            <Card>

              <CardContent className="p-8">

                <h2 className="text-2xl font-bold mb-6">

                  AI Care Recommendations

                </h2>

                <div className="space-y-4">

                  <div className="rounded-lg bg-slate-100 p-5">

                    ✓ Drink plenty of fluids while awaiting medical review.

                  </div>

                  <div className="rounded-lg bg-slate-100 p-5">

                    ✓ Continue monitoring symptoms closely.

                  </div>

                  <div className="rounded-lg bg-slate-100 p-5">

                    ✓ Visit the recommended hospital as soon as possible.

                  </div>

                  <div className="rounded-lg bg-slate-100 p-5">

                    ✓ Bring previous prescriptions or medical records if available.

                  </div>

                </div>

              </CardContent>

            </Card>

          </>

        )}

      </div>

    </main>

  );

}