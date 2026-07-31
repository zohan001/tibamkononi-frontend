import { z } from 'zod';

export const emailSchema = z.string().email('Valid email required').max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  role: z
    .enum(['admin', 'county_admin', 'hospital_admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician'])
    .default('doctor'),
  phone: z.string().optional().default(''),
  hospitalSlug: z.string().optional().nullable().default(null),
});

const wardSchema = z.object({
  name: z.string().min(1, 'Ward name required'),
  type: z.string().min(1, 'Ward type required'),
  bedCount: z.number().int().min(1, 'At least 1 bed'),
  bedsOccupied: z.number().int().min(0).optional().default(0),
});

const buildingSchema = z.object({
  name: z.string().min(1, 'Building name required'),
  floors: z.number().int().min(1).optional().default(1),
  wards: z.array(wardSchema).min(1, 'At least 1 ward required'),
});

const supplierSchema = z.object({
  name: z.string().min(1, 'Supplier name required'),
  contact: z.string().optional().default(''),
  suppliesProvided: z.string().optional().default(''),
});

export const hospitalRegisterSchema = z.object({
  name: z.string().min(2, 'Hospital name is required'),
  licenseNumber: z.string().optional().default(''),
  type: z.enum(['PHC', 'CHC', 'District', 'Private']).default('Private'),
  county: z.string().default('Mombasa'),
  subCounty: z.string().optional().default(''),
  ward: z.string().optional().default(''),
  physicalAddress: z.string().optional().default(''),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  contactPhone: z.string().optional().default(''),
  email: emailSchema.optional().nullable(),
  description: z.string().optional().default(''),
  buildings: z.array(buildingSchema).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  suppliers: z.array(supplierSchema).optional().default([]),
  administrator: z
    .object({
      name: z.string().optional().default(''),
      directorName: z.string().optional().default(''),
      email: emailSchema.optional(),
      phone: z.string().optional().default(''),
    })
    .optional(),
  adminEmail: emailSchema.optional(),
  password: z.string().optional(),
  adminRole: z.string().optional(),
});

export const patientRegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  idNumber: z.string().min(3, 'ID number required'),
  nhifNumber: z.string().optional().default(''),
  age: z.number().int().min(0).max(150),
  gender: z.enum(['Male', 'Female', 'Other']),
  phone: z.string().min(9, 'Valid phone required'),
  address: z.string().optional().default(''),
  emergencyContact: z.string().optional().default(''),
  symptoms: z.string().optional().default(''),
});

export const patientUpdateSchema = patientRegisterSchema.partial();

export const inventoryCreateSchema = z.object({
  name: z.string().min(1, 'Item name required'),
  category: z
    .enum(['Medicines', 'Bedding', 'Laboratory', 'Surgical', 'General'])
    .default('Medicines'),
  currentStock: z.number().int().min(0).default(0),
  unit: z.string().optional().default('units'),
  dailyUsage: z.number().int().min(0).optional().default(0),
  minimumStock: z.number().int().min(0).optional().default(10),
  supplier: z.string().optional().default(''),
  expiryDate: z.string().optional().nullable(),
});

export const inventoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.enum(['Medicines', 'Bedding', 'Laboratory', 'Surgical', 'General']).optional(),
  currentStock: z.number().int().min(0).optional(),
  unit: z.string().optional(),
  dailyUsage: z.number().int().min(0).optional(),
  minimumStock: z.number().int().min(0).optional(),
  supplier: z.string().optional(),
  expiryDate: z.string().optional().nullable(),
});

export const inventoryAdjustSchema = z.object({
  itemId: z.string().min(1, 'itemId is required'),
  quantity: z.number().int().min(1, 'Quantity must be positive'),
  type: z.enum(['deduction', 'restock', 'transfer']),
  patientName: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

export const staffCreateSchema = z.object({
  name: z.string().min(2, 'Name required'),
  role: z.enum(['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Administrator', 'Support']),
  department: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().optional().default(''),
});

export const staffUpdateSchema = staffCreateSchema.partial();

export const attendanceUpdateSchema = z.object({
  staffId: z.string().min(1, 'staffId required'),
  status: z.enum(['present', 'absent', 'late', 'on-leave']),
  date: z.string().optional(),
});

export const appointmentBookSchema = z.object({
  hospitalSlug: z.string().min(1, 'Select a hospital'),
  department: z.string().optional().default('General Outpatient'),
  doctorName: z.string().optional().default(''),
  date: z.string().min(1, 'Select a date'),
  time: z.string().min(1, 'Select a time slot'),
  patientName: z.string().min(2, 'Full name required'),
  patientPhone: z.string().min(9, 'Valid phone required'),
  nhifNumber: z.string().optional().default(''),
  reason: z.string().optional().default(''),
});

export const appointmentUpdateSchema = appointmentBookSchema.partial();

export const announcementCreateSchema = z.object({
  title: z.string().min(2, 'Title required'),
  body: z.string().optional().default(''),
  type: z.enum(['medicine', 'funding', 'inspection', 'alert', 'general']).default('general'),
  severity: z.enum(['info', 'warning', 'critical']).default('info'),
  pinned: z.boolean().optional().default(false),
  author: z.string().optional().default(''),
  authorRole: z.string().optional().default(''),
  targetedHospitals: z
    .union([z.array(z.string()), z.array(z.object({ name: z.string(), allocation: z.string().optional() }))])
    .optional()
    .default([]),
  attachments: z
    .array(z.object({ name: z.string().optional().default(''), url: z.string().optional().default(''), size: z.string().optional().default('') }))
    .optional()
    .default([]),
});

export const emergencyAnalyzeSchema = z.object({
  input_type: z.enum(['text', 'camera', 'voice']).default('text'),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  text: z.string().optional().default(''),
  language: z.string().optional(),
});

export const emergencySendSchema = emergencyAnalyzeSchema.extend({
  location_name: z.string().optional().default(''),
  dispatched_to: z.string().optional().default(''),
});

export const emergencyDispatchSchema = z.object({
  hospitalSlug: z.string().min(1, 'Select a hospital'),
});

export const triageAnalyzeSchema = z.object({
  symptoms_text: z.string().min(3, 'Please describe your symptoms'),
  age: z.number().int().min(0).max(150),
  gender: z.enum(['Male', 'Female', 'Other']),
  language: z.string().optional(),
});

export const diagnosisCreateSchema = z.object({
  symptoms: z.string().optional(),
  age: z.number().int().min(0).max(150).optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  attendingDoctor: z.string().optional().default(''),
  doctorConfirmation: z.string().optional().default(''),
});

export const prescriptionCreateSchema = z.object({
  medicines: z.array(
    z.object({
      name: z.string().min(1, 'Medicine name required'),
      dosage: z.string().optional().default(''),
      frequency: z.string().optional().default(''),
      duration: z.string().optional().default(''),
      quantity: z.number().int().min(1).default(1),
    })
  ).min(1, 'At least 1 medicine required'),
  notes: z.string().optional().default(''),
  prescribedBy: z.string().optional().default(''),
});

export const aiTriageSchema = z.object({
  symptoms: z.string().min(3),
  age: z.number().int().min(0).max(150),
  gender: z.enum(['Male', 'Female', 'Other']),
});

export const aiDiagnosisSchema = aiTriageSchema;

export const aiClinicalSummarySchema = z.object({
  patient: z.record(z.any()).optional(),
  diagnosis: z.record(z.any()).optional(),
});

export const aiTreatmentSchema = z.object({
  diagnosis: z.record(z.any()),
  inventory: z.array(z.record(z.any())).optional().default([]),
});
