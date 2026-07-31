import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    nhifNumber: { type: String, default: '' },
    hospitalSlug: { type: String, required: true, index: true },
    hospitalName: { type: String, default: '' },
    department: { type: String, default: 'General Outpatient' },
    doctorName: { type: String, default: '' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ date: 1, time: 1, hospitalSlug: 1 });

export default mongoose.model('Appointment', appointmentSchema);
