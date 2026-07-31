import { z } from 'zod';

export const hospitalRegistrationSchema = z.object({
  step1: z.object({
    name: z.string().min(2, 'Hospital name is required'),
    licenseNumber: z.string().min(3, 'License number is required'),
    type: z.enum(['PHC', 'CHC', 'District', 'Private'], { message: 'Select hospital type' }),
    county: z.string().min(1, 'County is required'),
    subCounty: z.string().min(1, 'Sub-county is required'),
    ward: z.string().min(1, 'Ward is required'),
    physicalAddress: z.string().min(5, 'Physical address is required'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    contactPhone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email('Valid email required'),
  }),
  step2: z.object({
    buildings: z.array(z.object({
      name: z.string().min(1, 'Building name required'),
      floors: z.number().min(1, 'At least 1 floor'),
      wards: z.array(z.object({
        name: z.string().min(1, 'Ward name required'),
        bedCount: z.number().min(1, 'At least 1 bed'),
        type: z.string().min(1, 'Ward type required'),
      })).min(1, 'At least 1 ward required'),
    })).min(1, 'At least 1 building required'),
    amenities: z.array(z.string()).min(1, 'Select at least 1 amenity'),
  }),
  step3: z.object({
    suppliers: z.array(z.object({
      name: z.string().min(1, 'Supplier name required'),
      contact: z.string().min(1, 'Contact required'),
      suppliesProvided: z.string().min(1, 'Supplies description required'),
    })).optional(),
  }),
  step4: z.object({
    directorName: z.string().min(2, 'Director name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().min(10, 'Valid phone required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    confirmKMPDC: z.boolean().refine((val) => val === true, 'Must confirm KMPDC license'),
    confirmDataSharing: z.boolean().refine((val) => val === true, 'Must agree to data sharing'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export const patientRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  idNumber: z.string().min(5, 'ID number required'),
  nhifNumber: z.string().optional(),
  age: z.number().min(0).max(150, 'Valid age required'),
  gender: z.enum(['Male', 'Female', 'Other'], { message: 'Select gender' }),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(3, 'Address required'),
  emergencyContact: z.string().min(10, 'Emergency contact required'),
  symptoms: z.string().min(5, 'Please describe symptoms'),
});

export const appointmentBookingSchema = z.object({
  hospitalSlug: z.string().min(1, 'Select a hospital'),
  department: z.string().min(1, 'Select a department'),
  doctorName: z.string().min(1, 'Select a doctor'),
  date: z.string().min(1, 'Select a date'),
  time: z.string().min(1, 'Select a time slot'),
  patientName: z.string().min(2, 'Full name required'),
  patientPhone: z.string().min(10, 'Valid phone required'),
  nhifNumber: z.string().optional(),
  reason: z.string().min(3, 'Reason for visit required'),
});

export const emergencyReportSchema = z.object({
  inputType: z.enum(['camera', 'voice', 'text']),
  textDescription: z.string().optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const triageInputSchema = z.object({
  symptoms: z.string().min(5, 'Please describe your symptoms'),
  age: z.number().min(0).max(150, 'Valid age required'),
  gender: z.enum(['Male', 'Female', 'Other'], { message: 'Select gender' }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
