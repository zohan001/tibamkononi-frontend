export interface TriageInput {
  symptoms: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: GeoLocation;
  voiceRecording?: Blob;
}

export interface TriageResult {
  level: 'emergency' | 'urgent' | 'semi-urgent' | 'non-urgent' | 'self-care';
  diseases: DiseaseProbability[];
  hospitalRecommendations: HospitalRecommendation[];
  selfCareAdvice: string[];
  emergencyWarning: string;
  gemmaRecommendation: string;
}

export interface DiseaseProbability {
  name: string;
  probability: number;
}

export interface HospitalRecommendation {
  rank: number;
  name: string;
  slug: string;
  distance: number;
  testAvailable: boolean | 'low';
  medicineInStock: boolean;
  doctorPresent: boolean;
  waitTime: string;
  gemmaRecommendation: boolean;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
