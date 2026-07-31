import { asyncHandler } from '../utils/asyncHandler.js';
import * as announcementService from '../services/announcement.service.js';

export const list = asyncHandler(async (req, res) => {
  const announcements = await announcementService.listAnnouncements();
  res.status(200).json(announcements);
});

export const create = asyncHandler(async (req, res) => {
  const announcement = await announcementService.createAnnouncement(req.body);
  res.status(201).json({ success: true, message: 'Announcement published', data: announcement });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await announcementService.removeAnnouncement(req.params.announcementId);
  res.status(200).json(result);
});
