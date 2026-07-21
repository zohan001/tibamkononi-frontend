'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Appointment } from '@/types/appointment';

export function useAvailableSlots(hospitalSlug: string, date: string) {
  return useQuery<Appointment[]>({
    queryKey: ['appointments', 'available', hospitalSlug, date],
    queryFn: () => api.get(`/appointments/available?hospital_slug=${hospitalSlug}&date=${date}`),
    staleTime: 30000,
  });
}

export function useAppointments(hospitalSlug?: string) {
  return useQuery<Appointment[]>({
    queryKey: ['appointments', hospitalSlug],
    queryFn: () => {
      const params = hospitalSlug ? `?hospital=${hospitalSlug}` : '';
      return api.get(`/appointments${params}`);
    },
    staleTime: 30000,
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => api.post('/appointments/book', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId: string) =>
      api.patch(`/appointments/${appointmentId}/cancel`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
