'use client';

import { TrendingUp, Award, ShieldCheck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PerformanceScore() {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6" />
          Hospital Performance Score
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-center py-4">
          <div className="text-7xl font-extrabold">
            94%
          </div>

          <p className="mt-2 text-emerald-100">
            Excellent Performance
          </p>
        </div>

        <div className="mt-8 space-y-4">

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Patient Satisfaction</span>
              <span>96%</span>
            </div>

            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: '96%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Medicine Availability</span>
              <span>91%</span>
            </div>

            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: '91%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Bed Utilization</span>
              <span>84%</span>
            </div>

            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: '84%' }}
              />
            </div>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-white/10 p-4 flex gap-3">
          <ShieldCheck className="h-6 w-6 mt-1" />

          <div>
            <div className="font-semibold">
              AI Recommendation
            </div>

            <p className="text-sm text-emerald-100 mt-1">
              Redistribute insulin from Ward C and discharge low-risk
              patients to increase capacity by approximately 12%.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm">
          <TrendingUp className="h-5 w-5" />
          Performance improved by 6% compared to last week.
        </div>
      </CardContent>
    </Card>
  );
}