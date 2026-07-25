'use client';

import { useMemo } from 'react';
import { Clock, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleSlot {
  time: string;
  available: boolean;
  patientName?: string;
}

interface DaySchedule {
  day: string;
  slots: ScheduleSlot[];
}

interface DoctorScheduleProps {
  doctorName?: string;
  schedule?: DaySchedule[];
}

const defaultSchedule: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '08:00', available: true },
      { time: '09:00', available: false, patientName: 'Amina Hassan' },
      { time: '10:00', available: true },
      { time: '11:00', available: false, patientName: 'Omar Juma' },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '08:00', available: false, patientName: 'Fatma Ali' },
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '14:00', available: false, patientName: 'Khamis Bakari' },
      { time: '15:00', available: true },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '08:00', available: true },
      { time: '09:00', available: true },
      { time: '10:00', available: false, patientName: 'Said Mohammed' },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false, patientName: 'Rehema Khamis' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '08:00', available: true },
      { time: '09:00', available: false, patientName: 'Issa Salim' },
      { time: '10:00', available: false, patientName: 'Mwanaisha Ali' },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '08:00', available: true },
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ],
  },
];

export function DoctorSchedule({
  doctorName = 'Dr. Asha Mwinyi',
  schedule = defaultSchedule,
}: DoctorScheduleProps) {
  const stats = useMemo(() => {
    let available = 0;
    let booked = 0;
    for (const day of schedule) {
      for (const slot of day.slots) {
        if (slot.available) available++;
        else booked++;
      }
    }
    return { available, booked, total: available + booked };
  }, [schedule]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{doctorName} — Weekly Schedule</h3>
          <p className="text-xs text-muted-foreground">
            {stats.booked} booked · {stats.available} available · {stats.total} total
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid gap-px bg-border" style={{ gridTemplateColumns: `80px repeat(${schedule.length}, 1fr)` }}>
            <div className="bg-muted/50 p-2" />
            {schedule.map((day) => (
              <div
                key={day.day}
                className="bg-muted/50 p-2 text-center text-xs font-medium"
              >
                {day.day}
              </div>
            ))}

            {(() => {
              const allTimes = Array.from(new Set(schedule.flatMap((d) => d.slots.map((s) => s.time)))).sort();
              return allTimes.map((time) => (
                <div key={time} className="contents">
                  <div className="flex items-center gap-1 bg-background p-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {time}
                  </div>
                  {schedule.map((day) => {
                    const slot = day.slots.find((s) => s.time === time);
                    if (!slot) {
                      return (
                        <div
                          key={`${day.day}-${time}`}
                          className="bg-muted/30 p-2"
                        />
                      );
                    }
                    return (
                      <div
                        key={`${day.day}-${time}`}
                        className={cn(
                          'rounded-md p-2 text-xs transition-colors',
                          slot.available
                            ? 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                            : 'bg-red-50 text-red-700'
                        )}
                      >
                        {slot.available ? (
                          <span className="font-medium">Available</span>
                        ) : (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 font-medium">
                              <UserRound className="h-3 w-3" />
                              <span className="truncate">{slot.patientName}</span>
                            </div>
                            <span className="text-[10px] text-red-500">Booked</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
