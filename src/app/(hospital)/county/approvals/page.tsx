'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { HospitalApprovalCard } from '@/components/county/hospital-approval-card';
import { useCountyHospitals, useApproveHospital } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ApprovalsPage() {
  const { data: hospitals, isLoading } = useCountyHospitals();
  const approveHospital = useApproveHospital();

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

  const pendingHospitals = (hospitals || []).filter((h) => h.status === 'pending');

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Pending Hospital Approvals</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingHospitals.map((h) => (
            <HospitalApprovalCard
              key={h.id}
              hospital={{
                name: h.name,
                slug: h.id,
                type: 'Hospital',
                dateApplied: new Date().toISOString(),
                documents: ['License', 'Registration Certificate'],
              }}
              onApprove={() => handleApprove(h.id)}
            />
          ))}
        </div>
        {pendingHospitals.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No pending approvals.</p>
        )}
      </div>
    </div>
  );
}
