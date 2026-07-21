'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { CountyOverview } from '@/components/county/county-overview';
import { HospitalList } from '@/components/county/hospital-list';
import { WeeklyWatchlist } from '@/components/county/weekly-watchlist';

const mockStats = {
  hospitalsActive: { label: 'Hospitals Active', value: 12 },
  bedsAvailable: { label: 'Beds Available', value: 1240, trend: 'up' as const },
  criticalAlerts: { label: 'Critical Alerts', value: 3, trend: 'up' as const },
  distressSignals: { label: 'Distress Signals', value: 5 },
};

const mockHospitals = [
  { id: '1', name: 'Bamburi PHC', status: 'approved' as const, alertCount: 0 },
  { id: '2', name: 'Changamwe District', status: 'approved' as const, alertCount: 1 },
  { id: '3', name: 'Coast General Hospital', status: 'approved' as const, alertCount: 0 },
  { id: '4', name: 'Kisauni PHC', status: 'pending' as const, alertCount: 3 },
  { id: '5', name: 'Likoni PHC', status: 'approved' as const, alertCount: 1 },
  { id: '6', name: 'Mama Ngina Hospital', status: 'approved' as const, alertCount: 2 },
  { id: '7', name: 'Port Reitz Hospital', status: 'approved' as const, alertCount: 0 },
];

const mockWatchlist = [
  { hospitalName: 'Kisauni PHC', hospitalSlug: 'kisauni', score: 28, severity: 'critical' as const, summary: '5 stock-outs in July. Staff attendance 67%. Recommend urgent visit.' },
  { hospitalName: 'Likoni PHC', hospitalSlug: 'likoni-phc', score: 45, severity: 'warning' as const, summary: 'Maternity over capacity. Catchment population outgrown facility.' },
  { hospitalName: 'Mama Ngina Hospital', hospitalSlug: 'mama-ngina', score: 72, severity: 'warning' as const, summary: 'Amoxicillin stock-out averted. Address Dr. Otieno attendance pattern.' },
];

export default function CountyDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Mombasa County — Health Overview</h1>
        <CountyOverview stats={mockStats} />
        <div className="mt-6">
          <HospitalList hospitals={mockHospitals} />
        </div>
        <div className="mt-6">
          <WeeklyWatchlist watchlistItems={mockWatchlist} />
        </div>
      </div>
    </div>
  );
}
