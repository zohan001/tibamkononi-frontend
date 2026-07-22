'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { ApprovalQueue } from '@/components/county/approval-queue';
import { useCountyHospitals, useApproveHospital } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ApprovalsPage() {
  const { data: hospitals, isLoading } = useCountyHospitals();
  const approveHospital = useApproveHospital();

  const pendingHospitals = (hospitals || [])
    .filter((h) => h.status === 'pending')
    .map((h) => ({
      id: h.id,
      name: h.name,
      type: 'Private' as const,
      createdAt: '2026-07-18',
    }));

  const handleApprove = (id: string) => {
    approveHospital.mutate(id, {
      onSuccess: () => {
        toast.success('Hospital approved successfully');
      },
      onError: (error) => {
        toast.error(`Failed to approve: ${error.message}`);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <CountySidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Pending Hospital Approvals</h1>
        <ApprovalQueue pendingHospitals={pendingHospitals} onApprove={handleApprove} />
      </div>
    </div>
  );
}
