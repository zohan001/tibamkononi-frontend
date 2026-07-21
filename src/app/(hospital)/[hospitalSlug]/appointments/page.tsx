'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { AppointmentScheduler } from '@/components/hospital/appointment-scheduler';

const mockSchedules = [
  {
    day: 'Monday',
    slots: [
      { time: '08:00 - 12:00', doctorName: 'Dr. Wanjiku', available: true },
      { time: '08:00 - 14:00', doctorName: 'Dr. Otieno', available: true },
      { time: '12:00 - 17:00', doctorName: 'Dr. Wanjiku', available: true },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '08:00 - 12:00', doctorName: 'Dr. Wanjiku', available: true },
      { time: '08:00 - 14:00', doctorName: 'Dr. Otieno', available: false },
      { time: '12:00 - 17:00', doctorName: 'Dr. Wanjiku', available: true },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '08:00 - 12:00', doctorName: 'Dr. Wanjiku', available: true },
      { time: '08:00 - 14:00', doctorName: 'Dr. Otieno', available: true },
    ],
  },
];

export default function HospitalAppointmentsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Doctor Schedules & Appointments</h1>
        <AppointmentScheduler schedules={mockSchedules} />
      </div>
    </div>
  );
}
