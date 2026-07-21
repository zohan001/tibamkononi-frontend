'use client';

import {
  MapPin,
  Clock,
  FlaskConical,
  Pill,
  Stethoscope,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { formatDistance } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { HospitalRecommendation as RecType } from '@/types/triage';

interface HospitalRecommendationProps {
  recommendation: RecType;
}

export function HospitalRecommendation({
  recommendation: rec,
}: HospitalRecommendationProps) {
  return (
    <Card size="sm">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {rec.rank}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">{rec.name}</span>
              {rec.gemmaRecommendation && <GemmaBadge />}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {formatDistance(rec.distance)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {rec.waitTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <StatusBadge
                ok={rec.testAvailable === true}
                partial={rec.testAvailable === 'low'}
                label={rec.testAvailable === true ? 'Tests Available' : rec.testAvailable === 'low' ? 'Limited Tests' : 'No Tests'}
                icon={<FlaskConical className="h-3 w-3" />}
              />
              <StatusBadge
                ok={rec.medicineInStock}
                label={rec.medicineInStock ? 'Medicine In Stock' : 'Low Stock'}
                icon={<Pill className="h-3 w-3" />}
              />
              <StatusBadge
                ok={rec.doctorPresent}
                label={rec.doctorPresent ? 'Doctor Present' : 'No Doctor'}
                icon={<Stethoscope className="h-3 w-3" />}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({
  ok,
  partial,
  label,
  icon,
}: {
  ok: boolean;
  partial?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium',
        ok &&
          'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
        !ok &&
          !partial &&
          'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
        partial &&
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400'
      )}
    >
      {icon}
      {label}
    </span>
  );
}
