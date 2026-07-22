'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { DistressSignal } from '@/components/hospital/distress-signal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useInventory } from '@/hooks/use-inventory';

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

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Distress Signals</h1>

        <div className="mb-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <DistressSignal criticalItems={criticalItems} />
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Recent Distress Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalItems.length > 0 ? (
                criticalItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{item.name} — {item.currentStock} remaining</p>
                      <p className="text-xs text-slate-500">Critical stock level detected</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No distress signals</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
