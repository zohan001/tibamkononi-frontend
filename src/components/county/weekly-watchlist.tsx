'use client';

import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { SeverityBadge } from '@/components/shared/severity-badge';
import { cn } from '@/lib/utils';

interface WatchlistItem {
  hospitalName: string;
  hospitalSlug: string;
  score: number;
  severity: 'critical' | 'warning' | 'normal';
  summary: string;
}

interface WeeklyWatchlistProps {
  watchlistItems: WatchlistItem[];
}

const scoreColors: Record<string, string> = {
  critical: 'bg-red-500',
  warning: 'bg-yellow-500',
  normal: 'bg-green-500',
};

export function WeeklyWatchlist({ watchlistItems }: WeeklyWatchlistProps) {
  if (watchlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Info className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No watchlist items this week</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Weekly Watchlist</h3>
        <GemmaBadge />
      </div>
      <div className="space-y-2">
        {watchlistItems.map((item) => (
          <Card key={item.hospitalSlug} size="sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {item.hospitalName}
                    </span>
                    <SeverityBadge severity={item.severity} size="sm" />
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white',
                      scoreColors[item.severity]
                    )}
                  >
                    {item.score}
                  </div>
                  <span className="text-[10px] text-muted-foreground">score</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
