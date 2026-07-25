'use client';

import { useState } from 'react';
import {
  UserCheck,
  Users,
  Clock,
  XCircle,
  CalendarOff,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  status: 'present' | 'absent' | 'late' | 'on-leave';
  clockIn?: string;
}

interface StaffAttendanceProps {
  staff?: StaffMember[];
}

const defaultStaff: StaffMember[] = [
  { id: '1', name: 'Dr. Amina Juma', role: 'Doctor', department: 'Emergency', status: 'present', clockIn: '07:45' },
  { id: '2', name: 'Nurse Grace Mwangi', role: 'Nurse', department: 'ICU', status: 'present', clockIn: '07:50' },
  { id: '3', name: 'Dr. Peter Odhiambo', role: 'Doctor', department: 'Surgery', status: 'late', clockIn: '08:25' },
  { id: '4', name: 'Nurse Fatima Hassan', role: 'Nurse', department: 'Pediatrics', status: 'present', clockIn: '07:55' },
  { id: '5', name: 'Dr. Samuel Kiptoo', role: 'Doctor', department: 'General', status: 'on-leave' },
  { id: '6', name: 'Nurse Alice Wanjiku', role: 'Nurse', department: 'Maternity', status: 'absent' },
  { id: '7', name: 'Lab Tech. Brian Omondi', role: 'Lab Technician', department: 'Laboratory', status: 'present', clockIn: '07:30' },
  { id: '8', name: 'Pharmacist Daisy Chebet', role: 'Pharmacist', department: 'Pharmacy', status: 'present', clockIn: '08:00' },
  { id: '9', name: 'Dr. Irene Njeri', role: 'Doctor', department: 'Radiology', status: 'late', clockIn: '08:30' },
  { id: '10', name: 'Nurse James Otieno', role: 'Nurse', department: 'Emergency', status: 'present', clockIn: '07:40' },
  { id: '11', name: 'Dr. Moses Wafula', role: 'Doctor', department: 'ICU', status: 'present', clockIn: '07:35' },
  { id: '12', name: 'Nurse Sarah Akinyi', role: 'Nurse', department: 'General', status: 'on-leave' },
];

const statusConfig: Record<
  StaffMember['status'],
  { label: string; className: string; icon: typeof UserCheck }
> = {
  present: { label: 'Present', className: 'bg-emerald-500/10 text-emerald-700 border-emerald-200', icon: UserCheck },
  absent: { label: 'Absent', className: 'bg-red-500/10 text-red-700 border-red-200', icon: XCircle },
  late: { label: 'Late', className: 'bg-amber-500/10 text-amber-700 border-amber-200', icon: Clock },
  'on-leave': { label: 'On Leave', className: 'bg-slate-500/10 text-slate-700 border-slate-200', icon: CalendarOff },
};

export function StaffAttendance({ staff = defaultStaff }: StaffAttendanceProps) {
  const [attendance, setAttendance] = useState<Record<string, StaffMember['status']>>(
    Object.fromEntries(staff.map((s) => [s.id, s.status])),
  );

  const updateStatus = (id: string, status: StaffMember['status']) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const counts = {
    present: Object.values(attendance).filter((s) => s === 'present').length,
    absent: Object.values(attendance).filter((s) => s === 'absent').length,
    late: Object.values(attendance).filter((s) => s === 'late').length,
    onLeave: Object.values(attendance).filter((s) => s === 'on-leave').length,
  };

  const groupedByRole = staff.reduce<Record<string, StaffMember[]>>((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {});

  const summaryCards = [
    { label: 'Present', value: counts.present, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Absent', value: counts.absent, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Late', value: counts.late, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'On Leave', value: counts.onLeave, icon: CalendarOff, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Staff Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Track and manage daily staff attendance across departments
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn('rounded-xl p-2.5', card.bg)}>
                  <card.icon className={cn('h-5 w-5', card.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.entries(groupedByRole).map(([role, members]) => (
        <Card key={role} className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-blue-600" />
              {role}s
              <Badge variant="secondary" className="ml-1 text-xs">
                {members.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => {
                const currentStatus = attendance[member.id];
                const config = statusConfig[currentStatus];
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {member.department ?? 'Unassigned'}
                        {member.clockIn && currentStatus !== 'on-leave' && ` · ${member.clockIn}`}
                      </p>
                    </div>

                    <Select
                      value={currentStatus}
                      onValueChange={(val) =>
                        updateStatus(member.id, val as StaffMember['status'])
                      }
                    >
                      <SelectTrigger className="w-[110px] shrink-0">
                        <Badge className={cn('border', config.className)}>
                          {config.label}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Attendance Summary</h4>
              <p className="text-sm text-blue-100 leading-relaxed">
                {counts.present + counts.late} of {staff.length} staff members are on-site today
                ({Math.round(((counts.present + counts.late) / staff.length) * 100)}% attendance rate).
                {counts.absent > 0 && ` ${counts.absent} staff member(s) are absent without notice.`}
                {counts.onLeave > 0 && ` ${counts.onLeave} staff member(s) are on approved leave.`}
                {counts.late > 0 && ` ${counts.late} staff member(s) arrived late — consider follow-up.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
