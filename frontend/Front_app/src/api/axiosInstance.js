import Axios from 'axios';
 const axiosInstance = Axios.create(
    
    {
  baseURL:"http://localhost:8000/api",
  headers:{
    'Content-Type': 'application/json',
  }




 });
//  axiosInstance.interceptors.request.use((req))

export default axiosInstance;