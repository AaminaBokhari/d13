import asyncHandler from '../utils/asyncHandler.js';
import * as appointmentService from '../services/appointmentService.js';
import AppError from '../utils/AppError.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.createAppointmentService({
    ...req.body,
    doctor: req.user.role === 'doctor' ? req.user.id : req.body.doctor
  });

  await appointment.populate(['patient', 'doctor']);
  res.status(201).json(appointment);
});

export const getAppointments = asyncHandler(async (req, res) => {
  const query = req.user.role === 'doctor' 
    ? { doctor: req.user.id }
    : { patient: req.user.id };

  const appointments = await appointmentService.getAppointmentsService(query);
  res.json(appointments);
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentService(
    req.params.id,
    req.body
  );

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  res.json(appointment);
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.deleteAppointmentService(req.params.id);

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  res.json({ message: 'Appointment deleted successfully' });
});

export const getDoctorSchedule = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const schedule = await appointmentService.getDoctorScheduleService(
    req.user.id,
    new Date(startDate),
    new Date(endDate)
  );
  res.json(schedule);
});