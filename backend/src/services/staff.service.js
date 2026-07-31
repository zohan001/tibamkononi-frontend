import Staff from '../models/Staff.js';
import { ApiError } from '../utils/ApiError.js';

function toPublic(member) {
  return {
    id: String(member._id),
    name: member.name,
    role: member.role,
    department: member.department || '',
    phone: member.phone || '',
    email: member.email || '',
    hospitalSlug: member.hospitalSlug,
    joinedAt: member.createdAt,
  };
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function currentTimeString() {
  return new Date().toLocaleTimeString('en-KE', { hour12: false });
}

export async function listStaff(hospitalSlug) {
  const members = await Staff.find({ hospitalSlug }).sort({ name: 1 }).lean();
  return members.map(toPublic);
}

export async function createStaff(hospitalSlug, payload) {
  const member = await Staff.create({ ...payload, hospitalSlug });
  return toPublic(member);
}

export async function updateStaff(hospitalSlug, staffId, payload) {
  const member = await Staff.findOneAndUpdate(
    { _id: staffId, hospitalSlug },
    { $set: payload },
    { new: true }
  ).lean();
  if (!member) throw ApiError.notFound('Staff member not found');
  return toPublic(member);
}

export async function removeStaff(hospitalSlug, staffId) {
  const member = await Staff.findOneAndDelete({ _id: staffId, hospitalSlug });
  if (!member) throw ApiError.notFound('Staff member not found');
  return { success: true };
}

export async function getAttendance(hospitalSlug, date = todayString()) {
  const members = await Staff.find({ hospitalSlug }).lean();
  return members.map((member) => {
    const record = (member.attendance || []).find((a) => a.date === date);
    return {
      staffId: String(member._id),
      staffName: member.name,
      role: member.role,
      date,
      checkInTime: record?.checkIn || '',
      checkOutTime: record?.checkOut || '',
      status: record?.status || 'absent',
    };
  });
}

export async function setAttendance(hospitalSlug, { staffId, status, date }) {
  const member = await Staff.findOne({ _id: staffId, hospitalSlug });
  if (!member) throw ApiError.notFound('Staff member not found');

  const targetDate = date || todayString();
  let record = (member.attendance || []).find((a) => a.date === targetDate);

  if (!record) {
    record = {
      date: targetDate,
      checkIn: currentTimeString(),
      status: status || 'present',
    };
    member.attendance.push(record);
  } else {
    record.status = status || record.status;
    if (!record.checkIn && (status === 'present' || status === 'late')) {
      record.checkIn = record.checkIn || currentTimeString();
    }
  }

  member.markModified('attendance');
  await member.save();
  return {
    staffId: String(member._id),
    staffName: member.name,
    role: member.role,
    date: targetDate,
    checkInTime: record.checkIn || '',
    checkOutTime: record.checkOut || '',
    status: record.status,
  };
}

export async function clockIn(hospitalSlug, staffId) {
  const member = await Staff.findOne({ _id: staffId, hospitalSlug });
  if (!member) throw ApiError.notFound('Staff member not found');

  const date = todayString();
  const hour = new Date().getHours();
  const isLate = hour >= 9;
  let record = (member.attendance || []).find((a) => a.date === date);

  if (!record) {
    record = { date, checkIn: currentTimeString(), status: isLate ? 'late' : 'present' };
    member.attendance.push(record);
  } else {
    record.checkIn = record.checkIn || currentTimeString();
    record.status = isLate ? 'late' : 'present';
  }

  member.markModified('attendance');
  await member.save();
  return { success: true, checkInTime: record.checkIn, status: record.status };
}

export async function clockOut(hospitalSlug, staffId) {
  const member = await Staff.findOne({ _id: staffId, hospitalSlug });
  if (!member) throw ApiError.notFound('Staff member not found');

  const date = todayString();
  let record = (member.attendance || []).find((a) => a.date === date);
  if (!record) {
    record = { date, checkIn: '', checkOut: currentTimeString(), status: 'present' };
    member.attendance.push(record);
  } else {
    record.checkOut = currentTimeString();
  }

  member.markModified('attendance');
  await member.save();
  return { success: true, checkOutTime: record.checkOut };
}

export default {
  listStaff,
  createStaff,
  updateStaff,
  removeStaff,
  getAttendance,
  setAttendance,
  clockIn,
  clockOut,
};
