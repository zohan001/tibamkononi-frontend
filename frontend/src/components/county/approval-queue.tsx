'use client';

import { Check, X, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';
import { HOSPITAL_TYPE_LABELS } from '@/lib/constants';

interface PendingHospital {
  id: string;
  name: string;
  type: 'PHC' | 'CHC' | 'District' | 'Private';
  createdAt: string;
}

interface ApprovalQueueProps {
  pendingHospitals: PendingHospital[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ApprovalQueue({
  pendingHospitals,
  onApprove,
  onReject,
}: ApprovalQueueProps) {
  if (pendingHospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No pending approvals</p>
      </div>
    );
  }

  return (
    <div className="divide-y rounded-lg border">
      {pendingHospitals.map((hospital) => (
        <div
          key={hospital.id}
          className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50"
        >
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-medium">{hospital.name}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {HOSPITAL_TYPE_LABELS[hospital.type] ?? hospital.type}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(hospital.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <Button
              size="xs"
              variant="ghost"
              className="text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950/50"
              onClick={() => onApprove?.(hospital.id)}
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button
              size="xs"
              variant="ghost"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50"
              onClick={() => onReject?.(hospital.id)}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
