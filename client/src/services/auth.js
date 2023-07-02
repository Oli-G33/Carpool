import api from './api';

export const registerUser = body =>
  api.post('auth/register', body).then(response => response.data);

export const logInUser = body =>
  api.post('/auth/login', body).then(response => response.data);

export const updateUser = body =>
  api.patch('auth/update/:id', body).then(response => response.data);
