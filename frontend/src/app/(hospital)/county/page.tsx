'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { CountyOverview } from '@/components/county/county-overview';
import { HospitalList } from '@/components/county/hospital-list';
import { WeeklyWatchlist } from '@/components/county/weekly-watchlist';
import { useCountyDashboard, useCountyHospitals, useCountyWatchlist } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { EmergencyCommandCenter } from '@/components/county/emergency-command-center';
import { MedicineRedistribution } from '@/components/county/medicine-redistribution';
import { AIPredictionCenter } from '@/components/county/ai-prediction-center';
import { CountyDigitalTwin } from '@/components/county/county-digital-twin';
import { OutbreakMonitor } from '@/components/county/outbreak-monitor';
import { CountyHealthMap } from '@/components/county/county-health-map';
import { AIExecutiveBriefing } from '@/components/county/ai-executive-briefing';
import { CountyAnalyticsDashboard } from '@/components/county/county-analytics-dashboard';
import { InventoryAnalytics } from '@/components/county/inventory-analytics';
import { EmergencyAnalytics } from '@/components/county/emergency-analytics';
import { AIStatisticsPanel } from '@/components/county/ai-statistics-panel';

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
        <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold tracking-tight">
      County Command Center
    </h1>

    <p className="text-slate-500 mt-2">
      AI-powered oversight of every healthcare facility across Mombasa County.
    </p>
  </div>

  <div className="rounded-xl border bg-white p-4 shadow-sm">
    <div className="text-xs text-slate-500">
      County Health Score
    </div>

    <div className="text-4xl font-bold text-emerald-600">
      81
    </div>

    <div className="text-xs text-emerald-600">
      ▲ +4 this week
    </div>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

<Card>
<CardContent className="p-6">
<div className="text-sm text-slate-500">
Hospitals
</div>

<div className="text-4xl font-bold mt-2">
12
</div>

<div className="text-green-600 text-sm mt-2">
All Connected
</div>
</CardContent>
</Card>

<Card>
<CardContent className="p-6">
<div className="text-sm text-slate-500">
Critical Alerts
</div>

<div className="text-4xl font-bold mt-2 text-red-600">
3
</div>

<div className="text-red-500 text-sm mt-2">
Need intervention
</div>
</CardContent>
</Card>

<Card>
<CardContent className="p-6">
<div className="text-sm text-slate-500">
Distress Signals
</div>

<div className="text-4xl font-bold mt-2">
5
</div>

<div className="text-orange-500 text-sm mt-2">
2 unresolved
</div>
</CardContent>
</Card>

<Card>
<CardContent className="p-6">
<div className="text-sm text-slate-500">
County AI Score
</div>

<div className="text-4xl font-bold mt-2 text-blue-600">
91%
</div>

<div className="text-blue-500 text-sm mt-2">
Healthy Network
</div>
</CardContent>
</Card>

</div>

<Card className="mb-8">

<CardHeader>

<CardTitle>
Today&apos;s AI Summary
</CardTitle>

</CardHeader>

<CardContent>

<div className="rounded-lg bg-blue-50 p-5 leading-7">

Gemma has analyzed all hospitals.

• 3 hospitals require intervention.

• 1 hospital is likely to run out of insulin today.

• Medicine redistribution could prevent 5 stock-outs.

• County performance improved by 4%.

</div>

</CardContent>

</Card>

        <CountyAnalyticsDashboard
          stats={{
            totalHospitals: stats.hospitalsActive.value,
            totalPatients: stats.bedsAvailable.value,
            emergencies: stats.criticalAlerts.value,
            staff: stats.distressSignals.value,
          }}
        />

        <div className="grid gap-6 mt-8 lg:grid-cols-2">
          <InventoryAnalytics items={[]} />
          <EmergencyAnalytics
            data={{
              activeIncidents: stats.criticalAlerts.value,
            }}
          />
        </div>

        <div className="mt-8">
          <AIStatisticsPanel />
        </div>

        <CountyOverview stats={stats} />
        <div className="grid lg:grid-cols-3 gap-6 mt-8">

  <Card>
    <CardHeader>
      <CardTitle>Pending Hospital Approvals</CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">

      <div className="border rounded-lg p-4">
        <div className="font-semibold">
          Mama Ngina Hospital
        </div>

        <div className="text-sm text-slate-500">
          Submitted 2 hours ago
        </div>

        <div className="mt-3">
          <button className="text-blue-600 text-sm">
            Review →
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="font-semibold">
          Mtwapa Medical Centre
        </div>

        <div className="text-sm text-slate-500">
          Submitted today
        </div>

      </div>

    </CardContent>
  </Card>

  <Card>

    <CardHeader>

      <CardTitle>
        Recent County Announcements
      </CardTitle>

    </CardHeader>

    <CardContent>

      <div className="space-y-4">

        <div>
          📦 Maternal Supplies Allocation
        </div>

        <div>
          🚨 Cholera Preparedness Alert
        </div>

        <div>
          📅 August Staff Training
        </div>

      </div>

    </CardContent>

  </Card>

  <Card>

    <CardHeader>

      <CardTitle>

County Activity

      </CardTitle>

    </CardHeader>

    <CardContent>

      <div className="space-y-3 text-sm">

Hospital Approved

<br/>

Distress Signal Resolved

<br/>

Inventory Updated

<br/>

Inspection Scheduled

      </div>

    </CardContent>

  </Card>

</div>
        <div className="mt-6">
          <div className="mb-4">

<h2 className="text-2xl font-bold">

Hospital Performance

</h2>

<p className="text-slate-500">

Live status of every registered hospital.

</p>

</div>
          <HospitalList hospitals={hospitalsData || []} />
        </div>
        <Card className="mt-8">

<CardHeader>

<CardTitle>

Emergency Transfers

</CardTitle>

</CardHeader>

<CardContent>

<div className="space-y-4">

<div className="rounded-lg border p-4">

Likoni PHC requested

100 bottles Amoxicillin

↓

Transfer from Coast General

ETA 22 min

</div>

<div className="rounded-lg border p-4">

Port Reitz Hospital

↓

Insulin shortage

↓

Recommend KEMSA emergency order

</div>

</div>

</CardContent>

</Card>
        <div className="mt-6">
          <WeeklyWatchlist watchlistItems={watchlistData || []} />
          <EmergencyCommandCenter />
          <MedicineRedistribution />
          <AIPredictionCenter />
          <CountyDigitalTwin />
          <OutbreakMonitor />
          <CountyHealthMap />
          <AIExecutiveBriefing />
        </div>
      </div>
    </div>
  );
}
