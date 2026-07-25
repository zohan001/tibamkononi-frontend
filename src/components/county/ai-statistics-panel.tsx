'use client';

import { Brain, Target, Activity, Zap, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AIStatisticsPanelProps {
  accuracy?: number;
  predictions?: number;
  uptime?: string;
}

const defaultMetrics = {
  accuracy: 94.2,
  predictions: 12847,
  uptime: '99.8%',
};

const metrics = [
  { key: 'triageAccuracy', label: 'Triage Accuracy', value: '96.1%', icon: Target, color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950/50' },
  { key: 'predictionAccuracy', label: 'Prediction Accuracy', value: defaultMetrics.accuracy + '%', icon: Brain, color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50' },
  { key: 'uptime', label: 'System Uptime', value: defaultMetrics.uptime, icon: Activity, color: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50' },
  { key: 'totalPredictions', label: 'Total Predictions', value: defaultMetrics.predictions.toLocaleString(), icon: BarChart3, color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-950/50' },
];

export function AIStatisticsPanel({ accuracy, predictions, uptime }: AIStatisticsPanelProps) {
  const resolved = {
    ...defaultMetrics,
    ...(accuracy !== undefined && { accuracy }),
    ...(predictions !== undefined && { predictions }),
    ...(uptime !== undefined && { uptime }),
  };

  const resolvedMetrics = metrics.map((m) => {
    if (m.key === 'predictionAccuracy') return { ...m, value: resolved.accuracy + '%' };
    if (m.key === 'totalPredictions') return { ...m, value: resolved.predictions.toLocaleString() };
    if (m.key === 'uptime') return { ...m, value: resolved.uptime };
    return m;
  });

  return (
    <Card className="border-violet-200 dark:border-violet-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-600" />
          AI Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {resolvedMetrics.map(({ key, label, value, icon: Icon, color }) => (
            <div key={key} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className={cn('rounded-md p-1.5', color)}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="mt-2 text-xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap className="h-4 w-4 text-yellow-500" />
            Recent Activity
          </div>
          <div className="mt-3 space-y-2">
            {[
              { time: '2 min ago', event: 'Triage prediction for Coast General ER' },
              { time: '8 min ago', event: 'Outbreak risk assessment completed' },
              { time: '15 min ago', event: 'Inventory shortage alert triggered' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                <div>
                  <p>{item.event}</p>
                  <p className="text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
