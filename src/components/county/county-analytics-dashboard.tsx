'use client';

import { Hospital, Users, AlertTriangle, Stethoscope, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CountyAnalyticsDashboardProps {
  stats?: {
    totalHospitals: number;
    totalPatients: number;
    emergencies: number;
    staff: number;
  };
}

const defaultStats = {
  totalHospitals: 12,
  totalPatients: 4820,
  emergencies: 156,
  staff: 1240,
};

const statItems = [
  { key: 'totalHospitals', label: 'Total Hospitals', icon: Hospital, color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50' },
  { key: 'totalPatients', label: 'Total Patients', icon: Users, color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/50' },
  { key: 'emergencies', label: 'Emergencies', icon: AlertTriangle, color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950/50' },
  { key: 'staff', label: 'Staff Members', icon: Stethoscope, color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-950/50' },
] as const;

export function CountyAnalyticsDashboard({ stats = defaultStats }: CountyAnalyticsDashboardProps) {
  const healthScore = Math.min(100, Math.round(
    (stats.totalPatients / (stats.emergencies + 1)) * 2.5
  ));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map(({ key, label, icon: Icon, color }) => (
          <Card key={key} size="sm">
            <CardContent className="flex items-start justify-between p-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">
                  {stats[key].toLocaleString()}
                </p>
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
            <TrendingUp className="h-5 w-5 text-green-600" />
            County Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={healthScore >= 70 ? 'hsl(142 76% 42%)' : healthScore >= 40 ? 'hsl(45 93% 47%)' : 'hsl(0 84% 60%)'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${healthScore * 3.14} 314`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{healthScore}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hospital Capacity</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Emergency Response</span>
                <span className="font-medium">{stats.emergencies} Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Staff Coverage</span>
                <span className="font-medium">{stats.staff} Personnel</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hospital Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Coast General', score: 92, beds: 320 },
              { name: 'Tudor Hospital', score: 87, beds: 180 },
              { name: 'Port Reitz', score: 84, beds: 150 },
              { name: 'Kilifi County', score: 79, beds: 120 },
              { name: 'Malindi Sub-County', score: 75, beds: 90 },
            ].map((hospital) => (
              <div key={hospital.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{hospital.name}</span>
                  <span className="text-muted-foreground">{hospital.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${hospital.score}%`,
                      backgroundColor:
                        hospital.score >= 90
                          ? 'hsl(142 76% 42%)'
                          : hospital.score >= 80
                            ? 'hsl(217 91% 60%)'
                            : 'hsl(45 93% 47%)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
