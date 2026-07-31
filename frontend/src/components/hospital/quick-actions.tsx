'use client';

import Link from 'next/link';
import {
  UserPlus,
  CalendarPlus,
  Package,
  Users,
  BedDouble,
  FileBarChart2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const actions = [
  {
    title: 'Register Patient',
    description: 'Add a new patient',
    href: 'patients/new',
    icon: UserPlus,
    color: 'bg-blue-500',
  },
  {
    title: 'Appointments',
    description: 'Manage bookings',
    href: 'appointments',
    icon: CalendarPlus,
    color: 'bg-emerald-500',
  },
  {
    title: 'Inventory',
    description: 'Medicine stock',
    href: 'inventory',
    icon: Package,
    color: 'bg-orange-500',
  },
  {
    title: 'Staff',
    description: 'Hospital staff',
    href: 'staff',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'Beds',
    description: 'Ward occupancy',
    href: 'beds',
    icon: BedDouble,
    color: 'bg-cyan-500',
  },
  {
    title: 'Reports',
    description: 'Analytics',
    href: 'reports',
    icon: FileBarChart2,
    color: 'bg-pink-500',
  },
];

export function QuickActions({ hospitalSlug }: { hospitalSlug: string }) {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {actions.map((action) => {

            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={`/${hospitalSlug}/${action.href}`}
                className="rounded-xl border p-5 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-semibold">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {action.description}
                </p>
              </Link>
            );

          })}

        </div>

      </CardContent>
    </Card>
  );
}