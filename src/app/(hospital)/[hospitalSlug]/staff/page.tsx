'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { StaffAttendance } from '@/components/hospital/staff-attendance';

const mockStaff = [
  { id: '1', name: 'Dr. Wanjiku', role: 'Doctor', status: 'present' as const },
  { id: '2', name: 'Dr. Otieno', role: 'Doctor', status: 'absent' as const },
  { id: '3', name: 'Nurse Amina', role: 'Nurse', status: 'present' as const },
  { id: '4', name: 'Nurse Peter', role: 'Nurse', status: 'late' as const },
  { id: '5', name: 'Lab Tech Salma', role: 'Lab Technician', status: 'present' as const },
  { id: '6', name: 'Pharmacist Omar', role: 'Pharmacist', status: 'present' as const },
];

export default function StaffPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Staff Attendance</h1>
        <StaffAttendance staff={mockStaff} />
      </div>
    </div>
  );
}
