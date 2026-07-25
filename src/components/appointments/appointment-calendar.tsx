'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppointmentItem {
  date: string;
  time: string;
  patientName: string;
  doctor: string;
  status: string;
}

interface AppointmentCalendarProps {
  appointments?: AppointmentItem[];
  onDateSelect?: (date: Date) => void;
}

export function AppointmentCalendar({
  appointments = [],
  onDateSelect,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const appointmentMap = useMemo(() => {
    const map: Record<string, AppointmentItem[]> = {};
    for (const appt of appointments) {
      const key = appt.date;
      if (!map[key]) map[key] = [];
      map[key].push(appt);
    }
    return map;
  }, [appointments]);

  const getCountForDate = (date: Date): number => {
    const key = format(date, 'yyyy-MM-dd');
    return appointmentMap[key]?.length ?? 0;
  };

  const getSelectedDayAppointments = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, 'yyyy-MM-dd');
    return appointmentMap[key] ?? [];
  }, [selectedDate, appointmentMap]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon-sm" onClick={() => setCurrentMonth((m) => subMonths(m, 1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-sm font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
        <Button variant="ghost" size="icon-sm" onClick={() => setCurrentMonth((m) => addMonths(m, 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="py-1 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const count = getCountForDate(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleDayClick(day)}
              className={cn(
                'relative flex flex-col items-center rounded-lg p-2 text-sm transition-colors',
                inMonth ? 'text-foreground' : 'text-muted-foreground/50',
                today && !isSelected && 'ring-1 ring-primary/30',
                isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                !isSelected && 'hover:bg-muted'
              )}
            >
              <span className="text-xs font-medium">{format(day, 'd')}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : count >= 3
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-2 rounded-lg border p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h4>
          {getSelectedDayAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments scheduled</p>
          ) : (
            <div className="space-y-2">
              {getSelectedDayAppointments.map((appt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{appt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{appt.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appt.time}</p>
                    <p className="text-xs text-muted-foreground">{appt.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
