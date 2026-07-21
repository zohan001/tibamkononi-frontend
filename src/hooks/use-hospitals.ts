'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Hospital } from '@/types/hospital';

export function useHospitalsList() {
  return useQuery<Hospital[]>({
    queryKey: ['hospitals'],
    queryFn: () => api.get('/hospitals'),
    staleTime: 30000,
  });
}

export function useHospital(slug: string) {
  return useQuery<Hospital>({
    queryKey: ['hospitals', slug],
    queryFn: () => api.get(`/hospitals/${slug}`),
    staleTime: 30000,
  });
}

export function useRegisterHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => api.post('/hospitals/register', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hospitals'] });
    },
  });
}
