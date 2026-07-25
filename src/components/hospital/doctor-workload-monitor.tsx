'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  Users,
  Brain,
  Clock3,
} from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Hassan',
    department: 'Emergency',
    patients: 24,
    wait: '18 min',
    workload: 92,
  },
  {
    name: 'Dr. Peter Mwangi',
    department: 'Outpatient',
    patients: 11,
    wait: '6 min',
    workload: 43,
  },
  {
    name: 'Dr. Fatma Ali',
    department: 'Pediatrics',
    patients: 16,
    wait: '10 min',
    workload: 67,
  },
];

export function DoctorWorkloadMonitor() {
  return (
    <Card className="mt-8">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Users className="h-5 w-5 text-blue-600"/>

          AI Doctor Workload

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          {doctors.map((doctor) => (

            <div
              key={doctor.name}
              className="rounded-xl border p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold">

                    {doctor.name}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {doctor.department}

                  </p>

                </div>

                <div className="text-right">

                  <div className="text-2xl font-bold">

                    {doctor.workload}%

                  </div>

                  <div className="text-xs text-slate-500">

                    Workload

                  </div>

                </div>

              </div>

              <div className="mt-5">

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${doctor.workload}%`,
                    }}
                  />

                </div>

              </div>

              <div className="mt-4 flex justify-between text-sm">

                <span>

                  {doctor.patients} Patients

                </span>

                <span className="flex items-center gap-1">

                  <Clock3 className="h-4 w-4"/>

                  {doctor.wait}

                </span>

              </div>

            </div>

          ))}

          <div className="rounded-xl bg-blue-50 p-5">

            <div className="flex items-center gap-2 mb-3">

              <Brain className="h-5 w-5 text-blue-600"/>

              AI Recommendation

            </div>

            <p className="text-sm leading-7">

              Dr. Sarah Hassan is approaching maximum workload.
              Redirect the next emergency patients to
              Dr. Peter Mwangi to reduce waiting time by
              approximately 11 minutes.

            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}