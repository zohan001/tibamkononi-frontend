export interface Hospital {
  id: string;
  name: string;
  slug: string;
  licenseNumber: string;
  type: 'PHC' | 'CHC' | 'District' | 'Private';
  county: string;
  subCounty: string;
  ward: string;
  physicalAddress: string;
  latitude: number;
  longitude: number;
  contactPhone: string;
  email: string;
  buildings: Building[];
  amenities: Amenity[];
  status: 'pending' | 'approved' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: string;
  name: string;
  floors: number;
  wards: Ward[];
}

export interface Ward {
  id: string;
  name: string;
  bedCount: number;
  type: 'General' | 'Maternity' | 'ICU' | 'Paediatric' | 'Surgical' | 'Isolation' | 'Theatre' | 'Laboratory' | 'Pharmacy' | 'Radiology';
  bedsOccupied: number;
}

export type Amenity = 'Operating Theatre' | 'Laboratory' | 'Pharmacy' | 'X-Ray' | 'Ultrasound' | 'CT Scan' | 'MRI' | 'ICU' | 'Ambulance' | 'Blood Bank' | 'Dialysis';

export interface HospitalDashboard {
  todayPatients: number;
  bedsAvailable: number;
  staffPresent: number;
  staffTotal: number;
  stockWarnings: number;
  criticalAlerts: Alert[];
  recentPatients: PatientSummary[];
  stockAlerts: StockAlert[];
  dailySummary: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export interface PatientSummary {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  registeredAt: string;
}

export interface StockAlert {
  medicine: string;
  currentStock: number;
  dailyUsage: number;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'ok';
}
