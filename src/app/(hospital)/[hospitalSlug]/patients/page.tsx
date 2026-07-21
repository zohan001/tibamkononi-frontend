'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { PatientTable } from '@/components/hospital/patient-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const mockPatients = [
  { id: '1', fullName: 'Fatuma Juma', age: 34, gender: 'Female', diagnosis: 'Malaria', registeredAt: '2026-07-20T08:30:00Z' },
  { id: '2', fullName: 'Ali Hassan', age: 12, gender: 'Male', diagnosis: 'Typhoid', registeredAt: '2026-07-20T09:15:00Z' },
  { id: '3', fullName: 'Mwende Kaingu', age: 28, gender: 'Female', diagnosis: 'Prenatal', registeredAt: '2026-07-20T10:00:00Z' },
];

export default function PatientsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Patients</h1>
          <Link href={`/${slug}/patients/new`}>
            <Button><Plus className="mr-2 h-4 w-4" /> Register Patient</Button>
          </Link>
        </div>
        <PatientTable patients={mockPatients} />
      </div>
    </div>
  );
}
