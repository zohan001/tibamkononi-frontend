'use client';

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export function AIPredictionCenter() {
  return (
    <Card className="mt-8 border-violet-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-600" />
          AI Prediction Center
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          <div className="rounded-xl border p-5">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Coast General
                </h3>

                <p className="text-sm text-slate-500">
                  Emergency admissions expected to increase tonight.
                </p>

              </div>

              <TrendingUp className="h-7 w-7 text-red-500" />

            </div>

            <div className="mt-4 text-sm">
              AI Confidence: <strong>94%</strong>
            </div>

          </div>

          <div className="rounded-xl border p-5">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Tudor Hospital
                </h3>

                <p className="text-sm text-slate-500">
                  Blood bank likely below safe levels tomorrow.
                </p>

              </div>

              <AlertTriangle className="h-7 w-7 text-orange-500" />

            </div>

            <div className="mt-4 text-sm">
              Recommendation:
              Prepare emergency blood transfer today.
            </div>

          </div>

          <div className="rounded-xl border p-5">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Port Reitz Hospital
                </h3>

                <p className="text-sm text-slate-500">
                  Medicine supply expected to remain stable.
                </p>

              </div>

              <ShieldCheck className="h-7 w-7 text-green-600" />

            </div>

            <div className="mt-4 text-sm">
              AI predicts no supply risks within 7 days.
            </div>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}