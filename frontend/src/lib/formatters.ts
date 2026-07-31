import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy');
}

export function formatDateTime(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
}

export function formatTime(dateString: string): string {
  return format(parseISO(dateString), 'h:mm a');
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)} km`;
}

export function formatBedCount(occupied: number, total: number): string {
  return `${occupied}/${total} beds occupied`;
}

export function formatStockStatus(daysRemaining: number): 'critical' | 'warning' | 'ok' {
  if (daysRemaining <= 3) return 'critical';
  if (daysRemaining <= 7) return 'warning';
  return 'ok';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
