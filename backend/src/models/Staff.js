import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    checkIn: { type: String, default: '' },
    checkOut: { type: String, default: '' },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'on-leave'],
      default: 'present',
    },
  },
  { _id: true }
);

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Administrator', 'Support'],
      required: true,
    },
    department: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    hospitalSlug: { type: String, required: true, index: true },
    attendance: { type: [attendanceRecordSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Staff', staffSchema);
