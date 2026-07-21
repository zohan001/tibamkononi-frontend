'use client';

import { ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/formatters';

interface Allocation {
  hospitalName: string;
  amount: number;
  percentage: number;
}

interface FundingAllocationProps {
  allocations: Allocation[];
  totalFund: number;
}

export function FundingAllocation({
  allocations,
  totalFund,
}: FundingAllocationProps) {
  if (allocations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground">No allocations yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/50 p-3">
        <p className="text-xs text-muted-foreground">Total Fund</p>
        <p className="text-xl font-bold">{formatCurrency(totalFund)}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital</TableHead>
            <TableHead className="text-right">Amount (KES)</TableHead>
            <TableHead className="w-[200px]">Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allocations.map((a) => (
            <TableRow key={a.hospitalName}>
              <TableCell className="font-medium">{a.hospitalName}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(a.amount)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ProgressTrack className="h-2">
                    <ProgressIndicator
                      className="bg-primary"
                      style={{ width: `${a.percentage}%` }}
                    />
                  </ProgressTrack>
                  <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                    {a.percentage}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
