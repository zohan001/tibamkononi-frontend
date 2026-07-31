'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  Brain,
  Users,
  Activity,
  Bed,
  Pill,
  Clock,
} from 'lucide-react';

export function HospitalAICommandCenter() {
  return (
    <Card className="mt-8 border-blue-200">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Brain className="h-5 w-5 text-blue-600"/>

          Hospital AI Command Center

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="rounded-xl border p-5">

            <Users className="h-8 w-8 text-blue-600 mb-4"/>

            <div className="text-sm text-slate-500">

              Patients Waiting

            </div>

            <div className="text-4xl font-bold">

              43

            </div>

            <div className="text-green-600 text-sm mt-2">

              Average wait: 14 mins

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <Bed className="h-8 w-8 text-green-600 mb-4"/>

            <div className="text-sm text-slate-500">

              Bed Occupancy

            </div>

            <div className="text-4xl font-bold">

              81%

            </div>

            <div className="text-sm text-slate-500 mt-2">

              34 beds available

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <Pill className="h-8 w-8 text-red-500 mb-4"/>

            <div className="text-sm text-slate-500">

              Medicines Low

            </div>

            <div className="text-4xl font-bold">

              5

            </div>

            <div className="text-red-600 text-sm mt-2">

              Needs action

            </div>

          </div>

        </div>

        <div className="mt-8 rounded-xl bg-blue-50 p-5">

          <div className="flex items-center gap-2 mb-3">

            <Activity className="h-5 w-5 text-blue-600"/>

            <span className="font-semibold">

              AI Hospital Summary

            </span>

          </div>

          <p className="leading-7 text-slate-700">

            Patient arrivals are expected to increase by approximately
            18% after 6 PM. Emergency beds remain sufficient, although
            insulin inventory may reach a critical level within 24
            hours. Current staffing levels are adequate for projected
            patient demand.

          </p>

        </div>

        <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">

          <Clock className="h-4 w-4"/>

          Last AI analysis: 2 minutes ago

        </div>

      </CardContent>

    </Card>
  );
}