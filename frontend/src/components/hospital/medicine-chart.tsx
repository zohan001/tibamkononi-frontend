'use client';

import {
  Pill,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Clock,
  BarChart3,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface Medicine {
  name: string;
  stock: number;
  used: number;
  category: string;
  expiryDays?: number;
}

interface MedicineChartProps {
  medicines?: Medicine[];
}

const defaultMedicines: Medicine[] = [
  { name: 'Amoxicillin', stock: 240, used: 180, category: 'Antibiotics', expiryDays: 120 },
  { name: 'Paracetamol', stock: 500, used: 320, category: 'Pain Relief', expiryDays: 365 },
  { name: 'Metformin', stock: 80, used: 150, category: 'Diabetes', expiryDays: 45 },
  { name: 'Insulin', stock: 30, used: 90, category: 'Diabetes', expiryDays: 20 },
  { name: 'Salbutamol', stock: 120, used: 70, category: 'Respiratory', expiryDays: 200 },
  { name: 'Omeprazole', stock: 45, used: 100, category: 'Gastrointestinal', expiryDays: 30 },
  { name: 'Ciprofloxacin', stock: 60, used: 85, category: 'Antibiotics', expiryDays: 90 },
  { name: 'Ibuprofen', stock: 350, used: 200, category: 'Pain Relief', expiryDays: 500 },
  { name: 'Lisinopril', stock: 90, used: 60, category: 'Cardiovascular', expiryDays: 150 },
  { name: 'Amlodipine', stock: 25, used: 70, category: 'Cardiovascular', expiryDays: 15 },
];

function getStockColor(stock: number, used: number): string {
  const ratio = stock / Math.max(used, 1);
  if (ratio < 0.4) return 'hsl(0 84% 60%)';
  if (ratio < 0.7) return 'hsl(38 92% 50%)';
  return 'hsl(142 76% 42%)';
}

export function MedicineChart({ medicines = defaultMedicines }: MedicineChartProps) {
  const totalStock = medicines.reduce((sum, m) => sum + m.stock, 0);
  const totalUsed = medicines.reduce((sum, m) => sum + m.used, 0);
  const lowStock = medicines.filter((m) => m.stock < m.used * 0.5);
  const expiringSoon = medicines.filter((m) => (m.expiryDays ?? 999) < 60);

  const chartData = medicines.map((m) => ({
    name: m.name,
    stock: m.stock,
    used: m.used,
    fill: getStockColor(m.stock, m.used),
  }));

  const stats = [
    {
      label: 'Total Stock',
      value: totalStock.toLocaleString(),
      icon: Pill,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Monthly Usage',
      value: totalUsed.toLocaleString(),
      icon: BarChart3,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Low Stock Items',
      value: lowStock.length,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Expiring Soon',
      value: expiringSoon.length,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Medicine Usage & Stock</h2>
        <p className="text-sm text-muted-foreground">
          Monitor inventory levels, usage patterns, and expiry alerts
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn('rounded-xl p-2.5', stat.bg)}>
                  <stat.icon className={cn('h-5 w-5', stat.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Pill className="h-5 w-5 text-blue-600" />
            Stock vs Usage by Medicine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              stock: { label: 'Stock', color: 'hsl(217 91% 60%)' },
              used: { label: 'Monthly Usage', color: 'hsl(270 76% 60%)' },
            }}
            className="h-[350px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  angle={-35}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="stock" radius={[4, 4, 0, 0]} name="Stock">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
                <Bar dataKey="used" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Monthly Usage" opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {lowStock.length > 0 && (
          <Card className="border-0 border-l-4 border-l-red-500 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-red-700">
                <TrendingDown className="h-4 w-4" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lowStock.map((med) => (
                <div
                  key={med.name}
                  className="flex items-center justify-between rounded-lg bg-red-50 p-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.category}</p>
                  </div>
                  <Badge className="border bg-red-500/10 text-red-700 border-red-200">
                    {med.stock} left
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {expiringSoon.length > 0 && (
          <Card className="border-0 border-l-4 border-l-amber-500 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                Expiry Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {expiringSoon.map((med) => (
                <div
                  key={med.name}
                  className="flex items-center justify-between rounded-lg bg-amber-50 p-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.category}</p>
                  </div>
                  <Badge className="border bg-amber-500/10 text-amber-700 border-amber-200">
                    {med.expiryDays}d left
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">AI Stock Prediction</h4>
              <p className="text-sm text-blue-100 leading-relaxed">
                Based on current usage patterns, {lowStock.length > 0 ? `${lowStock.map((m) => m.name).join(', ')} will be depleted within the next ${Math.round(Math.min(...lowStock.map((m) => m.stock / Math.max(m.used / 30, 1))))} days. ` : 'all medications are adequately stocked. '}
                {expiringSoon.length > 0 ? `${expiringSoon.map((m) => m.name).join(', ')} expiring soon — prioritize dispensing or arrange returns. ` : ''}
                Recommend automated reorder triggers when stock falls below 40% of monthly usage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
