'use client';

import {
  AlertTriangle,
  Users,
  Skull,
  ShieldAlert,
  Ambulance,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { SeverityBadge } from '@/components/shared/severity-badge';
import type { EmergencyAnalysis } from '@/types/emergency';

interface EmergencyAnalysisProps {
  analysis: EmergencyAnalysis;
}

const detailIcons = {
  casualties: Users,
  hazards: Skull,
  recommendedResponse: ShieldAlert,
};

const severityLabels: Record<string, string> = {
  minor: 'Minor',
  moderate: 'Moderate',
  severe: 'Severe',
  critical: 'Critical',
};

export function EmergencyAnalysis({ analysis }: EmergencyAnalysisProps) {
  const details = [
    { label: 'Casualties', value: analysis.casualties, key: 'casualties' as const },
    { label: 'Hazards', value: analysis.hazards, key: 'hazards' as const },
    {
      label: 'Recommended Response',
      value: analysis.recommendedResponse,
      key: 'recommendedResponse' as const,
    },
  ];

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold">{analysis.type}</h3>
          </div>
          <GemmaBadge />
        </div>

        <div className="flex flex-wrap gap-2">
          <SeverityBadge severity={analysis.severity} size="md" />
          {severityLabels[analysis.severity] && (
            <span className="text-xs text-muted-foreground">
              {severityLabels[analysis.severity]} severity
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{analysis.description}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((d) => {
            const Icon = detailIcons[d.key];
            return (
              <div
                key={d.key}
                className="flex items-start gap-2 rounded-lg bg-muted/50 p-3"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="text-sm font-medium">{d.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/50">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <div>
            <p className="text-xs font-medium text-red-700 dark:text-red-400">
              Emergency Detected
            </p>
            <div className="flex items-center gap-1 text-sm text-red-600 dark:text-red-300">
              <Ambulance className="h-4 w-4" />
              <span>EMS has been notified. Stay safe.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
