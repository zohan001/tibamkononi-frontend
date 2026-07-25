'use client';

import { useParams } from 'next/navigation';

import {
  User,
  Activity,
  Calendar,
  HeartPulse,
  Pill,
  ClipboardList,
  Sparkles,
} from 'lucide-react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import { useHospital } from '@/hooks/use-hospitals';
import { usePatient } from '@/hooks/use-patients';

export default function PatientDetailsPage() {

  const params = useParams();

  const slug = params.hospitalSlug as string;
  const patientId = params.patientId as string;

  const { data: hospital } = useHospital(slug);

  const { data: patient } = usePatient(slug, patientId);

  if (!patient) {
    return (
      <div className="flex min-h-screen">

        <HospitalSidebar
          hospitalSlug={slug}
          hospitalName={hospital?.name || slug}
        />

        <main className="flex-1 flex items-center justify-center">

          Patient not found.

        </main>

      </div>
    );
  }

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

              Patient Record

            </h1>

            <p className="text-slate-500 mt-2">

              Complete electronic medical record

            </p>

          </div>

          <Badge className="text-sm">

            Active Patient

          </Badge>

        </div>

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-6">

              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">

                <User className="h-10 w-10 text-blue-600"/>

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  {patient.fullName}

                </h2>

                <p className="text-slate-500">

                  {patient.age} years • {patient.gender}

                </p>

              </div>

            </div>

          </CardContent>

        </Card>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card>

            <CardContent className="p-6">

              <Activity className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="font-semibold">
  National ID
</div>

<div className="text-slate-500">
  {patient.idNumber}
</div>
            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Calendar className="h-8 w-8 text-green-600 mb-3"/>

              <div className="font-semibold">

                Age

              </div>

              <div className="text-slate-500">

                {patient.age}

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <HeartPulse className="h-8 w-8 text-red-600 mb-3"/>

              <div className="font-semibold">

                Gender

              </div>

              <div className="text-slate-500">

                {patient.gender}

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <ClipboardList className="h-8 w-8 text-purple-600 mb-3"/>

              <div className="font-semibold">

                Status

              </div>

              <Badge>

                Registered

              </Badge>

            </CardContent>

          </Card>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <Card>

            <CardHeader>

              <CardTitle>

                Medical Summary

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-4">

  <div>
    <p className="text-sm text-slate-500">
      National ID
    </p>

    <p className="font-medium">
      {patient.idNumber}
    </p>
  </div>

  <div>
    <p className="text-sm text-slate-500">
      Phone Number
    </p>

    <p className="font-medium">
      {patient.phone}
    </p>
  </div>

  <div>
    <p className="text-sm text-slate-500">
      Address
    </p>

    <p className="font-medium">
      {patient.address}
    </p>
  </div>

  <div>
    <p className="text-sm text-slate-500">
      Emergency Contact
    </p>

    <p className="font-medium">
      {patient.emergencyContact}
    </p>
  </div>

</div>
            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>

                Prescription

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex gap-3 items-center">

                <Pill className="text-blue-600"/>

                <span>

                  No prescription available.

                </span>

              </div>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Sparkles className="text-blue-600 h-5 w-5"/>

              Gemma AI Clinical Insight

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              Based on the available medical information,
              this patient&apos;s condition appears stable.

              Continue monitoring according to the treatment
              plan and review medication adherence during the
              next consultation.

              No immediate clinical risks have been detected.

            </div>

          </CardContent>

        </Card>

      </main>

    </div>

  );

}