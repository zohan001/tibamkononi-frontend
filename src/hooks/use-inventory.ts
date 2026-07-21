'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { InventoryItem, StockMovement, StockForecast } from '@/types/inventory';

export function useInventory(hospitalSlug: string) {
  return useQuery<InventoryItem[]>({
    queryKey: ['inventory', hospitalSlug],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/inventory`),
    staleTime: 10000,
  });
}

export function useUpdateStock(hospitalSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { itemId: string; quantity: number; type: string }) =>
      api.patch(`/hospitals/${hospitalSlug}/inventory`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', hospitalSlug] });
    },
  });
}

export function useStockForecast(hospitalSlug: string) {
  return useQuery<StockForecast[]>({
    queryKey: ['stock-forecast', hospitalSlug],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/inventory/forecast`),
    staleTime: 60000,
  });
}

export function useStockMovements(hospitalSlug: string) {
  return useQuery<StockMovement[]>({
    queryKey: ['stock-movements', hospitalSlug],
    queryFn: () => api.get(`/hospitals/${hospitalSlug}/inventory/movements`),
    staleTime: 10000,
  });
}
