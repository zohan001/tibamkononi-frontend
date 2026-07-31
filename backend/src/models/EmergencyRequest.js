import mongoose from 'mongoose';

const nearestHospitalSchema = new mongoose.Schema(
  {
    hospitalSlug: { type: String, default: '' },
    name: { type: String, default: '' },
    distance: { type: Number, default: 0 },
    eta: { type: String, default: '' },
    bedsAvailable: { type: Number, default: 0 },
    hasICU: { type: Boolean, default: false },
    hasAmbulance: { type: Boolean, default: false },
  },
  { _id: true }
);

const emergencyRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        'Road Traffic Accident',
        'Building Collapse',
        'Fire',
        'Drowning',
        'Assault',
        'Fall',
        'Poisoning',
        'Other',
      ],
      default: 'Other',
    },
    severity: {
      type: String,
      enum: ['minor', 'moderate', 'severe', 'critical'],
      default: 'moderate',
    },
    description: { type: String, default: '' },
    inputType: { type: String, enum: ['camera', 'voice', 'text'], default: 'text' },
    location: {
      latitude: { type: Number, default: -4.0435 },
      longitude: { type: Number, default: 39.6682 },
    },
    locationName: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    voiceRecordingUrl: { type: String, default: '' },
    casualties: { type: Number, default: 0 },
    hazards: { type: [String], default: [] },
    nearestHospitals: { type: [nearestHospitalSchema], default: [] },
    recommendedResponse: { type: String, default: '' },
    dispatchedTo: { type: String, default: '' },
    status: {
      type: String,
      enum: ['analyzing', 'sent', 'acknowledged', 'resolved'],
      default: 'sent',
    },
  },
  { timestamps: true }
);

emergencyRequestSchema.index({ createdAt: -1 });

export default mongoose.model('EmergencyRequest', emergencyRequestSchema);
