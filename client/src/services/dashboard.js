import api from './api';

export const uploadRides = async (driverId, formData) => {
  try {
    // Extract dates from formData
    const dates = formData.map(item => item.date);

    // Transform formData into shifts and availableSeats
    const shifts = {};
    const availableSeats = {};
    formData.forEach(item => {
      const date = item.date;
      shifts[date] = item.shift || '';
      availableSeats[date] = item.availableSeats;
    });

    // Create the request data
    const requestData = {
      driver: driverId,
      shifts,
      availableSeats
    };

    // Send the transformed data to the server
    const response = await api.post('/dashboard/upload-rides', requestData);

    return response.data;
  } catch (error) {
    throw error;
  }
};
