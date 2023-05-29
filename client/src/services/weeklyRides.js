import api from './api';

export const getAvailableSeats = date =>
  api.get(`/booking/availability/${date}`).then(response => response.data);

export const bookRide = (formattedDate, id) => {
  return api
    .post('/booking/book', { date: formattedDate, userId: id })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const getPassengers = date =>
  api.get(`booking/dashboard/${date}`).then(response => response.data);

export const getMyRides = userId =>
  api.get(`/booking/myrides/${userId}`).then(response => response.data);

export const cancelMyRide = async passengerId => {
  return api
    .post(`/booking/myrides/cancel`, { passengerId })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};
