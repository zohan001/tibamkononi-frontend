import EmergencyRequest from '../models/EmergencyRequest.js';
import Hospital from '../models/Hospital.js';
import { ApiError } from '../utils/ApiError.js';
import { analyzeEmergency as runAnalysis } from './ai.service.js';

const MOMBASA_CENTER = { lat: -4.0435, lng: 39.6682 };

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

function etaFromDistance(km) {
  const minutes = Math.max(2, Math.round(km * 3));
  return `${minutes} min`;
}

export async function analyzeEmergency(payload) {
  const analysis = await runAnalysis({
    inputType: payload.input_type,
    text: payload.text || '',
    location: { latitude: payload.latitude, longitude: payload.longitude },
  });

  const hospitals = await Hospital.find({ status: 'approved' }).lean();
  const origin = {
    lat: payload.latitude || MOMBASA_CENTER.lat,
    lng: payload.longitude || MOMBASA_CENTER.lng,
  };

  const nearest = hospitals
    .map((h) => {
      const distance = distanceKm(origin.lat, origin.lng, h.latitude, h.longitude);
      const totalBeds = (h.buildings || []).reduce(
        (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedCount || 0), 0),
        0
      );
      const occupied = (h.buildings || []).reduce(
        (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedsOccupied || 0), 0),
        0
      );
      const amenities = h.amenities || [];
      return {
        hospitalSlug: h.slug,
        name: h.name,
        distance,
        eta: etaFromDistance(distance),
        bedsAvailable: Math.max(0, totalBeds - occupied),
        hasICU: amenities.includes('ICU'),
        hasAmbulance: amenities.includes('Ambulance'),
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return {
    type: analysis.type,
    severity: analysis.severity,
    description: analysis.description,
    casualties: analysis.casualties,
    hazards: analysis.hazards,
    recommendedResponse: analysis.recommendedResponse,
    nearestHospitals: nearest,
  };
}

export async function sendEmergency(payload, analysis) {
  const finalAnalysis =
    analysis || (await runAnalysis({ inputType: payload.input_type, text: payload.text || '', location: payload.location }));

  const request = await EmergencyRequest.create({
    type: finalAnalysis.type,
    severity: finalAnalysis.severity,
    description: finalAnalysis.description,
    inputType: payload.input_type || 'text',
    location: payload.location || { latitude: MOMBASA_CENTER.lat, longitude: MOMBASA_CENTER.lng },
    locationName: payload.location_name || '',
    casualties: finalAnalysis.casualties ?? 0,
    hazards: finalAnalysis.hazards || [],
    nearestHospitals: finalAnalysis.nearestHospitals || [],
    recommendedResponse: finalAnalysis.recommendedResponse,
    dispatchedTo: payload.dispatched_to || '',
    status: 'sent',
  });

  return {
    id: String(request._id),
    ...request.toObject(),
    id: String(request._id),
  };
}

export async function listEmergencies() {
  const requests = await EmergencyRequest.find().sort({ createdAt: -1 }).lean();
  return requests.map((r) => ({
    id: String(r._id),
    type: r.type,
    severity: r.severity,
    description: r.description,
    location: r.location,
    locationName: r.locationName || '',
    casualties: r.casualties || 0,
    hazards: r.hazards || [],
    nearestHospitals: r.nearestHospitals || [],
    status: r.status,
    createdAt: r.createdAt,
  }));
}

export async function getEmergency(emergencyId) {
  const request = await EmergencyRequest.findById(emergencyId).lean();
  if (!request) throw ApiError.notFound('Emergency request not found');
  return {
    id: String(request._id),
    type: request.type,
    severity: request.severity,
    description: request.description,
    location: request.location,
    locationName: request.locationName || '',
    casualties: request.casualties || 0,
    hazards: request.hazards || [],
    nearestHospitals: request.nearestHospitals || [],
    status: request.status,
    createdAt: request.createdAt,
  };
}

export async function dispatchEmergency(emergencyId, { hospitalSlug }) {
  const request = await EmergencyRequest.findById(emergencyId);
  if (!request) throw ApiError.notFound('Emergency request not found');

  request.status = 'acknowledged';
  request.dispatchedTo = hospitalSlug || request.dispatchedTo;
  await request.save();

  return getEmergency(emergencyId);
}

export async function updateEmergencyStatus(emergencyId, status) {
  const request = await EmergencyRequest.findByIdAndUpdate(
    emergencyId,
    { status },
    { new: true }
  ).lean();
  if (!request) throw ApiError.notFound('Emergency request not found');
  return getEmergency(emergencyId);
}

export default {
  analyzeEmergency,
  sendEmergency,
  listEmergencies,
  getEmergency,
  dispatchEmergency,
  updateEmergencyStatus,
};
