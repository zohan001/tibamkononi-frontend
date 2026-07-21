'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { DailyReport } from '@/components/hospital/daily-report';

export default function ReportsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Daily Reports</h1>
        <DailyReport
          stats={{ patientsToday: 87, patientsTrend: 'up' as const, bedsOccupancy: 88, bedsTrend: 'up' as const, criticalStock: 3, criticalTrend: 'up' as const }}
          summary="Today the hospital treated 87 patients across all departments. 23 new admissions and 19 discharges. Maternity ward at full capacity. Amoxicillin Paediatric critically low — recommend urgent restocking from KEMSA. Staff attendance at 87.5% with Dr. Otieno absent."
        />
      </div>
    </div>
  );
}
