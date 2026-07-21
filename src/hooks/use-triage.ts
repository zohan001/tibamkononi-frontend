'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { TriageResult } from '@/types/triage';

interface TriageAnalyzePayload {
  symptoms_text: string;
  language?: string;
  age: number;
  gender: string;
}

export function useTriageAnalysis() {
  return useMutation<TriageResult, Error, TriageAnalyzePayload>({
    mutationFn: (data) => api.post('/triage/analyze', data),
  });
}
