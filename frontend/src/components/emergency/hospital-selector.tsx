'use client';

import { useState } from 'react';
import { MapPin, Clock, BedDouble, Ambulance } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistance } from '@/lib/formatters';

interface HospitalSelectorItem {
  hospitalSlug: string;
  name: string;
  distance: number;
  eta: string;
  bedsAvailable: number;
  hasICU: boolean;
  hasAmbulance: boolean;
}

interface HospitalSelectorProps {
  hospitals?: HospitalSelectorItem[];
  onSelectionChange?: (selected: string[]) => void;
}

export function HospitalSelector({
  hospitals = [],
  onSelectionChange,
}: HospitalSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      onSelectionChange?.(Array.from(next));
      return next;
    });
  };

  const sorted = [...hospitals].sort((a, b) => a.distance - b.distance);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Select hospitals to alert ({sorted.length} nearest found)
      </p>
      <div className="space-y-2">
        {sorted.map((h) => {
          const isSelected = selected.has(h.hospitalSlug);
          return (
            <label
              key={h.hospitalSlug}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                isSelected && 'border-primary bg-primary/5'
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(h.hospitalSlug)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="min-w-0 flex-1 space-y-1.5">
                <p className="text-sm font-medium">{h.name}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {formatDistance(h.distance)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {h.eta}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-3 w-3" />
                    {h.bedsAvailable} beds
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {h.hasICU && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                      ICU
                    </span>
                  )}
                  {h.hasAmbulance ? (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:bg-green-950/50 dark:text-green-400">
                      <Ambulance className="h-3 w-3" />
                      Ambulance
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-950/50 dark:text-red-400">
                      <Ambulance className="h-3 w-3" />
                      No Ambulance
                    </span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
