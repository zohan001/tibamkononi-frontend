'use client';

import { AlertTriangle, MapPin, Stethoscope, Ambulance, BedDouble, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Emergency {
  id: string;
  severity: string;
  location: string;
  time: string;
  status: string;
}

interface LiveEmergencyDashboardProps {
  emergencies?: Emergency[];
}

const severityColor: Record<string, string> = {
  critical: 'destructive' as const,
  high: 'destructive' as const,
  moderate: 'secondary' as const,
  low: 'default' as const,
};

const defaultResources = {
  beds: { available: 24, total: 60 },
  ambulances: { available: 5, total: 12 },
  doctors: { available: 18, total: 30 },
};

export function LiveEmergencyDashboard({ emergencies = [] }: LiveEmergencyDashboardProps) {
  const counts = { critical: 0, high: 0, moderate: 0, low: 0 };
  emergencies.forEach((e) => {
    const s = e.severity.toLowerCase();
    if (s in counts) counts[s as keyof typeof counts]++;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(counts).map(([level, count]) => (
          <Card key={level}>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground capitalize">{level}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center h-48 text-muted-foreground">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Emergency Locations Map</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-semibold mb-3">Recent Emergencies</h3>
        <div className="space-y-2">
          {emergencies.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent emergencies</p>
          )}
          {emergencies.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3 min-w-0">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{e.location}</p>
                  <p className="text-xs text-muted-foreground">{e.time}</p>
                </div>
              </div>
              <Badge variant={severityColor[e.severity.toLowerCase()] as 'destructive' | 'default' | 'secondary' || 'default'}>
                {e.severity}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Resource Availability</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([
            { icon: BedDouble, label: 'Beds', ...defaultResources.beds },
            { icon: Ambulance, label: 'Ambulances', ...defaultResources.ambulances },
            { icon: Stethoscope, label: 'Doctors', ...defaultResources.doctors },
          ]).map(({ icon: Icon, label, available, total }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <p className="text-2xl font-bold">{available}<span className="text-sm font-normal text-muted-foreground">/{total}</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">AI Predictions</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li>Predicted surge in cardiac cases over the next 2 hours.</li>
            <li>Recommended: Prepare 3 additional ICU beds at Mombasa Hospital.</li>
            <li>Ambulance ETA average: 12 min across active dispatches.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
