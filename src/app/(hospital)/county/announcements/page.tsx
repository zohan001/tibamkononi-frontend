'use client';

import dynamic from 'next/dynamic';
import { CountySidebar } from '@/components/layout/county-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';

const AnnouncementForm = dynamic(
  () => import('@/components/county/announcement-form').then((m) => m.AnnouncementForm),
  { ssr: false }
);
const FundingAllocation = dynamic(
  () => import('@/components/county/funding-allocation').then((m) => m.FundingAllocation),
  { ssr: false }
);

const mockAllocations = [
  { hospitalName: 'Coast General Hospital', amount: 3200000, percentage: 26.7 },
  { hospitalName: 'Mama Ngina Hospital', amount: 2800000, percentage: 23.3 },
  { hospitalName: 'Port Reitz Hospital', amount: 2500000, percentage: 20.8 },
  { hospitalName: 'Likoni PHC', amount: 1500000, percentage: 12.5 },
  { hospitalName: 'Changamwe District', amount: 2000000, percentage: 16.7 },
];

export default function CountyAnnouncementsPage() {
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
            <CardTitle>This Week&apos;s Funding: KSh 12,000,000</CardTitle>
          </CardHeader>
          <CardContent>
            <FundingAllocation allocations={mockAllocations} totalFund={12000000} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
