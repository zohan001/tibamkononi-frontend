'use client';

import dynamic from 'next/dynamic';
import { CountySidebar } from '@/components/layout/county-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Loader2 } from 'lucide-react';
import { useAnnouncements } from '@/hooks/use-announcements';

const AnnouncementForm = dynamic(
  () => import('@/components/county/announcement-form').then((m) => m.AnnouncementForm),
  { ssr: false }
);
const FundingAllocation = dynamic(
  () => import('@/components/county/funding-allocation').then((m) => m.FundingAllocation),
  { ssr: false }
);

export default function CountyAnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();

  const fundingAnnouncements = (announcements || []).filter((a) => a.type === 'funding');
  const allocations = fundingAnnouncements.flatMap((a) =>
    (a.targetedHospitals || []).map((h) => ({
      hospitalName: h.name,
      amount: h.allocation ? parseInt(h.allocation.replace(/[^0-9]/g, '')) || 0 : 0,
      percentage: 0,
    }))
  );
  const totalFund = allocations.reduce((sum, a) => sum + a.amount, 0);
  const allocsWithPct = allocations.map((a) => ({
    ...a,
    percentage: totalFund > 0 ? Math.round((a.amount / totalFund) * 1000) / 10 : 0,
  }));

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <CountySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Announcements</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Create New Announcement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnnouncementForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                `This Week's Funding: KSh ${(totalFund || 12000000).toLocaleString()}`
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FundingAllocation allocations={allocsWithPct.length > 0 ? allocsWithPct : []} totalFund={totalFund || 12000000} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
