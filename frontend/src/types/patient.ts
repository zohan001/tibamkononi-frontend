export interface Patient {
  id: string;
  fullName: string;
  idNumber: string;
  nhifNumber?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  emergencyContact: string;
  hospitalSlug: string;
  registeredAt: string;
}

export interface PatientRegistration {
  fullName: string;
  idNumber: string;
  nhifNumber?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  emergencyContact: string;
  symptoms: string;
  symptomVoiceRecording?: Blob;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  diseases: DiseaseProbability[];
  recommendedTests: string[];
  recommendedTreatment: TreatmentItem[];
  doctorConfirmation?: string;
  attendingDoctor?: string;
  createdAt: string;
}

export interface DiseaseProbability {
  name: string;
  probability: number;
}

export interface TreatmentItem {
  medicine: string;
  dosage: string;
  frequency: string;
  stockAvailable: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  medicines: PrescribedMedicine[];
  notes: string;
  prescribedBy: string;
  prescribedAt: string;
}

export interface PrescribedMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
}
