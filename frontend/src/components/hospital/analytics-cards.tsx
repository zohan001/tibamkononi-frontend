'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalyticsCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
  color?: string;
}

interface AnalyticsCardsProps {
  cards?: AnalyticsCard[];
}

const defaultCards: AnalyticsCard[] = [
  {
    label: 'Total Patients',
    value: 1284,
    icon: <span className="text-xl">🏥</span>,
    trend: 'up',
    change: '+12.5%',
    color: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Revenue Today',
    value: 'KSh 2.4M',
    icon: <span className="text-xl">💰</span>,
    trend: 'up',
    change: '+8.2%',
    color: 'from-emerald-500 to-green-600',
  },
  {
    label: 'Bed Occupancy',
    value: '87%',
    icon: <span className="text-xl">🛏️</span>,
    trend: 'down',
    change: '-3.1%',
    color: 'from-violet-500 to-purple-600',
  },
  {
    label: 'Staff on Duty',
    value: 142,
    icon: <span className="text-xl">👨‍⚕️</span>,
    trend: 'neutral',
    change: '0%',
    color: 'from-amber-500 to-orange-600',
  },
  {
    label: 'Avg Wait Time',
    value: '18 min',
    icon: <span className="text-xl">⏱️</span>,
    trend: 'up',
    change: '-5.4%',
    color: 'from-rose-500 to-pink-600',
  },
  {
    label: 'Satisfaction Score',
    value: '4.6/5',
    icon: <span className="text-xl">⭐</span>,
    trend: 'up',
    change: '+0.3',
    color: 'from-cyan-500 to-teal-600',
  },
];

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

export function AnalyticsCards({ cards = defaultCards }: AnalyticsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const TrendIcon = card.trend ? trendIcons[card.trend] : null;
        return (
          <Card
            key={card.label}
            className={cn(
              'border-0 bg-gradient-to-br text-white shadow-lg transition-transform hover:scale-[1.02]',
              card.color ?? 'from-slate-500 to-slate-600',
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white/80">{card.label}</p>
                  <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                </div>
                <div className="rounded-xl bg-white/20 p-2.5">{card.icon}</div>
              </div>
              {(card.trend || card.change) && (
                <div className="mt-4 flex items-center gap-1.5">
                  {TrendIcon && (
                    <TrendIcon
                      className={cn(
                        'h-3.5 w-3.5',
                        card.trend === 'up' ? 'text-white' : card.trend === 'down' ? 'text-white/80' : 'text-white/60',
                      )}
                    />
                  )}
                  <span className="text-xs font-medium text-white/90">
                    {card.change} vs last period
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
