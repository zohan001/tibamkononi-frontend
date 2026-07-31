import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const ROLES = [
  'admin',
  'county_admin',
  'hospital_admin',
  'doctor',
  'nurse',
  'receptionist',
  'pharmacist',
  'lab_technician',
];

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ROLES, default: 'doctor' },
    phone: { type: String, default: '' },
    hospitalSlug: { type: String, default: null },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    email: this.email,
    fullName: this.fullName,
    role: this.role,
    phone: this.phone,
    hospitalSlug: this.hospitalSlug || null,
    createdAt: this.createdAt,
  };
};

export default mongoose.model('User', userSchema);
