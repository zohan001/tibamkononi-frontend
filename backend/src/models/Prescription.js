import mongoose from 'mongoose';

const prescribedMedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String, default: '' },
    frequency: { type: String, default: '' },
    duration: { type: String, default: '' },
    quantity: { type: Number, default: 1 },
  },
  { _id: true }
);

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    hospitalSlug: { type: String, default: '' },
    medicines: { type: [prescribedMedicineSchema], default: [] },
    notes: { type: String, default: '' },
    prescribedBy: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Prescription', prescriptionSchema);
