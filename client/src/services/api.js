import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_REST_API_URL
});

export const wakeApi = api.get('/');

export default api;
