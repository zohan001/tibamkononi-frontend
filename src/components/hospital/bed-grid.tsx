'use client';

import {
  Bed,
  AlertTriangle,
  Sparkles,
  Building2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Ward {
  name: string;
  bedCount: number;
  bedsOccupied: number;
  reserved?: number;
  cleaning?: number;
  status?: string;
}

interface BedGridProps {
  wards?: Ward[];
}

const defaultWards: Ward[] = [
  { name: 'General Ward', bedCount: 30, bedsOccupied: 22, reserved: 3, cleaning: 2, status: 'normal' },
  { name: 'ICU', bedCount: 12, bedsOccupied: 11, reserved: 1, cleaning: 0, status: 'critical' },
  { name: 'Pediatrics', bedCount: 20, bedsOccupied: 14, reserved: 2, cleaning: 1, status: 'normal' },
  { name: 'Maternity', bedCount: 15, bedsOccupied: 8, reserved: 2, cleaning: 1, status: 'normal' },
  { name: 'Surgical', bedCount: 18, bedsOccupied: 15, reserved: 1, cleaning: 1, status: 'warning' },
];

function getBedStatus(
  index: number,
  occupied: number,
  reserved: number,
  cleaning: number,
): 'occupied' | 'available' | 'reserved' | 'cleaning' {
  if (index < occupied) return 'occupied';
  if (index < occupied + reserved) return 'reserved';
  if (index < occupied + reserved + cleaning) return 'cleaning';
  return 'available';
}

const bedStatusStyles: Record<string, string> = {
  occupied: 'bg-red-500 shadow-red-500/30 shadow-sm',
  available: 'bg-emerald-500 shadow-emerald-500/30 shadow-sm',
  reserved: 'bg-amber-400 shadow-amber-400/30 shadow-sm',
  cleaning: 'bg-blue-400 shadow-blue-400/30 shadow-sm',
};

const statusBadgeClass: Record<string, string> = {
  normal: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-500/10 text-amber-700 border-amber-200',
  critical: 'bg-red-500/10 text-red-700 border-red-200',
};

export function BedGrid({ wards = defaultWards }: BedGridProps) {
  const totalBeds = wards.reduce((sum, w) => sum + w.bedCount, 0);
  const totalOccupied = wards.reduce((sum, w) => sum + w.bedsOccupied, 0);
  const totalReserved = wards.reduce((sum, w) => sum + (w.reserved ?? 0), 0);
  const totalCleaning = wards.reduce((sum, w) => sum + (w.cleaning ?? 0), 0);
  const totalAvailable = totalBeds - totalOccupied - totalReserved - totalCleaning;
  const criticalWards = wards.filter((w) => w.status === 'critical').length;
  const occupancy = totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0;

  const stats = [
    {
      label: 'Total Beds',
      value: totalBeds,
      icon: Bed,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Occupied',
      value: totalOccupied,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Available',
      value: totalAvailable,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Critical Wards',
      value: criticalWards,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bed Occupancy Grid</h2>
        <p className="text-sm text-muted-foreground">
          Real-time bed availability across all hospital wards
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
            <Building2 className="h-5 w-5 text-blue-600" />
            Ward Overview
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {occupancy}% overall occupancy
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {wards.map((ward) => {
            const reserved = ward.reserved ?? 0;
            const cleaning = ward.cleaning ?? 0;
            const available = ward.bedCount - ward.bedsOccupied - reserved - cleaning;
            const wardOccupancy = Math.round((ward.bedsOccupied / ward.bedCount) * 100);

            return (
              <div key={ward.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{ward.name}</h4>
                    {ward.status && (
                      <Badge
                        className={cn(
                          'text-[10px] uppercase tracking-wide',
                          statusBadgeClass[ward.status] ?? statusBadgeClass.normal,
                        )}
                      >
                        {ward.status}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {ward.bedsOccupied} occupied &middot; {available} available &middot; {reserved} reserved &middot; {cleaning} cleaning
                  </span>
                </div>

                <Progress value={wardOccupancy}>
                  <ProgressLabel className="sr-only">{ward.name} occupancy</ProgressLabel>
                  <ProgressValue />
                </Progress>

                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: ward.bedCount }).map((_, i) => {
                    const status = getBedStatus(i, ward.bedsOccupied, reserved, cleaning);
                    return (
                      <div
                        key={i}
                        title={`${status.charAt(0).toUpperCase() + status.slice(1)} - Bed ${i + 1}`}
                        className={cn(
                          'h-5 w-5 rounded-sm transition-all hover:scale-125 hover:ring-2 hover:ring-white',
                          bedStatusStyles[status],
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-emerald-500" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-red-500" />
              Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-amber-400" />
              Reserved
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-blue-400" />
              Cleaning
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">AI Recommendation</h4>
              <p className="text-sm text-blue-100 leading-relaxed">
                {criticalWards > 0
                  ? `${criticalWards} ward(s) are at critical capacity. Consider discharging stable patients and activating overflow protocols. Redistribution of patients from high-occupancy wards could increase system-wide capacity by approximately 15%.`
                  : 'All wards are within normal operating capacity. Continue current admission protocols and monitor for any changes in patient flow patterns.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
