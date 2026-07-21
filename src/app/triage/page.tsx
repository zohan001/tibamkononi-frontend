'use client';

import { useState } from 'react';
import { SymptomInput } from '@/components/triage/symptom-input';
import { TriageResult } from '@/components/triage/triage-result';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { Stethoscope } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const mockResult = {
  level: 'urgent' as const,
  diseases: [
    { name: 'Malaria', probability: 78 },
    { name: 'Typhoid', probability: 15 },
    { name: 'Dengue', probability: 5 },
    { name: 'Common Cold', probability: 2 },
  ],
  hospitalRecommendations: [
    { rank: 1, name: 'Mama Ngina Hospital', slug: 'mama-ngina', distance: 2.3, testAvailable: true, medicineInStock: true, doctorPresent: true, waitTime: '25 min', gemmaRecommendation: true },
    { rank: 2, name: 'Likoni PHC', slug: 'likoni-phc', distance: 1.1, testAvailable: 'low' as const, medicineInStock: true, doctorPresent: false, waitTime: '50 min', gemmaRecommendation: false },
  ],
  selfCareAdvice: [
    'Take paracetamol for fever',
    'Drink plenty of water or ORS',
    'Rest in a cool place',
  ],
  emergencyWarning: 'Go to EMERGENCY immediately if: confusion, severe vomiting, blood in stool, difficulty breathing',
  gemmaRecommendation: "Go to Mama Ngina Hospital. It's slightly farther but has tests, medicine, a doctor available, and shorter wait time.",
};

export default function TriagePage() {
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2500);
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

      {isAnalyzing ? (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Analyzing your symptoms...</p>
          <p className="text-sm text-slate-400 mt-1">Gemma 4 is processing your information</p>
        </div>
      ) : !showResult ? (
        <SymptomInput onAnalyze={handleAnalyze} />
      ) : (
        <TriageResult result={mockResult} />
      )}
    </div>
  );
}
