export interface Staff {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Pharmacist' | 'Lab Technician' | 'Administrator' | 'Support';
  department: string;
  phone: string;
  email: string;
  hospitalSlug: string;
  joinedAt: string;
}

export interface StaffAttendance {
  staffId: string;
  staffName: string;
  role: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'late' | 'on-leave';
}

export interface Schedule {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  day: string;
  startTime: string;
  endTime: string;
  department: string;
  available: boolean;
  gemmaNote?: string;
}
