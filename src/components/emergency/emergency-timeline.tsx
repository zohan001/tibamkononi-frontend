'use client';

import { cn } from '@/lib/utils';

interface TimelineEvent {
  time: string;
  type: 'report' | 'analysis' | 'dispatch' | 'arrival' | 'treatment' | 'update';
  title: string;
  description: string;
}

interface EmergencyTimelineProps {
  events?: TimelineEvent[];
}

const typeColors: Record<TimelineEvent['type'], string> = {
  report: 'bg-red-500',
  analysis: 'bg-purple-500',
  dispatch: 'bg-blue-500',
  arrival: 'bg-green-500',
  treatment: 'bg-emerald-600',
  update: 'bg-amber-500',
};

export function EmergencyTimeline({ events = [] }: EmergencyTimelineProps) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">No events recorded</p>;
  }

  return (
    <div className="relative ml-3 border-l-2 border-slate-200 pl-6 space-y-6">
      {events.map((event, i) => (
        <div key={i} className="relative">
          <div
            className={cn(
              'absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white ring-2 ring-slate-200',
              typeColors[event.type]
            )}
          />
          <p className="text-xs text-muted-foreground mb-1">{event.time}</p>
          <p className="font-semibold text-sm">{event.title}</p>
          <p className="text-sm text-slate-600">{event.description}</p>
        </div>
      ))}
    </div>
  );
}
