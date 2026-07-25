'use client';

import { Stethoscope, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Disease {
  name: string;
  probability: number;
  confidence: number;
  explanation: string;
}

interface DiseaseProbabilityCardsProps {
  diseases?: Disease[];
}

function getProbabilityColor(probability: number): string {
  if (probability >= 0.7) return 'bg-red-500';
  if (probability >= 0.4) return 'bg-yellow-500';
  return 'bg-green-500';
}

function getProbabilityBadge(probability: number): { bg: string; text: string; label: string } {
  if (probability >= 0.7)
    return { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', label: 'High' };
  if (probability >= 0.4)
    return { bg: 'bg-yellow-100 dark:bg-yellow-950/50', text: 'text-yellow-700 dark:text-yellow-400', label: 'Medium' };
  return { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-700 dark:text-green-400', label: 'Low' };
}

export function DiseaseProbabilityCards({
  diseases = [],
}: DiseaseProbabilityCardsProps) {
  if (diseases.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>AI analysis will show possible conditions here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-1.5 text-sm font-medium">
        <Stethoscope className="h-4 w-4 text-muted-foreground" />
        Possible Conditions
      </h4>
      <div className="space-y-3">
        {diseases.map((disease) => {
          const badge = getProbabilityBadge(disease.probability);
          return (
            <Card key={disease.name} size="sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{disease.name}</span>
                  </div>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', badge.bg, badge.text)}>
                    {badge.label}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Probability</span>
                    <span className="tabular-nums font-medium">{(disease.probability * 100).toFixed(0)}%</span>
                  </div>
                  <ProgressTrack className="h-2">
                    <ProgressIndicator
                      className={getProbabilityColor(disease.probability)}
                      style={{ width: `${disease.probability * 100}%` }}
                    />
                  </ProgressTrack>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BrainCircuit className="h-3 w-3" />
                  <span>Confidence: {disease.confidence}%</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{disease.explanation}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
