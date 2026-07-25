'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  ShieldAlert,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const outbreaks = [
  {
    disease: 'Malaria',
    area: 'Likoni',
    trend: 'Increasing',
    confidence: '96%',
    icon: TrendingUp,
    color: 'text-red-600',
  },
  {
    disease: 'Cholera',
    area: 'Old Town',
    trend: 'Stable',
    confidence: '89%',
    icon: TrendingDown,
    color: 'text-yellow-600',
  },
  {
    disease: 'Typhoid',
    area: 'Kisauni',
    trend: 'Declining',
    confidence: '91%',
    icon: TrendingDown,
    color: 'text-green-600',
  },
];

export function OutbreakMonitor() {
  return (
    <Card className="mt-8 border-red-200">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <ShieldAlert className="h-5 w-5 text-red-600"/>

          AI Disease Outbreak Monitor

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-4">

          {outbreaks.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.disease}
                className="rounded-xl border p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-semibold">
                      {item.disease}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.area}
                    </p>

                  </div>

                  <Icon className={`h-6 w-6 ${item.color}`} />

                </div>

                <div className="mt-4 text-sm">

                  Trend:
                  <strong> {item.trend}</strong>

                </div>

                <div className="text-sm">

                  AI Confidence:
                  <strong> {item.confidence}</strong>

                </div>

              </div>

            );

          })}

        </div>

      </CardContent>

    </Card>
  );
}