'use client';

import { useParams } from 'next/navigation';

import {
  AlertTriangle,
  Activity,
  ShieldAlert,
  Package,
  Sparkles,
  Loader2,
} from 'lucide-react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';

import { DistressSignal } from '@/components/hospital/distress-signal';

import { useInventory } from '@/hooks/use-inventory';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

export default function DistressPage() {

  const params = useParams();

  const slug = params.hospitalSlug as string;

  const { data: inventory, isLoading } = useInventory(slug);

  const criticalItems = (inventory || [])
    .filter((i) => i.status === 'critical')
    .map((i) => ({
      id: i.id,
      name: i.name,
      currentStock: i.currentStock,
    }));

  const warningItems = (inventory || []).filter(
    (i) => i.status === 'warning'
  );

  const healthyItems = (inventory || []).filter(
  (i) => i.status === 'ok'
);

  return (

    <div className="flex min-h-[calc(100vh-200px)]">

      <HospitalSidebar
        hospitalSlug={slug}
        hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      />

      <main className="flex-1 p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">

              Supply Distress Command Center

            </h1>

            <p className="text-slate-500 mt-2">

              AI monitoring of medicine shortages and emergency supply risks.

            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm text-center">

            <div className="text-xs text-slate-500">

              Supply Health

            </div>

            <div className="text-4xl font-bold text-emerald-600">

              {Math.max(
                0,
                100 - criticalItems.length * 12 - warningItems.length * 4
              )}
              %

            </div>

            <div className="text-xs text-emerald-600">

              Inventory Status

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <Card>

            <CardContent className="p-6">

              <Package className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="text-sm text-slate-500">

                Total Items

              </div>

              <div className="text-4xl font-bold mt-2">

                {inventory?.length || 0}

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <ShieldAlert className="h-8 w-8 text-red-600 mb-3"/>

              <div className="text-sm text-slate-500">

                Critical

              </div>

              <div className="text-4xl font-bold mt-2">

                {criticalItems.length}

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <AlertTriangle className="h-8 w-8 text-yellow-500 mb-3"/>

              <div className="text-sm text-slate-500">

                Warning

              </div>

              <div className="text-4xl font-bold mt-2">

                {warningItems.length}

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Activity className="h-8 w-8 text-green-600 mb-3"/>

              <div className="text-sm text-slate-500">

                Healthy

              </div>

              <div className="text-4xl font-bold mt-2">

                {healthyItems.length}

              </div>

            </CardContent>

          </Card>

        </div>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-blue-600"/>

              Today&apos;s AI Supply Summary

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              • {criticalItems.length} medicine(s) require immediate attention.

              <br/>

              • {warningItems.length} medicine(s) are approaching minimum stock.

              <br/>

              • Inventory monitoring indicates stable hospital operations.

              <br/>

              • Recommend initiating transfers before stock depletion.

              <br/>

              • Continue daily monitoring of emergency medicines.

            </div>

          </CardContent>

        </Card>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle>

              Live Distress Monitor

            </CardTitle>

          </CardHeader>

          <CardContent>

            {isLoading ? (

              <div className="flex justify-center py-12">

                <Loader2 className="h-8 w-8 animate-spin text-slate-400"/>

              </div>

            ) : (

              <DistressSignal criticalItems={criticalItems} />

            )}

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>

              Critical Medicine Watchlist

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {criticalItems.length > 0 ? (

                criticalItems.map(item => (

                  <div
                    key={item.id}
                    className="rounded-xl border p-5 flex justify-between items-center hover:bg-slate-50 transition"
                  >

                    <div>

                      <div className="font-semibold text-lg">

                        {item.name}

                      </div>

                      <div className="text-sm text-slate-500">

                        Remaining Stock: {item.currentStock}

                      </div>

                    </div>

                    <Badge variant="destructive">

                      Immediate Action

                    </Badge>

                  </div>

                ))

              ) : (

                <div className="py-12 text-center text-slate-500">

                  No active distress signals.

                </div>

              )}

            </div>

          </CardContent>

        </Card>

      </main>

    </div>

  );

}