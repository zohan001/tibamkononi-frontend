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
import { Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

interface EmergencyTrendsChartProps {
  data?: { day: string; calls: number; avgResponseTime: number }[];
}

const defaultData = [
  { day: 'Mon', calls: 45, avgResponseTime: 8.2 },
  { day: 'Tue', calls: 38, avgResponseTime: 7.5 },
  { day: 'Wed', calls: 52, avgResponseTime: 9.1 },
  { day: 'Thu', calls: 41, avgResponseTime: 7.8 },
  { day: 'Fri', calls: 60, avgResponseTime: 10.3 },
  { day: 'Sat', calls: 55, avgResponseTime: 9.7 },
  { day: 'Sun', calls: 48, avgResponseTime: 8.9 },
];

const chartConfig: ChartConfig = {
  calls: { label: 'Emergency Calls', color: 'hsl(0 84% 60%)' },
  avgResponseTime: { label: 'Avg Response (min)', color: 'hsl(217 91% 60%)' },
};

export function EmergencyTrendsChart({ data = defaultData }: EmergencyTrendsChartProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Emergency Calls by Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis
              yAxisId="calls"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              yAxisId="response"
              orientation="right"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar yAxisId="calls" dataKey="calls" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
            <Line
              yAxisId="response"
              type="monotone"
              dataKey="avgResponseTime"
              stroke="hsl(217 91% 60%)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'hsl(217 91% 60%)' }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
