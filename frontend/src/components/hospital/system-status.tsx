'use client';

import {
  Wifi,
  Database,
  Brain,
  ShieldCheck,
  Server,
  CheckCircle2,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const services = [
  {
    icon: Wifi,
    name: 'Network',
    status: 'Online',
    color: 'text-green-600',
  },
  {
    icon: Database,
    name: 'Database',
    status: 'Healthy',
    color: 'text-green-600',
  },
  {
    icon: Brain,
    name: 'Gemma AI',
    status: 'Running',
    color: 'text-blue-600',
  },
  {
    icon: ShieldCheck,
    name: 'Security',
    status: 'Protected',
    color: 'text-green-600',
  },
  {
    icon: Server,
    name: 'Backend API',
    status: 'Connected',
    color: 'text-green-600',
  },
];

export function SystemStatus() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>
          Live System Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {services.map((service) => {

          const Icon = service.icon;

          return (
            <div
              key={service.name}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">

                <Icon className={`h-5 w-5 ${service.color}`} />

                <div>

                  <div className="font-medium">
                    {service.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {service.status}
                  </div>

                </div>

              </div>

              <CheckCircle2 className="h-5 w-5 text-green-600" />

            </div>
          );

        })}

      </CardContent>
    </Card>
  );
}