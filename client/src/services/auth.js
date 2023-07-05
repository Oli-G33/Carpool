import api from './api';

export const registerUser = body =>
  api.post('auth/register', body).then(response => response.data);

export const logInUser = body =>
  api.post('/auth/login', body).then(response => response.data);

export const updateUser = (userId, body) =>
  api.patch(`auth/update/${userId}`, body).then(response => response.data);
