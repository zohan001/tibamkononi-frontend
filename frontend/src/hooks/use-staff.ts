'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Staff, StaffAttendance } from '@/types/staff';

export function useStaff(hospitalSlug: string) {
  return useQuery<Staff[]>({
    queryKey: ['staff', hospitalSlug],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/staff`),
    staleTime: 30000,
  });
}

export function useStaffAttendance(hospitalSlug: string, date?: string) {
  return useQuery<StaffAttendance[]>({
    queryKey: ['staff-attendance', hospitalSlug, date],
    queryFn: () => {
      const params = date ? `?date=${date}` : '';
      return api.get(`/hospitals/${hospitalSlug}/staff/attendance${params}`);
    },
    staleTime: 30000,
  });
}

export function useUpdateAttendance(hospitalSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { staffId: string; status: string }) =>
      api.patch(`/hospitals/${hospitalSlug}/staff/attendance`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-attendance'] });
    },
  });
}
