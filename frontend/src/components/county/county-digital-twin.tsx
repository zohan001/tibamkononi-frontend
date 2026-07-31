'use client';

import { Building2, Activity } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const hospitals = [
  {
    name: 'Coast General',
    status: 'Healthy',
    color: 'bg-green-500',
    beds: 142,
  },
  {
    name: 'Mama Ngina',
    status: 'Busy',
    color: 'bg-yellow-500',
    beds: 36,
  },
  {
    name: 'Likoni PHC',
    status: 'Critical',
    color: 'bg-red-500',
    beds: 4,
  },
  {
    name: 'Port Reitz',
    status: 'Healthy',
    color: 'bg-green-500',
    beds: 29,
  },
  {
    name: 'Tudor',
    status: 'Busy',
    color: 'bg-yellow-500',
    beds: 18,
  },
  {
    name: 'Utange',
    status: 'Healthy',
    color: 'bg-green-500',
    beds: 23,
  },
];

export function CountyDigitalTwin() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          County Digital Twin
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

          {hospitals.map((hospital) => (

            <div
              key={hospital.name}
              className="rounded-xl border p-5 hover:shadow-lg transition-all"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-semibold">

                  {hospital.name}

                </h3>

                <div
                  className={`w-3 h-3 rounded-full ${hospital.color}`}
                />

              </div>

              <div className="mt-5 flex items-center gap-2">

                <Activity className="h-4 w-4 text-blue-500"/>

                <span className="text-sm">

                  {hospital.status}

                </span>

              </div>

              <div className="mt-3 text-sm text-slate-500">

                Beds Available

              </div>

              <div className="text-3xl font-bold">

                {hospital.beds}

              </div>

            </div>

          ))}

        </div>

      </CardContent>
    </Card>
  );
}