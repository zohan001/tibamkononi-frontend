export function calculateSeverity(score: number): 'critical' | 'warning' | 'normal' {
  if (score <= 30) return 'critical';
  if (score <= 60) return 'warning';
  return 'normal';
}

export function getStockSeverity(daysRemaining: number): 'critical' | 'warning' | 'ok' {
  if (daysRemaining <= 3) return 'critical';
  if (daysRemaining <= 7) return 'warning';
  return 'ok';
}

export function getBedSeverity(occupied: number, total: number): 'critical' | 'warning' | 'normal' {
  const percentage = (occupied / total) * 100;
  if (percentage >= 95) return 'critical';
  if (percentage >= 80) return 'warning';
  return 'normal';
}

export function getAttendanceSeverity(present: number, total: number): 'critical' | 'warning' | 'normal' {
  const percentage = (present / total) * 100;
  if (percentage < 60) return 'critical';
  if (percentage < 80) return 'warning';
  return 'normal';
}

export function getSeverityColor(severity: 'critical' | 'warning' | 'normal' | 'ok'): string {
  switch (severity) {
    case 'critical': return 'bg-red-500';
    case 'warning': return 'bg-yellow-500';
    case 'normal':
    case 'ok': return 'bg-green-500';
  }
}

export function getSeverityTextColor(severity: 'critical' | 'warning' | 'normal' | 'ok'): string {
  switch (severity) {
    case 'critical': return 'text-red-500';
    case 'warning': return 'text-yellow-600';
    case 'normal':
    case 'ok': return 'text-green-600';
  }
}
