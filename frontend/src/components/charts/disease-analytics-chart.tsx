'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

interface DiseaseAnalyticsChartProps {
  data?: { disease: string; cases: number; severity: 'high' | 'medium' | 'low' }[];
}

const defaultData = [
  { disease: 'Malaria', cases: 342, severity: 'high' as const },
  { disease: 'Cholera', cases: 128, severity: 'high' as const },
  { disease: 'Typhoid', cases: 95, severity: 'medium' as const },
  { disease: 'Dengue', cases: 76, severity: 'medium' as const },
  { disease: 'Pneumonia', cases: 64, severity: 'high' as const },
  { disease: 'Diarrhea', cases: 210, severity: 'low' as const },
  { disease: 'Flu', cases: 185, severity: 'low' as const },
];

const severityColors: Record<string, string> = {
  high: 'hsl(0 84% 60%)',
  medium: 'hsl(45 93% 47%)',
  low: 'hsl(142 76% 42%)',
};

const chartConfig: ChartConfig = {
  cases: { label: 'Cases', color: 'hsl(0 84% 60%)' },
};

export function DiseaseAnalyticsChart({ data = defaultData }: DiseaseAnalyticsChartProps) {
  const sortedData = [...data].sort((a, b) => a.cases - b.cases);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Top Diseases by Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              type="category"
              dataKey="disease"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              width={100}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload as (typeof sortedData)[0];
                return (
                  <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                    <div className="font-medium">{d.disease}</div>
                    <p className="mt-1 text-muted-foreground">{d.cases} cases</p>
                    <p className="capitalize text-muted-foreground">
                      Severity:{' '}
                      <span style={{ color: severityColors[d.severity] }}>{d.severity}</span>
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
              {sortedData.map((entry, index) => (
                <Cell key={index} fill={severityColors[entry.severity]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> High
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Low
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
