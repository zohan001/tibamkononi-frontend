export const COUNTIES = [
  'Mombasa',
  'Kilifi',
  'Kwale',
  'Taita-Taveta',
  'Lamu',
  'Tana River',
] as const;

export const MOMBASA_SUB_COUNTIES = [
  'Changamwe',
  'Jomvu',
  'Kisauni',
  'Likoni',
  'Mvita',
  'Nyali',
] as const;

export const HOSPITAL_TYPES = ['PHC', 'CHC', 'District', 'Private'] as const;

export const HOSPITAL_TYPE_LABELS: Record<string, string> = {
  PHC: 'Primary Health Care',
  CHC: 'Community Health Centre',
  District: 'District Hospital',
  Private: 'Private Hospital',
};

export const WARD_TYPES = [
  'General',
  'Maternity',
  'ICU',
  'Paediatric',
  'Surgical',
  'Isolation',
  'Theatre',
  'Laboratory',
  'Pharmacy',
  'Radiology',
] as const;

export const AMENITIES = [
  'Operating Theatre',
  'Laboratory',
  'Pharmacy',
  'X-Ray',
  'Ultrasound',
  'CT Scan',
  'MRI',
  'ICU',
  'Ambulance',
  'Blood Bank',
  'Dialysis',
] as const;

export const INVENTORY_CATEGORIES = [
  'Medicines',
  'Bedding',
  'Laboratory',
  'Surgical',
  'General',
] as const;

export const EMERGENCY_TYPES = [
  'Road Traffic Accident',
  'Building Collapse',
  'Fire',
  'Drowning',
  'Assault',
  'Fall',
  'Poisoning',
  'Other',
] as const;

export const APPOINTMENT_DEPARTMENTS = [
  { name: 'General Outpatient', icon: '🏥', description: 'General health consultations' },
  { name: 'Maternity', icon: '🤰', description: 'Prenatal and delivery care' },
  { name: 'Paediatric', icon: '👶', description: 'Child healthcare' },
  { name: 'Dental', icon: '🦷', description: 'Dental care and treatment' },
  { name: 'Surgical', icon: '🔬', description: 'Surgical consultations' },
  { name: 'Eye Clinic', icon: '👁️', description: 'Vision and eye care' },
  { name: 'Laboratory', icon: '🧪', description: 'Blood tests and diagnostics' },
  { name: 'Radiology', icon: '📷', description: 'X-ray and imaging services' },
] as const;

export const SEVERITY_CONFIG = {
  critical: { color: 'bg-red-500', textColor: 'text-red-500', label: 'Critical' },
  warning: { color: 'bg-yellow-500', textColor: 'text-yellow-600', label: 'Warning' },
  minor: { color: 'bg-blue-500', textColor: 'text-blue-500', label: 'Minor' },
  moderate: { color: 'bg-orange-500', textColor: 'text-orange-500', label: 'Moderate' },
  severe: { color: 'bg-red-600', textColor: 'text-red-600', label: 'Severe' },
  info: { color: 'bg-blue-500', textColor: 'text-blue-500', label: 'Info' },
  ok: { color: 'bg-green-500', textColor: 'text-green-600', label: 'OK' },
} as const;

export const TRIAGE_LEVELS = {
  emergency: { color: 'bg-red-600', label: 'EMERGENCY', description: 'Go to emergency immediately', emoji: '🔴' },
  urgent: { color: 'bg-orange-500', label: 'URGENT', description: 'See a doctor within 24 hours', emoji: '🟠' },
  'semi-urgent': { color: 'bg-yellow-500', label: 'SEMI-URGENT', description: 'See a doctor within 3 days', emoji: '🟡' },
  'non-urgent': { color: 'bg-blue-500', label: 'NON-URGENT', description: 'Schedule an appointment', emoji: '🔵' },
  'self-care': { color: 'bg-green-500', label: 'SELF-CARE', description: 'Manage at home', emoji: '🟢' },
} as const;
