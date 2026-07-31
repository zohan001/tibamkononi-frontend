'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  change?: string;
  gradient?: string;
  subtitle?: string;
}

const defaultGradient = 'from-blue-500 to-blue-600';

export function StatCard({
  label,
  value,
  icon,
  trend,
  change,
  gradient = defaultGradient,
  subtitle,
}: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className={cn('border-0 bg-gradient-to-br text-white shadow-lg', gradient)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-white/80">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-xs text-white/60">{subtitle}</p>
            )}
          </div>
          <div className="rounded-xl bg-white/20 p-2.5">{icon}</div>
        </div>
        {(trend || change) && (
          <div className="mt-4 flex items-center gap-1.5">
            {TrendIcon && (
              <TrendIcon className="h-3.5 w-3.5 text-white" />
            )}
            <span className="text-xs font-medium text-white/90">{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
