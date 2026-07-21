'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { ApprovalQueue } from '@/components/county/approval-queue';

const mockPending = [
  { id: '1', name: 'Mvita Community Hospital', type: 'Private' as const, createdAt: '2026-07-18' },
  { id: '2', name: 'Nyali Health Centre', type: 'CHC' as const, createdAt: '2026-07-19' },
  { id: '3', name: 'Jomvu PHC Extension', type: 'PHC' as const, createdAt: '2026-07-20' },
];

export default function ApprovalsPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Pending Hospital Approvals</h1>
        <ApprovalQueue pendingHospitals={mockPending} />
      </div>
    </div>
  );
}
