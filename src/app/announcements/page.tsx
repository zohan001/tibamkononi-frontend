'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Pin, AlertTriangle, Package, DollarSign, ClipboardCheck } from 'lucide-react';

const announcements = [
  {
    id: '1',
    title: 'Cholera Outbreak Confirmed — Kibarani Area',
    body: 'All hospitals: activate isolation protocols. Expect increased patient load from Kibarani area.',
    type: 'alert',
    severity: 'critical',
    pinned: true,
    author: 'Dr. Salim Omar',
    authorRole: 'County Health Director',
    date: 'July 20, 2026',
  },
  {
    id: '2',
    title: 'Maternal Health Supplies — Q3 Allocation',
    body: 'The following hospitals will receive maternal health supplies as part of Q3 allocation...',
    type: 'medicine',
    severity: 'info',
    pinned: false,
    author: 'Dr. Salim Omar',
    authorRole: 'County Health Director',
    date: 'Today, 10:00 AM',
    allocations: [
      { hospital: 'Coast General', amount: 'KSh 3.2M' },
      { hospital: 'Mama Ngina', amount: 'KSh 2.8M' },
      { hospital: 'Port Reitz', amount: 'KSh 2.5M' },
    ],
  },
  {
    id: '3',
    title: 'Q3 Facility Reviews — August 10-14',
    body: 'Scheduled facility inspections for Q3. Please ensure all documentation is up to date.',
    type: 'inspection',
    severity: 'warning',
    pinned: false,
    author: 'County Inspectorate',
    authorRole: 'Quality Assurance',
    date: 'July 18, 2026',
    hospitals: ['Likoni PHC', 'Mama Ngina Hospital', 'Coast General Hospital'],
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  alert: <AlertTriangle className="h-4 w-4" />,
  medicine: <Package className="h-4 w-4" />,
  funding: <DollarSign className="h-4 w-4" />,
  inspection: <ClipboardCheck className="h-4 w-4" />,
};

const severityStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? announcements
    : announcements.filter((a) => a.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Megaphone className="h-12 w-12 mx-auto text-slate-400 mb-4" />
        <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-600 mt-2">Mombasa County Health Updates</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="medicine">Medicine</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="inspection">Inspections</TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.map((announcement) => (
          <Card key={announcement.id} className={announcement.severity === 'critical' ? 'border-red-200 bg-red-50/50' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={severityStyles[announcement.severity]}>
                    {typeIcons[announcement.type]}
                    <span className="ml-1 capitalize">{announcement.type}</span>
                  </Badge>
                  {announcement.pinned && (
                    <Badge variant="outline" className="gap-1">
                      <Pin className="h-3 w-3" /> PINNED
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-slate-500">{announcement.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{announcement.title}</h3>
              <p className="text-slate-600 mb-3">{announcement.body}</p>

              {announcement.allocations && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">Targeted Hospitals:</p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.allocations.map((a) => (
                      <Badge key={a.hospital} variant="secondary">
                        {a.hospital} — {a.amount}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {announcement.hospitals && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">Inspection Targets:</p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.hospitals.map((h) => (
                      <Badge key={h} variant="secondary">{h}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 text-sm text-slate-500">
                — {announcement.author}, {announcement.authorRole}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
