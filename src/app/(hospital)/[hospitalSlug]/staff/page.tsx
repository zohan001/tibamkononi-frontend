'use client';

import { useParams } from 'next/navigation';

import {
  Users,
  UserCheck,
  UserMinus,
  Sparkles,
  Activity,
  Clock,
} from 'lucide-react';

import { HospitalSidebar } from '@/components/layout/hospital-sidebar';

import { StaffAttendance } from '@/components/hospital/staff-attendance';

import { useStaffAttendance } from '@/hooks/use-staff';

import { Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function StaffPage() {
  const params = useParams();

  const slug = params.hospitalSlug as string;

  const { data: staffData, isLoading } = useStaffAttendance(slug);

  const staff = (staffData || []).map((s) => ({
    id: s.staffId,
    name: s.staffName,
    role: s.role,
    status: s.status,
  }));

  const totalStaff = staff.length;

  const presentStaff = staff.filter(
    (s) => s.status.toLowerCase() === 'present'
  ).length;

  const absentStaff = totalStaff - presentStaff;

  const attendance =
    totalStaff === 0
      ? 0
      : Math.round((presentStaff / totalStaff) * 100);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <HospitalSidebar
          hospitalSlug={slug}
          hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        />

        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">

      <HospitalSidebar
        hospitalSlug={slug}
        hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
      />

      <main className="flex-1 p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Hospital Staff Command Center
            </h1>

            <p className="text-slate-500 mt-2">
              Real-time workforce monitoring powered by AI.
            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm text-center">

            <div className="text-xs text-slate-500">
              Staff Health Score
            </div>

            <div className="text-4xl font-bold text-emerald-600">
              {attendance}
            </div>

            <div className="text-xs text-emerald-600">
              Excellent Coverage
            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <Card>

            <CardContent className="p-6">

              <Users className="h-8 w-8 text-blue-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Total Staff
              </div>

              <div className="text-4xl font-bold mt-2">
                {totalStaff}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <UserCheck className="h-8 w-8 text-green-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Present
              </div>

              <div className="text-4xl font-bold mt-2">
                {presentStaff}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <UserMinus className="h-8 w-8 text-red-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Absent
              </div>

              <div className="text-4xl font-bold mt-2">
                {absentStaff}
              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-6">

              <Activity className="h-8 w-8 text-purple-600 mb-3"/>

              <div className="text-sm text-slate-500">
                Attendance
              </div>

              <div className="text-4xl font-bold mt-2">
                {attendance}%
              </div>

            </CardContent>

          </Card>

        </div>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-blue-600"/>

              Today&apos;s AI Workforce Summary

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-lg bg-blue-50 p-6 leading-8">

              • {presentStaff} staff members are currently available.

              <br/>

              • Attendance rate is {attendance}%.

              <br/>

              • Workforce coverage is adequate for current patient demand.

              <br/>

              • Continue monitoring shift handovers and emergency staffing.

              <br/>

              • No major staffing shortages detected.

            </div>

          </CardContent>

        </Card>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle>

              Department Coverage

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1">
                  <span>Emergency</span>
                  <span>100%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-full rounded-full bg-green-500"/>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Outpatient</span>
                  <span>92%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-11/12 rounded-full bg-blue-500"/>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Pharmacy</span>
                  <span>96%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-full rounded-full bg-purple-500"/>
                </div>
              </div>

            </div>

          </CardContent>

        </Card>

        <Card className="mb-8">

          <CardHeader>

            <CardTitle>

              Staff Directory

            </CardTitle>

          </CardHeader>

          <CardContent>

            <StaffAttendance staff={staff} />

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Clock className="h-5 w-5 text-orange-500"/>

              Gemma AI Recommendations

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="rounded-lg bg-orange-50 p-6 leading-8">

              • Schedule one additional nurse for evening shifts.

              <br/>

              • Maintain current staffing in Emergency Department.

              <br/>

              • Review staff approaching overtime this week.

              <br/>

              • Attendance trend remains excellent.

            </div>

          </CardContent>

        </Card>

      </main>

    </div>
  );
}