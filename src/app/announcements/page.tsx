'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Pin, AlertTriangle, Package, DollarSign, ClipboardCheck, Loader2 } from 'lucide-react';
import { useAnnouncements } from '@/hooks/use-announcements';

const typeIcons: Record<string, React.ReactNode> = {
  alert: <AlertTriangle className="h-4 w-4" />,
  medicine: <Package className="h-4 w-4" />,
  funding: <DollarSign className="h-4 w-4" />,
  inspection: <ClipboardCheck className="h-4 w-4" />,
  general: <Megaphone className="h-4 w-4" />,
};

const severityStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const { data: announcements, isLoading, error } = useAnnouncements();

  const filtered = activeTab === 'all'
    ? (announcements || [])
    : (announcements || []).filter((a) => a.type === activeTab);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading announcements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <p className="text-lg text-red-600">Failed to load announcements</p>
          <p className="text-sm text-slate-500 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

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
                <span className="text-sm text-slate-500">{new Date(announcement.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{announcement.title}</h3>
              <p className="text-slate-600 mb-3">{announcement.body}</p>

              {announcement.targetedHospitals && announcement.targetedHospitals.length > 0 && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">Targeted Hospitals:</p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.targetedHospitals.map((h) => (
                      <Badge key={h.name} variant="secondary">
                        {h.name}{h.allocation ? ` — ${h.allocation}` : ''}
                      </Badge>
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
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No announcements found</p>
          </div>
        )}
      </div>
    </div>
  );
}
