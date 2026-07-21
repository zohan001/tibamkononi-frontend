'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { DistressSignal } from '@/components/hospital/distress-signal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default function DistressPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Distress Signals</h1>

        <div className="mb-8">
          <DistressSignal />
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
              {[
                { date: 'Jul 18, 2026', message: 'Amoxicillin critical — 12 bottles left', status: 'sent', response: 'KEMSA notified, delivery scheduled Jul 19' },
                { date: 'Jul 12, 2026', message: 'ICU beds full — transfer needed', status: 'acknowledged', response: 'Coast General accepting transfers' },
              ].map((signal, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{signal.message}</p>
                    <p className="text-xs text-slate-500">{signal.date}</p>
                    <p className="text-xs text-green-600 mt-1">{signal.response}</p>
                  </div>
                  <Badge variant={signal.status === 'sent' ? 'default' : 'secondary'}>{signal.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
