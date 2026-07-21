'use client'

import { useState } from 'react'
import { UserCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

interface StaffMember {
  id: string
  name: string
  role: string
  status: 'present' | 'absent' | 'late' | 'on-leave'
}

const statusConfig: Record<StaffMember['status'], { label: string; className: string }> = {
  present: { label: 'Present', className: 'bg-emerald-500 hover:bg-emerald-600' },
  absent: { label: 'Absent', className: 'bg-red-500 hover:bg-red-600' },
  late: { label: 'Late', className: 'bg-amber-500 hover:bg-amber-600' },
  'on-leave': { label: 'On Leave', className: 'bg-slate-500 hover:bg-slate-600' },
}

export function StaffAttendance({ staff }: { staff: StaffMember[] }) {
  const [attendance, setAttendance] = useState<Record<string, StaffMember['status']>>(
    Object.fromEntries(staff.map((s) => [s.id, s.status]))
  )

  const updateStatus = (id: string, status: StaffMember['status']) => {
    setAttendance((prev) => ({ ...prev, [id]: status }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Staff Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => {
            const currentStatus = attendance[member.id]
            return (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>

                <Select
                  value={currentStatus}
                  onValueChange={(val) =>
                    updateStatus(member.id, val as StaffMember['status'])
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <Badge className={statusConfig[currentStatus].className}>
                      {statusConfig[currentStatus].label}
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
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
