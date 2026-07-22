'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { PatientTable } from '@/components/hospital/patient-table';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePatients } from '@/hooks/use-patients';

export default function PatientsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: patients, isLoading } = usePatients(slug);

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
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Patients</h1>
          <Link href={`/${slug}/patients/new`}>
            <Button><Plus className="mr-2 h-4 w-4" /> Register Patient</Button>
          </Link>
        </div>
        <PatientTable patients={patients || []} />
      </div>
    </div>
  );
}
