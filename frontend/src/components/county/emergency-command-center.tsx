'use client';

import {
  Ambulance,
  Siren,
  Clock3,
  MapPinned,
  ArrowRight,
} from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export function EmergencyCommandCenter() {
  return (
    <Card className="mt-8 border-red-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-red-600">
          <Siren className="h-6 w-6" />
          Emergency Command Center
        </CardTitle>

        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">
          LIVE
        </span>
      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          <div className="rounded-xl border p-5">

            <div className="flex justify-between">

              <div>

                <div className="font-semibold">
                  Major Road Accident
                </div>

                <div className="text-sm text-slate-500 mt-1">
                  Nyali Bridge
                </div>

              </div>

              <div className="text-red-600 font-semibold">
                Critical
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="flex gap-2">

                <Clock3 className="h-5 w-5 text-slate-500" />

                4 mins ago

              </div>

              <div className="flex gap-2">

                <MapPinned className="h-5 w-5 text-slate-500" />

                7 casualties

              </div>

              <div className="flex gap-2">

                <Ambulance className="h-5 w-5 text-slate-500" />

                3 ambulances dispatched

              </div>

            </div>

            <div className="mt-5 rounded-lg bg-blue-50 p-4">

              <div className="font-medium">
                AI Recommendation
              </div>

              <div className="text-sm mt-2">

                Redirect 2 patients to Coast General.

                Send remaining to Tudor Hospital.

              </div>

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <div className="flex justify-between">

              <div>

                <div className="font-semibold">
                  Maternal Emergency
                </div>

                <div className="text-sm text-slate-500 mt-1">
                  Likoni
                </div>

              </div>

              <div className="text-orange-500 font-semibold">
                High
              </div>

            </div>

            <div className="mt-4 flex items-center gap-3 text-sm">

              Ambulance

              <ArrowRight className="h-4 w-4" />

              Coast General

            </div>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}