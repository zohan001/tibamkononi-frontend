'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { AppointmentScheduler } from '@/components/hospital/appointment-scheduler';
import { useAppointments } from '@/hooks/use-appointments';
import { Loader2 } from 'lucide-react';

interface TimeSlot {
  time: string;
  doctorName: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export default function HospitalAppointmentsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: appointments, isLoading } = useAppointments(slug);

  const schedules: DaySchedule[] = [];
  (appointments || []).forEach((apt) => {
    const day = new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long' });
    const existing = schedules.find((s) => s.day === day);
    if (existing) {
      existing.slots.push({ time: apt.time, doctorName: apt.doctorName, available: apt.status !== 'cancelled' });
    } else {
      schedules.push({
        day,
        slots: [{ time: apt.time, doctorName: apt.doctorName, available: apt.status !== 'cancelled' }],
      });
    }
  });

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
        <h1 className="text-2xl font-bold mb-6">Doctor Schedules & Appointments</h1>
        {schedules.length > 0 ? (
          <AppointmentScheduler schedules={schedules} />
        ) : (
          <div className="text-center py-16 text-slate-500">No appointments scheduled yet</div>
        )}
      </div>
    </div>
  );
}
