'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { WeeklyWatchlist } from '@/components/county/weekly-watchlist';
import { useCountyWatchlist } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';

export default function CountyWatchlistPage() {
  const { data: watchlist, isLoading } = useCountyWatchlist();

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Weekly Watchlist</h1>
          <p className="text-slate-500 mt-2">
            Hospitals ranked by stock health, severity and recommended action.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <WeeklyWatchlist watchlistItems={watchlist || []} />
        )}
      </div>
    </div>
  );
}
