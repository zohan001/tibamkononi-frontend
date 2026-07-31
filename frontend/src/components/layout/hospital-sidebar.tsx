'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  BedDouble,
  Stethoscope,
  AlertTriangle,
  Calendar,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HospitalSidebarProps {
  hospitalSlug: string;
  hospitalName: string;
}

const sidebarItems = [
  { href: '', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/beds', label: 'Beds', icon: BedDouble },
  { href: '/staff', label: 'Staff', icon: Stethoscope },
  { href: '/distress', label: 'Distress', icon: AlertTriangle },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/reports', label: 'Reports', icon: FileText },
];

export function HospitalSidebar({ hospitalSlug, hospitalName }: HospitalSidebarProps) {
  const pathname = usePathname();
  const base = `/${hospitalSlug}`;

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-card">
      <div className="border-b px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground truncate">
          {hospitalName}
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {sidebarItems.map((item) => {
          const href = `${base}${item.href}`;
          const isActive =
            item.href === ''
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
