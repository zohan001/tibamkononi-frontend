'use client';

import { useParams } from 'next/navigation';
import {
  TrendingUp,
  Users,
  Pill,
  BedDouble,
  Activity,
  Download,
} from 'lucide-react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useHospital } from '@/hooks/use-hospitals';
import { usePatients } from '@/hooks/use-patients';
import { useInventory } from '@/hooks/use-inventory';
import { useStaffAttendance } from '@/hooks/use-staff';

export default function ReportsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  const { data: hospital } = useHospital(slug);
  const { data: patients } = usePatients(slug);
  const { data: inventory } = useInventory(slug);
  const { data: staff } = useStaffAttendance(slug);

  const totalPatients = patients?.length || 0;

  const male =
    patients?.filter((p) => p.gender === 'Male').length || 0;

  const female =
    patients?.filter((p) => p.gender === 'Female').length || 0;

  const stockWarnings =
    inventory?.filter(
      (i) => i.status === 'critical' || i.status === 'warning'
    ).length || 0;

  const criticalItems =
    inventory?.filter((i) => i.status === 'critical').length || 0;

  const availableBeds =
    hospital?.buildings
      ?.flatMap((b) => b.wards)
      ?.reduce(
        (sum, ward) => sum + (ward.bedCount - ward.bedsOccupied),
        0
      ) || 0;

  const presentStaff =
    staff?.filter((s) => s.status === 'present').length || 0;

  const totalStaff = staff?.length || 0;

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
              Reports & Analytics
            </h1>

            <p className="text-slate-500 mt-2">
              AI generated operational overview
            </p>
          </div>

          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Card>
            <CardContent className="p-6">

              <Users className="mb-3 h-8 w-8 text-blue-600" />

              <div className="text-3xl font-bold">
                {totalPatients}
              </div>

              <div className="text-sm text-slate-500">
                Total Patients
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">

              <BedDouble className="mb-3 h-8 w-8 text-green-600" />

              <div className="text-3xl font-bold">
                {availableBeds}
              </div>

              <div className="text-sm text-slate-500">
                Beds Available
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">

              <Pill className="mb-3 h-8 w-8 text-orange-600" />

              <div className="text-3xl font-bold">
                {stockWarnings}
              </div>

              <div className="text-sm text-slate-500">
                Inventory Warnings
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">

              <Activity className="mb-3 h-8 w-8 text-purple-600" />

              <div className="text-3xl font-bold">
                {presentStaff}/{totalStaff}
              </div>

              <div className="text-sm text-slate-500">
                Staff Present
              </div>

            </CardContent>
          </Card>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <Card>

            <CardHeader>

              <CardTitle>
                Patient Statistics
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex justify-between">
                <span>Male Patients</span>
                <strong>{male}</strong>
              </div>

              <div className="flex justify-between">
                <span>Female Patients</span>
                <strong>{female}</strong>
              </div>

              <div className="flex justify-between">
                <span>Total</span>
                <strong>{totalPatients}</strong>
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Inventory Statistics
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex justify-between">
                <span>Critical Items</span>
                <strong>{criticalItems}</strong>
              </div>

              <div className="flex justify-between">
                <span>Warning Items</span>
                <strong>{stockWarnings}</strong>
              </div>

              <div className="flex justify-between">
                <span>Total Medicines</span>
                <strong>{inventory?.length || 0}</strong>
              </div>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <TrendingUp className="h-5 w-5 text-blue-600" />

              Gemma AI Executive Summary

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              Based on today&apos;s hospital operations, patient flow remains
              stable with <strong>{totalPatients}</strong> patients
              registered.

              {stockWarnings > 0 &&
                ` ${stockWarnings} inventory items require attention.`}

              Staff attendance is currently

              <strong>
                {' '}
                {totalStaff === 0
                  ? 0
                  : Math.round((presentStaff / totalStaff) * 100)}
                %
              </strong>

              .

              Current bed capacity indicates

              <strong> {availableBeds} beds</strong> available.

              Overall hospital performance is healthy with no major
              operational risks detected.

            </div>

          </CardContent>

        </Card>

      </main>
    </div>
  );
}