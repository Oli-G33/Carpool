import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_REST_API_URL
});

export const wakeApi = () => {
  return new Promise((resolve, reject) => {
    api
      .get('/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        reject(new Error(error.message));
      });
  });
};

export default api;
