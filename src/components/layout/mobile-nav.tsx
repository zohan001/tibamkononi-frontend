'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Ambulance,
  Stethoscope,
  Calendar,
  Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/hospital-portal', label: 'Hospital', icon: Building2 },
  { href: '/emergency', label: 'Emergency', icon: Ambulance },
  { href: '/self-diagnosis', label: 'Diagnosis', icon: Stethoscope },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/announcements', label: 'Announce', icon: Megaphone },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background sm:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[0.65rem] font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon
                className={cn('h-5 w-5', isActive && 'fill-primary/10')}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
