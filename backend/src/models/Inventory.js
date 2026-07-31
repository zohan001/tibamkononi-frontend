import mongoose from 'mongoose';

const movementSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      enum: ['deduction', 'restock', 'transfer'],
      required: true,
    },
    patientName: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Medicines', 'Bedding', 'Laboratory', 'Surgical', 'General'],
      default: 'Medicines',
    },
    currentStock: { type: Number, default: 0 },
    unit: { type: String, default: 'units' },
    dailyUsage: { type: Number, default: 0 },
    minimumStock: { type: Number, default: 10 },
    supplier: { type: String, default: '' },
    lastRestock: { type: Date, default: null },
    expiryDate: { type: Date, default: null },
    hospitalSlug: { type: String, required: true, index: true },
    movements: { type: [movementSchema], default: [] },
  },
  { timestamps: true }
);

inventorySchema.index({ hospitalSlug: 1, name: 1 }, { unique: true });

inventorySchema.methods.computeStatus = function computeStatus() {
  if (this.currentStock <= 0) return 'critical';
  if (this.minimumStock && this.currentStock <= this.minimumStock) return 'warning';
  if (this.currentStock <= this.minimumStock * 1.5) return 'warning';
  return 'ok';
};

inventorySchema.methods.daysRemaining = function daysRemaining() {
  if (this.dailyUsage <= 0) return Infinity;
  return Math.floor(this.currentStock / this.dailyUsage);
};

export default mongoose.model('Inventory', inventorySchema);
