import api from './api';

export const getAvailableSeats = date =>
  api.get(`/booking/${date}`).then(response => response.data);

export const bookRide = (formattedDate, id) => {
  return api
    .post('/booking/book', { date: formattedDate, userId: id })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};
