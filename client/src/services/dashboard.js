import api from './api';

export const uploadRides = async (driverId, formData) => {
  try {
    const payload = formData.map(data => ({
      driver: driverId,
      availableSeats: data.availableSeats,
      shifts: data.shift
    }));
    console.log(payload);
    const response = await api.post('/dashboard/upload-rides', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
