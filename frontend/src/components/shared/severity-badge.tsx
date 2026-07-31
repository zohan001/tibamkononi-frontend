'use client';

import { cn } from '@/lib/utils';

const severityConfig: Record<
  string,
  { dot: string; bg: string; text: string; label: string }
> = {
  critical: {
    dot: 'bg-red-500',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    label: 'Critical',
  },
  warning: {
    dot: 'bg-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    text: 'text-yellow-700 dark:text-yellow-400',
    label: 'Warning',
  },
  ok: {
    dot: 'bg-green-500',
    bg: 'bg-green-50 dark:bg-green-950/40',
    text: 'text-green-700 dark:text-green-400',
    label: 'OK',
  },
  info: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    label: 'Info',
  },
};

interface SeverityBadgeProps {
  severity: string;
  size?: 'sm' | 'md';
}

export function SeverityBadge({ severity, size = 'sm' }: SeverityBadgeProps) {
  const config = severityConfig[severity.toLowerCase()] ?? severityConfig.info;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        config.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      )}
    >
      <span
        className={cn(
          'inline-block rounded-full',
          config.dot,
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'
        )}
      />
      {config.label}
    </span>
  );
}
