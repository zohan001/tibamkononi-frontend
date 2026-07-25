'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface PatientTrendsChartProps {
  data?: { date: string; admissions: number; discharges: number }[];
}

const defaultData = [
  { date: 'Day 1', admissions: 42, discharges: 35 },
  { date: 'Day 5', admissions: 38, discharges: 40 },
  { date: 'Day 10', admissions: 55, discharges: 30 },
  { date: 'Day 15', admissions: 47, discharges: 42 },
  { date: 'Day 20', admissions: 60, discharges: 45 },
  { date: 'Day 25', admissions: 35, discharges: 38 },
  { date: 'Day 30', admissions: 28, discharges: 32 },
];

const chartConfig: ChartConfig = {
  admissions: { label: 'New Patients', color: 'hsl(217 91% 60%)' },
  discharges: { label: 'Discharged', color: 'hsl(142 76% 42%)' },
};

export function PatientTrendsChart({ data = defaultData }: PatientTrendsChartProps) {
  const enrichedData = data.map((d) => ({
    ...d,
    total: d.admissions - d.discharges,
  }));

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Patient Trends (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={enrichedData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradAdmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradDischarges" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142 76% 42%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(271 91% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(271 91% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="admissions"
              stroke="hsl(217 91% 60%)"
              fillOpacity={1}
              fill="url(#gradAdmissions)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="discharges"
              stroke="hsl(142 76% 42%)"
              fillOpacity={1}
              fill="url(#gradDischarges)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="hsl(271 91% 60%)"
              fillOpacity={1}
              fill="url(#gradTotal)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
