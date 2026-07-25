'use client';

import { useParams } from 'next/navigation';
import {
  Package,
  AlertTriangle,
  Pill,
  TrendingDown,
  Search,
  Download,
} from 'lucide-react';

import { useState } from 'react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { useHospital } from '@/hooks/use-hospitals';
import { useInventory } from '@/hooks/use-inventory';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function InventoryPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  const { data: hospital } = useHospital(slug);
  const { data: inventory } = useInventory(slug);

  const [search, setSearch] = useState('');

  const medicines =
    inventory?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const critical =
    medicines.filter((m) => m.status === 'critical').length;

  const warning =
    medicines.filter((m) => m.status === 'warning').length;

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
              Pharmacy & Inventory
            </h1>

            <p className="text-slate-500 mt-2">
              Live medicine stock monitoring powered by AI
            </p>

          </div>

          <Button>
            <Download className="mr-2 h-4 w-4"/>
            Export Inventory
          </Button>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <Card>

            <CardContent className="p-6">

              <Package className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="text-3xl font-bold">
                {medicines.length}
              </div>

              <div className="text-sm text-slate-500">
                Total Medicines
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <AlertTriangle className="h-8 w-8 text-red-600 mb-3"/>

              <div className="text-3xl font-bold">
                {critical}
              </div>

              <div className="text-sm text-slate-500">
                Critical Stock
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <TrendingDown className="h-8 w-8 text-orange-600 mb-3"/>

              <div className="text-3xl font-bold">
                {warning}
              </div>

              <div className="text-sm text-slate-500">
                Low Stock
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Pill className="h-8 w-8 text-green-600 mb-3"/>

              <div className="text-3xl font-bold">
                {medicines.reduce(
                  (sum, item) => sum + item.currentStock,
                  0
                )}
              </div>

              <div className="text-sm text-slate-500">
                Units Available
              </div>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardHeader>

            <CardTitle>
              Search Medicine
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="relative">

              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400"/>

              <Input
                placeholder="Search medicine..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="pl-10"
              />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              Inventory
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {medicines.map((medicine)=>(
                <div
                  key={medicine.id}
                  className="flex items-center justify-between border rounded-xl p-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {medicine.name}
                    </h3>

                    <p className="text-sm text-slate-500">

                      {medicine.currentStock} {medicine.unit}

                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <Badge
                      className={
                        medicine.status === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : medicine.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }
                    >
                      {medicine.status}
                    </Badge>

                    <span className="text-sm text-slate-500">
                      {medicine.daysRemaining} days left
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              AI Pharmacy Recommendation
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              Gemma analyzed the pharmacy inventory and recommends
              redistributing medicine between nearby hospitals before
              placing emergency orders. Priority should be given to
              medicines marked as <strong>Critical</strong> to avoid
              treatment delays.

            </div>

          </CardContent>

        </Card>

      </main>

    </div>
  );
}