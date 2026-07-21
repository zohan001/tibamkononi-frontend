'use client';

import {
  Hospital,
  BedDouble,
  AlertTriangle,
  HelpingHand,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: string | number;
  trend?: 'up' | 'down';
}

interface CountyOverviewProps {
  stats: {
    hospitalsActive: StatItem;
    bedsAvailable: StatItem;
    criticalAlerts: StatItem;
    distressSignals: StatItem;
  };
}

const statIcons = {
  hospitalsActive: Hospital,
  bedsAvailable: BedDouble,
  criticalAlerts: AlertTriangle,
  distressSignals: HelpingHand,
} as const;

const statColors = {
  hospitalsActive: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50',
  bedsAvailable: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/50',
  criticalAlerts: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950/50',
  distressSignals: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-950/50',
} as const;

export function CountyOverview({ stats }: CountyOverviewProps) {
  const entries = Object.entries(stats) as [keyof typeof stats, StatItem][];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map(([key, stat]) => {
        const Icon = statIcons[key];
        return (
          <Card key={key} size="sm">
            <CardContent className="flex items-start justify-between p-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.trend && (
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={cn(
                        'text-xs',
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {stat.trend === 'up' ? 'Increased' : 'Decreased'}
                    </span>
                  </div>
                )}
              </div>
              <div className={cn('rounded-lg p-2', statColors[key])}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
