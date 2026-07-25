'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { AppointmentScheduler } from '@/components/hospital/appointment-scheduler';
import { useAppointments } from '@/hooks/use-appointments';
import { Loader2, Calendar, Clock, UserRound } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-bold">Doctor Schedules & Appointments</h1>

        {schedules.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-700">Weekly Schedule</h2>
            {schedules.map((schedule) => (
              <Card key={schedule.day}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    {schedule.day}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {schedule.slots.map((slot, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between rounded-lg border p-3 ${
                          slot.available ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span className="font-medium text-sm">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserRound className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-600">{slot.doctorName}</span>
                          <Badge variant={slot.available ? 'default' : 'secondary'} className="text-xs">
                            {slot.available ? 'Available' : 'Booked'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AppointmentScheduler
          onBook={(apt) => {
            console.log('New appointment booked:', apt);
          }}
        />

        {schedules.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p>No appointments scheduled yet. Use the form below to book one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
