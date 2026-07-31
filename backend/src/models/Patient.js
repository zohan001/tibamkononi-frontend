import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    idNumber: { type: String, required: true },
    nhifNumber: { type: String, default: '' },
    age: { type: Number, required: true, min: 0, max: 150 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    symptoms: { type: String, default: '' },
    hospitalSlug: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

patientSchema.index({ idNumber: 1, hospitalSlug: 1 }, { unique: true });

export default mongoose.model('Patient', patientSchema);
