'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  MapPinned,
  Hospital,
} from 'lucide-react';

const hospitals = [
  {
    name: 'Coast General',
    x: '20%',
    y: '35%',
    status: 'Healthy',
    color: 'bg-green-500',
  },
  {
    name: 'Mama Ngina',
    x: '65%',
    y: '20%',
    status: 'Busy',
    color: 'bg-yellow-500',
  },
  {
    name: 'Likoni PHC',
    x: '70%',
    y: '70%',
    status: 'Critical',
    color: 'bg-red-500',
  },
  {
    name: 'Port Reitz',
    x: '40%',
    y: '65%',
    status: 'Healthy',
    color: 'bg-green-500',
  },
  {
    name: 'Tudor Hospital',
    x: '55%',
    y: '45%',
    status: 'Busy',
    color: 'bg-yellow-500',
  },
];

export function CountyHealthMap() {
  return (
    <Card className="mt-8">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <MapPinned className="h-5 w-5 text-blue-600" />

          Live County Health Map

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="relative h-[500px] rounded-xl border bg-slate-100 overflow-hidden">

          {hospitals.map((hospital) => (

            <div
              key={hospital.name}
              className="absolute"
              style={{
                left: hospital.x,
                top: hospital.y,
              }}
            >

              <div className="flex flex-col items-center">

                <div
                  className={`w-5 h-5 rounded-full ${hospital.color} ring-4 ring-white shadow-lg`}
                />

                <div className="mt-2 rounded-lg bg-white px-3 py-2 shadow">

                  <div className="flex items-center gap-2">

                    <Hospital className="h-4 w-4 text-blue-600"/>

                    <span className="text-xs font-semibold">

                      {hospital.name}

                    </span>

                  </div>

                  <div className="text-xs text-slate-500 mt-1">

                    {hospital.status}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}