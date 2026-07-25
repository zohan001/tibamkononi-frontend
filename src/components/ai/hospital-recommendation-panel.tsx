'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  Bed,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Building2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ConfidenceIndicator } from './confidence-indicator';

interface Hospital {
  name: string;
  slug: string;
  distance: number;
  waitTime: string;
  bedsAvailable: number;
  matchScore: number;
  reason: string;
}

interface HospitalRecommendationPanelProps {
  hospitals?: Hospital[];
}

function formatDistance(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)}m`;
  return `${km.toFixed(1)} km`;
}

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card size="sm" className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="font-medium truncate block">{hospital.name}</span>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {formatDistance(hospital.distance)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {hospital.waitTime}
                </span>
              </div>
            </div>
          </div>
          <ConfidenceIndicator value={hospital.matchScore} size="sm" />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
            <Bed className="h-3 w-3" />
            {hospital.bedsAvailable} beds available
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
            <Sparkles className="h-3 w-3" />
            {hospital.matchScore}% match
          </span>
        </div>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {expanded ? 'Hide details' : 'Why recommended'}
        </button>

        {expanded && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
            {hospital.reason}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function HospitalRecommendationPanel({
  hospitals = [],
}: HospitalRecommendationPanelProps) {
  if (hospitals.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>AI analysis will recommend hospitals here.</p>
      </div>
    );
  }

  const sorted = [...hospitals].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-1.5 text-sm font-medium">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        Recommended Hospitals
      </h4>

      <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-center h-40 text-sm text-muted-foreground">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <span>Map view coming soon</span>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((hospital, i) => (
          <div key={hospital.slug} className="relative">
            <div className="absolute -left-1 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
              {i + 1}
            </div>
            <div className="ml-6">
              <HospitalCard hospital={hospital} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
