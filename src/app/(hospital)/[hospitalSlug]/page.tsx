'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Bed, Users, AlertTriangle } from 'lucide-react';
import { GemmaBadge } from '@/components/shared/gemma-badge';

export default function HospitalDashboardPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  const stats = [
    { label: "Today's Patients", value: '87', icon: Activity, color: 'text-blue-500' },
    { label: 'Beds Available', value: '12', icon: Bed, color: 'text-green-500' },
    { label: 'Staff Present', value: '28/32', icon: Users, color: 'text-purple-500' },
    { label: 'Stock Warnings', value: '3', icon: AlertTriangle, color: 'text-yellow-500' },
  ];

  const criticalAlerts = [
    'Amoxicillin stock-out in 8 hours',
    'Maternity ward full',
  ];

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        {/* Alert Banner */}
        {criticalAlerts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="font-medium text-red-700">Critical Alerts</span>
            </div>
            <ul className="space-y-1">
              {criticalAlerts.map((alert, i) => (
                <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Patients & Stock Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Fatuma Juma', age: 34, diagnosis: 'Malaria' },
                  { name: 'Ali Hassan', age: 12, diagnosis: 'Typhoid' },
                  { name: 'Mwende Kaingu', age: 28, diagnosis: 'Prenatal' },
                  { name: 'John Ochieng', age: 45, diagnosis: 'Hypertension' },
                  { name: 'Amina Bakari', age: 8, diagnosis: 'URTI' },
                ].map((patient, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-slate-500">Age {patient.age}</p>
                    </div>
                    <Badge variant="secondary">{patient.diagnosis}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Amoxicillin Paediatric', stock: 12, status: 'critical' },
                  { name: 'ACT Malaria', stock: 144, status: 'warning' },
                  { name: 'Paracetamol', stock: 2500, status: 'ok' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.stock} units left</p>
                    </div>
                    <Badge className={item.status === 'critical' ? 'bg-red-100 text-red-700' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gemma Daily Summary */}
        <Card className="mt-6 border-blue-100 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Daily Summary</h3>
                <GemmaBadge className="text-xs" />
              </div>
            </div>
            <p className="text-sm text-slate-700">
              Today you treated <strong>87 patients</strong>. 3 stock warnings detected. Amoxicillin Paediatric critically low — restocking recommended within 8 hours. Maternity ward at capacity. Staff attendance at 87.5%.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
