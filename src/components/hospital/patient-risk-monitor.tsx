'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  AlertTriangle,
  HeartPulse,
  ArrowUp,
} from 'lucide-react';

const patients = [
  {
    name: 'John Mwangi',
    risk: 'Critical',
    score: 96,
    reason: 'Chest pain + abnormal ECG',
  },
  {
    name: 'Amina Hassan',
    risk: 'High',
    score: 89,
    reason: 'High fever + dehydration',
  },
  {
    name: 'Peter Otieno',
    risk: 'Moderate',
    score: 72,
    reason: 'Diabetes follow-up',
  },
];

export function PatientRiskMonitor() {
  return (
    <Card className="mt-8">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <HeartPulse className="h-5 w-5 text-red-600"/>

          AI Patient Risk Monitor

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-4">

          {patients.map((patient) => (

            <div
              key={patient.name}
              className="rounded-xl border p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold">

                    {patient.name}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {patient.reason}

                  </p>

                </div>

                <div className="text-right">

                  <div className="text-2xl font-bold">

                    {patient.score}

                  </div>

                  <div className="text-xs text-slate-500">

                    Risk Score

                  </div>

                </div>

              </div>

              <div className="mt-4 flex items-center gap-2">

                <AlertTriangle className="h-4 w-4 text-red-500"/>

                <span className="font-medium">

                  {patient.risk}

                </span>

                <ArrowUp className="h-4 w-4 text-red-500"/>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}