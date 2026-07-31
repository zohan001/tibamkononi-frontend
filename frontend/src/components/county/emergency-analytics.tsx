'use client';

import {
  Siren,
  Clock,
  CheckCircle,
  AlertTriangle,
  Ambulance,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmergencyAnalyticsProps {
  data?: {
    totalCalls?: number;
    avgResponseTime?: number;
    resolvedToday?: number;
    activeIncidents?: number;
    hospitals?: {
      name: string;
      readiness: number;
      ambulancesAvailable: number;
    }[];
    responseTimeTrend?: { day: string; time: number }[];
  };
}

const defaultData = {
  totalCalls: 156,
  avgResponseTime: 8.4,
  resolvedToday: 42,
  activeIncidents: 7,
  hospitals: [
    { name: 'Coast General', readiness: 92, ambulancesAvailable: 5 },
    { name: 'Tudor Hospital', readiness: 87, ambulancesAvailable: 3 },
    { name: 'Port Reitz', readiness: 84, ambulancesAvailable: 4 },
  ],
  responseTimeTrend: [
    { day: 'Mon', time: 8.2 },
    { day: 'Tue', time: 7.5 },
    { day: 'Wed', time: 9.1 },
    { day: 'Thu', time: 7.8 },
    { day: 'Fri', time: 10.3 },
    { day: 'Sat', time: 9.7 },
    { day: 'Sun', time: 8.9 },
  ],
};

const summaryCards = [
  { key: 'totalCalls', label: 'Total Emergency Calls', icon: Siren, color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950/50' },
  { key: 'avgResponseTime', label: 'Avg Response (min)', icon: Clock, color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50' },
  { key: 'resolvedToday', label: 'Resolved Today', icon: CheckCircle, color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/50' },
  { key: 'activeIncidents', label: 'Active Incidents', icon: AlertTriangle, color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-950/50' },
] as const;

export function EmergencyAnalytics({ data }: EmergencyAnalyticsProps) {
  const d = { ...defaultData, ...data };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ key, label, icon: Icon, color }) => (
          <Card key={key} size="sm">
            <CardContent className="flex items-start justify-between p-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{(d[key] as number).toLocaleString()}</p>
              </div>
              <div className={cn('rounded-lg p-2', color)}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ambulance className="h-5 w-5 text-red-600" />
            Hospital Emergency Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {d.hospitals?.map((hospital) => (
              <div key={hospital.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {hospital.ambulancesAvailable} ambulances available
                    </p>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      hospital.readiness >= 90
                        ? 'text-green-600'
                        : hospital.readiness >= 80
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    )}
                  >
                    {hospital.readiness}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${hospital.readiness}%`,
                      backgroundColor:
                        hospital.readiness >= 90
                          ? 'hsl(142 76% 42%)'
                          : hospital.readiness >= 80
                            ? 'hsl(45 93% 47%)'
                            : 'hsl(0 84% 60%)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Response Time Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {d.responseTimeTrend?.map((item) => (
              <div key={item.day} className="flex items-center gap-3">
                <span className="w-8 text-xs text-muted-foreground">{item.day}</span>
                <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (item.time / 12) * 100)}%`,
                      backgroundColor:
                        item.time <= 7
                          ? 'hsl(142 76% 42%)'
                          : item.time <= 9
                            ? 'hsl(45 93% 47%)'
                            : 'hsl(0 84% 60%)',
                    }}
                  />
                </div>
                <span className="w-12 text-right text-xs font-medium">{item.time}m</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> {'< 7min'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> 7-9min
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> {'> 9min'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
