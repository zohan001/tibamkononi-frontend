'use client';

import { ArrowRightLeft, Truck, Clock, Brain } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export function MedicineRedistribution() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-blue-600" />
          AI Medicine Redistribution
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          <div className="rounded-xl border p-5">

            <div className="flex justify-between">

              <div>

                <h3 className="font-semibold">
                  Insulin
                </h3>

                <p className="text-sm text-slate-500">
                  Likoni PHC will run out today.
                </p>

              </div>

              <span className="text-red-600 font-semibold">
                Critical
              </span>

            </div>

            <div className="mt-5 flex items-center gap-3 text-sm">

              Coast General

              <ArrowRightLeft className="h-4 w-4" />

              Likoni PHC

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="rounded-lg bg-slate-50 p-4">

                <Truck className="h-5 w-5 mb-2 text-blue-600"/>

                Transfer

                <div className="font-semibold">

                  50 Units

                </div>

              </div>

              <div className="rounded-lg bg-slate-50 p-4">

                <Clock className="h-5 w-5 mb-2 text-orange-500"/>

                ETA

                <div className="font-semibold">

                  18 Minutes

                </div>

              </div>

              <div className="rounded-lg bg-slate-50 p-4">

                <Brain className="h-5 w-5 mb-2 text-purple-600"/>

                AI Confidence

                <div className="font-semibold">

                  97%

                </div>

              </div>

            </div>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}