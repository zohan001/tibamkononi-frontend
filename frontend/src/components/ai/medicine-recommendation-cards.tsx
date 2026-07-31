'use client';

import { Pill, Clock, AlertCircle, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ConfidenceIndicator } from './confidence-indicator';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  reason: string;
  confidence: number;
  alternatives?: string[];
}

interface MedicineRecommendationCardsProps {
  medicines?: Medicine[];
}

function getConfidenceBadge(confidence: number): string {
  if (confidence >= 80) return 'text-green-600 bg-green-100 dark:bg-green-950/50 dark:text-green-400';
  if (confidence >= 50) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-950/50 dark:text-yellow-400';
  return 'text-red-600 bg-red-100 dark:bg-red-950/50 dark:text-red-400';
}

export function MedicineRecommendationCards({
  medicines = [],
}: MedicineRecommendationCardsProps) {
  if (medicines.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>AI analysis will show medicine recommendations here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-1.5 text-sm font-medium">
        <Pill className="h-4 w-4 text-muted-foreground" />
        Recommended Medicines
      </h4>
      <div className="space-y-3">
        {medicines.map((med) => (
          <Card key={med.name} size="sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">{med.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{med.dosage}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{med.frequency}</span>
                    </div>
                  </div>
                </div>
                <ConfidenceIndicator value={med.confidence} size="sm" />
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Duration: {med.duration}
                </span>
                <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium', getConfidenceBadge(med.confidence))}>
                  <AlertCircle className="h-3 w-3" />
                  {med.confidence}% confidence
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{med.reason}</p>

              {med.alternatives && med.alternatives.length > 0 && (
                <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <ArrowRightLeft className="h-3 w-3" />
                    Alternatives
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {med.alternatives.map((alt) => (
                      <span
                        key={alt}
                        className="inline-block rounded-full bg-background px-2 py-0.5 text-[10px] font-medium ring-1 ring-foreground/10"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
