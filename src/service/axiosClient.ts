import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://api.weekday.technology/adhoc/",
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('sessionId');
  config.headers.Authorization = sessionId ? sessionId : '';
  return config;
});

axiosClient.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error),
);

export default axiosClient;
