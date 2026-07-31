'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  Bed,
  Brain,
} from 'lucide-react';

const wards = [
  {
    name: 'Emergency',
    occupied: 28,
    total: 30,
    status: 'Critical',
    color: 'text-red-600',
  },
  {
    name: 'Maternity',
    occupied: 16,
    total: 20,
    status: 'Healthy',
    color: 'text-green-600',
  },
  {
    name: 'Pediatrics',
    occupied: 18,
    total: 25,
    status: 'Healthy',
    color: 'text-green-600',
  },
  {
    name: 'ICU',
    occupied: 9,
    total: 10,
    status: 'Busy',
    color: 'text-yellow-600',
  },
];

export function BedManagementCenter() {
  return (
    <Card className="mt-8">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Bed className="h-5 w-5 text-blue-600"/>

          AI Bed Management Center

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          {wards.map((ward) => {

            const percentage = Math.round(
              (ward.occupied / ward.total) * 100
            );

            return (

              <div
                key={ward.name}
                className="rounded-xl border p-5"
              >

                <div className="flex justify-between mb-3">

                  <h3 className="font-semibold">
                    {ward.name}
                  </h3>

                  <span className={ward.color}>
                    {ward.status}
                  </span>

                </div>

                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span>

                    {ward.occupied}/{ward.total} Beds

                  </span>

                  <span>

                    {percentage}%

                  </span>

                </div>

              </div>

            );

          })}

          <div className="rounded-xl bg-blue-50 p-5">

            <div className="flex items-center gap-2 mb-3">

              <Brain className="h-5 w-5 text-blue-600"/>

              <span className="font-semibold">

                AI Recommendation

              </span>

            </div>

            <p className="leading-7 text-sm">

              Emergency Ward occupancy is projected to reach
              full capacity within the next three hours.
              Consider preparing overflow beds or redirecting
              stable patients to neighboring facilities.

            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}