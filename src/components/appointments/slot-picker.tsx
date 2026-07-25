'use client';

import { useState, useMemo } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Lightbulb, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { GemmaBadge } from '@/components/shared/gemma-badge';
import { cn } from '@/lib/utils';
import { TimeSlot } from '@/types/appointment';

interface SlotPickerProps {
  slots?: TimeSlot[];
  selectedDate?: Date;
  doctorName?: string;
  onDateChange?: (date: Date) => void;
  onSlotSelect?: (slot: TimeSlot) => void;
}

export function SlotPicker({
  slots = [],
  selectedDate,
  doctorName,
  onDateChange,
  onSlotSelect,
}: SlotPickerProps) {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const gemmaTip = useMemo(() => {
    const best = slots.find((s) => s.gemmaTip && s.available);
    return best?.gemmaTip ?? null;
  }, [slots]);

  const availableSlots = useMemo(() => {
    return slots.filter((s) => s.available);
  }, [slots]);

  const prevWeek = () => setWeekStart((prev) => addDays(prev, -7));
  const nextWeek = () => setWeekStart((prev) => addDays(prev, 7));

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedSlot(slot.time);
    onSlotSelect?.(slot);
  };

  return (
    <div className="space-y-4">
      {gemmaTip && (
        <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 dark:bg-violet-950/50">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium text-violet-700 dark:text-violet-400">
                Best Time Tip
              </span>
              <GemmaBadge />
            </div>
            <p className="text-xs text-violet-600 dark:text-violet-300">{gemmaTip}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={prevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </span>
        <Button variant="ghost" size="sm" onClick={nextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, today);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onDateChange?.(day)}
              className={cn(
                'flex flex-col items-center rounded-lg px-1 py-2 text-xs transition-colors hover:bg-muted',
                isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                isToday && !isSelected && 'ring-1 ring-primary/30'
              )}
            >
              <span className="text-[10px] uppercase">{format(day, 'EEE')}</span>
              <span className="text-sm font-semibold">{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-1.5 text-sm font-medium">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Available slots for {format(selectedDate, 'MMM d')}
            </h4>
            <span className="text-xs text-muted-foreground">
              {availableSlots.length} slots available
            </span>
          </div>

          {availableSlots.length === 0 ? (
            <p className="py-3 text-center text-sm text-muted-foreground">
              No available slots for this date
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => handleSlotClick(slot)}
                    className={cn(
                      'flex flex-col items-center rounded-lg border p-2 text-xs transition-colors',
                      slot.available
                        ? 'cursor-pointer hover:border-primary hover:bg-primary/5'
                        : 'cursor-not-allowed bg-muted opacity-40',
                      isSelected && 'border-primary bg-primary/10'
                    )}
                  >
                    <span className="font-medium">{slot.time}</span>
                    {doctorName && !slot.doctor ? null : (
                      <span className="text-[10px] text-muted-foreground">
                        {slot.doctor}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
