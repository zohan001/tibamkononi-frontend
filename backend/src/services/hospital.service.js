import Hospital from '../models/Hospital.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { slugify, generateUniqueSuffix } from '../utils/slug.js';
import { registerUser } from './auth.service.js';

export async function listHospitals({ status } = {}) {
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  const hospitals = await Hospital.find(filter).sort({ name: 1 }).lean();
  return hospitals.map(toPublicHospital);
}

export async function getHospitalBySlug(slug) {
  const hospital = await Hospital.findOne({ slug }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return toPublicHospital(hospital);
}

function toPublicHospital(doc) {
  const h = doc;
  return {
    id: String(h._id),
    name: h.name,
    slug: h.slug,
    licenseNumber: h.licenseNumber || '',
    type: h.type,
    county: h.county,
    subCounty: h.subCounty || '',
    ward: h.ward || '',
    physicalAddress: h.physicalAddress || '',
    latitude: h.latitude,
    longitude: h.longitude,
    contactPhone: h.contactPhone || '',
    email: h.email || '',
    buildings: (h.buildings || []).map((b) => ({
      id: String(b._id || ''),
      name: b.name,
      type: b.type || '',
      floors: b.floors || 1,
      wards: (b.wards || []).map((w) => ({
        id: String(w._id || ''),
        name: w.name,
        type: w.type,
        bedCount: w.bedCount,
        bedsOccupied: w.bedsOccupied || 0,
      })),
    })),
    amenities: h.amenities || [],
    suppliers: h.suppliers || [],
    status: h.status,
    createdAt: h.createdAt,
    updatedAt: h.updatedAt,
  };
}

export async function createHospital(payload) {
  const { administrator, password, ...rest } = payload;

  const baseSlug = slugify(payload.name || 'hospital');
  let slug = baseSlug;
  if (await Hospital.exists({ slug })) {
    slug = `${baseSlug}-${generateUniqueSuffix()}`;
  }

  const hospital = await Hospital.create({
    name: payload.name,
    slug,
    licenseNumber: payload.licenseNumber || '',
    type: payload.type || 'Private',
    county: payload.county || 'Mombasa',
    subCounty: payload.subCounty || '',
    ward: payload.ward || '',
    physicalAddress: payload.physicalAddress || '',
    latitude: payload.latitude ?? -4.0435,
    longitude: payload.longitude ?? 39.6682,
    contactPhone: payload.contactPhone || '',
    email: payload.email || '',
    buildings: payload.buildings || [],
    amenities: payload.amenities || [],
    suppliers: payload.suppliers || [],
    description: payload.description || '',
    status: 'pending',
  });

  if (administrator || payload.email) {
    const email = administrator?.email || payload.adminEmail || payload.email;
    const fullName = administrator?.name || administrator?.directorName || 'Hospital Administrator';
    const role = payload.adminRole || 'hospital_admin';

    try {
      await registerUser({
        email,
        password: password || 'ChangeMe123!',
        fullName,
        role,
        phone: administrator?.phone || payload.contactPhone || '',
        hospitalSlug: hospital.slug,
      });
    } catch (err) {
      // Registration of the admin account is best-effort; the hospital is still created.
      console.warn('[hospital] admin account not created:', err.message);
    }
  }

  return toPublicHospital(hospital);
}

export async function approveHospital(hospitalId) {
  const hospital = await Hospital.findByIdAndUpdate(
    hospitalId,
    { status: 'approved' },
    { new: true }
  ).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return toPublicHospital(hospital);
}

export async function rejectHospital(hospitalId) {
  const hospital = await Hospital.findByIdAndUpdate(
    hospitalId,
    { status: 'suspended' },
    { new: true }
  ).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return toPublicHospital(hospital);
}

export async function setHospitalStatus(slug, status) {
  const hospital = await Hospital.findOneAndUpdate({ slug }, { status }, { new: true }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return toPublicHospital(hospital);
}

export async function getHospitalById(id) {
  const hospital = await Hospital.findById(id).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return toPublicHospital(hospital);
}

export default {
  listHospitals,
  getHospitalBySlug,
  getHospitalById,
  createHospital,
  approveHospital,
  rejectHospital,
  setHospitalStatus,
  toPublicHospital,
};
