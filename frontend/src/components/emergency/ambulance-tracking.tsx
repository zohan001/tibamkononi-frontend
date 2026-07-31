'use client';

import { Ambulance, MapPin, Clock3, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AmbulanceItem {
  id: string;
  status: 'dispatched' | 'en-route' | 'arrived' | 'returning';
  eta: string;
  hospitalName: string;
  patientName?: string;
  origin?: string;
}

interface AmbulanceTrackingProps {
  ambulances?: AmbulanceItem[];
}

const statusConfig: Record<string, { label: string; color: string; badgeVariant: 'destructive' | 'default' | 'secondary' }> = {
  dispatched: { label: 'Dispatched', color: 'bg-yellow-500', badgeVariant: 'secondary' },
  'en-route': { label: 'En Route', color: 'bg-blue-500', badgeVariant: 'default' },
  arrived: { label: 'Arrived', color: 'bg-green-500', badgeVariant: 'default' },
  returning: { label: 'Returning', color: 'bg-slate-400', badgeVariant: 'secondary' },
};

const timelineSteps = ['dispatched', 'en-route', 'arrived'] as const;

export function AmbulanceTracking({ ambulances = [] }: AmbulanceTrackingProps) {
  return (
    <div className="space-y-4">
      {ambulances.length === 0 && (
        <p className="text-sm text-muted-foreground">No active ambulances</p>
      )}
      {ambulances.map((a) => {
        const config = statusConfig[a.status];
        const currentStep = timelineSteps.indexOf(a.status as typeof timelineSteps[number]);
        const isReturn = a.status === 'returning';

        return (
          <Card key={a.id} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-100 p-2">
                    <Ambulance className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{a.id}</p>
                    <p className="text-xs text-muted-foreground">{a.hospitalName}</p>
                  </div>
                </div>
                <Badge variant={config.badgeVariant}>
                  <span className={cn('mr-2 inline-block h-2 w-2 rounded-full', config.color, a.status === 'en-route' && 'animate-pulse')} />
                  {config.label}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ETA:</span>
                  <strong>{a.eta}</strong>
                </div>
                {a.origin && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate text-muted-foreground">{a.origin}</span>
                  </div>
                )}
                {a.patientName && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate text-muted-foreground">{a.patientName}</span>
                  </div>
                )}
              </div>

              {!isReturn && (
                <div className="flex items-center gap-1">
                  {timelineSteps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={cn(
                            'h-3 w-3 rounded-full border-2',
                            i <= currentStep
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-slate-300 bg-white'
                          )}
                        />
                        <span className="text-[10px] text-muted-foreground mt-1 capitalize">{step.replace('-', ' ')}</span>
                      </div>
                      {i < timelineSteps.length - 1 && (
                        <div className={cn('h-0.5 flex-1', i < currentStep ? 'bg-blue-600' : 'bg-slate-200')} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
