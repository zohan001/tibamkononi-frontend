'use client';

import { useState, useCallback } from 'react';
import {
  BrainCircuit,
  ClipboardList,
  Stethoscope,
  Building2,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StepIndicator } from '@/components/shared/step-indicator';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { cn } from '@/lib/utils';

interface AiTriageWorkflowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete?: (result: any) => void;
}

const COMMON_SYMPTOMS = [
  'Fever',
  'Headache',
  'Cough',
  'Chest Pain',
  'Difficulty Breathing',
  'Nausea',
  'Vomiting',
  'Diarrhea',
  'Fatigue',
  'Dizziness',
  'Abdominal Pain',
  'Joint Pain',
  'Skin Rash',
  'Sore Throat',
  'Loss of Appetite',
  'Body Aches',
];

const STEPS = [
  { label: 'Symptoms', icon: ClipboardList },
  { label: 'Analysis', icon: BrainCircuit },
  { label: 'Results', icon: Stethoscope },
  { label: 'Hospital', icon: Building2 },
];

export function AiTriageWorkflow({ onComplete }: AiTriageWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  }, []);

  const handleAnalyze = useCallback(() => {
    setCurrentStep(2);
    setTimeout(() => {
      setCurrentStep(3);
      onComplete?.({
        symptoms: selectedSymptoms,
        notes: additionalNotes,
      });
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSymptoms, additionalNotes, onComplete]);

  const handleProceedToHospital = useCallback(() => {
    setCurrentStep(4);
  }, []);

  return (
    <div className="space-y-6">
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMMON_SYMPTOMS.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                    selectedSymptoms.includes(symptom)
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                      : 'bg-background hover:bg-muted border-muted-foreground/20'
                  )}
                >
                  {symptom}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Notes (optional)</Label>
              <Textarea
                id="additional-notes"
                placeholder="Describe any other symptoms, their severity, duration..."
                className="min-h-20"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={selectedSymptoms.length === 0}
              className="w-full"
            >
              <BrainCircuit className="h-4 w-4" />
              Analyze with AI
              <Sparkles className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardContent className="py-16 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="rounded-full bg-blue-100 p-6 animate-pulse">
                <BrainCircuit className="h-12 w-12 text-blue-600" />
              </div>
              <div className="absolute -top-1 -right-1 rounded-full bg-white p-1 shadow-sm">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-spin" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg">Analyzing Your Symptoms</p>
              <p className="text-sm text-muted-foreground">
                Our AI is evaluating {selectedSymptoms.length} symptoms...
              </p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Analysis Complete</h3>
                <GemmaBadge />
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Symptoms Analyzed:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedSymptoms.map((s) => (
                  <span
                    key={s}
                    className="inline-block rounded-full bg-background px-2.5 py-0.5 text-xs font-medium ring-1 ring-foreground/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/50">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                This is an AI-assisted assessment. Please consult a healthcare professional for definitive diagnosis.
              </p>
            </div>

            <Button onClick={handleProceedToHospital} className="w-full">
              <Building2 className="h-4 w-4" />
              View Hospital Recommendations
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Hospital Recommendations</h3>
                <p className="text-xs text-muted-foreground">
                  Based on your symptoms and location
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground text-center">
              <p>Hospital recommendations will appear here based on AI analysis.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
