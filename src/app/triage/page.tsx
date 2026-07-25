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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SymptomInput } from '@/components/triage/symptom-input';
import { TriageResult } from '@/components/triage/triage-result';
import { HospitalRecommendation } from '@/components/triage/hospital-recommendation';
import { AiTriageWorkflow } from '@/components/ai/ai-triage-workflow';
import { DiseaseProbabilityCards } from '@/components/ai/disease-probability-cards';
import { MedicineRecommendationCards } from '@/components/ai/medicine-recommendation-cards';
import { HospitalRecommendationPanel } from '@/components/ai/hospital-recommendation-panel';
import { useTriageAnalysis } from '@/hooks/use-triage';
import type { TriageResult as TriageResultType } from '@/types/triage';

export default function TriagePage() {

  const [submitted, setSubmitted] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResultType | null>(null);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<string>('Male');

  const triageMutation = useTriageAnalysis();

  const handleTriageComplete = (data: { symptoms: string[]; notes: string }) => {
    const symptomsText = [...data.symptoms, data.notes].filter(Boolean).join(', ');
    triageMutation.mutate(
      {
        symptoms_text: symptomsText,
        age,
        gender,
      },
      {
        onSuccess: (result) => {
          setTriageResult(result);
          setSubmitted(true);
        },
      }
    );
  };

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

        {/* AI Triage Workflow */}

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <Sparkles className="text-blue-600"/>

              <h2 className="text-2xl font-bold">

                AI Symptom Workflow

              </h2>

            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="triage-age">Age</Label>
                <Input
                  id="triage-age"
                  type="number"
                  min={0}
                  max={150}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="triage-gender">Gender</Label>
                <Select value={gender} onValueChange={(v) => v && setGender(v)}>
                  <SelectTrigger id="triage-gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AiTriageWorkflow onComplete={handleTriageComplete} />

          </CardContent>

        </Card>

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

              <TriageResult result={triageResult ?? undefined} />

            </CardContent>

          </Card>

        </div>

        {/* AI Disease Probability Cards */}

        {triageResult && triageResult.diseases.length > 0 && (
          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <Stethoscope className="text-purple-600"/>

                <h2 className="text-2xl font-bold">

                  Disease Probability Analysis

                </h2>

              </div>

              <DiseaseProbabilityCards
                diseases={triageResult.diseases.map((d) => ({
                  name: d.name,
                  probability: d.probability,
                  confidence: Math.round(d.probability * 100),
                  explanation: `Probability of ${d.name} based on reported symptoms.`,
                }))}
              />

            </CardContent>

          </Card>
        )}

        {/* AI Medicine Recommendations */}

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <ClipboardCheck className="text-emerald-600"/>

              <h2 className="text-2xl font-bold">

                Medicine Recommendations

              </h2>

            </div>

            <MedicineRecommendationCards medicines={[]} />

          </CardContent>

        </Card>

        {/* AI Hospital Recommendation Panel */}

        {triageResult && triageResult.hospitalRecommendations.length > 0 && (
          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <ClipboardCheck className="text-emerald-600"/>

                <h2 className="text-2xl font-bold">

                  AI Hospital Recommendations

                </h2>

              </div>

              <HospitalRecommendationPanel
                hospitals={triageResult.hospitalRecommendations.map((rec) => ({
                  name: rec.name,
                  slug: rec.slug,
                  distance: rec.distance,
                  waitTime: rec.waitTime,
                  bedsAvailable: rec.doctorPresent ? 10 : 5,
                  matchScore: rec.gemmaRecommendation ? 95 : 70,
                  reason: `${rec.name} is recommended based on ${rec.testAvailable ? 'test availability' : 'proximity'}${rec.medicineInStock ? ' and medicine stock' : ''}.`,
                }))}
              />

            </CardContent>

          </Card>
        )}

        {/* Existing Hospital Recommendation */}

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

                    {triageResult ? `${Math.round(triageResult.diseases.reduce((acc, d) => acc + d.probability, 0) / Math.max(triageResult.diseases.length, 1) * 100)}%` : '87%'}

                  </div>

                  <p className="mt-3 text-slate-500">

                    AI Confidence

                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="p-6 text-center">

                  <div className="text-5xl font-bold text-orange-600">

                    {triageResult?.level?.charAt(0).toUpperCase() + (triageResult?.level?.slice(1) ?? '') || 'High'}

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

                  {triageResult?.selfCareAdvice && triageResult.selfCareAdvice.length > 0
                    ? triageResult.selfCareAdvice.map((advice, i) => (
                        <div key={i} className="rounded-lg bg-slate-100 p-5">
                          ✓ {advice}
                        </div>
                      ))
                    : (
                      <>
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
                      </>
                    )
                  }

                </div>

              </CardContent>

            </Card>

          </>

        )}

      </div>

    </main>

  );

}
