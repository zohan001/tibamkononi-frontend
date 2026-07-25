'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Bed, Users, AlertTriangle, Loader2 } from 'lucide-react';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { useHospital } from '@/hooks/use-hospitals';
import { usePatients } from '@/hooks/use-patients';
import { useInventory } from '@/hooks/use-inventory';
import { useStaffAttendance } from '@/hooks/use-staff';
import { AIInsightsPanel } from '@/components/hospital/ai-insights-panel';
import { LiveActivity } from '@/components/hospital/live-activity';
import { PerformanceScore } from '@/components/hospital/performance-score';
import { HospitalAICommandCenter } from '@/components/hospital/hospital-ai-command-center';
import { QuickActions } from '@/components/hospital/quick-actions';
import { SystemStatus } from '@/components/hospital/system-status';
import { PatientRiskMonitor } from '@/components/hospital/patient-risk-monitor';
import { BedManagementCenter } from '@/components/hospital/bed-management-center';
import { DoctorWorkloadMonitor } from '@/components/hospital/doctor-workload-monitor';
import { BedGrid } from '@/components/hospital/bed-grid';
import { StaffAttendance } from '@/components/hospital/staff-attendance';
import { MedicineChart } from '@/components/hospital/medicine-chart';
import { AnalyticsCards } from '@/components/hospital/analytics-cards';

export default function HospitalDashboardPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  const { data: hospital, isLoading: hospitalLoading } = useHospital(slug);
  const { data: patients, isLoading: patientsLoading } = usePatients(slug);
  const { data: inventory, isLoading: inventoryLoading } = useInventory(slug);
  const { data: staffAttendance, isLoading: staffLoading } = useStaffAttendance(slug);

  const isLoading = hospitalLoading || patientsLoading || inventoryLoading || staffLoading;

  const presentCount = (staffAttendance || []).filter((s) => s.status === 'present').length;
  const totalStaff = staffAttendance?.length || 0;
  const stockWarnings = (inventory || []).filter((i) => i.status === 'critical' || i.status === 'warning').length;
  const bedsAvailable = (hospital?.buildings || []).flatMap((b) => b.wards).reduce((sum, w) => sum + (w.bedCount - w.bedsOccupied), 0);
  const criticalAlerts = (inventory || []).filter((i) => i.status === 'critical').map((i) => `${i.name} stock-out in ${i.daysRemaining} days`);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Today's Patients", value: String((patients || []).length), icon: Activity, color: 'text-blue-500' },
    { label: 'Beds Available', value: String(bedsAvailable), icon: Bed, color: 'text-green-500' },
    { label: 'Staff Present', value: `${presentCount}/${totalStaff}`, icon: Users, color: 'text-purple-500' },
    { label: 'Stock Warnings', value: String(stockWarnings), icon: AlertTriangle, color: 'text-yellow-500' },
  ];

  const wards = (hospital?.buildings || []).flatMap((b) =>
    b.wards.map((w) => ({ name: w.name, bedCount: w.bedCount, bedsOccupied: w.bedsOccupied }))
  );

  const medicineData = (inventory || [])
    .filter((i) => i.category === 'Medicines')
    .map((i) => ({
      name: i.name,
      stock: i.currentStock,
      used: i.dailyUsage * 30,
      category: i.category,
      expiryDays: i.expiryDate
        ? Math.max(0, Math.round((new Date(i.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : undefined,
    }));

  const mappedStaff = (staffAttendance || []).map((s) => ({
    id: s.staffId,
    name: s.staffName,
    role: s.role,
    status: s.status,
    clockIn: s.checkInTime,
  }));

  const analyticsCards = [
    {
      label: 'Total Patients',
      value: (patients || []).length,
      icon: <Activity className="h-5 w-5" />,
      trend: 'up' as const,
      change: `+${(patients || []).length}`,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Beds Available',
      value: bedsAvailable,
      icon: <Bed className="h-5 w-5" />,
      trend: 'neutral' as const,
      change: '0%',
      color: 'from-emerald-500 to-green-600',
    },
    {
      label: 'Staff on Duty',
      value: presentCount,
      icon: <Users className="h-5 w-5" />,
      trend: 'neutral' as const,
      change: `${totalStaff} total`,
      color: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Stock Warnings',
      value: stockWarnings,
      icon: <AlertTriangle className="h-5 w-5" />,
      trend: stockWarnings > 0 ? 'down' as const : 'up' as const,
      change: stockWarnings > 0 ? `${stockWarnings} items` : 'All clear',
      color: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Staff Attendance',
      value: totalStaff > 0 ? `${Math.round((presentCount / totalStaff) * 100)}%` : '0%',
      icon: <Users className="h-5 w-5" />,
      trend: 'up' as const,
      change: `${presentCount}/${totalStaff}`,
      color: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={hospital?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <HospitalAICommandCenter />
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

        {/* Analytics Cards */}
        <div className="mb-6">
          <AnalyticsCards cards={analyticsCards} />
        </div>

        {/* Bed Grid */}
        <div className="mb-6">
          <BedGrid wards={wards} />
        </div>

        {/* Medicine Chart */}
        <div className="mb-6">
          <MedicineChart medicines={medicineData.length > 0 ? medicineData : undefined} />
        </div>

        {/* Staff Attendance */}
        <div className="mb-6">
          <StaffAttendance staff={mappedStaff.length > 0 ? mappedStaff : undefined} />
        </div>

        {/* AI Insights */}
<div className="grid xl:grid-cols-3 gap-6 mb-6">

  <div className="xl:col-span-2">
    <AIInsightsPanel />
    <HospitalAICommandCenter />
    <PatientRiskMonitor />
    <BedManagementCenter />
    <DoctorWorkloadMonitor />
  </div>

  <PerformanceScore />

</div>

<div className="mb-8">
  <QuickActions hospitalSlug={slug} />
</div>
        {/* Recent Patients & Stock Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(patients || []).slice(0, 5).map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{patient.fullName}</p>
                      <p className="text-xs text-slate-500">Age {patient.age}</p>
                    </div>
                    <Badge variant="secondary">{patient.gender}</Badge>
                  </div>
                ))}
                {(!patients || patients.length === 0) && (
                  <p className="text-sm text-slate-500 text-center py-4">No patients registered yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(inventory || []).slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.currentStock} {item.unit} left</p>
                    </div>
                    <Badge className={item.status === 'critical' ? 'bg-red-100 text-red-700' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
                {(!inventory || inventory.length === 0) && (
                  <p className="text-sm text-slate-500 text-center py-4">No inventory items</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

    <LiveActivity />

    <SystemStatus />

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
              Today you treated <strong>{(patients || []).length} patients</strong>. {stockWarnings} stock warnings detected.
              {criticalAlerts.length > 0 && ` ${criticalAlerts[0]}.`}
              Staff attendance at {totalStaff > 0 ? Math.round((presentCount / totalStaff) * 100) : 0}%.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
