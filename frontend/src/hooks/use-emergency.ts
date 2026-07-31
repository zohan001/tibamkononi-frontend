'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { EmergencyAnalysis } from '@/types/emergency';

interface EmergencyAnalyzePayload {
  input_type: 'text' | 'camera' | 'voice';
  latitude: number;
  longitude: number;
  text?: string;
  language?: string;
}

export function useAnalyzeEmergency() {
  return useMutation<EmergencyAnalysis, Error, EmergencyAnalyzePayload>({
    mutationFn: (data) => api.post('/emergency/analyze', data),
  });
}

export function useSendEmergency() {
  return useMutation({
    mutationFn: (data: unknown) => api.post('/emergency/send', data),
  });
}
