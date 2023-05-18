import api from './api';

export const getAvailableSeats = date =>
  api.get(`/booking/${date}`).then(response => response.data);

export const bookRide = formattedDate => {
  return api
    .post('/booking/book', { date: formattedDate })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};
