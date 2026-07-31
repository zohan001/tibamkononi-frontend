'use client';

import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  steps: { label: string; icon?: React.ComponentType<{ className?: string }> }[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            currentStep === i + 1
              ? 'bg-slate-900 text-white'
              : currentStep > i + 1
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-500'
          }`}>
            {currentStep > i + 1 ? (
              <CheckCircle className="h-4 w-4" />
            ) : step.icon ? (
              <step.icon className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4 flex items-center justify-center text-xs">{i + 1}</span>
            )}
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && <div className="w-8 h-px bg-slate-200 mx-1" />}
        </div>
      ))}
    </div>
  );
}
