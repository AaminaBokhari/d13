import api from './api';

export const getAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointment = async (id, updateData) => {
  const response = await api.patch(`/appointments/${id}`, updateData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};

export const getDoctorSchedule = async (startDate, endDate) => {
  const response = await api.get('/appointments/schedule', {
    params: { startDate, endDate }
  });
  return response.data;
};