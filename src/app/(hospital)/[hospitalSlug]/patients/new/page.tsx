'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { PatientForm } from '@/components/hospital/patient-form';

export default function NewPatientPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Register New Patient</h1>
        <PatientForm onSubmit={(patient) => { console.log('New patient:', patient); }} />
      </div>
    </div>
  );
}
