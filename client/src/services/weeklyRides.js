import api from './api';

export const getAvailableSeats = () =>
  api.get('/booking/:date').then(response => response.data);
