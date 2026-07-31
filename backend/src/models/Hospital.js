import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    bedCount: { type: Number, required: true, min: 1 },
    bedsOccupied: { type: Number, default: 0 },
  },
  { _id: true }
);

const buildingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    floors: { type: Number, default: 1 },
    wards: { type: [wardSchema], default: [] },
  },
  { _id: true }
);

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, default: '' },
    suppliesProvided: { type: String, default: '' },
  },
  { _id: true }
);

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    licenseNumber: { type: String, default: '' },
    type: {
      type: String,
      enum: ['PHC', 'CHC', 'District', 'Private'],
      default: 'Private',
    },
    county: { type: String, required: true, default: 'Mombasa' },
    subCounty: { type: String, default: '' },
    ward: { type: String, default: '' },
    physicalAddress: { type: String, default: '' },
    latitude: { type: Number, default: -4.0435 },
    longitude: { type: Number, default: 39.6682 },
    contactPhone: { type: String, default: '' },
    email: { type: String, default: '' },
    buildings: { type: [buildingSchema], default: [] },
    amenities: { type: [String], default: [] },
    suppliers: { type: [supplierSchema], default: [] },
    status: {
      type: String,
      enum: ['pending', 'approved', 'suspended'],
      default: 'pending',
    },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

hospitalSchema.index({ county: 1, status: 1 });

export default mongoose.model('Hospital', hospitalSchema);
