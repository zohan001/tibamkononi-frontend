import mongoose from 'mongoose';

const targetedHospitalSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    allocation: { type: String, default: '' },
  },
  { _id: true }
);

const attachmentSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    url: { type: String, default: '' },
    size: { type: String, default: '' },
  },
  { _id: true }
);

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, default: '' },
    type: {
      type: String,
      enum: ['medicine', 'funding', 'inspection', 'alert', 'general'],
      default: 'general',
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },
    pinned: { type: Boolean, default: false },
    author: { type: String, default: '' },
    authorRole: { type: String, default: '' },
    targetedHospitals: { type: [targetedHospitalSchema], default: [] },
    attachments: { type: [attachmentSchema], default: [] },
  },
  { timestamps: true }
);

announcementSchema.index({ pinned: -1, createdAt: -1 });

export default mongoose.model('Announcement', announcementSchema);
