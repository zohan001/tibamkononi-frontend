'use client';

import { useState, useMemo } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HospitalListItem {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'suspended';
  alertCount: number;
}

interface HospitalListProps {
  hospitals: HospitalListItem[];
}

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive'> = {
  approved: 'default',
  pending: 'secondary',
  suspended: 'destructive',
};

export function HospitalList({ hospitals }: HospitalListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return hospitals;
    const q = search.toLowerCase();
    return hospitals.filter((h) => h.name.toLowerCase().includes(q));
  }, [hospitals, search]);

  if (hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No hospitals found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search hospitals..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="divide-y rounded-lg border">
        {filtered.map((hospital) => (
          <div
            key={hospital.id}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50"
          >
            <span className="text-sm font-medium">{hospital.name}</span>
            <div className="flex items-center gap-3">
              {hospital.alertCount > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  {hospital.alertCount}
                </span>
              )}
              <Badge
                variant={statusVariants[hospital.status] ?? 'secondary'}
                className={cn(
                  'capitalize',
                  hospital.status === 'approved' &&
                    'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
                  hospital.status === 'pending' &&
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
                  hospital.status === 'suspended' &&
                    'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                )}
              >
                {hospital.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No hospitals match your search
        </p>
      )}
    </div>
  );
}
