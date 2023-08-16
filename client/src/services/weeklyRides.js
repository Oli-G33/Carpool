import api from './api';
import dayjs from 'dayjs';

export const getAvailableSeats = date =>
  api.get(`/booking/availability/${date}`).then(response => response.data);

export const bookRide = async (formattedDate, id) => {
  try {
    const response = await api.post('/booking/book', {
      date: formattedDate,
      userId: id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPassengers = date =>
  api.get(`booking/dashboard/${date}`).then(response => response.data);

export const getMyRides = userId =>
  api.get(`/booking/myrides/${userId}`).then(response => response.data);

export const cancelMyRide = async (passengerId, date) => {
  const formattedDate = dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  return api
    .post(`/booking/myrides/cancel`, { passengerId, formattedDate })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const fetchPendingRides = async driverId => {
  try {
    const response = await api.get(`/booking/pending-rides/${driverId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmRide = async body => {
  try {
    const response = await api.post('/booking/confirm-ride', body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
