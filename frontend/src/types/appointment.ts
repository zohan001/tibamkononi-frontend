export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  hospitalSlug: string;
  hospitalName: string;
  department: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  nhifNumber?: string;
  reason: string;
  createdAt: string;
}

export interface BookingRequest {
  hospitalSlug: string;
  department: string;
  doctorName: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  nhifNumber?: string;
  reason: string;
}

export interface TimeSlot {
  time: string;
  doctor: string;
  available: boolean;
  gemmaTip?: string;
}

export interface Department {
  name: string;
  icon: string;
  description: string;
}
