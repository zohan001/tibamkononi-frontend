import Announcement from '../models/Announcement.js';
import Hospital from '../models/Hospital.js';
import { ApiError } from '../utils/ApiError.js';

function toPublic(a) {
  return {
    id: String(a._id),
    title: a.title,
    body: a.body || '',
    type: a.type,
    severity: a.severity,
    pinned: a.pinned,
    author: a.author || '',
    authorRole: a.authorRole || '',
    targetedHospitals: (a.targetedHospitals || []).map((h) => ({
      name: h.name,
      allocation: h.allocation || '',
    })),
    attachments: a.attachments || [],
    createdAt: a.createdAt,
  };
}

export async function listAnnouncements() {
  const announcements = await Announcement.find().sort({ pinned: -1, createdAt: -1 }).lean();
  return announcements.map(toPublic);
}

export async function createAnnouncement(payload) {
  const { targetedHospitals = [], ...rest } = payload;

  const normalizedTargets = [];
  for (const target of targetedHospitals) {
    if (typeof target === 'string') {
      const hospital = await Hospital.findOne({ slug: target }).lean();
      normalizedTargets.push({
        name: hospital ? hospital.name : target,
        allocation: '',
      });
    } else if (target && target.name) {
      normalizedTargets.push({ name: target.name, allocation: target.allocation || '' });
    }
  }

  const announcement = await Announcement.create({
    ...rest,
    targetedHospitals: normalizedTargets,
  });

  return toPublic(announcement.toObject());
}

export async function removeAnnouncement(announcementId) {
  const announcement = await Announcement.findByIdAndDelete(announcementId).lean();
  if (!announcement) throw ApiError.notFound('Announcement not found');
  return { success: true };
}

export default {
  listAnnouncements,
  createAnnouncement,
  removeAnnouncement,
  toPublic,
};
