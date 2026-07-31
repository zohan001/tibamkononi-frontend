'use client';

import { ArrowLeft, Brain, MapPin, Phone, Building2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useHospital } from '@/hooks/use-hospitals';
import { BedGrid } from '@/components/hospital/bed-grid';
import { InventoryAnalytics } from '@/components/county/inventory-analytics';

export default function CountyHospitalDetailsPage() {
  const params = useParams();
  const hospitalSlug = params.hospitalSlug as string;
  const { data: hospital, isLoading } = useHospital(hospitalSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const wards = (hospital?.buildings ?? []).flatMap((b) =>
    b.wards.map((w) => ({
      name: w.name,
      bedCount: w.bedCount,
      bedsOccupied: w.bedsOccupied,
      status: w.bedsOccupied / w.bedCount > 0.9 ? 'critical' : w.bedsOccupied / w.bedCount > 0.7 ? 'warning' : 'normal',
    }))
  );

  const inventoryItems = (hospital?.buildings ?? [])
    .flatMap((b) => b.wards)
    .flatMap((w) => {
      const items = [];
      if (w.type === 'Pharmacy') {
        items.push({
          name: `${w.name} Supplies`,
          stock: Math.max(0, w.bedCount - w.bedsOccupied),
          minRequired: w.bedCount,
          expiryDays: 60,
          category: 'General',
        });
      }
      return items;
    });
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl p-8">

        <Link
          href="/county"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to County Dashboard
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* LEFT */}

          <Card>

            <CardContent className="p-8">

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <Building2 className="h-10 w-10 text-blue-600" />

                    <div>

                      <h1 className="text-4xl font-bold">

                        {hospital?.name ?? 'Hospital'}

                      </h1>

                      <p className="mt-2 text-slate-500">

                        {hospital?.type ?? 'Hospital'}

                      </p>

                    </div>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">

                    <div className="flex items-center gap-2">

                      <MapPin className="h-4 w-4" />

                      {hospital?.physicalAddress ?? 'Mombasa County'}

                    </div>

                    <div className="flex items-center gap-2">

                      <Phone className="h-4 w-4" />

                      {hospital?.contactPhone ?? '+254 000 000 000'}

                    </div>

                  </div>

                </div>

                <Badge className={hospital?.status === 'approved' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>

                  {hospital?.status?.toUpperCase() ?? 'ACTIVE'}

                </Badge>

              </div>

            </CardContent>

          </Card>

          {/* RIGHT */}

          <Card>

            <CardContent className="p-8 text-center">

              <p className="text-sm text-slate-500">

                County Health Score

              </p>

              <div className="mt-3 text-6xl font-bold text-yellow-600">

                72

              </div>

              <p className="mt-2 text-slate-500">

                out of 100

              </p>

              <Button className="mt-8 w-full">

                View Full AI Report

              </Button>

            </CardContent>

          </Card>

        </div>

        {/* AI SUMMARY */}

        <Card className="mt-8">

          <CardContent className="p-8">

            <div className="flex items-center gap-3">

              <Brain className="h-6 w-6 text-blue-600" />

              <h2 className="text-2xl font-bold">

                Today&apos;s AI Summary

              </h2>

            </div>

            <div className="mt-6 rounded-xl bg-blue-50 p-6 leading-8">

              Gemma AI has analyzed the hospital&apos;s inventory, patient flow,
              staffing, and historical trends.

              <br /><br />

              • Amoxicillin is projected to run out within 24 hours.

              <br />

              • Bed occupancy is currently at 91%.

              <br />

              • One distress signal is still unresolved.

              <br />

              • Emergency transfer from Coast General is recommended.

              <br />

              • Overall performance improved by 6% compared to last week.

            </div>

          </CardContent>

        </Card>

        {/* BED OCCUPANCY */}
        {wards.length > 0 && (
          <div className="mt-8">
            <BedGrid wards={wards} />
          </div>
        )}

        {/* INVENTORY INTELLIGENCE */}
        <div className="mt-8">
          <InventoryAnalytics items={inventoryItems} />
        </div>

      </div>

    </div>
  );
}