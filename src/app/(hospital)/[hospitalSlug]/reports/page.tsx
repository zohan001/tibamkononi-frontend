'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { DailyReport } from '@/components/hospital/daily-report';
import { useHospital } from '@/hooks/use-hospitals';
import { usePatients } from '@/hooks/use-patients';
import { useInventory } from '@/hooks/use-inventory';
import { Loader2 } from 'lucide-react';

export default function ReportsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: hospital, isLoading: hospitalLoading } = useHospital(slug);
  const { data: patients, isLoading: patientsLoading } = usePatients(slug);
  const { data: inventory, isLoading: inventoryLoading } = useInventory(slug);

  const isLoading = hospitalLoading || patientsLoading || inventoryLoading;

  const wards = (hospital?.buildings || []).flatMap((b) => b.wards);
  const totalBeds = wards.reduce((sum, w) => sum + w.bedCount, 0);
  const occupiedBeds = wards.reduce((sum, w) => sum + w.bedsOccupied, 0);
  const bedOccupancy = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
  const criticalStock = (inventory || []).filter((i) => i.status === 'critical').length;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={hospital?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Daily Reports</h1>
        <DailyReport
          stats={{
            patientsToday: (patients || []).length,
            patientsTrend: 'up' as const,
            bedsOccupancy: bedOccupancy,
            bedsTrend: 'up' as const,
            criticalStock,
            criticalTrend: criticalStock > 0 ? 'up' as const : 'down' as const,
          }}
          summary={`Today the hospital treated ${(patients || []).length} patients across all departments. Bed occupancy at ${bedOccupancy}%. ${criticalStock} critical stock warnings. Staff attendance data available.`}
        />
      </div>
    </div>
  );
}
