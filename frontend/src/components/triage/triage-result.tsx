'use client';

import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Ambulance,
  Stethoscope,
  Lightbulb,
  ListChecks,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import type { TriageResult } from '@/types/triage';
import { TRIAGE_LEVELS } from '@/lib/constants';
import { HospitalRecommendation } from './hospital-recommendation';

interface TriageResultProps {
  result?: TriageResult;
}

export function TriageResult({ result }: TriageResultProps) {
  if (!result) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>Submit symptoms to see AI assessment results.</p>
      </div>
    );
  }
  const levelConfig = TRIAGE_LEVELS[result.level];

  return (
    <div className="space-y-4">
      {result.emergencyWarning && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Emergency Warning
            </p>
            <p className="text-sm text-red-600 dark:text-red-300">
              {result.emergencyWarning}
            </p>
          </div>
        </div>
      )}

      <Card
        className={`border-l-4 ${levelConfig?.color ? `border-l-${levelConfig.color.replace('bg-', '')}` : ''}`}
      >
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p
              className="text-sm font-bold uppercase"
              style={{ color: levelConfig?.color ? undefined : undefined }}
            >
              {levelConfig?.label ?? result.level}
            </p>
            <p className="text-xs text-muted-foreground">
              {levelConfig?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-4 w-4 rounded-full ${levelConfig?.color ?? 'bg-gray-400'}`}
            />
            <GemmaBadge />
          </div>
        </CardContent>
      </Card>

      {result.diseases.length > 0 && (
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            Possible Conditions
          </h4>
          <div className="space-y-2 rounded-lg border p-3">
            {result.diseases.map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{d.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {(d.probability * 100).toFixed(0)}%
                  </span>
                </div>
                <ProgressTrack className="h-1.5">
                  <ProgressIndicator
                    className={
                      d.probability > 0.7
                        ? 'bg-red-500'
                        : d.probability > 0.4
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                    }
                    style={{ width: `${d.probability * 100}%` }}
                  />
                </ProgressTrack>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.hospitalRecommendations.length > 0 && (
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <Ambulance className="h-4 w-4 text-muted-foreground" />
            Hospital Recommendations
          </h4>
          <div className="space-y-2">
            {result.hospitalRecommendations.map((rec) => (
              <HospitalRecommendation key={rec.slug} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {result.selfCareAdvice.length > 0 && (
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
            Self-Care Advice
          </h4>
          <ul className="space-y-1 rounded-lg border p-3">
            {result.selfCareAdvice.map((advice, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                {advice}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="flex-1">
          <Ambulance className="h-4 w-4" />
          Go to Emergency
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex-1">
          <CalendarClock className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
