'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface CountyDashboard {
  hospitalsActive: number;
  bedsAvailable: number;
  criticalAlerts: number;
  distressSignals: number;
}

interface CountyHospital {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'suspended';
  alertCount: number;
}

export function useCountyDashboard() {
  return useQuery<CountyDashboard>({
    queryKey: ['county', 'dashboard'],
    queryFn: () => api.get('/county/dashboard'),
    staleTime: 30000,
  });
}

export function useCountyHospitals() {
  return useQuery<CountyHospital[]>({
    queryKey: ['county', 'hospitals'],
    queryFn: () => api.get('/county/hospitals'),
    staleTime: 30000,
  });
}

export function useCountyWatchlist() {
  return useQuery({
    queryKey: ['county', 'watchlist'],
    queryFn: () => api.get('/county/watchlist'),
    staleTime: 30000,
  });
}

export function useApproveHospital() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hospitalId: string) =>
      api.post(`/county/hospitals/${hospitalId}/approve`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['county', 'hospitals'] });
    },
  });
}
