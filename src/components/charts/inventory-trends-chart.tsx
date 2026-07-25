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
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface InventoryTrendsChartProps {
  data?: { date: string; antibiotics: number; painkillers: number; chronic: number; emergency: number }[];
}

const defaultData = [
  { date: 'Week 1', antibiotics: 120, painkillers: 200, chronic: 80, emergency: 45 },
  { date: 'Week 2', antibiotics: 135, painkillers: 180, chronic: 90, emergency: 60 },
  { date: 'Week 3', antibiotics: 110, painkillers: 220, chronic: 75, emergency: 50 },
  { date: 'Week 4', antibiotics: 145, painkillers: 190, chronic: 95, emergency: 70 },
  { date: 'Week 5', antibiotics: 130, painkillers: 210, chronic: 85, emergency: 55 },
  { date: 'Week 6', antibiotics: 140, painkillers: 195, chronic: 100, emergency: 65 },
];

const chartConfig: ChartConfig = {
  antibiotics: { label: 'Antibiotics', color: 'hsl(217 91% 60%)' },
  painkillers: { label: 'Painkillers', color: 'hsl(142 76% 42%)' },
  chronic: { label: 'Chronic', color: 'hsl(45 93% 47%)' },
  emergency: { label: 'Emergency', color: 'hsl(0 84% 60%)' },
};

export function InventoryTrendsChart({ data = defaultData }: InventoryTrendsChartProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Medicine Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="antibiotics" stackId="inventory" fill="hsl(217 91% 60%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="painkillers" stackId="inventory" fill="hsl(142 76% 42%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="chronic" stackId="inventory" fill="hsl(45 93% 47%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="emergency" stackId="inventory" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
