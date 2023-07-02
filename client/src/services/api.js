import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_REST_API_URL
});

export const wakeApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(new Error(error.message));
      });
  });
};

export default api;
