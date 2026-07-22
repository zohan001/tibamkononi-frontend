'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { StaffAttendance } from '@/components/hospital/staff-attendance';
import { useStaffAttendance } from '@/hooks/use-staff';
import { Loader2 } from 'lucide-react';

export default function StaffPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: staffData, isLoading } = useStaffAttendance(slug);

  const staff = (staffData || []).map((s) => ({
    id: s.staffId,
    name: s.staffName,
    role: s.role,
    status: s.status,
  }));

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
        <h1 className="text-2xl font-bold mb-6">Staff Attendance</h1>
        <StaffAttendance staff={staff} />
      </div>
    </div>
  );
}
