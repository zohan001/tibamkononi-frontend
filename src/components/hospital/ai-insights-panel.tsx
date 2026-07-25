'use client';

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  HeartPulse,
  Pill,
  BedDouble,
  Sparkles,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const insights = [
  {
    icon: AlertTriangle,
    color: 'text-red-600',
    title: 'Emergency Prediction',
    description:
      'AI predicts a 76% chance of increased trauma admissions this evening due to expected rainfall.',
  },
  {
    icon: Pill,
    color: 'text-orange-500',
    title: 'Medicine Forecast',
    description:
      'Current insulin stock is projected to last only two more days based on recent usage.',
  },
  {
    icon: BedDouble,
    color: 'text-blue-600',
    title: 'Bed Optimization',
    description:
      'Discharging three stable patients today would increase bed availability by 15%.',
  },
  {
    icon: HeartPulse,
    color: 'text-pink-600',
    title: 'Disease Trend',
    description:
      'Malaria-related admissions have risen by 18% compared to last week.',
  },
];

export function AIInsightsPanel() {
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="border-b bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Brain className="h-6 w-6" />
          Gemma AI Hospital Intelligence
        </CardTitle>

        <p className="text-sm text-violet-100">
          Continuous analysis of hospital operations and patient trends.
        </p>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <div className="rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 p-5 border">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-violet-600" />

            <div>
              <h3 className="font-semibold text-lg">
                Today&apos;s AI Executive Summary
              </h3>

              <p className="mt-2 text-slate-600 leading-7">
                Overall hospital performance is improving. Emergency load
                remains manageable, medicine usage is stable, and AI recommends
                redistributing insulin to avoid future shortages.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border p-5 transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  <Icon className={`mt-1 h-6 w-6 ${item.color}`} />

                  <div>
                    <h4 className="font-semibold">{item.title}</h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-emerald-600" />

            <div>
              <div className="font-semibold text-emerald-700">
                Hospital Health Score
              </div>

              <div className="mt-2 text-5xl font-bold text-emerald-600">
                94%
              </div>

              <p className="mt-2 text-sm text-emerald-700">
                Excellent operational performance this week.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}