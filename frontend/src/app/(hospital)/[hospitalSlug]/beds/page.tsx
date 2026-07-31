'use client';

import { useParams } from 'next/navigation';

import {
  Bed,
  Activity,
  AlertTriangle,
  Building2,
  Sparkles,
} from 'lucide-react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';

import { BedGrid } from '@/components/hospital/bed-grid';
import { MedicineChart } from '@/components/hospital/medicine-chart';

import { useHospital } from '@/hooks/use-hospitals';
import { useInventory } from '@/hooks/use-inventory';

import { Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function BedsPage() {
  const params = useParams();

  const slug = params.hospitalSlug as string;

  const { data: hospital, isLoading } = useHospital(slug);
  const { data: inventory } = useInventory(slug);

  const wards = (hospital?.buildings || []).flatMap((b) =>
    b.wards.map((w) => ({
      id: w.id,
      name: w.name,
      bedCount: w.bedCount,
      bedsOccupied: w.bedsOccupied,
      type: w.type,
    }))
  );

  const totalBeds = wards.reduce((sum, ward) => sum + ward.bedCount, 0);

  const occupiedBeds = wards.reduce(
    (sum, ward) => sum + ward.bedsOccupied,
    0
  );

  const availableBeds = totalBeds - occupiedBeds;

  const occupancy =
    totalBeds === 0
      ? 0
      : Math.round((occupiedBeds / totalBeds) * 100);

  const medicineData = (inventory || [])
    .filter((i) => i.category === 'Medicines')
    .map((i) => ({
      name: i.name,
      stock: i.currentStock,
      used: i.dailyUsage * 30,
      category: i.category,
      expiryDays: i.expiryDate
        ? Math.max(0, Math.round((new Date(i.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : undefined,
    }));

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">

        <HospitalSidebar
          hospitalSlug={slug}
          hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        />

        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">

      <HospitalSidebar
        hospitalSlug={slug}
        hospitalName={
          hospital?.name ||
          slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        }
      />

      <main className="flex-1 p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Bed Management Command Center
            </h1>

            <p className="text-slate-500 mt-2">
              Live hospital capacity and occupancy monitoring.
            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm text-center">

            <div className="text-xs text-slate-500">
              Capacity Score
            </div>

            <div className="text-4xl font-bold text-emerald-600">
              {100 - occupancy}%
            </div>

            <div className="text-xs text-emerald-600">
              Capacity Available
            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <Card>

            <CardContent className="p-6">

              <Bed className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Total Beds
              </div>

              <div className="text-4xl font-bold mt-2">
                {totalBeds}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Activity className="h-8 w-8 text-red-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Occupied
              </div>

              <div className="text-4xl font-bold mt-2">
                {occupiedBeds}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Building2 className="h-8 w-8 text-green-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Available
              </div>

              <div className="text-4xl font-bold mt-2">
                {availableBeds}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <AlertTriangle className="h-8 w-8 text-orange-500 mb-3"/>

              <div className="text-sm text-slate-500">
                Occupancy
              </div>

              <div className="text-4xl font-bold mt-2">
                {occupancy}%
              </div>

            </CardContent>

          </Card>

        </div>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-blue-600"/>

              Today&apos;s AI Capacity Summary

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              • Hospital occupancy is currently <strong>{occupancy}%</strong>.

              <br/>

              • <strong>{availableBeds}</strong> beds remain available.

              <br/>

              • Current capacity is sufficient for emergency admissions.

              <br/>

              • Continue monitoring ICU and Emergency ward occupancy.

              <br/>

              • No immediate overcrowding risk detected.

            </div>

          </CardContent>

        </Card>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle>

              Ward Occupancy

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-5">

              {wards.map((ward) => {

                const percent = Math.round(
                  (ward.bedsOccupied / ward.bedCount) * 100
                );

                return (

                  <div key={ward.id}>

                    <div className="flex justify-between mb-2">

                      <div>

                        <div className="font-semibold">

                          {ward.name}

                        </div>

                        <div className="text-sm text-slate-500">

                          {ward.type}

                        </div>

                      </div>

                      <div className="text-sm font-medium">

                        {ward.bedsOccupied}/{ward.bedCount}

                      </div>

                    </div>

                    <div className="h-3 rounded-full bg-slate-200">

                      <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{ width: `${percent}%` }}
                      />

                    </div>

                  </div>

                );

              })}

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>

              Live Bed Layout

            </CardTitle>

          </CardHeader>

          <CardContent>

            {wards.length > 0 ? (
              <BedGrid wards={wards} />
            ) : (
              <div className="py-16 text-center text-slate-500">
                No ward data available.
              </div>
            )}

          </CardContent>

        </Card>

        <div className="mb-8">
          <MedicineChart medicines={medicineData.length > 0 ? medicineData : undefined} />
        </div>

      </main>

    </div>
  );
}