import { asyncHandler } from '../utils/asyncHandler.js';
import * as appointmentService from '../services/appointment.service.js';

export const list = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.listAppointments({ hospital: req.query.hospital });
  res.status(200).json(appointments);
});

export const getOne = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getAppointment(req.params.appointmentId);
  res.status(200).json(appointment);
});

export const available = asyncHandler(async (req, res) => {
  const slots = await appointmentService.getAvailableSlots({
    hospitalSlug: req.query.hospital_slug,
    date: req.query.date,
  });
  res.status(200).json(slots);
});

export const book = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.bookAppointment(req.body);
  res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
});

export const cancel = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.cancelAppointment(req.params.appointmentId);
  res.status(200).json({ success: true, message: 'Appointment cancelled', data: appointment });
});

export const update = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointment(req.params.appointmentId, req.body);
  res.status(200).json({ success: true, data: appointment });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await appointmentService.removeAppointment(req.params.appointmentId);
  res.status(200).json(result);
});

export const hospitalAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.hospitalAppointments(req.params.hospitalSlug);
  res.status(200).json(appointments);
});
