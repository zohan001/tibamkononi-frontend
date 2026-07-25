'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip } from '@/components/ui/chart';
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from 'recharts';

interface BedOccupancyChartProps {
  data?: { ward: string; occupied: number; available: number }[];
}

const defaultData = [
  { ward: 'General', occupied: 22, available: 8 },
  { ward: 'ICU', occupied: 11, available: 4 },
  { ward: 'Pediatrics', occupied: 14, available: 6 },
  { ward: 'Maternity', occupied: 8, available: 12 },
  { ward: 'Surgical', occupied: 15, available: 5 },
];

const wardColors: Record<string, string> = {
  General: '#3b82f6',
  ICU: '#ef4444',
  Pediatrics: '#10b981',
  Maternity: '#f59e0b',
  Surgical: '#8b5cf6',
};

export function BedOccupancyChart({ data = defaultData }: BedOccupancyChartProps) {
  const totalBeds = data.reduce((sum, d) => sum + d.occupied + d.available, 0);
  const totalOccupied = data.reduce((sum, d) => sum + d.occupied, 0);
  const occupancyPercent = totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0;

  const chartData = data.map((d) => ({
    ward: d.ward,
    value: d.occupied,
    fill: wardColors[d.ward] ?? '#6b7280',
  }));

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Bed Occupancy by Ward</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                nameKey="ward"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as (typeof chartData)[0];
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                        <span className="font-medium">{d.ward}</span>
                      </div>
                      <p className="mt-1 text-muted-foreground">{d.value} beds occupied</p>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-2">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1.5 text-xs">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          Total Occupancy: <span className="font-semibold text-foreground">{occupancyPercent}%</span>
          {' '}({totalOccupied}/{totalBeds} beds)
        </div>
      </CardContent>
    </Card>
  );
}
