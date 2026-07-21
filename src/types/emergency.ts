export interface EmergencyReport {
  id: string;
  type: 'Road Traffic Accident' | 'Building Collapse' | 'Fire' | 'Drowning' | 'Assault' | 'Fall' | 'Poisoning' | 'Other';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  description: string;
  location: GeoLocation;
  locationName: string;
  photoUrl?: string;
  voiceRecordingUrl?: string;
  casualties: string;
  hazards: string;
  nearestHospitals: NearestHospital[];
  status: 'analyzing' | 'sent' | 'acknowledged' | 'resolved';
  createdAt: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface NearestHospital {
  hospitalSlug: string;
  name: string;
  distance: number;
  eta: string;
  bedsAvailable: number;
  hasICU: boolean;
  hasAmbulance: boolean;
}

export interface EmergencyAnalysis {
  type: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  description: string;
  casualties: string;
  hazards: string;
  recommendedResponse: string;
}

export interface EmergencyInput {
  inputType: 'camera' | 'voice' | 'text';
  photo?: Blob;
  voiceRecording?: Blob;
  textDescription?: string;
  location: GeoLocation;
}
