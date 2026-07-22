'use client';

import { useState } from 'react';
import { SymptomInput } from '@/components/triage/symptom-input';
import { TriageResult } from '@/components/triage/triage-result';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { Stethoscope } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useTriageAnalysis } from '@/hooks/use-triage';
import { toast } from 'sonner';

export default function TriagePage() {
  const [showResult, setShowResult] = useState(false);
  const triageAnalysis = useTriageAnalysis();

  const handleAnalyze = (data: { symptoms: string; age: number; gender: string; location: { latitude: number; longitude: number } }) => {
    triageAnalysis.mutate(
      {
        symptoms_text: data.symptoms,
        age: data.age,
        gender: data.gender,
        language: 'en',
      },
      {
        onSuccess: () => {
          setShowResult(true);
        },
        onError: (error) => {
          toast.error(`Analysis failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="h-8 w-8 text-slate-700" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Self-Diagnosis & Triage</h1>
        <p className="text-slate-600 mt-2">Describe your symptoms — Gemma 4 will help</p>
        <div className="mt-2"><GemmaBadge /></div>
      </div>

      {triageAnalysis.isPending ? (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Analyzing your symptoms...</p>
          <p className="text-sm text-slate-400 mt-1">Gemma 4 is processing your information</p>
        </div>
      ) : !showResult ? (
        <SymptomInput onAnalyze={handleAnalyze} />
      ) : (
        triageAnalysis.data && <TriageResult result={triageAnalysis.data} />
      )}
    </div>
  );
}
