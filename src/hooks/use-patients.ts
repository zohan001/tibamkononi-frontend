'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Patient, Diagnosis } from '@/types/patient';

export function usePatients(hospitalSlug: string) {
  return useQuery<Patient[]>({
    queryKey: ['patients', hospitalSlug],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/patients`),
    staleTime: 30000,
  });
}

export function usePatient(hospitalSlug: string, patientId: string) {
  return useQuery<Patient>({
    queryKey: ['patients', hospitalSlug, patientId],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/patients/${patientId}`),
    staleTime: 30000,
  });
}

export function useRegisterPatient(hospitalSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      api.post(`/hospitals/${hospitalSlug}/patients`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients', hospitalSlug] });
    },
  });
}

export function useDiagnosis(hospitalSlug: string, patientId: string) {
  return useQuery<Diagnosis>({
    queryKey: ['diagnosis', hospitalSlug, patientId],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/patients/${patientId}/diagnosis`),
    staleTime: 60000,
  });
}
