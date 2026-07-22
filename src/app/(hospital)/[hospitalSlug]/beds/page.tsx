'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { BedGrid } from '@/components/hospital/bed-grid';
import { useHospital } from '@/hooks/use-hospitals';
import { Loader2 } from 'lucide-react';

export default function BedsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: hospital, isLoading } = useHospital(slug);

  const wards = (hospital?.buildings || []).flatMap((b) =>
    b.wards.map((w) => ({
      id: w.id,
      name: w.name,
      bedCount: w.bedCount,
      bedsOccupied: w.bedsOccupied,
      type: w.type,
    }))
  );

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
        <h1 className="text-2xl font-bold mb-6">Bed Management</h1>
        {wards.length > 0 ? (
          <BedGrid wards={wards} />
        ) : (
          <div className="text-center py-16 text-slate-500">No ward data available</div>
        )}
      </div>
    </div>
  );
}
