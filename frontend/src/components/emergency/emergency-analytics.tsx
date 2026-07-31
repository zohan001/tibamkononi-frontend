'use client';

import { BarChart3, PieChart, Clock3, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const defaultResponseData = [
  { label: 'Mon', value: 14 },
  { label: 'Tue', value: 22 },
  { label: 'Wed', value: 18 },
  { label: 'Thu', value: 30 },
  { label: 'Fri', value: 26 },
  { label: 'Sat', value: 35 },
  { label: 'Sun', value: 20 },
];

const defaultTypeData = [
  { label: 'Accidents', value: 35, color: 'bg-red-500' },
  { label: 'Cardiac', value: 25, color: 'bg-blue-500' },
  { label: 'Strokes', value: 15, color: 'bg-purple-500' },
  { label: 'Burns', value: 10, color: 'bg-orange-500' },
  { label: 'Other', value: 15, color: 'bg-slate-400' },
];

const defaultHourlyData = [
  2, 1, 1, 0, 0, 1, 3, 5, 8, 7, 6, 9, 10, 8, 7, 6, 8, 10, 12, 9, 7, 5, 4, 3,
];

const defaultMetrics = {
  avgResponse: '11.4 min',
  total: 145,
  successRate: '94.5%',
};

function BarChartMini({ data, max }: { data: typeof defaultResponseData; max: number }) {
  return (
    <div className="flex items-end gap-1.5 h-32">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-[10px] text-muted-foreground">{d.value}</span>
          <div
            className="w-full bg-blue-500 rounded-t"
            style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }}
          />
          <span className="text-[10px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function PieChartMini({ data }: { data: typeof defaultTypeData }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let accumulated = 0;

  const segments = data.map((d) => {
    const start = (accumulated / total) * 360;
    accumulated += d.value;
    const end = (accumulated / total) * 360;
    return { ...d, start, end };
  });

  const gradient = segments
    .map((s) => {
      const colorMap: Record<string, string> = {
        'bg-red-500': '#ef4444',
        'bg-blue-500': '#3b82f6',
        'bg-purple-500': '#a855f7',
        'bg-orange-500': '#f97316',
        'bg-slate-400': '#9ca3af',
      };
      return `${colorMap[s.color] || '#9ca3af'} ${s.start}deg ${s.end}deg`;
    })
    .join(', ');

  return (
    <div className="flex items-center gap-6">
      <div
        className="h-28 w-28 rounded-full shrink-0"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="space-y-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-sm">
            <span className={cn('h-2.5 w-2.5 rounded-full shrink-0', d.color)} />
            <span className="text-muted-foreground">{d.label}</span>
            <strong>{d.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function HourlyHeatmap({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="grid grid-cols-12 gap-1">
      {data.map((v, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="h-6 w-full rounded"
            style={{
              backgroundColor: `rgba(239,68,68,${v / max})`,
            }}
            title={`${i}:00 — ${v} emergencies`}
          />
          {i % 6 === 0 && (
            <span className="text-[9px] text-muted-foreground mt-0.5">{i}h</span>
          )}
        </div>
      ))}
    </div>
  );
}

interface EmergencyAnalyticsProps {
  responseData?: { label: string; value: number }[];
  typeData?: { name: string; value: number; color: string }[];
  hourlyData?: { hour: string; count: number }[];
  metrics?: { avgResponse: string; total: number; successRate: string };
}

export function EmergencyAnalytics(props: EmergencyAnalyticsProps) {
  const responseData = props.responseData ?? defaultResponseData;
  const typeData = (props.typeData ?? defaultTypeData) as (typeof defaultTypeData);
  const hourlyData = props.hourlyData
    ? props.hourlyData.map((h) => h.count)
    : defaultHourlyData;
  const metrics = props.metrics ?? defaultMetrics;
  const maxResponse = Math.max(...responseData.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([
          { icon: Clock3, label: 'Avg Response', value: metrics.avgResponse },
          { icon: TrendingUp, label: 'Total Emergencies', value: String(metrics.total) },
          { icon: BarChart3, label: 'Success Rate', value: metrics.successRate },
        ]).map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Weekly Response Times</h3>
          </div>
          <BarChartMini data={responseData} max={maxResponse} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold">Emergency Types Breakdown</h3>
          </div>
          <PieChartMini data={typeData} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock3 className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold">Hourly Distribution</h3>
          </div>
          <HourlyHeatmap data={hourlyData} />
        </CardContent>
      </Card>
    </div>
  );
}
