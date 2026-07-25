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
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const patientTrendData = [
  { date: 'Mon', admissions: 42, discharges: 35 },
  { date: 'Tue', admissions: 38, discharges: 40 },
  { date: 'Wed', admissions: 55, discharges: 30 },
  { date: 'Thu', admissions: 47, discharges: 42 },
  { date: 'Fri', admissions: 60, discharges: 45 },
  { date: 'Sat', admissions: 35, discharges: 38 },
  { date: 'Sun', admissions: 28, discharges: 32 },
];

const bedOccupancyData = [
  { ward: 'General', value: 22, fill: '#3b82f6' },
  { ward: 'ICU', value: 11, fill: '#ef4444' },
  { ward: 'Pediatrics', value: 14, fill: '#10b981' },
  { ward: 'Maternity', value: 8, fill: '#f59e0b' },
  { ward: 'Surgical', value: 15, fill: '#8b5cf6' },
];

const revenueData = [
  { day: 'Mon', revenue: 2400000 },
  { day: 'Tue', revenue: 2100000 },
  { day: 'Wed', revenue: 2800000 },
  { day: 'Thu', revenue: 2600000 },
  { day: 'Fri', revenue: 3100000 },
  { day: 'Sat', revenue: 1900000 },
  { day: 'Sun', revenue: 1500000 },
];

const staffData = [
  { role: 'Doctors', count: 35, fill: '#3b82f6' },
  { role: 'Nurses', count: 65, fill: '#10b981' },
  { role: 'Lab Techs', count: 12, fill: '#f59e0b' },
  { role: 'Pharmacists', count: 8, fill: '#8b5cf6' },
  { role: 'Admin', count: 22, fill: '#ec4899' },
];

const patientTrendConfig: ChartConfig = {
  admissions: { label: 'Admissions', color: 'hsl(217 91% 60%)' },
  discharges: { label: 'Discharges', color: 'hsl(142 76% 42%)' },
};

const revenueConfig: ChartConfig = {
  revenue: { label: 'Revenue (KSh)', color: 'hsl(142 76% 42%)' },
};

interface DashboardChartsProps {
  type?: 'patient-trends' | 'bed-occupancy' | 'revenue' | 'staff-distribution';
  data?: Record<string, unknown>[];
}

function PatientTrendsChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Patient Admissions vs Discharges</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={patientTrendConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patientTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradAdmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDischarges" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 76% 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 76% 42%)" stopOpacity={0} />
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
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function BedOccupancyChart() {
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
                data={bedOccupancyData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                nameKey="ward"
              >
                {bedOccupancyData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0].payload as (typeof bedOccupancyData)[0];
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
                        <span className="font-medium">{data.ward}</span>
                      </div>
                      <p className="mt-1 text-muted-foreground">{data.value} beds occupied</p>
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
      </CardContent>
    </Card>
  );
}

function RevenueChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Daily Revenue (KSh)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                      <p className="font-medium">{label}</p>
                      <p className="mt-1 text-muted-foreground">
                        KSh {(payload[0].value as number).toLocaleString()}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="revenue" fill="hsl(142 76% 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function StaffDistributionChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Staff Distribution by Role</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={staffData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                paddingAngle={2}
                dataKey="count"
                nameKey="role"
              >
                {staffData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0].payload as (typeof staffData)[0];
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
                        <span className="font-medium">{data.role}</span>
                      </div>
                      <p className="mt-1 text-muted-foreground">{data.count} staff</p>
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
      </CardContent>
    </Card>
  );
}

function DashboardCharts({ type = 'patient-trends' }: DashboardChartsProps) {
  const chartMap = {
    'patient-trends': PatientTrendsChart,
    'bed-occupancy': BedOccupancyChart,
    revenue: RevenueChart,
    'staff-distribution': StaffDistributionChart,
  };

  const ChartComponent = chartMap[type];
  return <ChartComponent />;
}

function AllDashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <PatientTrendsChart />
        <BedOccupancyChart />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <StaffDistributionChart />
      </div>
    </div>
  );
}

export {
  DashboardCharts,
  PatientTrendsChart,
  BedOccupancyChart,
  RevenueChart,
  StaffDistributionChart,
  AllDashboardCharts,
};
