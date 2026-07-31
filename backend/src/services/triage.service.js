import { analyzeTriage as runTriage } from './ai.service.js';
import Hospital from '../models/Hospital.js';
import Inventory from '../models/Inventory.js';
import Staff from '../models/Staff.js';

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

export async function analyzeTriage({ symptoms_text, age, gender }) {
  const result = await runTriage({ symptoms: symptoms_text, age, gender });

  const [hospitals, inventory, staff] = await Promise.all([
    Hospital.find({ status: 'approved' }).lean(),
    Inventory.find({}).lean(),
    Staff.find({}).lean(),
  ]);

  const origin = { lat: MOMBASA_CENTER.lat, lng: MOMBASA_CENTER.lng };

  const firstDisease = result.diseases?.[0]?.name?.toLowerCase() || '';

  const recommendations = hospitals
    .map((h) => {
      const distance = distanceKm(origin.lat, origin.lng, h.latitude, h.longitude);
      const amenities = h.amenities || [];
      const hasLab = amenities.includes('Laboratory') || amenities.includes('X-Ray') || amenities.includes('CT Scan');
      const hasPharmacy = amenities.includes('Pharmacy');

      const matchingMedicine = hasPharmacy
        ? inventory.find(
            (i) =>
              i.hospitalSlug === h.slug &&
              i.currentStock > 0 &&
              result.diseases?.some((d) =>
                d.name.toLowerCase().split(' ').some((w) => i.name.toLowerCase().includes(w))
              )
          )
        : null;

      const doctorPresent = staff.some(
        (s) => s.hospitalSlug === h.slug && s.role === 'Doctor'
      );

      const totalBeds = (h.buildings || []).reduce(
        (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedCount || 0), 0),
        0
      );
      const occupied = (h.buildings || []).reduce(
        (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedsOccupied || 0), 0),
        0
      );
      const bedsAvailable = Math.max(0, totalBeds - occupied);

      return {
        rank: 0,
        name: h.name,
        slug: h.slug,
        distance,
        waitTime: distance <= 2 ? '15 min' : distance <= 5 ? '30 min' : '60 min',
        doctorPresent,
        testAvailable: hasLab,
        medicineInStock: Boolean(matchingMedicine),
        gemmaRecommendation: hasLab && doctorPresent && bedsAvailable > 0,
      };
    })
    .sort((a, b) => {
      const scoreA = Number(b.gemmaRecommendation) * 100 + Number(b.testAvailable) * 10 - b.distance;
      const scoreB = Number(a.gemmaRecommendation) * 100 + Number(a.testAvailable) * 10 - a.distance;
      return scoreA - scoreB;
    })
    .slice(0, 5)
    .map((h, idx) => ({ ...h, rank: idx + 1 }));

  const gemmaRec = recommendations.find((r) => r.gemmaRecommendation);
  const recommendationText = gemmaRec
    ? `${gemmaRec.name} is the best match: ${gemmaRec.distance} km away, tests available, doctor on site and ${gemmaRec.waitTime} expected wait.`
    : recommendations[0]
      ? `${recommendations[0].name} is the nearest recommended facility (${recommendations[0].distance} km).`
      : 'No hospital recommendations available right now.';

  return {
    level: result.level,
    diseases: result.diseases,
    hospitalRecommendations: recommendations,
    selfCareAdvice: result.selfCareAdvice,
    emergencyWarning: result.emergencyWarning,
    gemmaRecommendation: result.gemmaRecommendation || recommendationText,
  };
}
