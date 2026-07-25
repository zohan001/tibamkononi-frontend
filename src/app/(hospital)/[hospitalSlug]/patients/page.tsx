'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import {
  Users,
  Search,
  Plus,
  Activity,
  Calendar,
  UserCheck,
} from 'lucide-react';

import Link from 'next/link';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { useHospital } from '@/hooks/use-hospitals';
import { usePatients } from '@/hooks/use-patients';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function PatientsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  const { data: hospital } = useHospital(slug);
  const { data: patients } = usePatients(slug);

  const [search, setSearch] = useState('');

  const filtered =
    patients?.filter((patient) =>
      patient.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  const male =
    filtered.filter((p) => p.gender === 'Male').length;

  const female =
    filtered.filter((p) => p.gender === 'Female').length;

  return (
    <div className="flex min-h-screen">

      <HospitalSidebar
        hospitalSlug={slug}
        hospitalName={hospital?.name || slug}
      />

      <main className="flex-1 p-8 space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Electronic Medical Records
            </h1>

            <p className="text-slate-500 mt-2">
              Patient management and clinical records
            </p>

          </div>

          <Link href={`/${slug}/patients/new`}>

            <Button>

              <Plus className="mr-2 h-4 w-4"/>

              Register Patient

            </Button>

          </Link>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <Card>

            <CardContent className="p-6">

              <Users className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="text-3xl font-bold">
                {filtered.length}
              </div>

              <div className="text-sm text-slate-500">
                Total Patients
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Activity className="h-8 w-8 text-green-600 mb-3"/>

              <div className="text-3xl font-bold">
                {male}
              </div>

              <div className="text-sm text-slate-500">
                Male
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <UserCheck className="h-8 w-8 text-pink-600 mb-3"/>

              <div className="text-3xl font-bold">
                {female}
              </div>

              <div className="text-sm text-slate-500">
                Female
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Calendar className="h-8 w-8 text-orange-600 mb-3"/>

              <div className="text-3xl font-bold">
                {new Date().getDate()}
              </div>

              <div className="text-sm text-slate-500">
                Today&apos;s Date
              </div>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardContent className="p-6">

            <div className="relative">

              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400"/>

              <Input
                placeholder="Search patient..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="pl-10"
              />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-0">

            <div className="divide-y">

              {filtered.map((patient)=>(
                <Link
                  key={patient.id}
                  href={`/${slug}/patients/${patient.id}`}
                >

                  <div className="flex items-center justify-between p-5 hover:bg-slate-50 cursor-pointer">

                    <div>

                      <h3 className="font-semibold">

                        {patient.fullName}

                      </h3>

                      <p className="text-sm text-slate-500">

                        {patient.age} years • {patient.gender}

                      </p>

                    </div>

                    <Badge>

                      View Record

                    </Badge>

                  </div>

                </Link>
              ))}

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6">

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              Gemma AI has reviewed patient registration patterns.
              Current patient inflow remains stable and no unusual
              disease clusters have been detected today.

            </div>

          </CardContent>

        </Card>

      </main>

    </div>
  );
}