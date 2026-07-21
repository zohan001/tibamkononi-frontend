'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';

export default function PatientDetailPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Patient Details</h1>
        <div className="text-center py-16 text-slate-500">Patient detail view — to be connected with backend API</div>
      </div>
    </div>
  );
}
