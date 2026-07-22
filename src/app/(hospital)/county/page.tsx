'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { CountyOverview } from '@/components/county/county-overview';
import { HospitalList } from '@/components/county/hospital-list';
import { WeeklyWatchlist } from '@/components/county/weekly-watchlist';
import { useCountyDashboard, useCountyHospitals, useCountyWatchlist } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';

export default function CountyDashboardPage() {
  const { data: dashboardData, isLoading: dashboardLoading } = useCountyDashboard();
  const { data: hospitalsData, isLoading: hospitalsLoading } = useCountyHospitals();
  const { data: watchlistData, isLoading: watchlistLoading } = useCountyWatchlist();

  const stats = dashboardData
    ? {
        hospitalsActive: { label: 'Hospitals Active', value: dashboardData.hospitalsActive },
        bedsAvailable: { label: 'Beds Available', value: dashboardData.bedsAvailable, trend: 'up' as const },
        criticalAlerts: { label: 'Critical Alerts', value: dashboardData.criticalAlerts, trend: 'up' as const },
        distressSignals: { label: 'Distress Signals', value: dashboardData.distressSignals },
      }
    : {
        hospitalsActive: { label: 'Hospitals Active', value: 12 },
        bedsAvailable: { label: 'Beds Available', value: 1240, trend: 'up' as const },
        criticalAlerts: { label: 'Critical Alerts', value: 3, trend: 'up' as const },
        distressSignals: { label: 'Distress Signals', value: 5 },
      };

  if (dashboardLoading || hospitalsLoading || watchlistLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <CountySidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Mombasa County — Health Overview</h1>
        <CountyOverview stats={stats} />
        <div className="mt-6">
          <HospitalList hospitals={hospitalsData || []} />
        </div>
        <div className="mt-6">
          <WeeklyWatchlist watchlistItems={watchlistData || []} />
        </div>
      </div>
    </div>
  );
}
