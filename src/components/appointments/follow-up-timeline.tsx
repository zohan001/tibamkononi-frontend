'use client';

import { format, parseISO } from 'date-fns';
import {
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FollowUpStatus = 'upcoming' | 'completed' | 'missed' | 'rescheduled';

interface FollowUpItem {
  date: string;
  doctor: string;
  reason: string;
  status: FollowUpStatus;
  notes?: string;
}

interface FollowUpTimelineProps {
  followUps?: FollowUpItem[];
}

const statusConfig: Record<
  FollowUpStatus,
  { color: string; bg: string; icon: typeof CheckCircle; label: string }
> = {
  upcoming: {
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: Clock,
    label: 'Upcoming',
  },
  completed: {
    color: 'text-green-700',
    bg: 'bg-green-100',
    icon: CheckCircle,
    label: 'Completed',
  },
  missed: {
    color: 'text-red-700',
    bg: 'bg-red-100',
    icon: XCircle,
    label: 'Missed',
  },
  rescheduled: {
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    icon: RefreshCw,
    label: 'Rescheduled',
  },
};

const defaultFollowUps: FollowUpItem[] = [
  {
    date: '2026-07-15',
    doctor: 'Dr. Asha Mwinyi',
    reason: 'Post-surgery follow-up',
    status: 'completed',
    notes: 'Patient is recovering well. Continue medication.',
  },
  {
    date: '2026-08-01',
    doctor: 'Dr. Asha Mwinyi',
    reason: 'Blood pressure check',
    status: 'upcoming',
  },
  {
    date: '2026-08-15',
    doctor: 'Dr. Asha Mwinyi',
    reason: 'Lab results review',
    status: 'upcoming',
  },
  {
    date: '2026-06-20',
    doctor: 'Dr. Asha Mwinyi',
    reason: 'Routine check-up',
    status: 'missed',
    notes: 'Patient did not attend. Rescheduled.',
  },
  {
    date: '2026-06-30',
    doctor: 'Dr. Asha Mwinyi',
    reason: 'Routine check-up',
    status: 'rescheduled',
    notes: 'Moved from June 20 due to patient request.',
  },
];

export function FollowUpTimeline({
  followUps = defaultFollowUps,
}: FollowUpTimelineProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Follow-Up History</h3>

      <div className="relative ml-4 border-l-2 border-muted pl-6">
        {followUps.map((item, i) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;

          return (
            <div key={i} className="relative mb-8 last:mb-0">
              <div
                className={cn(
                  'absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full',
                  config.bg
                )}
              >
                <Icon className={cn('h-3.5 w-3.5', config.color)} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {format(parseISO(item.date), 'MMM d, yyyy')}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      config.bg,
                      config.color
                    )}
                  >
                    {config.label}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{item.reason}</p>
                <p className="text-xs text-muted-foreground">{item.doctor}</p>

                {item.notes && (
                  <div className="mt-2 flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2">
                    <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{item.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
