'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckCircle,
  Building2,
  Megaphone,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { href: '/county', label: 'Overview', icon: LayoutDashboard },
  { href: '/county/approvals', label: 'Approvals', icon: CheckCircle },
  { href: '/county/hospitals', label: 'Hospitals', icon: Building2 },
  { href: '/county/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/county/weekly-watchlist', label: 'Weekly Watchlist', icon: ClipboardList },
];

export function CountySidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-card">
      <div className="border-b px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          County Director
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {sidebarItems.map((item) => {
          const isActive =
            item.href === '/county'
              ? pathname === '/county'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
