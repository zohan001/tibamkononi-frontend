'use client';

import { cn } from '@/lib/utils';

interface ConfidenceIndicatorProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CONFIG = {
  sm: { box: 64, stroke: 5, radius: 26, fontSize: 'text-sm', labelSize: 'text-[9px]' },
  md: { box: 96, stroke: 7, radius: 38, fontSize: 'text-xl', labelSize: 'text-xs' },
  lg: { box: 128, stroke: 9, radius: 52, fontSize: 'text-3xl', labelSize: 'text-sm' },
} as const;

function getConfidenceColor(value: number): string {
  if (value >= 80) return '#22c55e';
  if (value >= 60) return '#84cc16';
  if (value >= 40) return '#eab308';
  if (value >= 20) return '#f97316';
  return '#ef4444';
}

function getConfidenceLabel(value: number): string {
  if (value >= 80) return 'Very High';
  if (value >= 60) return 'High';
  if (value >= 40) return 'Medium';
  if (value >= 20) return 'Low';
  return 'Very Low';
}

export function ConfidenceIndicator({
  value,
  label,
  size = 'md',
}: ConfidenceIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const config = SIZE_CONFIG[size];
  const circumference = 2 * Math.PI * config.radius;
  const fillLength = (clamped / 100) * circumference;
  const center = config.box / 2;
  const color = getConfidenceColor(clamped);
  const displayLabel = label ?? getConfidenceLabel(clamped);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={config.box}
        height={config.box / 2 + config.stroke}
        viewBox={`0 0 ${config.box} ${config.box / 2 + config.stroke}`}
      >
        <path
          d={`M ${config.stroke / 2} ${center} A ${config.radius} ${config.radius} 0 0 1 ${config.box - config.stroke / 2} ${center}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={config.stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${config.stroke / 2} ${center} A ${config.radius} ${config.radius} 0 0 1 ${config.box - config.stroke / 2} ${center}`}
          fill="none"
          stroke={color}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${circumference}`}
          className="transition-all duration-700 ease-out"
        />
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          className={cn('font-bold tabular-nums', config.fontSize)}
          fill={color}
        >
          {clamped}%
        </text>
        <text
          x={center}
          y={center + (size === 'sm' ? 10 : 14)}
          textAnchor="middle"
          className={cn('font-medium', config.labelSize)}
          fill="#64748b"
        >
          {displayLabel}
        </text>
      </svg>
    </div>
  );
}
