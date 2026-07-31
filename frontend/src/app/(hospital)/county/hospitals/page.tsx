'use client';

import { CountySidebar } from '@/components/layout/county-sidebar';
import { HospitalList } from '@/components/county/hospital-list';
import { useCountyHospitals } from '@/hooks/use-county';
import { Loader2 } from 'lucide-react';

export default function CountyHospitalsPage() {
  const { data: hospitals, isLoading } = useCountyHospitals();

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">County Hospitals</h1>
          <p className="text-slate-500 mt-2">
            Live status of every healthcare facility in Mombasa County.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <HospitalList hospitals={hospitals || []} />
        )}
      </div>
    </div>
  );
}
