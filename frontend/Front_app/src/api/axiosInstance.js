import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('access');
    // console.log("JWT Token:", token); // Log the token for debugging
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
