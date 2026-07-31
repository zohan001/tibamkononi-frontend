import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    probability: { type: Number, min: 0, max: 100, default: 0 },
  },
  { _id: true }
);

const treatmentItemSchema = new mongoose.Schema(
  {
    medicine: { type: String, required: true },
    dosage: { type: String, default: '' },
    frequency: { type: String, default: '' },
    stockAvailable: { type: Number, default: 0 },
  },
  { _id: true }
);

const diagnosisSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    hospitalSlug: { type: String, default: '' },
    diseases: { type: [diseaseSchema], default: [] },
    recommendedTests: { type: [String], default: [] },
    recommendedTreatment: { type: [treatmentItemSchema], default: [] },
    clinicalSummary: { type: String, default: '' },
    doctorConfirmation: { type: String, default: '' },
    attendingDoctor: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Diagnosis', diagnosisSchema);
