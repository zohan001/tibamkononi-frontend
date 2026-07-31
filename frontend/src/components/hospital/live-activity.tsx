'use client';

import {
  Activity,
  Ambulance,
  Pill,
  UserPlus,
  AlertTriangle,
  Clock,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const activities = [
  {
    icon: UserPlus,
    color: 'text-blue-600',
    title: 'New patient registered',
    description: 'John Mwangi checked in at OPD',
    time: '1 min ago',
  },
  {
    icon: Ambulance,
    color: 'text-red-600',
    title: 'Emergency received',
    description: 'Road accident patient arriving',
    time: '4 mins ago',
  },
  {
    icon: Pill,
    color: 'text-orange-600',
    title: 'Medicine issued',
    description: 'Insulin dispensed to Ward B',
    time: '8 mins ago',
  },
  {
    icon: AlertTriangle,
    color: 'text-yellow-600',
    title: 'Stock warning',
    description: 'Paracetamol below minimum level',
    time: '13 mins ago',
  },
];
export function LiveActivity() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Live Hospital Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border p-4 hover:shadow-md transition"
            >
              <div className="rounded-full bg-slate-100 p-3">
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {item.time}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}